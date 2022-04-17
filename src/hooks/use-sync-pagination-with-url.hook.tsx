import { useEffect, useState } from 'react';
import { useSearchParam } from 'react-use';
import { useLocation } from 'wouter';

export const useSyncPaginationWithUrl = () => {
  const [page, setPage] = useState(+useSearchParam('page')! || 1);
  const [__, setLocation] = useLocation();

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', page.toString());
    let redirectUrl = url.toString().replace(window.location.origin, '');
    setLocation(redirectUrl, { replace: true });
  }, [page]);

  return { page, setPage };
};
