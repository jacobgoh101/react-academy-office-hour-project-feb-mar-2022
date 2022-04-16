import { Box, Flex, Heading, SimpleGrid, Spacer, Text } from '@chakra-ui/react';
import { forwardRef, Ref } from 'react';
import { Client } from '../../types/client.types';
import { Invoice } from '../../types/invoice.types';
import { formatUnix } from '../../utils/date.util';

export const InvoiceDetails = forwardRef(
  (
    { client, invoice }: { client: Client; invoice: Invoice },
    ref: Ref<any>
  ) => {
    return (
      <Box ref={ref}>
        {/* styles for react-to-print */}
        <style>{`@page { margin: ${'40px'} ${'40px'} ${'40px'} ${'40px'} !important; }`}</style>
        <SimpleGrid
          minChildWidth={{ base: '70vw', md: '450px' }}
          spacing={'40px'}
        >
          <Box>
            <Heading size={'md'} mb={2}>
              Bill To:
            </Heading>
            <Text>
              {client?.name} <Text as="i">({client?.email})</Text>
              <br />
              {client?.companyDetails.name}
              <Text as="i">
                (Registration No: {client?.companyDetails.regNumber})
              </Text>
              <br />
              {client?.companyDetails.address}
            </Text>
          </Box>
          <Box>
            <Box>
              <Heading
                px={6}
                py={2}
                size={'xl'}
                mb={2}
                bgGradient="linear(to-r, blue.400, blue.600)"
                color="white"
                textAlign={'center'}
              >
                INVOICE
              </Heading>
            </Box>
            <InvoiceDataRow label={'Date'} value={formatUnix(invoice?.date!)} />
            <InvoiceDataRow
              label={'Due Date'}
              value={formatUnix(invoice?.dueDate!)}
            />
            <InvoiceDataRow
              label={'Invoice #'}
              value={invoice?.invoice_number!}
            />
            <InvoiceDataRow
              label={'Company Reg. No.'}
              value={client?.companyDetails.regNumber!}
            />
            <InvoiceDataRow
              label={'Company VAT. No.'}
              value={client?.companyDetails.vatNumber!}
            />
            <InvoiceDataRow
              label={'Project Code'}
              value={invoice?.projectCode!}
            />
          </Box>
        </SimpleGrid>
        <Box mt={20}>
          <Heading size={'md'} mb={2} textAlign={'center'}>
            Invoice Value: ${invoice?.value}
          </Heading>
        </Box>
      </Box>
    );
  }
);

function InvoiceDataRow({ label, value }: { label: string; value: string }) {
  return (
    <Flex fontWeight={'bold'}>
      <Box>
        <Text>{label}:</Text>
      </Box>
      <Spacer />
      <Box justifyContent={'flex-end'}>
        <Text>{value}</Text>
      </Box>
    </Flex>
  );
}
