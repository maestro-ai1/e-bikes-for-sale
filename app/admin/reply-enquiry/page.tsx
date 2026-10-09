'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAdmin } from '@/components/admin/AdminProvider';
import { Card, Notice } from '@/components/admin/bits';
import type { StoredEnquiry } from '@/lib/stores';

function Composer() {
  const id = useSearchParams().get('id') || '';
  const { api } = useAdmin();
  const [e, setE] = useState<StoredEnquiry | null>(null);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ tone: 'ok' | 'err'; text: string } | null>(null);

  useEffect(() => {
    if (!id) return;
    api<{ enquiry: StoredEnquiry }>(`/api/admin/enquiries/${encodeURIComponent(id)}`).then((r) => { if (r.status === 200) { setE(r.data.enquiry); setMessage(`Hi ${r.data.enquiry.name.split(' ')[0]},\n\n\n\nKind regards,\ne bikes for sale`); } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!id) return <Notice>Open an enquiry first, then choose &quot;Reply&quot;.</Notice>;
  if (!e) return <p className="text-gray-400">Loading…</p>;

  const send = async () => {
    setBusy(true); setMsg(null);
    const r = await api<{ ok: boolean; error?: string; reason?: string }>('/api/admin/reply-enquiry', { method: 'POST', body: JSON.stringify({ id: e.id, message }) });
    setBusy(false);
    setMsg(r.data.ok ? { tone: 'ok', text: `Reply sent to ${e.email}. The enquiry is marked "Replied".` } : { tone: 'err', text: r.data.error === 'email-failed' ? `The email could not be sent (${r.data.reason || 'SMTP problem'}). Check the SMTP settings in Vercel.` : `Could not send: ${r.data.error}` });
  };

  return (
    <div className="space-y-5">
      <Link href={`/admin/enquiries/${encodeURIComponent(e.id)}`} className="inline-block py-2 text-sm text-emerald-300 hover:underline">← Back to enquiry</Link>
      <h1 className="text-2xl font-black">Reply to {e.name}</h1>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Their message"><p className="whitespace-pre-wrap text-gray-300">{e.message}</p></Card>
        <Card title={`Your reply to ${e.email}`}>
          <label htmlFor="r" className="sr-only">Reply</label>
          <textarea id="r" rows={10} value={message} onChange={(ev) => setMessage(ev.target.value)} className="w-full rounded-xl border border-white/15 bg-black/30 p-3 text-sm outline-none focus:border-emerald-500" />
        </Card>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button onClick={send} disabled={busy || message.trim().length < 2} className="min-h-11 rounded-xl bg-[#2E6B4D] px-6 font-black text-white hover:bg-[#256041] disabled:opacity-50">{busy ? 'Sending…' : 'Send reply'}</button>
        {msg && <div className="flex-1"><Notice tone={msg.tone}>{msg.text}</Notice></div>}
      </div>
    </div>
  );
}

export default function ReplyEnquiryPage() {
  return <Suspense fallback={<p className="text-gray-400">Loading…</p>}><Composer /></Suspense>;
}
