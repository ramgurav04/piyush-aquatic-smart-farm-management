import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { AdminLayout } from '../layouts/AdminLayout';
import { CustomerLayout } from '../layouts/CustomerLayout';
import { StaffLayout } from '../layouts/StaffLayout';
import { Cart } from '../pages/Cart';
import { Catalog } from '../pages/Catalog';
import { CustomerDashboard } from '../pages/CustomerDashboard';
import { CustomerOrders } from '../pages/CustomerOrders';
import { CustomerProfile } from '../pages/CustomerProfile';
import { Dashboard } from '../pages/Dashboard';
import { Landing } from '../pages/Landing';
import { Login } from '../pages/Login';
import { ManagementLoginPicker } from '../pages/ManagementLoginPicker';
import { ManagementModule } from '../pages/ManagementModule';
import { PasswordRecovery } from '../pages/PasswordRecovery';
import { Signup } from '../pages/Signup';
import { ProtectedRoute } from './ProtectedRoute';
import type { UserRole } from '../types/user';

const roleHome = (role: UserRole): string =>
  role === 'ADMIN' ? '/admin' : role === 'STAFF' ? '/staff' : '/customer';

const RoleRedirect: React.FC = () => {
  const { user } = useAuth();
  return <Navigate to={user ? roleHome(user.role) : '/'} replace />;
};

const Operations: React.FC<{ module: Parameters<typeof ManagementModule>[0]['module'] }> = ({ module }) => <ManagementModule module={module} />;

export const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/login" element={<Login />} />
    <Route path="/login/individual" element={<Login customerType="INDIVIDUAL" />} />
    <Route path="/login/business" element={<Login customerType="BUSINESS" />} />
    <Route path="/management/login" element={<ManagementLoginPicker />} />
    <Route path="/management/admin/login" element={<Login managementRole="ADMIN" />} />
    <Route path="/management/staff/login" element={<Login managementRole="STAFF" />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/password-recovery" element={<PasswordRecovery />} />
    <Route path="/catalog" element={<Catalog />} />
    <Route element={<ProtectedRoute allowedRoles={['CUSTOMER']} />}>
      <Route path="/customer" element={<CustomerLayout />}>
        <Route index element={<CustomerDashboard />} />
        <Route path="cart" element={<Cart />} />
        <Route path="orders" element={<CustomerOrders />} />
        <Route path="profile" element={<CustomerProfile />} />
      </Route>
    </Route>
    <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="species" element={<Operations module="species" />} />
        <Route path="tanks" element={<Operations module="tanks" />} />
        <Route path="inventory" element={<Operations module="inventory" />} />
        <Route path="customers" element={<Operations module="customers" />} />
        <Route path="orders" element={<Operations module="orders" />} />
        <Route path="staff" element={<Operations module="staff" />} />
        <Route path="reports" element={<Operations module="reports" />} />
      </Route>
    </Route>
    <Route element={<ProtectedRoute allowedRoles={['STAFF']} />}>
      <Route path="/staff" element={<StaffLayout />}>
        <Route index element={<Operations module="tasks" />} />
        <Route path="water" element={<Operations module="water" />} />
        <Route path="feeding" element={<Operations module="feeding" />} />
        <Route path="mortality" element={<Operations module="mortality" />} />
        <Route path="inventory" element={<Operations module="inventory" />} />
      </Route>
    </Route>
    <Route path="*" element={<RoleRedirect />} />
  </Routes>
);
