import { EditIcon } from '@chakra-ui/icons';
import { Icon, MenuItem } from '@chakra-ui/react';
import { MdPrint } from 'react-icons/md';
import { useQuery } from 'react-query';
import { Column } from 'react-table';
import { DataTableDropDownIcon } from '../components/data-table/DataTableDropDownIcon';
import { RouterLink } from '../components/router-link';
import { QUERY_KEYS } from '../constants/query.constant';
import { InvoiceService } from '../services/invoice.service';
import { InvoiceListingFilter, TableInvoiceData } from '../types/invoice.types';
import { ListingParams } from '../types/listing.types';
import { formatUnix } from '../utils/date.util';

export const useListInvoices = (
  listingParams?: ListingParams & { filter?: InvoiceListingFilter }
) => {
  // default to sorting by creation DESC
  listingParams = { sort: { creation: 'desc' }, ...listingParams };

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
    { Header: '', accessor: 'action' },
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
      action: (
        <DataTableDropDownIcon>
          <RouterLink href={`/invoices/${invoiceWithClient.invoice.id}/edit`}>
            <MenuItem icon={<EditIcon />}>Edit invoice</MenuItem>
          </RouterLink>
          <RouterLink href={`/invoices/${invoiceWithClient.invoice.id}/print`}>
            <MenuItem icon={<Icon as={MdPrint} />}>Print invoice</MenuItem>
          </RouterLink>
        </DataTableDropDownIcon>
      ),
    })) || [];

  return {
    ...listInvoicesQuery,
    tableColumns,
    tableData,
  };
};
