import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { AuthLayout } from '../components/layouts/auth';
import { RouterLink } from '../components/router-link';

export function LoginPage() {
  return (
    <AuthLayout
      title="Sign in to your account"
      secondaryTitle={<>to enjoy all of our cool features ✌️</>}
    >
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <Input type="email" />
      </FormControl>
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <Input type="password" />
      </FormControl>
      <Stack spacing={10}>
        <Stack
          direction={{ base: 'column', sm: 'row' }}
          align={'start'}
          justify={'space-between'}
        >
          <Checkbox>Remember me</Checkbox>
          <Link color={'gray.300'} cursor="not-allowed" pointerEvents="none">
            Forgot password?
          </Link>
        </Stack>
        <Button
          bg={'blue.400'}
          color={'white'}
          _hover={{
            bg: 'blue.500',
          }}
        >
          Sign in
        </Button>
      </Stack>
      <Stack pt={6}>
        <Text align={'center'}>
          Don't have an account yet?{' '}
          <RouterLink href="/signup">
            <Link color={'blue.400'}>Sign Up</Link>
          </RouterLink>
        </Text>
      </Stack>
    </AuthLayout>
  );
}
