import { NextResponse } from 'next/server';
import { BUSINESS_INFO } from '@/lib/data';
import { destinations, REPLY } from '@/lib/reply-config';
import { generateEnquiryId, ORDER_NUMBER_RE, priceOrder, type OrderItemInput } from '@/lib/order';
import { getOrder, isStoreConfigured, saveEnquiry, saveOrder, type StoredEnquiry, type StoredOrder } from '@/lib/stores';
import { isMailerConfigured, sendMail } from '@/lib/mailer';
import { enquiryNotificationEmail, orderConfirmationEmail, orderNotificationEmail } from '@/lib/emailTemplates';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clean = (v: unknown, max = 500) => String(v ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max);
const fail = (error: string, status = 400) => NextResponse.json({ ok: false, error }, { status });

/**
 * ONE handler for orders, contact and wholesale (by formName).
 * Orders: validated, re-priced on the server, saved (best effort), emailed to the shop AND confirmed to the customer,
 * on either checkout channel. Success is only reported if the order was stored or the shop was emailed.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 60_000) return fail('payload-too-large', 413);
    body = JSON.parse(raw);
  } catch {
    return fail('invalid-json');
  }

  // honeypot: bots fill this hidden field; pretend success without doing anything
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const formName = clean(body.formName, 20);

  // ───────────────────────── ORDER ─────────────────────────
  if (formName === 'order') {
    const orderNumber = clean(body.orderNumber, 20).toUpperCase();
    const name = clean(body.customerName, 120);
    const email = clean(body.customerEmail, 160).toLowerCase();
    const phone = clean(body.customerPhone, 40);
    const address = [clean(body.address, 200), clean(body.state, 10), clean(body.postcode, 8)].filter(Boolean).join(', ');
    const paymentMethodId = clean(body.paymentMethod, 20);
    const channel = body.channel === 'whatsapp' ? 'whatsapp' : 'email';
    const notes = clean(body.notes, 600);

    if (!ORDER_NUMBER_RE.test(orderNumber)) return fail('invalid-order-number');
    if (name.length < 2) return fail('invalid-name');
    if (!EMAIL_RE.test(email)) return fail('invalid-email');
    if (phone.replace(/\D/g, '').length < 8) return fail('invalid-phone');
    if (!clean(body.address, 200) || !/^\d{4}$/.test(clean(body.postcode, 8))) return fail('invalid-address');
    const method = REPLY.paymentMethods.find((m) => m.id === paymentMethodId);
    if (!method) return fail('invalid-payment-method');
    if (!Array.isArray(body.items) || body.items.length === 0 || body.items.length > 40) return fail('empty-cart');

    const items: OrderItemInput[] = (body.items as Record<string, unknown>[]).map((i) => ({
      productId: clean(i.productId, 80),
      quantity: Number(i.quantity),
      selectedSize: clean(i.selectedSize, 80) || undefined,
      addOnIds: Array.isArray(i.addOnIds) ? (i.addOnIds as unknown[]).map((a) => clean(a, 80)).slice(0, 10) : [],
    }));
    const priced = priceOrder(items, method.id);
    if (!priced.ok) return fail(priced.error);
    if (priced.subtotal < BUSINESS_INFO.minOrder) return fail('below-minimum-order');

    // idempotent: a retry with the same number returns the existing order and does NOT email again
    const existing = isStoreConfigured() ? await getOrder(orderNumber).catch(() => null) : null;
    if (existing) return NextResponse.json({ ok: true, orderNumber, amountDue: existing.amountDue, duplicate: true });

    const order: StoredOrder = {
      orderNumber,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      address,
      items: priced.items,
      subtotal: priced.subtotal,
      shipping: priced.shipping,
      cryptoDiscount: priced.cryptoDiscount,
      amountDue: priced.total,
      paymentMethod: method.label,
      notes: notes || undefined,
      status: 'pending',
      channel,
      createdAt: new Date().toISOString(),
    };

    let stored = false;
    if (isStoreConfigured()) {
      try { await saveOrder(order); stored = true; } catch (e) { console.error('[order] store failed'); }
    }

    // shop notification and customer confirmation: always both, on EITHER channel
    const shopMail = orderNotificationEmail(order);
    const custMail = orderConfirmationEmail(order);
    const [shop, customer] = await Promise.all([
      sendMail({ to: destinations.order(), replyTo: email, ...shopMail }),
      sendMail({ to: email, replyTo: destinations.order(), ...custMail }),
    ]);

    if (!stored && !shop.sent) {
      // nothing reached the business: do NOT report success, let the UI fall back to WhatsApp / phone
      console.error('[order] not delivered:', shop.reason, isMailerConfigured() ? '' : '(mailer not configured)');
      return fail('service-unavailable', 503);
    }
    return NextResponse.json({ ok: true, orderNumber, amountDue: order.amountDue, stored, emailed: { shop: shop.sent, customer: customer.sent } });
  }

  // ───────────────────────── CONTACT / WHOLESALE ─────────────────────────
  if (formName === 'contact' || formName === 'wholesale') {
    const name = clean(formName === 'wholesale' ? body.contactName : body.name, 120);
    const email = clean(body.email, 160).toLowerCase();
    const message = clean(body.message, 4000);
    if (name.length < 2) return fail('invalid-name');
    if (!EMAIL_RE.test(email)) return fail('invalid-email');
    if (message.length < 3) return fail('invalid-message');

    const metaIn = (body.meta && typeof body.meta === 'object' ? body.meta : {}) as Record<string, unknown>;
    const meta: Record<string, string> = {};
    for (const [k, v] of Object.entries(metaIn).slice(0, 12)) if (clean(v)) meta[clean(k, 40)] = clean(v, 300);

    const enquiry: StoredEnquiry = {
      id: generateEnquiryId(),
      type: formName,
      name,
      email,
      phone: clean(body.phone, 40) || undefined,
      message,
      meta: Object.keys(meta).length ? meta : undefined,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    let stored = false;
    if (isStoreConfigured()) {
      try { await saveEnquiry(enquiry); stored = true; } catch { console.error('[enquiry] store failed'); }
    }
    const dest = formName === 'wholesale' ? destinations.wholesale() : destinations.contact();
    const shop = await sendMail({ to: dest, replyTo: email, ...enquiryNotificationEmail(enquiry) });
    if (!stored && !shop.sent) return fail('service-unavailable', 503);
    return NextResponse.json({ ok: true, id: enquiry.id, stored, emailed: shop.sent });
  }

  return fail('unknown-form');
}
