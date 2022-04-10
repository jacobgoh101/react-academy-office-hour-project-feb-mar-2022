import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../constants/query.constant';
import { InvoiceService } from '../services/invoice.service';

export const useGetInvoice = (id: string) => {
  const getInvoiceQuery = useQuery(
    [QUERY_KEYS.GET_INVOICE_BY_ID, id],
    () => InvoiceService.get(id),
    { enabled: !!id }
  );

  return {
    ...getInvoiceQuery,
  };
};
