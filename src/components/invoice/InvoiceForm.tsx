import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { Field, Formik, FormikErrors, FormikTouched } from 'formik';
import { get, set } from 'lodash';
import * as Yup from 'yup';
import { Client } from '../../types/client.types';
import { Invoice, InvoiceItem } from '../../types/invoice.types';
import { unixToDate } from '../../utils/date.util';
import { getInvoiceTotalValue } from '../../utils/invoice.util';
import { CreateButton } from '../button/CreateButton';
import { StandardFormErrorAlert } from '../StandardFormErrorAlert';

const InvoiceSchema = Yup.object().shape({
  clientId: Yup.string().required().label('Client'),
  date: Yup.date().required().label('Date'),
  dueDate: Yup.date().required().label('Due Date'),
  invoiceNumber: Yup.number().required().label('Invoice No.'),
  projectCode: Yup.string().required().label('Project Code'),
  items: Yup.array()
    .of(
      Yup.object().shape({
        description: Yup.string().required().label('Item Description'),
        rate: Yup.number().min(0.01).required().label('Rate'),
        quantity: Yup.number().integer().min(1).required().label('Quantity'),
      })
    )
    .label('Items'),
});

function ItemManager(props: {
  values: {
    clientId: string;
    date: string;
    dueDate: string;
    invoiceNumber: string;
    projectCode: string;
    items: InvoiceItem[];
  };
  errors: FormikErrors<{
    clientId: string;
    date: number;
    dueDate: number;
    invoiceNumber: string;
    projectCode: string;
    items: InvoiceItem[];
  }>;
  touched: FormikTouched<{
    clientId: string;
    date: number;
    dueDate: number;
    invoiceNumber: string;
    projectCode: string;
    items: InvoiceItem[];
  }>;
  handleChange: Function;
  handleBlur: Function;
  setFieldValue: Function;
}) {
  const AddLineItem = () =>
    props.setFieldValue('items', [
      ...props.values.items,
      {
        description: '',
        rate: 0,
        quantity: 0,
      },
    ]);

  const DeleteLineItem = (i: number) => () =>
    props.setFieldValue(
      'items',
      props.values.items.filter((_, j) => i !== j)
    );

  return (
    <Box overflowX="auto">
      <Table>
        <Thead>
          <Tr>
            <Th>Item Description</Th>
            <Th>Rate</Th>
            <Th>Qty</Th>
            <Th>Line Total</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.values.items.map((item, i) => (
            <Tr key={i}>
              <Td valign="top">
                <FormControl
                  id={`items[${i}].description`}
                  isInvalid={
                    !!get(props.errors, `items[${i}].description`) &&
                    get(props.touched, `items[${i}].description`)
                  }
                >
                  <Field
                    as={Input}
                    name={`items[${i}].description`}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={get(props.values, `items[${i}].description`)}
                  />
                  <FormErrorMessage>
                    {get(props.errors, `items[${i}].description`)}
                  </FormErrorMessage>
                </FormControl>
              </Td>
              <Td valign="top">
                <FormControl
                  id={`items[${i}].rate`}
                  isInvalid={
                    !!get(props.errors, `items[${i}].rate`) &&
                    get(props.touched, `items[${i}].rate`)
                  }
                >
                  <InputGroup>
                    <InputLeftAddon children="$" />
                    <Field
                      as={Input}
                      type="number"
                      step="0.01"
                      name={`items[${i}].rate`}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={get(props.values, `items[${i}].rate`)}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {get(props.errors, `items[${i}].rate`)}
                  </FormErrorMessage>
                </FormControl>
              </Td>
              <Td valign="top">
                <FormControl
                  id={`items[${i}].quantity`}
                  isInvalid={
                    !!get(props.errors, `items[${i}].quantity`) &&
                    get(props.touched, `items[${i}].quantity`)
                  }
                >
                  <Field
                    as={Input}
                    name={`items[${i}].quantity`}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={get(props.values, `items[${i}].quantity`)}
                  />
                  <FormErrorMessage>
                    {get(props.errors, `items[${i}].quantity`)}
                  </FormErrorMessage>
                </FormControl>
              </Td>
              <Td valign="top">${(item.rate * item.quantity)?.toFixed(2)}</Td>
              <Td valign="top">
                <IconButton
                  aria-label="Delete line item"
                  icon={<DeleteIcon />}
                  onClick={DeleteLineItem(i)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Box textAlign={'center'} mt={4} mb={12}>
        <CreateButton onClick={AddLineItem}>Add new line</CreateButton>
      </Box>
    </Box>
  );
}

export function InvoiceForm(props: {
  invoice?: Invoice;
  onSubmit: (values: {
    clientId: string;
    date: string;
    dueDate: string;
    invoiceNumber: string;
    projectCode: string;
    items: InvoiceItem[];
  }) => void;
  isError: boolean;
  clientOptions: Client[];
}) {
  const { invoice, onSubmit } = props;

  let defaultMetaItems = invoice?.meta?.items;
  if (!defaultMetaItems) {
    defaultMetaItems = [
      { description: 'Unnamed Item', rate: invoice?.value || 0, quantity: 0 },
    ];
  }

  const disableClientSelection =
    invoice?.client_id || props.clientOptions.length < 2;

  return (
    <>
      {props.isError && <StandardFormErrorAlert />}
      <Formik
        initialValues={{
          clientId: invoice?.client_id || props.clientOptions[0].id || '',
          date: invoice?.date ? unixToDate(invoice.date) : ''!,
          dueDate: invoice?.dueDate ? unixToDate(invoice.dueDate) : ''!,
          invoiceNumber: invoice?.invoice_number || '',
          projectCode: invoice?.projectCode || '',
          items: defaultMetaItems || [],
        }}
        validationSchema={InvoiceSchema}
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
          setFieldValue,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Flex justify={'center'}>
                <FormControl
                  w={{ sm: '100%', md: 'calc((100% - 20px)/2)' }}
                  id="clientId"
                  isRequired
                  isInvalid={!!errors.clientId && touched.clientId}
                  mt={4}
                >
                  <FormLabel>Client</FormLabel>
                  {/* TODO: use a combobox for this? */}
                  <Field
                    as={Select}
                    name="clientId"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.clientId}
                    disabled={disableClientSelection}
                  >
                    {props.clientOptions.map((client) => (
                      <option value={client.id} key={client.id}>
                        {client.companyDetails.name} - {client.name} (
                        {client.email})
                      </option>
                    ))}
                  </Field>
                  <FormErrorMessage>{errors.clientId}</FormErrorMessage>
                </FormControl>
              </Flex>
              <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={5}>
                <FormControl
                  id="invoiceNumber"
                  isInvalid={!!errors.invoiceNumber && touched.invoiceNumber}
                  mt={4}
                >
                  <FormLabel>Invoice No.</FormLabel>
                  <Field
                    as={Input}
                    name="invoiceNumber"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.invoiceNumber}
                  />
                  <FormErrorMessage>{errors.invoiceNumber}</FormErrorMessage>
                </FormControl>
                <FormControl
                  id="projectCode"
                  isInvalid={!!errors.projectCode && touched.projectCode}
                  mt={4}
                >
                  <FormLabel>Project Code</FormLabel>
                  <Field
                    as={Input}
                    name="projectCode"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.projectCode}
                  />
                  <FormErrorMessage>{errors.projectCode}</FormErrorMessage>
                </FormControl>
              </SimpleGrid>
              <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={5}>
                <FormControl
                  id="date"
                  isInvalid={!!errors.date && touched.date}
                  mt={4}
                >
                  <FormLabel>Date</FormLabel>
                  <Field
                    as={Input}
                    name="date"
                    type="date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.date}
                  />
                  <FormErrorMessage>{errors.date}</FormErrorMessage>
                </FormControl>
                <FormControl
                  id="dueDate"
                  isInvalid={!!errors.dueDate && touched.dueDate}
                  mt={4}
                >
                  <FormLabel>Due Date</FormLabel>
                  <Field
                    as={Input}
                    name="dueDate"
                    type="date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.dueDate}
                  />
                  <FormErrorMessage>{errors.dueDate}</FormErrorMessage>
                </FormControl>
              </SimpleGrid>
              <Divider my={10} />
              <ItemManager
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
              />
              <Box mt={0}>
                <Heading size={'md'} mb={2} textAlign={'center'}>
                  Total: ${getInvoiceTotalValue(values.items)}
                </Heading>
              </Box>
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
          );
        }}
      </Formik>
    </>
  );
}
