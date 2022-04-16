import { AddIcon, EditIcon } from '@chakra-ui/icons';
import { MenuItem } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { Column } from 'react-table';
import { DataTableDropDownIcon } from '../components/data-table/DataTableDropDownIcon';
import { QUERY_KEYS } from '../constants/query.constant';
import { ClientService } from '../services/client.service';
import { TableClientData } from '../types/client.types';
import { ListingParams } from '../types/listing.types';

export const useListClients = (listingParams?: ListingParams) => {
  const listClientsQuery = useQuery(
    [QUERY_KEYS.LIST_CLIENTS, ...Object.values(listingParams || {})],
    () => ClientService.list(listingParams),
    { keepPreviousData: true }
  );

  const tableColumns: Column<TableClientData>[] = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Company Name', accessor: 'companyName' },
    { Header: 'Total Billed', accessor: 'totalBilled' },
    { Header: 'Invoices Count', accessor: 'invoicesCount' },
    { Header: '', accessor: 'action' },
  ];
  const tableData: TableClientData[] =
    listClientsQuery.data?.data.clients?.map((client) => ({
      companyName: client.companyDetails.name,
      email: client.email,
      id: client.id,
      invoicesCount: client.invoicesCount,
      name: client.name,
      totalBilled: client.totalBilled,
      rowHref: `/clients/${client.id}`,
      action: (
        <DataTableDropDownIcon>
          <MenuItem icon={<EditIcon />}>Edit client</MenuItem>
          <MenuItem icon={<AddIcon />}>
            Add a new invoice for the client
          </MenuItem>
        </DataTableDropDownIcon>
      ),
    })) || [];

  return {
    ...listClientsQuery,
    tableColumns,
    tableData,
  };
};
