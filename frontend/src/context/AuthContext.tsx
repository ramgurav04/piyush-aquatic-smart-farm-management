import React, { useState } from 'react';
import type { User } from '../types/user';
import { customerDemoAccounts, internalDemoAccounts } from '../mocks/demoAccounts';
import { AuthContext } from './AuthContextValue';
import type { AuthContextType } from './AuthContextValue';

interface StoredCredential {
  user: User;
  salt: string;
  passwordDigest: string;
}

const SESSION_KEY = 'piyush_auth_user';
const CREDENTIALS_KEY = 'piyush_customer_credentials';

const readStoredUser = (): User | null => {
  const savedUser = localStorage.getItem(SESSION_KEY);
  if (!savedUser) return null;
  try {
    const user: unknown = JSON.parse(savedUser);
    if (
      typeof user === 'object' &&
      user !== null &&
      'id' in user &&
      'name' in user &&
      'email' in user &&
      'role' in user &&
      typeof user.id === 'string' &&
      typeof user.name === 'string' &&
      typeof user.email === 'string' &&
      ['ADMIN', 'STAFF', 'CUSTOMER'].includes(String(user.role))
    ) {
      return user as User;
    }
  } catch {
    localStorage.removeItem(SESSION_KEY);
  }
  return null;
};

const readCredentials = (): StoredCredential[] => {
  const saved = localStorage.getItem(CREDENTIALS_KEY);
  if (!saved) return [];
  try {
    const parsed: unknown = JSON.parse(saved);
    return Array.isArray(parsed) ? (parsed as StoredCredential[]) : [];
  } catch {
    localStorage.removeItem(CREDENTIALS_KEY);
    return [];
  }
};

const digestPassword = async (password: string, salt: string): Promise<string> => {
  const bytes = new TextEncoder().encode(`${salt}:${password}`);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(readStoredUser);

  const persistSession = (selectedUser: User): User => {
    setUser(selectedUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(selectedUser));
    return selectedUser;
  };

  const authenticate: AuthContextType['authenticate'] = async (
    email,
    password,
    { management = false, requiredRole, requiredAccountType } = {},
  ) => {
    const normalizedEmail = email.trim().toLowerCase();
    const internalAccount = Object.values(internalDemoAccounts).find(
      ({ user: accountUser }) => accountUser.email.toLowerCase() === normalizedEmail,
    );
    if (internalAccount) {
      if (!management || internalAccount.password !== password) {
        throw new Error('Email or password is incorrect.');
      }
      if (requiredRole && internalAccount.user.role !== requiredRole) {
        throw new Error(`This is not an authorized ${requiredRole === 'ADMIN' ? 'administrator' : 'staff'} account.`);
      }
      return persistSession(internalAccount.user);
    }

    if (management) throw new Error('This management portal is for authorized farm staff only.');
    const demoAccount = customerDemoAccounts.find(
      ({ user: accountUser }) =>
        accountUser.email.toLowerCase() === normalizedEmail && accountUser.role === 'CUSTOMER',
    );
    if (demoAccount && demoAccount.password === password) {
      if (requiredAccountType && demoAccount.user.accountType !== requiredAccountType) {
        throw new Error(`This email belongs to a ${demoAccount.user.accountType === 'BUSINESS' ? 'business' : 'individual'} customer account.`);
      }
      return persistSession(demoAccount.user);
    }

    const credential = readCredentials().find(
      (saved) => saved.user.email.toLowerCase() === normalizedEmail,
    );
    if (credential && (await digestPassword(password, credential.salt)) === credential.passwordDigest) {
      if (requiredAccountType && credential.user.accountType !== requiredAccountType) {
        throw new Error(`This email belongs to a ${credential.user.accountType === 'BUSINESS' ? 'business' : 'individual'} customer account.`);
      }
      return persistSession(credential.user);
    }
    throw new Error('Email or password is incorrect.');
  };

  const registerCustomer: AuthContextType['registerCustomer'] = async (input) => {
    const normalizedEmail = input.email.trim().toLowerCase();
    const existingDemo = [...customerDemoAccounts, ...Object.values(internalDemoAccounts)].some(
      ({ user: accountUser }) => accountUser.email.toLowerCase() === normalizedEmail,
    );
    const credentials = readCredentials();
    if (existingDemo || credentials.some(({ user: accountUser }) => accountUser.email.toLowerCase() === normalizedEmail)) {
      throw new Error('An account with this email already exists.');
    }

    const customer: User = {
      id: crypto.randomUUID(),
      name: input.name.trim(),
      email: normalizedEmail,
      phone: input.phone.trim(),
      role: 'CUSTOMER',
      accountType: input.accountType,
      ...(input.accountType === 'BUSINESS' && input.businessName
        ? { businessName: input.businessName.trim() }
        : {}),
      ...(input.accountType === 'BUSINESS' && input.businessDetails?.trim()
        ? { businessDetails: input.businessDetails.trim() }
        : {}),
    };
    const salt = crypto.randomUUID();
    credentials.push({
      user: customer,
      salt,
      passwordDigest: await digestPassword(input.password, salt),
    });
    localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(credentials));
    return persistSession(customer);
  };

  const updateProfile: AuthContextType['updateProfile'] = (changes) => {
    if (!user || user.role !== 'CUSTOMER') throw new Error('Only customer profiles can be edited here.');
    const updatedUser = { ...user, ...changes };
    setUser(updatedUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser));
    const credentials = readCredentials();
    const index = credentials.findIndex(({ user: accountUser }) => accountUser.id === user.id);
    if (index >= 0) {
      credentials[index] = { ...credentials[index], user: updatedUser };
      localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(credentials));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  return <AuthContext.Provider value={{ user, isAuthenticated: Boolean(user), isLoading: false, authenticate, registerCustomer, updateProfile, logout }}>{children}</AuthContext.Provider>;
};
