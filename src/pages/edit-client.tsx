import { Box, Heading, Progress, useToast } from '@chakra-ui/react';
import { pick } from 'lodash';
import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { ClientForm } from '../components/client/ClientForm';
import { DashboardLayout } from '../components/layouts/dashboard';
import { StandardErrorMessage } from '../components/StandardErrorMessage';
import { useGetClient } from '../hooks/use-get-client.hook';
import { useUpdateClient } from '../hooks/use-update-client.hook';

export default function EditClientPage(props: { id: string }) {
  const { id } = props;

  const {
    data: clientData,
    isLoading: isLoadingClientData,
    isError: isClientDataError,
  } = useGetClient(id);
  const { mutateAsync: updateClient, isError, isSuccess } = useUpdateClient();
  const [_, setLocation] = useLocation();
  const toast = useToast();

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Client updated.',
        description: "We've updated your client for you.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setLocation(`/clients/${id}`);
    }
  }, [isSuccess]);

  return (
    <DashboardLayout>
      <Box mb={20} mt={10}>
        <Heading mb={4}>Edit client</Heading>

        {isLoadingClientData ? (
          <Progress size="xs" isIndeterminate />
        ) : (
          <ClientForm
            isError={isError}
            client={clientData?.data.client}
            onSubmit={async (values) => {
              updateClient({
                id,
                ...pick(values, ['name', 'email']),
                companyDetails: {
                  name: values.companyName,
                  ...pick(values, ['address', 'vatNumber', 'regNumber']),
                },
              });
            }}
          />
        )}

        {!clientData && isClientDataError && <StandardErrorMessage />}
      </Box>
    </DashboardLayout>
  );
}
