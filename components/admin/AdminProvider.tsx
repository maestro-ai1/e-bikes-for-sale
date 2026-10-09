'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Lock, LogOut } from 'lucide-react';

const KEY = 'ebfs-admin-passcode';

interface AdminCtx {
  passcode: string;
  signOut: () => void;
  api: <T = Record<string, unknown>>(path: string, init?: RequestInit) => Promise<{ status: number; data: T }>;
}
const Ctx = createContext<AdminCtx | null>(null);
export const useAdmin = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error('useAdmin must be used inside AdminProvider');
  return c;
};

const NAV = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/orders', label: 'Orders' },
  { href: '/admin/enquiries', label: 'Enquiries' },
];

/** Passcode gate: verifies by calling the orders endpoint with the header (no separate /verify route). */
export default function AdminProvider({ children }: { children: React.ReactNode }) {
  const [passcode, setPasscode] = useState('');
  const [input, setInput] = useState('');
  const [state, setState] = useState<'checking' | 'locked' | 'open'>('checking');
  const [error, setError] = useState('');
  const pathname = usePathname();

  const verify = useCallback(async (code: string) => {
    try {
      const res = await fetch('/api/admin/orders', { headers: { 'x-admin-passcode': code } });
      if (res.status === 503) { setError('The admin passcode has not been set up on the server yet (ADMIN_PASSCODE).'); return false; }
      if (res.status === 401) { setError(code ? 'Incorrect passcode.' : ''); return false; }
      return res.ok;
    } catch { setError('Could not reach the server.'); return false; }
  }, []);

  useEffect(() => {
    let saved = '';
    try { saved = localStorage.getItem(KEY) || ''; } catch { /* private browsing */ }
    if (!saved) { Promise.resolve().then(() => setState('locked')); return; }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- verify() only sets state after an awaited fetch
    verify(saved).then((ok) => { if (ok) { setPasscode(saved); setState('open'); } else setState('locked'); });
  }, [verify]);

  const signOut = () => { try { localStorage.removeItem(KEY); } catch { /* ignore */ } setPasscode(''); setInput(''); setState('locked'); };

  const api: AdminCtx['api'] = async (path, init = {}) => {
    const res = await fetch(path, { ...init, headers: { ...(init.headers || {}), 'x-admin-passcode': passcode, ...(init.body && !(init.body instanceof FormData) ? { 'content-type': 'application/json' } : {}) } });
    let data: unknown = {};
    try { data = await res.json(); } catch { /* empty */ }
    if (res.status === 401) signOut();
    return { status: res.status, data: data as never };
  };

  if (state === 'checking') return <div className="flex min-h-screen items-center justify-center bg-[#0f1512] text-sm text-gray-400">Loading…</div>;

  if (state === 'locked')
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0f1512] px-4">
        <form
          className="w-full max-w-sm space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6"
          onSubmit={async (e) => {
            e.preventDefault();
            setError('');
            if (await verify(input)) { try { localStorage.setItem(KEY, input); } catch { /* ignore */ } setPasscode(input); setState('open'); }
          }}
        >
          <div className="flex items-center gap-2 text-emerald-400"><Lock className="h-5 w-5" aria-hidden="true" /><span className="font-black">Admin</span></div>
          <label htmlFor="pc" className="block text-sm text-gray-300">Passcode</label>
          <input id="pc" type="password" autoComplete="current-password" value={input} onChange={(e) => setInput(e.target.value)} className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-3 text-white outline-none focus:border-emerald-500" />
          {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
          <button type="submit" className="min-h-11 w-full rounded-xl bg-[#2E6B4D] font-black text-white hover:bg-[#256041]">Unlock</button>
        </form>
      </div>
    );

  return (
    <Ctx.Provider value={{ passcode, signOut, api }}>
      <div className="min-h-screen bg-[#0f1512] text-gray-100">
        <header className="sticky top-0 z-10 border-b border-white/10 bg-[#0f1512]/95 backdrop-blur">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-1 px-4 py-2">
            <Link href="/admin" className="font-black text-emerald-400">e bikes for sale · Admin</Link>
            <nav aria-label="Admin" className="flex flex-1 flex-wrap gap-1">
              {NAV.map((n) => {
                const active = n.href === '/admin' ? pathname === '/admin' : pathname.startsWith(n.href);
                return <Link key={n.href} href={n.href} aria-current={active ? 'page' : undefined} className={`inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-bold ${active ? 'bg-[#2E6B4D] text-white' : 'text-gray-300 hover:bg-white/10'}`}>{n.label}</Link>;
              })}
            </nav>
            <button onClick={signOut} className="inline-flex min-h-11 items-center gap-1 rounded-lg px-3 text-sm text-gray-300 hover:bg-white/10"><LogOut className="h-4 w-4" aria-hidden="true" /> Sign out</button>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
      </div>
    </Ctx.Provider>
  );
}
