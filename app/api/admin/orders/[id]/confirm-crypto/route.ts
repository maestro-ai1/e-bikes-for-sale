import { NextResponse } from 'next/server';
import { checkAdminPasscode } from '@/lib/adminAuth';
import { getOrder, markPaymentConfirmed } from '@/lib/stores';
import { isCryptoOrder } from '@/lib/order';
import { destinations } from '@/lib/reply-config';
import { sendMail } from '@/lib/mailer';
import { cryptoPaymentReceivedEmail } from '@/lib/emailTemplates';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string }> };

/** Admin: "Payment received". The owner has checked the wallet; mark the order confirmed and email the customer. */
export async function POST(request: Request, { params }: Ctx) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  const { id } = await params;
  const order = await getOrder(decodeURIComponent(id));
  if (!order) return NextResponse.json({ ok: false, error: 'not-found' }, { status: 404 });
  if (!isCryptoOrder(order)) return NextResponse.json({ ok: false, error: 'not-crypto' }, { status: 400 });

  const r = await sendMail({ to: order.customerEmail, replyTo: destinations.order(), ...cryptoPaymentReceivedEmail(order) });
  if (!r.sent) return NextResponse.json({ ok: false, error: 'email-failed', reason: r.reason }, { status: 502 }); // do not confirm if the customer was not told
  await markPaymentConfirmed(order.orderNumber);
  return NextResponse.json({ ok: true });
}
