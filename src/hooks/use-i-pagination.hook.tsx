import { usePagination } from '@ajna/pagination';
import { useEffect, useState } from 'react';
import { useSyncPaginationWithUrl } from './use-sync-pagination-with-url.hook';

export const useIPagination = () => {
  const [total, setTotal] = useState(0);
  const { page, setPage } = useSyncPaginationWithUrl();

  const pagination = usePagination({
    total,
    initialState: { currentPage: page, pageSize: 10 },
  });

  useEffect(() => {
    setPage(pagination.currentPage);
  }, [pagination.currentPage]);

  return { page, setPage, total, setTotal, pagination };
};
