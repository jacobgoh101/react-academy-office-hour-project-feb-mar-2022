import { User } from './user.types';

export interface AuthContext {
  user: User | null;
  signin: Function;
  signup: Function;
  signout: Function;
}
