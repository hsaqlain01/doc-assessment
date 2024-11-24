import { Request, Response } from "express";
import * as userService from "../services/user.service";
import { handleSuccess, handleError } from "../utils/response.handler";
import { AuthRequest } from "../types/auth.types";

export const register = async (req: Request, res: Response) => {
  try {
    const result = await userService.register(req.body);
    handleSuccess(res, result, 201);
  } catch (error) {
    handleError(res, error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await userService.login(req.body);
    handleSuccess(res, result);
  } catch (error) {
    handleError(res, error);
  }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?._id) {
      throw new Error("User not authenticated");
    }
    const userId = req.user._id.toString();
    const user = await userService.getUserById(userId);
    handleSuccess(res, user);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?._id) {
      throw new Error("User not authenticated");
    }
    const userId = req.user._id.toString();
    const user = await userService.updateUser(userId, req.body);
    handleSuccess(res, user);
  } catch (error) {
    handleError(res, error);
  }
};

export const changePassword = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?._id) {
      throw new Error("User not authenticated");
    }
    const userId = req.user._id.toString();

    await userService.changePassword(
      userId,
      req.body.oldPassword,
      req.body.newPassword
    );

    handleSuccess(res, { message: "Password updated successfully" });
  } catch (error) {
    handleError(res, error);
  }
};

export const getManagers = async (_req: Request, res: Response) => {
  try {
    const managers = await userService.getManagers();
    handleSuccess(res, managers);
  } catch (error) {
    handleError(res, error);
  }
};
