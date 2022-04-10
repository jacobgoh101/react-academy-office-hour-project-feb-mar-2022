import { useQuery } from 'react-query';
import { Column } from 'react-table';
import { QUERY_KEYS } from '../constants/query.constant';
import { InvoiceService } from '../services/invoice.service';
import { TableInvoiceData } from '../types/invoice.types';
import { ListingParams } from '../types/listing.types';
import { formatUnix } from '../utils/date.util';

export const useListInvoices = (listingParams?: ListingParams) => {
  const listInvoicesQuery = useQuery(
    [QUERY_KEYS.LIST_INVOICES, ...Object.values(listingParams || {})],
    () => InvoiceService.list(listingParams),
    { keepPreviousData: true }
  );

  const tableColumns: Column<TableInvoiceData>[] = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Invoice No.', accessor: 'invoiceNumber' },
    { Header: 'Date', accessor: 'date' },
    { Header: 'Due Date', accessor: 'dueDate' },
    { Header: 'Value', accessor: 'value' },
    { Header: 'Client', accessor: 'clientName' },
    { Header: 'Company', accessor: 'companyName' },
  ];

  const tableData: TableInvoiceData[] =
    listInvoicesQuery.data?.data.invoices?.map((invoiceWithClient) => ({
      id: invoiceWithClient.invoice.id,
      invoiceNumber: invoiceWithClient.invoice.invoice_number,
      date: formatUnix(invoiceWithClient.invoice.date),
      dueDate: formatUnix(invoiceWithClient.invoice.dueDate),
      value: invoiceWithClient.invoice.value,
      clientName: invoiceWithClient.client.name,
      companyName: invoiceWithClient.client.companyDetails.name,
      rowHref: `/invoices/${invoiceWithClient.invoice.id}`,
    })) || [];

  return {
    ...listInvoicesQuery,
    tableColumns,
    tableData,
  };
};
