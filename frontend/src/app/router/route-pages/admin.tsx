import { lazy } from 'react';

export const AdminLayout = lazy(() => import('@/layouts/AdminLayout').then((m) => ({ default: m.AdminLayout })));
export const Dashboard = lazy(() => import('@/pages/Dashboard').then((m) => ({ default: m.Dashboard })));
export const ManagementModule = lazy(() => import('@/pages/ManagementModule').then((m) => ({ default: m.ManagementModule })));
