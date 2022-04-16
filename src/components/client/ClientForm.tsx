import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  SimpleGrid,
  Textarea,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { Client } from '../../types/client.types';
import { StandardFormErrorAlert } from '../StandardFormErrorAlert';

const ClientSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  email: Yup.string().required().label('Email'),
  companyName: Yup.string().required().label('CompanyName'),
  address: Yup.string().required().label('Address'),
  vatNumber: Yup.string().required().label('VAT Number'),
  regNumber: Yup.string().required().label('Business Registration Number'),
});

export function ClientForm(props: {
  client?: Client;
  onSubmit: (values: {
    name: string;
    email: string;
    companyName: string;
    address: string;
    vatNumber: string;
    regNumber: string;
  }) => void;
  isError: boolean;
}) {
  const { client, onSubmit } = props;
  return (
    <>
      {props.isError && <StandardFormErrorAlert />}
      <Formik
        initialValues={{
          name: client?.name ?? '',
          email: client?.email ?? '',
          companyName: client?.companyDetails?.name ?? '',
          address: client?.companyDetails?.address ?? '',
          vatNumber: client?.companyDetails?.vatNumber ?? '',
          regNumber: client?.companyDetails?.regNumber ?? '',
        }}
        validationSchema={ClientSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await onSubmit(values);
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
            <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={5}>
              <FormControl
                id="name"
                isRequired
                isInvalid={!!errors.name && touched.name}
                mt={4}
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
            </SimpleGrid>
            <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={5}>
              <FormControl
                id="companyName"
                isRequired
                isInvalid={!!errors.companyName && touched.companyName}
                mt={4}
              >
                <FormLabel>Company Name</FormLabel>
                <Field
                  as={Input}
                  name="companyName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.companyName}
                />
                <FormErrorMessage>{errors.companyName}</FormErrorMessage>
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
            </SimpleGrid>
            <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={5}>
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
            </SimpleGrid>
            <Box pt={2} mt={4} textAlign="center">
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
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
}
