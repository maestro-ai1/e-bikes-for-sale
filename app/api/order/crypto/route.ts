import { NextResponse } from 'next/server';
import { getOrder } from '@/lib/stores';
import { isCryptoOrder, ORDER_NUMBER_RE } from '@/lib/order';
import { cryptoWallets } from '@/lib/crypto-config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Public (the order number is the access token). Only crypto orders get the wallet page; PayID and bank orders are untouched. */
export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get('id')?.toUpperCase() || '';
  if (!ORDER_NUMBER_RE.test(id)) return NextResponse.json({ ok: false, error: 'not-found' }, { status: 404 });
  const order = await getOrder(id);
  if (!order) return NextResponse.json({ ok: false, error: 'not-found' }, { status: 404 });
  if (!isCryptoOrder(order)) return NextResponse.json({ ok: false, error: 'not-crypto' }, { status: 400 });
  return NextResponse.json({
    ok: true,
    orderNumber: order.orderNumber,
    amountDue: order.amountDue,
    subtotal: order.subtotal,
    shipping: order.shipping,
    cryptoDiscount: order.cryptoDiscount,
    status: order.status,
    wallets: cryptoWallets(),
  });
}
