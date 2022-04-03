import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { userHasProvidedCompanyDetails } from './use-already-onboarded.hook';
import { useRequireAuth } from './use-require-auth.hook';

export function useRequireOnboarding() {
  const auth = useRequireAuth();
  const { user } = auth;
  const [location, setLocation] = useLocation();

  let redirectUrl = '/onboarding';
  const url = new URL(redirectUrl, window.location.origin);
  url.searchParams.append('destination', location);
  redirectUrl = url.toString().replace(window.location.origin, '');

  useEffect(() => {
    if (user && !userHasProvidedCompanyDetails(user)) {
      setLocation(redirectUrl);
    }
  }, [user]);
  return auth;
}
