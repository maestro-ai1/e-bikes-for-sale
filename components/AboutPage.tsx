'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { BUSINESS_INFO } from '@/lib/data';
import { ShieldCheck, Heart, Sparkles, Truck, Users, Award, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const { setCurrentView } = useApp();

  return (
    <div className="bg-white min-h-screen py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* HERO HEADING */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2E6B4D]">
            About Our Mission
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight mt-1">
            Empowering Australian Riders with High Performance E-Bikes
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
            [BUSINESS NAME] was founded to deliver dependable, road-legal electric bicycles to Australian commuters, adventurers, suburban families, and commercial delivery riders.
          </p>
        </div>

        {/* BRAND STORY & QUALITY APPROACH */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-3">
            <h2 className="text-xl font-black text-gray-900">Brand Story & Mission</h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              [BRAND STORY PLACEHOLDER: Our mission is to accelerate sustainable personal transport across Australian cities and regional hubs, providing alternatives to car traffic, expensive parking, and fuel price volatility.]
            </p>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              We focus on premium Samsung and LG lithium battery systems, precision torque-sensing bottom brackets, and strict EN15194 pedelec compliance.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-3">
            <h2 className="text-xl font-black text-gray-900">Our Quality Approach</h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              [PRODUCT SOURCING STATEMENT PLACEHOLDER: Every e-bike model in our fleet undergoes rigorous component benchmarking. We verify electrical isolation, thermal cutoff thresholds, and frame fatigue ratings before inclusion in our Australian catalog.]
            </p>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              All bikes include an Australian 2-Year Comprehensive Warranty backed by our local technical staff.
            </p>
          </div>
        </div>

        {/* 4 PILLARS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16 text-center">
          <div className="p-5 border border-gray-200 rounded-2xl bg-white">
            <ShieldCheck className="w-8 h-8 text-[#2E6B4D] mx-auto mb-2" />
            <h4 className="font-bold text-gray-900 text-sm">EN15194 Certified</h4>
            <p className="text-[11px] text-gray-500 mt-1">100% legal on Australian roads without driver licence.</p>
          </div>

          <div className="p-5 border border-gray-200 rounded-2xl bg-white">
            <Truck className="w-8 h-8 text-[#2E6B4D] mx-auto mb-2" />
            <h4 className="font-bold text-gray-900 text-sm">Safe Delivery</h4>
            <p className="text-[11px] text-gray-500 mt-1">Insured courier dispatch with included assembly toolkit.</p>
          </div>

          <div className="p-5 border border-gray-200 rounded-2xl bg-white">
            <Users className="w-8 h-8 text-[#2E6B4D] mx-auto mb-2" />
            <h4 className="font-bold text-gray-900 text-sm">Direct Support</h4>
            <p className="text-[11px] text-gray-500 mt-1">Call {BUSINESS_INFO.phone} or chat via WhatsApp.</p>
          </div>

          <div className="p-5 border border-gray-200 rounded-2xl bg-white">
            <Sparkles className="w-8 h-8 text-[#2E6B4D] mx-auto mb-2" />
            <h4 className="font-bold text-gray-900 text-sm">10% Crypto Savings</h4>
            <p className="text-[11px] text-gray-500 mt-1">Discount applied automatically on crypto checkout.</p>
          </div>
        </div>

        {/* TEAM & RESPONSIBLE PACKAGING STATEMENTS */}
        <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 mb-12 space-y-4">
          <h3 className="text-2xl font-black text-white">Responsible Packaging & Service Longevity</h3>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            [RESPONSIBLE PACKAGING STATEMENT PLACEHOLDER: We utilise 100% recyclable double-corrugated outer boxes and non-toxic protective inner padding. All lithium batteries are shipped in accordance with Dangerous Goods Section II freight guidelines.]
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                setCurrentView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="cursor-pointer bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs px-6 py-3 rounded-xl inline-flex items-center gap-2 transition-all active:scale-95 shadow-md"
            >
              <span>Explore E-Bikes Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
