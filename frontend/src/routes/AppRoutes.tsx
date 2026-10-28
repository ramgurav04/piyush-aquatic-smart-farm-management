import { Routes, Route, Navigate } from 'react-router-dom'
import { Landing } from '../pages/Landing'
import { Login } from '../pages/Login'
import { Dashboard } from '../pages/Dashboard'
import { AdminLayout } from '../layouts/AdminLayout'
import { ProtectedRoute } from './ProtectedRoute'

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<Landing />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      
      {/* Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={['admin', 'staff']} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/species" element={<div>Species Module Coming Soon</div>} />
          <Route path="/admin/tanks" element={<div>Tanks Module Coming Soon</div>} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
