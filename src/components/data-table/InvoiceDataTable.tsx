import { useEffect } from 'react';
import { useIPagination } from '../../hooks/use-i-pagination.hook';
import { useListInvoices } from '../../hooks/use-list-invoices.hook';
import { DataTable } from './DataTable';

export function InvoiceDataTable({
  clientId,
  paginate = false,
}: {
  clientId?: string;
  paginate?: boolean;
}) {
  const { pagination, setTotal } = useIPagination();

  const { tableColumns, tableData, isLoading, isError, data } = useListInvoices(
    {
      filter: { clientId },
      limit: 10,
      offset:
        pagination.currentPage * pagination.pageSize - pagination.pageSize,
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
    />
  );
}
