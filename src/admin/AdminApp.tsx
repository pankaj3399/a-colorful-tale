import { Navigate, Route, Routes } from 'react-router-dom';
import './admin.css';
import { AdminAuthProvider } from './auth/AuthContext';
import { ProtectedRoute } from './auth/ProtectedRoute';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminInstagramPage from './pages/AdminInstagramPage';
import AdminMetaSettingsPage from './pages/AdminMetaSettingsPage';

/** All /admin/* routes, wrapped in the auth provider. */
export default function AdminApp() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="login" element={<AdminLoginPage />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="instagram"
          element={
            <ProtectedRoute>
              <AdminInstagramPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="settings/meta"
          element={
            <ProtectedRoute>
              <AdminMetaSettingsPage />
            </ProtectedRoute>
          }
        />
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminAuthProvider>
  );
}
