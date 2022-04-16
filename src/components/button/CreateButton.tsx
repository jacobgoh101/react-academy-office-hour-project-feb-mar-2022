import { AddIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { ReactNode } from 'react';

export function CreateButton(props: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  return (
    <Button title={props.href} onClick={props.onClick}>
      <AddIcon mr={1} />
      {props.children}
    </Button>
  );
}
