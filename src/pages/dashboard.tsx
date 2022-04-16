import { Box, Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { CreateButton } from '../components/button/CreateButton';
import { ViewButton } from '../components/button/ViewButton';
import { ClientDataTable } from '../components/data-table/ClientDataTable';
import { InvoiceDataTable } from '../components/data-table/InvoiceDataTable';
import { DashboardLayout } from '../components/layouts/dashboard';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <Box mb={20}>
        <SimpleGrid columns={{ sm: 1, md: 2 }} mb="4">
          <Heading mb={2}>Latest Clients</Heading>
          <HeaderActionButtonsGroup
            buttons={[
              <ViewButton>View Clients</ViewButton>,
              <CreateButton>Create Client</CreateButton>,
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
              <ViewButton>View Invoices</ViewButton>,
              <CreateButton>Create Invoice</CreateButton>,
            ]}
          />
        </SimpleGrid>
        <InvoiceDataTable />
      </Box>
    </DashboardLayout>
  );
}
function HeaderActionButtonsGroup(props: { buttons: ReactNode[] }) {
  return (
    <Flex justify={{ sm: 'flex-start', md: 'flex-end' }}>
      {props.buttons.map((button, i) => {
        const isLast = i === props.buttons.length - 1;
        return <Box mr={isLast ? undefined : 4}>{button}</Box>;
      })}
    </Flex>
  );
}
