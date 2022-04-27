import { Box, Heading, Progress, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { InvoiceForm } from '../components/invoice/InvoiceForm';
import { DashboardLayout } from '../components/layouts/dashboard';
import { StandardErrorMessage } from '../components/StandardErrorMessage';
import { useClientOptions } from '../hooks/use-all-clients.hook';
import { useErrorParser } from '../hooks/use-error-parser.hook';
import { useGetInvoice } from '../hooks/use-get-invoice.hook';
import { useUpdateInvoice } from '../hooks/use-update-invoice.hook';
import { dateToUnix } from '../utils/date.util';
import { getInvoiceTotalValue } from '../utils/invoice.util';

export default function EditInvoicePage(props: { id: string }) {
  const { id } = props;

  const {
    options: clientOptions,
    getUserIdByClientId,
    isLoading: isLoadingClientOptions,
  } = useClientOptions();
  const {
    data: invoiceData,
    isLoading: isLoadingInvoiceData,
    isError: isInvoiceDataError,
  } = useGetInvoice(id);
  const isLoading = isLoadingClientOptions || isLoadingInvoiceData;

  const { mutateAsync: updateInvoice, isSuccess, error } = useUpdateInvoice();
  const { errorMessage } = useErrorParser(error);
  const [_, setLocation] = useLocation();
  const toast = useToast();

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Invoice updated.',
        description: "We've updated your invoice for you.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setLocation(`/invoices/${id}`);
    }
  }, [isSuccess]);

  return (
    <DashboardLayout>
      <Box mb={20} mt={10}>
        <Heading mb={4}>Edit invoice</Heading>

        {isLoading ? (
          <Progress size="xs" isIndeterminate />
        ) : (
          <InvoiceForm
            errorMessage={errorMessage}
            invoice={invoiceData?.data.invoice}
            onSubmit={async (values) => {
              updateInvoice({
                id,
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
            clientOptions={clientOptions!}
          />
        )}

        {!invoiceData && isInvoiceDataError && <StandardErrorMessage />}
      </Box>
    </DashboardLayout>
  );
}
