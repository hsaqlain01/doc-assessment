import { Request, NextFunction, Response } from "express";
import * as documentService from "../services/document.service";
import { handleSuccess, handleError } from "../utils/response.handler";
import { AuthRequest } from "../types/auth.types";

export const createDocument = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files as Express.Multer.File[];
    const document = await documentService.createDocument(
      req.body,
      files,
      req.user!._id
    );
    handleSuccess(res, document, 201);
  } catch (error) {
    handleError(res, error);
  }
};

export const getDocuments = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await documentService.getDocuments(req.user!, req.query);
    handleSuccess(res, result);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateDocument = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const document = await documentService.updateDocument(
      req.params.id,
      req.user!._id,
      req.body
    );
    handleSuccess(res, document);
  } catch (error) {
    handleError(res, error);
  }
};

export const approveDocument = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const document = await documentService.approveDocument(
      req.params.id,
      req.user!._id.toString(),
      req.body.comment
    );
    handleSuccess(res, document);
  } catch (error) {
    handleError(res, error);
  }
};

export const rejectDocument = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const document = await documentService.rejectDocument(
      req.params.id,
      req.user!._id,
      req.body.comment
    );
    handleSuccess(res, document);
  } catch (error) {
    handleError(res, error);
  }
};

export const getDocumentStats = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const stats = await documentService.getDocumentStats(req.user!._id);
    handleSuccess(res, stats);
  } catch (error) {
    handleError(res, error);
  }
};
