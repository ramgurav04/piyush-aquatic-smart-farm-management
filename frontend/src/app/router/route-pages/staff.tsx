import { lazy } from 'react';

export const StaffLayout = lazy(() => import('@/layouts/StaffLayout').then((m) => ({ default: m.StaffLayout })));
export const ManagementModule = lazy(() => import('@/pages/ManagementModule').then((m) => ({ default: m.ManagementModule })));
