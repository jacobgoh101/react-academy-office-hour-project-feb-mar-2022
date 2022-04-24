import { Button, Icon } from '@chakra-ui/react';
import { MdPrint } from 'react-icons/md';

export function PrintButton(props: { handlePrint: () => void }) {
  return (
    <Button onClick={props.handlePrint}>
      <Icon as={MdPrint} mr={1} />
      Print
    </Button>
  );
}
