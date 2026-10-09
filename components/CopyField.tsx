'use client';

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

/** One payment-detail row with a real tap-to-copy button (email clients cannot do this, so the email links here). */
export default function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const t = document.createElement('textarea');
      t.value = value; document.body.appendChild(t); t.select();
      try { document.execCommand('copy'); } catch { /* ignore */ }
      document.body.removeChild(t);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
      <div className="min-w-0">
        <div className="text-[10px] font-bold uppercase tracking-wider text-gray-600">{label}</div>
        <div className="break-all font-mono text-sm text-gray-900">{value}</div>
      </div>
      <button type="button" onClick={copy} aria-label={`Copy ${label}`} className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-lg bg-[#1E4733] px-3 text-xs font-bold text-white hover:bg-[#2E6B4D]">
        {copied ? <><Check className="h-4 w-4" aria-hidden="true" /> Copied</> : <><Copy className="h-4 w-4" aria-hidden="true" /> Copy</>}
      </button>
    </div>
  );
}
