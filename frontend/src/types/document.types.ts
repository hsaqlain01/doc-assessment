import { User } from "./auth.types";

export interface Document {
  _id: string;
  title: string;
  description: string;
  submittedBy: User;
  approver: {
    user: User;
    status: DocumentStatus;
    comment?: string;
    timestamp: Date;
  };
  status: DocumentStatus;
  attachments: Attachment[];
  createdAt: Date;
  updatedAt: Date;
}

export enum DocumentStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export interface Attachment {
  filename: string;
  originalName: string;
  size: number;
  mimeType: string;
  path: string;
}

export interface DocumentState {
  documents: Document[];
  stats: DocumentStats | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

export interface DocumentStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  approvalRate: string;
}
