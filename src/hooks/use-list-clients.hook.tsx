import { AddIcon, EditIcon } from '@chakra-ui/icons';
import { MenuItem } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { Column } from 'react-table';
import { DataTableDropDownIcon } from '../components/data-table/DataTableDropDownIcon';
import { RouterLink } from '../components/router-link';
import { QUERY_KEYS } from '../constants/query.constant';
import { ClientService } from '../services/client.service';
import { TableClientData } from '../types/client.types';
import { ListingParams, Sort } from '../types/listing.types';

export const useListClients = (listingParams?: ListingParams) => {
  const defaultSort = { creation: 'desc' } as Sort;
  // default to sorting by creation DESC
  const iListingParams = useMemo(() => {
    return { sort: defaultSort, ...listingParams };
  }, [listingParams]);

  const listClientsQuery = useQuery(
    [QUERY_KEYS.LIST_CLIENTS, iListingParams],
    () => ClientService.list(iListingParams),
    { keepPreviousData: true, cacheTime: 0 }
  );

  const tableColumns: Column<TableClientData>[] = [
    {
      Header: 'ID',
      accessor: 'id',
      //@ts-ignore
      disableSortBy: true,
    },
    {
      Header: 'Email',
      accessor: 'email',
      //@ts-ignore
      disableSortBy: true,
    },
    { Header: 'Name', accessor: 'clientName' },
    { Header: 'Company Name', accessor: 'companyName' },
    { Header: 'Total Billed', accessor: 'totalBilled' },
    { Header: 'Invoices Count', accessor: 'invoicesCount' },
    {
      Header: '',
      accessor: 'action',
      //@ts-ignore
      disableSortBy: true,
    },
  ];
  const tableData: TableClientData[] =
    listClientsQuery.data?.data.clients?.map((client) => ({
      companyName: client.companyDetails.name,
      email: client.email,
      id: client.id,
      invoicesCount: client.invoicesCount,
      clientName: client.name,
      totalBilled: client.totalBilled,
      rowHref: `/clients/${client.id}`,
      action: (
        <DataTableDropDownIcon>
          <RouterLink href={`/clients/${client.id}/edit`}>
            <MenuItem icon={<EditIcon />}>Edit client</MenuItem>
          </RouterLink>
          <RouterLink href={`/clients/${client.id}/invoices/new`}>
            <MenuItem icon={<AddIcon />}>
              Add a new invoice for the client
            </MenuItem>
          </RouterLink>
        </DataTableDropDownIcon>
      ),
    })) || [];

  return {
    ...listClientsQuery,
    tableColumns,
    tableData,
  };
};
