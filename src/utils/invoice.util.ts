import { chain } from 'lodash';
import { InvoiceItem } from '../types/invoice.types';

export function getInvoiceTotalValue(items: InvoiceItem[]) {
  return parseInt(
    chain(items)
      .map((d) => d.quantity * d.rate)
      .sum()
      .value()
      ?.toFixed(2)
  );
}
