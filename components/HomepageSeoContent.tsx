'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { BUSINESS_INFO } from '@/lib/data';
import { ArrowRight, BookOpen, ShieldCheck, Truck, Phone } from 'lucide-react';

export default function HomepageSeoContent() {
  const { setCurrentView, setCategoryFilter } = useApp();

  const handleNav = (view: string, cat = 'all') => {
    setCurrentView(view);
    setCategoryFilter(cat);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="border-b border-gray-200 pb-6 mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2E6B4D]">
            Australian E-Mobility Authority
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-1">
            Looking for E Bikes for Sale in Australia? Here Is Everything You Need to Know
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            A comprehensive consumer overview covering legal standards, battery safety, maintenance, and ordering.
          </p>
        </div>

        {/* 500 - 700 WORDS RICH NATURAL SEO ARTICLE */}
        <div className="prose prose-emerald max-w-none text-gray-700 text-sm sm:text-base leading-relaxed space-y-6">
          
          <p>
            When searching for high quality <strong className="text-gray-900 font-bold">e bikes for sale</strong>, discerning Australian riders want a vehicle that blends dependable power, long battery range, and strict legal compliance. As the leading Australian <button onClick={() => handleNav('shop')} className="text-[#2E6B4D] font-bold underline hover:text-[#1E4733]">online e bike shop</button>, <strong>{BUSINESS_INFO.name}</strong> was created to demystify electric mobility, offering road-tested models for city commuters, weekend trail enthusiasts, suburban parents, and commercial delivery fleets.
          </p>

          <h3 className="text-xl font-black text-gray-900 tracking-tight pt-2">
            Why Buy Electric Bicycles Online in Australia?
          </h3>
          <p>
            Shopping at an <button onClick={() => handleNav('shop')} className="text-[#2E6B4D] font-bold underline hover:text-[#1E4733]">electric bikes shop online</button> eliminates high brick-and-mortar markups while granting you access to an extensive fleet of models under one roof. Whether you need a <button onClick={() => handleNav('shop', 'commuter')} className="text-[#2E6B4D] font-bold underline">low cost electric bike</button> for daily university transit, a versatile <button onClick={() => handleNav('shop', 'folding')} className="text-[#2E6B4D] font-bold underline">fold away bicycle</button> to stow inside a caravan or car boot, or a rugged longtail frame to safely transport a <button onClick={() => handleNav('shop', 'cargo')} className="text-[#2E6B4D] font-bold underline">childs bicycle</button> or toddler seat, online ordering gives you transparent specifications and direct component comparisons.
          </p>

          <h3 className="text-xl font-black text-gray-900 tracking-tight pt-2">
            Understanding Australian Pedelec Laws & EN 15194
          </h3>
          <p>
            Operating <strong className="text-gray-900">electric bikes in australia</strong> is governed by harmonised road rules across NSW, Victoria, Queensland, Western Australia, South Australia, Tasmania, ACT, and the Northern Territory. To ride without vehicle registration, number plates, or a driver licence:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
            <li>The motor must be a pedal-assist pedelec system with continuous rated power capped at 250W.</li>
            <li>Electric motor assistance must progressively taper off and cut out once you reach 25 km/h.</li>
            <li>Every rider must wear a helmet conforming strictly to Australian Standard AS/NZS 2063, including our certified <button onClick={() => handleNav('shop', 'helmets')} className="text-[#2E6B4D] font-bold underline">helmet youth bike</button> series.</li>
          </ul>

          <h3 className="text-xl font-black text-gray-900 tracking-tight pt-2">
            Premium Component Engineering: Batteries, Motors & Tyres
          </h3>
          <p>
            The heart of any electric bicycle is its power pack. We exclusively source Grade-A lithium-ion cells from Samsung, Panasonic, and LG equipped with integrated battery management systems (BMS) that prevent overcharging, thermal runaway, and cell imbalance. To keep your ride smooth and flat-free over rough bitumen, we fit high-grade puncture-resistant <button onClick={() => handleNav('shop', 'parts')} className="text-[#2E6B4D] font-bold underline">tyres for cycles</button> with reinforced 5mm rubber compounds and reflective sidewall strips.
          </p>

          <h3 className="text-xl font-black text-gray-900 tracking-tight pt-2">
            Safe Packaging, Australia-Wide Freight & Technician Assembly
          </h3>
          <p>
            Unlike delicate chilled cargo or <span className="text-gray-600 italic">premium beef delivery</span> services that require active refrigeration, electric bicycles require heavy industrial freight care. Every bicycle dispatched from our Australian distribution network is boxed in heavy double-wall corrugated cartons with precision-cut high-density foam blocks. Bikes arrive 85% to 90% assembled. With our included Australian assembly manual and custom toolkit, attaching the handlebars, pedals, and front wheel takes less than 20 minutes. Orders exceeding ${BUSINESS_INFO.freeDeliveryThreshold} qualify for free delivery across metro zones.
          </p>

          <h3 className="text-xl font-black text-gray-900 tracking-tight pt-2">
            Battery Storage & Longevity Practices
          </h3>
          <p>
            To maximise lithium battery health during intense Australian summers, store your battery indoors in a dry area between 10°C and 25°C away from direct sunlight. If storing for winter or travel, leave the charge at approximately 60% and top up every six weeks.
          </p>

          {/* Internal Link Quick Bar */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 mt-6 not-prose flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-bold text-gray-700">Quick Internal Links:</span>
            <div className="flex flex-wrap gap-2 text-xs">
              <button onClick={() => handleNav('shop')} className="cursor-pointer bg-white border border-gray-300 hover:border-[#2E6B4D] hover:bg-emerald-50/50 hover:text-[#2E6B4D] px-3 py-1.5 rounded-lg font-semibold text-gray-800 transition-colors">
                Shop Catalogue
              </button>
              <button onClick={() => handleNav('legal')} className="cursor-pointer bg-white border border-gray-300 hover:border-[#2E6B4D] hover:bg-emerald-50/50 hover:text-[#2E6B4D] px-3 py-1.5 rounded-lg font-semibold text-gray-800 transition-colors">
                Delivery Information
              </button>
              <button onClick={() => handleNav('blog')} className="cursor-pointer bg-white border border-gray-300 hover:border-[#2E6B4D] hover:bg-emerald-50/50 hover:text-[#2E6B4D] px-3 py-1.5 rounded-lg font-semibold text-gray-800 transition-colors">
                Buying Guides & Blog
              </button>
              <button onClick={() => handleNav('contact')} className="cursor-pointer bg-white border border-gray-300 hover:border-[#2E6B4D] hover:bg-emerald-50/50 hover:text-[#2E6B4D] px-3 py-1.5 rounded-lg font-semibold text-gray-800 transition-colors">
                Contact Customer Support
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
