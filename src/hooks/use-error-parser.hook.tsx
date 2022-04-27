import { AxiosError } from 'axios';

export function useErrorParser(error: Error | AxiosError | unknown) {
  const isNetworkError = (error as Error)?.message?.includes('Network Error');

  let errorMessage =
    (error as AxiosError)?.response?.data ?? (error as Error)?.message;
  errorMessage = isNetworkError ? 'Service unavailable' : errorMessage;

  return { errorMessage };
}
