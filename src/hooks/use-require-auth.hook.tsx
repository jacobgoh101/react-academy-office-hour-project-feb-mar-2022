import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from './use-auth.hook';

export function useRequireAuth(redirectUrl = '/signup') {
  const auth = useAuth();
  const { user } = auth;
  const [location, setLocation] = useLocation();

  const url = new URL(redirectUrl, window.location.origin);
  url.searchParams.append('destination', location);
  redirectUrl = url.toString().replace(window.location.origin, '');

  useEffect(() => {
    if (!user) {
      setLocation(redirectUrl);
    }
  }, [user, location]);
  return auth;
}
