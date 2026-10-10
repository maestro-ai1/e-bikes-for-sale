import React from 'react';
import Link from 'next/link';
import ProductImage from '@/components/ProductImage';
import AddToCartButton from '@/components/catalog/AddToCartButton';
import type { Product } from '@/lib/types';

const money = (n: number) => `$${n.toLocaleString('en-AU')}`;

/**
 * The one product card used on the homepage, shop and catalog pages: compact, crawlable, no variant picker.
 * Image (square, #f8fafc) > brand > name > key spec line > price > add to cart + details.
 * Only real data is shown (no ratings, review counts or warranty claims that the catalog does not hold).
 */
export default function ProductCard({ product: p, priority = false }: { product: Product; priority?: boolean }) {
  const href = `/product/${p.slug}`;
  const saving = p.compareAtPrice && p.compareAtPrice > p.price ? p.compareAtPrice - p.price : 0;
  const specs = [
    p.batteryWh > 0 ? `${p.batteryWh} Wh` : '',
    p.torqueNm > 0 ? `${p.torqueNm} Nm` : '',
    p.rangeKm > 0 ? `${p.rangeKm} km` : '',
  ].filter(Boolean).join(' · ');

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-shadow hover:shadow-lg">
      <Link href={href} className="relative block aspect-square bg-[#f8fafc]" aria-label={p.name}>
        <ProductImage
          src={p.image}
          focusKeyword={p.focusKeyword || `${p.brand} ${p.name}`}
          name={p.name}
          loading={priority ? 'eager' : 'lazy'}
          withContainer={false}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
        />
        {saving > 0 && (
          <span className="absolute left-2 top-2 rounded-full bg-red-600 px-2 py-0.5 text-[11px] font-black text-white">Save {money(saving)}</span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-3">
        <p className="text-[11px] font-bold uppercase tracking-wide text-gray-600">{p.brand}</p>
        <h3 className="mt-0.5 line-clamp-2 text-sm font-black leading-snug text-gray-900">
          <Link href={href} className="hover:text-[#2E6B4D] hover:underline">{p.name}</Link>
        </h3>
        {specs && <p className="mt-1 text-xs text-gray-600">{specs}</p>}
        <p className="mt-auto flex items-baseline gap-2 pt-2">
          <span className="text-lg font-black text-gray-900">{money(p.price)}</span>
          {saving > 0 && <span className="text-xs text-gray-600 line-through">{money(p.compareAtPrice as number)}</span>}
        </p>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto]">
          <AddToCartButton product={p} />
          <Link
            href={href}
            className="inline-flex min-h-10 items-center justify-center rounded-xl border border-gray-300 px-3 text-sm font-bold text-gray-800 hover:border-[#2E6B4D] hover:text-[#2E6B4D]"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
