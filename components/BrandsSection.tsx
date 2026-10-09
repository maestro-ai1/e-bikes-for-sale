'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { BRANDS_DATA, REVOLUTIONARY_SLIDES } from '@/lib/data';
import { 
  Award, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  Cpu 
} from 'lucide-react';

export default function BrandsSection() {
  const { setCurrentView, setCategoryFilter } = useApp();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Revolutionary Slides auto-rotation
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % REVOLUTIONARY_SLIDES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const currentSlide = REVOLUTIONARY_SLIDES[activeSlide];

  const handleBrandClick = (categoryId: string) => {
    setCurrentView('shop');
    setCategoryFilter(categoryId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewAllBrands = () => {
    setCurrentView('brands');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-14 sm:py-20 bg-gray-50 border-b border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2E6B4D] mb-1">
              <Award className="w-4 h-4" />
              <span>Certified Australian E-Bike Manufacturers</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Leading Brand Innovations & Tech
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-2xl">
              Engineered for Australian conditions. Discover cutting-edge torque sensing, industrial dual-battery setups, and certified EN15194 compliance.
            </p>
          </div>

          <button
            onClick={handleViewAllBrands}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#2E6B4D] hover:text-[#1E4733] shrink-0"
          >
            <span>View Full Brand Directory</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 1. REVOLUTIONARY SLIDE SHOW */}
        <div 
          className="mb-14 bg-gradient-to-br from-gray-950 via-[#1E4733] to-gray-900 text-white rounded-3xl p-6 sm:p-10 lg:p-12 relative shadow-2xl overflow-hidden border border-emerald-900/60"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left slide text */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-amber-400 text-black font-black text-[11px] uppercase tracking-wider px-3 py-1 rounded-full">
                  {currentSlide.badge}
                </span>
                <span className="text-xs font-bold text-emerald-300">
                  {currentSlide.brand}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                {currentSlide.headline}
              </h3>

              <p className="text-xs sm:text-sm font-bold text-amber-300">
                {currentSlide.subheadline}
              </p>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-xl">
                {currentSlide.description}
              </p>

              {/* Tech Highlight Pill */}
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-3 text-xs text-emerald-200 flex items-center gap-2 w-fit">
                <Cpu className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold">{currentSlide.techHighlight}</span>
              </div>

              {/* CTA & Controls */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => handleBrandClick(currentSlide.categoryId)}
                  className="bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-black text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center gap-2"
                >
                  <span>Explore {currentSlide.brand} Models</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveSlide((prev) => (prev - 1 + REVOLUTIONARY_SLIDES.length) % REVOLUTIONARY_SLIDES.length)}
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                    aria-label="Previous revolutionary innovation"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveSlide((prev) => (prev + 1) % REVOLUTIONARY_SLIDES.length)}
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                    aria-label="Next revolutionary innovation"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Slide indicators */}
              <div className="flex items-center gap-2 pt-2">
                {REVOLUTIONARY_SLIDES.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      activeSlide === idx ? 'w-8 bg-amber-400' : 'w-2 bg-white/30'
                    }`}
                    aria-label={`Jump to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right slide visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden border-2 border-emerald-500/30 shadow-2xl bg-gray-900">
                <Image
                  src={currentSlide.image}
                  alt={currentSlide.headline}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  referrerPolicy="no-referrer"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md p-2.5 rounded-xl border border-white/10 text-white text-[11px] font-bold flex items-center justify-between">
                  <span>Certified EN 15194 Pedelec</span>
                  <span className="text-emerald-400">100% Road Legal</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 2. SMALL 3 CART / CARD GRID */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl sm:text-2xl font-black text-gray-900">
              Top Featured E-Bike Brands
            </h3>
            <span className="text-xs font-semibold text-gray-500">
              Full Australian 2-Year Warranty Coverage
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BRANDS_DATA.map((brand) => (
              <div
                key={brand.id}
                onClick={() => {
                  setCurrentView('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="cursor-pointer bg-white rounded-2xl border border-gray-200 hover:border-[#2E6B4D] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase text-[#2E6B4D] tracking-wider block">
                        {brand.country}
                      </span>
                      <h4 className="text-lg font-black text-gray-900 group-hover:text-[#2E6B4D] transition-colors mt-0.5">
                        {brand.name}
                      </h4>
                      <p className="text-xs text-gray-500 italic mt-0.5">{brand.tagline}</p>
                    </div>

                    <div className="flex items-center gap-1 text-amber-500 font-bold text-xs bg-amber-50 px-2 py-1 rounded-lg shrink-0">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{brand.rating}</span>
                    </div>
                  </div>

                  {/* Brand Image Preview */}
                  <div className="relative aspect-16/9 w-full rounded-xl overflow-hidden bg-gray-100 my-3 border border-gray-100">
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      referrerPolicy="no-referrer"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 mb-3">
                    {brand.description}
                  </p>

                  {/* Key Strengths */}
                  <div className="space-y-1.5 pt-2 border-t border-gray-100 mb-4">
                    {brand.keyStrengths.map((str, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{str}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer and CTA */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                  <div className="text-[10px] text-gray-500">
                    <span className="font-bold text-gray-800 block">{brand.warranty}</span>
                    <span>{brand.compliance}</span>
                  </div>

                  <button
                    onClick={() => {
                      setCurrentView('shop');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-[#2E6B4D] hover:bg-[#1E4733] text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 shrink-0"
                  >
                    <span>Browse</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
