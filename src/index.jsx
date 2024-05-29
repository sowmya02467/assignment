import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import AppRoutes from './routes';
import { AuthProvider } from '../context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
        </QueryClientProvider>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
