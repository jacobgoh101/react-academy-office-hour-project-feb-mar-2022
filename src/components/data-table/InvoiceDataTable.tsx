import { useListInvoices } from '../../hooks/use-list-invoices.hook';
import { DataTable } from './DataTable';

export function InvoiceDataTable({ clientId }: { clientId?: string }) {
  const { tableColumns, tableData, isLoading, isError } = useListInvoices({
    filter: { clientId },
  });
  return (
    <DataTable
      columns={tableColumns}
      data={tableData}
      isLoading={isLoading}
      isError={isError}
    />
  );
}
