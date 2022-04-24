import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import { CreateButton } from '../components/button/CreateButton';
import { ViewButton } from '../components/button/ViewButton';
import { ClientDataTable } from '../components/data-table/ClientDataTable';
import { HeaderActionButtonsGroup } from '../components/HeaderActionButtonsGroup';
import { DashboardLayout } from '../components/layouts/dashboard';
import { RouterLink } from '../components/router-link';

export default function ClientsPage() {
  return (
    <DashboardLayout>
      <Box mb={20}>
        <SimpleGrid columns={{ sm: 1, md: 2 }} mb="4">
          <Heading mb={2}>Clients</Heading>
          <HeaderActionButtonsGroup
            buttons={[
              <RouterLink href="/clients/new">
                <CreateButton>Create Client</CreateButton>
              </RouterLink>,
            ]}
          />
        </SimpleGrid>
        <ClientDataTable paginate />
      </Box>
    </DashboardLayout>
  );
}
