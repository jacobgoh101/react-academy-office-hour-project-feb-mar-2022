import { axiosClient } from '../constants/axios.client';
import { ApiResponse } from '../types/api.type';
import {
  Invoice,
  InvoiceListingFilter,
  InvoiceWithClient,
} from '../types/invoice.types';
import { ListingParams, PaginatedResponse } from '../types/listing.types';

export class InvoiceService {
  static list(params?: ListingParams & { filter?: InvoiceListingFilter }) {
    const { sort, limit = 10, offset = 0, filter } = params || {};

    return axiosClient.get<PaginatedResponse<InvoiceWithClient>>('invoices', {
      params: {
        params: JSON.stringify({ filter, sort, offset, limit }),
      },
    });
  }

  static get(id: string) {
    return axiosClient.get<ApiResponse<Invoice>>(`invoices/${id}`);
  }
}
