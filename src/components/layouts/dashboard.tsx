import { Container } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { useRequireAuth } from '../../hooks/use-require-auth.hook';
import { useRequireOnboarding } from '../../hooks/use-require-onboarding.hook';
import Nav from '../Nav';

export function DashboardLayout(props: { children: ReactNode }) {
  useRequireAuth();
  useRequireOnboarding();

  return (
    <>
      <Nav />
      <Container mt={6} mb={20} maxW="container.xl">
        {props.children}
      </Container>
    </>
  );
}
