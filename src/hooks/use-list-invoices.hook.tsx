import { useQuery } from 'react-query';
import { Column } from 'react-table';
import { QUERY_KEYS } from '../constants/query.constant';
import { InvoiceService } from '../services/invoice.service';
import { TableInvoiceData } from '../types/invoice.types';
import { ListingParams } from '../types/listing.types';
import dayjs from 'dayjs';

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
      date: dayjs
        .unix(invoiceWithClient.invoice.date)
        .format('MMM D, YYYY h:mm A	'),
      dueDate: dayjs
        .unix(invoiceWithClient.invoice.dueDate)
        .format('MMM D, YYYY h:mm A	'),
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
