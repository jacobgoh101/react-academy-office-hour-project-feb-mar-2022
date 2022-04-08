import { Box, Heading } from '@chakra-ui/react';
import { DataTable } from '../components/DataTable';
import { DashboardLayout } from '../components/layouts/dashboard';
import { useListClients } from '../hooks/use-list-clients.hook';

export default function DashboardPage() {
  const { tableColumns, tableData, isLoading, isError } = useListClients();
  return (
    <DashboardLayout>
      <Box mb={20}>
        <Heading mb={2}>Client</Heading>
        <DataTable
          columns={tableColumns}
          data={tableData}
          isLoading={isLoading}
          isError={isError}
        />
      </Box>
    </DashboardLayout>
  );
}
