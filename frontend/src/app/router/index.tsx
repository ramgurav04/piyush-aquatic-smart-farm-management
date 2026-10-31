import React from 'react';
import { useRoutes } from 'react-router-dom';
import { publicRoutes } from './public.routes';
import { customerRoutes } from './customer.routes';
import { adminRoutes } from './admin.routes';
import { staffRoutes } from './staff.routes';
import { legacyRedirectRoutes } from './legacyRedirects';

export const AppRouter: React.FC = () => {
  return useRoutes([
    ...publicRoutes,
    ...customerRoutes,
    ...adminRoutes,
    ...staffRoutes,
    ...legacyRedirectRoutes,
  ]);
};
