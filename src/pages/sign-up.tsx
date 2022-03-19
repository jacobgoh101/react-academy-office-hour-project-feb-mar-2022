import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { AuthLayout } from '../components/layouts/auth';
import { RouterLink } from '../components/router-link';

export function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthLayout
      title="Sign up"
      secondaryTitle="to enjoy all of our cool features ✌️"
    >
      <HStack>
        <Box>
          <FormControl id="firstName" isRequired>
            <FormLabel>First Name</FormLabel>
            <Input type="text" />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="lastName">
            <FormLabel>Last Name</FormLabel>
            <Input type="text" />
          </FormControl>
        </Box>
      </HStack>
      <FormControl id="email" isRequired>
        <FormLabel>Email address</FormLabel>
        <Input type="email" />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input type={showPassword ? 'text' : 'password'} />
          <InputRightElement h={'full'}>
            <Button
              variant={'ghost'}
              onClick={() => setShowPassword((showPassword) => !showPassword)}
            >
              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Stack spacing={10} pt={2}>
        <Button
          loadingText="Submitting"
          size="lg"
          bg={'blue.400'}
          color={'white'}
          _hover={{
            bg: 'blue.500',
          }}
        >
          Sign up
        </Button>
      </Stack>
      <Stack pt={6}>
        <Text align={'center'}>
          Already a user?{' '}
          <RouterLink href="/login">
            <Link color={'blue.400'}>Login</Link>
          </RouterLink>
        </Text>
      </Stack>
    </AuthLayout>
  );
}
