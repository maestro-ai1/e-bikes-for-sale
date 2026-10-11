'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { BUSINESS_INFO, COMMON_ADDONS } from '@/lib/data';
import { Product, AddOnItem } from '@/lib/types';
import { 
  X, 
  Star, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  ShoppingBag, 
  ChevronRight, 
  Check, 
  Plus, 
  Minus, 
  ChevronDown, 
  Battery, 
  Gauge, 
  Weight, 
  RotateCw,
  Coins,
  PackageCheck,
  Eye
} from 'lucide-react';

export default function ProductDetailModal() {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    currentLocation, 
    setCurrentLocation,    viewProduct
  } = useApp();

  const product = quickViewProduct;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOnItem[]>([]);
  const [activeAccordion, setActiveAccordion] = useState<string>('specs');
  const [postcodeCheck, setPostcodeCheck] = useState('');
  const [postcodeStatus, setPostcodeStatus] = useState<string | null>(null);
  const [is360Active, setIs360Active] = useState(false);

  if (!product) return null;

  // Initialize selected size if not set
  const currentSizeVariant = product.sizeVariants?.find(v => v.label === selectedSize) || product.sizeVariants?.[0];
  const sizeDelta = currentSizeVariant?.priceDelta || 0;
  const basePrice = product.price + sizeDelta;
  const addOnsTotal = selectedAddOns.reduce((sum, item) => sum + item.price, 0);
  const totalPrice = (basePrice + addOnsTotal) * quantity;
  const cryptoPrice = Math.round(totalPrice * (1 - BUSINESS_INFO.cryptoDiscountPercentage / 100));

  const toggleAddOn = (addon: AddOnItem) => {
    setSelectedAddOns(prev => 
      prev.some(a => a.id === addon.id)
        ? prev.filter(a => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  const handlePostcodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (postcodeCheck.length >= 4) {
      setPostcodeStatus(`Postcode ${postcodeCheck}: Express courier delivery estimated in 2-4 business days. Qualifies for Free Delivery on orders over $1500!`);
    }
  };

  const router = useRouter();
  const handleBuyNow = () => {
    addToCart(product, quantity, currentSizeVariant?.label, selectedAddOns);
    router.push('/checkout');
  };
  const handleAddToCart = () => {
    addToCart(product, quantity, currentSizeVariant?.label, selectedAddOns);
    setQuickViewProduct(null);
  };

  const galleryImages = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-5 sm:p-8 shadow-2xl relative border border-gray-200 my-auto max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-800 transition-colors z-20"
          aria-label="Close product view"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-4 font-medium flex-wrap">
          <Link href="/" className="hover:text-gray-700" onClick={() => setQuickViewProduct(null)}>Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/shop" className="hover:text-gray-700" onClick={() => setQuickViewProduct(null)}>Shop</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="hover:text-gray-700 cursor-pointer capitalize">{product.categoryLabel}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-bold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* MAIN PRODUCT PDP GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: IMAGE GALLERY (360 Preview + Video Placeholder + Thumbnails) */}
          <div className="lg:col-span-6 space-y-3">
            
            {/* Main Stage */}
            <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-200">
              <SafeImage
                src={galleryImages[activeImageIndex] || product.image}
                alt={`${product.name} electric bicycle - Australian stock`}
                width={600}
                height={600}
                sizes="(max-width: 1024px) 100vw, 50vw"
                referrerPolicy="no-referrer"
                className={`object-cover transition-transform duration-500 ${is360Active ? 'rotate-3 scale-105' : ''}`}
              />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                {product.badge && (
                  <span className="bg-[#1E4733] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md shadow-xs">
                    {product.badge}
                  </span>
                )}
                <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                  EN15194 Certified
                </span>
              </div>

              {/* 360 Spin Mode Button */}
              <button
                onClick={() => setIs360Active(!is360Active)}
                className={`cursor-pointer absolute bottom-3 right-3 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-all ${
                  is360Active ? 'bg-amber-400 text-black' : 'bg-black/70 text-white hover:bg-black'
                }`}
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>{is360Active ? 'Interactive Spin Active' : '360° View Mode'}</span>
              </button>
            </div>

            {/* Thumbnail Row */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveImageIndex(i); setIs360Active(false); }}
                  className={`cursor-pointer relative w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    activeImageIndex === i ? 'border-[#2E6B4D] ring-2 ring-emerald-500/20' : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <SafeImage src={img} alt="Thumbnail" width={600} height={600} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>

            {/* Availability Placeholder */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-3">
              <PackageCheck className="w-5 h-5 text-emerald-700 shrink-0" />
              <div className="text-xs">
                <span className="font-extrabold text-emerald-900 block">
                  {product.stockCount > 0 ? `In Stock (${product.stockCount} units available in Australian Dispatch Hub)` : 'Available to order'}
                </span>
                <span className="text-emerald-700">Orders placed before 2:00pm AEST dispatch next business day.</span>
              </div>
            </div>

            {/* Postcode Shipping Checker */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5">
              <form onSubmit={handlePostcodeCheck} className="space-y-2">
                <label className="block text-xs font-bold text-gray-700 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#2E6B4D]" />
                  Check Shipping to Your Postcode:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="e.g. 2000, 3000, 4000"
                    value={postcodeCheck}
                    onChange={(e) => setPostcodeCheck(e.target.value)}
                    className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs font-medium focus:ring-1 focus:ring-[#2E6B4D] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-[#2E6B4D] hover:bg-[#1E4733] text-white px-3 py-1.5 rounded-lg text-xs font-bold"
                  >
                    Check ETA
                  </button>
                </div>
                {postcodeStatus && (
                  <p className="text-[11px] text-emerald-800 font-medium bg-emerald-100/60 p-2 rounded-md">
                    {postcodeStatus}
                  </p>
                )}
              </form>
            </div>

          </div>

          {/* RIGHT: SPECS, PRICING, BUNDLES & ACTIONS */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Title & Brand */}
            <div>
              <span className="text-xs font-bold text-[#2E6B4D] uppercase tracking-wider">{product.brand}</span>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight mt-0.5">
                {product.name}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">{product.subtitle}</p>

              {/* Ratings */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                {product.reviewsCount > 0 && (
                  <>
                    <span className="text-xs font-bold text-gray-800">{product.rating}</span>
                    <span className="text-xs text-gray-400">({product.reviewsCount} verified owner ratings)</span>
                  </>
                )}
              </div>
            </div>

            {/* KEY SPECS QUICK GRID (Range, Motor Power, Max Speed, Weight Capacity) */}
            <div className="grid grid-cols-4 gap-2 bg-gray-50 border border-gray-200 p-2.5 rounded-2xl text-center">
              <div>
                <span className="block text-[10px] uppercase font-bold text-gray-400">Range</span>
                <span className="font-extrabold text-gray-900 text-xs sm:text-sm">{product.rangeKm}km</span>
              </div>
              <div className="border-l border-gray-200">
                <span className="block text-[10px] uppercase font-bold text-gray-400">Motor</span>
                <span className="font-extrabold text-gray-900 text-xs sm:text-sm">{product.motorType}</span>
              </div>
              <div className="border-l border-gray-200">
                <span className="block text-[10px] uppercase font-bold text-gray-400">Speed</span>
                <span className="font-extrabold text-gray-900 text-xs sm:text-sm">25 km/h</span>
              </div>
              <div className="border-l border-gray-200">
                <span className="block text-[10px] uppercase font-bold text-gray-400">Payload</span>
                <span className="font-extrabold text-gray-900 text-xs sm:text-sm">{product.payloadKg}kg</span>
              </div>
            </div>

            {/* PRICING & BUY NOW PAY LATER */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-gray-900">
                  ${totalPrice.toLocaleString()} AUD
                </span>
                {product.compareAtPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ${(product.compareAtPrice * quantity).toLocaleString()}
                  </span>
                )}
              </div>

              {/* Crypto 10% discount badge - strictly Bitcoin and USDT */}
              <div className="inline-flex items-center gap-1.5 bg-emerald-100/70 border border-emerald-300 text-emerald-900 text-xs px-2.5 py-1 rounded-lg font-bold">
                <Coins className="w-3.5 h-3.5 text-amber-600" />
                <span>Crypto Price: ${cryptoPrice.toLocaleString()} AUD (Save 10% on Bitcoin & USDT)</span>
              </div>
            </div>

            {/* ADD-ON CROSS-SELL BUNDLE (HIGH TURNOVER ENGINE) */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-gray-800 block">
                Recommended Cross-Sell Add-On Bundles:
              </span>
              <div className="space-y-2">
                {COMMON_ADDONS.slice(0, 3).map((addon) => {
                  const isChecked = selectedAddOns.some(a => a.id === addon.id);
                  return (
                    <label
                      key={addon.id}
                      onClick={() => toggleAddOn(addon)}
                      className={`flex items-center justify-between p-2 rounded-xl border cursor-pointer text-xs transition-all ${
                        isChecked 
                          ? 'bg-emerald-50 border-[#2E6B4D] text-[#1E4733]' 
                          : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          readOnly
                          className="rounded text-[#2E6B4D] focus:ring-[#2E6B4D]"
                        />
                        <span className="font-bold">{addon.name}</span>
                      </div>
                      <span className="font-extrabold text-[#2E6B4D]">+${addon.price} AUD</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* QUANTITY & ADD TO CART CTA */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="cursor-pointer p-3 hover:bg-gray-100 text-gray-600 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 font-bold text-sm text-gray-900 min-w-8 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="cursor-pointer p-3 hover:bg-gray-100 text-gray-600 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleBuyNow}
                className="cursor-pointer flex-1 bg-[#2E6B4D] hover:bg-[#1E4733] text-white py-3.5 px-6 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 transition-all active:scale-95"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Buy now · ${totalPrice.toLocaleString()} AUD</span>
              </button>
              <button
                type="button"
                onClick={handleAddToCart}
                className="cursor-pointer border border-[#2E6B4D] bg-white text-[#1E4733] hover:bg-emerald-50 py-3.5 px-4 rounded-xl font-black text-sm transition-all"
              >
                Add to cart
              </button>
            </div>

            {/* DIRECT LINK TO FULL PRODUCT LANDING PAGE */}
            <button
              type="button"
              onClick={() => {
                viewProduct(product);
                setQuickViewProduct(null);
              }}
              className="cursor-pointer w-full border-2 border-[#2E6B4D] text-[#1E4733] hover:bg-emerald-50 py-3 px-4 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-2xs hover:shadow-xs active:scale-98"
            >
              <Eye className="w-4 h-4 text-[#2E6B4D]" />
              <span>Open Dedicated Product Landing Page (5 FAQs & Full Specs) →</span>
            </button>

            {/* ACCORDION SECTIONS */}
            <div className="space-y-2 pt-3 border-t border-gray-200">
              
              {/* 1. Full Specs */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setActiveAccordion(activeAccordion === 'specs' ? '' : 'specs')}
                  className="w-full text-left p-3 text-xs font-bold text-gray-900 bg-gray-50 flex items-center justify-between"
                >
                  <span>Full Technical Specifications</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeAccordion === 'specs' ? 'rotate-180' : ''}`} />
                </button>
                {activeAccordion === 'specs' && (
                  <div className="p-3 text-xs text-gray-600 space-y-1 bg-white">
                    <p><strong>Motor:</strong> {product.motor}</p>
                    <p><strong>Torque:</strong> {product.torqueNm} Nm</p>
                    <p><strong>Battery:</strong> {product.batterySpec} ({product.batteryWh}Wh)</p>
                    <p><strong>Brakes:</strong> {product.brakes}</p>
                    <p><strong>Gearing:</strong> {product.gears}</p>
                    <p><strong>Weight / Payload:</strong> {product.weightKg}kg / Max {product.payloadKg}kg</p>
                  </div>
                )}
              </div>

              {/* 2. Battery Safety Specs */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setActiveAccordion(activeAccordion === 'battery' ? '' : 'battery')}
                  className="w-full text-left p-3 text-xs font-bold text-gray-900 bg-gray-50 flex items-center justify-between"
                >
                  <span>Battery Safety & Thermal BMS</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeAccordion === 'battery' ? 'rotate-180' : ''}`} />
                </button>
                {activeAccordion === 'battery' && (
                  <div className="p-3 text-xs text-gray-600 space-y-1 bg-white">
                    <p>• Genuine Grade-A 21700 / 18650 Samsung or LG cells</p>
                    <p>• Smart Battery Management System (BMS) with over-voltage, under-voltage, and thermal runaway auto-shutoff</p>
                    <p>• IP65 water-resistant casing engineered for Australian rain and heat</p>
                  </div>
                )}
              </div>

              {/* 3. AU Legal Compliance */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setActiveAccordion(activeAccordion === 'legal' ? '' : 'legal')}
                  className="w-full text-left p-3 text-xs font-bold text-gray-900 bg-gray-50 flex items-center justify-between"
                >
                  <span>Australian Legal Compliance (EN15194)</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeAccordion === 'legal' ? 'rotate-180' : ''}`} />
                </button>
                {activeAccordion === 'legal' && (
                  <div className="p-3 text-xs text-gray-600 space-y-1 bg-white">
                    <p>• {product.auCompliance}</p>
                    <p>• 250W continuous power assistance; motor speed cut-off at 25 km/h</p>
                    <p>• 100% legal on public roads and shared paths across NSW, VIC, QLD, WA, SA, TAS, ACT, NT without driver licence or registration</p>
                  </div>
                )}
              </div>

              {/* 4. Shipping & 2-Year Warranty */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setActiveAccordion(activeAccordion === 'warranty' ? '' : 'warranty')}
                  className="w-full text-left p-3 text-xs font-bold text-gray-900 bg-gray-50 flex items-center justify-between"
                >
                  <span>Shipping & 2-Year Australian Warranty</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeAccordion === 'warranty' ? 'rotate-180' : ''}`} />
                </button>
                {activeAccordion === 'warranty' && (
                  <div className="p-3 text-xs text-gray-600 space-y-1 bg-white">
                    <p>• Dispatched securely pre-checked with included assembly manual and toolkit</p>
                    <p>• 2-Year Comprehensive frame warranty and 1-Year battery cell warranty supported by Australian technicians</p>
                    <p>• 14-day return policy on unused bikes in original packaging</p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
