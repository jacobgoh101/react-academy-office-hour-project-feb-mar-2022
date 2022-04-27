import { AxiosError } from 'axios';

export function useErrorParser(error: Error | AxiosError) {
  const isNetworkError = error?.message?.includes('Network Error');

  let errorMessage = (error as AxiosError)?.response?.data ?? error?.message;
  errorMessage = isNetworkError ? 'Service unavailable' : errorMessage;

  return { isNetworkError, errorMessage };
}
