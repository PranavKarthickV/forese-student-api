# Student Records REST API

A robust, production-ready RESTful API built for managing student records as part of the FORESE Developer Team Selection Task.

---

## 📌 Project Overview

This project provides a clean, modular backend service to manage student academic records. Built with Node.js, Express, TypeScript, and MongoDB (via Mongoose), it enforces strict schema validation, unique roll number constraints, defensive ObjectId validation, centralized error handling, and support for cloud-hosted MongoDB Atlas clusters.

---

## ✨ Features

- **Full CRUD Operations:** Create, Read (all and by ID), Update, and Delete student records.
- **Strict Input Validation:** Rejects empty or missing required fields, invalid academic years, and malformed IDs.
- **Conflict Handling:** Prevents duplicate student roll numbers with proper HTTP `409 Conflict` responses.
- **MongoDB Atlas Ready:** Built-in DNS resolver configuration (`8.8.8.8`) to handle Windows SRV record resolution for Atlas connection strings.
- **Service Health Monitoring:** Dedicated `GET /api/health` endpoint reporting uptime and database connectivity.
- **Centralized Error Handling:** Consistent JSON error envelopes for validation errors, cast errors, duplicate keys, and unexpected server failures.
- **Graceful Shutdown:** Cleanly closes database connections on `SIGINT` and `SIGTERM`.

---

## 🛠️ Technology Stack

- **Runtime:** Node.js (v18+)
- **Framework:** Express.js 5
- **Language:** TypeScript 5
- **Database:** MongoDB
- **ODM:** Mongoose 8+
- **Developer Tooling:** `ts-node-dev` (hot reload), `dotenv` (environment variables), `cors` (Cross-Origin Resource Sharing)

---

## 📁 Project Architecture

The codebase follows a modular layered architecture separating controllers, routes, models, middleware, and types:

```
forese-student-api/
├── src/
│   ├── controllers/         # Request handling and business logic
│   │   └── studentController.ts
│   ├── middleware/          # Input validation and centralized error handlers
│   │   ├── errorHandler.ts
│   │   └── validate.ts
│   ├── models/              # Mongoose schema and models
│   │   └── Student.ts
│   ├── routes/              # Express route definitions
│   │   └── studentRoutes.ts
│   ├── types/               # TypeScript interfaces, types, and DTOs
│   │   └── student.types.ts
│   └── server.ts            # Application bootstrap and database lifecycle
├── .env.example             # Template for environment configuration
├── .gitignore               # Version control exclusion rules
├── package.json             # Dependencies and scripts
├── README.md                # Documentation and API reference
└── tsconfig.json            # TypeScript compiler configuration
```

---

## 📋 Student Data Model & Validation Rules

| Field | Type | Required | Validation & Constraints |
|---|---|---|---|
| `name` | `string` | Yes | Non-empty string after trimming |
| `rollNumber` | `string` | Yes | Unique, non-empty, auto-converted to uppercase |
| `department` | `string` | Yes | Non-empty string after trimming |
| `year` | `number` | Yes | Integer between `1` and `4` |
| `createdAt` | `Date` | Auto | Managed by Mongoose timestamps |
| `updatedAt` | `Date` | Auto | Managed by Mongoose timestamps |

### Validation Rules Summary
1. **Creation (`POST`):** All four fields (`name`, `rollNumber`, `department`, `year`) are required and cannot be empty or whitespace.
2. **Year Range:** `year` must be an integer: `1`, `2`, `3`, or `4`.
3. **Unique Roll Number:** Duplicate roll numbers are rejected at both controller and database index levels.
4. **ID Validation:** Any route parameter `:id` must be a valid 24-character hexadecimal MongoDB ObjectId.
5. **Updates (`PUT`):** The request body cannot be empty; any provided fields are validated against the same rules.

---

## ☁️ MongoDB Atlas Setup

To connect to a cloud MongoDB Atlas database:

1. **Create an Atlas Cluster:** Sign in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and deploy a free M0 cluster.
2. **Create a Database User:**
   - Navigate to **Security** > **Database Access**.
   - Add a new database user with **Read and write to any database** privileges.
   - Note down the `<username>` and `<password>`.
3. **Configure Network Access:**
   - Navigate to **Security** > **Network Access**.
   - Add an IP address: select **Allow Access from Anywhere** (`0.0.0.0/0`) for development or add your current IP.
4. **Obtain Connection String:**
   - Go to **Database** > **Connect** > **Drivers**.
   - Copy the SRV connection string:
     ```text
     mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority
     ```
5. **DNS SRV Resolution Note:**
   - On some Windows networks, default Node.js DNS queries for Atlas SRV records may encounter `querySrv ECONNREFUSED`. This project pre-configures Google DNS (`8.8.8.8`) in `src/server.ts` to ensure reliable Atlas connections.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or higher)
- [npm](https://www.npmjs.com/)
- Local MongoDB instance or MongoDB Atlas connection string

### 1. Installation

Clone or open the repository folder and install dependencies:

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file by copying `.env.example`:

```bash
# On Linux/macOS
cp .env.example .env

# On Windows PowerShell
Copy-Item .env.example .env
```

Configure your environment variables in `.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/forese_student_db?retryWrites=true&w=majority
NODE_ENV=development
```

> **Security Note:** Never commit `.env` or expose real database credentials. `.env` is already listed in `.gitignore`.

### 3. Running the Application

- **Development Mode (with Hot Reload):**
  ```bash
  npm run dev
  ```

- **Build TypeScript into JavaScript:**
  ```bash
  npm run build
  ```

- **Production Mode (runs compiled code from `dist/`):**
  ```bash
  npm start
  ```

---

## 📡 API Reference

Base URL: `http://localhost:5000`

### Summary of Endpoints

| Method | Endpoint | Description | Status Codes |
|---|---|---|---|
| `GET` | `/api/health` | Health status and DB connectivity | `200` |
| `POST` | `/api/students` | Create a new student | `201`, `400`, `409`, `500` |
| `GET` | `/api/students` | Retrieve all students | `200`, `500` |
| `GET` | `/api/students/:id` | Retrieve student by ID | `200`, `400`, `404`, `500` |
| `PUT` | `/api/students/:id` | Update student by ID | `200`, `400`, `404`, `409`, `500` |
| `DELETE` | `/api/students/:id` | Delete student by ID | `200`, `400`, `404`, `500` |

---

### Endpoint Details & Examples

#### 1. Health Check
- **Endpoint:** `GET /api/health`
- **Response (200 OK):**
```json
{
  "status": "OK",
  "timestamp": "2026-09-19T06:30:00.000Z",
  "uptime": "15.42s",
  "database": "connected"
}
```

---

#### 2. Create Student
- **Endpoint:** `POST /api/students`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "name": "Pranav Karthick",
  "rollNumber": "ECE001",
  "department": "Electronics and Communication",
  "year": 2
}
```
- **Response (201 Created):**
```json
{
  "success": true,
  "message": "Student created successfully.",
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Pranav Karthick",
    "rollNumber": "ECE001",
    "department": "Electronics and Communication",
    "year": 2,
    "createdAt": "2026-09-19T06:30:00.000Z",
    "updatedAt": "2026-09-19T06:30:00.000Z"
  }
}
```

---

#### 3. Get All Students
- **Endpoint:** `GET /api/students`
- **Response (200 OK):**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
      "name": "Pranav Karthick",
      "rollNumber": "ECE001",
      "department": "Electronics and Communication",
      "year": 2,
      "createdAt": "2026-09-19T06:30:00.000Z",
      "updatedAt": "2026-09-19T06:30:00.000Z"
    }
  ]
}
```

---

#### 4. Get Student by ID
- **Endpoint:** `GET /api/students/:id`
- **Example:** `GET /api/students/64f1a2b3c4d5e6f7a8b9c0d1`
- **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Pranav Karthick",
    "rollNumber": "ECE001",
    "department": "Electronics and Communication",
    "year": 2,
    "createdAt": "2026-09-19T06:30:00.000Z",
    "updatedAt": "2026-09-19T06:30:00.000Z"
  }
}
```

---

#### 5. Update Student
- **Endpoint:** `PUT /api/students/:id`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "year": 3
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "message": "Student updated successfully.",
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Pranav Karthick",
    "rollNumber": "ECE001",
    "department": "Electronics and Communication",
    "year": 3,
    "createdAt": "2026-09-19T06:30:00.000Z",
    "updatedAt": "2026-09-19T06:35:00.000Z"
  }
}
```

---

#### 6. Delete Student
- **Endpoint:** `DELETE /api/students/:id`
- **Response (200 OK):**
```json
{
  "success": true,
  "message": "Student deleted successfully.",
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Pranav Karthick",
    "rollNumber": "ECE001",
    "department": "Electronics and Communication",
    "year": 3
  }
}
```

---

## ⚠️ Error Handling & Status Codes

All errors return a consistent JSON payload structure:

| Status Code | Meaning | Scenario |
|---|---|---|
| `200 OK` | Success | Read, update, or delete operation succeeded |
| `201 Created` | Resource created | Student record added |
| `400 Bad Request` | Validation failure / invalid ID | Missing required fields, invalid year, malformed ObjectId |
| `404 Not Found` | Resource not found | Student ID does not exist |
| `409 Conflict` | Duplicate resource | Student with the same roll number already exists |
| `500 Server Error` | Unexpected error | Database connection failure or unhandled exception |

### Example Error Responses

#### 400 Bad Request (Validation Error)
```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": [
    "Name is required and must be a non-empty string.",
    "Year must be an integer between 1 and 4."
  ]
}
```

#### 400 Bad Request (Invalid ObjectId)
```json
{
  "success": false,
  "message": "Invalid student ID format. Must be a valid 24-character hex string."
}
```

#### 404 Not Found
```json
{
  "success": false,
  "message": "Student with ID '64f1a2b3c4d5e6f7a8b9c0d1' not found."
}
```

#### 409 Conflict (Duplicate Roll Number)
```json
{
  "success": false,
  "message": "A student with roll number 'ECE001' already exists."
}
```

#### 500 Internal Server Error (Database Disconnected)
```json
{
  "success": false,
  "message": "Database unavailable. Please ensure MongoDB is running and reachable."
}
```
