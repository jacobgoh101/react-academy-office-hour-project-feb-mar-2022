import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../constants/query.constant';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from '../types/invoice.types';

export const useUpdateInvoice = () => {
  const queryClient = useQueryClient();

  const updateInvoiceQuery = useMutation(
    QUERY_KEYS.UPDATE_CLIENT,
    (payload: Invoice) => InvoiceService.update(payload),
    {
      onSuccess(_, { id }) {
        queryClient.invalidateQueries([QUERY_KEYS.GET_INVOICE_BY_ID, id]);
      },
    }
  );

  return updateInvoiceQuery;
};
