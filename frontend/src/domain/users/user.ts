export type UserRole = 'ADMIN' | 'STAFF' | 'CUSTOMER';
export type CustomerAccountType = 'INDIVIDUAL' | 'BUSINESS';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  accountType?: CustomerAccountType;
  businessName?: string;
  businessDetails?: string;
  phone?: string;
  avatarUrl?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface CustomerRegistration {
  name: string;
  email: string;
  phone: string;
  password: string;
  accountType: CustomerAccountType;
  businessName?: string;
  businessDetails?: string;
}
