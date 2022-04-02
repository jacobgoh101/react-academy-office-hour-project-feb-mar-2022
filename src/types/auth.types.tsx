import { AxiosError } from 'axios';
import { User } from './user.types';

export interface AuthContext {
  user?: User;
  isLoadingUser?: boolean;
  login: Function;
  signUp: Function;
  signOut: Function;
  loginError: AxiosError;
  signUpError: AxiosError;
}

export interface SignUpResponse {
  user_id: string;
}

export interface LoginResponse {
  user_id: string;
  email: string;
  name: string;
  token: string;
}
