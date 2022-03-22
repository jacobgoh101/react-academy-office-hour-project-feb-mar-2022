import { User } from './user.types';

export interface AuthContext {
  user?: User;
  login: Function;
  signUp: Function;
  signOut: Function;
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
