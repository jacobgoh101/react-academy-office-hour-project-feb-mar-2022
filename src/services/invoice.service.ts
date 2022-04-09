import { axiosClient } from '../constants/axios.client';
import { Client } from '../types/client.types';
import { InvoiceWithClient } from '../types/invoice.types';
import { ListingParams, PaginatedResponse } from '../types/listing.types';

export class InvoiceService {
  static list(params?: ListingParams & { filter?: { clientId?: string } }) {
    const { sort, limit = 10, offset = 0, filter } = params || {};

    return axiosClient.get<PaginatedResponse<InvoiceWithClient>>('invoices', {
      params: {
        params: JSON.stringify({ filter, sort, offset, limit }),
      },
    });
  }
}
