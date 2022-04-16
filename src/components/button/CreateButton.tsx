import { AddIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { ReactNode } from 'react';

export function CreateButton(props: { children: ReactNode }) {
  return (
    <Button>
      <AddIcon mr={1} />
      {props.children}
    </Button>
  );
}
