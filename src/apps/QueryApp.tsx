import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const QueryApp: React.FC = ({ children }) => {
  const queryClient = new QueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueryApp;
