import { useEffect, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Link2,
  Link2Off,
  Loader2,
  PlugZap,
  Save,
} from 'lucide-react';
import {
  disconnectMeta,
  fetchMetaSettings,
  getApiErrorMessage,
  saveMetaSettings,
  testMetaConnection,
} from '../api/admin';
import { useAdminAuth } from '../auth/useAdminAuth';
import { DashboardLayout } from '../components/DashboardLayout';
import type { MetaSettings } from '../types';

type Banner = { kind: 'success' | 'error'; message: string } | null;

export default function AdminMetaSettingsPage() {
  const { refreshAdmin, logout } = useAdminAuth();
  const [settings, setSettings] = useState<MetaSettings | null>(null);
  const [accessToken, setAccessToken] = useState('');
  const [verifyToken, setVerifyToken] = useState('');
  const [pageId, setPageId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [banner, setBanner] = useState<Banner>(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setIsLoading(true);
      try {
        const admin = await refreshAdmin();
        if (!admin || !isMounted) return;
        const data = await fetchMetaSettings();
        if (!isMounted) return;
        setSettings(data);
        setVerifyToken(data.verifyToken ?? '');
        setPageId(data.pageId ?? '');
      } catch (loadError) {
        const message = getApiErrorMessage(loadError, 'Unable to load Meta settings.');
        if (message.toLowerCase().includes('unauthorized') || message.toLowerCase().includes('401')) {
          logout();
          return;
        }
        if (isMounted) setBanner({ kind: 'error', message });
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    void load();
    return () => { isMounted = false; };
  }, [logout, refreshAdmin]);

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBanner(null);
    setIsSaving(true);
    try {
      const updated = await saveMetaSettings({ accessToken, verifyToken, pageId });
      setSettings(updated);
      setVerifyToken(updated.verifyToken ?? verifyToken);
      setPageId(updated.pageId ?? pageId);
      setAccessToken('');
      setBanner({ kind: 'success', message: 'Settings saved.' });
    } catch (saveError) {
      setBanner({ kind: 'error', message: getApiErrorMessage(saveError, 'Unable to save settings.') });
    } finally {
      setIsSaving(false);
    }
  }

  async function handleTest() {
    setBanner(null);
    setIsTesting(true);
    try {
      const result = await testMetaConnection();
      setBanner(
        result.connected
          ? { kind: 'success', message: 'Connection successful.' }
          : { kind: 'error', message: result.error ?? 'Connection failed.' }
      );
    } catch (testError) {
      setBanner({ kind: 'error', message: getApiErrorMessage(testError, 'Connection test failed.') });
    } finally {
      setIsTesting(false);
    }
  }

  async function handleDisconnect() {
    setBanner(null);
    setIsDisconnecting(true);
    try {
      await disconnectMeta();
      setSettings({ connected: false, pageId: null, verifyToken: null, accessTokenPreview: null });
      setAccessToken('');
      setVerifyToken('');
      setPageId('');
      setBanner({ kind: 'success', message: 'Disconnected from Meta.' });
    } catch (disconnectError) {
      setBanner({ kind: 'error', message: getApiErrorMessage(disconnectError, 'Unable to disconnect.') });
    } finally {
      setIsDisconnecting(false);
    }
  }

  const connected = settings?.connected ?? false;

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-2xl space-y-6">
        <section className="animate-[fadeInUp_0.5s_ease-out]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">Integrations</p>
          <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Meta Settings</h1>
          <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-slate-500">
            Connect a Facebook Page / Instagram account to power DM automation. Tokens are stored securely on the server.
          </p>
        </section>

        {/* Connection status */}
        <div className="flex items-center gap-3 rounded-xl px-5 py-4"
          style={{
            background: connected ? 'rgba(16,185,129,0.06)' : 'rgba(148,163,184,0.06)',
            border: `1px solid ${connected ? 'rgba(16,185,129,0.15)' : 'rgba(148,163,184,0.12)'}`,
          }}>
          {connected ? <Link2 size={18} className="text-emerald-400" /> : <Link2Off size={18} className="text-slate-500" />}
          <div>
            <p className="text-[13px] font-medium" style={{ color: connected ? '#34D399' : '#94A3B8' }}>
              {connected ? 'Connected' : 'Not connected'}
            </p>
            {settings?.accessTokenPreview ? (
              <p className="text-[12px] text-slate-500">Token: {settings.accessTokenPreview}</p>
            ) : null}
          </div>
        </div>

        {banner ? (
          <div className="flex items-center gap-3 rounded-xl px-5 py-4 text-[13px]"
            style={{
              background: banner.kind === 'success' ? 'rgba(16,185,129,0.06)' : 'rgba(239,68,68,0.06)',
              border: `1px solid ${banner.kind === 'success' ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)'}`,
              color: banner.kind === 'success' ? '#6EE7B7' : '#FCA5A5',
            }}>
            {banner.kind === 'success'
              ? <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
              : <AlertCircle size={16} className="shrink-0 text-red-400" />}
            {banner.message}
          </div>
        ) : null}

        {/* Form */}
        <form
          onSubmit={handleSave}
          className="space-y-5 rounded-2xl border p-6"
          style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}
        >
          {isLoading ? (
            <div className="py-8 text-center text-slate-500">
              <Loader2 size={20} className="mx-auto mb-2 animate-spin text-blue-400" />
              Loading settings…
            </div>
          ) : (
            <>
              <div>
                <label className="mb-2 block text-[13px] font-medium text-slate-400">Page ID</label>
                <input
                  className="admin-input"
                  type="text"
                  placeholder="e.g. 1234567890"
                  value={pageId}
                  onChange={(e) => setPageId(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-2 block text-[13px] font-medium text-slate-400">Verify Token</label>
                <input
                  className="admin-input"
                  type="text"
                  placeholder="Webhook verify token"
                  value={verifyToken}
                  onChange={(e) => setVerifyToken(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-2 block text-[13px] font-medium text-slate-400">
                  Access Token {connected ? <span className="text-slate-600">(leave blank to keep current)</span> : null}
                </label>
                <input
                  className="admin-input"
                  type="password"
                  autoComplete="off"
                  placeholder={connected ? '••••••••••••' : 'Long-lived page access token'}
                  value={accessToken}
                  onChange={(e) => setAccessToken(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold text-white transition-all hover:shadow-lg hover:shadow-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                  style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)' }}
                >
                  {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                  Save settings
                </button>

                <button
                  type="button"
                  onClick={handleTest}
                  disabled={isTesting || !connected}
                  className="flex items-center gap-2 rounded-xl border px-4 py-2.5 text-[13px] font-medium text-slate-300 transition-colors hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
                  style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                >
                  {isTesting ? <Loader2 size={14} className="animate-spin" /> : <PlugZap size={14} />}
                  Test connection
                </button>

                {connected ? (
                  <button
                    type="button"
                    onClick={handleDisconnect}
                    disabled={isDisconnecting}
                    className="flex items-center gap-2 rounded-xl border px-4 py-2.5 text-[13px] font-medium text-red-300 transition-colors hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                    style={{ borderColor: 'rgba(239,68,68,0.2)' }}
                  >
                    {isDisconnecting ? <Loader2 size={14} className="animate-spin" /> : <Link2Off size={14} />}
                    Disconnect
                  </button>
                ) : null}
              </div>
            </>
          )}
        </form>
      </div>
    </DashboardLayout>
  );
}
