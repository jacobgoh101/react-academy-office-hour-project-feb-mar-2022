import { useEffect } from 'react';
import { useIPagination } from '../../hooks/use-i-pagination.hook';
import { useISortTable } from '../../hooks/use-i-sort-table.hook';
import { useListInvoices } from '../../hooks/use-list-invoices.hook';
import { DataTable } from './DataTable';
import { useInvoiceFilter } from '../../hooks/use-invoice-filter.hook';

export function InvoiceDataTable({
  clientId,
  paginate,
  sortable,
}: {
  clientId?: string;
  paginate?: boolean;
  sortable?: boolean;
}) {
  const { handleSort, sort } = useISortTable(sortable);
  const { pagination, setTotal } = useIPagination(paginate);
  const { component: filterComponent, filter } = useInvoiceFilter(paginate);

  const { tableColumns, tableData, isLoading, isError, data } = useListInvoices(
    {
      filter: { clientId, ...filter },
      limit: 10,
      offset: pagination
        ? pagination.currentPage * pagination.pageSize - pagination.pageSize
        : 0,
      ...(sort && { sort }),
    }
  );

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
      filter={paginate && filterComponent}
      key={JSON.stringify(sort)}
    />
  );
}
