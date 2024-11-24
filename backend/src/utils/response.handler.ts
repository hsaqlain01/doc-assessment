// src/utils/response.handler.ts
import { Response } from 'express';
import { AppError } from './errors';

export const handleSuccess = (
  res: Response,
  data: any,
  status: number = 200
) => {
  res.status(status).json({
    success: true,
    data,
  });
};

export const handleError = (res: Response, error: unknown) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      error: {
        message: error.message,
        details: error.details,
      },
    });
  }

  res.status(500).json({
    success: false,
    error: {
      message: 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && {
        details: error instanceof Error ? error.message : String(error),
      }),
    },
  });
};
