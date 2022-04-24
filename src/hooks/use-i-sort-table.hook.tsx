import { useState } from 'react';
import { SortingRule } from 'react-table';
import { TableInvoiceData } from '../types/invoice.types';
import { Sort } from '../types/listing.types';

export const useISortTable = () => {
  // default to sorting by creation DESC
  const [sortBy, setSortBy] = useState<SortingRule<TableInvoiceData> | null>(
    null
  );
  const handleSort = (sortBy: SortingRule<TableInvoiceData>) => {
    setSortBy(sortBy);
  };

  return {
    ...(sortBy && {
      sort: { [sortBy.id]: sortBy?.desc ? 'desc' : 'asc' } as Sort,
    }),
    handleSort,
  };
};
