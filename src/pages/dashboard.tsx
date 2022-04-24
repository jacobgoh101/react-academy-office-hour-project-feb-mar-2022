import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import { CreateButton } from '../components/button/CreateButton';
import { ViewButton } from '../components/button/ViewButton';
import { ClientDataTable } from '../components/data-table/ClientDataTable';
import { InvoiceDataTable } from '../components/data-table/InvoiceDataTable';
import { DashboardLayout } from '../components/layouts/dashboard';
import { RouterLink } from '../components/router-link';
import { HeaderActionButtonsGroup } from '../components/HeaderActionButtonsGroup';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <Box mb={20}>
        <SimpleGrid columns={{ sm: 1, md: 2 }} mb="4">
          <Heading mb={2}>Latest Clients</Heading>
          <HeaderActionButtonsGroup
            buttons={[
              <RouterLink href="/clients">
                <ViewButton>View Clients</ViewButton>
              </RouterLink>,
              <RouterLink href="/clients/new">
                <CreateButton>Create Client</CreateButton>
              </RouterLink>,
            ]}
          />
        </SimpleGrid>
        <ClientDataTable />
      </Box>
      <Box mb={20}>
        <SimpleGrid columns={{ sm: 1, md: 2 }} mb="4">
          <Heading mb={2}>Latest Invoices</Heading>
          <HeaderActionButtonsGroup
            buttons={[
              <RouterLink href="/invoices">
                <ViewButton>View Invoices</ViewButton>
              </RouterLink>,
              <RouterLink href="/invoices/new">
                <CreateButton>Create Invoice</CreateButton>
              </RouterLink>,
            ]}
          />
        </SimpleGrid>
        <InvoiceDataTable />
      </Box>
    </DashboardLayout>
  );
}
