import { REPLY, SITE } from '@/lib/reply-config';
import { money, paymentMethodParts, paymentTermsLines, paymentDetailsUrl, type DetailField } from '@/lib/order';

/** Normalise to bare international digits (AU: 04xx xxx xxx -> 614xxxxxxxx). */
export function toWhatsAppNumber(phone: string): string {
  let d = String(phone || '').replace(/[^\d]/g, '');
  if (d.startsWith('0') && d.length === 10) d = `61${d.slice(1)}`;
  return d;
}

const WA_HEADER = `*${SITE.name}*`;
const greeting = () => `Hi ${SITE.name},`;
const lines = (body: string | string[]) => (Array.isArray(body) ? body : [body]);

// Customer -> business: always opens with the literal greeting
export function waLink(body: string | string[]): string {
  return `https://wa.me/${toWhatsAppNumber(REPLY.channels.whatsapp)}?text=${encodeURIComponent([greeting(), '', ...lines(body)].join('\n'))}`;
}
// Admin -> a specific customer: opens with the bold shop name
export function waLinkTo(phone: string, body: string | string[]): string {
  return `https://wa.me/${toWhatsAppNumber(phone)}?text=${encodeURIComponent(waMessageText(body))}`;
}
export const waMessageText = (body: string | string[]) => [WA_HEADER, '', ...lines(body)].join('\n');

export function waOrderLink(o: { orderNumber: string; items: { name: string; quantity: number; lineTotal: number }[]; amountDue: number; name: string; phone: string; address: string; paymentMethod: string }) {
  return waLink([
    `New order request ${o.orderNumber}`,
    '',
    ...o.items.map((i) => `- ${i.name} x${i.quantity} (${money(i.lineTotal)})`),
    '',
    `Total: ${money(o.amountDue)}`,
    `Payment: ${o.paymentMethod}`,
    `Name: ${o.name}`,
    `Phone: ${o.phone}`,
    `Delivery: ${o.address}`,
  ]);
}

export const waPaymentConfirmationLink = (ref: string) => waLink(`I have completed payment for order ${ref}.`);

/** Admin -> customer: mirrors the payment-details email using the same parsed fields. */
export function waPaymentDetailsMessage(o: { orderNumber: string; amountDue: number }, d: { methodId: string; fields: DetailField[] }): string[] {
  const { opening, closing } = paymentMethodParts(d.methodId, o.amountDue, o.orderNumber);
  return [
    `Payment details for order ${o.orderNumber}`,
    `Amount due: ${money(o.amountDue)}`,
    '',
    opening,
    '',
    ...d.fields.map((f) => `${f.label}: ${f.value}`),
    '',
    closing,
    '',
    ...paymentTermsLines(o.orderNumber).map((t) => `- ${t}`),
    '',
    `View and copy details: ${paymentDetailsUrl(o.orderNumber)}`,
  ].filter((l, i, a) => !(l === '' && a[i - 1] === ''));
}
