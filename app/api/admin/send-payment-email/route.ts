import { NextResponse } from 'next/server';
import { checkAdminPasscode } from '@/lib/adminAuth';
import { getOrder, markOrderSent } from '@/lib/stores';
import { findMethod, parsePaymentDetail } from '@/lib/order';
import { sendMail } from '@/lib/mailer';
import { paymentDetailsEmail } from '@/lib/emailTemplates';
import { waLinkTo, waPaymentDetailsMessage } from '@/lib/whatsapp';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Admin: send the payment details for an order (email to the customer + status -> payment-sent). */
export async function POST(request: Request) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;

  let body: { orderNumber?: string; methodId?: string; detail?: string; sendEmail?: boolean };
  try { body = await request.json(); } catch { return NextResponse.json({ ok: false, error: 'invalid-json' }, { status: 400 }); }

  const order = await getOrder(String(body.orderNumber || ''));
  if (!order) return NextResponse.json({ ok: false, error: 'order-not-found' }, { status: 404 });
  const method = findMethod(String(body.methodId || ''));
  if (!method) return NextResponse.json({ ok: false, error: 'invalid-method' }, { status: 400 });
  const fields = parsePaymentDetail(String(body.detail || ''));
  if (!fields.length) return NextResponse.json({ ok: false, error: 'no-details' }, { status: 400 });

  const mail = paymentDetailsEmail(order, { methodId: method.id, fields });
  let emailed = false;
  let reason: string | undefined;
  if (body.sendEmail !== false) {
    const r = await sendMail({ to: order.customerEmail, replyTo: process.env.ORDER_EMAIL || undefined, ...mail });
    emailed = r.sent;
    reason = r.reason;
    if (!r.sent) return NextResponse.json({ ok: false, error: 'email-failed', reason }, { status: 502 }); // do not mark as sent if the email did not go
  }

  const details = { methodId: method.id, fields, opening: '', closing: '', sentAt: new Date().toISOString() };
  const { paymentMethodParts } = await import('@/lib/order');
  const parts = paymentMethodParts(method.id, order.amountDue, order.orderNumber);
  details.opening = parts.opening;
  details.closing = parts.closing;
  await markOrderSent(order.orderNumber, details);

  const waText = waPaymentDetailsMessage(order, { methodId: method.id, fields });
  return NextResponse.json({ ok: true, emailed, fields, whatsappLink: waLinkTo(order.customerPhone, waText), whatsappText: waText.join('\n') });
}
