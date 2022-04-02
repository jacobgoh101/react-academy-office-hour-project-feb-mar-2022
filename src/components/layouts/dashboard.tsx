import { Box, Container } from '@chakra-ui/react';
import { useRequireAuth } from '../../hooks/use-require-auth.hook';
import Nav from '../Nav';

export function DashboardLayout() {
  useRequireAuth();

  return (
    <>
      <Nav />
      <Container maxW="container.xl">
        <Box p={4}>Main Content Here</Box>
      </Container>
    </>
  );
}
