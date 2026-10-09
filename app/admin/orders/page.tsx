'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAdmin } from '@/components/admin/AdminProvider';
import { Notice, StatusBadge, money, when } from '@/components/admin/bits';
import type { StoredOrder } from '@/lib/stores';

export default function OrdersPage() {
  const { api } = useAdmin();
  const [orders, setOrders] = useState<StoredOrder[] | null>(null);
  const [storeConfigured, setStoreConfigured] = useState(true);

  const load = () => api<{ orders: StoredOrder[]; storeConfigured: boolean }>('/api/admin/orders').then((r) => { setOrders(r.data.orders || []); setStoreConfigured(r.data.storeConfigured !== false); });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-black">Orders</h1>
        {orders && orders.length > 0 && (
          <button onClick={async () => { if (confirm('Delete ALL orders? This cannot be undone.')) { await api('/api/admin/orders', { method: 'DELETE' }); load(); } }} className="min-h-11 rounded-lg border border-red-500/40 px-4 text-sm font-bold text-red-300 hover:bg-red-500/10">Delete all</button>
        )}
      </div>
      {!storeConfigured && <Notice>The order database is not connected yet, so orders are not stored here. Connect Upstash Redis in Vercel.</Notice>}
      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-wider text-gray-400"><tr><th className="p-3">Order</th><th className="p-3">Customer</th><th className="p-3">Total</th><th className="p-3">Status</th><th className="p-3">Channel</th><th className="p-3">Placed</th><th className="p-3"><span className="sr-only">Delete</span></th></tr></thead>
          <tbody>
            {orders?.map((o) => (
              <tr key={o.orderNumber} className="border-t border-white/5 hover:bg-white/5">
                <td className="p-3 font-bold"><Link className="inline-block py-2 text-emerald-300 hover:underline" href={`/admin/orders/${encodeURIComponent(o.orderNumber)}`}>{o.orderNumber}</Link></td>
                <td className="p-3">{o.customerName}<div className="text-xs text-gray-400">{o.customerEmail}</div></td>
                <td className="p-3">{money(o.amountDue)}</td>
                <td className="p-3"><StatusBadge status={o.status} /></td>
                <td className="p-3 capitalize">{o.channel}</td>
                <td className="p-3 whitespace-nowrap text-gray-400">{when(o.createdAt)}</td>
                <td className="p-3"><button onClick={async () => { if (confirm(`Delete order ${o.orderNumber}?`)) { await api(`/api/admin/orders/${encodeURIComponent(o.orderNumber)}`, { method: 'DELETE' }); load(); } }} className="min-h-11 px-2 text-xs text-red-300 hover:underline">Delete</button></td>
              </tr>
            ))}
            {orders && orders.length === 0 && <tr><td colSpan={7} className="p-6 text-center text-gray-400">No orders yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
