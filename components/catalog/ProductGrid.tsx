import React from 'react';
import ProductImage from '@/components/ProductImage';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import AddToCartButton from './AddToCartButton';

const money = (n: number) => `$${n.toLocaleString('en-AU')}`;

export default function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <li key={p.id} className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <Link href={`/product/${p.slug}`} className="relative block aspect-square bg-[#f8fafc]">
            <ProductImage
              src={p.image}
              focusKeyword={p.focusKeyword || `${p.brand} ${p.name}`}
              name={p.name}
              loading="lazy"
              withContainer={false}
            />
            {p.badge && (
              <span className="absolute left-3 top-3 rounded-full bg-[#1E4733] px-2.5 py-1 text-[11px] font-black text-white">{p.badge}</span>
            )}
          </Link>
          <div className="flex flex-1 flex-col p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">{p.brand}</p>
            <h3 className="mt-1 text-base font-black leading-snug text-gray-900">
              <Link href={`/product/${p.slug}`} className="hover:text-[#2E6B4D] hover:underline">{p.name}</Link>
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-gray-600">{p.subtitle}</p>
            {p.batteryWh > 0 && (
              <dl className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-lg bg-gray-50 p-2">
                  <dt className="text-gray-500">Battery</dt>
                  <dd className="font-black text-gray-900">{p.batteryWh} Wh</dd>
                </div>
                <div className="rounded-lg bg-gray-50 p-2">
                  <dt className="text-gray-500">Range</dt>
                  <dd className="font-black text-gray-900">{p.rangeKm} km</dd>
                </div>
                <div className="rounded-lg bg-gray-50 p-2">
                  <dt className="text-gray-500">Weight</dt>
                  <dd className="font-black text-gray-900">{p.weightKg} kg</dd>
                </div>
              </dl>
            )}
            <div className="mt-auto pt-4">
              <p className="flex items-baseline gap-2">
                <span className="text-xl font-black text-gray-900">{money(p.price)}</span>
                {p.compareAtPrice && p.compareAtPrice > p.price && (
                  <span className="text-sm text-gray-600 line-through">{money(p.compareAtPrice)}</span>
                )}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <AddToCartButton product={p} />
                <Link
                  href={`/product/${p.slug}`}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-gray-300 px-4 text-sm font-bold text-gray-800 hover:border-[#2E6B4D] hover:text-[#2E6B4D]"
                >
                  View details
                </Link>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
