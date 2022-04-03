import { useEffect } from 'react';
import { useSearchParam } from 'react-use';
import { useLocation } from 'wouter';
import { User } from '../types/user.types';
import { useRequireAuth } from './use-require-auth.hook';

export function userHasProvidedCompanyDetails(user?: User) {
  return (
    user?.companyDetails?.name &&
    user?.companyDetails?.address &&
    user?.companyDetails?.vatNumber &&
    user?.companyDetails?.regNumber &&
    user?.companyDetails?.iban &&
    user?.companyDetails?.swift
  );
}

export function useAlreadyOnboarded() {
  const auth = useRequireAuth();
  const { user } = auth;
  const [_, setLocation] = useLocation();
  const destination = useSearchParam('destination');

  useEffect(() => {
    if (userHasProvidedCompanyDetails(user)) {
      setLocation(destination || '/');
    }
  }, [user]);
  return auth;
}
