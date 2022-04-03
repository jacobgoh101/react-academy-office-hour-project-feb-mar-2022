import { axiosClient } from '../constants/axios.client';
import { CompanyDetails, User } from '../types/user.types';

export class MeService {
  static getMe() {
    return axiosClient.get<User>('me');
  }

  static updateMyCompany(payload: CompanyDetails) {
    return axiosClient.put<User>('me/company', payload);
  }
}
