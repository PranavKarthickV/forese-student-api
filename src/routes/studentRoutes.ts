import { Router, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from '../controllers/studentController';
import {
  validateObjectId,
  validateCreateStudent,
  validateUpdateStudent,
} from '../middleware/validate';

const router = Router();

// Middleware to verify database connectivity before executing database operations
const checkDbConnection = (req: Request, res: Response, next: NextFunction): void => {
  if (mongoose.connection.readyState !== 1) {
    res.status(500).json({
      success: false,
      message: 'Database unavailable. Please ensure MongoDB is running and reachable.',
    });
    return;
  }
  next();
};

router.use(checkDbConnection);

// Routes for /api/students
router.route('/')
  .post(validateCreateStudent, createStudent)
  .get(getAllStudents);

// Routes for /api/students/:id
router.route('/:id')
  .get(validateObjectId, getStudentById)
  .put(validateObjectId, validateUpdateStudent, updateStudent)
  .delete(validateObjectId, deleteStudent);

export default router;
