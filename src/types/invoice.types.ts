import { Client } from './client.types';

export interface InvoiceWithClient {
  invoice: Invoice;
  client: Client;
}

export interface Invoice {
  user_id: string;
  invoice_number: string;
  client_id: string;
  date: number;
  dueDate: number;
  value: number;
  id: string;
  projectCode?: string;
  meta?: Meta;
}

interface Meta {
  test: string;
}

export interface TableInvoiceData {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  value: number;
  clientName?: string;
  companyName?: string;
}
