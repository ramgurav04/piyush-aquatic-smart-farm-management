import React, { Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { RouteLoading } from './RouteLoading';
import { paths } from './paths';
import { AdminLayout, Dashboard, ManagementModule } from './route-pages/admin';

const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={<RouteLoading />}>{element}</Suspense>
);

export const adminRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute allowedRoles={['ADMIN']} />,
    children: [
      {
        path: paths.admin,
        element: withSuspense(<AdminLayout />),
        children: [
          { index: true, element: withSuspense(<Dashboard />) },
          { path: 'species', element: withSuspense(<ManagementModule module="species" />) },
          { path: 'tanks', element: withSuspense(<ManagementModule module="tanks" />) },
          { path: 'inventory', element: withSuspense(<ManagementModule module="inventory" />) },
          { path: 'customers', element: withSuspense(<ManagementModule module="customers" />) },
          { path: 'orders', element: withSuspense(<ManagementModule module="orders" />) },
          { path: 'staff', element: withSuspense(<ManagementModule module="staff" />) },
          { path: 'reports', element: withSuspense(<ManagementModule module="reports" />) },
        ],
      },
    ],
  },
];
