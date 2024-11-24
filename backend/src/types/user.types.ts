import { Document } from 'mongoose';
import { UserRole } from './common.types';

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterUserDto {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    _id: string;
    name: string;
    email: string;
    role: UserRole;
  };
  token: string;
}
