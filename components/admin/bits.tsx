'use client';

import React from 'react';

const money = (n: number) => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: n % 1 === 0 ? 0 : 2 }).format(n);
export { money };
export const when = (iso: string) => new Date(iso).toLocaleString('en-AU', { dateStyle: 'medium', timeStyle: 'short' });

const STYLES: Record<string, string> = {
  pending: 'bg-amber-500/15 text-amber-300',
  'payment-sent': 'bg-sky-500/15 text-sky-300',
  'payment-confirmed': 'bg-emerald-500/15 text-emerald-300',
  new: 'bg-amber-500/15 text-amber-300',
  replied: 'bg-emerald-500/15 text-emerald-300',
};
const LABELS: Record<string, string> = { pending: 'Pending', 'payment-sent': 'Payment sent', 'payment-confirmed': 'Payment confirmed', new: 'New', replied: 'Replied' };

export function StatusBadge({ status }: { status: string }) {
  return <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-bold ${STYLES[status] || 'bg-white/10 text-gray-300'}`}>{LABELS[status] || status}</span>;
}

export function Card({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      {title && <h2 className="mb-3 text-xs font-black uppercase tracking-wider text-gray-400">{title}</h2>}
      {children}
    </section>
  );
}

export function Notice({ children, tone = 'warn' }: { children: React.ReactNode; tone?: 'warn' | 'ok' | 'err' }) {
  const c = tone === 'ok' ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200' : tone === 'err' ? 'border-red-500/40 bg-red-500/10 text-red-200' : 'border-amber-500/40 bg-amber-500/10 text-amber-200';
  return <div role="status" className={`rounded-xl border px-4 py-3 text-sm ${c}`}>{children}</div>;
}
