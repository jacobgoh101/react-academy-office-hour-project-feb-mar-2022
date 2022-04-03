import { useContext, useEffect, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSessionStorage } from 'react-use';
import { axiosClient } from '../constants/axios.client';
import { QUERY_KEYS } from '../constants/query.constant';
import { authContext } from '../context/auth.context';
import { AuthService } from '../services/auth.service';
import { MeService } from '../services/user.service';
import { AuthContext } from '../types/auth.types';

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext) as AuthContext;
};

// Provider hook that creates auth object and handles state
export function useProvideAuth() {
  const [accessToken, setAccessToken] = useSessionStorage(
    'invoice-app-access-token',
    ''
  );

  useEffect(() => {
    // @ts-ignore
    axiosClient.defaults.headers['x-access-token'] = accessToken;
  }, [accessToken]);

  const queryClient = useQueryClient();

  const meQuery = useQuery(QUERY_KEYS.GET_ME, MeService.getMe, {
    enabled: !!accessToken,
  });
  const user = meQuery.data?.data;

  const loginMutation = useMutation(AuthService.login, {
    onSuccess(resp) {
      setAccessToken(resp.data.token);
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
    setAccessToken('');
    queryClient.invalidateQueries(QUERY_KEYS.GET_ME);
    queryClient.clear();
  };

  // Return the user object and auth methods
  return {
    isLoadingUser: meQuery.isLoading,
    user,
    login,
    signUp,
    signOut,
    loginError: loginMutation.isError && loginMutation.error,
    signUpError: signupMutation.isError && signupMutation.error,
  } as AuthContext;
}
