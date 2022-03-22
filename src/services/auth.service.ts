import { axiosClient } from '../constants/axios.client';
import { LoginResponse, SignUpResponse } from '../types/auth.types';

export class AuthService {
  static login({ email, password }: { email: string; password: string }) {
    return axiosClient.post<LoginResponse>('login', {
      email,
      password,
    });
  }

  static signUp({
    name,
    email,
    password,
    confirmPassword,
  }: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    return axiosClient.post<SignUpResponse>('register', {
      name,
      email,
      password,
      confirmPassword,
    });
  }
}
