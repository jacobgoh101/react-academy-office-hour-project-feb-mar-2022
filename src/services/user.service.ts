import { axiosClient } from '../constants/axios.client';
import { User } from '../types/user.types';

export class UserService {
  static getMe() {
    return axiosClient.get<User>('me');
  }
}
