import { Document } from 'mongoose';
import { DocumentStatus } from './common.types';
import { IUser } from './user.types';

export interface IDocument extends Document {
  _id: string;
  title: string;
  description: string;
  submittedBy: string | IUser;
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

export interface UpdateDocumentDto {
  title?: string;
  description?: string;
  approvers?: string[];
}

export interface DocumentQueryParams {
  status?: DocumentStatus;
  startDate?: Date;
  endDate?: Date;
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

export interface IApprover {
  user: string | IUser;
  status: DocumentStatus;
  comment?: string;
  timestamp: Date;
}

export interface IDocument extends Document {
  title: string;
  description: string;
  submittedBy: string | IUser;
  status: DocumentStatus;
  approvers: IApprover[];
  attachments: IAttachment[];
  createdAt: Date;
  updatedAt: Date;
}
