import dotenv from 'dotenv';
import { AppError } from '../utils/errors';

dotenv.config();

const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET', 'PORT'] as const;

requiredEnvVars.forEach((var_) => {
  if (!process.env[var_]) {
    throw new AppError(`Missing required environment variable: ${var_}`, 500);
  }
});

export const config = {
  mongodb: {
    uri: process.env.MONGODB_URI!,
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
  app: {
    port: parseInt(process.env.PORT!) || 4000,
    env: process.env.NODE_ENV || 'development',
  },
  uploads: {
    maxSize: parseInt(process.env.MAX_FILE_SIZE!) || 5 * 1024 * 1024, // 5MB
    allowedTypes: (
      process.env.ALLOWED_FILE_TYPES || 'application/pdf,image/jpeg,image/png'
    ).split(','),
  },
} as const;
