import { useEffect } from 'react';
import { useListClients } from '../../hooks/use-list-clients.hook';
import { DataTable } from './DataTable';
import { useIPagination } from '../../hooks/use-i-pagination.hook';

export function ClientDataTable({ paginate = false }: { paginate?: boolean }) {
  const { pagination, setTotal } = useIPagination();

  const { tableColumns, tableData, isLoading, isError, data } = useListClients({
    limit: 10,
    offset: pagination.currentPage * pagination.pageSize - pagination.pageSize,
  });

  useEffect(() => {
    setTotal(data?.data.total || 0);
  }, [data]);

  return (
    <DataTable
      columns={tableColumns}
      data={tableData}
      isLoading={isLoading}
      isError={isError}
      pagination={paginate ? pagination : undefined}
    />
  );
}
