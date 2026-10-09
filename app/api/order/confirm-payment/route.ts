import { NextResponse } from 'next/server';
import { destinations } from '@/lib/reply-config';
import { getOrder, markPaymentConfirmed } from '@/lib/stores';
import { ORDER_NUMBER_RE } from '@/lib/order';
import { sendMail } from '@/lib/mailer';
import { paymentConfirmedEmail } from '@/lib/emailTemplates';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BYTES = 4 * 1024 * 1024;
const TYPES: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/heic': 'heic', 'image/heif': 'heif' };

/** Public: customer uploads proof of payment. Emails the shop with the file attached and marks the order payment-confirmed. */
export async function POST(request: Request) {
  let form: FormData;
  try { form = await request.formData(); } catch { return NextResponse.json({ ok: false, error: 'invalid-form' }, { status: 400 }); }
  const id = String(form.get('id') || '').toUpperCase();
  if (!ORDER_NUMBER_RE.test(id)) return NextResponse.json({ ok: false, error: 'not-found' }, { status: 404 });
  const order = await getOrder(id);
  if (!order) return NextResponse.json({ ok: false, error: 'not-found' }, { status: 404 });

  const file = form.get('file');
  if (!(file instanceof File) || file.size === 0) return NextResponse.json({ ok: false, error: 'no-file' }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ ok: false, error: 'file-too-large' }, { status: 413 });
  const ext = TYPES[file.type];
  if (!ext) return NextResponse.json({ ok: false, error: 'invalid-file-type' }, { status: 415 });

  const note = String(form.get('note') || '').slice(0, 600);
  const buf = Buffer.from(await file.arrayBuffer());
  const mail = paymentConfirmedEmail(order, note || undefined);
  const r = await sendMail({
    to: destinations.order(),
    replyTo: order.customerEmail,
    ...mail,
    attachments: [{ filename: `payment-${order.orderNumber}.${ext}`, content: buf, contentType: file.type }],
  });
  if (!r.sent) return NextResponse.json({ ok: false, error: 'email-failed' }, { status: 502 });
  await markPaymentConfirmed(order.orderNumber);
  return NextResponse.json({ ok: true });
}
