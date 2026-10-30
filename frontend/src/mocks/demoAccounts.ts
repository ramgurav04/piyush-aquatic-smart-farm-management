import type { User, UserRole } from '../types/user';

export interface DemoAccount {
  user: User;
  password: string;
}

export const internalDemoAccounts: Record<'ADMIN' | 'STAFF', DemoAccount> = {
  ADMIN: {
    user: {
      id: 'demo-admin',
      name: 'Ram Prakash Gurav',
      email: 'admin@piyushaquatic.com',
      role: 'ADMIN',
    },
    password: 'AdminDemo123!',
  },
  STAFF: {
    user: {
      id: 'demo-staff',
      name: 'Farm Supervisor',
      email: 'staff@piyushaquatic.com',
      role: 'STAFF',
    },
    password: 'StaffDemo123!',
  },
};

export const customerDemoAccounts: DemoAccount[] = [
  {
    user: {
      id: 'demo-individual',
      name: 'Aarav Patil',
      email: 'individual@piyushaquatic.com',
      role: 'CUSTOMER',
      accountType: 'INDIVIDUAL',
      phone: '+91 98765 43210',
    },
    password: 'CustomerDemo123!',
  },
  {
    user: {
      id: 'demo-business',
      name: 'Mumbai Marine Aquatics',
      email: 'business@piyushaquatic.com',
      role: 'CUSTOMER',
      accountType: 'BUSINESS',
      businessName: 'Mumbai Marine Aquatics',
      phone: '+91 98765 43211',
    },
    password: 'CustomerDemo123!',
  },
];

export const getInternalRole = (email: string): UserRole | null => {
  const account = Object.values(internalDemoAccounts).find(
    ({ user }) => user.email.toLowerCase() === email.toLowerCase(),
  );
  return account?.user.role ?? null;
};
