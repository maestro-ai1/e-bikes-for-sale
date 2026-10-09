import { hclear, hdel, hget, hgetall, hset, isStoreConfigured } from '@/lib/redis';
import { REPLY } from '@/lib/reply-config';

export { isStoreConfigured };

// One Redis hash per type; the prefix namespaces several sites sharing one database.
const ORDERS = `${REPLY.orderPrefix.toLowerCase()}:orders`;
const ENQUIRIES = `${REPLY.orderPrefix.toLowerCase()}:enquiries`;

export type OrderStatus = 'pending' | 'payment-sent' | 'payment-confirmed';
export interface StoredOrder {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address?: string;
  items: { name: string; quantity: number; lineTotal: number; size?: string; addOns?: string[] }[];
  subtotal: number;
  shipping: number;
  cryptoDiscount: number;
  amountDue: number;
  paymentMethod: string;
  notes?: string;
  status: OrderStatus;
  channel: 'whatsapp' | 'email';
  createdAt: string;
  paymentDetails?: { methodId: string; fields: { label: string; value: string }[]; opening: string; closing: string; sentAt: string };
  paymentConfirmedAt?: string;
}

export interface StoredEnquiry {
  id: string;
  type: 'contact' | 'wholesale';
  name: string;
  email: string;
  phone?: string;
  message: string;
  meta?: Record<string, string>;
  status: 'new' | 'replied';
  createdAt: string;
}

const byNewest = <T extends { createdAt: string }>(a: T, b: T) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

// ─── orders ───
export const saveOrder = (o: StoredOrder) => hset(ORDERS, o.orderNumber, o);
export const getOrder = (n: string) => hget<StoredOrder>(ORDERS, n);
export const listOrders = async () => (await hgetall<StoredOrder>(ORDERS)).sort(byNewest);
export const deleteOrder = (n: string) => hdel(ORDERS, n);
export const deleteAllOrders = () => hclear(ORDERS);
export async function markOrderSent(n: string, paymentDetails: StoredOrder['paymentDetails']) {
  const o = await getOrder(n);
  if (!o) return false;
  o.status = 'payment-sent';
  if (paymentDetails) o.paymentDetails = paymentDetails;
  await saveOrder(o);
  return true;
}
export async function markPaymentConfirmed(n: string) {
  const o = await getOrder(n);
  if (!o) return false;
  o.status = 'payment-confirmed';
  o.paymentConfirmedAt = new Date().toISOString();
  await saveOrder(o);
  return true;
}

// ─── enquiries ───
export const saveEnquiry = (e: StoredEnquiry) => hset(ENQUIRIES, e.id, e);
export const getEnquiry = (id: string) => hget<StoredEnquiry>(ENQUIRIES, id);
export const listEnquiries = async () => (await hgetall<StoredEnquiry>(ENQUIRIES)).sort(byNewest);
export const deleteEnquiry = (id: string) => hdel(ENQUIRIES, id);
export const deleteAllEnquiries = () => hclear(ENQUIRIES);
export async function markEnquiryReplied(id: string) {
  const e = await getEnquiry(id);
  if (!e) return false;
  e.status = 'replied';
  await saveEnquiry(e);
  return true;
}
