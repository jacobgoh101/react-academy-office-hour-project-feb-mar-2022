import { Box, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

export function HeaderActionButtonsGroup(props: { buttons: ReactNode[] }) {
  return (
    <Flex justify={{ sm: 'flex-start', md: 'flex-end' }}>
      {props.buttons.map((button, i) => {
        const isLast = i === props.buttons.length - 1;
        return (
          <Box mr={isLast ? undefined : 4} key={i}>
            {button}
          </Box>
        );
      })}
    </Flex>
  );
}
