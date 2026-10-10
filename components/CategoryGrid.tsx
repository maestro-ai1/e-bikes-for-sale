'use client';

import React from 'react';
import SafeImage from '@/components/SafeImage';
import { useApp } from '@/context/AppContext';
import { CATEGORIES_CONFIG, PRODUCTS } from '@/lib/data';
import { catalogUrlFor } from '@/lib/catalog-nav';
import { CATALOG_IMAGES } from '@/lib/catalog-images';
import { nodeById, childrenOf } from '@/lib/catalog';

// The 8 main categories: 7 e-bike categories + scooters. Each card links to its own landing page.
const HOME_CATEGORY_IDS = ['emtb', 'folding', 'cruiser', 'fat-tyre', 'cargo', 'road', 'commuter', 'scooters'];
// One 4:3 card photo per category (1200x900), so every card image has exactly the same shape and nothing is cropped off.
const CARD_IMAGES: Record<string, string> = {
  emtb: '/images/catalog/electric-mountain-bike-card.webp',
  folding: '/images/catalog/folding-e-bike-card.webp',
  cruiser: '/images/catalog/electric-cruiser-bikes-card.webp',
  'fat-tyre': '/images/catalog/fat-tyre-electric-bicycle-card.webp',
  cargo: '/images/catalog/electric-cargo-bikes-card.webp',
  road: '/images/catalog/electric-road-bikes-card.webp',
  commuter: '/images/catalog/electric-commuter-bikes-card.webp',
  scooters: '/images/catalog/electric-scooters-card.webp',
};
const HOME_CATEGORIES = HOME_CATEGORY_IDS.map((id) => CATEGORIES_CONFIG.find((c) => c.id === id)!).filter(Boolean);
import { ArrowRight, Layers } from 'lucide-react';

/** Same product set the category page lists, so the badge always matches the page it links to. */
const nodeFor = (id: string) => nodeById(id === 'scooters' ? 'sc-electric' : id);
const countFor = (id: string) => {
  const node = nodeFor(id);
  return node ? PRODUCTS.filter((p) => node.matches(p)).length : PRODUCTS.filter((p) => p.category === id).length;
};
/** Chips name real child pages of the category (no invented sub-ranges). */
const subLabels = (id: string) => {
  const node = nodeFor(id);
  const kids = node ? childrenOf(node).map((c) => c.navLabel || c.name) : [];
  return kids;
};

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
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f8fafc]">
                <SafeImage
                  src={CARD_IMAGES[category.id] || CATALOG_IMAGES[category.id === 'scooters' ? 'sc-electric' : category.id]?.src || category.image}
                  alt={CATALOG_IMAGES[category.id === 'scooters' ? 'sc-electric' : category.id]?.alt || `${category.title} for sale in Australia`}
                  width={1200}
                  height={900}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                />
                
                {/* Count badge */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-gray-900 font-extrabold text-[11px] px-2.5 py-1 rounded-full shadow-xs">
                  {countFor(category.id)} {countFor(category.id) === 1 ? 'Model' : 'Models'}
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
                    {subLabels(category.id).slice(0, 2).map((sub, i) => (
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
