import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, HelpCircle } from 'lucide-react';
import { CATALOG_IMAGES } from '@/lib/catalog-images';
import { PRODUCTS } from '@/lib/data';
import type { Product } from '@/lib/types';
import {
  CATALOG,
  EBIKE_CATEGORY_IDS,
  LANDING_PATHS,
  SECTION_MATCH,
  SITE_URL,
  childrenOf,
  nodeById,
  siblingsOf,
  type CatalogNode,
} from '@/lib/catalog';
import ProductGrid from './ProductGrid';

const money = (n: number) => `$${n.toLocaleString('en-AU')}`;
const productsFor = (n: CatalogNode): Product[] => {
  const ps = PRODUCTS.filter(n.matches);
  return n.productLimit ? ps.slice(0, n.productLimit) : ps;
};
const fromPrice = (ps: Product[]) => (ps.length ? Math.min(...ps.map((p) => p.price)) : null);

function crumbs(n: CatalogNode): { name: string; path: string }[] {
  const home = { name: 'Home', path: '/' };
  if (n.id === 'sc-electric') return [home, { name: 'Scooters', path: '/scooters' }];
  if (n.id === 'sc-adults') return [home, { name: 'Scooters', path: '/scooters' }, { name: n.name, path: n.path }];
  if (n.id === 'hub') return [home, { name: 'E-Bikes', path: '/ebikes' }];
  if (n.path.startsWith('/brands/')) return [home, { name: 'Brands', path: '/brands' }, { name: n.name, path: n.path }];
  if (n.kind === 'landing') return [home, { name: n.name, path: n.path }];
  const out = [home, { name: 'E-Bikes', path: '/ebikes' }];
  if (n.kind === 'sub' && n.parent) {
    const p = nodeById(n.parent)!;
    out.push({ name: p.name, path: p.path });
  }
  out.push({ name: n.name, path: n.path });
  return out;
}

function buildJsonLd(n: CatalogNode, listed: Product[]) {
  const trail = crumbs(n);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}${n.path}#page`,
        url: `${SITE_URL}${n.path}`,
        name: n.h1,
        description: n.description,
        inLanguage: 'en-AU',
        isPartOf: { '@type': 'WebSite', name: 'e bikes for sale', url: SITE_URL },
        ...(listed.length ? { mainEntity: { '@id': `${SITE_URL}${n.path}#list` } } : {}),
      },
      ...(listed.length
        ? [
            {
              '@type': 'ItemList',
              '@id': `${SITE_URL}${n.path}#list`,
              numberOfItems: listed.length,
              itemListElement: listed.map((p, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                url: `${SITE_URL}/product/${p.slug}`,
                name: p.name,
              })),
            },
          ]
        : []),
      {
        '@type': 'BreadcrumbList',
        itemListElement: trail.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: c.name,
          item: `${SITE_URL}${c.path === '/' ? '/' : c.path}`,
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: n.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };
}

export default function CatalogPage({ node }: { node: CatalogNode }) {
  const isEbikeHub = node.id === 'hub';
  const kids = childrenOf(node);
  const siblings = siblingsOf(node);
  const categories = isEbikeHub ? EBIKE_CATEGORY_IDS.map((id) => nodeById(id)!) : [];

  // Products listed on this page (for ItemList + grid)
  const ownProducts = isEbikeHub ? categories.flatMap((c) => productsFor(c)) : productsFor(node);
  const sections = (node.sections || []).map((s) => ({ ...s, products: PRODUCTS.filter(SECTION_MATCH[s.id]) }));
  const listed = [...ownProducts, ...sections.flatMap((s) => s.products)];
  const trail = crumbs(node);
  const jsonLd = buildJsonLd(node, listed);
  const startingPrice = fromPrice(listed);
  const banner = CATALOG_IMAGES[node.id];

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-4 pt-5 text-xs text-gray-500 sm:px-6">
        <ol className="flex flex-wrap items-center gap-1">
          {trail.map((c, i) => (
            <li key={c.path} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-3 w-3" aria-hidden="true" />}
              {i < trail.length - 1 ? (
                <Link href={c.path} className="hover:text-[#2E6B4D] hover:underline">{c.name}</Link>
              ) : (
                <span aria-current="page" className="font-semibold text-gray-800">{c.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Hero */}
      <header className="mt-4 bg-gradient-to-br from-[#1E4733] via-[#2E6B4D] to-[#1E4733] text-white">
        <div className={`mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 ${banner ? 'grid items-center gap-8 md:grid-cols-[1.4fr_1fr]' : ''}`}>
          <div>
            <h1 className="max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">{node.h1}</h1>
            <div className="mt-5 max-w-3xl space-y-3 text-base leading-relaxed text-emerald-50/95">
              {node.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {startingPrice !== null && (
              <p className="mt-5 text-sm font-bold text-emerald-100">
                {listed.length} {listed.length === 1 ? 'model' : 'models'} · from {money(startingPrice)} · 250W · EN 15194
              </p>
            )}
          </div>
          {banner && (
            <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-square rounded-3xl border border-white/20 shadow-xl">
              <Image
                src={banner.src}
                alt={banner.alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </header>

      {/* Category tiles (hub) / child + sibling links */}
      {isEbikeHub && (
        <section aria-labelledby="shop-by-category" className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <h2 id="shop-by-category" className="text-2xl font-black tracking-tight text-gray-900">Shop e-bikes by category</h2>
          <ul className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {categories.map((c) => {
              const ps = productsFor(c);
              const fp = fromPrice(ps);
              return (
                <li key={c.id}>
                  <Link
                    href={c.path}
                    className="flex h-full min-h-24 flex-col justify-between rounded-2xl border border-gray-200 p-4 transition-colors hover:border-[#2E6B4D] hover:bg-emerald-50/40"
                  >
                    <span className="text-sm font-black text-gray-900">{c.name}</span>
                    <span className="mt-2 text-xs text-gray-500">
                      {ps.length} {ps.length === 1 ? 'model' : 'models'}{fp !== null ? ` · from ${money(fp)}` : ''}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {isEbikeHub && (
        <nav aria-label="More ways to shop" className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
          <h2 className="text-sm font-black uppercase tracking-wider text-gray-500">More ways to shop</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {CATALOG.filter((c) => LANDING_PATHS.includes(c.path) || c.id === 'kids-ebikes').map((c) => (
              <li key={c.id}>
                <Link href={c.path} className="inline-flex min-h-11 items-center rounded-full border border-gray-300 bg-white px-4 text-sm font-bold text-gray-800 hover:border-[#2E6B4D] hover:text-[#2E6B4D]">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {!isEbikeHub && kids.length > 0 && (
        <nav aria-label={`${node.name} subcategories`} className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
          <h2 className="text-sm font-black uppercase tracking-wider text-gray-500">Shop by style</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {kids.map((k) => (
              <li key={k.id}>
                <Link href={k.path} className="inline-flex min-h-11 items-center rounded-full border border-gray-300 bg-white px-4 text-sm font-bold text-gray-800 hover:border-[#2E6B4D] hover:text-[#2E6B4D]">
                  {k.name}
                </Link>
              </li>
            ))}
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.anchor}`} className="inline-flex min-h-11 items-center rounded-full border border-gray-300 bg-white px-4 text-sm font-bold text-gray-800 hover:border-[#2E6B4D] hover:text-[#2E6B4D]">
                  {s.heading}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Products */}
      {isEbikeHub ? (
        categories.map((c) => {
          const ps = productsFor(c);
          return (
            <section key={c.id} aria-labelledby={`cat-${c.id}`} className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
              <div className="flex flex-wrap items-end justify-between gap-2">
                <h2 id={`cat-${c.id}`} className="text-2xl font-black tracking-tight text-gray-900">{c.name}</h2>
                <Link href={c.path} className="text-sm font-black text-[#2E6B4D] hover:underline">
                  See all {c.name.toLowerCase()} →
                </Link>
              </div>
              <div className="mt-5"><ProductGrid products={ps} /></div>
            </section>
          );
        })
      ) : (
        <section aria-labelledby="products-heading" className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <h2 id="products-heading" className="text-2xl font-black tracking-tight text-gray-900">
            {node.productsHeading || `Shop ${node.name.toLowerCase()}`}
          </h2>
          <div className="mt-5">
            {ownProducts.length ? (
              <ProductGrid products={ownProducts} />
            ) : (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6">
                <h3 className="text-lg font-black text-gray-900">Ask about availability</h3>
                <p className="mt-1 max-w-2xl text-gray-700">Stock for this category changes, so there is no fixed list yet. Tell us what you need and we will come back to you.</p>
                <Link href="/contact" className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-[#2E6B4D] px-5 text-sm font-black text-white hover:bg-[#1E4733]">Contact us</Link>
              </div>
            )}
          </div>
        </section>
      )}

      {node.enquiry && (
        <section aria-labelledby="enquiry-heading" className="mx-auto max-w-6xl px-4 pb-6 sm:px-6">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 sm:p-6">
            <h2 id="enquiry-heading" className="text-xl font-black tracking-tight text-gray-900">Ask about availability</h2>
            <p className="mt-2 max-w-3xl leading-relaxed text-gray-700">{node.enquiry}</p>
            <Link href="/contact" className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-[#2E6B4D] px-5 text-sm font-black text-white hover:bg-[#1E4733]">Contact us</Link>
          </div>
        </section>
      )}

      {/* In-page sections (subcategories without their own URL) */}
      {sections.map((s) => (
        <section key={s.id} id={s.anchor} aria-labelledby={`h-${s.id}`} className="mx-auto max-w-6xl scroll-mt-24 px-4 py-8 sm:px-6">
          <h2 id={`h-${s.id}`} className="text-2xl font-black tracking-tight text-gray-900">{s.heading}</h2>
          <p className="mt-2 max-w-3xl text-gray-600">{s.blurb}</p>
          <div className="mt-5"><ProductGrid products={s.products} /></div>
        </section>
      ))}

      {/* Buyer-intent line: transactional ("for sale") terms from the keyword bank, in natural wording */}
      {node.keywords.commerce && node.keywords.commerce.length > 0 && ownProducts.length > 0 && (
        <section aria-labelledby="buy-heading" className="mx-auto max-w-6xl px-4 pb-6 sm:px-6">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 sm:p-6">
            <h2 id="buy-heading" className="text-xl font-black tracking-tight text-gray-900">Buy {node.name.toLowerCase()} online</h2>
            <p className="mt-2 max-w-3xl leading-relaxed text-gray-700">
              Searching for {node.keywords.commerce.join(' or ')}? Every model above can be ordered online with delivery across Australia, so you can compare specs, add to cart and check out in minutes.
            </p>
          </div>
        </section>
      )}

      {/* Electric vs non-electric bridge + buying guides (unique per page) */}
      <section aria-labelledby="guide-heading" className="border-y border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <h2 id="guide-heading" className="text-2xl font-black tracking-tight text-gray-900">{node.bridge.heading}</h2>
          <p className="mt-3 leading-relaxed text-gray-700">{node.bridge.body}</p>
          {node.guides.map((g) => (
            <div key={g.heading} className="mt-8">
              <h2 className="text-xl font-black tracking-tight text-gray-900">{g.heading}</h2>
              <p className="mt-2 leading-relaxed text-gray-700">{g.body}</p>
            </div>
          ))}
        </div>
      </section>

      {node.links && node.links.length > 0 && (
        <nav aria-label="Related guides" className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <h2 className="text-xl font-black tracking-tight text-gray-900">Related guides and pages</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {node.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-11 items-center rounded-full border border-gray-300 px-4 text-sm font-bold text-gray-800 hover:border-[#2E6B4D] hover:text-[#2E6B4D]">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Related categories (hub & spoke) */}
      {(siblings.length > 0 || node.kind === 'sub') && (
        <nav aria-label="Related categories" className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <h2 className="text-xl font-black tracking-tight text-gray-900">
            {node.kind === 'sub' ? 'More styles' : 'More electric bikes'}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {node.kind === 'sub' && node.parent && (
              <li>
                <Link href={nodeById(node.parent)!.path} className="inline-flex min-h-11 items-center rounded-full bg-[#2E6B4D] px-4 text-sm font-bold text-white hover:bg-[#1E4733]">
                  All {nodeById(node.parent)!.name}
                </Link>
              </li>
            )}
            {(node.kind === 'sub' ? CATALOG.filter((c) => c.parent === node.parent && c.id !== node.id) : siblings).map((s) => (
              <li key={s.id}>
                <Link href={s.path} className="inline-flex min-h-11 items-center rounded-full border border-gray-300 px-4 text-sm font-bold text-gray-800 hover:border-[#2E6B4D] hover:text-[#2E6B4D]">
                  {s.name}
                </Link>
              </li>
            ))}
            {node.kind !== 'sub' && (
              <li>
                <Link href="/ebikes" className="inline-flex min-h-11 items-center rounded-full border border-gray-300 px-4 text-sm font-bold text-gray-800 hover:border-[#2E6B4D] hover:text-[#2E6B4D]">
                  All e-bikes
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}

      {/* Also shop (hub-and-spoke links to the rest of the store) */}
      <nav aria-label="Also shop" className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
        <h2 className="text-sm font-black uppercase tracking-wider text-gray-500">Also shop</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {[
            { href: node.path.startsWith('/scooters') ? '/ebikes' : '/scooters', label: node.path.startsWith('/scooters') ? 'Electric bikes' : 'Electric scooters' },
            ...(node.path.startsWith('/scooters') ? [{ href: '/brands/segway-ninebot', label: 'Segway-Ninebot guide' }] : []),
            { href: '/brands', label: 'Brand guides' },
            { href: '/accessories', label: 'Accessories & locks' },
            { href: '/parts', label: 'Parts & tyres' },
            { href: '/used-electric-bikes', label: 'Used electric bikes' },
            { href: '/contact', label: 'Ask a question' },
          ].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="inline-flex min-h-11 items-center rounded-full border border-gray-300 px-4 text-sm font-bold text-gray-800 hover:border-[#2E6B4D] hover:text-[#2E6B4D]">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="mx-auto max-w-3xl px-4 pb-14 sm:px-6">
        <div className="flex items-center gap-2 text-[#2E6B4D]">
          <HelpCircle className="h-4 w-4" aria-hidden="true" />
          <span className="text-xs font-black uppercase tracking-wider">FAQs</span>
        </div>
        <h2 id="faq-heading" className="mt-1 text-2xl font-black tracking-tight text-gray-900">
          {node.name}: your questions answered
        </h2>
        <div className="mt-5 divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
          {node.faqs.map((f) => (
            <details key={f.q} className="group p-5">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 font-black text-gray-900 marker:hidden">
                <h3 className="text-base">{f.q}</h3>
                <span aria-hidden="true" className="text-xl text-gray-400 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-2 leading-relaxed text-gray-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </article>
  );
}
