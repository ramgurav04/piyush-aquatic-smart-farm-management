import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { paths } from './paths';
import { RoleFallback } from './RoleFallback';

export const legacyRedirectRoutes: RouteObject[] = [
  { path: paths.legacyCatalog, element: <Navigate to={paths.products} replace /> },
  { path: paths.legacyCheckout, element: <Navigate to={paths.cart} replace /> },
  { path: '/customer/cart', element: <Navigate to={paths.cart} replace /> },
  { path: '*', element: <RoleFallback /> },
];
