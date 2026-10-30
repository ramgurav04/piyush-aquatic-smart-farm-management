import type { UserRole } from './user';

export type ManagementAction =
  | 'view_dashboard'
  | 'manage_species'
  | 'manage_tanks'
  | 'manage_inventory'
  | 'manage_orders'
  | 'manage_customers'
  | 'manage_staff'
  | 'view_reports'
  | 'log_water_quality'
  | 'log_feeding'
  | 'log_mortality'
  | 'manage_tasks';

export interface NavItemConfig {
  id: string;
  label: string;
  path: string;
  iconName: string;
}

const ADMIN_NAV_ITEMS: NavItemConfig[] = [
  { id: 'dashboard', label: 'Dashboard', path: '/admin', iconName: 'LayoutDashboard' },
  { id: 'species', label: 'Fish Species', path: '/admin/species', iconName: 'Fish' },
  { id: 'tanks', label: 'Tanks', path: '/admin/tanks', iconName: 'Waves' },
  { id: 'inventory', label: 'Inventory', path: '/admin/inventory', iconName: 'Boxes' },
  { id: 'orders', label: 'Orders & Enquiries', path: '/admin/orders', iconName: 'ShoppingBag' },
  { id: 'customers', label: 'Customers', path: '/admin/customers', iconName: 'Users' },
  { id: 'staff', label: 'Staff Management', path: '/admin/staff', iconName: 'UserCheck' },
  { id: 'reports', label: 'Reports & Analytics', path: '/admin/reports', iconName: 'FileText' },
];

const STAFF_NAV_ITEMS: NavItemConfig[] = [
  { id: 'tasks', label: 'Assigned Tasks', path: '/staff/tasks', iconName: 'ClipboardList' },
  { id: 'water', label: 'Water Quality', path: '/staff/water', iconName: 'Droplets' },
  { id: 'feeding', label: 'Feeding Schedule', path: '/staff/feeding', iconName: 'Utensils' },
  { id: 'mortality', label: 'Mortality Log', path: '/staff/mortality', iconName: 'Activity' },
  { id: 'inventory', label: 'Stock Verification', path: '/staff/inventory', iconName: 'Boxes' },
];

export const getNavItemsForRole = (role: UserRole): NavItemConfig[] => {
  if (role === 'ADMIN') return ADMIN_NAV_ITEMS;
  if (role === 'STAFF') return STAFF_NAV_ITEMS;
  return [];
};

export const hasActionPermission = (role: UserRole, action: ManagementAction): boolean => {
  if (role === 'ADMIN') return true;
  if (role === 'STAFF') {
    switch (action) {
      case 'view_dashboard':
      case 'manage_tasks':
      case 'log_water_quality':
      case 'log_feeding':
      case 'log_mortality':
      case 'manage_inventory':
        return true;
      case 'manage_customers':
      case 'manage_staff':
      case 'view_reports':
      case 'manage_species':
      case 'manage_tanks':
      case 'manage_orders':
      default:
        return false;
    }
  }
  return false;
};
