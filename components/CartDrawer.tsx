'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { BUSINESS_INFO, COMMON_ADDONS, PRODUCTS } from '@/lib/data';
import { Product } from '@/lib/types';
import { makeOrderNumber } from '@/lib/order';
import { waOrderLink } from '@/lib/whatsapp';
import { REPLY } from '@/lib/reply-config';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  Coins, 
  ShieldCheck, 
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Zap
} from 'lucide-react';

export default function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    cartSubtotal, 
    cartTotal, 
    cryptoDiscountAmount, 
    isCryptoPayment, 
    setIsCryptoPayment,
    shippingCost,
    currentLocation,
    addToCart
  } = useApp();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<'payid' | 'osko' | 'crypto'>('payid');
  const [addedAddonIds, setAddedAddonIds] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState<'email' | 'whatsapp' | null>(null);
  const [submitError, setSubmitError] = useState('');
  const [placed, setPlaced] = useState<{ orderNumber: string; amountDue: number } | null>(null);
  const [honeypot, setHoneypot] = useState('');
  // minted once per checkout attempt so a retry can never create a second order
  const orderRef = useRef<string | null>(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    state: currentLocation.state,
    postcode: currentLocation.postcode,
    orderNotes: '',
  });

  if (!isCartOpen) return null;

  const freeShippingThreshold = BUSINESS_INFO.freeDeliveryThreshold;
  const progressPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const isBelowMinOrder = cartSubtotal < BUSINESS_INFO.minOrder && cartSubtotal > 0;

  const ERROR_TEXT: Record<string, string> = {
    'below-minimum-order': `The minimum order is ${BUSINESS_INFO.minOrder} AUD.`,
    'invalid-email': 'Please check your email address.',
    'invalid-phone': 'Please check your phone number.',
    'invalid-address': 'Please check your street address and 4-digit postcode.',
    'service-unavailable': 'We could not reach our order system just now. Your order was NOT placed. Please try again in a moment, or message us on WhatsApp or phone.',
  };

  const submitOrder = async (channel: 'email' | 'whatsapp') => {
    if (submitting) return;
    setSubmitError('');
    if (!orderRef.current) orderRef.current = makeOrderNumber();
    const orderNumber = orderRef.current;
    const methodLabel = REPLY.paymentMethods.find((m) => m.id === selectedPayment)?.label || selectedPayment;

    // WhatsApp: open the pre-filled chat synchronously inside the click (before any await) so pop-up blockers allow it
    if (channel === 'whatsapp') {
      window.open(
        waOrderLink({
          orderNumber,
          items: cart.map((i) => ({ name: i.product.name, quantity: i.quantity, lineTotal: (i.product.price + (i.product.sizeVariants?.find((v) => v.label === i.selectedSize)?.priceDelta || 0) + i.selectedAddOns.reduce((a, x) => a + x.price, 0)) * i.quantity })),
          amountDue: cartTotal,
          name: formData.fullName,
          phone: formData.phone,
          address: `${formData.address}, ${formData.state} ${formData.postcode}`,
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
          customerName: formData.fullName,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          address: formData.address,
          state: formData.state,
          postcode: formData.postcode,
          notes: formData.orderNotes,
          paymentMethod: selectedPayment,
          items: cart.map((i) => ({ productId: i.product.id, quantity: i.quantity, selectedSize: i.selectedSize, addOnIds: i.selectedAddOns.map((a) => a.id) })),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setPlaced({ orderNumber, amountDue: data.amountDue ?? cartTotal });
        setCheckoutComplete(true);
      } else {
        setSubmitError(ERROR_TEXT[data.error] || 'Something went wrong placing your order. Please check your details and try again, or message us on WhatsApp.');
      }
    } catch {
      setSubmitError(ERROR_TEXT['service-unavailable']);
    }
    setSubmitting(null);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitOrder('email');
  };

  const handleFinishOrder = () => {
    orderRef.current = null;
    setPlaced(null);
    clearCart();
    setCheckoutComplete(false);
    setIsCheckingOut(false);
    setIsCartOpen(false);
  };

  const handleQuickAddAddon = (addon: typeof COMMON_ADDONS[0]) => {
    const dummyProduct: Product = {
      id: addon.id,
      name: addon.name,
      slug: addon.id,
      badge: 'Accessory',
      subtitle: addon.description,
      category: 'accessories',
      categoryLabel: 'Accessories',
      brand: 'AusPro Genuine',
      price: addon.price,
      compareAtPrice: addon.price + 30,
      rating: 4.9,
      reviewsCount: 38,
      image: addon.image,
      hoverImage: addon.image,
      gallery: [addon.image],
      inStock: true,
      stockCount: 15,
      motor: 'N/A',
      motorType: 'Hub',
      torqueNm: 0,
      batteryWh: 0,
      batterySpec: 'N/A',
      rangeKm: 0,
      topSpeedKmH: 0,
      frameType: 'Universal',
      weightKg: 2,
      payloadKg: 25,
      brakes: 'Alloy',
      gears: 'N/A',
      auCompliance: 'AS/NZS Certified',
      description: addon.description,
      shortDescription: addon.description,
      features: [addon.description],
      tags: ['accessory', 'cycling gear', 'e-bike'],
      sizeVariants: [{ id: 'std', label: 'Standard', priceDelta: 0 }],
      recommendedAddOns: [],
    };

    addToCart(dummyProduct, 1, 'Standard', []);
    setAddedAddonIds(prev => [...prev, addon.id]);
  };

  const handleQuickAddProduct = (prod: typeof PRODUCTS[0]) => {
    addToCart(prod, 1, prod.sizeVariants?.[0]?.label || 'Medium', []);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
      {/* COMPACT & SIMPLE DRAWER (max-w-md, clean padding, mobile responsive) */}
      <div className="bg-white w-full max-w-sm sm:max-w-md h-full flex flex-col justify-between shadow-2xl relative overflow-hidden animate-in slide-in-from-right duration-250">
        
        {/* COMPACT HEADER */}
        <div className="px-4 py-3 sm:px-5 sm:py-3.5 border-b border-gray-100 flex items-center justify-between bg-white z-10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#1E4733] flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-gray-900 text-sm sm:text-base leading-none">
                  {isCheckingOut ? 'Express Checkout' : 'Shopping Cart'}
                </h3>
                <span className="bg-gray-100 text-gray-700 text-[11px] font-extrabold px-2 py-0.5 rounded-full">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <p className="text-[10px] text-gray-400 font-medium mt-0.5">
                {isCheckingOut ? 'Encrypted AU Checkout' : 'Australia-Wide Dispatch'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {cart.length > 0 && !isCheckingOut && (
              <button
                onClick={clearCart}
                className="text-[11px] text-gray-400 hover:text-red-600 px-2 py-1 rounded-md transition-colors"
                title="Empty shopping cart"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => { setIsCartOpen(false); setIsCheckingOut(false); }}
              className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* FREE SHIPPING & MIN ORDER BAR (COMPACT) */}
        {!checkoutComplete && (
          <div className="bg-emerald-50/70 px-4 py-2.5 border-b border-emerald-100/60 text-xs shrink-0">
            {amountToFreeShipping > 0 ? (
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[11px] font-semibold text-emerald-950">
                  <span>Add <strong>${amountToFreeShipping.toLocaleString()}</strong> for Free Metro Delivery</span>
                  <span className="font-mono text-emerald-700">{Math.round(progressPercent)}%</span>
                </div>
                <div className="w-full bg-emerald-200/60 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#2E6B4D] h-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-[11px]">
                <Truck className="w-3.5 h-3.5 text-emerald-600" />
                <span>You qualify for <strong>FREE Metro Shipping</strong>!</span>
              </div>
            )}

            {isBelowMinOrder && (
              <div className="mt-1.5 flex items-center gap-1.5 text-amber-900 bg-amber-100/70 px-2.5 py-1 rounded-md text-[11px] font-medium">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Min order is ${BUSINESS_INFO.minOrder}. Add ${(BUSINESS_INFO.minOrder - cartSubtotal).toLocaleString()} to order.</span>
              </div>
            )}
          </div>
        )}

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto px-4 py-3 sm:px-5 sm:py-4 space-y-4">
          
          {/* STATE 1: CHECKOUT COMPLETE */}
          {checkoutComplete ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#1E4733] flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-black text-gray-900">Order Confirmed!</h4>
                <p className="text-xs text-gray-600 max-w-xs mx-auto leading-relaxed">
                  Thank you, <strong>{formData.fullName || 'Valued Customer'}</strong>! We have emailed a confirmation to <strong>{formData.email || 'your email'}</strong>. Watch for a follow-up email from us with the payment details for your order.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-3.5 rounded-xl text-xs text-left space-y-1.5 font-medium">
                <div className="flex justify-between">
                  <span className="text-gray-500">Order number:</span>
                  <strong className="text-gray-900 font-black">{placed?.orderNumber}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Total:</span>
                  <strong className="text-gray-900 font-black">${(placed?.amountDue ?? cartTotal).toLocaleString()} AUD</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Method:</span>
                  <span className="font-bold text-emerald-700">{selectedPayment.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery To:</span>
                  <span className="text-gray-800">{formData.state} ({formData.postcode})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Estimated Dispatch:</span>
                  <span className="text-gray-800">{currentLocation.deliveryDays}</span>
                </div>
              </div>

              <button
                onClick={handleFinishOrder}
                className="cursor-pointer w-full bg-[#1E4733] hover:bg-[#2E6B4D] text-white py-3 rounded-xl font-extrabold text-xs transition-colors shadow-sm"
              >
                Back to Shop
              </button>
            </div>
          ) : isCheckingOut ? (
            /* STATE 2: CHECKOUT FORM */
            <form onSubmit={handleCheckoutSubmit} className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="cursor-pointer flex items-center gap-1 text-xs text-[#2E6B4D] font-bold hover:underline"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Cart</span>
                </button>
                <span className="text-[11px] text-gray-400 font-medium">Step 2 of 2</span>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lachlan Smith"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full text-xs border border-gray-300 rounded-xl px-3 py-2 focus:ring-1 focus:ring-[#2E6B4D] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="lachlan@example.com.au"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs border border-gray-300 rounded-xl px-3 py-2 focus:ring-1 focus:ring-[#2E6B4D] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Phone (AU) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0400 000 000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs border border-gray-300 rounded-xl px-3 py-2 focus:ring-1 focus:ring-[#2E6B4D] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Street Address *</label>
                <input
                  type="text"
                  required
                  placeholder="Street address & unit number"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full text-xs border border-gray-300 rounded-xl px-3 py-2 focus:ring-1 focus:ring-[#2E6B4D] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">State *</label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full text-xs border border-gray-300 rounded-xl px-2.5 py-2 bg-white outline-none"
                  >
                    {['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Postcode *</label>
                  <input
                    type="text"
                    required
                    maxLength={4}
                    value={formData.postcode}
                    onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                    className="w-full text-xs border border-gray-300 rounded-xl px-3 py-2 outline-none"
                  />
                </div>
              </div>

              {/* PAYMENT OPTIONS - STRICTLY PAYID, BANK TRANSFER (OSKO/EFT), CRYPTO */}
              <div className="pt-2">
                <label className="block text-[11px] font-bold text-gray-700 mb-1.5">Payment Method *</label>
                <div className="space-y-1.5">
                  <button
                    type="button"
                    onClick={() => { setSelectedPayment('payid'); setIsCryptoPayment(false); }}
                    className={`cursor-pointer w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                      selectedPayment === 'payid' ? 'border-cyan-500 bg-cyan-50/80 text-cyan-950 ring-1 ring-cyan-500' : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div>
                      <span className="font-black text-cyan-900 block">PayID</span>
                      <span className="text-[10px] text-gray-500">Instant mobile/email transfer</span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  </button>

                  <button
                    type="button"
                    onClick={() => { setSelectedPayment('osko'); setIsCryptoPayment(false); }}
                    className={`cursor-pointer w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                      selectedPayment === 'osko' ? 'border-blue-500 bg-blue-50/80 text-blue-950 ring-1 ring-blue-500' : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div>
                      <span className="font-black text-blue-900 block">Bank Transfer (Osko / EFT)</span>
                      <span className="text-[10px] text-gray-500">Fast Australian direct deposit</span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                  </button>

                  <button
                    type="button"
                    onClick={() => { setSelectedPayment('crypto'); setIsCryptoPayment(true); }}
                    className={`cursor-pointer w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                      selectedPayment === 'crypto' ? 'border-amber-500 bg-amber-50/80 text-amber-950 ring-1 ring-amber-500' : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div>
                      <span className="font-black text-amber-900 block">Crypto (Save 10%)</span>
                      <span className="text-[10px] text-amber-700 font-semibold">Automatic 10% discount on BTC/USDT</span>
                    </div>
                    <Coins className="w-4 h-4 text-amber-500" />
                  </button>
                </div>
              </div>

              {/* honeypot: hidden from people, filled by bots */}
              <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
                <label>Website<input type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} /></label>
              </div>

              {submitError && (
                <p role="alert" className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">{submitError}</p>
              )}

              <button
                type="submit"
                disabled={!!submitting}
                className="cursor-pointer w-full mt-3 bg-[#1E4733] hover:bg-[#2E6B4D] disabled:opacity-60 text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-md transition-colors active:scale-95"
              >
                {submitting === 'email' ? 'Placing your order…' : `Place Order • $${cartTotal.toLocaleString()} AUD`}
              </button>
              <button
                type="button"
                disabled={!!submitting}
                onClick={(e) => {
                  const form = (e.currentTarget as HTMLButtonElement).closest('form');
                  if (form && !form.reportValidity()) return;
                  submitOrder('whatsapp');
                }}
                className="cursor-pointer w-full mt-2 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-colors"
              >
                {submitting === 'whatsapp' ? 'Placing your order…' : 'Order via WhatsApp'}
              </button>
            </form>
          ) : cart.length === 0 ? (
            /* STATE 3: EMPTY CART WITH QUICK-ADD BEST SELLERS */
            <div className="py-6 space-y-5">
              <div className="text-center space-y-2 py-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-gray-400">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h4 className="font-extrabold text-gray-800 text-sm">Your Cart is Empty</h4>
                <p className="text-xs text-gray-400 max-w-xs mx-auto">
                  Add road-legal 250W e-bikes, helmets, or genuine accessories to your basket.
                </p>
              </div>

              {/* QUICK ADD BEST SELLERS */}
              <div className="space-y-2.5 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Popular Street-Legal Models (Quick Add):</span>
                </div>

                <div className="space-y-2">
                  {PRODUCTS.slice(0, 3).map((prod) => (
                    <div
                      key={prod.id}
                      className="p-2.5 rounded-xl border border-gray-200 bg-gray-50/60 flex items-center justify-between gap-3 hover:border-gray-300 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-lg relative overflow-hidden bg-white shrink-0 border border-gray-200">
                        <Image
                          src={prod.image}
                          alt={prod.name}
                          fill
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-bold text-xs text-gray-900 truncate">{prod.name}</h5>
                        <p className="text-[11px] text-gray-500 font-semibold">${prod.price.toLocaleString()} AUD</p>
                      </div>
                      <button
                        onClick={() => handleQuickAddProduct(prod)}
                        className="cursor-pointer bg-[#1E4733] hover:bg-[#2E6B4D] text-white text-[11px] font-extrabold px-3 py-1.5 rounded-lg transition-colors active:scale-95 shrink-0"
                      >
                        + Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* STATE 4: CART ITEM LIST WITH PRODUCT ADDING OPTIONS */
            <div className="space-y-3.5">
              
              {/* CART ITEMS */}
              <div className="space-y-2.5">
                {cart.map((item) => {
                  const addOnsPrice = item.selectedAddOns.reduce((sum, a) => sum + a.price, 0);
                  const sizeDelta = item.product.sizeVariants?.find(v => v.label === item.selectedSize)?.priceDelta || 0;
                  const unitPrice = item.product.price + sizeDelta + addOnsPrice;
                  const lineTotal = unitPrice * item.quantity;

                  return (
                    <div
                      key={item.cartId}
                      className="p-3 bg-gray-50/80 rounded-xl border border-gray-200/90 flex gap-3 relative transition-all"
                    >
                      <div className="w-16 h-16 rounded-lg relative overflow-hidden bg-white shrink-0 border border-gray-200">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-1">
                            <h4 className="font-extrabold text-xs text-gray-900 truncate leading-snug">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.cartId)}
                              className="cursor-pointer text-gray-400 hover:text-red-500 p-0.5 transition-colors"
                              aria-label="Remove item"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="text-[10px] text-gray-500 mt-0.5">
                            <span className="font-medium">{item.selectedSize}</span>
                            {item.selectedAddOns.length > 0 && (
                              <span className="block text-[#1E4733] font-semibold">
                                +{item.selectedAddOns.length} bundle item(s) included
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          {/* QUANTITY ADJUSTER */}
                          <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden shadow-2xs">
                            <button
                              onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                              className="cursor-pointer px-2 py-1 hover:bg-gray-100 text-gray-600 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <span className="px-2 text-xs font-bold text-gray-900 font-mono">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                              className="cursor-pointer px-2 py-1 hover:bg-gray-100 text-gray-600 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          </div>

                          <span className="font-black text-xs text-gray-900 font-mono">
                            ${lineTotal.toLocaleString()} AUD
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* PRODUCT ADDING OPTION: RECOMMENDED ADD-ONS & ESSENTIALS */}
              <div className="pt-2 border-t border-gray-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-gray-800 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-500" />
                    <span>Add Accessories & Essentials:</span>
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">1-Click Add</span>
                </div>

                <div className="space-y-1.5">
                  {COMMON_ADDONS.map((addon) => {
                    const isAdded = addedAddonIds.includes(addon.id) || cart.some(c => c.product.id === addon.id);

                    return (
                      <div
                        key={addon.id}
                        className="p-2.5 rounded-xl border border-dashed border-gray-300 bg-white hover:border-emerald-500/60 transition-colors flex items-center justify-between gap-2.5"
                      >
                        <div className="w-10 h-10 rounded-md relative overflow-hidden bg-gray-50 shrink-0 border border-gray-200">
                          <Image
                            src={addon.image}
                            alt={addon.name}
                            fill
                            className="object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <span className="font-bold text-xs text-gray-900 block truncate">
                            {addon.name}
                          </span>
                          <span className="text-[11px] font-bold text-emerald-800 font-mono">
                            ${addon.price} AUD
                          </span>
                        </div>

                        <button
                          onClick={() => handleQuickAddAddon(addon)}
                          className={`cursor-pointer px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 active:scale-95 ${
                            isAdded
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-emerald-50 text-[#1E4733] hover:bg-[#1E4733] hover:text-white border border-emerald-200'
                          }`}
                        >
                          {isAdded ? 'Added ✓' : '+ Add'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* COMPACT FOOTER WITH TOTALS & CHECKOUT TRIGGER */}
        {cart.length > 0 && !checkoutComplete && !isCheckingOut && (
          <div className="px-4 py-3 sm:px-5 sm:py-3.5 border-t border-gray-200 bg-gray-50 space-y-2.5 z-10 shrink-0">
            
            {/* Crypto Discount Checkbox */}
            <div className="bg-white p-2 rounded-xl border border-emerald-200 flex items-center justify-between shadow-2xs">
              <label 
                htmlFor="cart-crypto-toggle" 
                className="cursor-pointer flex items-center gap-2 text-xs flex-1"
              >
                <Coins className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <span className="font-bold text-gray-900 block leading-tight">Pay With Crypto (Save 10%)</span>
                  <span className="text-[10px] text-emerald-700 font-medium">Instant discount applied on BTC/USDT</span>
                </div>
              </label>
              <input
                id="cart-crypto-toggle"
                type="checkbox"
                checked={isCryptoPayment}
                onChange={(e) => setIsCryptoPayment(e.target.checked)}
                className="w-4 h-4 text-[#2E6B4D] rounded-sm focus:ring-[#2E6B4D] cursor-pointer"
              />
            </div>

            {/* Price Calculations */}
            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-bold text-gray-900 font-mono">${cartSubtotal.toLocaleString()} AUD</span>
              </div>
              {isCryptoPayment && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Crypto 10% Discount:</span>
                  <span className="font-mono">-${cryptoDiscountAmount.toLocaleString()} AUD</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Metro Shipping ({currentLocation.city}):</span>
                <span className="font-semibold text-gray-800">
                  {shippingCost === 0 ? 'FREE' : `$${shippingCost} AUD`}
                </span>
              </div>
              <div className="flex justify-between text-sm sm:text-base font-black text-gray-900 pt-1.5 border-t border-gray-200">
                <span>Total:</span>
                <span className="font-mono text-[#1E4733]">${cartTotal.toLocaleString()} AUD</span>
              </div>
            </div>

            {/* ACTION BUTTON */}
            <button
              disabled={isBelowMinOrder}
              onClick={() => setIsCheckingOut(true)}
              className={`cursor-pointer w-full py-3 px-4 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all ${
                isBelowMinOrder 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-[#1E4733] hover:bg-[#2E6B4D] text-white active:scale-95'
              }`}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
