'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { Coins, Minus, Plus, Trash2, ShieldCheck, Truck, CheckCircle2, AlertCircle } from 'lucide-react';
import ProductImage from '@/components/ProductImage';
import { useApp } from '@/context/AppContext';
import { BUSINESS_INFO, COMMON_ADDONS, PRODUCTS } from '@/lib/data';
import { makeOrderNumber } from '@/lib/order';
import { waOrderLink } from '@/lib/whatsapp';
import { REPLY } from '@/lib/reply-config';

const STATES = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'];
const field = 'w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-[#2E6B4D] focus:outline-none focus:ring-1 focus:ring-[#2E6B4D]';
const label = 'mb-1 block text-xs font-bold text-gray-700';

const ERROR_TEXT: Record<string, string> = {
  'below-minimum-order': `The minimum order is $${BUSINESS_INFO.minOrder} AUD.`,
  'invalid-email': 'Please check your email address.',
  'invalid-phone': 'Please check your phone number.',
  'invalid-address': 'Please check your street address and 4-digit postcode.',
  'service-unavailable': 'We could not reach our order system just now. Your order was NOT placed. Please try again in a moment, or message us on WhatsApp or phone.',
};

/** Full-page checkout: contact, delivery and payment are all open at once, with the order summary beside them. */
export default function CheckoutView() {
  const {
    cart, updateQuantity, removeFromCart, clearCart, addToCart,
    cartSubtotal, cartTotal, cryptoDiscountAmount, isCryptoPayment, setIsCryptoPayment, shippingCost, currentLocation,
  } = useApp();

  const [payment, setPayment] = useState<'payid' | 'osko' | 'crypto'>(isCryptoPayment ? 'crypto' : 'payid');
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', address: '', state: currentLocation.state, postcode: currentLocation.postcode, notes: '' });
  const [honeypot, setHoneypot] = useState('');
  const [submitting, setSubmitting] = useState<'email' | 'whatsapp' | null>(null);
  const [error, setError] = useState('');
  const [placed, setPlaced] = useState<{ orderNumber: string; amountDue: number } | null>(null);
  const orderRef = useRef<string | null>(null);

  const belowMin = cartSubtotal > 0 && cartSubtotal < BUSINESS_INFO.minOrder;
  const toFree = Math.max(0, BUSINESS_INFO.freeDeliveryThreshold - cartSubtotal);
  const unit = (i: (typeof cart)[number]) => i.product.price + (i.product.sizeVariants?.find((v) => v.label === i.selectedSize)?.priceDelta || 0) + i.selectedAddOns.reduce((a, x) => a + x.price, 0);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  const choose = (m: 'payid' | 'osko' | 'crypto') => { setPayment(m); setIsCryptoPayment(m === 'crypto'); };

  const submit = async (channel: 'email' | 'whatsapp') => {
    if (submitting || belowMin || !cart.length) return;
    setError('');
    if (!orderRef.current) orderRef.current = makeOrderNumber();
    const orderNumber = orderRef.current;
    const methodLabel = REPLY.paymentMethods.find((m) => m.id === payment)?.label || payment;
    if (channel === 'whatsapp') {
      // open the pre-filled chat inside the click so pop-up blockers allow it
      window.open(
        waOrderLink({
          orderNumber,
          items: cart.map((i) => ({ name: i.product.name, quantity: i.quantity, lineTotal: unit(i) * i.quantity })),
          amountDue: cartTotal,
          name: form.fullName,
          phone: form.phone,
          address: `${form.address}, ${form.state} ${form.postcode}`,
          paymentMethod: methodLabel,
        }),
        '_blank',
        'noopener,noreferrer',
      );
    }
    setSubmitting(channel);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          formName: 'order',
          website: honeypot,
          orderNumber,
          channel,
          customerName: form.fullName,
          customerEmail: form.email,
          customerPhone: form.phone,
          address: form.address,
          state: form.state,
          postcode: form.postcode,
          notes: form.notes,
          paymentMethod: payment,
          items: cart.map((i) => ({ productId: i.product.id, quantity: i.quantity, selectedSize: i.selectedSize, addOnIds: i.selectedAddOns.map((a) => a.id) })),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setPlaced({ orderNumber, amountDue: data.amountDue ?? cartTotal });
        clearCart();
        orderRef.current = null;
      } else {
        setError(ERROR_TEXT[data.error] || 'Something went wrong placing your order. Please check your details and try again, or message us on WhatsApp.');
      }
    } catch {
      setError(ERROR_TEXT['service-unavailable']);
    }
    setSubmitting(null);
  };

  if (placed) {
    return (
      <div className="mx-auto max-w-xl px-4 py-14 text-center sm:px-6">
        <CheckCircle2 className="mx-auto h-12 w-12 text-[#2E6B4D]" aria-hidden="true" />
        <h1 className="mt-3 text-2xl font-black text-gray-900">Order confirmed</h1>
        <p className="mt-2 text-sm text-gray-600">
          Thank you, <strong>{form.fullName}</strong>. We emailed a confirmation to <strong>{form.email}</strong>. Watch for a follow-up email with the payment details for your order.
        </p>
        <dl className="mx-auto mt-5 max-w-sm space-y-1.5 rounded-2xl border border-gray-200 bg-gray-50 p-4 text-left text-sm">
          <div className="flex justify-between"><dt className="text-gray-600">Order number</dt><dd className="font-black">{placed.orderNumber}</dd></div>
          <div className="flex justify-between"><dt className="text-gray-600">Total</dt><dd className="font-black">${placed.amountDue.toLocaleString()} AUD</dd></div>
          <div className="flex justify-between"><dt className="text-gray-600">Payment</dt><dd className="font-bold uppercase">{payment}</dd></div>
        </dl>
        <Link href="/shop" className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-[#1E4733] px-6 text-sm font-black text-white hover:bg-[#2E6B4D]">Back to shop</Link>
      </div>
    );
  }

  if (!cart.length) {
    return (
      <div className="mx-auto max-w-xl px-4 py-14 text-center sm:px-6">
        <h1 className="text-2xl font-black text-gray-900">Your cart is empty</h1>
        <p className="mt-2 text-sm text-gray-600">Add an e-bike, scooter, helmet or accessory and come back to check out.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/shop" className="inline-flex min-h-11 items-center rounded-xl bg-[#1E4733] px-5 text-sm font-black text-white hover:bg-[#2E6B4D]">Shop all products</Link>
          <Link href="/ebikes" className="inline-flex min-h-11 items-center rounded-xl border border-gray-300 px-5 text-sm font-bold text-gray-800 hover:border-[#2E6B4D]">Electric bikes</Link>
          <Link href="/scooters" className="inline-flex min-h-11 items-center rounded-xl border border-gray-300 px-5 text-sm font-bold text-gray-800 hover:border-[#2E6B4D]">Scooters</Link>
        </div>
      </div>
    );
  }

  const addOnsToOffer = COMMON_ADDONS.filter((a) => !cart.some((c) => c.product.id === a.id));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">Checkout</h1>
      <p className="mt-1 text-sm text-gray-600">Enter your details, choose how to pay and place your order. No account needed.</p>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_380px]">
        <form
          onSubmit={(e) => { e.preventDefault(); submit('email'); }}
          className="space-y-6"
          aria-label="Checkout"
        >
          <section aria-labelledby="co-contact" className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
            <h2 id="co-contact" className="text-base font-black text-gray-900">Contact</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="co-name" className={label}>Full name *</label>
                <input id="co-name" required autoComplete="name" value={form.fullName} onChange={set('fullName')} className={field} />
              </div>
              <div>
                <label htmlFor="co-email" className={label}>Email *</label>
                <input id="co-email" type="email" required autoComplete="email" value={form.email} onChange={set('email')} className={field} />
              </div>
              <div>
                <label htmlFor="co-phone" className={label}>Phone (Australia) *</label>
                <input id="co-phone" type="tel" required autoComplete="tel" value={form.phone} onChange={set('phone')} className={field} />
              </div>
            </div>
          </section>

          <section aria-labelledby="co-ship" className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
            <h2 id="co-ship" className="text-base font-black text-gray-900">Delivery address</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="co-address" className={label}>Street address and unit *</label>
                <input id="co-address" required autoComplete="street-address" value={form.address} onChange={set('address')} className={field} />
              </div>
              <div>
                <label htmlFor="co-state" className={label}>State *</label>
                <select id="co-state" value={form.state} onChange={set('state')} className={field}>
                  {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="co-postcode" className={label}>Postcode *</label>
                <input id="co-postcode" required inputMode="numeric" maxLength={4} autoComplete="postal-code" value={form.postcode} onChange={set('postcode')} className={field} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="co-notes" className={label}>Order notes (optional)</label>
                <textarea id="co-notes" rows={2} value={form.notes} onChange={set('notes')} className={field} />
              </div>
            </div>
          </section>

          <section aria-labelledby="co-pay" className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
            <h2 id="co-pay" className="text-base font-black text-gray-900">Payment method</h2>
            <p className="mt-1 text-xs text-gray-600">We email the payment details after you place the order.</p>
            <div role="radiogroup" aria-labelledby="co-pay" className="mt-3 space-y-2">
              {([
                ['payid', 'PayID', 'Instant transfer to our PayID'],
                ['osko', 'Bank transfer (Osko / EFT)', 'Direct deposit from any Australian bank'],
                ['crypto', 'Crypto: save 10%', 'Bitcoin or USDT, discount applied automatically'],
              ] as const).map(([id, name, hint]) => (
                <label key={id} className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm ${payment === id ? 'border-[#2E6B4D] bg-emerald-50 ring-1 ring-[#2E6B4D]' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <input type="radio" name="payment" value={id} checked={payment === id} onChange={() => choose(id)} className="h-4 w-4 accent-[#2E6B4D]" />
                  <span className="flex-1"><span className="block font-black text-gray-900">{name}</span><span className="block text-xs text-gray-600">{hint}</span></span>
                  {id === 'crypto' && <Coins className="h-4 w-4 text-amber-500" aria-hidden="true" />}
                </label>
              ))}
            </div>
          </section>

          {/* honeypot: hidden from people, filled by bots */}
          <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
            <label>Website<input type="text" name="website" aria-label="Leave this field empty" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} /></label>
          </div>

          {error && <p role="alert" className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />{error}</p>}

          <div className="grid gap-2 sm:grid-cols-2">
            <button
              type="submit"
              disabled={!!submitting || belowMin}
              className="min-h-12 rounded-xl bg-[#1E4733] px-4 text-sm font-black uppercase tracking-wide text-white hover:bg-[#2E6B4D] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting === 'email' ? 'Placing your order…' : `Place order · $${cartTotal.toLocaleString()} AUD`}
            </button>
            <button
              type="button"
              disabled={!!submitting || belowMin}
              onClick={(e) => {
                const f = (e.currentTarget as HTMLButtonElement).closest('form');
                if (f && !f.reportValidity()) return;
                submit('whatsapp');
              }}
              className="min-h-12 rounded-xl bg-green-600 px-4 text-sm font-black uppercase tracking-wide text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting === 'whatsapp' ? 'Placing your order…' : 'Order via WhatsApp'}
            </button>
          </div>
        </form>

        <aside aria-label="Order summary" className="h-fit rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:p-5 lg:sticky lg:top-24">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-gray-900">Your order</h2>
            <button type="button" onClick={clearCart} className="text-xs font-semibold text-gray-600 hover:text-red-600">Clear</button>
          </div>

          <ul className="mt-3 space-y-3">
            {cart.map((i) => (
              <li key={i.cartId} className="flex gap-3">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-[#f8fafc]">
                  <ProductImage src={i.product.image} focusKeyword={i.product.name} name={i.product.name} withContainer={false} sizes="64px" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-xs font-black leading-snug text-gray-900">{i.product.name}</p>
                  <div className="mt-1.5 flex items-center justify-between">
                    <div className="flex items-center rounded-lg border border-gray-300 bg-white">
                      <button type="button" onClick={() => updateQuantity(i.cartId, i.quantity - 1)} className="flex h-8 w-8 items-center justify-center text-gray-700 hover:bg-gray-100" aria-label={`Decrease quantity of ${i.product.name}`}><Minus className="h-3 w-3" /></button>
                      <span className="w-6 text-center text-xs font-bold" aria-live="polite">{i.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(i.cartId, i.quantity + 1)} className="flex h-8 w-8 items-center justify-center text-gray-700 hover:bg-gray-100" aria-label={`Increase quantity of ${i.product.name}`}><Plus className="h-3 w-3" /></button>
                    </div>
                    <span className="text-sm font-black text-gray-900">${(unit(i) * i.quantity).toLocaleString()}</span>
                  </div>
                </div>
                <button type="button" onClick={() => removeFromCart(i.cartId)} className="self-start p-1 text-gray-500 hover:text-red-600" aria-label={`Remove ${i.product.name}`}><Trash2 className="h-4 w-4" /></button>
              </li>
            ))}
          </ul>

          {addOnsToOffer.length > 0 && (
            <div className="mt-4 border-t border-gray-200 pt-3">
              <p className="text-xs font-black text-gray-800">Add an essential</p>
              <ul className="mt-2 space-y-2">
                {addOnsToOffer.slice(0, 3).map((a) => {
                  const real = PRODUCTS.find((p) => p.id === a.id);
                  return (
                    <li key={a.id} className="flex items-center gap-2">
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-[#f8fafc]">
                        <ProductImage src={a.image} focusKeyword={a.name} name={a.name} withContainer={false} sizes="40px" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-bold text-gray-900">{a.name}</p>
                        <p className="text-xs font-semibold text-emerald-800">${a.price} AUD</p>
                      </div>
                      <button type="button" disabled={!real} onClick={() => real && addToCart(real, 1)} className="min-h-9 rounded-lg border border-emerald-300 bg-emerald-50 px-3 text-xs font-black text-[#1E4733] hover:bg-[#1E4733] hover:text-white disabled:opacity-50">+ Add</button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <dl className="mt-4 space-y-1.5 border-t border-gray-200 pt-3 text-sm">
            <div className="flex justify-between"><dt className="text-gray-600">Subtotal</dt><dd className="font-bold">${cartSubtotal.toLocaleString()}</dd></div>
            {isCryptoPayment && <div className="flex justify-between font-bold text-emerald-700"><dt>Crypto discount (10%)</dt><dd>-${cryptoDiscountAmount.toLocaleString()}</dd></div>}
            <div className="flex justify-between"><dt className="text-gray-600">Delivery ({currentLocation.city})</dt><dd className="font-semibold">{shippingCost === 0 ? 'FREE' : `$${shippingCost}`}</dd></div>
            <div className="flex justify-between border-t border-gray-200 pt-2 text-base font-black"><dt>Total (AUD)</dt><dd>${cartTotal.toLocaleString()}</dd></div>
          </dl>

          {belowMin && (
            <p role="status" className="mt-3 flex items-start gap-2 rounded-lg bg-amber-100 p-2.5 text-xs font-semibold text-amber-900">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              Minimum order is ${BUSINESS_INFO.minOrder}. Add ${(BUSINESS_INFO.minOrder - cartSubtotal).toLocaleString()} more to place it.
            </p>
          )}
          {!belowMin && toFree > 0 && (
            <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-900"><Truck className="h-4 w-4" aria-hidden="true" />Add ${toFree.toLocaleString()} for free metro delivery.</p>
          )}
          <p className="mt-3 flex items-center gap-2 text-xs text-gray-600"><ShieldCheck className="h-4 w-4 text-[#2E6B4D]" aria-hidden="true" />Prices in AUD. Dispatch {currentLocation.deliveryDays}.</p>
        </aside>
      </div>
    </div>
  );
}
