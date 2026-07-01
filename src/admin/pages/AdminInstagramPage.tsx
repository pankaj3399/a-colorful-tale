import { useCallback, useEffect, useState } from 'react';
import {
  AlertCircle,
  AtSign,
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  X,
} from 'lucide-react';
import {
  exportInstagramCsv,
  fetchInstagramConversation,
  fetchInstagramConversations,
  fetchInstagramOverview,
  getApiErrorMessage,
} from '../api/admin';
import { useAdminAuth } from '../auth/useAdminAuth';
import { DashboardLayout } from '../components/DashboardLayout';
import type {
  InstagramConversation,
  InstagramConversationListResponse,
  InstagramFilters,
  InstagramOverviewMetrics,
} from '../types';
import { downloadBlob, formatDate } from '../utils/format';

const defaultOverview: InstagramOverviewMetrics = {
  totalConversations: 0,
  activeConversations: 0,
  completedConversations: 0,
  emailsCaptured: 0,
  phonesCaptured: 0,
};

const defaultList: InstagramConversationListResponse = {
  rows: [],
  pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
};

const initialFilters: InstagramFilters = {
  page: 1,
  limit: 10,
  search: '',
  status: '',
  sortBy: 'lastMessageAt',
  sortOrder: 'desc',
  startDate: '',
  endDate: '',
};

const metricCards = [
  { key: 'totalConversations', label: 'Conversations', icon: MessageSquare, color: '#60A5FA', bg: 'rgba(59,130,246,0.12)' },
  { key: 'activeConversations', label: 'Active', icon: AtSign, color: '#A78BFA', bg: 'rgba(139,92,246,0.12)' },
  { key: 'completedConversations', label: 'Completed', icon: MessageSquare, color: '#34D399', bg: 'rgba(16,185,129,0.12)' },
  { key: 'emailsCaptured', label: 'Emails', icon: Mail, color: '#22D3EE', bg: 'rgba(6,182,212,0.12)' },
  { key: 'phonesCaptured', label: 'Phones', icon: Phone, color: '#FBBF24', bg: 'rgba(245,158,11,0.12)' },
] as const;

export default function AdminInstagramPage() {
  const { refreshAdmin, logout } = useAdminAuth();
  const [filters, setFilters] = useState<InstagramFilters>(initialFilters);
  const [overview, setOverview] = useState<InstagramOverviewMetrics>(defaultOverview);
  const [list, setList] = useState<InstagramConversationListResponse>(defaultList);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<InstagramConversation | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const admin = await refreshAdmin();
        if (!admin || !isMounted) return;
        const [overviewData, listData] = await Promise.all([
          fetchInstagramOverview(),
          fetchInstagramConversations(filters),
        ]);
        if (!isMounted) return;
        setOverview(overviewData);
        setList(listData);
      } catch (loadError) {
        const message = getApiErrorMessage(loadError, 'Unable to load Instagram data.');
        if (message.toLowerCase().includes('unauthorized') || message.toLowerCase().includes('401')) {
          logout();
          return;
        }
        if (isMounted) setError(message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    void load();
    return () => { isMounted = false; };
  }, [filters, logout, refreshAdmin]);

  function handleFilterChange(key: keyof InstagramFilters, value: string | number) {
    setFilters((current) => ({
      ...current,
      [key]: value,
      page: key === 'page' ? Number(value) : 1,
    }));
  }

  const handleExport = useCallback(async () => {
    setIsExporting(true);
    try {
      const blob = await exportInstagramCsv(filters);
      downloadBlob(blob, `instagram-conversations-page-${filters.page}.csv`);
    } catch (exportError) {
      setError(getApiErrorMessage(exportError, 'Unable to export CSV.'));
    } finally {
      setIsExporting(false);
    }
  }, [filters]);

  async function openConversation(id: string) {
    setIsDetailLoading(true);
    setSelected(null);
    try {
      const conversation = await fetchInstagramConversation(id);
      setSelected(conversation);
    } catch (detailError) {
      setError(getApiErrorMessage(detailError, 'Unable to load conversation.'));
    } finally {
      setIsDetailLoading(false);
    }
  }

  const { page, totalPages } = list.pagination;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <section className="animate-[fadeInUp_0.5s_ease-out]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">Automation</p>
          <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Instagram DMs</h1>
          <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-slate-500">
            Track automated DM conversations and the contact details captured along the way.
          </p>
        </section>

        {error ? (
          <div className="flex items-center gap-3 rounded-xl px-5 py-4 text-[13px]"
            style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.12)', color: '#FCA5A5' }}>
            <AlertCircle size={16} className="shrink-0 text-red-400" />
            {error}
          </div>
        ) : null}

        {/* Metrics */}
        <section className="stagger-fade grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {metricCards.map(({ key, label, icon: Icon, color, bg }) => (
            <article key={key} className="rounded-2xl border p-5"
              style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: bg }}>
                <Icon size={18} style={{ color }} />
              </div>
              <p className="text-[12px] font-medium text-slate-500">{label}</p>
              <p className="mt-1 text-2xl font-semibold text-white">{overview[key]}</p>
            </article>
          ))}
        </section>

        {/* Conversation list */}
        <section className="rounded-2xl border"
          style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="flex flex-col gap-3 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <h2 className="text-sm font-semibold text-white">Conversations</h2>
            <div className="flex items-center gap-2">
              <input
                className="admin-input"
                style={{ width: 200 }}
                type="text"
                placeholder="Search username…"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
              <select
                className="admin-input"
                style={{ width: 140 }}
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">All statuses</option>
                <option value="ACTIVE">Active</option>
                <option value="WAITING">Waiting</option>
                <option value="COMPLETED">Completed</option>
              </select>
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="flex items-center gap-2 rounded-xl border px-3 py-2 text-[13px] font-medium text-slate-300 transition-colors hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
              >
                {isExporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                Export
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="text-[11px] uppercase tracking-wider text-slate-600">
                  <th className="px-5 py-3 font-medium">Username</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Email</th>
                  <th className="px-5 py-3 font-medium">Phone</th>
                  <th className="px-5 py-3 font-medium">Messages</th>
                  <th className="px-5 py-3 font-medium">Last activity</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center text-slate-500">
                      <Loader2 size={20} className="mx-auto mb-2 animate-spin text-blue-400" />
                      Loading conversations…
                    </td>
                  </tr>
                ) : list.rows.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center text-slate-500">
                      No conversations yet.
                    </td>
                  </tr>
                ) : (
                  list.rows.map((row) => {
                    const conversationId = row._id ?? row.id;
                    return (
                    <tr
                      key={conversationId}
                      onClick={() => openConversation(conversationId)}
                      className="cursor-pointer border-t transition-colors hover:bg-white/[0.03]"
                      style={{ borderColor: 'rgba(255,255,255,0.04)' }}
                    >
                      <td className="px-5 py-3.5 font-medium text-slate-200">@{row.igUsername ?? '—'}</td>
                      <td className="px-5 py-3.5 text-slate-400">{row.status ?? '—'}</td>
                      <td className="px-5 py-3.5 text-slate-400">{row.email ?? '—'}</td>
                      <td className="px-5 py-3.5 text-slate-400">{row.phone ?? '—'}</td>
                      <td className="px-5 py-3.5 text-slate-500">{row.messageCount ?? row.messages?.length ?? 0}</td>
                      <td className="px-5 py-3.5 text-slate-500">{formatDate(row.lastMessageAt ?? row.updatedAt ?? row.createdAt)}</td>
                    </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t px-5 py-4"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <p className="text-[12px] text-slate-500">Page {page} of {Math.max(totalPages, 1)}</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleFilterChange('page', page - 1)}
                disabled={page <= 1 || isLoading}
                className="flex h-8 w-8 items-center justify-center rounded-lg border text-slate-300 transition-colors hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => handleFilterChange('page', page + 1)}
                disabled={page >= totalPages || isLoading}
                className="flex h-8 w-8 items-center justify-center rounded-lg border text-slate-300 transition-colors hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                aria-label="Next page"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Detail drawer */}
      {(selected || isDetailLoading) ? (
        <>
          <div className="fixed inset-0 z-40 bg-black/60" onClick={() => setSelected(null)} aria-hidden="true" />
          <aside
            className="admin-font fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col"
            style={{ background: '#0a0e13', borderLeft: '1px solid rgba(255,255,255,0.06)' }}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between border-b px-5 py-4" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <h2 className="text-sm font-semibold text-white">
                {selected ? `@${selected.igUsername ?? 'conversation'}` : 'Loading…'}
              </h2>
              <button
                onClick={() => setSelected(null)}
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              {isDetailLoading ? (
                <div className="py-16 text-center text-slate-500">
                  <Loader2 size={20} className="mx-auto mb-2 animate-spin text-blue-400" />
                  Loading…
                </div>
              ) : selected ? (
                <>
                  <dl className="mb-5 grid grid-cols-2 gap-3 text-[13px]">
                    <div><dt className="text-slate-600">Status</dt><dd className="text-slate-300">{selected.status ?? '—'}</dd></div>
                    <div><dt className="text-slate-600">Created</dt><dd className="text-slate-300">{formatDate(selected.createdAt)}</dd></div>
                    <div><dt className="text-slate-600">Email</dt><dd className="text-slate-300">{selected.email ?? '—'}</dd></div>
                    <div><dt className="text-slate-600">Phone</dt><dd className="text-slate-300">{selected.phone ?? '—'}</dd></div>
                  </dl>

                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-600">Messages</p>
                  <div className="space-y-2">
                    {(selected.messages ?? []).length === 0 ? (
                      <p className="text-[13px] text-slate-500">No messages recorded.</p>
                    ) : (
                      selected.messages!.map((message) => (
                        <div
                          key={message.id}
                          className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-[13px] ${
                            message.direction === 'outbound' ? 'ml-auto text-white' : 'mr-auto text-slate-200'
                          }`}
                          style={{
                            background: message.direction === 'outbound'
                              ? 'linear-gradient(135deg, rgba(59,130,246,0.85), rgba(99,102,241,0.85))'
                              : 'rgba(255,255,255,0.05)',
                          }}
                        >
                          {message.text}
                          <span className="mt-1 block text-[10px] opacity-60">{formatDate(message.createdAt)}</span>
                        </div>
                      ))
                    )}
                  </div>
                </>
              ) : null}
            </div>
          </aside>
        </>
      ) : null}
    </DashboardLayout>
  );
}
