'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { BRANDS_DATA, PRODUCTS } from '@/lib/data';
import { 
  Award, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  ArrowRight, 
  Wrench, 
  Truck, 
  Coins, 
  ShoppingBag,
  ExternalLink
} from 'lucide-react';

export default function BrandPage() {
  const { setCurrentView, setCategoryFilter, setQuickViewProduct, addToCart } = useApp();
  const [selectedBrandId, setSelectedBrandId] = useState<string>('all');

  const filteredBrands = selectedBrandId === 'all' 
    ? BRANDS_DATA 
    : BRANDS_DATA.filter(b => b.id === selectedBrandId);

  return (
    <div className="bg-white min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* HERO SEO BANNER */}
        <div className="bg-gradient-to-r from-gray-900 via-[#1E4733] to-[#2E6B4D] text-white rounded-3xl p-8 sm:p-14 mb-12 shadow-2xl">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-emerald-400/20 text-emerald-300 px-3.5 py-1.5 rounded-full text-xs font-bold">
              <Award className="w-4 h-4" />
              <span>Australian Authorised Brand Directory</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Leading E-Bike Brands & Certified Australian Manufacturers
            </h1>
            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
              We partner exclusively with vetted electric bicycle manufacturers whose frames, motor controllers, and lithium battery cells strictly comply with Australian Standard EN 15194 and AS/NZS electrical safety codes.
            </p>
          </div>
        </div>

        {/* BRAND FILTER TABS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-gray-200 no-scrollbar">
          <button
            onClick={() => setSelectedBrandId('all')}
            className={`py-2 px-4 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedBrandId === 'all'
                ? 'bg-[#2E6B4D] text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Verified Brands ({BRANDS_DATA.length})
          </button>
          {BRANDS_DATA.map((brand) => (
            <button
              key={brand.id}
              onClick={() => setSelectedBrandId(brand.id)}
              className={`py-2 px-4 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedBrandId === brand.id
                  ? 'bg-[#2E6B4D] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {brand.name}
            </button>
          ))}
        </div>

        {/* BRANDS DETAILED LIST */}
        <div className="space-y-12">
          {filteredBrands.map((brand) => (
            <div
              key={brand.id}
              className="bg-gray-50 border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Brand Visual and Badges */}
              <div className="lg:col-span-5 space-y-3">
                <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-white border border-gray-200">
                  <Image
                    src={brand.image}
                    alt={`${brand.name} e-bike manufacturer`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    referrerPolicy="no-referrer"
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#1E4733] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md">
                    {brand.country}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 bg-white p-3 rounded-xl border border-gray-200">
                  <span>Founded: <strong>{brand.founded}</strong></span>
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{brand.rating} ({brand.reviewsCount} owner reviews)</span>
                  </div>
                </div>
              </div>

              {/* Brand Content and Strengths */}
              <div className="lg:col-span-7 space-y-4">
                <div>
                  <span className="text-xs font-extrabold uppercase text-[#2E6B4D] tracking-wider block">
                    Certified Brand Profile
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-0.5">
                    {brand.name}
                  </h2>
                  <p className="text-xs sm:text-sm font-semibold text-gray-500 mt-1 italic">
                    {brand.tagline}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {brand.description}
                </p>

                {/* Key Strengths list */}
                <div className="space-y-2 pt-2 border-t border-gray-200">
                  <span className="text-xs font-extrabold text-gray-900 block">
                    Manufacturer Strengths & Safety Compliance:
                  </span>
                  {brand.keyStrengths.map((str, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{str}</span>
                    </div>
                  ))}
                </div>

                {/* Signature Models Bar */}
                <div className="bg-white p-3.5 rounded-2xl border border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-gray-400 block">Signature Models:</span>
                    <span className="font-extrabold text-gray-900">{brand.signatureModels.join(' • ')}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase text-gray-400 block">Australian Warranty:</span>
                    <span className="font-bold text-emerald-800">{brand.warranty}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => {
                      setCurrentView('shop');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="cursor-pointer bg-[#2E6B4D] hover:bg-[#1E4733] text-white px-5 py-3 rounded-xl font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
                  >
                    <span>View {brand.name} E-Bikes</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setCurrentView('legal');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="cursor-pointer bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-3 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#2E6B4D]" />
                    <span>View Compliance Certificate</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* MANUFACTURER CERTIFICATION CHECKLIST */}
        <div className="mt-16 bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Our 4-Point Manufacturer Quality Vetting Protocol
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
              How We Screen E-Bike Brands for Australian Riders
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-emerald-100">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
              <span className="font-black text-white text-sm block">1. Cell Origin Testing</span>
              <p>We mandate Grade-A Samsung, Panasonic, or LG 21700/18650 cells with integrated hardware thermal BMS.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
              <span className="font-black text-white text-sm block">2. ADR & EN15194 Audit</span>
              <p>Certified 250W continuous rated power assist with progressive cut-off at 25 km/h for public road legality.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
              <span className="font-black text-white text-sm block">3. Local Parts Availability</span>
              <p>Guaranteed Brisbane and Sydney stock of replacement controllers, display monitors, and brake pads.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
              <span className="font-black text-white text-sm block">4. Australian Warranty</span>
              <p>Every brand provides an unconditional 2-year frame guarantee backed by our local service network.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
