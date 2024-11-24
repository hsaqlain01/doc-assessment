import express from "express";
import multer from "multer";
import { config } from "../config/env";
import { auth } from "../middlewares/auth";
import { validateBody, validateQuery } from "../middlewares/validate";
import { documentSchemas } from "../validation/schemas";
import * as documentController from "../controllers/document.controller";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: config.uploads.maxSize,
  },
  fileFilter: (_req, file, cb) => {
    if (config.uploads.allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
});

router.post(
  "/",
  auth,
  upload.array("attachments", 5),
  validateBody(documentSchemas.create),
  documentController.createDocument
);

router.get(
  "/",
  auth,
  validateQuery(documentSchemas.query),
  documentController.getDocuments
);

router.put(
  "/:id",
  auth,
  validateBody(documentSchemas.update),
  documentController.updateDocument
);

router.put(
  "/:id/approve",
  auth,
  validateBody(documentSchemas.approval),
  documentController.approveDocument
);

router.put(
  "/:id/reject",
  auth,
  validateBody(documentSchemas.approval),
  documentController.rejectDocument
);

router.get("/stats", auth, documentController.getDocumentStats);

export default router;
