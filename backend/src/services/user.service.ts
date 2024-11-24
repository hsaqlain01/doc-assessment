import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import {
  IUser,
  RegisterUserDto,
  LoginUserDto,
  AuthResponse,
} from "../types/user.types";
import { AppError } from "../utils/errors";
import { config } from "../config/env";

export const register = async (
  userData: RegisterUserDto
): Promise<AuthResponse> => {
  const existingUser = await User.findOne({ email: userData.email });

  if (existingUser) {
    throw new AppError("Email already registered", 400);
  }

  const user = new User({
    name: userData.name,
    email: userData.email,
    password: userData.password,
    role: userData.role,
  });

  await user.save();

  const token = generateToken(user);

  return {
    user: {
      _id: user._id?.toString() || "",
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

export const login = async (
  credentials: LoginUserDto
): Promise<AuthResponse> => {
  const user = await User.findOne({ email: credentials.email });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isPasswordValid = await bcrypt.compare(
    credentials.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = generateToken(user);

  return {
    user: {
      _id: user._id?.toString() || "",
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

export const getUserById = async (userId: string): Promise<IUser> => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

export const updateUser = async (
  userId: string,
  updateData: Partial<IUser>
): Promise<IUser> => {
  // Remove sensitive fields from update data
  const { password, role, ...safeUpdateData } = updateData;

  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  // Update user fields
  Object.assign(user, safeUpdateData);
  await user.save();

  return user;
};

export const changePassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string
): Promise<void> => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

  if (!isPasswordValid) {
    throw new AppError("Current password is incorrect", 401);
  }

  user.password = newPassword;
  await user.save();
};

export const getManagers = async (): Promise<IUser[]> => {
  return User.find({ role: "MANAGER" }).select("_id name email");
};

const generateToken = (user: IUser): string => {
  return jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    config.jwt.secret,
    {
      expiresIn: config.jwt.expiresIn,
    }
  );
};
