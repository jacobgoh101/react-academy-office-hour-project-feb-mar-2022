import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ProvideAuth } from './context/auth.context';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <ProvideAuth>
        <App />
      </ProvideAuth>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
