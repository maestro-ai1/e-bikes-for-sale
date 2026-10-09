'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAdmin } from '@/components/admin/AdminProvider';
import { Card, Notice, StatusBadge, money, when } from '@/components/admin/bits';
import type { StoredEnquiry, StoredOrder } from '@/lib/stores';

export default function AdminHub() {
  const { api } = useAdmin();
  const [orders, setOrders] = useState<StoredOrder[] | null>(null);
  const [enquiries, setEnquiries] = useState<StoredEnquiry[] | null>(null);
  const [storeConfigured, setStoreConfigured] = useState(true);

  useEffect(() => {
    Promise.all([api<{ orders: StoredOrder[]; storeConfigured: boolean }>('/api/admin/orders'), api<{ enquiries: StoredEnquiry[] }>('/api/admin/enquiries')]).then(([o, e]) => {
      setOrders(o.data.orders || []);
      setEnquiries(e.data.enquiries || []);
      setStoreConfigured(o.data.storeConfigured !== false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pending = orders?.filter((o) => o.status === 'pending').length ?? 0;
  const newEnq = enquiries?.filter((e) => e.status === 'new').length ?? 0;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black">Dashboard</h1>
      {!storeConfigured && <Notice>The order database is not connected yet. Orders and enquiries are still emailed to you, but they will not appear here. Connect Upstash Redis in Vercel (Storage tab) and redeploy.</Notice>}
      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/admin/orders" className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-emerald-500/50">
          <div className="text-xs font-black uppercase tracking-wider text-gray-400">Orders</div>
          <div className="mt-1 text-4xl font-black">{orders?.length ?? '–'}</div>
          <div className="text-sm text-amber-300">{pending} pending</div>
        </Link>
        <Link href="/admin/enquiries" className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-emerald-500/50">
          <div className="text-xs font-black uppercase tracking-wider text-gray-400">Enquiries</div>
          <div className="mt-1 text-4xl font-black">{enquiries?.length ?? '–'}</div>
          <div className="text-sm text-amber-300">{newEnq} new</div>
        </Link>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Recent orders">
          {orders?.slice(0, 5).map((o) => (
            <Link key={o.orderNumber} href={`/admin/orders/${encodeURIComponent(o.orderNumber)}`} className="flex min-h-11 items-center justify-between gap-3 border-b border-white/5 py-2 text-sm last:border-0 hover:text-emerald-300">
              <span><strong>{o.orderNumber}</strong> · {o.customerName}<br /><span className="text-xs text-gray-400">{when(o.createdAt)} · {money(o.amountDue)}</span></span>
              <StatusBadge status={o.status} />
            </Link>
          ))}
          {orders && orders.length === 0 && <p className="text-sm text-gray-400">No orders yet.</p>}
        </Card>
        <Card title="Recent enquiries">
          {enquiries?.slice(0, 5).map((e) => (
            <Link key={e.id} href={`/admin/enquiries/${encodeURIComponent(e.id)}`} className="flex min-h-11 items-center justify-between gap-3 border-b border-white/5 py-2 text-sm last:border-0 hover:text-emerald-300">
              <span><strong>{e.name}</strong> · {e.type}<br /><span className="text-xs text-gray-400">{when(e.createdAt)}</span></span>
              <StatusBadge status={e.status} />
            </Link>
          ))}
          {enquiries && enquiries.length === 0 && <p className="text-sm text-gray-400">No enquiries yet.</p>}
        </Card>
      </div>
    </div>
  );
}
