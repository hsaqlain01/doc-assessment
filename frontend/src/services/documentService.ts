import { Document } from "src/types/document.types";
import api from "./api";

interface DocumentResponse {
  success: boolean;
  data: Document;
}

interface DocumentsResponse {
  success: boolean;
  data: {
    documents: Document[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  };
}

interface DocumentStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

export const getAllDocuments = async () => {
  const response = await api.get<DocumentsResponse>("/documents");
  return response.data;
};

export const getDocumentById = async (id: string) => {
  const response = await api.get<DocumentResponse>(`/documents/${id}`);
  return response.data;
};

export const createDocument = async (formData: FormData) => {
  const response = await api.post<DocumentResponse>("/documents", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const approveDocument = async (id: string, comment: string) => {
  const response = await api.put<DocumentResponse>(`/documents/${id}/approve`, {
    comment,
  });
  return response.data;
};

export const rejectDocument = async (id: string, comment: string) => {
  const response = await api.put<DocumentResponse>(`/documents/${id}/reject`, {
    comment,
  });
  return response.data;
};

export const getDocumentStats = async () => {
  const response = await api.get<{ success: boolean; data: DocumentStats }>(
    "/documents/stats"
  );
  return response.data;
};
