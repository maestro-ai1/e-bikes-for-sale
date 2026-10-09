'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { Product, AddOnItem } from '@/lib/types';
import { PRODUCTS, BUSINESS_INFO } from '@/lib/data';
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Coins, 
  Star, 
  CheckCircle2, 
  ChevronRight, 
  ChevronDown,
  ShoppingBag, 
  MessageCircle, 
  Plus, 
  Minus, 
  Layers, 
  Zap, 
  BatteryCharging, 
  Gauge, 
  Compass, 
  Anchor,
  HelpCircle,
  Award,
  ArrowLeft,
  Check,
  Eye,
  Share2
} from 'lucide-react';

interface ProductLandingPageProps {
  initialProduct?: Product;
}

export default function ProductLandingPage({ initialProduct }: ProductLandingPageProps) {
  const { 
    selectedProduct, 
    viewProduct, 
    setCurrentView, 
    addToCart, 
    currentLocation,
    setNotification,
    toggleCompare,
    compareList
  } = useApp();

  const product = initialProduct || selectedProduct || PRODUCTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizeVariants?.[0]?.label || 'Standard');
  const [selectedAddOns, setSelectedAddOns] = useState<AddOnItem[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Price calculations
  const selectedVariantObj = product.sizeVariants?.find(v => v.label === selectedSize);
  const basePriceWithVariant = product.price + (selectedVariantObj?.priceDelta || 0);
  const addOnsTotal = selectedAddOns.reduce((sum, item) => sum + item.price, 0);
  const unitPrice = basePriceWithVariant + addOnsTotal;
  const totalPrice = unitPrice * quantity;
  const cryptoSavings = Math.round(totalPrice * (BUSINESS_INFO.cryptoDiscountPercentage / 100));
  const cryptoDiscountedPrice = totalPrice - cryptoSavings;

  const isCompared = compareList.some(p => p.id === product.id);

  const toggleAddOn = (addon: AddOnItem) => {
    if (selectedAddOns.some(a => a.id === addon.id)) {
      setSelectedAddOns(selectedAddOns.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddOns([...selectedAddOns, addon]);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedAddOns);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
      setNotification('Product link copied to clipboard!');
    }
  };

  const handleWhatsAppInquiry = () => {
    const waNumber = '61420128746';
    const msg = `G'day! I have an inquiry about the ${product.name} ($${product.price} AUD) listed on your website. Is it currently in stock for delivery to ${currentLocation.postcode}?`;
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  // Related products in the same or adjacent category
  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id && (p.category === product.category || p.brand === product.brand)).slice(0, 3);
  const fallbackRelated = relatedProducts.length > 0 ? relatedProducts : PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  // 5 FAQs guarantee
  const faqs = product.faqs && product.faqs.length >= 5 ? product.faqs : [
    {
      question: `Is the ${product.name} street legal across all Australian states and territories?`,
      answer: `Yes. The ${product.name} is fully certified under the Australian and European EN15194 standard for 250W pedelecs. It requires no registration, road tax, or driver's licence to ride in NSW, VIC, QLD, WA, SA, TAS, NT, or ACT.`
    },
    {
      question: `What real-world battery range and charging time can I expect?`,
      answer: `Depending on terrain, rider weight, and pedal-assist level, you can realistically expect ${product.rangeKm || 75} kilometres per charge. Full recharge from empty takes approximately 4-5 hours using the included Australian 240V smart charger.`
    },
    {
      question: `How does delivery to Australian metropolitan and regional postcodes work?`,
      answer: `Every ${product.name} is pre-assembled, inspected by certified Australian e-bike technicians, and packed in double-walled export cartons. Transit time is 2-5 business days across Australian metropolitan and regional delivery zones with full transit tracking.`
    },
    {
      question: `Can I save 10% by paying with cryptocurrency on this product?`,
      answer: `Yes! We provide an automatic 10% discount on the ${product.name} when completing checkout with Bitcoin or USDT. Simply select 'Pay With Crypto' at cart checkout to claim instant savings of $${cryptoSavings} AUD.`
    },
    {
      question: `What warranty coverage and local Australian spare parts support are included?`,
      answer: `All our electric bicycles and accessories include a comprehensive 2-Year Australian manufacturer warranty covering frame, motor, controller, display, and battery cells. Replacement parts and accessories are stocked locally in Australia.`
    }
  ];

  return (
    <div className="bg-white text-gray-900 pb-20">
      
      {/* 1. BREADCRUMBS & TOP NAV */}
      <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between text-xs text-gray-500">
          <ol className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap">
            <li>
              <button 
                onClick={() => { setCurrentView('home'); window.history.pushState(null, '', '/'); }}
                className="hover:text-[#2E6B4D] font-semibold transition-colors cursor-pointer"
              >
                Home
              </button>
            </li>
            <li><ChevronRight className="w-3.5 h-3.5 text-gray-400" /></li>
            <li>
              <button 
                onClick={() => { setCurrentView('shop'); window.history.pushState(null, '', '/shop'); }}
                className="hover:text-[#2E6B4D] font-semibold transition-colors cursor-pointer"
              >
                E-Bikes Shop
              </button>
            </li>
            <li><ChevronRight className="w-3.5 h-3.5 text-gray-400" /></li>
            <li>
              <span className="capitalize">{product.categoryLabel}</span>
            </li>
            <li><ChevronRight className="w-3.5 h-3.5 text-gray-400" /></li>
            <li aria-current="page" className="font-bold text-gray-900 truncate max-w-xs">
              {product.name}
            </li>
          </ol>

          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={handleShare}
              className="cursor-pointer inline-flex items-center gap-1.5 text-xs text-gray-600 hover:text-[#2E6B4D] font-semibold transition-colors"
              title="Copy product link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Copied Link!' : 'Share'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* 2. MAIN HERO PRODUCT SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT: GALLERY & IMAGES (7 COLS) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Primary Image Viewport (Strict 4:3 Aspect Ratio) */}
            <div className="relative aspect-4/3 w-full bg-gray-50 rounded-3xl overflow-hidden border border-gray-200/80 shadow-md group">
              <Image
                src={product.gallery?.[activeImageIndex] || product.image}
                alt={`${product.name} - Australian Street Legal Electric Bike`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
              />

              {/* Status Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {product.badge && (
                  <span className="bg-[#1E4733] text-white text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                    {product.badge}
                  </span>
                )}
                <span className="bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>EN15194 Certified</span>
                </span>
              </div>

              {/* In-Stock Indicator */}
              <div className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-full shadow-xs border border-gray-200 flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>In Stock ({product.stockCount} units available)</span>
              </div>
            </div>

            {/* Thumbnail Row */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`cursor-pointer relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 bg-gray-50 ${
                      activeImageIndex === idx 
                        ? 'border-[#2E6B4D] ring-2 ring-emerald-500/30 scale-105' 
                        : 'border-gray-200 hover:border-gray-400 opacity-80'
                    }`}
                  >
                    <Image
                      src={imgUrl}
                      alt={`${product.name} view ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Highlight Metric Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200/80 text-center">
                <Zap className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                <span className="text-[11px] uppercase font-bold text-gray-500 block">Motor Output</span>
                <span className="text-sm font-black text-gray-900">{product.motor || '250W Pedelec'}</span>
              </div>

              <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200/80 text-center">
                <BatteryCharging className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                <span className="text-[11px] uppercase font-bold text-gray-500 block">Battery Pack</span>
                <span className="text-sm font-black text-gray-900">{product.batteryWh ? `${product.batteryWh}Wh Samsung` : 'Lithium Grade A'}</span>
              </div>

              <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200/80 text-center">
                <Gauge className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                <span className="text-[11px] uppercase font-bold text-gray-500 block">Max Range</span>
                <span className="text-sm font-black text-gray-900">{product.rangeKm ? `${product.rangeKm} km` : '85 km'}</span>
              </div>

              <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200/80 text-center">
                <ShieldCheck className="w-5 h-5 text-[#2E6B4D] mx-auto mb-1" />
                <span className="text-[11px] uppercase font-bold text-gray-500 block">AU Road Legal</span>
                <span className="text-sm font-black text-[#1E4733]">25 km/h Cutoff</span>
              </div>
            </div>

          </div>

          {/* RIGHT: CONVERSION PURCHASE SUITE (5 COLS) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Brand & Reviews */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#2E6B4D]">
                  {product.brand} • {product.categoryLabel}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-amber-600 font-bold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{product.rating}</span>
                  <span className="text-gray-400">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* EXACT H1 TAG FOR OPTIMAL ON-PAGE SEO */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight leading-tight">
                {product.name}
              </h1>

              <p className="text-sm sm:text-base text-gray-600 mt-2 leading-relaxed">
                {product.shortDescription || product.subtitle}
              </p>
            </div>

            {/* Pricing Box */}
            <div className="bg-gray-50 p-4 sm:p-5 rounded-2xl border border-gray-200 space-y-3">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-gray-900">
                  ${totalPrice.toLocaleString()} AUD
                </span>
                {product.compareAtPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    ${(product.compareAtPrice * quantity).toLocaleString()} AUD
                  </span>
                )}
                {product.compareAtPrice && (
                  <span className="bg-rose-100 text-rose-800 text-xs font-black px-2 py-0.5 rounded-md">
                    Save ${((product.compareAtPrice - product.price) * quantity).toLocaleString()} AUD
                  </span>
                )}
              </div>

              {/* 10% Crypto Discount Badge (Bitcoin & USDT Only) */}
              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <span className="font-extrabold text-emerald-950 block">Pay with Crypto (Save 10%)</span>
                    <span className="text-emerald-800">Only ${cryptoDiscountedPrice.toLocaleString()} AUD via Bitcoin & USDT</span>
                  </div>
                </div>
                <span className="font-mono font-black text-emerald-700 bg-emerald-100/80 px-2 py-1 rounded-md">
                  -${cryptoSavings}
                </span>
              </div>
            </div>

            {/* Frame Size / Variant Selector */}
            {product.sizeVariants && product.sizeVariants.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-900">Select Frame Size & Spec:</span>
                  <span className="text-gray-500">{selectedSize}</span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {product.sizeVariants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedSize(variant.label)}
                      className={`cursor-pointer p-3 rounded-xl border text-xs font-semibold text-left transition-all flex items-center justify-between ${
                        selectedSize === variant.label
                          ? 'border-[#2E6B4D] bg-emerald-50/50 text-[#1E4733] ring-1 ring-[#2E6B4D]'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                      }`}
                    >
                      <span>{variant.label}</span>
                      {variant.priceDelta > 0 && (
                        <span className="text-gray-500 font-normal">
                          +${variant.priceDelta} AUD
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Optional Accessory Bundles */}
            {product.recommendedAddOns && product.recommendedAddOns.length > 0 && (
              <div className="space-y-2.5 pt-2 border-t border-gray-100">
                <span className="text-xs font-bold text-gray-900 block">
                  Frequently Bundled Accessories:
                </span>
                <div className="space-y-2">
                  {product.recommendedAddOns.map((addon) => {
                    const isSelected = selectedAddOns.some(a => a.id === addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddOn(addon)}
                        className={`cursor-pointer p-2.5 rounded-xl border text-xs transition-all flex items-center justify-between ${
                          isSelected 
                            ? 'border-emerald-500 bg-emerald-50/40 text-emerald-950 ring-1 ring-emerald-500' 
                            : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-[#2E6B4D] border-[#2E6B4D] text-white' : 'border-gray-300'
                          }`}>
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                          <div>
                            <span className="font-bold block">{addon.name}</span>
                            <span className="text-[11px] text-gray-500">{addon.description}</span>
                          </div>
                        </div>
                        <span className="font-bold text-[#2E6B4D] shrink-0">
                          +${addon.price}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Add To Cart Button */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                
                {/* Stepper */}
                <div className="flex items-center border border-gray-300 rounded-xl bg-gray-50 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="cursor-pointer p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-white transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-black text-sm text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="cursor-pointer p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-white transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Primary Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="cursor-pointer flex-1 bg-[#2E6B4D] hover:bg-[#1E4733] text-white py-3.5 px-6 rounded-xl font-black text-sm transition-all shadow-lg hover:shadow-xl active:scale-98 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart — ${totalPrice.toLocaleString()} AUD</span>
                </button>
              </div>

              {/* Secondary WhatsApp Direct Order Button */}
              <button
                onClick={handleWhatsAppInquiry}
                className="cursor-pointer w-full bg-emerald-50 hover:bg-emerald-100/80 text-[#1E4733] border border-emerald-300 py-3 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Enquire or Order via WhatsApp ({BUSINESS_INFO.whatsapp})</span>
              </button>
            </div>

            {/* Fast Dispatch & Shipping Guarantee */}
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-gray-800 font-bold">
                <Truck className="w-4 h-4 text-[#2E6B4D] shrink-0" />
                <span>Fast Nationwide Delivery to {currentLocation.city} ({currentLocation.postcode})</span>
              </div>
              <p className="text-gray-500 pl-6 leading-relaxed">
                Dispatches within 24-48 hours. Fully insured courier transit with pre-delivery technician safety inspection.
              </p>
              <div className="flex items-center gap-4 pl-6 text-[11px] text-gray-500 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  2-Year AU Warranty
                </span>
                <span className="flex items-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
                  30-Day Returns
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. OPTIMIZED H2 SECTION: IN-DEPTH PRODUCT OVERVIEW & ROAD-LEGAL ENGINEERING */}
      <section className="bg-gray-50 py-16 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-black uppercase tracking-wider text-[#2E6B4D]">
              Engineering Excellence
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1">
              Key Features & Road-Legal Australian Engineering
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.features?.map((feat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2E6B4D] flex items-center justify-center shrink-0 font-black">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-gray-900 mb-1">
                    {feat.split('(')[0].trim()}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {feat.includes('(') ? feat.substring(feat.indexOf('(')) : 'Precision tuned for durability across Australian coastal humidity and rugged terrain.'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. OPTIMIZED H2 SECTION: TECHNICAL SPECIFICATIONS GRID */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-black uppercase tracking-wider text-[#2E6B4D]">
            Verified Benchmark Data
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1">
            Technical Specifications & Performance Ratings
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Certified to Australian Standards EN15194 • Zero vehicle registration required
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 text-xs">
            
            {/* Column 1 */}
            <div className="divide-y divide-gray-100">
              <div className="flex items-center justify-between p-4 bg-gray-50/50">
                <span className="font-bold text-gray-600">Continuous Motor Power</span>
                <span className="font-mono font-bold text-gray-900">{product.motor || '250W Continuous Rated'}</span>
              </div>
              <div className="flex items-center justify-between p-4">
                <span className="font-bold text-gray-600">Peak Hill-Climb Torque</span>
                <span className="font-mono font-bold text-gray-900">{product.torqueNm} Nm Dynamic Torque</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50/50">
                <span className="font-bold text-gray-600">Battery Capacity (Wh)</span>
                <span className="font-mono font-bold text-gray-900">{product.batteryWh ? `${product.batteryWh} Wh` : '540 Wh High Capacity'}</span>
              </div>
              <div className="flex items-center justify-between p-4">
                <span className="font-bold text-gray-600">Cell Chemistry & Specification</span>
                <span className="font-semibold text-gray-900 text-right">{product.batterySpec}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50/50">
                <span className="font-bold text-gray-600">Australian Top Assisted Speed</span>
                <span className="font-mono font-bold text-emerald-800">25 km/h (EN15194 Compliant)</span>
              </div>
              <div className="flex items-center justify-between p-4">
                <span className="font-bold text-gray-600">Maximum Range (Eco Mode)</span>
                <span className="font-mono font-bold text-gray-900">{product.rangeKm ? `${product.rangeKm} km` : '85 km'}</span>
              </div>
            </div>

            {/* Column 2 */}
            <div className="divide-y divide-gray-100">
              <div className="flex items-center justify-between p-4 bg-gray-50/50">
                <span className="font-bold text-gray-600">Frame Architecture</span>
                <span className="font-semibold text-gray-900">{product.frameType} Hydroformed Alloy</span>
              </div>
              <div className="flex items-center justify-between p-4">
                <span className="font-bold text-gray-600">Total Net Weight</span>
                <span className="font-mono font-bold text-gray-900">{product.weightKg ? `${product.weightKg} kg` : '21.5 kg'}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50/50">
                <span className="font-bold text-gray-600">Maximum Payload Capacity</span>
                <span className="font-mono font-bold text-gray-900">{product.payloadKg} kg (Rider + Gear)</span>
              </div>
              <div className="flex items-center justify-between p-4">
                <span className="font-bold text-gray-600">Braking System</span>
                <span className="font-semibold text-gray-900 text-right">{product.brakes}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50/50">
                <span className="font-bold text-gray-600">Drivetrain & Gearing</span>
                <span className="font-semibold text-gray-900">{product.gears}</span>
              </div>
              <div className="flex items-center justify-between p-4">
                <span className="font-bold text-gray-600">Australian Standard Compliance</span>
                <span className="font-bold text-emerald-800 text-right">{product.auCompliance}</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. MANDATORY 5 FAQS ACCORDION (OPTIMIZED H2) */}
      <section className="bg-gray-50 py-16 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-black uppercase tracking-wider text-[#2E6B4D] inline-block mb-1">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {product.name} — 5 Top Customer FAQs
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-xl mx-auto">
              Straight answers to key questions regarding Australian road legality, charging, battery range, and maintenance.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="cursor-pointer w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-gray-900 hover:text-[#2E6B4D] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#2E6B4D]' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Additional Help Callout */}
          <div className="mt-8 text-center bg-white p-6 rounded-2xl border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <h3 className="font-extrabold text-sm text-gray-900">Have a custom sizing or technical question?</h3>
              <p className="text-xs text-gray-500 mt-0.5">Our Australian technicians are ready to advise on suitability for your commute.</p>
            </div>
            <button
              onClick={handleWhatsAppInquiry}
              className="cursor-pointer bg-[#25D366] hover:bg-[#20ba5a] text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-xs"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Ask on WhatsApp</span>
            </button>
          </div>
        </div>
      </section>

      {/* 6. RELATED PRODUCTS RECOMMENDED */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-[#2E6B4D]">
              Explore Options
            </span>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight mt-1">
              Related Electric Bicycles & Recommended Gear
            </h2>
          </div>
          <button
            onClick={() => { setCurrentView('shop'); window.history.pushState(null, '', '/shop'); }}
            className="cursor-pointer text-xs font-bold text-[#2E6B4D] hover:underline"
          >
            View Full Catalogue →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fallbackRelated.map((rel) => {
            const relSavings = Math.round(rel.price * (BUSINESS_INFO.cryptoDiscountPercentage / 100));
            return (
              <div 
                key={rel.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-[#2E6B4D] hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-4/3 w-full bg-gray-50 p-4">
                  <Image
                    src={rel.image}
                    alt={rel.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain p-2"
                  />
                  {rel.badge && (
                    <span className="absolute top-3 left-3 bg-[#1E4733] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {rel.badge}
                    </span>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase text-[#2E6B4D] block">
                      {rel.categoryLabel}
                    </span>
                    <h3 className="font-extrabold text-base text-gray-900 leading-snug mt-1 hover:text-[#2E6B4D] transition-colors cursor-pointer"
                        onClick={() => viewProduct(rel)}>
                      {rel.name}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                      {rel.shortDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="font-black text-lg text-gray-900 block">
                        ${rel.price.toLocaleString()} AUD
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700">
                        Save ${relSavings} with Crypto
                      </span>
                    </div>

                    <button
                      onClick={() => viewProduct(rel)}
                      className="cursor-pointer bg-[#2E6B4D] hover:bg-[#1E4733] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
