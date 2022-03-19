import { Box, Container } from '@chakra-ui/react';
import Nav from '../Nav';

export function DashboardLayout() {
  return (
    <>
      <Nav />
      <Container maxW="container.xl">
        <Box p={4}>Main Content Here</Box>
      </Container>
    </>
  );
}
