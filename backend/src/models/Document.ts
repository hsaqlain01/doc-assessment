import mongoose from "mongoose";
import { DocumentStatus } from "../types/common.types";
import { IDocument } from "../types/document.types";
// import { IDocument } from "../types/document.types";

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(DocumentStatus),
      default: DocumentStatus.PENDING,
    },
    approver: {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      status: {
        type: String,
        enum: Object.values(DocumentStatus),
        default: DocumentStatus.PENDING,
      },
      comment: String,
      timestamp: Date,
    },
    attachments: [
      {
        filename: String,
        originalName: String,
        size: Number,
        mimeType: String,
        path: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Document = mongoose.model<IDocument>("Document", documentSchema);
