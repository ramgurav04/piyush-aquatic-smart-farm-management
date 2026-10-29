import React, { createContext, useContext, useState } from 'react';
import type { User, UserRole } from '../types/user';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loginAs: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('piyush_auth_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const loginAs = (role: UserRole) => {
    const mockUsers: Record<UserRole, User> = {
      ADMIN: {
        id: 'u-101',
        name: 'Ram Prakash Gurav (Admin)',
        email: 'admin@piyushaquatic.com',
        role: 'ADMIN',
      },
      STAFF: {
        id: 'u-102',
        name: 'Farm Supervisor',
        email: 'staff@piyushaquatic.com',
        role: 'STAFF',
      },
      CUSTOMER: {
        id: 'u-103',
        name: 'Mumbai Marine Aquatics (B2B)',
        email: 'buyer@mumbaimarine.com',
        role: 'CUSTOMER',
      },
    };

    const selectedUser = mockUsers[role];
    setUser(selectedUser);
    localStorage.setItem('piyush_auth_user', JSON.stringify(selectedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('piyush_auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loginAs, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};