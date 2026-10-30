import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient';
import { AuthProvider } from '@/context/AuthContext';
import { CommerceProvider } from '@/context/CommerceContext';

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <CommerceProvider>
            {children}
          </CommerceProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
