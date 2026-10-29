import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Landing } from '../pages/Landing';
import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { AdminLayout } from '../layouts/AdminLayout';
import { ProtectedRoute } from './ProtectedRoute';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Admin/Staff Routes */}
      <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'STAFF']} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="species" element={<div className="p-4 font-bold text-lg">Species Management Module</div>} />
          <Route path="tanks" element={<div className="p-4 font-bold text-lg">200 Tanks Matrix & Water Logs</div>} />
        </Route>
      </Route>

      {/* Unknown Path Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};