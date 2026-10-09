'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { BUSINESS_INFO, CATEGORIES_CONFIG } from '@/lib/data';
import Logo from '@/components/Logo';
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
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    activeSlide === i ? 'bg-emerald-300 w-3' : 'bg-emerald-700'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Mobile menu trigger */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-gray-700 hover:text-[#2E6B4D]"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* LOGO: Brand logo icon + title in signature green maintaining exact same 40x40 size */}
        <div 
          onClick={() => navigateTo('home')}
          className="cursor-pointer group shrink-0"
        >
          <Logo />
        </div>

        {/* SEARCH BAR (Desktop & Mobile) */}
        <div className="flex-1 max-w-xl mx-2 sm:mx-6 relative">
          <input
            type="text"
            placeholder="Search 250W e-bikes, commuter, folding, parts, helmets..."
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
        <div className="flex items-center">
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

      {/* 3. NAVIGATION BAR & RICH DROPDOWNS */}
      <nav className="border-t border-gray-200 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <ul className="flex items-center gap-1 sm:gap-2 lg:gap-3 py-2 text-sm font-semibold text-gray-700">
            
            {/* HOMEPAGE MENU BUTTON */}
            <li>
              <button
                onClick={() => navigateTo('home')}
                className={`cursor-pointer py-1.5 px-3 rounded-lg transition-colors whitespace-nowrap ${
                  currentView === 'home' ? 'bg-[#2E6B4D] text-white' : 'hover:text-[#2E6B4D] hover:bg-gray-100'
                }`}
              >
                Home
              </button>
            </li>

            {/* 1. SHOP DROPDOWN */}
            <li className="relative" onMouseLeave={() => setActiveDropdown(null)}>
              <button
                onClick={() => navigateTo('shop')}
                onMouseEnter={() => setActiveDropdown('shop')}
                className={`cursor-pointer py-1.5 px-3 rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap ${
                  currentView === 'shop' && activeDropdown === null ? 'bg-[#2E6B4D] text-white' : 'hover:text-[#2E6B4D] hover:bg-gray-100'
                }`}
              >
                <span>Shop</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {activeDropdown === 'shop' && (
                <div className="absolute left-0 top-full pt-1 z-50 w-[720px] bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2">
                  <div className="col-span-2 grid grid-cols-2 gap-3">
                    {CATEGORIES_CONFIG.map((cat) => (
                      <div
                        key={cat.id}
                        onClick={() => navigateTo('shop', cat.id)}
                        className="cursor-pointer p-3 rounded-xl hover:bg-emerald-50/70 border border-transparent hover:border-emerald-200 transition-all flex flex-col"
                      >
                        <span className="font-bold text-gray-900 text-sm hover:text-[#2E6B4D]">{cat.title}</span>
                        <span className="text-xs text-gray-500 line-clamp-1">{cat.shortDesc}</span>
                        <span className="text-[11px] font-medium text-[#2E6B4D] mt-1">{cat.itemCount}+ Models Available</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-br from-[#1E4733] to-[#2E6B4D] text-white p-5 rounded-2xl flex flex-col justify-between">
                    <div>
                      <span className="inline-block bg-amber-400 text-black font-extrabold text-[10px] uppercase px-2 py-0.5 rounded-full mb-2">
                        Special Promo
                      </span>
                      <h4 className="font-black text-lg leading-tight mb-2">Pay With Crypto & Save 10%</h4>
                      <p className="text-xs text-emerald-100">
                        Get an instant 10% discount on all electric bicycles when checking out with Bitcoin or USDT.
                      </p>
                    </div>
                    <button
                      onClick={() => navigateTo('shop')}
                      className="mt-4 w-full bg-white text-[#1E4733] font-bold text-xs py-2 rounded-lg hover:bg-emerald-50 transition-colors"
                    >
                      Browse All Models
                    </button>
                  </div>
                </div>
              )}
            </li>

            {/* 2. E BIKES DROPDOWN WITH CATEGORIES AND SUBCATEGORIES */}
            <li className="relative" onMouseLeave={() => setActiveDropdown(null)}>
              <button
                onClick={() => navigateTo('ebikes', 'all', 'all')}
                onMouseEnter={() => setActiveDropdown('ebikes')}
                className={`cursor-pointer py-1.5 px-3 rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap ${
                  currentView === 'ebikes' && activeDropdown === null ? 'bg-[#2E6B4D] text-white' : 'hover:text-[#2E6B4D] hover:bg-gray-100'
                }`}
              >
                <span>E-Bikes</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {activeDropdown === 'ebikes' && (
                <div className="absolute left-0 top-full pt-1 z-50 w-[840px] bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 animate-in fade-in slide-in-from-top-2">
                  <div className="grid grid-cols-3 gap-6">
                    {/* Col 1: 1. Electric Mountain Bike with 5 Subcategories */}
                    <div className="space-y-2 bg-gray-50/70 p-4 rounded-xl border border-gray-100">
                      <div 
                        onClick={() => navigateTo('ebikes', 'emtb', 'all')}
                        className="cursor-pointer group pb-2 border-b border-gray-200"
                      >
                        <span className="text-[10px] font-extrabold text-[#2E6B4D] uppercase tracking-wider block">Category 1</span>
                        <h4 className="font-black text-gray-900 text-sm group-hover:text-[#2E6B4D] flex items-center justify-between">
                          <span>Electric Mountain Bike</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#2E6B4D]" />
                        </h4>
                      </div>
                      
                      <div className="pt-1">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Subcategories:</span>
                        <ul className="space-y-1.5 text-xs text-gray-600">
                          <li 
                            onClick={() => navigateTo('ebikes', 'emtb', 'Electric Hardtail Mountain Bikes')}
                            className="hover:text-[#2E6B4D] hover:font-bold cursor-pointer transition-colors flex items-center gap-1.5"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Electric Hardtail Mountain Bikes
                          </li>
                          <li 
                            onClick={() => navigateTo('ebikes', 'emtb', "Dual suspension eMTB's")}
                            className="hover:text-[#2E6B4D] hover:font-bold cursor-pointer transition-colors flex items-center gap-1.5"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Dual Suspension eMTB&apos;s
                          </li>
                          <li 
                            onClick={() => navigateTo('ebikes', 'emtb', "Kids and Youths 24' eMTB's")}
                            className="hover:text-[#2E6B4D] hover:font-bold cursor-pointer transition-colors flex items-center gap-1.5"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Kids and Youths 24&apos; eMTB&apos;s
                          </li>
                          <li 
                            onClick={() => navigateTo('ebikes', 'emtb', "Enduro Dual Suspension eMTB's")}
                            className="hover:text-[#2E6B4D] hover:font-bold cursor-pointer transition-colors flex items-center gap-1.5"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Enduro Dual Suspension eMTB&apos;s
                          </li>
                          <li 
                            onClick={() => navigateTo('ebikes', 'emtb', "Trial Suspension eMTB's")}
                            className="hover:text-[#2E6B4D] hover:font-bold cursor-pointer transition-colors flex items-center gap-1.5"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Trial Suspension eMTB&apos;s
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Col 2: Categories 2, 3, 4 */}
                    <div className="space-y-4">
                      {/* 2. Folding E-Bike */}
                      <div 
                        onClick={() => navigateTo('ebikes', 'folding', 'all')}
                        className="cursor-pointer group p-3 rounded-xl hover:bg-emerald-50/60 border border-transparent hover:border-emerald-100 transition-all"
                      >
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Category 2</span>
                        <h4 className="font-black text-gray-900 text-sm group-hover:text-[#2E6B4D] flex items-center justify-between">
                          <span>Folding E-Bike</span>
                          <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h4>
                        <p className="text-[11px] text-gray-500 mt-0.5">Ultra-compact 10s fold for trains, caravans & grey nomads</p>
                      </div>

                      {/* 3. Electric Cruiser Bikes */}
                      <div 
                        onClick={() => navigateTo('ebikes', 'cruiser', 'all')}
                        className="cursor-pointer group p-3 rounded-xl hover:bg-emerald-50/60 border border-transparent hover:border-emerald-100 transition-all"
                      >
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Category 3</span>
                        <h4 className="font-black text-gray-900 text-sm group-hover:text-[#2E6B4D] flex items-center justify-between">
                          <span>Electric Cruiser Bikes</span>
                          <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h4>
                        <p className="text-[11px] text-gray-500 mt-0.5">Upright relaxed geometry, wide gel saddle & beachside cruising</p>
                      </div>

                      {/* 4. Fat Tyre Electric Bicycle */}
                      <div 
                        onClick={() => navigateTo('ebikes', 'fat-tyre', 'all')}
                        className="cursor-pointer group p-3 rounded-xl hover:bg-emerald-50/60 border border-transparent hover:border-emerald-100 transition-all"
                      >
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Category 4</span>
                        <h4 className="font-black text-gray-900 text-sm group-hover:text-[#2E6B4D] flex items-center justify-between">
                          <span>Fat Tyre Electric Bicycle</span>
                          <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h4>
                        <p className="text-[11px] text-gray-500 mt-0.5">4.0&quot; all-terrain tyres for beach sand, mud, and bush tracks</p>
                      </div>
                    </div>

                    {/* Col 3: Categories 5, 6, 7 */}
                    <div className="space-y-4">
                      {/* 5. Electric Cargo Bikes */}
                      <div 
                        onClick={() => navigateTo('ebikes', 'cargo', 'all')}
                        className="cursor-pointer group p-3 rounded-xl hover:bg-emerald-50/60 border border-transparent hover:border-emerald-100 transition-all"
                      >
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Category 5</span>
                        <h4 className="font-black text-gray-900 text-sm group-hover:text-[#2E6B4D] flex items-center justify-between">
                          <span>Electric Cargo Bikes</span>
                          <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h4>
                        <p className="text-[11px] text-gray-500 mt-0.5">210kg heavy payload for school runs & delivery fleets</p>
                      </div>

                      {/* 6. Electric Road Bikes */}
                      <div 
                        onClick={() => navigateTo('ebikes', 'road', 'all')}
                        className="cursor-pointer group p-3 rounded-xl hover:bg-emerald-50/60 border border-transparent hover:border-emerald-100 transition-all"
                      >
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Category 6</span>
                        <h4 className="font-black text-gray-900 text-sm group-hover:text-[#2E6B4D] flex items-center justify-between">
                          <span>Electric Road Bikes</span>
                          <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h4>
                        <p className="text-[11px] text-gray-500 mt-0.5">13.5kg ultralight carbon frames with zero drag above 25 km/h</p>
                      </div>

                      {/* 7. Electric Commuter bikes */}
                      <div 
                        onClick={() => navigateTo('ebikes', 'commuter', 'all')}
                        className="cursor-pointer group p-3 rounded-xl hover:bg-emerald-50/60 border border-transparent hover:border-emerald-100 transition-all"
                      >
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Category 7</span>
                        <h4 className="font-black text-gray-900 text-sm group-hover:text-[#2E6B4D] flex items-center justify-between">
                          <span>Electric Commuter Bikes</span>
                          <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h4>
                        <p className="text-[11px] text-gray-500 mt-0.5">Daily city transport with mudguards, lights & luggage racks</p>
                      </div>
                    </div>
                  </div>

                  {/* E-Bikes Dropdown Footer Bar */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      All models 100% street-legal under Australian EN15194 pedelec standards.
                    </span>
                    <button
                      onClick={() => navigateTo('ebikes', 'all', 'all')}
                      className="text-xs font-black text-[#2E6B4D] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore E-Bikes Landing Page</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </li>

            {/* 3. ACCESSORIES DROPDOWN (Strictly avoiding batteries in subcategories) */}
            <li className="relative" onMouseLeave={() => setActiveDropdown(null)}>
              <button
                onClick={() => navigateTo('accessories', 'all', 'all')}
                onMouseEnter={() => setActiveDropdown('accessories')}
                className="cursor-pointer py-1.5 px-3 rounded-lg hover:text-[#2E6B4D] hover:bg-gray-100 transition-colors flex items-center gap-1 whitespace-nowrap"
              >
                <span>Accessories</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {activeDropdown === 'accessories' && (
                <div className="absolute left-0 top-full pt-1 z-50 w-[620px] bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 grid grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2">
                  <div className="space-y-4">
                    <div 
                      onClick={() => navigateTo('accessories', 'helmets', 'Kids & Youth Certified Helmets')}
                      className="cursor-pointer group"
                    >
                      <h4 className="font-black text-gray-900 text-sm group-hover:text-[#2E6B4D]">
                        Helmets & Protection
                      </h4>
                      <ul className="mt-1 text-xs text-gray-500 space-y-1">
                        <li>• Certified AS/NZS 2063:2008 Helmets</li>
                        <li>• Smart LED Blinkers & Turn Signals</li>
                        <li>• Youth & Junior Road Protection</li>
                      </ul>
                    </div>

                    <div 
                      onClick={() => navigateTo('accessories', 'accessories', 'Bike Locks & Security')}
                      className="cursor-pointer group pt-2 border-t border-gray-100"
                    >
                      <h4 className="font-black text-gray-900 text-sm group-hover:text-[#2E6B4D]">
                        Bike Locks & Security
                      </h4>
                      <ul className="mt-1 text-xs text-gray-500 space-y-1">
                        <li>• Kryptonite New York Diamond U-Locks</li>
                        <li>• Heavy Duty Anti-Theft Chains</li>
                        <li>• Disc Brake Motion Alarm Locks</li>
                      </ul>
                    </div>

                    <div 
                      onClick={() => navigateTo('accessories', 'accessories', 'Bicycle Lights & Visibility')}
                      className="cursor-pointer group pt-2 border-t border-gray-100"
                    >
                      <h4 className="font-black text-gray-900 text-sm group-hover:text-[#2E6B4D]">
                        Bicycle Lights & Visibility
                      </h4>
                      <ul className="mt-1 text-xs text-gray-500 space-y-1">
                        <li>• High-Lumen Rechargeable Headlights</li>
                        <li>• StVZO Anti-Glare Night Lights</li>
                        <li>• Rear Smart Braking Tail Lights</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div 
                      onClick={() => navigateTo('accessories', 'accessories', 'Bags, Baskets & Panniers')}
                      className="cursor-pointer group"
                    >
                      <h4 className="font-black text-gray-900 text-sm group-hover:text-[#2E6B4D]">
                        Bags, Baskets & Panniers
                      </h4>
                      <ul className="mt-1 text-xs text-gray-500 space-y-1">
                        <li>• Heavy Duty Front Alloy Baskets</li>
                        <li>• Waterproof 25L Commuter Panniers</li>
                        <li>• Insulated Cargo Delivery Boxes</li>
                      </ul>
                    </div>

                    <div 
                      onClick={() => navigateTo('accessories', 'accessories', 'Phone Mounts & Tech')}
                      className="cursor-pointer group pt-2 border-t border-gray-100"
                    >
                      <h4 className="font-black text-gray-900 text-sm group-hover:text-[#2E6B4D]">
                        Phone Mounts & Tech
                      </h4>
                      <ul className="mt-1 text-xs text-gray-500 space-y-1">
                        <li>• Vibration-Damped Quad Lock Mounts</li>
                        <li>• Water-Resistant Cockpit Phone Cases</li>
                        <li>• GPS Cycle Computer Mounts</li>
                      </ul>
                    </div>

                    <div 
                      onClick={() => navigateTo('accessories', 'accessories', 'Pumps & Workshop Tools')}
                      className="cursor-pointer group pt-2 border-t border-gray-100"
                    >
                      <h4 className="font-black text-gray-900 text-sm group-hover:text-[#2E6B4D]">
                        Pumps & Workshop Tools
                      </h4>
                      <ul className="mt-1 text-xs text-gray-500 space-y-1">
                        <li>• Digital Pressure Gauge Floor Pumps</li>
                        <li>• Portable Presta/Schrader Mini Pumps</li>
                        <li>• Multi-Tools & Puncture Repair Kits</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </li>

            {/* 4. SCOOTERS DROPDOWN WITH 4 SUBCATEGORIES */}
            <li className="relative" onMouseLeave={() => setActiveDropdown(null)}>
              <button
                onClick={() => navigateTo('scooters', 'all', 'all')}
                onMouseEnter={() => setActiveDropdown('scooters')}
                className={`cursor-pointer py-1.5 px-3 rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap ${
                  currentView === 'scooters' && activeDropdown === null ? 'bg-[#2E6B4D] text-white' : 'hover:text-[#2E6B4D] hover:bg-gray-100'
                }`}
              >
                <span>Scooters</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {activeDropdown === 'scooters' && (
                <div className="absolute left-0 top-full pt-1 z-50 w-[580px] bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 grid grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2">
                  <div className="space-y-4">
                    {/* Subcategory 1: Electric Scooters */}
                    <div 
                      onClick={() => navigateTo('scooters', 'scooters', 'Electric Scooters')}
                      className="cursor-pointer group p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors"
                    >
                      <h4 className="font-black text-gray-900 text-sm group-hover:text-[#2E6B4D] flex items-center justify-between">
                        <span>Electric Scooters</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">High-efficiency personal mobility devices up to 25 km/h</p>
                    </div>

                    {/* Subcategory 2: Kids Scooters */}
                    <div 
                      onClick={() => navigateTo('scooters', 'scooters', 'Kids Scooters')}
                      className="cursor-pointer group p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors"
                    >
                      <h4 className="font-black text-gray-900 text-sm group-hover:text-[#2E6B4D] flex items-center justify-between">
                        <span>Kids Scooters</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">3-Wheel lean-to-steer stability & 12 km/h safety caps</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Subcategory 3: Adults Scooters */}
                    <div 
                      onClick={() => navigateTo('scooters', 'scooters', 'Adults Scooters')}
                      className="cursor-pointer group p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors"
                    >
                      <h4 className="font-black text-gray-900 text-sm group-hover:text-[#2E6B4D] flex items-center justify-between">
                        <span>Adults Scooters</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">120kg weight capacity with 10&quot; pneumatic comfort tyres</p>
                    </div>

                    {/* Subcategory 4: Scooter Accessories */}
                    <div 
                      onClick={() => navigateTo('scooters', 'scooters', 'Scooter Accessories')}
                      className="cursor-pointer group p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors"
                    >
                      <h4 className="font-black text-gray-900 text-sm group-hover:text-[#2E6B4D] flex items-center justify-between">
                        <span>Scooter Accessories</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">Hardened folding U-locks & waterproof handlebar bags</p>
                    </div>
                  </div>

                  <div className="col-span-2 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Complies with Australian state personal mobility rules.
                    </span>
                    <button
                      onClick={() => navigateTo('scooters', 'all', 'all')}
                      className="text-xs font-black text-[#2E6B4D] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore Scooters Landing Page</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </li>

            {/* 5. PARTS DROPDOWN (Appears after scooters, 99 Bikes format) */}
            <li className="relative" onMouseLeave={() => setActiveDropdown(null)}>
              <button
                onClick={() => navigateTo('parts', 'all', 'all')}
                onMouseEnter={() => setActiveDropdown('parts')}
                className={`cursor-pointer py-1.5 px-3 rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap ${
                  currentView === 'parts' && activeDropdown === null ? 'bg-[#2E6B4D] text-white' : 'hover:text-[#2E6B4D] hover:bg-gray-100'
                }`}
              >
                <span>Parts</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {activeDropdown === 'parts' && (
                <div className="absolute left-0 top-full pt-1 z-50 w-[680px] bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 grid grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2">
                  <div className="space-y-4">
                    {/* Tyres & Tubes */}
                    <div 
                      onClick={() => navigateTo('parts', 'parts', 'Tyres & Tubes')}
                      className="cursor-pointer group p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors"
                    >
                      <h4 className="font-black text-gray-900 text-sm group-hover:text-[#2E6B4D] flex items-center justify-between">
                        <span>Tyres & Tubes</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">Schwalbe Marathon Plus, thorn-resistant tubes & puncture liners</p>
                    </div>

                    {/* Brakes & Rotors */}
                    <div 
                      onClick={() => navigateTo('parts', 'parts', 'Brakes & Rotors')}
                      className="cursor-pointer group p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors"
                    >
                      <h4 className="font-black text-gray-900 text-sm group-hover:text-[#2E6B4D] flex items-center justify-between">
                        <span>Brakes & Rotors</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">Shimano & Tektro hydraulic pads, 180mm/203mm rotors & bleed kits</p>
                    </div>

                    {/* Chains & Drivetrains */}
                    <div 
                      onClick={() => navigateTo('parts', 'parts', 'Chains & E-Bike Drivetrains')}
                      className="cursor-pointer group p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors"
                    >
                      <h4 className="font-black text-gray-900 text-sm group-hover:text-[#2E6B4D] flex items-center justify-between">
                        <span>Chains & E-Bike Drivetrains</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">High-torque KMC e-Series reinforced chains, cassettes & MissingLinks</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Pedals, Grips & Saddles */}
                    <div 
                      onClick={() => navigateTo('parts', 'parts', 'Pedals, Grips & Saddles')}
                      className="cursor-pointer group p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors"
                    >
                      <h4 className="font-black text-gray-900 text-sm group-hover:text-[#2E6B4D] flex items-center justify-between">
                        <span>Pedals, Grips & Saddles</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">Ergon GP1 winged grips, high-traction alloy flat pedals & gel saddles</p>
                    </div>

                    {/* Workshop & Tools */}
                    <div 
                      onClick={() => navigateTo('parts', 'parts', 'Workshop & Tools')}
                      className="cursor-pointer group p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors"
                    >
                      <h4 className="font-black text-gray-900 text-sm group-hover:text-[#2E6B4D] flex items-center justify-between">
                        <span>Workshop & Tools</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">Park Tool chain wear gauges, multi-tools, digital pumps & e-bike lubes</p>
                    </div>

                    {/* WhatsApp Technician Support Box */}
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/80">
                      <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Technician Advice</span>
                      <p className="text-xs text-gray-700 font-medium mt-0.5">Need help checking part compatibility for your e-bike model?</p>
                      <button
                        onClick={() => {
                          const wa = '61420128746';
                          const msg = "G'day! I have a question about bicycle part compatibility for my electric bike.";
                          window.open(`https://wa.me/${wa}?text=${encodeURIComponent(msg)}`, '_blank');
                        }}
                        className="mt-2 text-xs font-bold text-[#2E6B4D] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Ask on WhatsApp →</span>
                      </button>
                    </div>
                  </div>

                  <div className="col-span-2 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      100% Genuine Components with 24hr Australian Dispatch.
                    </span>
                    <button
                      onClick={() => navigateTo('parts', 'all', 'all')}
                      className="text-xs font-black text-[#2E6B4D] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore Parts & Tyres Landing Page</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </li>

            {/* BRANDS PAGE BUTTON */}
            <li>
              <button
                onClick={() => navigateTo('brands')}
                className={`cursor-pointer py-1.5 px-3 rounded-lg transition-colors whitespace-nowrap font-bold ${
                  currentView === 'brands' ? 'bg-[#2E6B4D] text-white' : 'hover:text-[#2E6B4D] hover:bg-gray-100 text-emerald-800'
                }`}
              >
                Brands
              </button>
            </li>

            {/* WHOLESALE */}
            <li>
              <button
                onClick={() => navigateTo('wholesale')}
                className={`cursor-pointer py-1.5 px-3 rounded-lg transition-colors whitespace-nowrap ${
                  currentView === 'wholesale' ? 'bg-[#2E6B4D] text-white' : 'hover:text-[#2E6B4D] hover:bg-gray-100'
                }`}
              >
                Wholesale
              </button>
            </li>

            {/* BLOG */}
            <li>
              <button
                onClick={() => navigateTo('blog')}
                className={`cursor-pointer py-1.5 px-3 rounded-lg transition-colors whitespace-nowrap ${
                  currentView === 'blog' ? 'bg-[#2E6B4D] text-white' : 'hover:text-[#2E6B4D] hover:bg-gray-100'
                }`}
              >
                Blog
              </button>
            </li>

            {/* ABOUT US */}
            <li>
              <button
                onClick={() => navigateTo('about')}
                className={`cursor-pointer py-1.5 px-3 rounded-lg transition-colors whitespace-nowrap ${
                  currentView === 'about' ? 'bg-[#2E6B4D] text-white' : 'hover:text-[#2E6B4D] hover:bg-gray-100'
                }`}
              >
                About Us
              </button>
            </li>

            {/* CONTACT */}
            <li>
              <button
                onClick={() => navigateTo('contact')}
                className={`cursor-pointer py-1.5 px-3 rounded-lg transition-colors whitespace-nowrap ${
                  currentView === 'contact' ? 'bg-[#2E6B4D] text-white' : 'hover:text-[#2E6B4D] hover:bg-gray-100'
                }`}
              >
                Contact
              </button>
            </li>
          </ul>

          {/* Quick Quiz Shortcut */}
          <button
            onClick={() => setIsFinderOpen(true)}
            className="cursor-pointer hidden md:flex items-center gap-1.5 text-xs font-bold text-[#2E6B4D] bg-emerald-50 hover:bg-emerald-100 py-1.5 px-3 rounded-full border border-emerald-200 transition-colors shrink-0"
          >
            <span>⚡ E-Bike Finder Quiz</span>
          </button>
        </div>
      </nav>

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
                <div 
                  onClick={() => { navigateTo('home'); setIsMobileMenuOpen(false); }}
                  className="cursor-pointer"
                >
                  <Logo />
                </div>
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

              {/* Nav Links */}
              <ul className="space-y-1.5 text-sm font-semibold text-gray-800">
                <li>
                  <button onClick={() => navigateTo('home')} className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('shop')} className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100 flex items-center justify-between">
                    <span>Shop All Products</span>
                    <span className="text-xs text-[#2E6B4D] font-bold">Catalogue</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('ebikes')} className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100 flex items-center justify-between text-[#1E4733] font-bold">
                    <span>E-Bikes Landing Page</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#2E6B4D]" />
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('accessories')} className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100 flex items-center justify-between">
                    <span>Accessories</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#2E6B4D]" />
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('scooters')} className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100 flex items-center justify-between">
                    <span>Scooters</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#2E6B4D]" />
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('parts')} className="w-full text-left py-2 px-3 rounded-lg hover:bg-emerald-50/70 text-[#1E4733] flex items-center justify-between font-bold border border-emerald-100">
                    <span>Parts & Cycle Tyres</span>
                    <span className="text-xs bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full">99 Bikes Style</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('brands')} className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100 font-bold text-emerald-800">
                    Brands Directory & Innovations
                  </button>
                </li>
                <li>
                  <button onClick={() => { setIsFinderOpen(true); setIsMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 rounded-lg bg-emerald-50 text-[#1E4733] font-bold">
                    ⚡ E-Bike Finder Quiz
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('wholesale')} className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100">
                    Wholesale Fleet Supply
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('blog')} className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100">
                    Blog & Buying Guides
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('about')} className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100">
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('contact')} className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100">
                    Contact & Australian Support
                  </button>
                </li>
              </ul>
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
