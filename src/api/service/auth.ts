import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@/types';
import { axiosClient } from '../base';

export const signIn = async (request: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axiosClient.post<LoginResponse>('/auth/login', request);
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (request: RegisterRequest): Promise<RegisterResponse> => {
  try {
    const response = await axiosClient.post<RegisterResponse>('/auth/register', request);
    return response?.data;
  } catch (error) {
    throw error;
  }
};
