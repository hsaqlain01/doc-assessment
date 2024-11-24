import { Document } from 'mongoose';
import { DocumentStatus } from './common.types';
import { IUser } from './user.types';

export interface IDocument extends Document {
  _id: string;
  title: string;
  description: string;
  submittedBy: IUser;
  status: DocumentStatus;
  approver: IApprover;
  file?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IApprover {
  user: string | IUser;
  status: DocumentStatus;
  comment?: string;
  timestamp: Date;
}

export interface CreateDocumentDto {
  title: string;
  description: string;
  approvers?: string[];
}

export interface DocumentQueryParams {
  status?: DocumentStatus;
  page?: number;
  limit?: number;
}

export interface IAttachment {
  filename: string;
  originalName: string;
  size: number;
  mimeType: string;
  path: string;
}
