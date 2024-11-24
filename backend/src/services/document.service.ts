// src/services/document.service.ts
import { Document } from "../models/Document";
import { AppError } from "../utils/errors";
import {
  DocumentQueryParams,
  CreateDocumentDto,
  UpdateDocumentDto,
  IDocument,
} from "../types/document.types";
import { DocumentStatus, UserRole } from "../types/common.types";
import { IUser } from "../types/user.types";
import { User } from "../models/User";

export const createDocument = async (
  data: CreateDocumentDto,
  files: Express.Multer.File[],
  userId: string
): Promise<IDocument> => {
  const attachments =
    files?.map((file) => ({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimeType: file.mimetype,
      path: file.path,
    })) || [];

  const document = new Document({
    ...data,
    submittedBy: userId,
    status: DocumentStatus.PENDING,
    attachments,
  });

  await document.save();
  return document;
};

export const getDocuments = async (
  user: IUser,
  queryParams: DocumentQueryParams
) => {
  const { status, startDate, endDate, page = 1, limit = 10 } = queryParams;
  const query: Record<string, any> = {};

  if (status) {
    query.status = status;
  }

  if (startDate && endDate) {
    query.createdAt = {
      $gte: startDate,
      $lte: endDate,
    };
  }

  // If user is not admin, show only their documents or documents they need to approve
  if (user.role !== "ADMIN") {
    query.$or = [{ submittedBy: user._id }, { status: DocumentStatus.PENDING }];
  }

  const skip = (page - 1) * limit;

  const [documents, total] = await Promise.all([
    Document.find(query)
      .populate("submittedBy", "name email")
      .populate("approver.user", "name email")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),
    Document.countDocuments(query),
  ]);

  return {
    documents,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  };
};

export const approveDocument = async (
  documentId: string,
  userId: string,
  comment: string
): Promise<IDocument> => {
  const document = await Document.findOne({
    _id: documentId,
  });

  if (!document) {
    throw new AppError("Document not found", 404);
  }

  if (document.status !== DocumentStatus.PENDING) {
    throw new AppError("Document is not in pending status", 400);
  }

  await _validateDocument(userId);

  document.approver.user = userId;
  document.approver.status = DocumentStatus.APPROVED;
  document.approver.comment = comment;
  document.approver.timestamp = new Date();
  document.status = DocumentStatus.APPROVED;

  await document.save();
  return document;
};

export const rejectDocument = async (
  documentId: string,
  userId: string,
  comment: string
): Promise<IDocument> => {
  const document = await Document.findOne({
    _id: documentId,
  });

  if (!document) {
    throw new AppError("Document not found.", 404);
  }

  await _validateDocument(userId);

  document.approver.user = userId;
  document.approver.status = DocumentStatus.REJECTED;
  document.approver.comment = comment;
  document.approver.timestamp = new Date();
  document.status = DocumentStatus.REJECTED;

  await document.save();
  return document;
};

export const updateDocument = async (
  documentId: string,
  userId: string,
  updateData: UpdateDocumentDto
): Promise<IDocument> => {
  const document = await Document.findOne({
    _id: documentId,
    submittedBy: userId,
  });

  if (!document) {
    throw new AppError("Document not found or access denied", 404);
  }

  if (document.status !== DocumentStatus.PENDING) {
    throw new AppError(
      "Cannot update document that is not in PENDING status",
      400
    );
  }

  Object.assign(document, updateData);
  await document.save();
  return document;
};

export const getDocumentStats = async (userId: string) => {
  const baseQuery = { submittedBy: userId };

  const [total, pending, approved, rejected] = await Promise.all([
    Document.countDocuments(baseQuery),
    Document.countDocuments({ ...baseQuery, status: DocumentStatus.PENDING }),
    Document.countDocuments({ ...baseQuery, status: DocumentStatus.APPROVED }),
    Document.countDocuments({ ...baseQuery, status: DocumentStatus.REJECTED }),
  ]);

  return {
    total,
    pending,
    approved,
    rejected,
    approvalRate: total ? ((approved / total) * 100).toFixed(2) : "0",
  };
};

const _validateDocument = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.role !== UserRole.MANAGER) {
    throw new AppError("Only managers can approve or reject documents", 403);
  }
};
