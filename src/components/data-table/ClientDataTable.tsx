import { useEffect } from 'react';
import { useListClients } from '../../hooks/use-list-clients.hook';
import { DataTable } from './DataTable';
import { useIPagination } from '../../hooks/use-i-pagination.hook';
import { useISortTable } from '../../hooks/use-i-sort-table.hook';

export function ClientDataTable({
  paginate,
  sortable,
}: {
  paginate?: boolean;
  sortable?: boolean;
}) {
  const { handleSort, sort } = useISortTable(sortable);
  const { pagination, setTotal } = useIPagination(paginate);

  const { tableColumns, tableData, isLoading, isError, data } = useListClients({
    limit: 10,
    offset: pagination
      ? pagination.currentPage * pagination.pageSize - pagination.pageSize
      : 0,
    ...(sort && { sort }),
  });

  useEffect(() => {
    setTotal?.(data?.data.total || 0);
  }, [data]);

  return (
    <DataTable
      columns={tableColumns}
      data={tableData}
      isLoading={isLoading}
      isError={isError}
      pagination={paginate ? pagination : undefined}
      sortable={sortable}
      onSort={handleSort}
      sort={sort}
    />
  );
}
