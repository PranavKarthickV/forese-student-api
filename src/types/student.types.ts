import { Document, Types } from 'mongoose';

export interface IStudent {
  name: string;
  rollNumber: string;
  department: string;
  year: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IStudentDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  rollNumber: string;
  department: string;
  year: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateStudentDTO {
  name: string;
  rollNumber: string;
  department: string;
  year: number;
}

export interface UpdateStudentDTO {
  name?: string;
  rollNumber?: string;
  department?: string;
  year?: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: string[];
}
