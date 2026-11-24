import type { Product } from '@/lib/types';

export interface HelmetKind { kids: boolean; fullFace: boolean; mtb: boolean; road: boolean; bmx: boolean; visor: boolean; mips: boolean }

/** What kind of helmet this is, read from the product name (the supplier feed has no structured helmet type). */
export function helmetKind(p: Product): HelmetKind {
  const n = p.name.toLowerCase();
  const kids = /\b(kids?|youth|junior|child|childrens|toddler|teen)\b|crackerjack|scamp|tremor|airo|roar /.test(n);
  const fullFace = /full ?face|fullface|rampage|proframe|switchblade/.test(n);
  const bmx = /bmx|superbold|raven/.test(n);
  const road = /road|agilis|isode|velocita|aero|time trial|triathlon|codatronca/.test(n) && !fullFace;
  const mtb = /mtb|mountain|speedframe|fixture|radix|mainframe|enduro|trail/.test(n) || fullFace;
  return { kids, fullFace, mtb, road, bmx, visor: /visor/.test(n), mips: /mips/.test(n) };
}

/** A keyword about a kind of helmet only goes on a helmet of that kind. */
export function helmetKeywordFits(p: Product, kw: string): boolean {
  if (p.category !== 'helmets') return true;
  const k = kw.toLowerCase(); const h = helmetKind(p);
  if (/full ?face|fullface/.test(k) && !h.fullFace) return false;
  if (/\bmtb\b|mountain|enduro|downhill/.test(k) && !h.mtb) return false;
  if (/\broad\b|racing|aero|time trial/.test(k) && !h.road) return false;
  if (/bmx/.test(k) && !h.bmx) return false;
  if (/kid|child|youth|teen|toddler|kiddie|junior|\dyr|\d yr|year old|baby|infant/.test(k) && !h.kids) return false;
  if (/adults?/.test(k) && h.kids) return false;
  if (/visor/.test(k) && !h.visor) return false;
  const brand = p.brand.toLowerCase();
  for (const b of ['fox', 'giro', 'lazer', 'cinettica', 'raven']) if (new RegExp('\\b' + b + '\\b').test(k) && !brand.includes(b)) return false;
  if (/\bmet\b/.test(k) && brand !== 'met') return false;
  if (/mips/.test(k) && !h.mips) return false;
  return true;
}
