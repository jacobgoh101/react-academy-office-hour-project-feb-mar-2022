import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import { ProvideAuth } from './context/auth.context';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <ProvideAuth>
          <App />
        </ProvideAuth>
      </ChakraProvider>{' '}
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
