import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import { CreateButton } from '../components/button/CreateButton';
import { ViewButton } from '../components/button/ViewButton';
import { InvoiceDataTable } from '../components/data-table/InvoiceDataTable';
import { HeaderActionButtonsGroup } from '../components/HeaderActionButtonsGroup';
import { DashboardLayout } from '../components/layouts/dashboard';
import { RouterLink } from '../components/router-link';

export default function InvoicesPage() {
  return (
    <DashboardLayout>
      <Box mb={20}>
        <SimpleGrid columns={{ sm: 1, md: 2 }} mb="4">
          <Heading mb={2}>Invoices</Heading>
          <HeaderActionButtonsGroup
            buttons={[
              <RouterLink href="/invoices/new">
                <CreateButton>Create Invoice</CreateButton>
              </RouterLink>,
            ]}
          />
        </SimpleGrid>
        <InvoiceDataTable paginate />
      </Box>
    </DashboardLayout>
  );
}
