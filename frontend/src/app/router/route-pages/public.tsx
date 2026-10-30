import { lazy } from 'react';

export const Landing = lazy(() => import('@/pages/Landing').then((m) => ({ default: m.Landing })));
export const Catalog = lazy(() => import('@/pages/Catalog').then((m) => ({ default: m.Catalog })));
export const Login = lazy(() => import('@/pages/Login').then((m) => ({ default: m.Login })));
export const Signup = lazy(() => import('@/pages/Signup').then((m) => ({ default: m.Signup })));
export const PasswordRecovery = lazy(() => import('@/pages/PasswordRecovery').then((m) => ({ default: m.PasswordRecovery })));
export const ManagementLoginPicker = lazy(() => import('@/pages/ManagementLoginPicker').then((m) => ({ default: m.ManagementLoginPicker })));
export const Cart = lazy(() => import('@/pages/Cart').then((m) => ({ default: m.Cart })));
