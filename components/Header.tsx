'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { BUSINESS_INFO, CATEGORIES_CONFIG } from '@/lib/data';
import { catalogUrlFor } from '@/lib/catalog-nav';
import Link from 'next/link';
import Logo from '@/components/Logo';
import SiteNav from '@/components/SiteNav';
import { 
  Phone, 
  MapPin, 
  Search, 
  ShoppingBag, 
  SlidersHorizontal, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  X, 
  MessageCircle, 
  ShieldCheck, 
  Coins, 
  Truck,
  Bike,
  Award,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const ANNOUNCEMENT_SLIDES = [
  {
    id: 1,
    icon: ShoppingBag,
    text: `Minimum Order: $${BUSINESS_INFO.minOrder} (AUD)`,
    sub: 'Professional freight insured packaging on all deliveries',
  },
  {
    id: 2,
    icon: Truck,
    text: `Free Delivery on Orders Over $${BUSINESS_INFO.freeDeliveryThreshold}`,
    sub: 'Available across all Australian metropolitan postcodes',
  },
  {
    id: 3,
    icon: Coins,
    text: `Save ${BUSINESS_INFO.cryptoDiscountPercentage}% When You Pay With Crypto — Terms Apply`,
    sub: 'Automatic 10% discount on Bitcoin & USDT payments',
  },
  {
    id: 4,
    icon: Phone,
    text: `Call Us: ${BUSINESS_INFO.phone} | Email: ${BUSINESS_INFO.email}`,
    sub: 'Friendly Australian customer & technical support',
  },
  {
    id: 5,
    icon: ShieldCheck,
    text: 'Delivery Information: 2-5 Business Days Metro Australia-Wide Fast Dispatch',
    sub: 'Fully insured courier transit with pre-dispatch technician inspection',
  },
];

const AUSTRALIAN_LOCATIONS = [
  { state: 'QLD', postcode: '4000', city: 'Brisbane Metro', deliveryDays: '2-3 Business Days', shippingFee: 0 },
  { state: 'NSW', postcode: '2000', city: 'Sydney Metro', deliveryDays: '2-4 Business Days', shippingFee: 0 },
  { state: 'VIC', postcode: '3000', city: 'Melbourne Metro', deliveryDays: '2-4 Business Days', shippingFee: 0 },
  { state: 'WA', postcode: '6000', city: 'Perth Metro', deliveryDays: '4-6 Business Days', shippingFee: 0 },
  { state: 'SA', postcode: '5000', city: 'Adelaide Metro', deliveryDays: '3-5 Business Days', shippingFee: 0 },
  { state: 'TAS', postcode: '7000', city: 'Hobart Metro', deliveryDays: '4-6 Business Days', shippingFee: 0 },
  { state: 'ACT', postcode: '2600', city: 'Canberra Region', deliveryDays: '2-3 Business Days', shippingFee: 0 },
  { state: 'NT', postcode: '0800', city: 'Darwin Regional', deliveryDays: '5-8 Business Days', shippingFee: 0 },
];

export default function Header() {
  const { 
    cart, 
    setIsCartOpen, 
    cartSubtotal, 
    currentLocation, 
    setCurrentLocation,
    currentView,
    setCurrentView,
    setCategoryFilter,
    searchQuery,
    setSearchQuery,
    compareList,
    setIsFinderOpen,
    setSubcategoryFilter
  } = useApp();

  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'shop' | 'ebikes' | 'accessories' | 'scooters' | 'parts' | null>(null);
  const [customPostcode, setCustomPostcode] = useState(currentLocation.postcode);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Auto rotate announcement slider
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % ANNOUNCEMENT_SLIDES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleLocationSelect = (loc: typeof AUSTRALIAN_LOCATIONS[0]) => {
    setCurrentLocation(loc);
    setIsLocationModalOpen(false);
  };

  const handleCustomPostcodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPostcode.length >= 4) {
      setCurrentLocation({
        ...currentLocation,
        postcode: customPostcode,
        city: `Postcode ${customPostcode} (Regional/Metro)`,
      });
      setIsLocationModalOpen(false);
    }
  };

  const navigateTo = (view: string, category = 'all', subcategory = 'all') => {
    // E-bike and scooter categories are real, crawlable pages: go to the matching URL instead of a JS-only filter.
    const catalogUrl = catalogUrlFor(view, category, subcategory);
    if (catalogUrl && typeof window !== 'undefined') {
      window.location.assign(catalogUrl);
      return;
    }
    setCurrentView(view);
    setCategoryFilter(category);
    setSubcategoryFilter(subcategory);
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    if (typeof window !== 'undefined') {
      const targetUrl = view === 'home' ? '/' : `/${view}`;
      window.history.pushState(null, '', targetUrl);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="w-full z-40 sticky top-0 bg-white shadow-xs">
      {/* 1. TOP ANNOUNCEMENT SLIDER */}
      <div 
        className="bg-[#1E4733] text-white text-xs sm:text-sm py-2 px-3 relative border-b border-[#2E6B4D]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => setActiveSlide((prev) => (prev - 1 + ANNOUNCEMENT_SLIDES.length) % ANNOUNCEMENT_SLIDES.length)}
            className="p-1 hover:text-emerald-300 transition-colors hidden sm:block"
            aria-label="Previous announcement"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex-1 text-center flex items-center justify-center gap-2 overflow-hidden px-2">
            {React.createElement(ANNOUNCEMENT_SLIDES[activeSlide].icon, { className: 'w-4 h-4 text-emerald-300 shrink-0' })}
            <div className="truncate">
              <span className="font-semibold tracking-wide">{ANNOUNCEMENT_SLIDES[activeSlide].text}</span>
              <span className="hidden md:inline text-emerald-200/90 ml-2"> — {ANNOUNCEMENT_SLIDES[activeSlide].sub}</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button 
              onClick={() => setActiveSlide((prev) => (prev + 1) % ANNOUNCEMENT_SLIDES.length)}
              className="p-1 hover:text-emerald-300 transition-colors hidden sm:block"
              aria-label="Next announcement"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1 ml-2">
              {ANNOUNCEMENT_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className="flex h-6 min-w-6 items-center justify-center"
                  aria-label={`Go to slide ${i + 1}`}
                >
                  <span className={`block h-1.5 rounded-full transition-all ${activeSlide === i ? 'w-3 bg-emerald-300' : 'w-1.5 bg-emerald-700'}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 lg:flex-nowrap lg:gap-4">
        {/* Mobile menu trigger */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-gray-700 hover:text-[#2E6B4D]"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* LOGO: Brand logo icon + title in signature green maintaining exact same 40x40 size */}
        <Link href="/" onClick={() => navigateTo('home')} aria-label="e bikes for sale - home page" className="group shrink-0">
          <Logo />
        </Link>

        {/* SEARCH BAR (Desktop & Mobile) */}
        <div className="order-last basis-full min-w-0 sm:order-none sm:basis-auto sm:flex-1 max-w-xl sm:mx-6 relative">
          <input
            type="text"
            placeholder="Search e-bikes, scooters, helmets, parts"
            aria-label="Search products"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (currentView !== 'shop') setCurrentView('shop');
            }}
            className="w-full bg-gray-50 border border-gray-300 rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E6B4D] focus:border-transparent transition-all"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-xs text-gray-400 hover:text-gray-700"
            >
              Clear
            </button>
          )}
        </div>

        {/* CART BUTTON */}
        <div className="flex shrink-0 items-center">
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 bg-[#1E4733] hover:bg-[#2E6B4D] text-white py-2 px-3 sm:px-4 rounded-xl shadow-xs transition-all font-medium text-sm group"
            aria-label="View shopping basket"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-emerald-300 group-hover:scale-110 transition-transform" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-400 text-black font-extrabold text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {cartItemCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline font-bold">
              ${cartSubtotal > 0 ? cartSubtotal.toLocaleString() : '0.00'}
            </span>
          </button>
        </div>
      </div>

      {/* 3. MAIN MENU: real links, dropdowns present in the HTML (lib/site-nav.ts) */}
      <SiteNav onQuiz={() => setIsFinderOpen(true)} />

      {/* LOCATION SWITCHER MODAL */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setIsLocationModalOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#2E6B4D]" />
              Select Your Australian Shipping Region
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              We deliver Australia-wide. Orders over $1,500 qualify for free standard metropolitan delivery.
            </p>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {AUSTRALIAN_LOCATIONS.map((loc) => (
                <button
                  key={loc.state}
                  onClick={() => handleLocationSelect(loc)}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                    currentLocation.state === loc.state 
                      ? 'border-[#2E6B4D] bg-emerald-50 font-bold text-[#1E4733]' 
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <span className="font-extrabold block text-sm">{loc.state}</span>
                  <span className="text-[11px] text-gray-500">{loc.city}</span>
                  <span className="text-[10px] text-emerald-700 block mt-0.5">{loc.deliveryDays}</span>
                </button>
              ))}
            </div>

            <form onSubmit={handleCustomPostcodeSubmit} className="pt-3 border-t border-gray-100">
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Or enter specific 4-digit postcode:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={4}
                  placeholder="e.g. 3000, 4000, 2000"
                  value={customPostcode}
                  onChange={(e) => setCustomPostcode(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-[#2E6B4D] focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#2E6B4D] text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-[#1E4733]"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MOBILE MENU DRAWER */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 flex">
          <div className="bg-white w-4/5 max-w-sm h-full overflow-y-auto p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                <Link href="/" onClick={() => { navigateTo('home'); setIsMobileMenuOpen(false); }} aria-label="e bikes for sale - home page">
                  <Logo />
                </Link>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 p-1" aria-label="Close menu">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search e-bikes, scooters, parts..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (currentView !== 'shop') setCurrentView('shop');
                  }}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-sm"
                />
              </div>

              {/* Nav links */}
              <SiteNav mobile onNavigate={() => setIsMobileMenuOpen(false)} onQuiz={() => { setIsFinderOpen(true); setIsMobileMenuOpen(false); }} />
            </div>

            {/* Mobile Footer contact details */}
            <div className="pt-4 border-t border-gray-100 text-xs text-gray-500 space-y-2">
              <a href={`tel:${BUSINESS_INFO.phone}`} className="flex items-center gap-2 font-bold text-gray-900">
                <Phone className="w-4 h-4 text-[#2E6B4D]" />
                Call {BUSINESS_INFO.phone}
              </a>
              <a href={`https://wa.me/${BUSINESS_INFO.whatsapp.replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-emerald-700 font-bold">
                <MessageCircle className="w-4 h-4" />
                WhatsApp: {BUSINESS_INFO.whatsapp}
              </a>
              <div className="text-[11px] text-gray-400">
                ABN: {BUSINESS_INFO.abn} (Registered Australian Business)
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
