import React, { Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';
import { RouteLoading } from './RouteLoading';
import { paths } from './paths';
import {
  Landing,
  Catalog,
  Login,
  Signup,
  PasswordRecovery,
  ManagementLoginPicker,
  Cart,
} from './route-pages/public';

const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={<RouteLoading />}>{element}</Suspense>
);

export const publicRoutes: RouteObject[] = [
  { path: paths.home, element: withSuspense(<Landing />) },
  { path: paths.products, element: withSuspense(<Catalog />) },
  { path: paths.productDetails, element: withSuspense(<Catalog />) },
  { path: paths.cart, element: withSuspense(<Cart />) },
  { path: paths.login, element: withSuspense(<Login />) },
  { path: paths.loginIndividual, element: withSuspense(<Login customerType="INDIVIDUAL" />) },
  { path: paths.loginBusiness, element: withSuspense(<Login customerType="BUSINESS" />) },
  { path: paths.signup, element: withSuspense(<Signup />) },
  { path: paths.passwordRecovery, element: withSuspense(<PasswordRecovery />) },
  { path: paths.managementLogin, element: withSuspense(<ManagementLoginPicker />) },
  { path: paths.managementAdminLogin, element: withSuspense(<Login managementRole="ADMIN" />) },
  { path: paths.managementStaffLogin, element: withSuspense(<Login managementRole="STAFF" />) },
];
