/** 1234567 → "1,234,567". Non-finite values render as "0". */
export function formatNumber(value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return '0';
  }
  return new Intl.NumberFormat('en-US').format(value);
}

/** ISO timestamp → "May 30, 2026, 4:21 PM". Falls back to the raw string. */
export function formatDate(value: string | null | undefined): string {
  if (!value) return '—';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

/**
 * Human-readable short label for an opaque user id, so the table never shows a
 * raw 24-char Mongo ObjectId or a full UUID.
 *
 *   "anon_2a6239c0-5530-458e-…"        → "anon_2a6239c0"   (keep anon + first segment)
 *   "6a1bf862f09a02e16383c6fc"         → "#6a1bf8…83c6fc"  (head…tail of a hex/long id)
 *   "" / null                          → "—"
 */
export function formatUserId(userId: string | null | undefined): string {
  if (!userId) return '—';

  if (userId.startsWith('anon_')) {
    const firstSegment = userId.slice(5).split('-')[0];
    return `anon_${firstSegment}`;
  }

  // Opaque id (ObjectId / UUID / token) — show a head…tail preview, monospaced.
  if (userId.length > 14) {
    return `#${userId.slice(0, 6)}…${userId.slice(-6)}`;
  }

  return userId;
}

/** Trigger a browser download for a Blob (e.g. CSV export). */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
