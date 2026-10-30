import { createContext } from 'react';
import type { CustomerAccountType, User, UserRole } from '../types/user';

export interface CustomerRegistration {
  name: string;
  email: string;
  phone: string;
  password: string;
  accountType: CustomerAccountType;
  businessName?: string;
  businessDetails?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authenticate: (
    email: string,
    password: string,
    options?: {
      management?: boolean;
      requiredRole?: Extract<UserRole, 'ADMIN' | 'STAFF'>;
      requiredAccountType?: CustomerAccountType;
    },
  ) => Promise<User>;
  registerCustomer: (input: CustomerRegistration) => Promise<User>;
  updateProfile: (changes: Pick<User, 'name' | 'phone' | 'businessName' | 'businessDetails'>) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
