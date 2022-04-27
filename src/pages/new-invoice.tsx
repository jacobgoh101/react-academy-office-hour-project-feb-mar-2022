import { Box, Heading, Progress, useToast } from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';
import { useLocation } from 'wouter';
import { InvoiceForm } from '../components/invoice/InvoiceForm';
import { DashboardLayout } from '../components/layouts/dashboard';
import { useClientOptions } from '../hooks/use-all-clients.hook';
import { useCreateInvoice } from '../hooks/use-create-invoice.hook';
import { useErrorParser } from '../hooks/use-error-parser.hook';
import { dateToUnix } from '../utils/date.util';
import { getInvoiceTotalValue } from '../utils/invoice.util';

export default function NewInvoicePage({ clientId }: { clientId?: string }) {
  const {
    options: clientOptions,
    getUserIdByClientId,
    isLoading,
  } = useClientOptions();

  const filteredClientOptions = useMemo(() => {
    if (clientId) {
      return clientOptions?.filter(({ id }) => id === clientId);
    }
    return clientOptions;
  }, [clientId, clientOptions]);

  const {
    mutateAsync: createInvoice,
    isSuccess,
    data,
    error,
  } = useCreateInvoice();
  const { errorMessage } = useErrorParser(error);
  const [_, setLocation] = useLocation();
  const toast = useToast();

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Invoice created.',
        description: "We've created your invoice for you.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setLocation(`/invoices/${data.data.invoice?.id}`);
    }
  }, [isSuccess]);

  return (
    <DashboardLayout>
      <Box mb={20} mt={10}>
        <Heading mb={4}>Create invoice</Heading>

        {isLoading ? (
          <Progress size="xs" isIndeterminate />
        ) : (
          <InvoiceForm
            errorMessage={errorMessage}
            onSubmit={async (values) => {
              createInvoice({
                date: dateToUnix(values.date),
                dueDate: dateToUnix(values.dueDate),
                client_id: values.clientId,
                user_id: getUserIdByClientId(values.clientId)!,
                invoice_number: values.invoiceNumber,
                projectCode: values.projectCode,
                meta: { items: values.items },
                value: getInvoiceTotalValue(values.items),
              });
            }}
            clientOptions={filteredClientOptions!}
          />
        )}
      </Box>
    </DashboardLayout>
  );
}
