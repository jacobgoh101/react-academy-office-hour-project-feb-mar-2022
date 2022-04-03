import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { AuthLayout } from '../components/layouts/auth';
import { RouterLink } from '../components/router-link';
import { useAfterAuth } from '../hooks/use-after-auth.hook';
import { useAuth } from '../hooks/use-auth.hook';

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().min(6).max(32).required().label('Password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required()
    .label('Confirm Password'),
  name: Yup.string().min(3).max(255).required().label('Name'),
});

export function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signUp, signUpError } = useAuth();
  useAfterAuth();

  const alert = signUpError && (
    <Box pb={6}>
      <Alert status="error" rounded="md">
        <AlertIcon />
        One or more fields are filled out incorrectly. Please check your entries
        and try again.
      </Alert>
    </Box>
  );

  return (
    <AuthLayout
      title="Sign up"
      secondaryTitle="to enjoy all of our cool features ✌️"
      alert={alert}
    >
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
          name: '',
        }}
        validationSchema={SignUpSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await signUp(values);
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
            <FormControl
              id="name"
              isRequired
              isInvalid={!!errors.name && touched.name}
            >
              <FormLabel>Name</FormLabel>
              <Field
                as={Input}
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>
            <FormControl
              id="email"
              isRequired
              isInvalid={!!errors.email && touched.email}
              mt={4}
            >
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
            <HStack mt={4} align={'start'}>
              <Box w={'50%'}>
                <FormControl
                  id="password"
                  isRequired
                  isInvalid={!!errors.password && touched.password}
                >
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Field
                      as={Input}
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>{' '}
              </Box>
              <Box w={'50%'}>
                <FormControl
                  id="confirmPassword"
                  isRequired
                  isInvalid={
                    !!errors.confirmPassword && touched.confirmPassword
                  }
                >
                  <FormLabel>Confirm Password</FormLabel>
                  <InputGroup>
                    <Field
                      as={Input}
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                    />
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        onClick={() =>
                          setShowConfirmPassword(
                            (showConfirmPassword) => !showConfirmPassword
                          )
                        }
                      >
                        {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                </FormControl>{' '}
              </Box>
            </HStack>
            <Stack spacing={10} pt={2} mt={4}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                type="submit"
                isLoading={isSubmitting}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user?{' '}
                <RouterLink href={'/login' + window.location.search}>
                  <Link color={'blue.400'}>Login</Link>
                </RouterLink>
              </Text>
            </Stack>{' '}
          </form>
        )}
      </Formik>
    </AuthLayout>
  );
}
