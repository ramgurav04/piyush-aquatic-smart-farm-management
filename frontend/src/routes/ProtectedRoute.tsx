import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import type { Role } from '../types/user'

export function ProtectedRoute({ allowedRoles }: { allowedRoles: Role[] }) {
  const { user } = useAuth()

  if (!user) return <Navigate to="/login" replace />
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" replace />

  return <Outlet />
}
