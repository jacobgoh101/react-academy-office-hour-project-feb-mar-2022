import { Box, Flex, Heading, Progress, Spacer } from '@chakra-ui/react';
import { CreateButton } from '../components/button/CreateButton';
import { ClientDetails } from '../components/client/ClientDetails';
import { InvoiceDataTable } from '../components/data-table/InvoiceDataTable';
import { DashboardLayout } from '../components/layouts/dashboard';
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
            <Flex mb={5}>
              <Spacer />
              <Box>
                <CreateButton>Create Invoice</CreateButton>
              </Box>
            </Flex>
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
