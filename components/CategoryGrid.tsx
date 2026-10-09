'use client';

import React from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { CATEGORIES_CONFIG, PRODUCTS } from '@/lib/data';
import { catalogUrlFor } from '@/lib/catalog-nav';

// The 8 main categories: 7 e-bike categories + scooters. Each card links to its own landing page.
const HOME_CATEGORY_IDS = ['emtb', 'folding', 'cruiser', 'fat-tyre', 'cargo', 'road', 'commuter', 'scooters'];
const HOME_CATEGORIES = HOME_CATEGORY_IDS.map((id) => CATEGORIES_CONFIG.find((c) => c.id === id)!).filter(Boolean);
import { ArrowRight, Layers } from 'lucide-react';

export default function CategoryGrid() {
  const { setCurrentView, setCategoryFilter } = useApp();

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === 'parts') {
      setCurrentView('parts');
      if (typeof window !== 'undefined') window.history.pushState(null, '', '/parts');
    } else if (categoryId === 'scooters') {
      setCurrentView('scooters');
      if (typeof window !== 'undefined') window.history.pushState(null, '', '/scooters');
    } else if (categoryId === 'accessories') {
      setCurrentView('accessories');
      if (typeof window !== 'undefined') window.history.pushState(null, '', '/accessories');
    } else {
      setCurrentView('shop');
      setCategoryFilter(categoryId);
      if (typeof window !== 'undefined') window.history.pushState(null, '', '/shop');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-14 sm:py-20 bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2E6B4D] mb-1">
              <Layers className="w-4 h-4" />
              <span>Explore The Australian Range</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Shop by Category
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-xl">
              High-torque electric bicycles, street-legal personal scooters, certified youth safety helmets, and genuine cycle parts.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentView('shop');
              setCategoryFilter('all');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#2E6B4D] hover:text-[#1E4733] group shrink-0"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Categories Grid - Consistent card size & image aspect ratio */}
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-fr gap-4 sm:gap-5">
          {HOME_CATEGORIES.map((category) => (
            <a
              key={category.id}
              href={catalogUrlFor(category.id === 'scooters' ? 'scooters' : 'ebikes', category.id, 'all') || '/ebikes'}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1 h-full"
            >
              {/* IMAGE CONTAINER - Strict identical aspect ratio & bright imagery */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                <Image
                  src={category.image}
                  alt={`${category.title} for sale in Australia`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  referrerPolicy="no-referrer"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                
                {/* Count badge */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-gray-900 font-extrabold text-[11px] px-2.5 py-1 rounded-full shadow-xs">
                  {PRODUCTS.filter((p) => p.category === category.id).length} {PRODUCTS.filter((p) => p.category === category.id).length === 1 ? 'Model' : 'Models'}
                </div>
              </div>

              {/* CARD BODY */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-gray-900 text-lg group-hover:text-[#2E6B4D] transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                    {category.shortDesc}
                  </p>

                  {/* Subcategories tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3 min-h-[3.25rem] content-start">
                    {category.subcategories.slice(0, 2).map((sub, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA BUTTON */}
                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#2E6B4D] group-hover:underline">
                    Browse Category
                  </span>
                  <div className="w-7 h-7 rounded-full bg-emerald-50 text-[#2E6B4D] group-hover:bg-[#2E6B4D] group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
