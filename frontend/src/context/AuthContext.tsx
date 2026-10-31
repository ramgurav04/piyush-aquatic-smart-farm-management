import React, { useState } from 'react';
import type { User } from '@/domain/users/user';
import { authService } from '@/services';
import { AuthContext } from './AuthContextValue';
import type { AuthContextType } from './AuthContextValue';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => authService.getCurrentUser());

  const authenticate: AuthContextType['authenticate'] = async (
    email,
    password,
    { requiredRole } = {},
  ) => {
    const authenticatedUser = await authService.login({
      email,
      password,
      requiredRole,
    });
    setUser(authenticatedUser);
    return authenticatedUser;
  };

  const registerCustomer: AuthContextType['registerCustomer'] = async (input) => {
    const newUser = await authService.signup(input);
    setUser(newUser);
    return newUser;
  };

  const updateProfile: AuthContextType['updateProfile'] = async (changes) => {
    const updated = await authService.updateProfile(changes);
    setUser(updated);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading: false,
        authenticate,
        registerCustomer,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
