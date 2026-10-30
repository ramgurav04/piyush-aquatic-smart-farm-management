import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { CommerceProvider } from './context/CommerceContext';
import { AppRoutes } from './routes/AppRoutes';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <CommerceProvider>
        <AppRoutes />
      </CommerceProvider>
    </AuthProvider>
  );
};

export default App;