import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dns from 'dns';
import mongoose from 'mongoose';
import studentRoutes from './routes/studentRoutes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { getLandingPageHtml } from './views/landingPage';
import { getHealthPageHtml } from './views/healthPage';

// Load environment variables
dotenv.config();

// Configure DNS to use Google DNS for reliable SRV record resolution
dns.setServers(['8.8.8.8']);

const app: Application = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/forese_student_db';

// Core Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Landing Page (HTML Dashboard)
app.get('/', (req: Request, res: Response) => {
  const isDbConnected = mongoose.connection.readyState === 1;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(getLandingPageHtml({ isDbConnected, port: PORT }));
});

// Health Check Endpoint (Content negotiation: Browser -> HTML, API Client -> JSON)
app.get('/api/health', (req: Request, res: Response) => {
  const isDbConnected = mongoose.connection.readyState === 1;
  const healthData = {
    status: isDbConnected ? 'OK' : 'Degraded',
    timestamp: new Date().toISOString(),
    uptime: `${process.uptime().toFixed(2)}s`,
    database: isDbConnected ? 'connected' : 'disconnected',
  };

  if (req.headers.accept?.includes('text/html') && req.query.format !== 'json') {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(getHealthPageHtml(healthData));
    return;
  }

  res.status(200).json(healthData);
});

// Student API Routes
app.use('/api/students', studentRoutes);

// 404 Handler for undefined routes
app.use(notFoundHandler);

// Centralized Error Handling Middleware
app.use(errorHandler);

// Database Connection & Server Initialization
const startServer = async (): Promise<void> => {
  console.log(`[Database] Connecting to MongoDB at ${MONGODB_URI}...`);

  mongoose.connection.on('connected', () => {
    console.log('[Database] MongoDB connected successfully.');
  });

  mongoose.connection.on('error', (err) => {
    console.error('[Database] MongoDB connection error:', err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('[Database] MongoDB disconnected.');
  });

  try {
    dns.setServers(['8.8.8.8']);
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[Database] Initial MongoDB connection failed: ${message}`);
    console.warn('[Database] The server is running, but database operations will fail until MongoDB is available.');
    console.warn('[Database] Please ensure MongoDB is running or update MONGODB_URI in your .env file.');
  }

  app.listen(PORT, () => {
    console.log(`[Server] Server is running on http://localhost:${PORT}`);
    console.log(`[Server] Health check: http://localhost:${PORT}/api/health`);
    console.log(`[Server] Student API:  http://localhost:${PORT}/api/students`);
  });
};

// Graceful Shutdown
const handleShutdown = async (signal: string): Promise<void> => {
  console.log(`\n[Server] Received ${signal}. Shutting down gracefully...`);
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log('[Database] MongoDB connection closed.');
    }
    process.exit(0);
  } catch (err) {
    console.error('[Server] Error during graceful shutdown:', err);
    process.exit(1);
  }
};

process.on('SIGINT', () => handleShutdown('SIGINT'));
process.on('SIGTERM', () => handleShutdown('SIGTERM'));

startServer();

export default app;
