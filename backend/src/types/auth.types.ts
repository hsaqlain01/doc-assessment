import { Request } from 'express';
import { IUser } from './user.types';
import { UserRole } from './common.types';

export interface AuthRequest extends Request {
  user?: IUser;
}

export interface AuthTokenPayload {
  userId: string;
  role: UserRole;
}
