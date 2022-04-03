import { Box, Container } from '@chakra-ui/react';
import { useRequireAuth } from '../../hooks/use-require-auth.hook';
import { useRequireOnboarding } from '../../hooks/use-require-onboarding.hook';
import Nav from '../Nav';

export function DashboardLayout() {
  useRequireAuth();
  useRequireOnboarding();

  return (
    <>
      <Nav />
      <Container maxW="container.xl">
        <Box p={4}>Main Content Here</Box>
      </Container>
    </>
  );
}
