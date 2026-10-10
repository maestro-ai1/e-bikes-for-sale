'use client';

import React, { useState, useMemo } from 'react';
import SafeImage from '@/components/SafeImage';
import { useApp } from '@/context/AppContext';
import { PRODUCTS, SCOOTER_PAGE_CONFIG, BUSINESS_INFO } from '@/lib/data';
import { Product } from '@/lib/types';
import { 
  Zap, 
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
  ChevronDown
} from 'lucide-react';

export default function ScootersLandingPage() {
  const { 
    viewProduct, 
    setQuickViewProduct, 
    addToCart, 
    setCurrentView,
    subcategoryFilter,
    setSubcategoryFilter
  } = useApp();

  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // All scooter products
  const scooterProducts = useMemo(() => {
    return PRODUCTS.filter(p => p.category === 'scooters');
  }, []);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return scooterProducts.filter((product) => {
      if (selectedSubcategory !== 'all') {
        const match = product.subcategory?.toLowerCase() === selectedSubcategory.toLowerCase();
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
  }, [scooterProducts, selectedSubcategory, maxPrice, sortBy]);

  const SCOOTER_FAQS = [
    {
      q: 'Are electric scooters legal to ride in Queensland, Victoria, and other Australian states?',
      a: 'Yes, but rules vary by jurisdiction. In Queensland, personal mobility devices (PMDs) capped at 25 km/h are legal on footpaths (up to 12 km/h) and shared paths/local roads with speed limits under 50 km/h (up to 25 km/h). In Victoria, an ongoing legal PMD framework permits riders 16+ wearing an AS/NZS 2063 helmet on shared paths and roads capped at 50 km/h. Helmets and working front/rear lights are mandatory nationwide.'
    },
    {
      q: 'What is the difference between Kids Scooters and Adult Commuter Scooters?',
      a: 'Kids scooters feature stable 3-wheel tripod geometry, intuitive lean-to-steer controls and a lightweight frame, often with a restricted speed cap. Adult commuter scooters feature larger pneumatic tyres, higher weight capacities, dual braking and bigger batteries engineered for adult daily transit.'
    },
    {
      q: 'Do I need a driver licence or vehicle registration to ride an electric scooter in Australia?',
      a: 'No. Across all Australian states that permit personal mobility devices on public infrastructure, no driver licence, learner permit, or vehicle registration is required. You must, however, observe posted speed limits, ride sober, and obey traffic lights.'
    },
    {
      q: 'How do I protect my electric scooter against theft in Australian cities?',
      a: 'We strongly recommend a Sold Secure or hardened alloy folding U-lock that secures the scooter frame stem directly to a fixed council bicycle rack or solid pole. Avoid thin cable locks which can be snipped in seconds.'
    },
    {
      q: 'What warranty is included on scooters and electrical components?',
      a: 'All our scooters include a 1-Year comprehensive Australian manufacturer warranty on the motor, frame, battery, and controller, backed by fast local dispatch of replacement tubes, chargers, and parts from our Australian hubs.'
    }
  ];

  return (
    <div className="bg-white min-h-screen text-gray-900">
      
      {/* 1. BREADCRUMBS */}
      <div className="bg-gray-50 border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-2 text-xs text-gray-500">
          <button 
            onClick={() => { setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="hover:text-[#2E6B4D] cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="font-semibold text-gray-800">Scooters</span>
          {selectedSubcategory !== 'all' && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-[#2E6B4D] font-bold">{selectedSubcategory}</span>
            </>
          )}
        </div>
      </div>

      {/* 2. HERO - ONE H1 */}
      <section className="bg-gradient-to-br from-gray-900 via-[#1E4733] to-gray-950 text-white py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Personal Mobility & Youth Recreation</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Electric Scooters & Scooters for Sale Australia
          </h1>

          <p className="text-sm sm:text-base text-gray-200 max-w-3xl leading-relaxed">
            Shop Australia&apos;s finest selection of street-compliant adult commuter electric scooters, safe 3-wheel lean-to-steer kids scooters, and heavy-duty scooter security locks. 
            Enjoy free metro delivery on orders over $1,500 and an <strong>extra 10% discount when paying with Bitcoin or USDT</strong>.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 max-w-3xl">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/10 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>State Compliant 25 km/h</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/10 text-xs">
              <Truck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Fast Metro Dispatch</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/10 text-xs">
              <Coins className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>10% Off Bitcoin & USDT</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/10 text-xs">
              <Star className="w-4 h-4 text-amber-300 shrink-0" />
              <span>1-Year AU Local Warranty</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SUBCATEGORIES FILTER BAR (EXACT 4 SUBCATEGORIES) */}
      <section className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2E6B4D]">
              Scooter Categories
            </span>
            {selectedSubcategory !== 'all' && (
              <button
                onClick={() => setSelectedSubcategory('all')}
                className="text-xs text-red-600 font-semibold hover:underline cursor-pointer"
              >
                Clear Filter
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setSelectedSubcategory('all')}
              className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedSubcategory === 'all'
                  ? 'bg-[#2E6B4D] text-white shadow-xs'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Scooters ({scooterProducts.length})
            </button>
            {SCOOTER_PAGE_CONFIG.subcategories.map((sub) => {
              const isActive = selectedSubcategory.toLowerCase() === sub.toLowerCase();
              return (
                <button
                  key={sub}
                  onClick={() => setSelectedSubcategory(isActive ? 'all' : sub)}
                  className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#2E6B4D] text-white shadow-xs ring-2 ring-[#2E6B4D]'
                      : 'bg-white border border-gray-200 text-gray-700 hover:border-emerald-300 hover:bg-emerald-50/50'
                  }`}
                >
                  <span>{sub}</span>
                  {isActive && <Check className="w-3.5 h-3.5" />}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. PRODUCTS GRID */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-black text-gray-900">
              {selectedSubcategory !== 'all' ? selectedSubcategory : 'All Electric & Kick Scooters'}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Showing {filteredProducts.length} models ready for dispatch across Australia
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-gray-600">Sort By:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs border border-gray-300 rounded-xl px-3 py-2 bg-white font-semibold text-gray-800 focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rating</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const cryptoDiscountPrice = Math.round(product.price * (1 - BUSINESS_INFO.cryptoDiscountPercentage / 100));
            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-emerald-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div 
                    className="relative aspect-4/3 w-full bg-white overflow-hidden cursor-pointer"
                    onClick={() => viewProduct(product)}
                  >
                    <SafeImage
                      src={product.image}
                      alt={`${product.name} scooter Australia`}
                width={600}
                height={600}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                      {product.badge && (
                        <span className="bg-[#1E4733] text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full shadow-xs uppercase">
                          {product.badge}
                        </span>
                      )}
                      <span className="bg-amber-400 text-black font-extrabold text-[10px] px-2 py-0.5 rounded-md shadow-xs">
                        10% Crypto Discount
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(product);
                      }}
                      className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-xl shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <Eye className="w-4 h-4 text-[#2E6B4D]" />
                    </button>
                  </div>

                  <div className="p-4 space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] text-gray-500">
                      <span className="font-bold text-[#2E6B4D]">{product.brand}</span>
                      <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-semibold text-[10px]">
                        {product.subcategory}
                      </span>
                    </div>

                    <h3 
                      onClick={() => viewProduct(product)}
                      className="font-bold text-gray-900 text-sm group-hover:text-[#2E6B4D] transition-colors cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>

                    <p className="text-xs text-gray-500 line-clamp-2">
                      {product.shortDescription}
                    </p>

                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-gray-800">{product.rating}</span>
                      <span className="text-gray-400">({product.reviewsCount} reviews)</span>
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-black text-gray-900">
                          ${product.price.toLocaleString()} AUD
                        </span>
                        {product.compareAtPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            ${product.compareAtPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-semibold mt-1">
                        Crypto: <strong>${cryptoDiscountPrice.toLocaleString()} AUD</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => viewProduct(product)}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold py-2.5 rounded-xl transition-colors cursor-pointer text-center"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="w-full bg-[#1E4733] hover:bg-[#2E6B4D] text-white text-xs font-bold py-2.5 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. BUYING GUIDE & LAWS */}
      <section className="bg-gray-50 py-16 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#2E6B4D]">Australian Regulations</span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1">
              Australian Electric Scooter Road Laws & Safety Guide
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
              Personal mobility devices offer immense transit flexibility across Australian cities. 
              Always wear an AS/NZS 2063 certified bicycle helmet, obey 12 km/h limits on shared footpaths where pedestrians are present, and ensure your scooter is equipped with a working bell and front/rear reflectors.
            </p>
          </div>
        </div>
      </section>

      {/* 6. FAQS */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2E6B4D]">Knowledge Base</span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Frequently Asked Questions (Scooters Australia)
          </h2>
        </div>

        <div className="space-y-3">
          {SCOOTER_FAQS.map((faq, i) => {
            const isOpen = openFaqIndex === i;
            return (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-gray-900 text-sm sm:text-base hover:text-[#2E6B4D] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-[#2E6B4D] shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SCHEMA.ORG FAQPAGE */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: SCOOTER_FAQS.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: f.a
              }
            }))
          })
        }}
      />
    </div>
  );
}
