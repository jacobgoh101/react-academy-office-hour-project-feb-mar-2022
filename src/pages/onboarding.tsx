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
  Progress,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { AuthLayout } from '../components/layouts/auth';
import { useAlreadyOnboarded } from '../hooks/use-already-onboarded.hook';
import { useRequireAuth } from '../hooks/use-require-auth.hook';
import { useUpdateMe } from '../hooks/use-update-me.hook';

const UpdateMyCompanySchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  address: Yup.string().required().label('Address'),
  vatNumber: Yup.string().required().label('VAT Number'),
  regNumber: Yup.string().required().label('Business Registration Number'),
  iban: Yup.string().required().label('IBAN'),
  swift: Yup.string().required().label('SWIFT'),
});

export function OnboardingPage() {
  useAlreadyOnboarded();
  const { user, isLoadingUser } = useRequireAuth();

  const { updateMyCompanyQuery } = useUpdateMe();
  const {
    mutateAsync: updateMyCompany,
    isError: isUpdateMyCompanyError,
    error: updateMyCompanyError,
  } = updateMyCompanyQuery;

  const alert =
    isUpdateMyCompanyError && updateMyCompanyError ? (
      <Box pb={6}>
        <Alert status="error" rounded="md">
          <AlertIcon />
          One or more fields are filled out incorrectly. Please check your
          entries and try again.
        </Alert>
      </Box>
    ) : undefined;

  return (
    <AuthLayout
      title="Fill out your company details"
      secondaryTitle="to help us get to know you better"
      alert={alert}
    >
      {isLoadingUser ? (
        <Progress size="xs" isIndeterminate />
      ) : (
        <Formik
          initialValues={{
            name: user?.companyDetails?.name ?? '',
            address: user?.companyDetails?.address ?? '',
            vatNumber: user?.companyDetails?.vatNumber ?? '',
            regNumber: user?.companyDetails?.regNumber ?? '',
            iban: user?.companyDetails?.iban ?? '',
            swift: user?.companyDetails?.swift ?? '',
          }}
          validationSchema={UpdateMyCompanySchema}
          onSubmit={async (values, { setSubmitting }) => {
            await updateMyCompany(values);
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
                <FormLabel>Company Name</FormLabel>
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
                id="address"
                isRequired
                isInvalid={!!errors.address && touched.address}
                mt={4}
              >
                <FormLabel>Company Address</FormLabel>
                <Field
                  as={Textarea}
                  name="address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                />
                <FormErrorMessage>{errors.address}</FormErrorMessage>
              </FormControl>
              <FormControl
                id="vatNumber"
                isRequired
                isInvalid={!!errors.vatNumber && touched.vatNumber}
                mt={4}
              >
                <FormLabel>VAT Number</FormLabel>
                <Field
                  as={Input}
                  name="vatNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.vatNumber}
                />
                <FormErrorMessage>{errors.vatNumber}</FormErrorMessage>
              </FormControl>
              <FormControl
                id="regNumber"
                isRequired
                isInvalid={!!errors.regNumber && touched.regNumber}
                mt={4}
              >
                <FormLabel>Business Registration Number</FormLabel>
                <Field
                  as={Input}
                  name="regNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.regNumber}
                />
                <FormErrorMessage>{errors.regNumber}</FormErrorMessage>
              </FormControl>
              <HStack mt={4} align={'start'}>
                <Box w={'50%'}>
                  <FormControl
                    id="iban"
                    isRequired
                    isInvalid={!!errors.iban && touched.iban}
                  >
                    <FormLabel>IBAN</FormLabel>
                    <Field
                      as={Input}
                      name="iban"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.iban}
                    />
                    <FormErrorMessage>{errors.iban}</FormErrorMessage>
                  </FormControl>
                </Box>
                <Box w={'50%'}>
                  <FormControl
                    id="swift"
                    isRequired
                    isInvalid={!!errors.swift && touched.swift}
                  >
                    <FormLabel>SWIFT</FormLabel>
                    <Field
                      as={Input}
                      name="swift"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.swift}
                    />
                    <FormErrorMessage>{errors.swift}</FormErrorMessage>
                  </FormControl>
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
                  Save
                </Button>
              </Stack>
            </form>
          )}
        </Formik>
      )}
    </AuthLayout>
  );
}
