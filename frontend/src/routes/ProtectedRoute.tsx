import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { UserRole } from '../types/user';

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
}

const roleHome = (role: UserRole): string =>
  role === 'ADMIN' ? '/admin' : role === 'STAFF' ? '/staff' : '/customer';

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated || !user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role)) return <Navigate to={roleHome(user.role)} replace />;
  return <Outlet />;
};
