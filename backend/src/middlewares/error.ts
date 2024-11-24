import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import { config } from '../config/env';
import { ErrorRequestHandler } from '../types/error.types';

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      error: {
        message: error.message,
        details: error.details,
      },
    });
  }

  // Mongoose validation error
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation Error',
        details: error.message,
      },
    });
  }

  // JWT error
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      error: {
        message: 'Invalid token',
      },
    });
  }

  // Default error
  return res.status(500).json({
    success: false,
    error: {
      message: 'Internal Server Error',
      ...(config.app.env === 'development' && { stack: error.stack }),
    },
  });
};
