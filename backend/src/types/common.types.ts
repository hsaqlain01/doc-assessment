// // types/index.ts
// export enum UserRole {
//   USER = "USER",
//   MANAGER = "MANAGER",
//   ADMIN = "ADMIN",
// }

// export enum DocumentStatus {
//   PENDING = "PENDING",
//   APPROVED = "APPROVED",
//   REJECTED = "REJECTED",
// }

// export interface IUser {
//   _id: string;
//   name: string;
//   email: string;
//   role: UserRole;
//   createdAt: Date;
//   updatedAt: Date;
// }

// export interface IApprover {
//   user: string | IUser;
//   status: DocumentStatus;
//   comment?: string;
//   timestamp: Date;
// }

// export interface IDocument {
// _id: string;
// title: string;
// description: string;
// submittedBy: string | IUser;
// status: DocumentStatus;
// approvers: IApprover[];
// file?: string;
// createdAt: Date;
// updatedAt: Date;
// }

// export interface LoginCredentials {
//   email: string;
//   password: string;
// }

// export interface RegisterData extends LoginCredentials {
//   name: string;
//   role?: UserRole;
// }

// export interface AuthResponse {
//   user: IUser;
//   token: string;
// }

// export interface DocumentFormData {
//   title: string;
//   description: string;
//   file?: File;
// }

// export interface ApiError {
//   message: string;
//   status: number;
// }
export enum UserRole {
  USER = "USER",
  MANAGER = "MANAGER",
  ADMIN = "ADMIN",
}

export enum DocumentStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: any;
  };
}
