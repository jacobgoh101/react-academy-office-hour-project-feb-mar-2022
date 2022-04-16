import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import { forwardRef, Ref } from 'react';
import { Client } from '../../types/client.types';

export const ClientDetails = forwardRef(
  ({ client }: { client: Client }, ref: Ref<any>) => {
    return (
      <Box ref={ref}>
        <SimpleGrid
          minChildWidth={{ base: '70vw', md: '450px' }}
          spacing={'40px'}
        >
          <Box>
            <Heading size={'md'} mb={2}>
              Person in Charge:
            </Heading>
            <b>Name: </b> {client?.name}
            <br />
            <b>Email: </b> {client?.email}
            <br />
            <b>User ID: </b> {client?.user_id}
          </Box>
          <Box>
            <Heading size={'md'} mb={2}>
              Company Info:
            </Heading>
            <b>Name: </b> {client?.companyDetails.name}
            <br />
            <b>Reg No.: </b> {client?.companyDetails.regNumber}
            <br />
            <b>VAT No.: </b> {client?.companyDetails.vatNumber}
            <br />
            <b>Address: </b> {client?.companyDetails.address}
          </Box>
        </SimpleGrid>
      </Box>
    );
  }
);
