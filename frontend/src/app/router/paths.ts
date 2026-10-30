import type { UserRole } from '@/types/user';

export const paths = {
  // Public
  home: '/',
  products: '/products',
  productDetails: '/products/:id',
  cart: '/cart',
  login: '/login',
  loginIndividual: '/login/individual',
  loginBusiness: '/login/business',
  signup: '/signup',
  passwordRecovery: '/password-recovery',
  managementLogin: '/management/login',
  managementAdminLogin: '/management/admin/login',
  managementStaffLogin: '/management/staff/login',

  // Customer
  customer: '/customer',
  customerDashboard: '/customer/dashboard',
  customerCart: '/customer/cart',
  customerOrders: '/customer/orders',
  customerProfile: '/customer/profile',

  // Farm Management - Admin
  admin: '/admin',
  adminSpecies: '/admin/species',
  adminTanks: '/admin/tanks',
  adminInventory: '/admin/inventory',
  adminCustomers: '/admin/customers',
  adminOrders: '/admin/orders',
  adminStaff: '/admin/staff',
  adminReports: '/admin/reports',

  // Farm Management - Staff
  staff: '/staff',
  staffTasks: '/staff/tasks',
  staffWater: '/staff/water',
  staffFeeding: '/staff/feeding',
  staffMortality: '/staff/mortality',
  staffInventory: '/staff/inventory',

  // Legacy paths to redirect
  legacyCatalog: '/catalog',
  legacyCheckout: '/checkout',
} as const;

export type AppPaths = typeof paths;

export const roleHome = (role: UserRole): string => {
  switch (role) {
    case 'ADMIN':
      return paths.admin;
    case 'STAFF':
      return paths.staff;
    case 'CUSTOMER':
    default:
      return paths.customer;
  }
};
