import { useContext, useEffect, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { axiosClient } from '../constants/axios.client';
import { QUERY_KEYS } from '../constants/query.constant';
import { authContext } from '../context/auth.context';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { AuthContext } from '../types/auth.types';

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext) as AuthContext;
};

// Provider hook that creates auth object and handles state
export function useProvideAuth() {
  const accessTokenRef = useRef<string>();
  useEffect(() => {
    // @ts-ignore
    axiosClient.defaults.headers['x-access-token'] = accessTokenRef.current;
  }, [accessTokenRef.current]);

  const queryClient = useQueryClient();

  const meQuery = useQuery(QUERY_KEYS.GET_ME, UserService.getMe, {
    enabled: !!accessTokenRef.current,
  });
  const user = meQuery.data?.data;

  const loginMutation = useMutation(AuthService.login, {
    onSuccess(resp) {
      accessTokenRef.current = resp.data.token;
      queryClient.invalidateQueries(QUERY_KEYS.GET_ME);
    },
  });
  const signupMutation = useMutation(AuthService.signUp, {
    async onSuccess(resp, { email, password }) {
      // auto login after sign up
      await loginMutation.mutateAsync({ email, password });
    },
  });

  const login = ({ email, password }: { email: string; password: string }) => {
    return loginMutation.mutateAsync({ email, password });
  };

  const signUp = ({
    name,
    email,
    password,
    confirmPassword,
  }: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    return signupMutation.mutateAsync({
      name,
      email,
      password,
      confirmPassword,
    });
  };

  const signOut = () => {
    accessTokenRef.current = '';
    queryClient.invalidateQueries(QUERY_KEYS.GET_ME);
  };

  // Return the user object and auth methods
  return {
    user,
    login,
    signUp,
    signOut,
    loginError: loginMutation.isError && loginMutation.error,
    signUpError: signupMutation.isError && signupMutation.error,
  } as AuthContext;
}
