import { useListInvoices } from '../../hooks/use-list-invoices.hook';
import { DataTable } from './DataTable';

export function InvoiceDataTable() {
  const { tableColumns, tableData, isLoading, isError } = useListInvoices();
  return (
    <DataTable
      columns={tableColumns}
      data={tableData}
      isLoading={isLoading}
      isError={isError}
    />
  );
}
