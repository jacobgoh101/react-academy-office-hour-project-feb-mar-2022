import { useMutation } from 'react-query';
import { QUERY_KEYS } from '../constants/query.constant';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from '../types/invoice.types';

export const useCreateInvoice = () => {
  const createInvoiceQuery = useMutation(
    QUERY_KEYS.CREATE_CLIENT,
    InvoiceService.create
  );

  return createInvoiceQuery;
};
