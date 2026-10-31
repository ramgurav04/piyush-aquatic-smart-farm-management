import type { IAuthService, LoginCredentials } from '../contracts/authService';
import type { User, CustomerRegistration } from '@/domain/users/user';
import { internalDemoAccounts, customerDemoAccounts } from '@/data/seed/demoAccounts';
import { storage } from '../storage';

const USER_SESSION_KEY = 'user_session';
const REGISTERED_USERS_KEY = 'registered_users';

export class MockAuthService implements IAuthService {
  public getCurrentUser(): User | null {
    return storage.getItem<User | null>(USER_SESSION_KEY, null);
  }

  public async login({ email, password, requiredRole }: LoginCredentials): Promise<User> {
    const cleanEmail = email.trim().toLowerCase();

    // Check internal accounts
    const internalMatch = Object.values(internalDemoAccounts).find(
      (a) => a.user.email.toLowerCase() === cleanEmail && a.password === password
    );

    if (internalMatch) {
      if (requiredRole && internalMatch.user.role !== requiredRole) {
        throw new Error(`This login is restricted to ${requiredRole.toLowerCase()} role.`);
      }
      storage.setItem(USER_SESSION_KEY, internalMatch.user);
      return internalMatch.user;
    }

    // Check seed customer accounts
    const seedCustomer = customerDemoAccounts.find(
      (a) => a.user.email.toLowerCase() === cleanEmail && a.password === password
    );

    if (seedCustomer) {
      if (requiredRole && seedCustomer.user.role !== requiredRole) {
        throw new Error(`This account cannot log in here.`);
      }
      storage.setItem(USER_SESSION_KEY, seedCustomer.user);
      return seedCustomer.user;
    }

    // Check registered custom users in storage
    const registered = storage.getItem<Array<{ user: User; password: string }>>(REGISTERED_USERS_KEY, []);
    const customMatch = registered.find(
      (a) => a.user.email.toLowerCase() === cleanEmail && a.password === password
    );

    if (customMatch) {
      if (requiredRole && customMatch.user.role !== requiredRole) {
        throw new Error(`This account cannot log in here.`);
      }
      storage.setItem(USER_SESSION_KEY, customMatch.user);
      return customMatch.user;
    }

    throw new Error('Invalid email or password.');
  }

  public async signup(data: CustomerRegistration): Promise<User> {
    const cleanEmail = data.email.trim().toLowerCase();
    const registered = storage.getItem<Array<{ user: User; password: string }>>(REGISTERED_USERS_KEY, []);

    if (
      registered.some((a) => a.user.email.toLowerCase() === cleanEmail) ||
      customerDemoAccounts.some((a) => a.user.email.toLowerCase() === cleanEmail) ||
      Object.values(internalDemoAccounts).some((a) => a.user.email.toLowerCase() === cleanEmail)
    ) {
      throw new Error('An account with this email already exists.');
    }

    const newUser: User = {
      id: `cust-${Date.now()}`,
      name: data.name,
      email: data.email,
      role: 'CUSTOMER',
      accountType: data.accountType,
      phone: data.phone,
      businessName: data.businessName,
      businessDetails: data.businessDetails,
    };

    registered.push({ user: newUser, password: data.password });
    storage.setItem(REGISTERED_USERS_KEY, registered);
    storage.setItem(USER_SESSION_KEY, newUser);

    return newUser;
  }

  public async logout(): Promise<void> {
    storage.removeItem(USER_SESSION_KEY);
  }

  public async updateProfile(updates: Partial<User>): Promise<User> {
    const currentUser = this.getCurrentUser();
    if (!currentUser) throw new Error('Not authenticated');

    const updatedUser: User = {
      ...currentUser,
      ...updates,
    };

    storage.setItem(USER_SESSION_KEY, updatedUser);

    // Also update in registered list if applicable
    const registered = storage.getItem<Array<{ user: User; password: string }>>(REGISTERED_USERS_KEY, []);
    const idx = registered.findIndex((r) => r.user.id === currentUser.id);
    if (idx !== -1) {
      registered[idx].user = updatedUser;
      storage.setItem(REGISTERED_USERS_KEY, registered);
    }

    return updatedUser;
  }
}

export const mockAuthService = new MockAuthService();
