'use client';

import React from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { BUSINESS_INFO } from '@/lib/data';
import { 
  ShieldCheck, 
  Truck, 
  Headphones, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Coins, 
  Zap,
  Sliders
} from 'lucide-react';

export default function Hero() {
  const { setCurrentView, setCategoryFilter, setIsFinderOpen } = useApp();

  const handleEbikesClick = () => {
    setCurrentView('shop');
    setCategoryFilter('commuter');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAllProductsClick = () => {
    setCurrentView('shop');
    setCategoryFilter('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWholesaleClick = () => {
    setCurrentView('wholesale');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative bg-[#111827] text-white overflow-hidden border-b border-gray-800">
      {/* Background Decorative Gradients */}
      <div className="absolute inset-0 bg-radial from-[#2E6B4D]/30 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#2E6B4D]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: HERO CONTENT */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Pill / Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Australia’s Premier Online E-Bike & Wholesale Destination 2026</span>
            </div>

            {/* H1 TARGETING "e bikes for sale" */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight leading-[1.08] text-white">
              e bikes <span className="text-[#3D8B65]">for sale</span>
            </h1>

            {/* SUPPORTING HEADLINE */}
            <p className="text-xl sm:text-2xl font-bold text-gray-200 tracking-tight">
              High Performance E Bikes, The Best Electric Bicycle Shop 2026.
            </p>

            {/* SUPPORTING TEXT WITH REQUIRED PLACEHOLDERS */}
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed">
              <strong className="text-white font-semibold">{BUSINESS_INFO.name}</strong> makes it simple to order e bikes, helmets, accessories, parts, batteries, commuter step-throughs, heavy-duty cargo haulers, and folding bikes online across Australia with verified street-legal EN15194 compliance.
            </p>

            {/* CALL TO ACTION BUTTONS */}
            <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
              <button
                onClick={handleEbikesClick}
                className="cursor-pointer bg-[#2E6B4D] hover:bg-[#24543C] text-white font-extrabold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-lg shadow-emerald-950/50 flex items-center gap-2 transition-all transform active:scale-95"
              >
                <span>e bikes</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleAllProductsClick}
                className="cursor-pointer bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl backdrop-blur-xs transition-all active:scale-95"
              >
                View All Products
              </button>

              <button
                onClick={handleWholesaleClick}
                className="cursor-pointer bg-amber-500 hover:bg-amber-600 text-black font-extrabold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-md transition-all active:scale-95"
              >
                Wholesale Enquiries
              </button>
            </div>

            {/* QUICK INTERACTIVE QUIZ BANNER */}
            <div 
              onClick={() => setIsFinderOpen(true)}
              className="cursor-pointer bg-gradient-to-r from-emerald-900/60 to-gray-900/80 border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between hover:border-emerald-400 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                  <Sliders className="w-5 h-5 text-emerald-400 group-hover:rotate-45 transition-transform" />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Not sure which model to pick?</span>
                  <div className="text-sm font-bold text-white">Take the 30-Second E-Bike Finder Quiz</div>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-300 group-hover:translate-x-1 transition-transform hidden sm:inline">
                Launch Quiz →
              </span>
            </div>

            {/* 4 TRUST INDICATORS WITH REQUIRED PLACEHOLDERS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-gray-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-gray-300">Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-gray-300">Fast & Safe Assembly Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-gray-300">Australian Customer Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-gray-300">Quality You Can Trust</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: HERO VISUAL WITH KEY BADGES */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-900/60 shadow-2xl bg-gray-900 aspect-4/3 sm:aspect-16/11">
              <Image
                src="/images/catalog/home-hero.webp"
                alt="e bikes for sale high performance Australian electric bicycle in action"
                fill
                priority
                className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Floating conversion overlays */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2 bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500 text-black flex items-center justify-center font-black text-sm">
                    10%
                  </div>
                  <div>
                    <span className="block text-[11px] text-gray-400 uppercase tracking-wider font-semibold">Crypto Perk</span>
                    <span className="text-xs font-bold text-white">Save 10% on Bitcoin & USDT</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block text-[11px] text-emerald-400 font-bold">250W EN15194</span>
                  <span className="text-[10px] text-gray-300">Road Legal All States</span>
                </div>
              </div>
            </div>

            {/* Secondary Floating Floating Badge */}
            <div className="absolute -top-4 -left-4 hidden sm:flex items-center gap-2 bg-white text-gray-900 px-3.5 py-2 rounded-2xl shadow-xl border border-gray-100">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="text-xs font-extrabold tracking-tight">100% Australian Stock</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
