import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAdminAuth } from './useAdminAuth';

type CheckStatus = 'checking' | 'ok' | 'denied';

/**
 * Gate for admin routes. On mount it verifies the stored JWT via /admin/me.
 * While verifying it shows a spinner; on failure it redirects to /admin/login
 * preserving the attempted path in location state.
 */
export function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const { isAuthenticated, refreshAdmin } = useAdminAuth();
  const location = useLocation();
  // No token at all → denied immediately, no verification round-trip needed.
  const [status, setStatus] = useState<CheckStatus>(
    isAuthenticated ? 'checking' : 'denied'
  );

  useEffect(() => {
    if (!isAuthenticated) return;
    let isMounted = true;
    void refreshAdmin().then((admin) => {
      if (isMounted) setStatus(admin ? 'ok' : 'denied');
    });
    return () => { isMounted = false; };
  }, [isAuthenticated, refreshAdmin]);

  if (status === 'checking') {
    return (
      <div className="admin-font flex min-h-screen items-center justify-center" style={{ background: '#050709' }}>
        <Loader2 size={24} className="animate-spin text-blue-400" />
      </div>
    );
  }

  if (status === 'denied') {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return children;
}
