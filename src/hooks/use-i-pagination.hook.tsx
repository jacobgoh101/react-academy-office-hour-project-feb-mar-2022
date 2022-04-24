import { usePagination } from '@ajna/pagination';
import { useEffect, useState } from 'react';
import { useSearchParamState } from './use-synced-url-state.hook';

export const useIPagination = (paginate?: boolean) => {
  if (!paginate) return {};

  const [total, setTotal] = useState(0);
  const [page, setPage] = useSearchParamState('page', '1');

  const pagination = usePagination({
    total,
    initialState: { currentPage: +page, pageSize: 10 },
  });

  useEffect(() => {
    setPage(String(pagination.currentPage));
  }, [pagination.currentPage]);

  return { page, setPage, total, setTotal, pagination };
};
