import { Box, Flex, Progress, Spacer } from '@chakra-ui/react';
import { useRef } from 'react';
import { PrintButton } from '../components/button/PrintButton';
import { InvoiceDetails } from '../components/invoice/InvoiceDetails';
import { DashboardLayout } from '../components/layouts/dashboard';
import { StandardErrorMessage } from '../components/StandardErrorMessage';
import { useGetClient } from '../hooks/use-get-client.hook';
import { useGetInvoice } from '../hooks/use-get-invoice.hook';

export default function InvoicePage(props: { id: string }) {
  const { id } = props;

  const {
    data: invoiceData,
    isSuccess: invoiceQueryIsSuccess,
    isLoading: invoiceQueryIsLoading,
    isError: invoiceQueryIsError,
  } = useGetInvoice(id);
  const {
    data: clientData,
    isSuccess: clientQueryIsSuccess,
    isLoading: clientQueryIsLoading,
    isError: clientQueryIsError,
  } = useGetClient(invoiceData?.data.invoice?.client_id);

  const isSuccess = invoiceQueryIsSuccess && clientQueryIsSuccess;
  const isLoading = invoiceQueryIsLoading || clientQueryIsLoading;
  const isError = invoiceQueryIsError || clientQueryIsError;

  const componentRef = useRef(null);

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
                <PrintButton componentRef={componentRef} />
              </Box>
            </Flex>
            <InvoiceDetails
              ref={componentRef}
              invoice={invoiceData?.data.invoice!}
              client={clientData?.data.client!}
            />
          </>
        )}
        {isError && <StandardErrorMessage />}
      </Box>
    </DashboardLayout>
  );
}
