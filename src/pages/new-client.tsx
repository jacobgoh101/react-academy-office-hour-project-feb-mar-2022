import { Box, Heading, useToast } from '@chakra-ui/react';
import { pick } from 'lodash';
import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { ClientForm } from '../components/client/ClientForm';
import { DashboardLayout } from '../components/layouts/dashboard';
import { useCreateClient } from '../hooks/use-create-client.hook';

export default function NewClientPage() {
  const {
    mutateAsync: createClient,
    data,
    isSuccess,
    isError,
  } = useCreateClient();
  const [_, setLocation] = useLocation();
  const toast = useToast();

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Client created.',
        description: "We've created your client for you.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setLocation(`/clients/${data.data.client?.id}`);
    }
  }, [isSuccess]);

  return (
    <DashboardLayout>
      <Box mb={20} mt={10}>
        <Heading mb={4}>Create new client</Heading>

        <ClientForm
          isError={isError}
          onSubmit={async (values) => {
            createClient({
              ...pick(values, ['name', 'email']),
              companyDetails: {
                name: values.companyName,
                ...pick(values, ['address', 'vatNumber', 'regNumber']),
              },
            });
          }}
        />
      </Box>
    </DashboardLayout>
  );
}
