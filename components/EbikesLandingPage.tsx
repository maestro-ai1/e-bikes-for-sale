'use client';

import React, { useState, useMemo } from 'react';
import SafeImage from '@/components/SafeImage';
import { useApp } from '@/context/AppContext';
import { PRODUCTS, EBIKES_PAGE_CATEGORIES, BUSINESS_INFO } from '@/lib/data';
import { Product } from '@/lib/types';
import { 
  Zap, 
  ShieldCheck, 
  Truck, 
  Coins, 
  Star, 
  ChevronRight, 
  Filter, 
  SlidersHorizontal, 
  Eye, 
  ShoppingBag, 
  Check, 
  HelpCircle, 
  RotateCcw,
  Sparkles,
  Compass,
  ArrowRight,
  Info,
  ChevronDown
} from 'lucide-react';

const EBIKE_CATEGORY_IDS = ['emtb', 'folding', 'cruiser', 'fat-tyre', 'cargo', 'road', 'commuter'];

export default function EbikesLandingPage() {
  const { 
    viewProduct, 
    setQuickViewProduct, 
    addToCart, 
    setCurrentView,
    setCategoryFilter,
    subcategoryFilter,
    setSubcategoryFilter
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedMotorType, setSelectedMotorType] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(6000);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // All e-bike products
  const ebikeProducts = useMemo(() => {
    return PRODUCTS.filter(p => EBIKE_CATEGORY_IDS.includes(p.category));
  }, []);

  // Filtered products based on activeCategory, subcategory, motor type, price, etc.
  const filteredProducts = useMemo(() => {
    return ebikeProducts.filter((product) => {
      // Category filter
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }
      // Subcategory filter
      if (subcategoryFilter !== 'all') {
        const subMatch = product.subcategory?.toLowerCase() === subcategoryFilter.toLowerCase() ||
                         product.subcategoryId?.toLowerCase() === subcategoryFilter.toLowerCase();
        if (!subMatch) return false;
      }
      // Motor type
      if (selectedMotorType !== 'all' && product.motorType !== selectedMotorType) {
        return false;
      }
      // Max price
      if (product.price > maxPrice) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'range') return b.rangeKm - a.rangeKm;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [ebikeProducts, activeCategory, subcategoryFilter, selectedMotorType, maxPrice, sortBy]);

  // Handle category tile click
  const handleCategorySelect = (categoryId: string) => {
    if (activeCategory === categoryId) {
      setActiveCategory('all');
      setSubcategoryFilter('all');
    } else {
      setActiveCategory(categoryId);
      setSubcategoryFilter('all');
    }
  };

  // Subcategories to display (if eMTB active, show eMTB subcategories; if All, show eMTB subcategories by default)
  const currentCategoryData = EBIKES_PAGE_CATEGORIES.find(c => c.id === activeCategory);
  const subcategoriesToShow = currentCategoryData 
    ? currentCategoryData.subcategories 
    : EBIKES_PAGE_CATEGORIES[0].subcategories; // default to eMTB subcategories

  const resetAllFilters = () => {
    setActiveCategory('all');
    setSubcategoryFilter('all');
    setSelectedMotorType('all');
    setMaxPrice(6000);
    setSortBy('featured');
  };

  const EBIKE_FAQS = [
    {
      q: 'Are all electric bikes sold on this site 100% street-legal in Australia?',
      a: 'Yes, absolutely. Every electric bicycle in our catalog complies strictly with the Australian EN15194 Pedelec standard. They are equipped with 250W continuous rated motors and automatic 25 km/h motor assist cutoffs, making them completely street-legal on public roads, bicycle lanes, and shared council paths across NSW, VIC, QLD, WA, SA, TAS, ACT, and NT without vehicle registration, road tax, or a driver licence.'
    },
    {
      q: 'What is the key difference between an Electric Hardtail and Dual Suspension eMTB?',
      a: 'An Electric Hardtail has front suspension only (a suspension fork) with a rigid rear triangle. It is lighter, highly efficient for pedalling, requires less maintenance, and is ideal for cross-country trails, gravel, and fire roads. A Dual Suspension eMTB features both a front fork and rear shock (typically 140mm–160mm of air travel), delivering immense traction, downhill stability, and impact absorption over rock gardens, roots, and steep singletracks.'
    },
    {
      q: 'What real-world riding range can I expect on Australian roads and trails?',
      a: 'Real-world range depends on rider weight, terrain gradient, wind, and assist level. With our high-capacity 540Wh to 840Wh Samsung and LG lithium battery packs, riders typically achieve 70km to 110km on Eco mode (assistance levels 1–2). Under maximum climbing assistance (Turbo mode) on steep hills, range averages 50km to 65km per single charge.'
    },
    {
      q: 'How does the 10% Bitcoin and USDT cryptocurrency discount work at checkout?',
      a: 'When you select Bitcoin (BTC) or Tether (USDT) at checkout, an instant 10% discount is automatically deducted from your total order value. You will receive an official order confirmation with our verified wallet address and payment instructions. No hidden card processing fees or merchant surcharges.'
    },
    {
      q: 'What warranty and local Australian technician support is included?',
      a: 'All our e-bikes come with a comprehensive 2-Year Australian manufacturer warranty covering the frame, motor drive, digital handlebar display, and battery cells. Replacement tyres, brake pads, chains, and spare batteries are stocked locally in our Brisbane, Sydney, and Melbourne dispatch hubs for rapid Australia-wide delivery.'
    }
  ];

  return (
    <div className="bg-white min-h-screen text-gray-900">
      
      {/* 1. BREADCRUMBS BAR */}
      <div className="bg-gray-50 border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-2 text-xs text-gray-500">
          <button 
            onClick={() => { setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="hover:text-[#2E6B4D] cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="font-semibold text-gray-800">Electric Bikes (e-bikes)</span>
          {activeCategory !== 'all' && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-[#2E6B4D] font-bold">
                {EBIKES_PAGE_CATEGORIES.find(c => c.id === activeCategory)?.name}
              </span>
            </>
          )}
          {subcategoryFilter !== 'all' && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-gray-900 font-bold bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                {subcategoryFilter}
              </span>
            </>
          )}
        </div>
      </div>

      {/* 2. HERO SECTION - EXACTLY ONE H1 */}
      <section className="bg-gradient-to-br from-[#1E4733] via-[#24583E] to-gray-950 text-white py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Australia&apos;s Premier E-Bike Specialist</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Electric Bikes for Sale Australia
            </h1>
            
            <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
              Explore Australia&apos;s most comprehensive range of EN15194 certified 250W street-legal electric bicycles. 
              From high-torque dual suspension eMTBs and lightweight commuters to space-saving folding e-bikes and sand-cruising fat tyre models. 
              All backed by our 2-Year Australian warranty and an instant <strong>10% discount on Bitcoin & USDT payments</strong>.
            </p>

            {/* TRUST BADGES ROW */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/10 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Street Legal EN15194</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/10 text-xs">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Free Delivery Over $1,500</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/10 text-xs">
                <Coins className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>10% Off Bitcoin & USDT</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/10 text-xs">
                <Star className="w-4 h-4 text-amber-300 shrink-0" />
                <span>2-Year AU Local Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 99BIKES-STYLE E-BIKES CATEGORIES NAVIGATION GRID */}
      <section className="py-10 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2E6B4D]">Department Index</span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                Shop E-Bikes by Category
              </h2>
            </div>
            {activeCategory !== 'all' && (
              <button
                onClick={() => { setActiveCategory('all'); setSubcategoryFilter('all'); }}
                className="text-xs font-bold text-[#2E6B4D] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>View All 7 Categories</span>
              </button>
            )}
          </div>

          {/* 7 CATEGORIES GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-4">
            {EBIKES_PAGE_CATEGORIES.map((cat, idx) => {
              const isActive = activeCategory === cat.id;
              const count = ebikeProducts.filter(p => p.category === cat.id).length;
              return (
                <div
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`group relative rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 flex flex-col justify-between bg-white ${
                    isActive 
                      ? 'border-[#2E6B4D] ring-2 ring-[#2E6B4D] shadow-lg transform -translate-y-1' 
                      : 'border-gray-200 hover:border-emerald-300 hover:shadow-md'
                  }`}
                >
                  <div className="relative aspect-4/3 w-full bg-gray-100 overflow-hidden">
                    <SafeImage
                      src={cat.image}
                      alt={`${cat.name} Australia`}
                width={600}
                height={600}
                      sizes="(max-width: 640px) 50vw, 20vw"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                      #{idx + 1}
                    </span>
                    <span className="absolute bottom-2 right-2 bg-white/90 text-gray-900 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full shadow-xs">
                      {count} Models
                    </span>
                  </div>

                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className={`font-black text-xs sm:text-sm transition-colors ${
                        isActive ? 'text-[#2E6B4D]' : 'text-gray-900 group-hover:text-[#2E6B4D]'
                      }`}>
                        {cat.name}
                      </h3>
                      <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-2 leading-snug">
                        {cat.shortDesc}
                      </p>
                    </div>

                    <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-[#2E6B4D]">
                      <span>{isActive ? 'Filtered' : 'Browse'}</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'rotate-90' : 'group-hover:translate-x-0.5'}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 4. SUBCATEGORIES CHIPS FILTER BAR (Especially for Electric Mountain Bikes) */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#2E6B4D]" />
                <span className="text-xs font-bold text-gray-900">
                  {currentCategoryData ? `${currentCategoryData.name} Subcategories:` : 'Mountain eMTB Subcategories:'}
                </span>
              </div>
              {subcategoryFilter !== 'all' && (
                <button
                  onClick={() => setSubcategoryFilter('all')}
                  className="text-xs text-red-600 font-semibold hover:underline cursor-pointer"
                >
                  Clear subcategory filter
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSubcategoryFilter('all')}
                className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  subcategoryFilter === 'all'
                    ? 'bg-[#2E6B4D] text-white shadow-xs'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                All Subcategories
              </button>
              {subcategoriesToShow.map((subName) => {
                const isSubActive = subcategoryFilter.toLowerCase() === subName.toLowerCase();
                return (
                  <button
                    key={subName}
                    onClick={() => setSubcategoryFilter(isSubActive ? 'all' : subName)}
                    className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSubActive
                        ? 'bg-[#2E6B4D] text-white shadow-xs ring-2 ring-[#2E6B4D]'
                        : 'bg-white border border-gray-200 text-gray-700 hover:border-emerald-300 hover:bg-emerald-50/50'
                    }`}
                  >
                    <span>{subName}</span>
                    {isSubActive && <Check className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRODUCTS SECTION WITH FILTERS SIDEBAR */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-gray-200 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900">
              {activeCategory !== 'all'
                ? EBIKES_PAGE_CATEGORIES.find(c => c.id === activeCategory)?.h1
                : 'All Electric Mountain, Commuter, Cargo & Folding Models'}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Showing {filteredProducts.length} street-legal models matching your filter criteria
            </p>
          </div>

          {/* SORTING SELECT */}
          <div className="flex items-center gap-3">
            <label className="text-xs font-bold text-gray-600 whitespace-nowrap">Sort By:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs border border-gray-300 rounded-xl px-3 py-2 bg-white font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2E6B4D]"
            >
              <option value="featured">Featured / Best Match</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="range">Longest Battery Range</option>
              <option value="rating">Highest Customer Rating</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* DESKTOP FILTERS SIDEBAR */}
          <aside className="hidden lg:block space-y-6 bg-gray-50 p-6 rounded-2xl border border-gray-200 h-fit">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <span className="font-black text-sm text-gray-900 flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#2E6B4D]" />
                Refine E-Bikes
              </span>
              <button
                onClick={resetAllFilters}
                className="text-xs text-gray-500 hover:text-red-600 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Price Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-800 flex justify-between">
                <span>Maximum Price (AUD)</span>
                <span className="text-[#2E6B4D] font-black">${maxPrice.toLocaleString()}</span>
              </label>
              <input
                type="range"
                min={1200}
                max={6000}
                step={100}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#2E6B4D] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>$1,200</span>
                <span>$6,000</span>
              </div>
            </div>

            {/* Motor Type */}
            <div className="space-y-2 pt-2 border-t border-gray-200">
              <label className="text-xs font-bold text-gray-800 block">Motor Configuration</label>
              <div className="space-y-1.5 text-xs text-gray-700">
                {[
                  { id: 'all', label: 'All Motor Types' },
                  { id: 'Mid-Drive', label: 'Mid-Drive (High Torque eMTB / Hill Climbing)' },
                  { id: 'Hub', label: 'Hub Motor (Smooth Commuter / Cruiser)' }
                ].map(m => (
                  <label key={m.id} className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
                    <input
                      type="radio"
                      name="motorFilter"
                      checked={selectedMotorType === m.id}
                      onChange={() => setSelectedMotorType(m.id)}
                      className="text-[#2E6B4D] focus:ring-[#2E6B4D]"
                    />
                    <span>{m.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Crypto Discount Banner in Sidebar */}
            <div className="bg-gradient-to-br from-[#1E4733] to-[#2E6B4D] text-white p-4 rounded-xl space-y-2">
              <div className="flex items-center gap-1.5 text-amber-300 font-extrabold text-xs">
                <Coins className="w-4 h-4" />
                <span>10% Crypto Discount</span>
              </div>
              <p className="text-[11px] text-emerald-100 leading-snug">
                Checkout with Bitcoin or USDT to automatically save 10% on any bike model.
              </p>
            </div>
          </aside>

          {/* PRODUCTS GRID */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-gray-50 border border-dashed border-gray-300 rounded-3xl p-12 text-center space-y-4">
                <Info className="w-10 h-10 text-gray-400 mx-auto" />
                <h3 className="text-lg font-bold text-gray-800">No electric bikes found matching these criteria</h3>
                <p className="text-xs text-gray-500 max-w-md mx-auto">
                  Try widening your price range or resetting the subcategory filter to browse our full Australian fleet.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="bg-[#2E6B4D] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#1E4733] transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const cryptoDiscountPrice = Math.round(product.price * (1 - BUSINESS_INFO.cryptoDiscountPercentage / 100));
                  return (
                    <div
                      key={product.id}
                      className="group bg-white rounded-2xl overflow-hidden border border-gray-200/90 hover:border-emerald-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        {/* PRODUCT IMAGE WITH BADGE & HOVER ZOOM */}
                        <div 
                          className="relative aspect-4/3 w-full bg-white overflow-hidden cursor-pointer"
                          onClick={() => viewProduct(product)}
                        >
                          <SafeImage
                            src={product.image}
                            alt={`${product.name} electric bicycle for sale Australia`}
                width={600}
                height={600}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            referrerPolicy="no-referrer"
                            className="h-full w-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                          />
                          
                          {/* BADGES */}
                          <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                            {product.badge && (
                              <span className="bg-[#1E4733] text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full shadow-xs uppercase tracking-wide">
                                {product.badge}
                              </span>
                            )}
                            <span className="bg-amber-400 text-black font-extrabold text-[10px] px-2 py-0.5 rounded-md shadow-xs">
                              Save 10% With Crypto
                            </span>
                          </div>

                          {/* QUICK VIEW BUTTON OVERLAY */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setQuickViewProduct(product);
                            }}
                            className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-xl shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            aria-label={`Quick preview ${product.name}`}
                          >
                            <Eye className="w-4 h-4 text-[#2E6B4D]" />
                          </button>
                        </div>

                        {/* PRODUCT CONTENT */}
                        <div className="p-4 sm:p-5 space-y-3">
                          <div>
                            <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
                              <span className="font-semibold text-[#2E6B4D] uppercase tracking-wider">{product.brand}</span>
                              <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-medium">
                                {product.subcategory || product.categoryLabel}
                              </span>
                            </div>

                            <h3 
                              onClick={() => viewProduct(product)}
                              className="font-bold text-gray-900 text-base group-hover:text-[#2E6B4D] transition-colors cursor-pointer line-clamp-1"
                            >
                              {product.name}
                            </h3>

                            <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                              {product.shortDescription}
                            </p>
                          </div>

                          {/* REVIEWS & RATING */}
                          <div className="flex items-center gap-1.5 text-xs text-gray-600">
                            <div className="flex items-center text-amber-500">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              ))}
                            </div>
                            <span className="font-bold text-gray-800">{product.rating}</span>
                            <span className="text-gray-400">({product.reviewsCount} reviews)</span>
                          </div>

                          {/* SPECS ROW */}
                          <div className="grid grid-cols-3 gap-2 py-2 border-y border-gray-100 text-[11px]">
                            <div className="text-center bg-gray-50 p-1.5 rounded-lg">
                              <span className="text-gray-400 block text-[10px]">Motor</span>
                              <span className="font-bold text-gray-800">{product.torqueNm}Nm {product.motorType}</span>
                            </div>
                            <div className="text-center bg-gray-50 p-1.5 rounded-lg">
                              <span className="text-gray-400 block text-[10px]">Battery</span>
                              <span className="font-bold text-gray-800">{product.batteryWh}Wh</span>
                            </div>
                            <div className="text-center bg-gray-50 p-1.5 rounded-lg">
                              <span className="text-gray-400 block text-[10px]">Range</span>
                              <span className="font-bold text-gray-800">Up to {product.rangeKm}km</span>
                            </div>
                          </div>

                          {/* PRICING */}
                          <div className="pt-1">
                            <div className="flex items-baseline gap-2">
                              <span className="text-xl font-black text-gray-950">
                                ${product.price.toLocaleString()} AUD
                              </span>
                              {product.compareAtPrice && (
                                <span className="text-xs text-gray-400 line-through">
                                  ${product.compareAtPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-semibold flex items-center gap-1 mt-1">
                              <Coins className="w-3 h-3 text-amber-600" />
                              <span>BTC/USDT Price: <strong>${cryptoDiscountPrice.toLocaleString()} AUD</strong> (Save 10%)</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* CARD ACTIONS */}
                      <div className="p-4 sm:p-5 pt-0 grid grid-cols-2 gap-2">
                        <button
                          onClick={() => viewProduct(product)}
                          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold py-2.5 rounded-xl transition-colors cursor-pointer text-center"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => addToCart(product, 1)}
                          className="w-full bg-[#1E4733] hover:bg-[#2E6B4D] text-white text-xs font-bold py-2.5 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. 99BIKES-STYLE IN-DEPTH E-BIKE BUYING GUIDE (H2 SECTIONS) */}
      <section className="bg-gray-50 py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2E6B4D]">Australian E-Bike Guide</span>
            <h2 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight mt-1">
              How to Choose the Right Electric Bike in Australia
            </h2>
            <p className="text-sm text-gray-600 mt-3 leading-relaxed">
              Choosing an electric bicycle in Australia involves matching your riding purpose, commute distance, and terrain with the right motor location, battery capacity, and frame geometry. Here is our comprehensive breakdown based on thousands of Australian rider consultations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Guide Card 1 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-3 shadow-xs">
              <h3 className="font-black text-lg text-gray-900">
                1. Electric Mountain Bikes (eMTB)
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                eMTBs feature high-torque mid-drive motors (85Nm to 95Nm) that power through steep inclines and rock steps. 
                Choose an <strong>Electric Hardtail</strong> for lightweight trail efficiency, cross-country exploration, and rail trails. 
                Opt for a <strong>Dual Suspension eMTB</strong> (140mm–160mm air travel) for aggressive downhill runs, rock gardens, and technical bike parks.
              </p>
              <ul className="text-xs text-[#2E6B4D] font-bold space-y-1">
                <li>• Hardtail: Light, fast & low maintenance</li>
                <li>• Dual Suspension: Ultimate traction & rough trail comfort</li>
                <li>• Youth 24&quot;: Scaled safety geometry for ages 8–14</li>
              </ul>
            </div>

            {/* Guide Card 2 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-3 shadow-xs">
              <h3 className="font-black text-lg text-gray-900">
                2. Commuter & City Electric Bicycles
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Built to replace the car or bus pass, commuter e-bikes feature low step-through or sport crossbar aluminium frames, integrated front and rear safety lights, mudguards, and luggage racks rated to 25kg. Puncture-resistant tyres protect against street debris.
              </p>
              <ul className="text-xs text-[#2E6B4D] font-bold space-y-1">
                <li>• 250W silent pedal-assist for city streets</li>
                <li>• Samsung 540Wh battery: 70–85km daily range</li>
                <li>• Integrated racks for laptop bags & groceries</li>
              </ul>
            </div>

            {/* Guide Card 3 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-3 shadow-xs">
              <h3 className="font-black text-lg text-gray-900">
                3. Folding & Caravan E-Bikes
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Engineered for urban apartments, train commuters, grey nomads, and caravan travellers. Folds down in under 10 seconds via magnetic latches into car boots, under work desks, or RV lockers without requiring expensive bike carrier racks.
              </p>
              <ul className="text-xs text-[#2E6B4D] font-bold space-y-1">
                <li>• Folds to 85cm x 65cm compact footprint</li>
                <li>• Permitted on all Australian metropolitan trains</li>
                <li>• 20-inch alloy wheels with disc brakes</li>
              </ul>
            </div>

            {/* Guide Card 4 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-3 shadow-xs">
              <h3 className="font-black text-lg text-gray-900">
                4. Fat Tyre Electric Bicycles
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Featuring 26x4.0-inch all-terrain puncture-resistant tyres, fat tyre e-bikes float effortlessly over soft Australian coastal sand, gravel fire roads, and mud. High-volume air cushions every bump without requiring delicate linkages.
              </p>
              <ul className="text-xs text-[#2E6B4D] font-bold space-y-1">
                <li>• Ride on Australian beaches and headlands</li>
                <li>• 80Nm high-torque geared hub motor</li>
                <li>• High 160kg payload rating for surf racks</li>
              </ul>
            </div>

            {/* Guide Card 5 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-3 shadow-xs">
              <h3 className="font-black text-lg text-gray-900">
                5. Electric Cargo & Family Carriers
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Designed to replace the second family car. Elongated longtail frames accommodate two Thule child seats, cargo foot rails, or commercial wholesale delivery boxes with up to 210kg total load capacity and dual battery options.
              </p>
              <ul className="text-xs text-[#2E6B4D] font-bold space-y-1">
                <li>• School runs, grocery hauls & delivery fleets</li>
                <li>• Heavy duty dual kickstand for safe child loading</li>
                <li>• Low centre of gravity for stable handling</li>
              </ul>
            </div>

            {/* Guide Card 6 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-3 shadow-xs">
              <h3 className="font-black text-lg text-gray-900">
                6. Electric Road & Cruiser Bikes
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                For fast bunch rides and alpine endurance climbs, our <strong>Electric Road Bikes</strong> weigh just 13.5kg with zero-drag motors. For relaxed coastal boardwalks, our <strong>Electric Cruisers</strong> offer plush sprung saddles, swept-back bars, and beach style.
              </p>
              <ul className="text-xs text-[#2E6B4D] font-bold space-y-1">
                <li>• E-Road: Drop-bar lightweight speed & carbon forks</li>
                <li>• E-Cruiser: Upright neck posture & wide gel saddle</li>
                <li>• EN15194 road-legal pedal assist</li>
              </ul>
            </div>

          </div>

          {/* COMPLIANCE EXPLANATION H2 */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200 space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900">
              Australian E-Bike Road Rules & EN15194 Standard Explained
            </h2>
            <div className="prose prose-sm text-gray-600 max-w-none space-y-2">
              <p>
                In Australia, electric bicycles are regulated under the national <strong>EN15194 European/Australian Standard</strong>. 
                Under Australian transport law across all states (Transport for NSW, VicRoads, QLD TMR, Main Roads WA, DPTI SA, Transport Tasmania):
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li>Motor power must not exceed <strong>250 Watts continuous rated output</strong>.</li>
                <li>Motor assistance must automatically cut off when the bicycle reaches <strong>25 km/h</strong> (riders may pedal faster under their own leg power).</li>
                <li>The motor must only engage while the rider is actively pedalling (pedelec power assist). Throttles without pedalling are restricted to 200W or 6 km/h walk-assist mode.</li>
                <li>Riders must wear an <strong>AS/NZS 2063 certified bicycle helmet</strong> at all times.</li>
              </ul>
              <p className="text-xs font-semibold text-[#2E6B4D]">
                Every electric bike sold by e bikes for sale Australia is pre-inspected and certified for 100% compliance with these requirements prior to dispatch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQS SECTION (H2 & 5+ DETAILED ACCORDIONS) */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2E6B4D]">Customer Knowledge Base</span>
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Frequently Asked Questions (E-Bikes Australia)
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Clear answers to common questions about buying, owning, and charging an electric bike in Australia.
          </p>
        </div>

        <div className="space-y-3">
          {EBIKE_FAQS.map((faq, i) => {
            const isOpen = openFaqIndex === i;
            return (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-gray-900 text-sm sm:text-base hover:text-[#2E6B4D] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-[#2E6B4D] shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
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

      {/* 8. SCHEMA.ORG FAQPAGE & STORE STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: EBIKE_FAQS.map((f) => ({
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
