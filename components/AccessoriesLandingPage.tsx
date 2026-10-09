'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { PRODUCTS, BUSINESS_INFO } from '@/lib/data';
import { Product } from '@/lib/types';
import { 
  ShieldCheck, 
  Truck, 
  Coins, 
  Star, 
  ChevronRight, 
  Filter, 
  Eye, 
  ShoppingBag, 
  Check, 
  HelpCircle, 
  RotateCcw,
  SlidersHorizontal,
  ChevronDown,
  Lock,
  Lightbulb,
  Package
} from 'lucide-react';

export default function AccessoriesLandingPage() {
  const { 
    viewProduct, 
    setQuickViewProduct, 
    addToCart, 
    setCurrentView,
    subcategoryFilter,
    setSubcategoryFilter
  } = useApp();

  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Subcategories for accessories (NO batteries as requested)
  const accessorySubcategories = [
    'Helmets & Protection',
    'Bike Locks & Security',
    'Bicycle Lights & Visibility',
    'Bags, Baskets & Panniers',
    'Phone Mounts & Tech',
    'Pumps & Workshop Tools'
  ];

  // All accessories & helmets products
  const accessoryProducts = useMemo(() => {
    return PRODUCTS.filter(p => p.category === 'accessories' || p.category === 'helmets');
  }, []);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return accessoryProducts.filter((product) => {
      if (selectedSubcategory !== 'all') {
        const match = 
          product.subcategory?.toLowerCase() === selectedSubcategory.toLowerCase() ||
          product.categoryLabel?.toLowerCase() === selectedSubcategory.toLowerCase();
        if (!match) return false;
      }
      if (product.price > maxPrice) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [accessoryProducts, selectedSubcategory, maxPrice, sortBy]);

  const faqs = [
    {
      question: 'Are all your bicycle helmets certified to Australian Standard AS/NZS 2063:2008?',
      answer: 'Yes. Every bicycle and e-bike helmet we sell carries strict AS/NZS 2063:2008 certification, verified by SAI Global or five-tick Australian standards labels. Riding an uncertified helmet on Australian roads incurs state fines.'
    },
    {
      question: 'What lock security rating is recommended for electric bikes in Australia?',
      answer: 'We recommend Sold Secure Diamond or Gold standard U-locks (such as Kryptonite New York Series or heavy hardened steel shackle locks). Insurance companies typically require a Sold Secure rated lock when covering bikes over $2,000 AUD.'
    },
    {
      question: 'Are rechargeable LED bike lights legal on Australian roads?',
      answer: 'Yes. State road rules require a visible white front light (visible from 200m) and a red rear light (visible from 200m) with red reflector when riding at night or in low light conditions. Flashing or steady modes are legally permitted in all states.'
    },
    {
      question: 'Can pannier bags and racks fit step-through and fat tyre electric bikes?',
      answer: 'Yes. Most of our rear panniers use adjustable QL2.1 quick-release mounting hooks that clamp securely onto standard 8mm to 16mm tubing on Australian commuter, fat tyre, and cargo e-bike racks.'
    },
    {
      question: 'How does the 10% Crypto payment discount apply to accessories?',
      answer: 'When you select Bitcoin (BTC) or USDT at checkout, our system automatically recalculates the total order amount with a 10% instant discount applied to all gear and accessories.'
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* 1. BREADCRUMB */}
      <div className="bg-gray-50 border-b border-gray-200 text-xs py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-gray-500">
          <button 
            onClick={() => { setCurrentView('home'); window.history.pushState(null, '', '/'); }}
            className="hover:text-emerald-800 transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="font-semibold text-gray-900">Accessories</span>
        </div>
      </div>

      {/* 2. HERO BANNER */}
      <section className="bg-gradient-to-r from-gray-950 via-slate-900 to-[#1E4733] text-white py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full">
              <Package className="w-3.5 h-3.5" />
              <span>Certified Safety Gear & Australian Essentials</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Bicycle & E-Bike Accessories for Sale Australia
            </h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Equip your daily commute and weekend trail adventures. AS/NZS 2063 certified helmets, diamond-rated anti-theft U-locks, USB-C rechargeable lights, waterproof panniers, and workshop tools.
            </p>

            {/* TRUST PILLS */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 bg-white/10 text-white text-xs px-3 py-1.5 rounded-lg font-medium backdrop-blur-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                AS/NZS 2063 Certified
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 text-white text-xs px-3 py-1.5 rounded-lg font-medium backdrop-blur-xs">
                <Truck className="w-3.5 h-3.5 text-emerald-400" />
                Fast Australian Dispatch
              </span>
              <span className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 text-xs px-3 py-1.5 rounded-lg font-bold border border-amber-400/30">
                <Coins className="w-3.5 h-3.5" />
                10% Crypto Discount
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SUBCATEGORY PILLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 border-b border-gray-200">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => setSelectedSubcategory('all')}
            className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedSubcategory === 'all'
                ? 'bg-[#2E6B4D] text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Accessories ({accessoryProducts.length})
          </button>
          {accessorySubcategories.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubcategory(sub)}
              className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedSubcategory.toLowerCase() === sub.toLowerCase()
                  ? 'bg-[#2E6B4D] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </section>

      {/* 4. PRODUCTS CATALOG */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <div className="text-xs text-gray-500 font-semibold">
            Showing <strong className="text-gray-900">{filteredProducts.length}</strong> accessories
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 font-bold text-gray-800"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-gray-50 rounded-2xl p-12 text-center text-gray-500">
            <Package className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="font-bold text-sm text-gray-800">No accessories match this filter.</p>
            <button
              onClick={() => { setSelectedSubcategory('all'); setMaxPrice(1000); }}
              className="mt-3 text-xs font-bold text-[#2E6B4D] hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const cryptoPrice = Math.round(product.price * (1 - BUSINESS_INFO.cryptoDiscountPercentage / 100));
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all flex flex-col group"
                >
                  <div className="relative aspect-4/3 bg-gray-50 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {product.badge && (
                      <span className="absolute top-2.5 left-2.5 bg-[#2E6B4D] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-xs">
                        {product.badge}
                      </span>
                    )}
                    <span className="absolute top-2.5 right-2.5 bg-amber-400 text-gray-900 text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs">
                      10% Crypto Off
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                        {product.brand} • {product.subcategory || product.categoryLabel}
                      </div>
                      <h3 
                        onClick={() => viewProduct(product)}
                        className="font-bold text-sm text-gray-900 hover:text-[#2E6B4D] transition-colors line-clamp-2 cursor-pointer"
                      >
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {product.shortDescription}
                      </p>
                    </div>

                    <div className="pt-4 mt-3 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <div className="text-base font-black text-gray-900">
                          ${product.price.toLocaleString()} AUD
                        </div>
                        <div className="text-[11px] font-bold text-amber-600">
                          ${cryptoPrice.toLocaleString()} with Crypto
                        </div>
                      </div>
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="cursor-pointer bg-[#2E6B4D] hover:bg-[#24543d] text-white p-2.5 rounded-xl transition-colors shadow-xs"
                        aria-label={`Add ${product.name} to cart`}
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 5. EDUCATIONAL SEO COPY */}
      <section className="bg-gray-50 py-16 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
              Essential Cycling Accessories for Australian Commuters & Road Legality
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-3">
              Riding safely and legally on Australian roads requires certified equipment. Wearing an approved helmet compliant with AS/NZS 2063:2008 is legally compulsory in every Australian state and territory. Our range features MIPS safety liners, high-visibility reflective detailing, and integrated rechargeable LED indicator lights for maximum night visibility.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
              Anti-Theft Security: Sold Secure Diamond E-Bike U-Locks
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-3">
              High-value electric bicycles require heavy-duty deterrence against angle-grinder theft and hydraulic bolt-cutters. We stock double-deadbolt hardened steel shackles and disc-style cylinder locks designed to secure your frame and rear wheel to street posts and cycle parking hoops.
            </p>
          </div>
        </div>
      </section>

      {/* 6. 5 FAQS ACCORDION */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <span className="text-xs font-black uppercase tracking-wider text-[#2E6B4D]">
            Helpful Information
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1">
            Frequently Asked Questions — Bicycle & E-Bike Accessories
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between font-bold text-sm sm:text-base text-gray-900 hover:text-[#2E6B4D] transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180 text-[#2E6B4D]' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-gray-600 border-t border-gray-100 pt-3 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
