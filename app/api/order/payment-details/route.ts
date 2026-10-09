import { NextResponse } from 'next/server';
import { getOrder } from '@/lib/stores';
import { ORDER_NUMBER_RE, paymentTermsLines } from '@/lib/order';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Public (the order number is the access token). Returns only what the customer's own email already contained. */
export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get('id')?.toUpperCase() || '';
  if (!ORDER_NUMBER_RE.test(id)) return NextResponse.json({ ok: false, error: 'not-found' }, { status: 404 });
  const order = await getOrder(id);
  if (!order || !order.paymentDetails) return NextResponse.json({ ok: false, error: 'not-found' }, { status: 404 });
  return NextResponse.json({
    ok: true,
    orderNumber: order.orderNumber,
    amountDue: order.amountDue,
    status: order.status,
    opening: order.paymentDetails.opening,
    closing: order.paymentDetails.closing,
    fields: order.paymentDetails.fields,
    terms: paymentTermsLines(order.orderNumber),
  });
}
