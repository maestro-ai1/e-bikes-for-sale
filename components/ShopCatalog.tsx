'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { PRODUCTS, CATEGORIES_CONFIG, BUSINESS_INFO } from '@/lib/data';
import { Product } from '@/lib/types';
import { 
  Filter, 
  Search, 
  SlidersHorizontal, 
  Star, 
  ShoppingBag, 
  Eye, 
  X, 
  RotateCcw,
  Check,
  Coins,
  ShieldCheck,
  Layers
} from 'lucide-react';

export default function ShopCatalog() {
  const { 
    categoryFilter, 
    setCategoryFilter, 
    subcategoryFilter,
    setSubcategoryFilter,
    searchQuery, 
    setSearchQuery, 
    addToCart, 
    setQuickViewProduct,
    viewProduct,
    toggleCompare,
    compareList,
    setCurrentView
  } = useApp();

  const [selectedMotorType, setSelectedMotorType] = useState<string>('all');
  const [selectedFrameType, setSelectedFrameType] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(6000);
  const [minRange, setMinRange] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Active Category Meta
  const activeCategoryMeta = CATEGORIES_CONFIG.find(c => c.id === categoryFilter);

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
      // Subcategory filter
      if (subcategoryFilter !== 'all') {
        const subMatch = 
          p.subcategory?.toLowerCase() === subcategoryFilter.toLowerCase() ||
          p.subcategoryId?.toLowerCase() === subcategoryFilter.toLowerCase();
        if (!subMatch) return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        const matchesTags = p.tags.some(t => t.toLowerCase().includes(q));
        const matchesDesc = p.description.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesTags && !matchesDesc) return false;
      }
      // Motor type
      if (selectedMotorType !== 'all' && p.motorType !== selectedMotorType) return false;
      // Frame type
      if (selectedFrameType !== 'all' && p.frameType !== selectedFrameType) return false;
      // Price
      if (p.price > maxPrice) return false;
      // Range
      if (p.rangeKm < minRange) return false;
      // Stock
      if (inStockOnly && !p.inStock) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'range') return b.rangeKm - a.rangeKm;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [categoryFilter, subcategoryFilter, searchQuery, selectedMotorType, selectedFrameType, maxPrice, minRange, inStockOnly, sortBy]);

  const resetFilters = () => {
    setSelectedMotorType('all');
    setSelectedFrameType('all');
    setMaxPrice(6000);
    setMinRange(0);
    setInStockOnly(false);
    setSearchQuery('');
    setCategoryFilter('all');
    setSubcategoryFilter('all');
  };

  return (
    <div className="bg-white min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* CATEGORY INTRO BANNER & SEO COPY */}
        <div className="bg-gradient-to-r from-gray-900 to-[#1E4733] text-white rounded-3xl p-6 sm:p-10 mb-8 shadow-xl">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase font-extrabold tracking-wider text-amber-400">
              {activeCategoryMeta ? activeCategoryMeta.title : 'All Categories'} • Australia
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {activeCategoryMeta ? activeCategoryMeta.h1 : 'Buy e bikes online Australia'}
            </h1>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
              {activeCategoryMeta ? activeCategoryMeta.metaDescription : (
                <>Welcome to the premier <strong>Online e bikes shop Australia</strong>. Browse our tested fleet of 250W street-legal <strong>electric bicycle Australia</strong> models, certified helmets, replacement batteries, and commuter accessories. All backed by our 2-year warranty and 10% Crypto payment discount.</>
              )}
            </p>
          </div>
        </div>

        {/* CATEGORY TABS BAR */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-gray-200 no-scrollbar">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`cursor-pointer py-2 px-4 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              categoryFilter === 'all'
                ? 'bg-[#2E6B4D] text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Products ({PRODUCTS.length})
          </button>
          {CATEGORIES_CONFIG.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`cursor-pointer py-2 px-4 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                categoryFilter === cat.id
                  ? 'bg-[#2E6B4D] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* MAIN LAYOUT: FILTERS SIDEBAR + PRODUCTS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* DESKTOP FILTERS SIDEBAR */}
          <aside className="hidden lg:block space-y-6 bg-gray-50 p-6 rounded-2xl border border-gray-200/80 h-fit">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <span className="font-extrabold text-sm text-gray-900 flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#2E6B4D]" />
                Filters
              </span>
              <button
                onClick={resetFilters}
                className="text-xs text-gray-500 hover:text-red-600 flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Price Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-800 flex justify-between">
                <span>Max Price (AUD)</span>
                <span className="text-[#2E6B4D] font-extrabold">${maxPrice.toLocaleString()}</span>
              </label>
              <input
                type="range"
                min={50}
                max={6000}
                step={50}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#2E6B4D]"
              />
            </div>

            {/* Range Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-800 flex justify-between">
                <span>Min Battery Range</span>
                <span className="text-[#2E6B4D] font-extrabold">{minRange} km</span>
              </label>
              <input
                type="range"
                min={0}
                max={120}
                step={10}
                value={minRange}
                onChange={(e) => setMinRange(Number(e.target.value))}
                className="w-full accent-[#2E6B4D]"
              />
            </div>

            {/* Motor Location Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-800 block">Motor Drive</label>
              <div className="space-y-1.5 text-xs text-gray-700">
                {['all', 'Hub', 'Mid-Drive'].map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="motorType"
                      checked={selectedMotorType === type}
                      onChange={() => setSelectedMotorType(type)}
                      className="text-[#2E6B4D] focus:ring-[#2E6B4D]"
                    />
                    <span>{type === 'all' ? 'All Motor Locations' : `${type} Motor`}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Frame Type Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-800 block">Frame Geometry</label>
              <select
                value={selectedFrameType}
                onChange={(e) => setSelectedFrameType(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded-lg p-2 bg-white"
              >
                <option value="all">All Frame Styles</option>
                <option value="Step-Through">Step-Through (Upright)</option>
                <option value="Folding">Folding (Compact)</option>
                <option value="Dual Suspension">Dual Suspension (Trail)</option>
                <option value="Crossbar">Crossbar (Sport)</option>
              </select>
            </div>

            {/* In-Stock Toggle */}
            <div className="pt-2 border-t border-gray-200">
              <label className="flex items-center gap-2 text-xs font-bold text-gray-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-[#2E6B4D] focus:ring-[#2E6B4D]"
                />
                <span>In Stock Only ({PRODUCTS.filter(p => p.inStock).length})</span>
              </label>
            </div>

            {/* Crypto 10% promo reminder */}
            <div className="bg-emerald-100/60 border border-emerald-300 rounded-xl p-3 text-xs text-emerald-900 space-y-1">
              <div className="flex items-center gap-1 font-bold">
                <Coins className="w-4 h-4 text-amber-600" />
                <span>Crypto Discount</span>
              </div>
              <p className="text-[11px] text-emerald-800">
                Save an extra 10% automatically when paying with Bitcoin or USDT at checkout!
              </p>
            </div>
          </aside>

          {/* PRODUCTS LISTING COLUMN */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Top Toolbar: Count + Sort + Mobile Filter Trigger */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-200/80">
              <div className="text-xs text-gray-600 font-medium">
                Showing <strong className="text-gray-900 font-extrabold">{filteredProducts.length}</strong> product{filteredProducts.length !== 1 ? 's' : ''}
              </div>

              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                  className="lg:hidden flex items-center gap-1.5 text-xs font-bold bg-white border border-gray-300 px-3 py-1.5 rounded-lg"
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span>Filters</span>
                </button>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-1.5 text-xs text-gray-700">
                  <span className="font-semibold text-gray-500 hidden sm:inline">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#2E6B4D]"
                  >
                    <option value="featured">Featured / Best Sellers</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="range">Longest Battery Range</option>
                    <option value="rating">Highest Customer Rating</option>
                  </select>
                </div>
              </div>
            </div>

            {/* PRODUCT CARDS GRID */}
            {filteredProducts.length === 0 ? (
              <div className="bg-gray-50 rounded-2xl p-12 text-center space-y-3 border border-gray-200">
                <p className="text-base font-bold text-gray-800">No matching products found.</p>
                <p className="text-xs text-gray-500">Try adjusting your filters, price range, or search keywords.</p>
                <button
                  onClick={resetFilters}
                  className="bg-[#2E6B4D] text-white text-xs font-bold px-4 py-2 rounded-xl"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const isCompared = compareList.some((p) => p.id === product.id);
                  const cryptoSavings = Math.round(product.price * (BUSINESS_INFO.cryptoDiscountPercentage / 100));

                  return (
                    <div
                      key={product.id}
                      className="group bg-white rounded-2xl border border-gray-200 hover:border-[#2E6B4D] hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
                    >
                      {/* Image Stage */}
                      <div className="relative aspect-4/3 w-full bg-gray-50 overflow-hidden">
                        {product.badge && (
                          <span className="absolute top-3 left-3 z-10 bg-[#1E4733] text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow-xs">
                            {product.badge}
                          </span>
                        )}

                        <button
                          onClick={() => toggleCompare(product)}
                          className={`cursor-pointer absolute top-3 right-3 z-10 p-1.5 rounded-lg backdrop-blur-md transition-all shadow-xs ${
                            isCompared ? 'bg-[#2E6B4D] text-white' : 'bg-white/80 hover:bg-white text-gray-700'
                          }`}
                          title="Compare"
                        >
                          <SlidersHorizontal className="w-3.5 h-3.5" />
                        </button>

                        <div 
                          onClick={() => viewProduct(product)}
                          className="w-full h-full cursor-pointer relative"
                        >
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            referrerPolicy="no-referrer"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        {product.rangeKm > 0 && (
                          <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                            {product.rangeKm}km Range
                          </div>
                        )}
                      </div>

                      {/* Info & Buy */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-[11px] text-gray-500">
                            <span className="font-semibold text-[#2E6B4D]">{product.categoryLabel}</span>
                            <div className="flex items-center gap-1 text-amber-500 font-bold">
                              <Star className="w-3 h-3 fill-amber-400" />
                              <span>{product.rating}</span>
                            </div>
                          </div>

                          <h3 
                            onClick={() => viewProduct(product)}
                            className="font-extrabold text-gray-900 text-sm leading-tight hover:text-[#2E6B4D] cursor-pointer mt-1"
                          >
                            {product.name}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product.shortDescription}</p>
                        </div>

                        <div className="space-y-1.5 pt-2 border-t border-gray-100">
                          <div className="text-lg font-black text-gray-900">
                            ${product.price.toLocaleString()} AUD
                          </div>
                          
                          <div className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                            <Coins className="w-3 h-3 text-amber-600" />
                            <span>Save ${cryptoSavings} via Bitcoin & USDT (10%)</span>
                          </div>

                          <div className="flex items-center gap-2 pt-2">
                            <button
                              onClick={() => setQuickViewProduct(product)}
                              className="cursor-pointer p-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 text-xs font-bold transition-colors"
                              title="Quick view"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => addToCart(product, 1)}
                              className="cursor-pointer flex-1 bg-[#2E6B4D] hover:bg-[#1E4733] text-white py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>Add to Cart</span>
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
