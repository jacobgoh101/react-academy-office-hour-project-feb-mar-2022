import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import pick from 'lodash/pick';
import * as Yup from 'yup';
import { AuthLayout } from '../components/layouts/auth';
import { RouterLink } from '../components/router-link';
import { useAfterAuth } from '../hooks/use-after-auth.hook';
import { useAuth } from '../hooks/use-auth.hook';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).max(32).required(),
});

export function LoginPage() {
  const { login, loginError } = useAuth();
  useAfterAuth();

  const alert = loginError && (
    <Box pb={6}>
      <Alert status="error" rounded="md">
        <AlertIcon />
        The username or password is incorrect
      </Alert>
    </Box>
  );

  return (
    <AuthLayout
      title="Sign in to your account"
      secondaryTitle={<>to enjoy all of our cool features ✌️</>}
      alert={alert}
    >
      <Formik
        initialValues={{
          email: '',
          password: '',
          rememberMe: false,
        }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await login(pick(values, 'email', 'password'));
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <FormControl id="email" isInvalid={!!errors.email && touched.email}>
              <FormLabel>Email address</FormLabel>
              <Field
                as={Input}
                name="email"
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl
              id="password"
              mt={4}
              isInvalid={!!errors.password && touched.password}
            >
              <FormLabel>Password</FormLabel>
              <Field
                as={Input}
                name="password"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
            <Stack spacing={10} mt={4}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Field
                  visibility={'hidden'}
                  as={Checkbox}
                  name="rememberMe"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.rememberMe}
                >
                  Remember me
                </Field>
                <Link
                  color={'gray.300'}
                  cursor="not-allowed"
                  pointerEvents="none"
                >
                  Forgot password?
                </Link>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                type="submit"
                isLoading={isSubmitting}
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
          </form>
        )}
      </Formik>
    </AuthLayout>
  );
}
