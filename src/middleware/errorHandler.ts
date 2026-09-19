import { Request, Response, NextFunction } from 'express';

interface MongoError extends Error {
  code?: number;
  keyValue?: Record<string, unknown>;
  name: string;
  errors?: Record<string, { message: string }>;
}

/**
 * 404 handler for routes that do not exist.
 */
export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    message: `Resource not found: ${req.method} ${req.originalUrl}`,
  });
};

/**
 * Centralized error-handling middleware.
 */
export const errorHandler = (
  err: MongoError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  // Handle JSON parsing syntax error
  if (err instanceof SyntaxError && 'body' in err) {
    res.status(400).json({
      success: false,
      message: 'Invalid JSON payload in request body.',
    });
    return;
  }

  // Handle MongoDB Duplicate Key Error (E11000)
  if (err.code === 11000) {
    const field = err.keyValue ? Object.keys(err.keyValue)[0] : 'field';
    const value = err.keyValue ? err.keyValue[field] : '';
    res.status(409).json({
      success: false,
      message: `Duplicate value error: A student with ${field} '${value}' already exists.`,
    });
    return;
  }

  // Handle Mongoose Validation Error
  if (err.name === 'ValidationError' && err.errors) {
    const errorMessages = Object.values(err.errors).map((e) => e.message);
    res.status(400).json({
      success: false,
      message: 'Validation failed.',
      errors: errorMessages,
    });
    return;
  }

  // Handle Mongoose CastError (invalid ObjectId or type casting)
  if (err.name === 'CastError') {
    res.status(400).json({
      success: false,
      message: 'Invalid data format or ID.',
    });
    return;
  }

  // Default to 500 internal server error
  console.error('[ServerError]', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error.',
  });
};
