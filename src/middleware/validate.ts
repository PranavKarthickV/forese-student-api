import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { getErrorPageHtml } from '../views/errorPage';

/**
 * Middleware to validate MongoDB ObjectId in request parameters (:id).
 */
export const validateObjectId = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { id } = req.params;

  if (
    typeof id !== 'string' ||
    !mongoose.Types.ObjectId.isValid(id) ||
    !/^[0-9a-fA-F]{24}$/.test(id)
  ) {
    if (req.headers.accept?.includes('text/html') && req.query.format !== 'json') {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.status(400).send(
        getErrorPageHtml({
          statusCode: 400,
          title: 'Invalid Student ID',
          message: `The student ID '${id}' is not a valid 24-character hexadecimal MongoDB ObjectId.`,
          path: req.originalUrl,
          method: req.method,
        })
      );
      return;
    }

    res.status(400).json({
      success: false,
      message: 'Invalid student ID format. Must be a valid 24-character hex string.',
    });
    return;
  }

  next();
};

/**
 * Middleware to validate student creation input (POST /api/students).
 */
export const validateCreateStudent = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name, rollNumber, department, year } = req.body;
  const errors: string[] = [];

  // Validate name
  if (name === undefined || name === null || typeof name !== 'string' || name.trim() === '') {
    errors.push('Name is required and must be a non-empty string.');
  }

  // Validate rollNumber
  if (
    rollNumber === undefined ||
    rollNumber === null ||
    typeof rollNumber !== 'string' ||
    rollNumber.trim() === ''
  ) {
    errors.push('Roll number is required and must be a non-empty string.');
  }

  // Validate department
  if (
    department === undefined ||
    department === null ||
    typeof department !== 'string' ||
    department.trim() === ''
  ) {
    errors.push('Department is required and must be a non-empty string.');
  }

  // Validate year
  if (year === undefined || year === null) {
    errors.push('Year is required.');
  } else if (typeof year !== 'number' || !Number.isInteger(year) || year < 1 || year > 4) {
    errors.push('Year must be an integer between 1 and 4.');
  }

  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      message: 'Validation failed.',
      errors,
    });
    return;
  }

  // Sanitize fields
  req.body.name = name.trim();
  req.body.rollNumber = rollNumber.trim().toUpperCase();
  req.body.department = department.trim();
  req.body.year = year;

  next();
};

/**
 * Middleware to validate student update input (PUT /api/students/:id).
 */
export const validateUpdateStudent = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name, rollNumber, department, year } = req.body;
  const errors: string[] = [];

  // Check if body is empty
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).json({
      success: false,
      message: 'Validation failed. Request body cannot be empty.',
    });
    return;
  }

  // Validate name if present
  if (name !== undefined) {
    if (typeof name !== 'string' || name.trim() === '') {
      errors.push('Name must be a non-empty string.');
    } else {
      req.body.name = name.trim();
    }
  }

  // Validate rollNumber if present
  if (rollNumber !== undefined) {
    if (typeof rollNumber !== 'string' || rollNumber.trim() === '') {
      errors.push('Roll number must be a non-empty string.');
    } else {
      req.body.rollNumber = rollNumber.trim().toUpperCase();
    }
  }

  // Validate department if present
  if (department !== undefined) {
    if (typeof department !== 'string' || department.trim() === '') {
      errors.push('Department must be a non-empty string.');
    } else {
      req.body.department = department.trim();
    }
  }

  // Validate year if present
  if (year !== undefined) {
    if (typeof year !== 'number' || !Number.isInteger(year) || year < 1 || year > 4) {
      errors.push('Year must be an integer between 1 and 4.');
    }
  }

  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      message: 'Validation failed.',
      errors,
    });
    return;
  }

  next();
};
