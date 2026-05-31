import { createContext } from 'react';
import type { LoginCredentials } from '../api/admin';
import type { AdminUser } from '../types';

export interface AdminAuthContextValue {
  admin: AdminUser | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<AdminUser>;
  logout: () => void;
  /** Verify the stored token via /admin/me. Returns the admin or null. */
  refreshAdmin: () => Promise<AdminUser | null>;
}

export const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);
