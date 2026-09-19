import mongoose, { Schema, Model } from 'mongoose';
import { IStudentDocument } from '../types/student.types';

const studentSchema = new Schema<IStudentDocument>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    rollNumber: {
      type: String,
      required: [true, 'Roll number is required'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
      min: [1, 'Year must be between 1 and 4'],
      max: [4, 'Year must be between 1 and 4'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Student: Model<IStudentDocument> = mongoose.model<IStudentDocument>(
  'Student',
  studentSchema
);
