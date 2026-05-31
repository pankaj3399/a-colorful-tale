import { type ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  AtSign,
  LogOut,
  Settings,
  ShieldCheck,
} from 'lucide-react';
import { useAdminAuth } from '../auth/useAdminAuth';

const navItems = [
  { to: '/admin/dashboard', label: 'Analytics', icon: BarChart3 },
  { to: '/admin/instagram', label: 'Instagram DMs', icon: AtSign },
  { to: '/admin/settings/meta', label: 'Meta Settings', icon: Settings },
];

interface DashboardLayoutProps {
  children: ReactNode;
  /**
   * When true the shell locks to the viewport height and does NOT scroll the
   * page — the page content manages its own scroll regions (e.g. the analytics
   * dashboard keeps KPIs fixed and scrolls only the table body).
   */
  fill?: boolean;
}

export function DashboardLayout({ children, fill = false }: DashboardLayoutProps) {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/admin/login', { replace: true });
  }

  return (
    <div
      className={`admin-font ${fill ? 'h-screen overflow-hidden' : 'min-h-screen'}`}
      style={{ background: '#050709' }}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full opacity-[0.12]"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)', filter: 'blur(90px)' }} />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)', filter: 'blur(90px)' }} />
      </div>

      <div className={`relative flex flex-col lg:flex-row ${fill ? 'h-screen' : 'min-h-screen'}`}>
        {/* Sidebar */}
        <aside
          className="flex shrink-0 flex-col border-b lg:h-screen lg:w-64 lg:border-b-0 lg:border-r"
          style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center gap-3 px-6 py-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))', border: '1px solid rgba(59,130,246,0.15)' }}>
              <ShieldCheck size={20} className="text-blue-400" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">Admin</p>
              <p className="text-sm font-semibold text-white">A Colorful Tale</p>
            </div>
          </div>

          <nav className="flex gap-1 px-3 pb-4 lg:flex-1 lg:flex-col lg:gap-1 lg:overflow-x-visible overflow-x-auto">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-500/10 text-blue-300'
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }`
                }
              >
                <Icon size={16} />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden border-t px-3 py-4 lg:block" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            {admin ? (
              <p className="mb-3 px-3 text-[12px] text-slate-500">
                Signed in as <span className="text-slate-300">{admin.username}</span>
              </p>
            ) : null}
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
            >
              <LogOut size={16} />
              Sign out
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main
          className={`flex-1 px-5 py-6 sm:px-8 sm:py-8 ${
            fill ? 'flex min-h-0 flex-col overflow-hidden' : 'lg:overflow-y-auto'
          }`}
        >
          <div className={`mx-auto w-full max-w-6xl ${fill ? 'flex min-h-0 flex-1 flex-col' : ''}`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
