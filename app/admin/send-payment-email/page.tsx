'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAdmin } from '@/components/admin/AdminProvider';
import { Card, Notice, money } from '@/components/admin/bits';
import { parsePaymentDetail, paymentMethodParts } from '@/lib/order';
import { REPLY } from '@/lib/reply-config';
import type { StoredOrder } from '@/lib/stores';

const PLACEHOLDER = 'Account name: e bikes for sale Pty Ltd\nBSB: 000-000\nAccount number: 00000000\nReference: (the order number is added for you)';
const METHOD_IDS: Record<string, string> = { 'PayID': 'payid', 'Bank transfer (Osko / EFT)': 'osko' };

function Composer() {
  const id = useSearchParams().get('id') || '';
  const { api } = useAdmin();
  const [order, setOrder] = useState<StoredOrder | null>(null);
  const [methodId, setMethodId] = useState('payid');
  const [detail, setDetail] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ tone: 'ok' | 'err'; text: string } | null>(null);
  const [wa, setWa] = useState<{ link: string; text: string } | null>(null);

  useEffect(() => {
    if (!id) return;
    api<{ order: StoredOrder }>(`/api/admin/orders/${encodeURIComponent(id)}`).then((r) => {
      if (r.status === 200 && r.data.order) {
        const o = r.data.order;
        setOrder(o);
        const m = o.paymentMethod.toLowerCase().includes('crypto') ? 'crypto' : METHOD_IDS[o.paymentMethod] || 'payid';
        setMethodId(m);
        if (o.paymentDetails) setDetail(o.paymentDetails.fields.map((f) => `${f.label}: ${f.value}`).join('\n'));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!id) return <Notice>Open an order first, then choose &quot;Send payment details&quot;.</Notice>;
  if (!order) return <p className="text-gray-400">Loading…</p>;

  const fields = parsePaymentDetail(detail);
  const parts = paymentMethodParts(methodId, order.amountDue, order.orderNumber);

  const send = async () => {
    setBusy(true); setMsg(null);
    const r = await api<{ ok: boolean; error?: string; reason?: string; whatsappLink?: string; whatsappText?: string }>('/api/admin/send-payment-email', { method: 'POST', body: JSON.stringify({ orderNumber: order.orderNumber, methodId, detail }) });
    setBusy(false);
    if (r.data.ok) {
      setMsg({ tone: 'ok', text: `Payment details emailed to ${order.customerEmail}. The order is now marked "Payment sent".` });
      setWa({ link: r.data.whatsappLink || '', text: r.data.whatsappText || '' });
    } else setMsg({ tone: 'err', text: r.data.error === 'email-failed' ? `The email could not be sent (${r.data.reason || 'SMTP problem'}). The order was NOT marked as sent. Check the SMTP settings in Vercel.` : `Could not send: ${r.data.error || 'unknown error'}` });
  };

  return (
    <div className="space-y-5">
      <Link href={`/admin/orders/${encodeURIComponent(order.orderNumber)}`} className="inline-block py-2 text-sm text-emerald-300 hover:underline">← Back to order</Link>
      <h1 className="text-2xl font-black">Send payment details · {order.orderNumber}</h1>
      <p className="text-gray-300">{order.customerName} · {order.customerEmail} · <strong>{money(order.amountDue)}</strong></p>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="1. Payment method and details">
          <label htmlFor="m" className="mb-1 block text-sm text-gray-300">Method</label>
          <select id="m" value={methodId} onChange={(e) => setMethodId(e.target.value)} className="mb-4 min-h-11 w-full rounded-xl border border-white/15 bg-black/30 px-3">
            {REPLY.paymentMethods.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
          </select>
          <label htmlFor="d" className="mb-1 block text-sm text-gray-300">Paste the real payment details (one per line, &quot;Label: value&quot;)</label>
          <textarea id="d" rows={8} value={detail} onChange={(e) => setDetail(e.target.value)} placeholder={PLACEHOLDER} className="w-full rounded-xl border border-white/15 bg-black/30 p-3 font-mono text-sm outline-none focus:border-emerald-500" />
          <p className="mt-2 text-xs text-gray-400">Bank account, PayID, wallet address or a payment link all work. Each line becomes its own tap-to-copy field for the customer.</p>
        </Card>
        <Card title="2. Preview (what the customer sees)">
          <p className="text-sm text-gray-200">{parts.opening}</p>
          <div className="my-3 space-y-2">
            {fields.length === 0 && <p className="text-sm text-gray-500">Nothing to preview yet.</p>}
            {fields.map((f, i) => <div key={i} className="rounded-lg bg-white/5 px-3 py-2"><div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{f.label}</div><div className="break-all font-mono text-sm">{f.value}</div></div>)}
          </div>
          {parts.closing && <p className="text-sm text-gray-200">{parts.closing}</p>}
        </Card>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button onClick={send} disabled={busy || fields.length === 0} className="min-h-11 rounded-xl bg-[#2E6B4D] px-6 font-black text-white hover:bg-[#256041] disabled:opacity-50">{busy ? 'Sending…' : order.paymentDetails ? 'Resend by email' : 'Send by email'}</button>
        {msg && <div className="flex-1"><Notice tone={msg.tone}>{msg.text}</Notice></div>}
      </div>
      {wa && wa.link && (
        <Card title="WhatsApp (same details)">
          <a href={wa.link} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-xl bg-green-600 px-5 font-black text-white hover:bg-green-700">Open WhatsApp message</a>
          <button onClick={() => navigator.clipboard.writeText(wa.text)} className="ml-3 min-h-11 rounded-xl border border-white/15 px-4 text-sm font-bold hover:bg-white/10">Copy message</button>
        </Card>
      )}
    </div>
  );
}

export default function SendPaymentEmailPage() {
  return <Suspense fallback={<p className="text-gray-400">Loading…</p>}><Composer /></Suspense>;
}
