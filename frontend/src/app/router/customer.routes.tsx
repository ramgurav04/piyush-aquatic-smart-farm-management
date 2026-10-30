import React, { Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { RouteLoading } from './RouteLoading';
import { paths } from './paths';
import {
  CustomerLayout,
  CustomerDashboard,
  Cart,
  CustomerOrders,
  CustomerProfile,
} from './route-pages/customer';

const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={<RouteLoading />}>{element}</Suspense>
);

export const customerRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute allowedRoles={['CUSTOMER']} />,
    children: [
      {
        path: paths.customer,
        element: withSuspense(<CustomerLayout />),
        children: [
          { index: true, element: withSuspense(<CustomerDashboard />) },
          { path: 'dashboard', element: withSuspense(<CustomerDashboard />) },
          { path: 'cart', element: withSuspense(<Cart />) },
          { path: 'orders', element: withSuspense(<CustomerOrders />) },
          { path: 'profile', element: withSuspense(<CustomerProfile />) },
        ],
      },
    ],
  },
];
