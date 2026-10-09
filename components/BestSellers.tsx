'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { PRODUCTS, BUSINESS_INFO } from '@/lib/data';
import { Product } from '@/lib/types';
import { 
  ShoppingBag, 
  Eye, 
  SlidersHorizontal, 
  Star, 
  Check, 
  Truck, 
  Zap, 
  Coins, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';

export default function BestSellers() {
  const { 
    addToCart, 
    setQuickViewProduct, 
    viewProduct,
    toggleCompare, 
    compareList, 
    setCurrentView, 
    setCategoryFilter 
  } = useApp();

  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  const handleVariantChange = (productId: string, variantLabel: string) => {
    setSelectedVariants((prev) => ({ ...prev, [productId]: variantLabel }));
  };

  const handleAddToCart = (product: Product) => {
    const chosenSize = selectedVariants[product.id] || product.sizeVariants?.[0]?.label || 'Standard';
    addToCart(product, 1, chosenSize);
  };

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2E6B4D] mb-1">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>High Turnover Best Sellers</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Featured E-Bikes & Best Sellers 2026
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-2xl">
              Australia’s most demanded commuter, cargo, folding, and fat tyre electric bicycles. In-stock and ready for rapid dispatch.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentView('shop');
              setCategoryFilter('all');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#2E6B4D] hover:text-[#1E4733] shrink-0"
          >
            <span>Explore All 8 Models</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 8 Featured Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.slice(0, 8).map((product) => {
            const isCompared = compareList.some((p) => p.id === product.id);
            const activeSize = selectedVariants[product.id] || product.sizeVariants?.[0]?.label;
            const sizeObj = product.sizeVariants?.find((v) => v.label === activeSize);
            const currentPrice = product.price + (sizeObj?.priceDelta || 0);
            const cryptoSavings = Math.round(currentPrice * (BUSINESS_INFO.cryptoDiscountPercentage / 100));

            return (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredCard(product.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group bg-white rounded-2xl border border-gray-200/90 hover:border-[#2E6B4D] hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
              >
                {/* TOP IMAGE WRAPPER (Strict 1:1 or 4:3 consistent aspect ratio) */}
                <div className="relative aspect-4/3 w-full bg-gray-50 overflow-hidden">
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
                    {product.badge && (
                      <span className="bg-[#1E4733] text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
                        {product.badge}
                      </span>
                    )}
                    {product.compareAtPrice && product.compareAtPrice > product.price && (
                      <span className="bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs">
                        SAVE ${(product.compareAtPrice - product.price).toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Compare Button */}
                  <button
                    onClick={() => toggleCompare(product)}
                    className={`cursor-pointer absolute top-3 right-3 z-10 p-2 rounded-xl backdrop-blur-md transition-all shadow-xs ${
                      isCompared 
                        ? 'bg-[#2E6B4D] text-white' 
                        : 'bg-white/80 hover:bg-white text-gray-700'
                    }`}
                    title={isCompared ? 'Remove from compare' : 'Add to compare'}
                    aria-label="Compare specifications"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                  </button>

                  {/* Primary & Hover Image Swap */}
                  <div 
                    onClick={() => viewProduct(product)}
                    className="w-full h-full cursor-pointer relative"
                  >
                    <Image
                      src={hoveredCard === product.id && product.hoverImage ? product.hoverImage : product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      referrerPolicy="no-referrer"
                      className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Quick Specs Overlay */}
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] font-bold bg-black/60 backdrop-blur-md text-white px-2.5 py-1.5 rounded-lg pointer-events-none">
                    <span>{product.rangeKm > 0 ? `${product.rangeKm}km Range` : 'AS/NZS 2063'}</span>
                    <span>{product.torqueNm > 0 ? `${product.torqueNm}Nm Torque` : `${product.weightKg}kg Weight`}</span>
                  </div>
                </div>

                {/* CARD BODY CONTENT */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  
                  <div>
                    {/* Category & Star Ratings */}
                    <div className="flex items-center justify-between gap-1 text-xs">
                      <span className="text-[11px] font-semibold text-[#2E6B4D] uppercase tracking-wider">
                        {product.categoryLabel}
                      </span>
                      <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{product.rating}</span>
                        <span className="text-gray-400 text-[10px]">({product.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Product Name */}
                    <h3 
                      onClick={() => viewProduct(product)}
                      className="font-extrabold text-gray-900 text-base leading-snug hover:text-[#2E6B4D] cursor-pointer transition-colors mt-1"
                    >
                      {product.name}
                    </h3>

                    {/* Short Cut / Quality Description */}
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                      {product.shortDescription}
                    </p>

                    {/* Weight / Size Selector Placeholder */}
                    {product.sizeVariants && product.sizeVariants.length > 0 && (
                      <div className="mt-3">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                          Select Frame / Battery Pack:
                        </label>
                        <select
                          value={activeSize}
                          onChange={(e) => handleVariantChange(product.id, e.target.value)}
                          className="w-full text-xs bg-gray-50 border border-gray-200 rounded-lg p-1.5 font-medium text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#2E6B4D]"
                        >
                          {product.sizeVariants.map((v) => (
                            <option key={v.id} value={v.label}>
                              {v.label} {v.priceDelta > 0 ? `(+$${v.priceDelta})` : ''}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  {/* PRICE & PAYMENT BADGES */}
                  <div className="pt-2 border-t border-gray-100 space-y-1.5">
                    
                    {/* Price Placeholder Format: "From $[PRICE]" */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-semibold text-gray-500">From</span>
                      <span className="text-xl font-black text-gray-900 tracking-tight">
                        ${currentPrice.toLocaleString()} AUD
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          ${product.compareAtPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Crypto 10% Discount Badge - Strictly Bitcoin & USDT */}
                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                      <Coins className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>
                        Save 10% (<strong>${cryptoSavings}</strong>) via Bitcoin & USDT
                      </span>
                    </div>

                    {/* Delivery information link */}
                    <div 
                      onClick={() => setQuickViewProduct(product)}
                      className="text-[10px] text-gray-500 hover:text-[#2E6B4D] cursor-pointer flex items-center gap-1 pt-1"
                    >
                      <Truck className="w-3 h-3 text-[#2E6B4D]" />
                      <span>Safe Insured Delivery • 2-Year Aus Warranty</span>
                    </div>
                  </div>

                  {/* ACTION BUTTONS: Add to Cart & View Product */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="cursor-pointer p-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 text-xs font-bold transition-colors shrink-0"
                      title="View full specs"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="cursor-pointer flex-1 bg-[#2E6B4D] hover:bg-[#1E4733] text-white py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
