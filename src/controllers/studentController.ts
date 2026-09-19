import { Request, Response, NextFunction } from 'express';
import { Student } from '../models/Student';

/**
 * @route   POST /api/students
 * @desc    Create a new student record
 * @access  Public
 */
export const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, rollNumber, department, year } = req.body;

    // Check for duplicate roll number before creation
    const existingStudent = await Student.findOne({ rollNumber });
    if (existingStudent) {
      res.status(409).json({
        success: false,
        message: `A student with roll number '${rollNumber}' already exists.`,
      });
      return;
    }

    const student = await Student.create({
      name,
      rollNumber,
      department,
      year,
    });

    res.status(201).json({
      success: true,
      message: 'Student created successfully.',
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/students
 * @desc    Get all student records
 * @access  Public
 */
export const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/students/:id
 * @desc    Get a single student record by ID
 * @access  Public
 */
export const getStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);

    if (!student) {
      res.status(404).json({
        success: false,
        message: `Student with ID '${id}' not found.`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/students/:id
 * @desc    Update a student record by ID
 * @access  Public
 */
export const updateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { rollNumber } = req.body;

    // Verify student exists
    const existingStudent = await Student.findById(id);
    if (!existingStudent) {
      res.status(404).json({
        success: false,
        message: `Student with ID '${id}' not found.`,
      });
      return;
    }

    // Check if new roll number conflicts with another student
    if (rollNumber && rollNumber !== existingStudent.rollNumber) {
      const duplicateStudent = await Student.findOne({
        rollNumber,
        _id: { $ne: id },
      });

      if (duplicateStudent) {
        res.status(409).json({
          success: false,
          message: `A student with roll number '${rollNumber}' already exists.`,
        });
        return;
      }
    }

    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Student updated successfully.',
      data: updatedStudent,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/students/:id
 * @desc    Delete a student record by ID
 * @access  Public
 */
export const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      res.status(404).json({
        success: false,
        message: `Student with ID '${id}' not found.`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully.',
      data: deletedStudent,
    });
  } catch (error) {
    next(error);
  }
};
