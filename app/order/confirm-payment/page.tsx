'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';

const ERRORS: Record<string, string> = {
  'file-too-large': 'That file is over 4MB. Please upload a smaller photo or screenshot.',
  'invalid-file-type': 'Please upload a JPG, PNG, WebP or HEIC image.',
  'no-file': 'Please choose a file to upload.',
  'not-found': 'We could not find that order. Please use the link from your email.',
  'email-failed': 'We could not send your confirmation just now. Please try again, or message us on WhatsApp.',
};

function Page() {
  const id = (useSearchParams().get('id') || '').toUpperCase();
  const [file, setFile] = useState<File | null>(null);
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!file) { setError(ERRORS['no-file']); return; }
    if (file.size > 4 * 1024 * 1024) { setError(ERRORS['file-too-large']); return; }
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append('id', id); fd.append('note', note); fd.append('file', file);
      const r = await fetch('/api/order/confirm-payment', { method: 'POST', body: fd });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.ok) setDone(true); else setError(ERRORS[j.error] || 'Something went wrong. Please try again.');
    } catch { setError('Network error. Please try again.'); }
    setBusy(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-xl space-y-5">
        <div className="text-center"><Link href="/" className="text-sm font-black text-[#1E4733] hover:underline">e bikes for sale</Link></div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          {done ? (
            <div className="space-y-3 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-[#2E6B4D]" aria-hidden="true" />
              <h1 className="text-2xl font-black text-gray-900">Thank you</h1>
              <p className="text-sm text-gray-700">We have received your payment confirmation for order <strong>{id}</strong>. We will check it and email you when your order is released.</p>
              <Link href="/" className="inline-flex min-h-11 items-center rounded-xl bg-[#1E4733] px-5 font-black text-white">Back to the shop</Link>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <h1 className="text-2xl font-black text-gray-900">Confirm your payment</h1>
              <p className="text-sm text-gray-700">Order <strong>{id || '(missing)'}</strong>. Upload a screenshot or photo of your payment receipt (JPG, PNG, WebP or HEIC, up to 4MB).</p>
              <div>
                <label htmlFor="f" className="mb-1 block text-sm font-bold text-gray-800">Receipt *</label>
                <input id="f" type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif" required onChange={(e) => setFile(e.target.files?.[0] || null)} className="block w-full text-sm file:mr-3 file:min-h-11 file:rounded-lg file:border-0 file:bg-[#1E4733] file:px-4 file:font-bold file:text-white" />
              </div>
              <div>
                <label htmlFor="n" className="mb-1 block text-sm font-bold text-gray-800">Note (optional)</label>
                <textarea id="n" rows={3} maxLength={600} value={note} onChange={(e) => setNote(e.target.value)} className="w-full rounded-xl border border-gray-300 p-3 text-sm" placeholder="For example the transaction ID" />
              </div>
              {error && <p role="alert" className="text-sm font-semibold text-red-700">{error}</p>}
              <button type="submit" disabled={busy || !id} className="min-h-11 w-full rounded-xl bg-[#1E4733] px-5 font-black text-white hover:bg-[#2E6B4D] disabled:opacity-50">{busy ? 'Sending…' : 'Send confirmation'}</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ConfirmPaymentPage() {
  return <Suspense fallback={<p className="p-10 text-center text-gray-600">Loading…</p>}><Page /></Suspense>;
}
