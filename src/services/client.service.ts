import { axiosClient } from '../constants/axios.client';
import { ApiResponse } from '../types/api.type';
import { Client } from '../types/client.types';
import { ListingParams, PaginatedResponse } from '../types/listing.types';

export class ClientService {
  static list(params?: ListingParams) {
    const { sort, limit = 10, offset = 0 } = params || {};

    return axiosClient.get<PaginatedResponse<Client>>('clients', {
      params: {
        params: JSON.stringify({
          sort,
          offset,
          limit,
        }),
      },
    });
  }

  static get(id: string) {
    return axiosClient.get<ApiResponse<Client>>(`clients/${id}`);
  }
}
