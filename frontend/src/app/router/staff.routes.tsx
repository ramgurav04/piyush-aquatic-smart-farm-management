import React, { Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { RouteLoading } from './RouteLoading';
import { paths } from './paths';
import { StaffLayout, ManagementModule } from './route-pages/staff';

const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={<RouteLoading />}>{element}</Suspense>
);

export const staffRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute allowedRoles={['STAFF']} />,
    children: [
      {
        path: paths.staff,
        element: withSuspense(<StaffLayout />),
        children: [
          { index: true, element: withSuspense(<ManagementModule module="tasks" />) },
          { path: 'tasks', element: withSuspense(<ManagementModule module="tasks" />) },
          { path: 'water', element: withSuspense(<ManagementModule module="water" />) },
          { path: 'feeding', element: withSuspense(<ManagementModule module="feeding" />) },
          { path: 'mortality', element: withSuspense(<ManagementModule module="mortality" />) },
          { path: 'inventory', element: withSuspense(<ManagementModule module="inventory" />) },
        ],
      },
    ],
  },
];
