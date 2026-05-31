import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { fetchAdminMe, loginAdmin, type LoginCredentials } from '../api/admin';
import { ADMIN_TOKEN_STORAGE_KEY, type AdminUser } from '../types';
import { AdminAuthContext, type AdminAuthContextValue } from './context';

function readToken() {
  return localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY);
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [hasToken, setHasToken] = useState<boolean>(() => Boolean(readToken()));

  const login = useCallback(async (credentials: LoginCredentials) => {
    const { token, admin: loggedInAdmin } = await loginAdmin(credentials);
    localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, token);
    setAdmin(loggedInAdmin);
    setHasToken(true);
    return loggedInAdmin;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
    setAdmin(null);
    setHasToken(false);
  }, []);

  const refreshAdmin = useCallback(async () => {
    if (!readToken()) {
      setAdmin(null);
      setHasToken(false);
      return null;
    }
    try {
      const currentAdmin = await fetchAdminMe();
      setAdmin(currentAdmin);
      setHasToken(true);
      return currentAdmin;
    } catch {
      // Invalid/expired token — the response interceptor already cleared it.
      localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
      setAdmin(null);
      setHasToken(false);
      return null;
    }
  }, []);

  const value = useMemo<AdminAuthContextValue>(
    () => ({
      admin,
      isAuthenticated: hasToken,
      login,
      logout,
      refreshAdmin,
    }),
    [admin, hasToken, login, logout, refreshAdmin]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}
