import {
  AuthResponse,
  LoginCredentials,
  RegisterData,
} from 'src/types/auth.types';
import api from './api';
// import { LoginCredentials, RegisterData, AuthResponse } from '../types';

export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const response = await api.post('/users/login', credentials);
  return response.data.data;
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await api.post('/users/register', data);
  return response.data.data;
};
