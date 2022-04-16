import { Button, Icon } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { MdCreate } from 'react-icons/md';

export function CreateButton(props: { children: ReactNode }) {
  return (
    <Button>
      <Icon as={MdCreate} mr={1} />
      {props.children}
    </Button>
  );
}
