'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import CopyField from '@/components/CopyField';
import { money } from '@/lib/order';
import { waPaymentConfirmationLink } from '@/lib/whatsapp';

interface Details { orderNumber: string; amountDue: number; status: string; opening: string; closing: string; fields: { label: string; value: string }[]; terms: string[] }

function Page() {
  const id = (useSearchParams().get('id') || '').toUpperCase();
  const [d, setD] = useState<Details | null>(null);
  const [state, setState] = useState<'loading' | 'ok' | 'missing'>('loading');

  useEffect(() => {
    if (!id) { Promise.resolve().then(() => setState('missing')); return; }
    fetch(`/api/order/payment-details?id=${encodeURIComponent(id)}`)
      .then(async (r) => (r.ok ? r.json() : null))
      .then((j) => { if (j?.ok) { setD(j); setState('ok'); } else setState('missing'); })
      .catch(() => setState('missing'));
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-xl space-y-5">
        <div className="text-center"><Link href="/" className="text-sm font-black text-[#1E4733] hover:underline">e bikes for sale</Link></div>
        {state === 'loading' && <p className="text-center text-gray-600">Loading your payment details…</p>}
        {state === 'missing' && (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center">
            <h1 className="text-xl font-black text-gray-900">We could not find those payment details</h1>
            <p className="mt-2 text-sm text-gray-600">Payment details are only available after we email them to you. Please use the link in that email, or contact us and quote your order number.</p>
            <Link href="/contact" className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-[#1E4733] px-5 font-black text-white">Contact us</Link>
          </div>
        )}
        {state === 'ok' && d && (
          <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-600">Order {d.orderNumber}</p>
              <h1 className="text-3xl font-black text-[#1E4733]">{money(d.amountDue)} due</h1>
            </div>
            <p className="text-sm leading-relaxed text-gray-800">{d.opening}</p>
            <div className="space-y-2">{d.fields.map((f, i) => <CopyField key={i} label={f.label} value={f.value} />)}</div>
            {d.closing && <p className="text-sm leading-relaxed text-gray-800">{d.closing}</p>}
            <ul className="list-disc space-y-1 rounded-xl bg-emerald-50 p-4 pl-8 text-sm text-gray-800">{d.terms.map((t) => <li key={t}>{t}</li>)}</ul>
            <div className="flex flex-wrap gap-2 pt-1">
              <Link href={`/order/confirm-payment?id=${encodeURIComponent(d.orderNumber)}`} className="inline-flex min-h-11 items-center rounded-xl bg-[#1E4733] px-5 text-sm font-black text-white hover:bg-[#2E6B4D]">I have paid: upload confirmation</Link>
              <a href={waPaymentConfirmationLink(d.orderNumber)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-xl border border-gray-300 px-5 text-sm font-bold text-gray-800 hover:bg-gray-50">Confirm via WhatsApp</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PaymentDetailsPage() {
  return <Suspense fallback={<p className="p-10 text-center text-gray-600">Loading…</p>}><Page /></Suspense>;
}
