import { Request, Response, NextFunction } from 'express';

export interface ErrorResponse {
  success: false;
  error: {
    message: string;
    details?: any;
    stack?: string;
  };
}

export type ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => Response<ErrorResponse> | void | Promise<Response<ErrorResponse> | void>;
