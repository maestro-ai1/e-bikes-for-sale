'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAdmin } from '@/components/admin/AdminProvider';
import { Card, Notice, StatusBadge, money, when } from '@/components/admin/bits';
import type { StoredOrder } from '@/lib/stores';

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const { api } = useAdmin();
  const [order, setOrder] = useState<StoredOrder | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    api<{ order: StoredOrder }>(`/api/admin/orders/${id}`).then((r) => (r.status === 404 ? setMissing(true) : setOrder(r.data.order)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (missing) return <Notice tone="err">Order not found. <Link href="/admin/orders" className="underline">Back to orders</Link></Notice>;
  if (!order) return <p className="text-gray-400">Loading…</p>;

  return (
    <div className="space-y-5">
      <Link href="/admin/orders" className="inline-block py-2 text-sm text-emerald-300 hover:underline">← All orders</Link>
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-black">{order.orderNumber}</h1>
        <StatusBadge status={order.status} />
        <span className="text-sm text-gray-400">via {order.channel} · {when(order.createdAt)}</span>
      </div>
      {order.status === 'payment-confirmed' && <Notice tone="ok">The customer uploaded a payment confirmation{order.paymentConfirmedAt ? ` on ${when(order.paymentConfirmedAt)}` : ''}. Check the receipt in your email, then dispatch.</Notice>}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Customer">
          <p className="font-bold">{order.customerName}</p>
          <p><a className="text-emerald-300 hover:underline" href={`mailto:${order.customerEmail}`}>{order.customerEmail}</a></p>
          <p>{order.customerPhone}</p>
          <p className="mt-2 text-gray-300">{order.address}</p>
          {order.notes && <p className="mt-2 rounded-lg bg-white/5 p-2 text-sm text-gray-300">Notes: {order.notes}</p>}
        </Card>
        <Card title="Payment">
          <p>Method: <strong>{order.paymentMethod}</strong></p>
          <p className="text-3xl font-black text-emerald-300">{money(order.amountDue)}</p>
          {order.paymentDetails && <p className="text-sm text-gray-400">Details sent {when(order.paymentDetails.sentAt)}</p>}
          <Link href={`/admin/send-payment-email?id=${encodeURIComponent(order.orderNumber)}`} className="mt-3 inline-flex min-h-11 items-center rounded-xl bg-[#2E6B4D] px-5 font-black text-white hover:bg-[#256041]">
            {order.paymentDetails ? 'Resend payment details' : 'Send payment details'}
          </Link>
        </Card>
      </div>
      <Card title="Items">
        <table className="w-full text-sm">
          <tbody>
            {order.items.map((i, k) => (
              <tr key={k} className="border-b border-white/5 last:border-0"><td className="py-2">{i.name}{i.size ? <span className="text-xs text-gray-400"> · {i.size}</span> : null}{i.addOns?.length ? <div className="text-xs text-gray-400">+ {i.addOns.join(', ')}</div> : null}</td><td className="py-2 text-center text-gray-400">x{i.quantity}</td><td className="py-2 text-right">{money(i.lineTotal)}</td></tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3 space-y-1 border-t border-white/10 pt-3 text-sm text-gray-300">
          <div className="flex justify-between"><span>Subtotal</span><span>{money(order.subtotal)}</span></div>
          {order.cryptoDiscount > 0 && <div className="flex justify-between"><span>Crypto discount</span><span>-{money(order.cryptoDiscount)}</span></div>}
          <div className="flex justify-between"><span>Delivery</span><span>{order.shipping ? money(order.shipping) : 'Free'}</span></div>
          <div className="flex justify-between text-base font-black text-white"><span>Total</span><span>{money(order.amountDue)}</span></div>
        </div>
      </Card>
    </div>
  );
}
