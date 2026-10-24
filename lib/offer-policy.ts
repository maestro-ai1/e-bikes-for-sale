import { BUSINESS_INFO } from '@/lib/site-config';

// Shipping and return details for Product Offer markup (Google Merchant listings).
// Values mirror the Delivery, Returns & Store Policies page and the checkout rules in lib/order.ts.
const day = (minValue: number, maxValue: number) => ({ '@type': 'QuantitativeValue', minValue, maxValue, unitCode: 'DAY' });

export function offerShippingDetails(price: number) {
  const rate = price >= BUSINESS_INFO.freeDeliveryThreshold ? 0 : 75;
  return {
    '@type': 'OfferShippingDetails',
    shippingRate: { '@type': 'MonetaryAmount', value: rate, currency: 'AUD' },
    shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'AU' },
    deliveryTime: {
      '@type': 'ShippingDeliveryTime',
      handlingTime: day(2, 5),
      transitTime: day(2, 7),
    },
  };
}

export const OFFER_RETURN_POLICY = {
  '@type': 'MerchantReturnPolicy',
  applicableCountry: 'AU',
  returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
  merchantReturnDays: 14,
  returnMethod: 'https://schema.org/ReturnByMail',
  returnFees: 'https://schema.org/ReturnShippingFees',
};

// Google caps sku at 50 characters; longer ids keep a readable prefix plus a short hash so they stay unique.
export function shortSku(id: string) {
  if (id.length <= 50) return id;
  let h = 5381;
  for (let i = 0; i < id.length; i++) h = ((h * 33) ^ id.charCodeAt(i)) >>> 0;
  return `${id.slice(0, 41)}-${h.toString(16).padStart(8, '0')}`;
}
