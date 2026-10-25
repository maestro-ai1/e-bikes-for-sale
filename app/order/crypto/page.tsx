'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import QRCode from 'qrcode';
import { Check, CheckCircle2, Copy, ShieldCheck, TriangleAlert } from 'lucide-react';
import { BUSINESS_INFO } from '@/lib/site-config';
import type { CryptoWallet } from '@/lib/crypto-config';

type Data = { orderNumber: string; amountDue: number; subtotal: number; shipping: number; cryptoDiscount: number; status?: string; wallets: CryptoWallet[] };

const aud = (n: number) => `$${n.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} AUD`;
const MAX_BYTES = 4 * 1024 * 1024;
const UPLOAD_ERRORS: Record<string, string> = {
  'file-too-large': 'That file is over 4MB. Please upload a smaller screenshot.',
  'invalid-file-type': 'Please upload a JPG, PNG, WebP or HEIC image.',
  'no-file': 'Please choose a screenshot to upload.',
  'not-found': 'We could not find that order. Please use the link from your email.',
  'email-failed': 'We could not send your screenshot just now. Please try again, or message us on WhatsApp.',
};

function Qr({ value, label }: { value: string; label: string }) {
  const [src, setSrc] = useState('');
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let live = true;
    setFailed(false);
    QRCode.toDataURL(value, { width: 480, margin: 2, errorCorrectionLevel: 'M' }).then((u) => live && setSrc(u)).catch(() => live && setFailed(true));
    return () => { live = false; };
  }, [value]);
  return (
    <div className="mx-auto grid h-56 w-56 place-items-center rounded-2xl border border-gray-200 bg-white p-2">
      {src && !failed ? (
        <img src={src} alt={`QR code for the ${label} wallet address`} width={224} height={224} className="h-full w-full" onError={() => setFailed(true)} />
      ) : (
        <span className="px-3 text-center text-xs text-gray-600">{failed ? 'QR code unavailable. Please copy the address below.' : 'Loading QR…'}</span>
      )}
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:py-10">
      <div className="mx-auto max-w-2xl space-y-5">
        <div className="text-center"><Link href="/" className="text-sm font-black text-[#1E4733] hover:underline">e bikes for sale</Link></div>
        {children}
      </div>
    </div>
  );
}

function Page() {
  const id = (useSearchParams().get('id') || '').toUpperCase();
  const [data, setData] = useState<Data | null>(null);
  const [err, setErr] = useState('');
  const [pick, setPick] = useState(0);
  const [copied, setCopied] = useState('');
  const [state, setState] = useState<'idle' | 'busy' | 'done'>('idle');
  const [upErr, setUpErr] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/order/crypto?id=${encodeURIComponent(id)}`)
      .then(async (r) => {
        const j = await r.json().catch(() => ({}));
        if (r.ok && j.ok) {
          setData(j);
          if (j.status === 'screenshot-received' || j.status === 'payment-confirmed') setState('done');
        } else {
          setErr(j.error === 'not-crypto' ? 'This order was not placed with crypto. Please use the payment link from your email.' : 'We could not find that order. Please use the link from your email.');
        }
      })
      .catch(() => setErr(`We could not load your order. Please call ${BUSINESS_INFO.phone} or message us on WhatsApp.`));
  }, [id]);

  const copy = async (key: string, text: string) => {
    try { await navigator.clipboard.writeText(text); } catch { /* the address box is selectable as a fallback */ }
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpErr('');
    if (!file) { setUpErr(UPLOAD_ERRORS['no-file']); return; }
    if (file.size > MAX_BYTES) { setUpErr(UPLOAD_ERRORS['file-too-large']); return; }
    setState('busy');
    try {
      const fd = new FormData();
      fd.set('id', id);
      fd.set('note', `Crypto payment (${data?.wallets[pick]?.label} ${data?.wallets[pick]?.network})`);
      fd.set('file', file);
      const r = await fetch('/api/order/confirm-payment', { method: 'POST', body: fd });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.ok) setState('done'); else { setUpErr(UPLOAD_ERRORS[j.error] || 'Upload failed. Please try again.'); setState('idle'); }
    } catch { setUpErr('Network error. Please try again.'); setState('idle'); }
  };

  if (!id) return <Shell><p className="rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-700">Open this page from checkout or from the link in your order email.</p></Shell>;
  if (err) return <Shell><p role="alert" className="rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-700">{err}</p></Shell>;
  if (!data) return <Shell><p className="text-center text-gray-600">Loading your order…</p></Shell>;

  if (data.status === 'payment-confirmed') {
    return (
      <Shell>
        <div className="space-y-3 rounded-2xl border border-gray-200 bg-white p-6 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-[#2E6B4D]" aria-hidden="true" />
          <h1 className="text-2xl font-black text-gray-900">Payment received</h1>
          <p className="text-sm text-gray-700">Thank you. Your crypto payment for order <strong>{data.orderNumber}</strong> is confirmed. We are preparing your order and will email you the delivery details.</p>
          <Link href="/" className="inline-flex min-h-11 items-center rounded-xl bg-[#1E4733] px-5 font-black text-white">Back to the shop</Link>
        </div>
      </Shell>
    );
  }

  const w = data.wallets[pick];
  return (
    <Shell>
      <h1 className="text-2xl font-black text-gray-900 sm:text-3xl">Pay with crypto</h1>

      <div className="rounded-2xl bg-[#14231B] p-5 text-white">
        <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">Order {data.orderNumber}</p>
        <p className="mt-1 text-3xl font-black tabular-nums">{aud(data.amountDue)}</p>
        <p className="mt-1 text-sm text-gray-200">
          Includes your 10% crypto discount{data.cryptoDiscount ? ` (-${aud(data.cryptoDiscount)})` : ''}. Send the equivalent value in the crypto you choose below.
        </p>
      </div>

      <section aria-labelledby="step1" className="space-y-3">
        <h2 id="step1" className="text-lg font-black text-gray-900">1. Choose how you want to pay</h2>
        <div role="tablist" aria-label="Crypto payment options" className="grid gap-2 sm:grid-cols-3">
          {data.wallets.map((x, i) => (
            <button
              key={x.id}
              type="button"
              role="tab"
              aria-selected={pick === i}
              onClick={() => setPick(i)}
              className={`min-h-14 rounded-xl border-2 p-3 text-left transition ${pick === i ? 'border-[#2E6B4D] bg-emerald-50' : 'border-gray-200 bg-white hover:border-[#2E6B4D]'}`}
            >
              <span className="block font-black text-gray-900">{x.label}</span>
              <span className="block text-xs text-gray-600">{x.network}</span>
            </button>
          ))}
        </div>

        <div role="tabpanel" className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
          <Qr value={w.uri} label={`${w.label} ${w.network}`} />
          <p className="mt-4 text-center text-sm font-semibold text-gray-800">Scan with your wallet app, or copy the address</p>
          <label htmlFor={`addr-${w.id}`} className="mt-3 block text-xs font-bold uppercase tracking-wider text-[#2E6B4D]">{w.label} address · {w.network}</label>
          <textarea
            id={`addr-${w.id}`}
            readOnly
            rows={2}
            value={w.address}
            onFocus={(e) => e.currentTarget.select()}
            onClick={(e) => e.currentTarget.select()}
            className="mt-1.5 w-full resize-none break-all rounded-xl border-2 border-[#2E6B4D] bg-emerald-50 p-3 text-center font-mono text-[15px] font-bold text-gray-900"
          />
          <button
            type="button"
            onClick={() => copy(w.id, w.address)}
            aria-label={`Copy ${w.label} ${w.network} address`}
            className={`mt-2 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 font-black text-white ${copied === w.id ? 'bg-emerald-600' : 'bg-[#1E4733] hover:bg-[#2E6B4D]'}`}
          >
            {copied === w.id ? <><Check size={18} aria-hidden="true" /> Address copied</> : <><Copy size={18} aria-hidden="true" /> Copy address</>}
          </button>
          <p className="mt-4 flex gap-2 rounded-xl bg-amber-100 p-3 text-sm font-semibold text-amber-900">
            <TriangleAlert size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
            <span>Send only {w.short} on the {w.network}. Funds sent on a different network cannot be recovered. Network fees are paid by you, so send enough to cover {aud(data.amountDue)} after fees.</span>
          </p>
        </div>
      </section>

      <section aria-labelledby="step2" className="space-y-3">
        <h2 id="step2" className="text-lg font-black text-gray-900">2. Upload your payment screenshot</h2>
        {state === 'done' ? (
          <div role="status" className="space-y-2 rounded-2xl border border-gray-200 bg-white p-6 text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-[#2E6B4D]" aria-hidden="true" />
            <p className="font-black text-gray-900">Thank you. We have your screenshot.</p>
            <p className="text-sm text-gray-700">We will check it against our wallet and email you as soon as your payment is confirmed. A copy of this message is on its way to your inbox.</p>
            <Link href="/" className="inline-flex min-h-11 items-center rounded-xl bg-[#1E4733] px-5 font-black text-white">Back to the shop</Link>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
            <p className="text-sm text-gray-700">After you have sent the payment, upload a screenshot showing the amount and transaction (JPG, PNG, WebP or HEIC, up to 4MB).</p>
            <div>
              <label htmlFor="shot" className="mb-1 block text-sm font-bold text-gray-800">Payment screenshot *</label>
              <input
                id="shot"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
                required
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="block w-full text-sm file:mr-3 file:min-h-11 file:rounded-lg file:border-0 file:bg-[#1E4733] file:px-4 file:font-bold file:text-white"
              />
            </div>
            {upErr && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{upErr}</p>}
            <button type="submit" disabled={state === 'busy' || !file} className="min-h-12 w-full rounded-xl bg-[#1E4733] px-5 font-black text-white hover:bg-[#2E6B4D] disabled:opacity-50">
              {state === 'busy' ? 'Uploading…' : 'I have paid: send screenshot'}
            </button>
            <p className="flex items-center gap-2 text-xs text-gray-600"><ShieldCheck size={14} aria-hidden="true" /> Questions? Call {BUSINESS_INFO.phone} or email {BUSINESS_INFO.email}.</p>
          </form>
        )}
      </section>
    </Shell>
  );
}

export default function CryptoPayPage() {
  return <Suspense fallback={<p className="p-10 text-center text-gray-600">Loading…</p>}><Page /></Suspense>;
}
