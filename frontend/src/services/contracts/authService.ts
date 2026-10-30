import type { User, CustomerRegistration, UserRole } from '@/domain/users/user';

export interface LoginCredentials {
  email: string;
  password: string;
  requiredRole?: UserRole;
}

export interface IAuthService {
  getCurrentUser(): User | null;
  login(credentials: LoginCredentials): Promise<User>;
  signup(data: CustomerRegistration): Promise<User>;
  logout(): Promise<void>;
  updateProfile(updates: Partial<User>): Promise<User>;
}
