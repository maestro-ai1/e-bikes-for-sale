'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAdmin } from '@/components/admin/AdminProvider';
import { Notice, StatusBadge, when } from '@/components/admin/bits';
import type { StoredEnquiry } from '@/lib/stores';

const FILTERS = ['all', 'contact', 'wholesale', 'new', 'replied'] as const;

export default function EnquiriesPage() {
  const { api } = useAdmin();
  const [items, setItems] = useState<StoredEnquiry[] | null>(null);
  const [storeConfigured, setStoreConfigured] = useState(true);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('all');

  const load = () => api<{ enquiries: StoredEnquiry[]; storeConfigured: boolean }>('/api/admin/enquiries').then((r) => { setItems(r.data.enquiries || []); setStoreConfigured(r.data.storeConfigured !== false); });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { load(); }, []);

  const shown = (items || []).filter((e) => filter === 'all' || e.type === filter || e.status === filter);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-black">Enquiries</h1>
      {!storeConfigured && <Notice>The database is not connected yet, so enquiries are only emailed to you. Connect Upstash Redis in Vercel.</Notice>}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter enquiries">
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)} aria-pressed={filter === f} className={`min-h-11 rounded-full px-4 text-sm font-bold capitalize ${filter === f ? 'bg-[#2E6B4D] text-white' : 'border border-white/15 text-gray-300 hover:bg-white/10'}`}>{f}</button>
        ))}
      </div>
      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-wider text-gray-400"><tr><th className="p-3">From</th><th className="p-3">Type</th><th className="p-3">Message</th><th className="p-3">Status</th><th className="p-3">Received</th></tr></thead>
          <tbody>
            {shown.map((e) => (
              <tr key={e.id} className="border-t border-white/5 hover:bg-white/5">
                <td className="p-3 font-bold"><Link className="inline-block py-2 text-emerald-300 hover:underline" href={`/admin/enquiries/${encodeURIComponent(e.id)}`}>{e.name}</Link><div className="text-xs font-normal text-gray-400">{e.email}</div></td>
                <td className="p-3 capitalize">{e.type}</td>
                <td className="max-w-xs truncate p-3 text-gray-300">{e.message}</td>
                <td className="p-3"><StatusBadge status={e.status} /></td>
                <td className="p-3 whitespace-nowrap text-gray-400">{when(e.createdAt)}</td>
              </tr>
            ))}
            {items && shown.length === 0 && <tr><td colSpan={5} className="p-6 text-center text-gray-400">No enquiries.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
