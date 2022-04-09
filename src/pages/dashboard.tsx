import { Box, Heading } from '@chakra-ui/react';
import { DashboardLayout } from '../components/layouts/dashboard';
import { ClientDataTable } from '../components/DataTable/ClientDataTable';
import { InvoiceDataTable } from '../components/DataTable/InvoiceDataTable';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <Box mb={20}>
        <Heading mb={2}>Client</Heading>
        <ClientDataTable />
      </Box>
      <Box mb={20}>
        <Heading mb={2}>Invoices</Heading>
        <InvoiceDataTable />
      </Box>
    </DashboardLayout>
  );
}
