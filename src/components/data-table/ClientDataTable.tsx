import { DataTable } from './DataTable';
import { useListClients } from '../../hooks/use-list-clients.hook';

export function ClientDataTable() {
  const { tableColumns, tableData, isLoading, isError } = useListClients();
  return (
    <DataTable
      columns={tableColumns}
      data={tableData}
      isLoading={isLoading}
      isError={isError}
    />
  );
}
