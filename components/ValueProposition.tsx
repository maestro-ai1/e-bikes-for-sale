'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { BUSINESS_INFO } from '@/lib/data';
import { 
  Sparkles, 
  MousePointerClick, 
  CreditCard, 
  Truck, 
  Headphones, 
  ShieldCheck, 
  ArrowRight,
  Package,
  Wrench
} from 'lucide-react';

export default function ValueProposition() {
  const { setCurrentView } = useApp();

  const handleDeliveryInfoClick = () => {
    setCurrentView('legal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const BENEFITS = [
    {
      icon: Sparkles,
      title: 'Brand New E-Bikes',
      desc: 'Factory fresh, brand new inventory direct from verified manufacturers with zero refurbished stock.',
    },
    {
      icon: MousePointerClick,
      title: 'Convenient Online Ordering',
      desc: 'Simple mobile-first ordering with clear specs, size recommendations, and rapid online checkout.',
    },
    {
      icon: CreditCard,
      title: 'Secure Online Payments',
      desc: 'Encrypted Australian checkout with PayID, Bank Transfer (Osko/EFT), and 10% Crypto discount.',
    },
    {
      icon: Truck,
      title: 'Secured and Fast Delivery',
      desc: 'Reinforced dual-box packaging with live tracking and pre-dispatch technician safety check.',
    },
    {
      icon: Headphones,
      title: 'Helpful Australian Customer Support',
      desc: `Direct call at ${BUSINESS_INFO.phone} and dedicated WhatsApp support during Australian business hours.`,
    },
    {
      icon: ShieldCheck,
      title: 'Quality You Can Trust',
      desc: 'EN15194 compliant electric assistance with 2-year frame warranty and Samsung/LG battery safety cells.',
    },
  ];

  return (
    <section className="py-10 sm:py-14 bg-emerald-950 text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2E6B4D]/30 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* High Turnover Value Proposition Banner */}
        <div className="bg-gradient-to-r from-[#1E4733] to-[#2E6B4D] border border-emerald-500/40 rounded-2xl p-5 sm:p-7 shadow-xl mb-8 text-center sm:text-left flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="space-y-1">
            <span className="text-amber-400 font-extrabold text-xs uppercase tracking-wider">
              The Australian Rider Guarantee
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Free Express Shipping Over ${BUSINESS_INFO.freeDeliveryThreshold} • 2-Year Warranty • Local Stock
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl">
              Professional freight delivery across Australian metropolitan postcodes. Every bike arrives securely packed with assembly toolkit and step-by-step instructions.
            </p>
          </div>

          <button
            onClick={handleDeliveryInfoClick}
            className="cursor-pointer bg-white hover:bg-emerald-50 text-[#1E4733] font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md flex items-center gap-2 shrink-0 transition-transform active:scale-95"
          >
            <span>Delivery Information</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Compact Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Why Choose Us
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Engineered for Australian Riders
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">
            Reliable personal mobility backed by EN15194 compliance and verified local support.
          </p>
        </div>

        {/* 6 Icons / Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {BENEFITS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-gray-900/80 border border-emerald-900/60 hover:border-emerald-500/50 rounded-xl p-5 transition-all duration-300 group hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mb-3 group-hover:bg-[#2E6B4D] group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* How It Works Section */}
        <div className="mt-12 pt-8 border-t border-emerald-900/60">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Simple 3-Step Process
            </span>
            <h3 className="text-xl font-black text-white mt-0.5">How It Works</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div 
              onClick={() => { setCurrentView('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="cursor-pointer bg-white/5 hover:bg-white/10 hover:border-emerald-400/50 border border-white/10 rounded-xl p-5 text-center transition-all group"
            >
              <div className="w-9 h-9 rounded-full bg-amber-500 group-hover:bg-amber-400 text-black font-black flex items-center justify-center mx-auto mb-2 text-sm transition-colors">
                1
              </div>
              <h4 className="font-bold text-white group-hover:text-emerald-300 text-sm sm:text-base transition-colors">Select Your Model & Bundle</h4>
              <p className="text-xs text-gray-300 mt-1">
                Choose your e-bike category, frame size, and add-on locks or cargo baskets.
              </p>
            </div>

            <div 
              onClick={() => { setCurrentView('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="cursor-pointer bg-white/5 hover:bg-white/10 hover:border-emerald-400/50 border border-white/10 rounded-xl p-5 text-center transition-all group"
            >
              <div className="w-9 h-9 rounded-full bg-amber-500 group-hover:bg-amber-400 text-black font-black flex items-center justify-center mx-auto mb-2 text-sm transition-colors">
                2
              </div>
              <h4 className="font-bold text-white group-hover:text-emerald-300 text-sm sm:text-base transition-colors">Checkout With PayID, Osko/EFT or Crypto</h4>
              <p className="text-xs text-gray-300 mt-1">
                Pay securely with PayID, Bank Transfer (Osko/EFT), or save 10% automatically with Crypto.
              </p>
            </div>

            <div 
              onClick={handleDeliveryInfoClick}
              className="cursor-pointer bg-white/5 hover:bg-white/10 hover:border-emerald-400/50 border border-white/10 rounded-xl p-5 text-center transition-all group"
            >
              <div className="w-9 h-9 rounded-full bg-amber-500 group-hover:bg-amber-400 text-black font-black flex items-center justify-center mx-auto mb-2 text-sm transition-colors">
                3
              </div>
              <h4 className="font-bold text-white group-hover:text-emerald-300 text-sm sm:text-base transition-colors">Rapid Dispatch & Easy Setup</h4>
              <p className="text-xs text-gray-300 mt-1">
                Arrives securely packaged with illustrated assembly manual and toolkit for effortless setup.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
