import React, { createContext, ReactNode } from 'react';
import { AuthContext } from '../types/auth.types';
import { useProvideAuth } from '../hooks/use-auth.hook';

export const authContext = createContext<AuthContext | null>(null);
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().

export function ProvideAuth({ children }: { children: ReactNode }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
