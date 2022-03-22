import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

export function AuthLayout(props: {
  children: ReactNode;
  title: ReactNode;
  secondaryTitle: ReactNode;
}) {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            {props.title}
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            {props.secondaryTitle}
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>{props.children}</Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
