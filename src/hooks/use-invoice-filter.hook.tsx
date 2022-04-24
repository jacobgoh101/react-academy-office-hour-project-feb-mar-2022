import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Select,
  Stack,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { useState } from 'react';
import { InvoiceListingFilter } from '../types/invoice.types';
import * as Yup from 'yup';
import { dateToUnix } from '../utils/date.util';

const InvoiceFilterSchema = Yup.object().shape({
  filterBy: Yup.string()
    .oneOf(['date', 'dueDate'])
    .required()
    .label('Filter By'),
  start: Yup.date().required().label('Start'),
  end: Yup.date()
    .min(Yup.ref('start'), "end date can't be before start date")
    .required()
    .label('End'),
});

export function useInvoiceFilter() {
  const [filter, setFilter] = useState<
    Pick<InvoiceListingFilter, 'date' | 'dueDate'>
  >({});

  const component = (
    <Formik
      initialValues={{
        filterBy: 'date',
        start: '',
        end: '',
      }}
      validationSchema={InvoiceFilterSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setFilter(() => {
          return {
            [values.filterBy]: {
              start: dateToUnix(values.start),
              end: dateToUnix(values.end),
            },
          };
        });
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
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Flex justify={'flex-end'} w={'100%'} mb={5}>
            <VStack spacing={3}>
              <HStack textAlign={'right'} justify="flex-end" w={'100%'}>
                <Box>Filter By</Box>
                <FormControl
                  id="filterBy"
                  isRequired
                  isInvalid={!!errors.filterBy && touched.filterBy}
                  maxW={'150px'}
                >
                  <Field
                    as={Select}
                    name="filterBy"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.filterBy}
                    placeholder="Select option"
                    required
                  >
                    <option value="date">Date</option>
                    <option value="dueDate">Due Date</option>
                  </Field>
                  <FormErrorMessage>{errors.filterBy}</FormErrorMessage>
                </FormControl>
              </HStack>
              <HStack justify="flex-end" w={'100%'}>
                <Box textAlign={'right'} w={100}>
                  Between
                </Box>
                <FormControl
                  id="start"
                  isInvalid={!!errors.start && touched.start}
                  mt={4}
                  maxW={'150px'}
                >
                  <Field
                    as={Input}
                    name="start"
                    type="date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.start}
                    required
                  />
                  <FormErrorMessage>{errors.start}</FormErrorMessage>
                </FormControl>
                <Box textAlign={'center'}> - </Box>
                <FormControl
                  id="end"
                  isInvalid={!!errors.end && touched.end}
                  mt={4}
                  maxW={'150px'}
                >
                  <Field
                    as={Input}
                    name="end"
                    type="date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.end}
                    required
                    maxW={'150px'}
                  />
                  <FormErrorMessage>{errors.end}</FormErrorMessage>
                </FormControl>
              </HStack>
              <HStack justify="flex-end" w={'100%'} spacing={5}>
                <Button
                  onClick={() => {
                    resetForm();
                    setFilter({});
                  }}
                >
                  Clear
                </Button>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type="submit"
                  ml={5}
                >
                  Apply
                </Button>
              </HStack>
            </VStack>
          </Flex>
        </form>
      )}
    </Formik>
  );

  return {
    filter,
    setFilter,
    component,
  };
}
