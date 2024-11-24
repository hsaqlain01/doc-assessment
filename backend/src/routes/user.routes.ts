import express from "express";
// import { validateBody } from "../middleware/validate";
import { userSchemas } from "../validation/schemas";
import * as userController from "../controllers/user.controller";
import { validateBody } from "../middlewares/validate";
import { auth } from "../middlewares/auth";
// import { auth } from "../middleware/auth";

const router = express.Router();

// Public routes
router.post(
  "/register",
  validateBody(userSchemas.register),
  userController.register
);

router.post("/login", validateBody(userSchemas.login), userController.login);

// Protected routes
router.get("/profile", auth, userController.getProfile);

router.put(
  "/profile",
  auth,
  //   validateBody(userSchemas.updateProfile),
  userController.updateProfile
);

router.post(
  "/change-password",
  auth,
  //   validateBody(userSchemas.changePassword),
  userController.changePassword
);

// Admin/Manager routes
router.get("/managers", auth, userController.getManagers);

export default router;
