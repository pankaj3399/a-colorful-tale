import {
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
  SlidersHorizontal,
} from 'lucide-react';
import type { AnalyticsRow, Pagination } from '../types';
import { formatDate } from '../utils/format';

interface AnalyticsTableProps {
  rows: AnalyticsRow[];
  pagination: Pagination;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onOpenFilters: () => void;
  activeFilterCount: number;
  onExport: () => void;
  isExporting: boolean;
}

function StatusBadge({ status }: { status: string | null }) {
  const map: Record<string, { bg: string; color: string }> = {
    ACTIVE: { bg: 'rgba(59,130,246,0.12)', color: '#60A5FA' },
    WAITING: { bg: 'rgba(245,158,11,0.12)', color: '#FBBF24' },
    COMPLETED: { bg: 'rgba(16,185,129,0.12)', color: '#34D399' },
  };
  const key = (status ?? '').toUpperCase();
  const style = map[key] ?? { bg: 'rgba(148,163,184,0.12)', color: '#94A3B8' };
  return (
    <span className="rounded-full px-2.5 py-0.5 text-[11px] font-medium"
      style={{ background: style.bg, color: style.color }}>
      {status ?? '—'}
    </span>
  );
}

export function AnalyticsTable({
  rows,
  pagination,
  isLoading,
  onPageChange,
  onOpenFilters,
  activeFilterCount,
  onExport,
  isExporting,
}: AnalyticsTableProps) {
  const { page, totalPages, total } = pagination;

  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border"
      style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}>
      {/* Header */}
      <div className="flex shrink-0 flex-col gap-3 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div>
          <h2 className="text-sm font-semibold text-white">Leads &amp; Users</h2>
          <p className="text-[12px] text-slate-500">{total} total records</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenFilters}
            className="relative flex items-center gap-2 rounded-xl border px-3 py-2 text-[13px] font-medium text-slate-300 transition-colors hover:bg-white/5"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <SlidersHorizontal size={14} />
            Filters
            {activeFilterCount > 0 ? (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-500 px-1 text-[10px] font-semibold text-white">
                {activeFilterCount}
              </span>
            ) : null}
          </button>
          <button
            onClick={onExport}
            disabled={isExporting}
            className="flex items-center gap-2 rounded-xl border px-3 py-2 text-[13px] font-medium text-slate-300 transition-colors hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            {isExporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
            Export CSV
          </button>
        </div>
      </div>

      {/* Table (scrollable body) */}
      <div className="min-h-0 flex-1 overflow-auto">
        <table className="w-full text-left text-[13px]">
          <thead className="sticky top-0 z-10" style={{ background: '#0b0f14' }}>
            <tr className="text-[11px] uppercase tracking-wider text-slate-600">
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Phone</th>
              <th className="px-5 py-3 font-medium">Type</th>
              <th className="px-5 py-3 font-medium">Source</th>
              <th className="px-5 py-3 font-medium">Tags</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Created</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className="px-5 py-16 text-center text-slate-500">
                  <Loader2 size={20} className="mx-auto mb-2 animate-spin text-blue-400" />
                  Loading records…
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-16 text-center text-slate-500">
                  No records match the current filters.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-t transition-colors hover:bg-white/[0.02]"
                  style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                  <td className="px-5 py-3.5 font-medium text-slate-200">
                    {row.email ?? <span className="font-normal text-slate-600">—</span>}
                  </td>
                  <td className="px-5 py-3.5 text-slate-400">{row.phone ?? '—'}</td>
                  <td className="px-5 py-3.5 capitalize text-slate-400">{row.profileType ?? '—'}</td>
                  <td className="px-5 py-3.5 text-slate-500">{row.classificationSource ?? '—'}</td>
                  <td className="px-5 py-3.5">
                    {row.tags.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {row.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="rounded-full px-2 py-0.5 text-[10px] font-medium text-slate-300"
                            style={{ background: 'rgba(255,255,255,0.06)' }}>
                            {tag}
                          </span>
                        ))}
                        {row.tags.length > 3 ? (
                          <span className="px-1 text-[10px] text-slate-500">+{row.tags.length - 3}</span>
                        ) : null}
                      </div>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5"><StatusBadge status={row.status} /></td>
                  <td className="px-5 py-3.5 text-slate-500">{formatDate(row.createdAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex shrink-0 items-center justify-between border-t px-5 py-4"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <p className="text-[12px] text-slate-500">
          Page {page} of {Math.max(totalPages, 1)}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1 || isLoading}
            className="flex h-8 w-8 items-center justify-center rounded-lg border text-slate-300 transition-colors hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => onPageChange(page + 1)}
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
  );
}
