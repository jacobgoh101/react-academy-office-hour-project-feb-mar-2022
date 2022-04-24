import { useEffect } from 'react';
import { useIPagination } from '../../hooks/use-i-pagination.hook';
import { useISortTable } from '../../hooks/use-i-sort-table.hook';
import { useListInvoices } from '../../hooks/use-list-invoices.hook';
import { DataTable } from './DataTable';

export function InvoiceDataTable({
  clientId,
  paginate,
  sortable,
}: {
  clientId?: string;
  paginate?: boolean;
  sortable?: boolean;
}) {
  const { handleSort, sort } = useISortTable();
  const { pagination, setTotal } = useIPagination();

  const { tableColumns, tableData, isLoading, isError, data } = useListInvoices(
    {
      filter: { clientId },
      limit: 10,
      offset:
        pagination.currentPage * pagination.pageSize - pagination.pageSize,
      ...(sort && { sort }),
    }
  );

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
      sortable={sortable}
      onSort={handleSort}
    />
  );
}
