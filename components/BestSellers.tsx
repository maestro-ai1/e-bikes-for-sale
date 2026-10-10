import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/lib/data';
import type { Product } from '@/lib/types';
import ProductCard from '@/components/ProductCard';

/** One featured model per main category (best value first), then filled up to 8 with the next best discounts. */
const FEATURE_ORDER = ['emtb', 'commuter', 'cruiser', 'fat-tyre', 'folding', 'cargo', 'road', 'scooters'];

function featured(): Product[] {
  const byValue = (a: Product, b: Product) =>
    ((b.compareAtPrice || b.price) - b.price) - ((a.compareAtPrice || a.price) - a.price);
  const pool = PRODUCTS.filter((p) => p.image && p.inStock && p.price > 0).sort(byValue);
  const picked: Product[] = [];
  for (const cat of FEATURE_ORDER) {
    const p = pool.find((x) => x.category === cat && !picked.includes(x));
    if (p) picked.push(p);
  }
  for (const p of pool) {
    if (picked.length >= 8) break;
    if (!picked.includes(p) && ['emtb', 'commuter', 'cruiser', 'fat-tyre', 'folding', 'cargo', 'road'].includes(p.category)) picked.push(p);
  }
  return picked.slice(0, 8);
}

export default function BestSellers() {
  const items = featured();
  return (
    <section aria-labelledby="featured-heading" className="border-b border-gray-200 bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="featured-heading" className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
              Featured e-bikes and best value picks
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-600">One top-value model from each range, in stock and ready to order online.</p>
          </div>
          <Link href="/shop" className="inline-flex items-center gap-1.5 text-sm font-black text-[#2E6B4D] hover:underline">
            Shop all products <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {items.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
