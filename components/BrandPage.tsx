import React from 'react';
import Link from 'next/link';
import ProductImage from '@/components/ProductImage';
import BrandLogo from '@/components/BrandLogo';
import { PRODUCTS } from '@/lib/data';
import { CATALOG_IMAGES } from '@/lib/catalog-images';

/**
 * Brand directory. Everything shown is derived from the live catalog (product counts, photos, links),
 * so it can never describe a brand or a model that is not on the site.
 */
const BRANDS: { key: string; name: string; href: string; node: string; guide?: boolean }[] = [
  { key: 'cube', name: 'Cube', href: '/brands/cube', node: 'brand-cube' },
  { key: 'merida', name: 'Merida', href: '/brands/merida', node: 'brand-merida' },
  { key: 'pedal', name: 'Pedal', href: '/brands/pedal', node: 'brand-pedal' },
  { key: 'dirodi', name: 'DiroDi', href: '/brands/dirodi', node: 'brand-dirodi' },
  { key: 'segway', name: 'Segway-Ninebot', href: '/brands/segway-ninebot', node: 'brand-segway' },
  { key: 'specialized', name: 'Specialized', href: '/brands/specialized', node: 'brand-specialized', guide: true },
  { key: 'trek', name: 'Trek', href: '/brands/trek', node: 'brand-trek', guide: true },
  { key: 'canyon', name: 'Canyon', href: '/brands/canyon', node: 'brand-canyon', guide: true },
  { key: 'pulse', name: 'Pulse', href: '/brands/pulse', node: 'brand-pulse', guide: true },
  { key: 'reid', name: 'Reid', href: '/brands/reid', node: 'brand-reid', guide: true },
  { key: 'aldi', name: 'Aldi', href: '/brands/aldi', node: 'brand-aldi', guide: true },
];

export default function BrandPage() {
  const cards = BRANDS.map((b) => {
    const list = PRODUCTS.filter((p) => p.brand.toLowerCase().includes(b.key));
    const hero = CATALOG_IMAGES[b.node]?.src || list.find((p) => p.image)?.image || '';
    return { ...b, count: list.length, hero };
  });
  const stocked = cards.filter((c) => !c.guide && c.count > 0);
  const guides = cards.filter((c) => c.guide || c.count === 0);

  return (
    <div className="min-h-screen bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-black uppercase tracking-wider text-[#2E6B4D]">Brands</p>
        <h1 className="mt-1 text-3xl font-black tracking-tight text-gray-900 sm:text-5xl">E Bike Brands</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-600">
          Compare electric bike brands in Australia. Each brand page lists the models in our range with current prices, and our independent
          buyer&apos;s guides cover the brands Australians search for most.
        </p>

        <h2 className="mt-10 text-2xl font-black text-gray-900">Brands in our range</h2>
        <ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stocked.map((b) => (
            <li key={b.key} className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
              <Link href={b.href} className="block">
                <div className="aspect-square w-full bg-[#f8fafc]">
                  <ProductImage src={b.hero} focusKeyword={`${b.name} electric bikes`} name={b.name} withContainer={false} />
                </div>
                <div className="p-4">
                  <BrandLogo brand={b.key} height={32} className="mb-2" />
                  <h3 className="text-lg font-black text-gray-900">{b.name}</h3>
                  <p className="mt-1 text-sm text-gray-600">{b.count} {b.count === 1 ? 'model' : 'models'} in our range</p>
                  <span className="mt-3 inline-block text-sm font-black text-[#2E6B4D]">Shop {b.name} →</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <nav aria-label="Brand buyer's guides" className="mt-12">
          <h2 className="text-2xl font-black text-gray-900">Independent buyer&apos;s guides</h2>
          <p className="mt-2 text-gray-600">
            Brand guides for models we do not list directly, with alternatives you can order now.
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
            {guides.map((b) => (
              <li key={b.key}>
                <Link href={b.href} className="flex min-h-11 items-center rounded-xl border border-gray-300 px-4 py-2 text-sm font-bold text-gray-800 hover:border-[#2E6B4D] hover:text-[#2E6B4D]">
                  {b.name} guide
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
