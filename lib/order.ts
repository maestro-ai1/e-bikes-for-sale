import { PRODUCTS, COMMON_ADDONS, BUSINESS_INFO } from '@/lib/data';
import { REPLY, SITE, type PaymentMethod } from '@/lib/reply-config';

// ───────────────────────── IDs ─────────────────────────
/** Short, human, collision-resistant. No 0/O/1/I/L so it can be read over the phone. Minted client-side at checkout. */
export function makeOrderNumber(prefix = REPLY.orderPrefix): string {
  const t = Date.now().toString(36).toUpperCase().slice(-4);
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes =
    typeof crypto !== 'undefined' && crypto.getRandomValues
      ? Array.from(crypto.getRandomValues(new Uint8Array(2)))
      : [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
  let r = '';
  for (const b of bytes) r += alphabet[b % alphabet.length];
  return `${prefix}-${t}${r}`;
}
export const ORDER_NUMBER_RE = new RegExp(`^${REPLY.orderPrefix}-[A-Z0-9]{4,8}$`);
export const generateEnquiryId = () => `ENQ-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`.toUpperCase();

// ───────────────────────── Money ─────────────────────────
export function money(n: number): string {
  return new Intl.NumberFormat(REPLY.currency.locale, { style: 'currency', currency: REPLY.currency.code, maximumFractionDigits: n % 1 === 0 ? 0 : 2 }).format(n);
}

// ───────────────────────── Payment details parser ─────────────────────────
const KNOWN_LABELS = [
  'account name', 'account number', 'bsb', 'payid', 'pay id', 'sort code', 'bank name', 'branch code', 'routing number', 'beneficiary name',
  'beneficiary', 'swift code', 'swift', 'bic code', 'bic', 'iban', 'wallet address', 'wallet', 'network', 'memo', 'destination tag', 'tag',
  'paypal email', 'paypal.me', 'paypal', 'payment link', 'reference',
].sort((a, b) => b.length - a.length);
const LABEL_PATTERN = new RegExp(`^(${KNOWN_LABELS.map((l) => l.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\s*[:\\-]?\\s+(.+)$`, 'i');
const titleCase = (s: string) => s.replace(/\S+/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());

export interface DetailField { label: string; value: string }

/**
 * Splits ONE pasted blob of payment details into individually copyable fields.
 *  1. "Label: value"  (any label)  2. a known label word without a colon  3. a bare line becomes "Detail".
 */
export function parsePaymentDetail(text: string): DetailField[] {
  const lines = String(text || '').split('\n').map((l) => l.trim()).filter(Boolean);
  let unlabeled = 0;
  return lines.map((line) => {
    const colonIdx = line.indexOf(':');
    // "https://..." must not be split at the scheme colon
    if (colonIdx > 0 && colonIdx < line.length - 1 && !/^https?:\/\//i.test(line)) {
      return { label: line.slice(0, colonIdx).trim(), value: line.slice(colonIdx + 1).trim() };
    }
    const match = line.match(LABEL_PATTERN);
    if (match) return { label: titleCase(match[1]), value: match[2].trim() };
    unlabeled += 1;
    return { label: unlabeled > 1 ? `Detail ${unlabeled}` : 'Detail', value: line };
  });
}

export const findMethod = (id: string): PaymentMethod | undefined => REPLY.paymentMethods.find((m) => m.id === id);
export function paymentMethodParts(methodId: string, amount: number, ref: string) {
  const m = findMethod(methodId);
  const fill = (s: string) => s.replace('{amount}', money(amount)).replace('{ref}', ref);
  return { opening: fill(m?.opening || 'Please pay {amount} using the details below, with {ref} as the reference.'), closing: fill(m?.closing || '') };
}

/** Standing terms for every payment-details email and WhatsApp message (one source, every renderer). */
export function paymentTermsLines(ref: string): string[] {
  return [
    'This order is confirmed once payment is received. It is not yet final.',
    `Use your order number, ${ref}, as the payment reference.`,
    REPLY.dispatchLine,
  ];
}

// ───────────────────────── Server-side pricing (never trust client totals) ─────────────────────────
export interface OrderItemInput { productId: string; quantity: number; selectedSize?: string; addOnIds?: string[] }
export interface PricedItem { name: string; quantity: number; lineTotal: number; size?: string; addOns?: string[] }

export function priceOrder(items: OrderItemInput[], paymentMethod: string) {
  const priced: PricedItem[] = [];
  let subtotal = 0;
  for (const it of items) {
    const qty = Math.floor(Number(it.quantity));
    if (!qty || qty < 1 || qty > 50) return { ok: false as const, error: 'invalid-quantity' };
    const product = PRODUCTS.find((p) => p.id === it.productId);
    const addon = !product ? COMMON_ADDONS.find((a) => a.id === it.productId) : null;
    if (!product && !addon) return { ok: false as const, error: 'unknown-product' };
    let unit = product ? product.price : addon!.price;
    let size: string | undefined;
    if (product) {
      const v = product.sizeVariants?.find((s) => s.label === it.selectedSize);
      if (v) { unit += v.priceDelta || 0; size = v.label; }
    }
    const addOnNames: string[] = [];
    for (const id of it.addOnIds || []) {
      const a = COMMON_ADDONS.find((x) => x.id === id);
      if (a) { unit += a.price; addOnNames.push(a.name); }
    }
    const lineTotal = unit * qty;
    subtotal += lineTotal;
    priced.push({ name: product ? product.name : addon!.name, quantity: qty, lineTotal, size, addOns: addOnNames.length ? addOnNames : undefined });
  }
  const shipping = subtotal >= BUSINESS_INFO.freeDeliveryThreshold || subtotal === 0 ? 0 : 75;
  const cryptoDiscount = paymentMethod === 'crypto' ? Math.round(subtotal * (BUSINESS_INFO.cryptoDiscountPercentage / 100)) : 0;
  const total = Math.max(0, subtotal - cryptoDiscount + shipping);
  return { ok: true as const, items: priced, subtotal, shipping, cryptoDiscount, total };
}

export const paymentDetailsUrl = (ref: string) => `${SITE.url}/order/payment-details?id=${encodeURIComponent(ref)}`;
export const confirmPaymentUrl = (ref: string) => `${SITE.url}/order/confirm-payment?id=${encodeURIComponent(ref)}`;
