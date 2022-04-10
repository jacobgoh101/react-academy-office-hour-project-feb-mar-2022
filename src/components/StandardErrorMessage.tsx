import { Heading } from '@chakra-ui/react';
import { ReactNode } from 'react';

export function StandardErrorMessage({
  children = 'Failed to Load Data',
}: {
  children?: ReactNode;
}) {
  return (
    <Heading size="md" my={20} textAlign={'center'} fontWeight={'bold'}>
      {children}
    </Heading>
  );
}
