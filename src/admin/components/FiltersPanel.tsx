import { Download, Loader2, RotateCcw, X } from 'lucide-react';
import type { AnalyticsFilters } from '../types';

interface FiltersPanelProps {
  filters: AnalyticsFilters;
  onChange: (key: keyof AnalyticsFilters, value: string | number) => void;
  onReset: () => void;
  onExport: () => void;
  isExporting: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const profileTypeOptions = [
  { value: '', label: 'All types' },
  { value: 'professional', label: 'Professional' },
  { value: 'fan', label: 'Fan' },
];

const statusOptions = [
  { value: '', label: 'All statuses' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'WAITING', label: 'Waiting' },
  { value: 'COMPLETED', label: 'Completed' },
];

const sortOptions = [
  { value: 'createdAt', label: 'Created date' },
  { value: 'updatedAt', label: 'Updated date' },
  { value: 'name', label: 'Name' },
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-[13px] font-medium text-slate-400">{label}</label>
      {children}
    </div>
  );
}

export function FiltersPanel({
  filters,
  onChange,
  onReset,
  onExport,
  isExporting,
  isOpen,
  onClose,
}: FiltersPanelProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`admin-font fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ background: '#0a0e13', borderLeft: '1px solid rgba(255,255,255,0.06)' }}
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
      >
        <div className="flex items-center justify-between border-b px-5 py-4"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <h2 className="text-sm font-semibold text-white">Filters</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
            aria-label="Close filters"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-6">
          <Field label="Search">
            <input
              className="admin-input"
              type="text"
              placeholder="Name, email or phone"
              value={filters.search}
              onChange={(e) => onChange('search', e.target.value)}
            />
          </Field>

          <Field label="Profile type">
            <select
              className="admin-input"
              value={filters.profileType}
              onChange={(e) => onChange('profileType', e.target.value)}
            >
              {profileTypeOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </Field>

          <Field label="Status">
            <select
              className="admin-input"
              value={filters.status}
              onChange={(e) => onChange('status', e.target.value)}
            >
              {statusOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </Field>

          <Field label="Classification source">
            <input
              className="admin-input"
              type="text"
              placeholder="e.g. chatbot, instagram"
              value={filters.classificationSource}
              onChange={(e) => onChange('classificationSource', e.target.value)}
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Start date">
              <input
                className="admin-input"
                type="date"
                value={filters.startDate}
                onChange={(e) => onChange('startDate', e.target.value)}
              />
            </Field>
            <Field label="End date">
              <input
                className="admin-input"
                type="date"
                value={filters.endDate}
                onChange={(e) => onChange('endDate', e.target.value)}
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Sort by">
              <select
                className="admin-input"
                value={filters.sortBy}
                onChange={(e) => onChange('sortBy', e.target.value)}
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </Field>
            <Field label="Order">
              <select
                className="admin-input"
                value={filters.sortOrder}
                onChange={(e) => onChange('sortOrder', e.target.value)}
              >
                <option value="desc">Newest first</option>
                <option value="asc">Oldest first</option>
              </select>
            </Field>
          </div>
        </div>

        <div className="flex items-center gap-3 border-t px-5 py-4"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <button
            onClick={onReset}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-[13px] font-medium text-slate-300 transition-colors hover:bg-white/5"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <RotateCcw size={14} />
            Reset
          </button>
          <button
            onClick={onExport}
            disabled={isExporting}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold text-white transition-all hover:shadow-lg hover:shadow-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)' }}
          >
            {isExporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
            Export
          </button>
        </div>
      </aside>
    </>
  );
}
