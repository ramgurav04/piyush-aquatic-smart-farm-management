import { lazy } from 'react';

export const CustomerLayout = lazy(() => import('@/layouts/CustomerLayout').then((m) => ({ default: m.CustomerLayout })));
export const CustomerDashboard = lazy(() => import('@/pages/CustomerDashboard').then((m) => ({ default: m.CustomerDashboard })));
export const Cart = lazy(() => import('@/pages/Cart').then((m) => ({ default: m.Cart })));
export const CustomerOrders = lazy(() => import('@/pages/CustomerOrders').then((m) => ({ default: m.CustomerOrders })));
export const CustomerProfile = lazy(() => import('@/pages/CustomerProfile').then((m) => ({ default: m.CustomerProfile })));
