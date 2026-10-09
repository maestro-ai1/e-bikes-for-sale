import { BUSINESS_INFO } from '@/lib/data';

/** Single source of truth for the reply portal (orders, enquiries, emails, WhatsApp). */
export const SITE = {
  name: BUSINESS_INFO.name,
  domain: BUSINESS_INFO.domain,
  url: `https://${BUSINESS_INFO.domain}`,
};

export interface PaymentMethod {
  id: string;
  label: string;
  /** tokens: {amount} {ref} — the sentence before the pasted payment details */
  opening: string;
  /** the sentence after the pasted payment details */
  closing: string;
}

export const REPLY = {
  orderPrefix: 'EB',
  brand: { primary: '#2E6B4D', headerDark: '#14231B' },
  currency: { code: 'AUD', symbol: '$', locale: 'en-AU' },
  channels: { email: BUSINESS_INFO.email, whatsapp: BUSINESS_INFO.whatsapp },
  headerTagline: 'Electric bikes & scooters · Australia-wide',
  dispatchLine: 'Your order is dispatched Australia-wide once payment clears (2 to 5 business days to metro areas).',
  /** Payment methods are data. The actual account / PayID / wallet details are NEVER stored here: the admin pastes them per order. */
  paymentMethods: [
    {
      id: 'payid',
      label: 'PayID',
      opening: 'Please pay {amount} by PayID using the details below, with {ref} as the reference.',
      closing: 'Once paid, tap "I have paid" below to send us your receipt so we can release your order faster.',
    },
    {
      id: 'osko',
      label: 'Bank transfer (Osko / EFT)',
      opening: 'Please transfer {amount} by bank transfer (Osko or EFT) using the details below, with {ref} as the reference.',
      closing: 'Once paid, tap "I have paid" below to send us your receipt so we can release your order faster.',
    },
    {
      id: 'crypto',
      label: 'Crypto (Bitcoin / USDT, 10% discount applied)',
      opening: 'Please send the equivalent of {amount} using the wallet details below, quoting {ref} in the memo or note where supported.',
      closing: 'Once sent, tap "I have paid" below and include the transaction ID so we can confirm it quickly.',
    },
  ] as PaymentMethod[],
};

/** Env var access for destinations (each optional; falls back to the business email). */
export const destinations = {
  order: () => process.env.ORDER_EMAIL || REPLY.channels.email,
  contact: () => process.env.CONTACT_EMAIL || REPLY.channels.email,
  wholesale: () => process.env.WHOLESALE_EMAIL || REPLY.channels.email,
};
