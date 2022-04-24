import { isBoolean } from 'lodash';
import { useMemo } from 'react';
import { SortingRule } from 'react-table';
import { TableInvoiceData } from '../types/invoice.types';
import { Sort } from '../types/listing.types';
import { useSearchParamState } from './use-synced-url-state.hook';

export const useISortTable: (sortable?: boolean) => {
  handleSort?: (sortBy: SortingRule<TableInvoiceData>) => void;
  sort?: Sort | undefined;
} = (sortable?: boolean) => {
  if (!sortable) return {};
  const [sortById, setSortById] = useSearchParamState('sortById', '');
  const [sortByDesc, setSortByDesc] = useSearchParamState('sortByDesc', '');

  const sortBy: SortingRule<TableInvoiceData> | null = useMemo(() => {
    return sortById && sortByDesc
      ? {
          id: sortById,
          desc: JSON.parse(sortByDesc),
        }
      : null;
  }, [sortById, sortByDesc]);

  const handleSort = (sortBy: SortingRule<TableInvoiceData>) => {
    setSortById(sortBy?.id || '');
    setSortByDesc(isBoolean(sortBy?.desc) ? JSON.stringify(sortBy.desc) : '');
  };

  return {
    ...(sortBy && {
      sort: { [sortBy.id]: sortBy?.desc ? 'desc' : 'asc' } as Sort,
    }),
    handleSort,
  };
};
