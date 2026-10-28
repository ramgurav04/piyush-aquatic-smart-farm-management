import { createContext, useContext, useState, type ReactNode } from 'react'
import type { User, Role } from '../types/user'

interface AuthContextType {
  user: User | null
  login: (role: Role) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = (role: Role) => {
    setUser({ id: '1', name: 'Test User', role })
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
