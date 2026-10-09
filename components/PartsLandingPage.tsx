'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { PRODUCTS, PARTS_PAGE_CONFIG, BUSINESS_INFO } from '@/lib/data';
import { Product } from '@/lib/types';
import { 
  Wrench, 
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
  ArrowRight,
  Disc,
  Link as LinkIcon,
  Layers,
  Sparkles,
  MessageCircle,
  Package
} from 'lucide-react';

export default function PartsLandingPage() {
  const { 
    viewProduct, 
    setQuickViewProduct, 
    addToCart, 
    setCurrentView,
    subcategoryFilter,
    setSubcategoryFilter
  } = useApp();

  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(300);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Subcategories from config
  const subcategories = PARTS_PAGE_CONFIG.subcategories;
  const categoryCards = PARTS_PAGE_CONFIG.categoryCards;

  // All parts products
  const partsProducts = useMemo(() => {
    return PRODUCTS.filter(p => p.category === 'parts');
  }, []);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return partsProducts.filter((product) => {
      if (selectedSubcategory !== 'all') {
        const subMatch = 
          product.subcategory?.toLowerCase() === selectedSubcategory.toLowerCase() ||
          product.subcategoryId?.toLowerCase() === selectedSubcategory.toLowerCase();
        if (!subMatch) return false;
      }
      if (product.price > maxPrice) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [partsProducts, selectedSubcategory, maxPrice, sortBy]);

  const faqs = [
    {
      question: 'Are your cycle tyres rated for electric bicycles (ECE-R75 / E-25 / E-50)?',
      answer: 'Yes. All our premium Schwalbe tyres carry official European ECE-R75 (or E-25 / E-50) certifications. They feature reinforced anti-puncture plies and compound chemistry specifically designed to handle the increased weight and hill-climbing torque of electric bicycles.'
    },
    {
      question: 'How do I know which brake pads and rotors fit my electric bike?',
      answer: 'Most modern Australian e-bikes use standard Shimano B01S / B05S / D02S profiles or Tektro Aries / Auriga shapes with standard 6-bolt ISO rotor mounts. If unsure, send a quick photo of your brake caliper to our technicians on WhatsApp for guaranteed fitment confirmation.'
    },
    {
      question: 'Why do mid-drive motors wear out chains faster than regular bikes?',
      answer: 'Mid-drive motors amplify human pedal power directly through the bicycle chain, frequently placing over 85Nm to 120Nm of sustained tension through the drivetrain. Our KMC e-Series chains feature reinforced pins and thicker side plates to prevent chain snapping.'
    },
    {
      question: 'How fast do spare parts dispatch across Australia?',
      answer: 'All spare tyres, inner tubes, brake pads, chains, and workshop tools dispatch within 24 business hours from our Sydney, Melbourne, and Brisbane logistics hubs with Australia Post tracking. Express courier delivery is available at checkout.'
    },
    {
      question: 'Do you offer a crypto discount on replacement parts and tyres?',
      answer: 'Yes! All orders paid with Bitcoin (BTC) or USDT receive an instant 10% discount applied directly at checkout, helping Australian riders save on ongoing maintenance and wear-and-tear components.'
    }
  ];

  const handleWhatsAppHelp = () => {
    const wa = BUSINESS_INFO.whatsapp.replace('+', '');
    const msg = "G'day! I have a question about bicycle part compatibility for my electric bike.";
    window.open(`https://wa.me/${wa}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="bg-white min-h-screen">
      {/* 1. BREADCRUMB (99 BIKES STYLE) */}
      <div className="bg-gray-50 border-b border-gray-200 text-xs py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-gray-500">
          <button 
            onClick={() => { setCurrentView('home'); window.history.pushState(null, '', '/'); }}
            className="hover:text-emerald-800 transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="font-semibold text-gray-900">Bike Parts & E-Bike Components</span>
        </div>
      </div>

      {/* 2. HERO BANNER (99 BIKES STYLE) */}
      <section className="bg-gradient-to-r from-gray-950 via-slate-900 to-[#1E4733] text-white py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full">
              <Wrench className="w-3.5 h-3.5" />
              <span>Genuine Workshop Spares & Certified Components</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Bike Parts & E-Bike Components Australia
            </h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Keep your electric bicycle and daily commuter in top mechanical running order. Browse genuine puncture-resistant tyres, hydraulic disc pads, heavy-duty chains, pedals, grips, and workshop tools. All backed by Australian warranty and fast dispatch.
            </p>

            {/* TRUST PILLS */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 bg-white/10 text-white text-xs px-3 py-1.5 rounded-lg font-medium backdrop-blur-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                ECE-R75 E-Bike Certified Tyres
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 text-white text-xs px-3 py-1.5 rounded-lg font-medium backdrop-blur-xs">
                <Truck className="w-3.5 h-3.5 text-emerald-400" />
                Dispatched Within 24 Hours
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 text-white text-xs px-3 py-1.5 rounded-lg font-medium backdrop-blur-xs">
                <Package className="w-3.5 h-3.5 text-emerald-400" />
                Shimano • Schwalbe • KMC • Park Tool
              </span>
              <span className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 text-xs px-3 py-1.5 rounded-lg font-bold border border-amber-400/30">
                <Coins className="w-3.5 h-3.5" />
                10% Crypto Discount (BTC/USDT)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISUAL CATEGORY CARDS (99 BIKES STYLE NAVIGATION) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-[#2E6B4D]">
              Explore Categories
            </span>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight mt-0.5">
              Shop Bike Parts by Category
            </h2>
          </div>
          <button
            onClick={() => setSelectedSubcategory('all')}
            className="text-xs font-bold text-[#2E6B4D] hover:underline cursor-pointer"
          >
            View All Components ({partsProducts.length}) →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categoryCards.map((card) => {
            const isSelected = selectedSubcategory.toLowerCase() === card.title.toLowerCase();
            return (
              <div
                key={card.id}
                onClick={() => setSelectedSubcategory(card.title)}
                className={`cursor-pointer rounded-2xl border p-4 transition-all flex flex-col justify-between group ${
                  isSelected 
                    ? 'border-[#2E6B4D] bg-emerald-50/60 ring-2 ring-[#2E6B4D]'
                    : 'border-gray-200 bg-white hover:border-emerald-300 hover:shadow-md'
                }`}
              >
                <div className="relative aspect-4/3 rounded-xl overflow-hidden mb-3 bg-gray-100">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-gray-900 group-hover:text-[#2E6B4D] flex items-center justify-between">
                    <span>{card.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#2E6B4D]" />
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">
                    {card.desc}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-gray-100 text-[10px] font-bold text-[#2E6B4D]">
                  {card.itemCount}+ Models Available
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. INTERACTIVE SUBCATEGORY PILLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-4 border-t border-b border-gray-200 bg-gray-50/50">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setSelectedSubcategory('all')}
            className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedSubcategory === 'all'
                ? 'bg-[#2E6B4D] text-white shadow-xs'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            All Parts ({partsProducts.length})
          </button>
          {subcategories.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubcategory(sub)}
              className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedSubcategory.toLowerCase() === sub.toLowerCase()
                  ? 'bg-[#2E6B4D] text-white shadow-xs'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </section>

      {/* 5. TOOLBAR & PRODUCT GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="text-xs text-gray-600 font-semibold">
            Showing <strong className="text-gray-900">{filteredProducts.length}</strong> components
            {selectedSubcategory !== 'all' && (
              <span className="ml-2 inline-flex items-center gap-1 bg-emerald-100 text-[#1E4733] px-2 py-0.5 rounded-full text-[11px] font-bold">
                {selectedSubcategory}
                <button 
                  onClick={() => setSelectedSubcategory('all')}
                  className="hover:text-red-600 cursor-pointer ml-1"
                >
                  ×
                </button>
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Price Slider Filter */}
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span className="font-semibold hidden md:inline">Max Price:</span>
              <input
                type="range"
                min={30}
                max={300}
                step={10}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-24 sm:w-32 accent-[#2E6B4D]"
              />
              <span className="font-bold text-gray-900">${maxPrice}</span>
            </div>

            {/* Sort Dropdown */}
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
            <Wrench className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="font-bold text-sm text-gray-800">No components match your selected filter.</p>
            <button
              onClick={() => { setSelectedSubcategory('all'); setMaxPrice(300); }}
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
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                        <span>{product.brand}</span>
                        <span className="text-emerald-700">{product.subcategory}</span>
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

                      {/* Ratings */}
                      <div className="flex items-center gap-1.5 mt-2 text-xs">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <span className="font-bold text-gray-800">{product.rating}</span>
                        <span className="text-gray-400">({product.reviewsCount})</span>
                      </div>
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
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setQuickViewProduct(product)}
                          className="cursor-pointer p-2 rounded-xl border border-gray-200 text-gray-500 hover:text-[#2E6B4D] hover:bg-gray-50 transition-colors"
                          title="Quick View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
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
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 6. EDUCATIONAL BUYING GUIDES (99 BIKES STYLE SEO CONTENT) */}
      <section className="bg-gray-50 py-16 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="text-xs font-black uppercase tracking-wider text-[#2E6B4D]">
              Expert Technician Guide
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1">
              Selecting E-Bike Parts & Maintenance in Australia
            </h2>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-2xs space-y-3">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Disc className="w-5 h-5 text-[#2E6B4D]" />
              Understanding ECE-R75 & E-25 Certified E-Bike Tyres
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Electric bicycles produce high instantaneous torque and weigh substantially more than traditional pedal bikes. Standard thin-walled cycle tyres wear out rapidly, skid during emergency braking, and suffer frequent punctures from road debris. European ECE-R75 certified tyres (such as the Schwalbe Marathon Plus) feature 5mm patented SmartGuard rubber liners and reinforced sidewalls that stop Australian three-corner jacks (bindies), thorns, and glass shards.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-2xs space-y-3">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-[#2E6B4D]" />
              Why Mid-Drive Motors Require Reinforced Chains
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              On mid-drive e-bikes (powered by Bosch, Bafang, or Shimano motors), motor output passes directly through the chain and rear cassette. Standard 11-speed bicycle chains are prone to pin deformation and snapping under sudden pedal assist surges. KMC e-Series chains utilize reinforced mushroom-riveted pins and hardened chromium carbide plates to deliver over 450kgf of tensile strength, keeping your commute safe.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-2xs space-y-3">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#2E6B4D]" />
              Hydraulic Disc Brake Pad Compounds: Resin vs Metallic
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Choosing the right brake pad compound depends on your riding style:
            </p>
            <ul className="text-xs sm:text-sm text-gray-600 space-y-2 list-disc pl-5">
              <li><strong>Resin / Organic Pads:</strong> Offer quiet braking, instant cold-weather bite, and minimal rotor wear. Ideal for flat city commuting.</li>
              <li><strong>Sintered / Semi-Metallic Pads:</strong> Deliver immense thermal fade resistance during sustained steep downhill braking and heavy cargo hauling in wet or muddy conditions.</li>
            </ul>
          </div>

          {/* WhatsApp Support Callout */}
          <div className="bg-gradient-to-r from-emerald-800 to-[#1E4733] text-white p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
            <div>
              <span className="text-xs font-bold text-emerald-200 uppercase tracking-wider">
                Unsure About Compatibility?
              </span>
              <h3 className="text-xl font-black text-white mt-0.5">
                Speak With an Australian Bike Technician
              </h3>
              <p className="text-xs text-gray-200 mt-1 max-w-md">
                Send us a photo of your wheel size, brake caliper, or chainstay and we&apos;ll confirm the exact replacement part.
              </p>
            </div>
            <button
              onClick={handleWhatsAppHelp}
              className="cursor-pointer bg-[#25D366] hover:bg-[#20ba5a] text-white px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2.5 shadow-lg shrink-0 transition-transform active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp</span>
            </button>
          </div>
        </div>
      </section>

      {/* 7. 5 COMPREHENSIVE CUSTOMER FAQS (99 BIKES STYLE ACCORDION) */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-black uppercase tracking-wider text-[#2E6B4D]">
            Help & Advice
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1">
            Frequently Asked Questions — Bike Parts & E-Bike Spares
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-xl mx-auto">
            Answers to key technical questions about sizing, brake pads, chain stretch, tyre certifications, and Australian shipping.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between font-bold text-sm sm:text-base text-gray-900 hover:text-[#2E6B4D] transition-colors cursor-pointer"
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
