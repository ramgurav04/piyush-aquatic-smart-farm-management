import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { paths, roleHome } from './paths';

export const RoleFallback: React.FC = () => {
  const { user } = useAuth();
  return <Navigate to={user ? roleHome(user.role) : paths.home} replace />;
};
