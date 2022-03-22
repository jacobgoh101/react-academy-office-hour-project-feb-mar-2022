import { User } from './user.types';

export interface AuthContext {
  user?: User;
  signin: Function;
  signup: Function;
  signout: Function;
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
