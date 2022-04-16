import { Box, Flex, Heading, Progress, Spacer } from '@chakra-ui/react';
import { CreateButton } from '../components/button/CreateButton';
import { EditButton } from '../components/button/EditButtion';
import { ClientDetails } from '../components/client/ClientDetails';
import { InvoiceDataTable } from '../components/data-table/InvoiceDataTable';
import { HeaderActionButtonsGroup } from '../components/HeaderActionButtonsGroup';
import { DashboardLayout } from '../components/layouts/dashboard';
import { RouterLink } from '../components/router-link';
import { StandardErrorMessage } from '../components/StandardErrorMessage';
import { useGetClient } from '../hooks/use-get-client.hook';

export default function ClientPage(props: { id: string }) {
  const { id } = props;

  const { data: clientData, isSuccess, isLoading, isError } = useGetClient(id);

  return (
    <DashboardLayout>
      <Box mb={20} mt={10}>
        {isLoading && (
          <Box py={20} px={10}>
            <Progress my={20} size="xs" isIndeterminate />
          </Box>
        )}
        {isSuccess && (
          <>
            <Box mb={5}>
              <HeaderActionButtonsGroup
                buttons={[
                  <RouterLink href={`/clients/${id}/edit`}>
                    <EditButton>Edit Client</EditButton>
                  </RouterLink>,
                  <CreateButton>Create Invoice</CreateButton>,
                ]}
              />
            </Box>
            <ClientDetails client={clientData?.data.client!} />
            <Spacer py={10} />
            <Heading mb={2}>Invoices</Heading>
            <InvoiceDataTable clientId={id} />
          </>
        )}
        {isError && <StandardErrorMessage />}
      </Box>
    </DashboardLayout>
  );
}
