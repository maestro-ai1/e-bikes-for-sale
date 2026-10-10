import React from 'react';
import Link from 'next/link';
import ProductImage from '@/components/ProductImage';
import BrandLogo from '@/components/BrandLogo';
import { PRODUCTS } from '@/lib/data';
import { CATALOG_IMAGES } from '@/lib/catalog-images';

/** Homepage "Shop by brand": built from the live catalog, real links, no invented brand stories. */
const BRANDS = [
  { key: 'cube', name: 'Cube', href: '/brands/cube', node: 'brand-cube' },
  { key: 'merida', name: 'Merida', href: '/brands/merida', node: 'brand-merida' },
  { key: 'pedal', name: 'Pedal', href: '/brands/pedal', node: 'brand-pedal' },
  { key: 'dirodi', name: 'DiroDi', href: '/brands/dirodi', node: 'brand-dirodi' },
  { key: 'segway', name: 'Segway-Ninebot', href: '/brands/segway-ninebot', node: 'brand-segway' },
];

export default function BrandsSection() {
  const cards = BRANDS.map((b) => {
    const list = PRODUCTS.filter((p) => p.brand.toLowerCase().includes(b.key));
    return { ...b, count: list.length, hero: CATALOG_IMAGES[b.node]?.src || list.find((p) => p.image)?.image || '' };
  }).filter((c) => c.count > 0);

  return (
    <section aria-labelledby="brands-heading" className="bg-gray-50 py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 id="brands-heading" className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">Shop e bike brands</h2>
          <Link href="/brands" className="text-sm font-black text-[#2E6B4D] hover:underline">All brands →</Link>
        </div>
        <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {cards.map((b) => (
            <li key={b.key} className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
              <Link href={b.href} className="block">
                <div className="aspect-square w-full bg-[#f8fafc]">
                  <ProductImage src={b.hero} focusKeyword={`${b.name} electric bikes`} name={b.name} withContainer={false} />
                </div>
                <div className="p-3">
                  <BrandLogo brand={b.key} height={26} className="mb-1.5" />
                  <h3 className="text-sm font-black text-gray-900">{b.name}</h3>
                  <p className="text-xs text-gray-600">{b.count} {b.count === 1 ? 'model' : 'models'}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
