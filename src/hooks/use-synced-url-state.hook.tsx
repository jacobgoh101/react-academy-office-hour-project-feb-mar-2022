import { useEffect, useState } from 'react';
import { useSearchParam } from 'react-use';
import { useLocation } from 'wouter';

export function useSearchParamState(
  key: string,
  defaultValue: string
): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [state, setState] = useState(useSearchParam(key)! || defaultValue);
  const [__, setLocation] = useLocation();

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set(key, String(state));
    if (!url.searchParams.get(key)) {
      url.searchParams.delete(key);
    }
    let redirectUrl = url.toString().replace(window.location.origin, '');
    setLocation(redirectUrl, { replace: true });
  }, [state]);

  return [state, setState];
}
