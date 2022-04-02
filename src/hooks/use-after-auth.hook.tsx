import { useEffect } from 'react';
import { useSearchParam } from 'react-use';
import { useLocation } from 'wouter';
import { useAuth } from './use-auth.hook';

export function useAfterAuth() {
  const auth = useAuth();
  const { user } = auth;
  const [_, setLocation] = useLocation();
  const destination = useSearchParam('destination');

  useEffect(() => {
    if (user) {
      setLocation(destination || '');
    }
  }, [user]);
  return auth;
}
