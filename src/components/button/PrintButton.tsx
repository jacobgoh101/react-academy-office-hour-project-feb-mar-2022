import { Button, Icon } from '@chakra-ui/react';
import { MdPrint } from 'react-icons/md';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';

export function PrintButton(props: { componentRef: React.RefObject<any> }) {
  return (
    <ReactToPrint content={() => props.componentRef.current}>
      <PrintContextConsumer>
        {({ handlePrint }) => (
          <Button onClick={handlePrint}>
            <Icon as={MdPrint} mr={1} />
            Print
          </Button>
        )}
      </PrintContextConsumer>
    </ReactToPrint>
  );
}
