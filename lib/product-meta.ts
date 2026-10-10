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
  let path = NODE_PATHS[nodeId] || '/ebikes';
  // adult e-scooters live on the adult scooters page (the scooters hub lists its children too)
  if (p.category === 'scooters' && nodeId !== 'sc-kids' && nodeId !== 'sc-accessories' && (p.subcategoryId || '') === 'scooters-adults') path = '/scooters/adults-scooters';
  return { path, label: p.subcategory || p.categoryLabel, nodeId };
}

const money = (n: number) => `$${n.toLocaleString('en-AU')}`;
const isBike = (p: Product) => ['emtb', 'folding', 'cruiser', 'fat-tyre', 'cargo', 'road', 'commuter'].includes(p.category);

/** <= 60 characters, always with a buy-intent modifier when it fits. */
/**
 * Shorten a product name to fit `max` characters without losing the brand or the distinguishing end of the name
 * (model number or colourway), so colourways keep different titles. Generic words go first, then middle words.
 */
export function shortenName(name: string, max: number): string {
  let words = name.replace(/\s+/g, ' ').trim().split(' ');
  const len = () => words.join(' ').length;
  const droppable = ['Electric', 'Bike', 'Bikes', 'Hybrid', 'Performance', 'Mountain', 'with', 'for', 'and', '&'];
  for (const d of droppable) {
    if (len() <= max) break;
    const i = words.findIndex((w, idx) => idx > 0 && idx < words.length - 1 && w.toLowerCase() === d.toLowerCase());
    if (i > 0) words.splice(i, 1);
  }
  // still long: remove words just after the brand, keeping the brand and the last two words
  while (len() > max && words.length > 4) words.splice(1, 1);
  return words.join(' ');
}

export function productTitle(p: Product): string {
  const name = p.name.replace(/\s+/g, ' ').trim();
  for (const suffix of [' | Buy Online Australia', ' | Buy Online']) {
    const room = 60 - suffix.length;
    if (name.length <= room) return name + suffix;
  }
  const suffix = ' | Buy Online';
  return shortenName(name, 60 - suffix.length) + suffix;
}

/** 110-158 characters, buy intent + price + one mapped keyword + a fast-dispatch close. */
export function productDescription(p: Product): string {
  const k = keywordsForProduct(p);
  const term = (k?.commerce && k.commerce[0]) || (p.tags && p.tags[0]) || k?.primary || '';
  const price = p.compareAtPrice && p.compareAtPrice > p.price ? `${money(p.price)} (RRP ${money(p.compareAtPrice)})` : money(p.price);
  const kind = isBike(p) ? 'Pedal assist, EN15194 compliant.' : p.category === 'scooters' ? 'Check your state e-scooter rules.' : 'Certified, quality gear for riders.';
  const kw = term ? `${term.charAt(0).toUpperCase()}${term.slice(1)} range. ` : '';
  const tail = `${kw}${kind} Fast Australia-wide dispatch.`;
  // keep the mapped keyword: shorten the product name (not the keyword) until the whole description fits
  for (const max of [p.name.length, 70, 60, 50, 42, 34]) {
    const n = max >= p.name.length ? p.name : shortenName(p.name, max);
    const d = `Buy the ${n} online in Australia for ${price}. ${tail}`;
    if (d.length <= 158) return d;
  }
  let d = `Buy the ${shortenName(p.name, 34)} online in Australia for ${price}. ${kw}Fast Australia-wide dispatch.`;
  if (d.length > 158) d = `${d.slice(0, 155).replace(/[\s,;:.]+\S*$/, '')}...`;
  return d;
}

/** True when the string carries a transactional modifier. */
export const hasBuyIntent = (s: string) => /\b(buy|for sale|price|shop|order|online|deal|cheap|sale)\b/i.test(s);

/** Paths of the mapped category pages (they list exactly the products mapped to them, plus their children). */
export const MAPPED_PATHS = new Set(Object.values(NODE_PATHS).concat(['/scooters/adults-scooters']));
