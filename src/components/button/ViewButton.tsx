import { ViewIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { ReactNode } from 'react';

export function ViewButton(props: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  return (
    <Button title={props.href} onClick={props.onClick}>
      <ViewIcon mr={1} />
      {props.children}
    </Button>
  );
}
