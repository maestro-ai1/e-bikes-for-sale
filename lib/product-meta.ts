import type { Product } from '@/lib/types';
import { nodeIdForProduct, keywordsForProduct } from '@/lib/product-seo';

/**
 * Product page SEO (goal: transactions). Every product page title and description carries a buy-intent
 * modifier, the exact product name (its focus keyword), and links up to its mapped category page.
 */

/** Live URL of the catalog page each mapped node id lives at. */
export const NODE_PATHS: Record<string, string> = {
  hub: '/ebikes',
  emtb: '/ebikes/electric-mountain-bike',
  'emtb-hardtail': '/ebikes/electric-mountain-bike/hardtail',
  'emtb-dual': '/ebikes/electric-mountain-bike/dual-suspension',
  'emtb-enduro': '/ebikes/electric-mountain-bike/enduro',
  'emtb-trail': '/ebikes/electric-mountain-bike/trial-suspension',
  'emtb-kids': '/ebikes/electric-mountain-bike/kids-mountain-bikes',
  folding: '/ebikes/folding-e-bike',
  cruiser: '/ebikes/electric-cruiser-bikes',
  'fat-tyre': '/ebikes/fat-tyre-electric-bicycle',
  cargo: '/ebikes/electric-cargo-bikes',
  road: '/ebikes/electric-road-bikes',
  commuter: '/ebikes/electric-commuter-bikes',
  'sc-electric': '/scooters',
  'sc-adults': '/scooters/adults-scooters',
  'sc-kids': '/scooters/kids-scooters',
  'sc-accessories': '/scooters/scooter-accessories',
  'kids-helmets': '/kids-bike-helmets',
  'gear-helmets': '/e-bike-helmets',
  'gear-accessories': '/e-bike-accessories',
  'gear-parts': '/e-bike-parts',
  'brand-segway': '/scooters',
};

export interface CategoryLink { path: string; label: string; nodeId: string }

export function categoryLinkFor(p: Product): CategoryLink {
  const nodeId = nodeIdForProduct(p);
  const path = NODE_PATHS[nodeId] || '/ebikes';
  return { path, label: p.subcategory || p.categoryLabel, nodeId };
}

const money = (n: number) => `$${n.toLocaleString('en-AU')}`;
const isBike = (p: Product) => ['emtb', 'folding', 'cruiser', 'fat-tyre', 'cargo', 'road', 'commuter'].includes(p.category);

/** <= 60 characters, always with a buy-intent modifier when it fits. */
export function productTitle(p: Product): string {
  const name = p.name.replace(/\s+/g, ' ').trim();
  const options = [`${name} | Buy Online Australia`, `${name} | Buy Online`, `${name} | Buy`, name];
  const buyFit = options.slice(0, 3).find((t) => t.length <= 60);
  if (buyFit) return buyFit;
  // long names: drop generic words, then cut at a word boundary, but always keep the buy modifier
  const short = name.replace(/\s+Electric(?=\s)/i, '').replace(/\s+Bike$/i, '').replace(/\s+/g, ' ').trim();
  for (const t of [`${short} | Buy Online`, `${short} | Buy`]) if (t.length <= 60) return t;
  const cut = short.slice(0, 46).replace(/\s+\S*$/, '');
  return `${cut} | Buy Online`;
}

/** 110-158 characters, buy intent + price + one mapped keyword + a fast-dispatch close. */
export function productDescription(p: Product): string {
  const k = keywordsForProduct(p);
  const term = (k?.commerce && k.commerce[0]) || (p.tags && p.tags[0]) || k?.primary || '';
  const price = p.compareAtPrice && p.compareAtPrice > p.price ? `${money(p.price)} (RRP ${money(p.compareAtPrice)})` : money(p.price);
  const kind = isBike(p) ? 'Pedal assist, EN15194 compliant.' : p.category === 'scooters' ? 'Check your state e-scooter rules.' : 'Certified, quality gear for riders.';
  const base = `Buy the ${p.name} online in Australia for ${price}.`;
  const tail = `${term ? `${term.charAt(0).toUpperCase()}${term.slice(1)} range. ` : ''}${kind} Fast Australia-wide dispatch.`;
  let d = `${base} ${tail}`;
  if (d.length > 158) d = `${base} ${kind} Fast Australia-wide dispatch.`;
  if (d.length > 158) d = `Buy the ${p.name} online in Australia for ${price}. Fast Australia-wide dispatch.`;
  if (d.length > 158) d = `${d.slice(0, 155).replace(/[\s,;:.]+\S*$/, '')}...`;
  return d;
}

/** True when the string carries a transactional modifier. */
export const hasBuyIntent = (s: string) => /\b(buy|for sale|price|shop|order|online|deal|cheap|sale)\b/i.test(s);
