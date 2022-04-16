import { Button, Icon } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { GrView } from 'react-icons/gr';

export function ViewButton(props: { children: ReactNode }) {
  return (
    <Button>
      <Icon as={GrView} mr={1} />
      {props.children}
    </Button>
  );
}
