'use client';

import React, { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import { useApp } from '@/context/AppContext';
import { PRODUCTS, CATEGORIES_CONFIG, BUSINESS_INFO } from '@/lib/data';
import {
  Search,
  SlidersHorizontal,
  Star,
  ShoppingBag,
  Eye,
  RotateCcw,
  Coins,
} from 'lucide-react';

const PAGE_SIZE = 24;

const PRICE_BANDS: { id: string; label: string; min: number; max: number }[] = [
  { id: 'all', label: 'Any price', min: 0, max: Infinity },
  { id: 'u100', label: 'Under $100', min: 0, max: 100 },
  { id: '100-500', label: '$100 to $500', min: 100, max: 500 },
  { id: '500-1500', label: '$500 to $1,500', min: 500, max: 1500 },
  { id: '1500-3000', label: '$1,500 to $3,000', min: 1500, max: 3000 },
  { id: '3000+', label: '$3,000 and over', min: 3000, max: Infinity },
];

/** Simple shop filter: category, brand, price band, availability, sort. Every control is a plain select or checkbox. */
export default function ShopCatalog() {
  const {
    categoryFilter,
    setCategoryFilter,
    setSubcategoryFilter,
    searchQuery,
    setSearchQuery,
    addToCart,
    setQuickViewProduct,
    viewProduct,
    toggleCompare,
    compareList,
  } = useApp();

  const [brandFilter, setBrandFilter] = useState<string>('all');
  const [priceBand, setPriceBand] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [shown, setShown] = useState<number>(PAGE_SIZE);

  const activeCategoryMeta = CATEGORIES_CONFIG.find((c) => c.id === categoryFilter);

  // Options with live counts so a choice never leads to an empty list.
  const categoryOptions = useMemo(() => {
    const counts = new Map<string, number>();
    PRODUCTS.forEach((p) => counts.set(p.category, (counts.get(p.category) || 0) + 1));
    return CATEGORIES_CONFIG.filter((c) => counts.get(c.id)).map((c) => ({ id: c.id, title: c.title, count: counts.get(c.id)! }));
  }, []);
  const brandOptions = useMemo(() => {
    const counts = new Map<string, number>();
    PRODUCTS.filter((p) => categoryFilter === 'all' || p.category === categoryFilter).forEach((p) => counts.set(p.brand, (counts.get(p.brand) || 0) + 1));
    return [...counts.entries()].sort((x, y) => x[0].localeCompare(y[0])).map(([brand, count]) => ({ brand, count }));
  }, [categoryFilter]);

  const filteredProducts = useMemo(() => {
    const band = PRICE_BANDS.find((b) => b.id === priceBand) || PRICE_BANDS[0];
    const q = searchQuery.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
      if (brandFilter !== 'all' && p.brand !== brandFilter) return false;
      if (p.price < band.min || p.price >= band.max) return false;
      if (inStockOnly && !p.inStock) return false;
      if (q && !(p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q)))) return false;
      return true;
    }).sort((x, y) => {
      if (sortBy === 'price-asc') return x.price - y.price;
      if (sortBy === 'price-desc') return y.price - x.price;
      if (sortBy === 'name') return x.name.localeCompare(y.name);
      return 0;
    });
  }, [categoryFilter, brandFilter, priceBand, inStockOnly, sortBy, searchQuery]);

  const visible = filteredProducts.slice(0, shown);

  const resetFilters = () => {
    setBrandFilter('all');
    setPriceBand('all');
    setInStockOnly(false);
    setSortBy('featured');
    setSearchQuery('');
    setCategoryFilter('all');
    setSubcategoryFilter('all');
    setShown(PAGE_SIZE);
  };
  const onChange = <T,>(setter: (v: T) => void) => (v: T) => { setter(v); setShown(PAGE_SIZE); };

  const selectCls = 'w-full rounded-lg border border-gray-300 bg-white px-2.5 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#2E6B4D]';

  return (
    <div className="bg-white min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HEADING */}
        <div className="mb-6 max-w-3xl space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#2E6B4D]">
            {activeCategoryMeta ? activeCategoryMeta.title : 'All categories'} • Australia
          </span>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
            {activeCategoryMeta ? activeCategoryMeta.h1 : 'Buy e bikes online Australia'}
          </h1>
          <p className="text-sm leading-relaxed text-gray-600">
            {activeCategoryMeta
              ? activeCategoryMeta.metaDescription
              : 'Shop electric bikes, electric scooters, helmets, accessories and parts. Filter by category, brand and price.'}
          </p>
        </div>

        {/* SIMPLE FILTER BAR */}
        <form
          onSubmit={(e) => e.preventDefault()}
          aria-label="Filter products"
          className="mb-6 grid grid-cols-2 gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4 md:grid-cols-3 lg:grid-cols-6"
        >
          <label className="col-span-2 space-y-1 text-[11px] font-bold text-gray-600 md:col-span-3 lg:col-span-2">
            <span>Search</span>
            <span className="relative block">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setShown(PAGE_SIZE); }}
                placeholder="Brand, model or keyword"
                className={`${selectCls} pl-8`}
              />
            </span>
          </label>

          <label className="space-y-1 text-[11px] font-bold text-gray-600">
            <span>Category</span>
            <select
              value={categoryFilter}
              onChange={(e) => { setCategoryFilter(e.target.value); setSubcategoryFilter('all'); setBrandFilter('all'); setShown(PAGE_SIZE); }}
              className={selectCls}
            >
              <option value="all">All categories ({PRODUCTS.length})</option>
              {categoryOptions.map((c) => (
                <option key={c.id} value={c.id}>{c.title} ({c.count})</option>
              ))}
            </select>
          </label>

          <label className="space-y-1 text-[11px] font-bold text-gray-600">
            <span>Brand</span>
            <select value={brandFilter} onChange={(e) => onChange(setBrandFilter)(e.target.value)} className={selectCls}>
              <option value="all">All brands</option>
              {brandOptions.map((b) => (
                <option key={b.brand} value={b.brand}>{b.brand} ({b.count})</option>
              ))}
            </select>
          </label>

          <label className="space-y-1 text-[11px] font-bold text-gray-600">
            <span>Price</span>
            <select value={priceBand} onChange={(e) => onChange(setPriceBand)(e.target.value)} className={selectCls}>
              {PRICE_BANDS.map((b) => (
                <option key={b.id} value={b.id}>{b.label}</option>
              ))}
            </select>
          </label>

          <label className="space-y-1 text-[11px] font-bold text-gray-600">
            <span>Sort by</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={selectCls}>
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="name">Name A to Z</option>
            </select>
          </label>

          <div className="col-span-2 flex items-center justify-between gap-3 md:col-span-3 lg:col-span-6">
            <label className="flex cursor-pointer items-center gap-2 text-xs font-bold text-gray-800">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => onChange(setInStockOnly)(e.target.checked)}
                className="rounded text-[#2E6B4D] focus:ring-[#2E6B4D]"
              />
              <span>In stock only</span>
            </label>
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <span>
                Showing <strong className="font-extrabold text-gray-900">{Math.min(visible.length, filteredProducts.length)}</strong> of{' '}
                <strong className="font-extrabold text-gray-900">{filteredProducts.length}</strong> products
              </span>
              <button type="button" onClick={resetFilters} className="flex items-center gap-1 font-semibold text-gray-500 hover:text-red-600">
                <RotateCcw className="h-3 w-3" />
                Reset
              </button>
            </div>
          </div>
        </form>

        {/* PRODUCT CARDS */}
        <div className="space-y-6">
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
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
                {visible.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          {visible.length < filteredProducts.length && (
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShown((n) => n + PAGE_SIZE)}
                className="rounded-xl border border-[#2E6B4D] px-6 py-2.5 text-sm font-bold text-[#2E6B4D] hover:bg-emerald-50"
              >
                Show more products ({filteredProducts.length - visible.length} left)
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
