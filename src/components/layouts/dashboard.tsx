import { Container } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { useRequireOnboarding } from '../../hooks/use-require-onboarding.hook';
import Nav from '../Nav';

export function DashboardLayout(props: { children: ReactNode }) {
  useRequireOnboarding();

  return (
    <>
      <Nav />
      <Container
        mt={6}
        mb={20}
        maxW={{
          sm: 'container.sm',
          md: 'container.md',
          lg: 'container.lg',
          xl: 'container.xl',
        }}
      >
        {props.children}
      </Container>
    </>
  );
}
