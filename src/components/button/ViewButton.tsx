import { ViewIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { ReactNode } from 'react';

export function ViewButton(props: { children: ReactNode }) {
  return (
    <Button>
      <ViewIcon mr={1} />
      {props.children}
    </Button>
  );
}
