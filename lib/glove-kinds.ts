import type { Product } from '@/lib/types';

export interface GloveKind { kids: boolean; mtb: boolean; road: boolean; winter: boolean; womens: boolean; gel: boolean }

/** A cycling glove is an accessory whose name says gloves. */
export const isGlove = (p: Product): boolean => p.category === 'accessories' && /\bgloves?\b/i.test(p.name);

/** What kind of glove this is, read from the product name (the supplier feed has no structured glove type). */
export function gloveKind(p: Product): GloveKind {
  const n = p.name.toLowerCase();
  const kids = /\b(kids?|youth|junior|child|childrens)\b|stocker youth|mini sprinkles/.test(n);
  const winter = /winter|thermal|fleece/.test(n);
  const road = /\broad\b/.test(n);
  const mtb = /mtb|trail|stocker|strapped|ranger|defend/.test(n) && !road && !winter;
  return { kids, mtb, road, winter, womens: /women/.test(n), gel: /\bgel\b|supergel/.test(n) };
}

/** A keyword about a kind of glove only goes on a glove of that kind. */
export function gloveKeywordFits(p: Product, kw: string): boolean {
  if (!isGlove(p)) return true;
  const k = kw.toLowerCase(); const g = gloveKind(p); const brand = p.brand.toLowerCase();
  if (/kid|child|youth|junior/.test(k) && !g.kids) return false;
  if (/\bmen'?s\b|\bmens\b/.test(k) && (g.kids || g.womens)) return false;
  if (/women/.test(k) && !g.womens) return false;
  if (/\bmtb\b|mountain/.test(k) && !g.mtb) return false;
  if (/\broad\b/.test(k) && !g.road) return false;
  if (/winter|thermal/.test(k) && !g.winter) return false;
  if (/padded|gel/.test(k) && !g.gel) return false;
  for (const b of ['fox', 'giro', 'castelli', 'fist', 'bbb', 'cinettica', 'cinnetica']) if (new RegExp('\\b' + b + '\\b').test(k) && !brand.includes(b.replace('cinnetica', 'cinettica'))) return false;
  return true;
}
