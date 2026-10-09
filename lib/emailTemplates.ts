import { REPLY, SITE } from '@/lib/reply-config';
import { confirmPaymentUrl, money, paymentDetailsUrl, paymentMethodParts, paymentTermsLines, type DetailField } from '@/lib/order';
import type { StoredEnquiry, StoredOrder } from '@/lib/stores';

// LIGHT-theme emails only: white card, dark brand header band, near-black text, brand colour as accent.
// (Dark-background emails are force-inverted by Zoho and Gmail dark mode.)
const INK = '#1B2320', SOFT = '#6A746E', FAINT = '#9AA39D', RULE = '#E2E5DF', PAGE = '#F2F4F0';
const ACCENT = REPLY.brand.primary, HEADER = REPLY.brand.headerDark;

export const esc = (s: unknown) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const label = (t: string) => `<div style="font-size:10px;letter-spacing:.08em;text-transform:uppercase;font-weight:700;color:${SOFT};margin:0 0 3px">${esc(t)}</div>`;
const field = (l: string, valueHtml: string, mb = 14) => `<div style="margin:0 0 ${mb}px">${label(l)}<div style="font-size:14px;line-height:1.5;color:${INK}">${valueHtml}</div></div>`;
const divider = `<div style="border-top:1px solid ${RULE};margin:6px 0 18px"></div>`;
const callout = (inner: string) => `<div style="background:#F6F9F7;border-left:3px solid ${ACCENT};padding:14px 16px;border-radius:4px;font-size:13px;line-height:1.6;color:${INK}">${inner}</div>`;
const button = (href: string, text: string, primary = true) =>
  `<a href="${esc(href)}" style="display:inline-block;margin:0 8px 8px 0;padding:12px 20px;border-radius:999px;font-size:13px;font-weight:700;text-decoration:none;${primary ? `background:${HEADER};color:#FFFFFF` : `background:#FFFFFF;color:${HEADER};border:1px solid ${RULE}`}">${esc(text)} &rarr;</a>`;

function shell(o: { eyebrow: string; title: string; meta?: string; body: string }) {
  return `<!doctype html><html><body style="margin:0;padding:0;background:${PAGE}"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAGE};padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#FFFFFF;border-radius:12px;overflow:hidden;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
<tr><td style="background:${HEADER};padding:24px 28px"><div style="font-size:11px;letter-spacing:.1em;text-transform:uppercase;font-weight:700;color:#7EE0B0">${esc(o.eyebrow)}</div><div style="font-size:22px;font-weight:700;color:#FFFFFF;margin-top:6px">${esc(o.title)}</div>${o.meta ? `<div style="font-size:12px;color:#A9B4AE;margin-top:6px">${esc(o.meta)}</div>` : ''}</td></tr>
<tr><td style="height:3px;background:${ACCENT};line-height:3px;font-size:0">&nbsp;</td></tr>
<tr><td style="padding:24px 28px 8px">${o.body}</td></tr>
<tr><td style="padding:16px 28px 22px;border-top:1px solid ${RULE};font-size:11px;color:${FAINT}">${esc(SITE.name)} &middot; ${esc(SITE.domain)}<br>${esc(REPLY.headerTagline)}</td></tr>
</table></td></tr></table></body></html>`;
}

const itemsTable = (items: StoredOrder['items']) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;color:${INK};border-collapse:collapse">${items
    .map(
      (i) =>
        `<tr><td style="padding:8px 0;border-bottom:1px solid ${RULE}">${esc(i.name)}${i.size ? `<div style="font-size:11px;color:${SOFT}">${esc(i.size)}</div>` : ''}${i.addOns?.length ? `<div style="font-size:11px;color:${SOFT}">+ ${esc(i.addOns.join(', '))}</div>` : ''}</td><td style="padding:8px 8px;border-bottom:1px solid ${RULE};text-align:center;color:${SOFT}">x${i.quantity}</td><td style="padding:8px 0;border-bottom:1px solid ${RULE};text-align:right;font-weight:600">${money(i.lineTotal)}</td></tr>`,
    )
    .join('')}</table>`;

const totals = (o: StoredOrder) =>
  `<div style="font-size:13px;color:${INK};margin-top:10px"><div style="display:flex;justify-content:space-between">Subtotal <span style="float:right">${money(o.subtotal)}</span></div>${o.cryptoDiscount ? `<div>Crypto discount <span style="float:right">-${money(o.cryptoDiscount)}</span></div>` : ''}<div>Delivery <span style="float:right">${o.shipping ? money(o.shipping) : 'Free'}</span></div><div style="font-size:16px;font-weight:700;margin-top:6px;padding-top:8px;border-top:1px solid ${RULE}">Total <span style="float:right">${money(o.amountDue)}</span></div></div>`;

const textTotals = (o: StoredOrder) => `Subtotal ${money(o.subtotal)}${o.cryptoDiscount ? `\nCrypto discount -${money(o.cryptoDiscount)}` : ''}\nDelivery ${o.shipping ? money(o.shipping) : 'Free'}\nTOTAL ${money(o.amountDue)}`;
const textItems = (o: StoredOrder) => o.items.map((i) => `- ${i.name} x${i.quantity}  ${money(i.lineTotal)}`).join('\n');

/** To the CUSTOMER on any checkout (email or WhatsApp). Never contains payment details. */
export function orderConfirmationEmail(o: StoredOrder) {
  const body = `<p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:${INK}">Hi ${esc(o.customerName.split(' ')[0] || 'there')}, thanks for your order. We have received it and our team is preparing it now.</p>
${field('Order number', `<strong style="font-size:16px">${esc(o.orderNumber)}</strong>`)}
${itemsTable(o.items)}${totals(o)}
<div style="height:16px"></div>${callout(`<strong>What happens next</strong><br>Watch for a follow-up email from us with the payment details for this order. Your order is confirmed once payment is received.`)}
<div style="height:14px"></div>${field('Delivery address', esc(o.address || '') || '&mdash;')}
<p style="margin:0 0 18px;font-size:13px;color:${SOFT}">Questions? Just reply to this email or message us on WhatsApp ${esc(REPLY.channels.whatsapp)}.</p>`;
  return {
    subject: `We've received your order ${o.orderNumber}`,
    text: `Hi ${o.customerName}, thanks for your order ${o.orderNumber}.\n\n${textItems(o)}\n${textTotals(o)}\n\nWatch for a follow-up email with payment details. Your order is confirmed once payment is received.\n\n${SITE.name}`,
    html: shell({ eyebrow: 'Order received', title: `Thanks, ${o.customerName.split(' ')[0] || 'there'}`, meta: `Order ${o.orderNumber}`, body }),
  };
}

/** To the SHOP when an order arrives. */
export function orderNotificationEmail(o: StoredOrder) {
  const adminUrl = `${SITE.url}/admin/orders/${encodeURIComponent(o.orderNumber)}`;
  const body = `${field('Customer', `${esc(o.customerName)}<br><a href="mailto:${esc(o.customerEmail)}" style="color:${ACCENT}">${esc(o.customerEmail)}</a><br>${esc(o.customerPhone)}`)}
${field('Delivery address', esc(o.address || '—'))}${field('Payment method', esc(o.paymentMethod))}${field('Channel', esc(o.channel))}${o.notes ? field('Notes', esc(o.notes)) : ''}
${itemsTable(o.items)}${totals(o)}<div style="height:18px"></div>${button(adminUrl, 'Reply in Dashboard')}`;
  return {
    subject: `New order ${o.orderNumber} - ${money(o.amountDue)} (${o.channel})`,
    text: `New order ${o.orderNumber}\n${o.customerName} <${o.customerEmail}> ${o.customerPhone}\n${o.address || ''}\nPayment: ${o.paymentMethod}\nChannel: ${o.channel}\n\n${textItems(o)}\n${textTotals(o)}\n\nDashboard: ${adminUrl}`,
    html: shell({ eyebrow: 'New order', title: `${money(o.amountDue)} from ${o.customerName}`, meta: `Order ${o.orderNumber}`, body }),
  };
}

/** To the SHOP for contact / wholesale submissions. */
export function enquiryNotificationEmail(e: StoredEnquiry) {
  const adminUrl = `${SITE.url}/admin/enquiries/${encodeURIComponent(e.id)}`;
  const meta = Object.entries(e.meta || {}).filter(([, v]) => v);
  const body = `${field('From', `${esc(e.name)}<br><a href="mailto:${esc(e.email)}" style="color:${ACCENT}">${esc(e.email)}</a>${e.phone ? `<br>${esc(e.phone)}` : ''}`)}
${meta.map(([k, v]) => field(k, esc(v), 10)).join('')}${field('Message', esc(e.message).replace(/\n/g, '<br>'))}${button(adminUrl, 'Reply in Dashboard')}`;
  return {
    subject: `${e.type === 'wholesale' ? 'Wholesale enquiry' : 'Contact enquiry'} from ${e.name}`,
    text: `${e.type} enquiry from ${e.name} <${e.email}> ${e.phone || ''}\n${meta.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${e.message}\n\nDashboard: ${adminUrl}`,
    html: shell({ eyebrow: e.type === 'wholesale' ? 'Wholesale enquiry' : 'Contact enquiry', title: e.name, meta: e.id, body }),
  };
}

/** To the CUSTOMER from the admin: payment details for an order. */
export function paymentDetailsEmail(o: StoredOrder, d: { methodId: string; fields: DetailField[] }) {
  const { opening, closing } = paymentMethodParts(d.methodId, o.amountDue, o.orderNumber);
  const terms = paymentTermsLines(o.orderNumber);
  const mono = `font-family:SFMono-Regular,Menlo,Consolas,monospace;font-size:13px;background:#F6F9F7;padding:8px 10px;border-radius:6px;display:inline-block;word-break:break-all`;
  const body = `${field('Order', `<strong>${esc(o.orderNumber)}</strong>`, 10)}${field('Amount due', `<span style="font-size:22px;font-weight:700;color:${ACCENT}">${money(o.amountDue)}</span>`, 16)}${divider}
<p style="margin:0 0 14px;font-size:14px;line-height:1.6;color:${INK}">${esc(opening)}</p>
${d.fields.map((f) => field(f.label, `<span style="${mono}">${esc(f.value)}</span>`, 10)).join('')}
${closing ? `<p style="margin:12px 0 16px;font-size:14px;line-height:1.6;color:${INK}">${esc(closing)}</p>` : ''}
${button(paymentDetailsUrl(o.orderNumber), 'View & copy payment details')}
${callout(`<ul style="margin:0;padding-left:18px">${terms.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`)}
<div style="height:16px"></div>${button(confirmPaymentUrl(o.orderNumber), "I've paid: upload confirmation")}${button(`mailto:${REPLY.channels.email}?subject=${encodeURIComponent('Order ' + o.orderNumber)}`, 'Reply to us', false)}`;
  return {
    subject: `Payment details for order ${o.orderNumber} - ${money(o.amountDue)} due`,
    text: `Hi ${o.customerName},\n\nOrder ${o.orderNumber}\nAmount due: ${money(o.amountDue)}\n\n${opening}\n\n${d.fields.map((f) => `${f.label}: ${f.value}`).join('\n')}\n\n${closing}\n\n${terms.map((t) => `- ${t}`).join('\n')}\n\nView and copy details: ${paymentDetailsUrl(o.orderNumber)}\nUpload confirmation: ${confirmPaymentUrl(o.orderNumber)}\n\n${SITE.name}`,
    html: shell({ eyebrow: 'Payment details', title: `Order ${o.orderNumber}`, meta: `${money(o.amountDue)} due`, body }),
  };
}

/** To the CUSTOMER from the admin: a reply to an enquiry. */
export function enquiryReplyEmail(e: StoredEnquiry, reply: string) {
  const body = `<p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:${INK};white-space:pre-line">${esc(reply)}</p>${divider}${field('Your message', `<span style="color:${SOFT}">${esc(e.message).replace(/\n/g, '<br>')}</span>`)}`;
  return {
    subject: `Re: your ${e.type === 'wholesale' ? 'wholesale' : ''} enquiry to ${SITE.name}`.replace('  ', ' '),
    text: `${reply}\n\n--- Your message ---\n${e.message}\n\n${SITE.name}`,
    html: shell({ eyebrow: 'Reply', title: `Hi ${e.name.split(' ')[0] || 'there'}`, body }),
  };
}

/** To the SHOP when a customer uploads proof of payment. */
export function paymentConfirmedEmail(o: StoredOrder, note?: string) {
  const adminUrl = `${SITE.url}/admin/orders/${encodeURIComponent(o.orderNumber)}`;
  const body = `${field('Order', `<strong>${esc(o.orderNumber)}</strong> &middot; ${money(o.amountDue)}`)}${field('Customer', `${esc(o.customerName)}<br>${esc(o.customerEmail)}`)}${note ? field('Customer note', esc(note)) : ''}<p style="font-size:13px;color:${SOFT}">The receipt is attached. Check your account, then dispatch the order.</p>${button(adminUrl, 'Open order')}`;
  return {
    subject: `Payment confirmation uploaded for ${o.orderNumber}`,
    text: `${o.customerName} uploaded a payment confirmation for ${o.orderNumber} (${money(o.amountDue)}). ${note ? 'Note: ' + note : ''}\n${adminUrl}`,
    html: shell({ eyebrow: 'Payment confirmation', title: o.orderNumber, meta: o.customerName, body }),
  };
}
