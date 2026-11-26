/**
 * Product-type keyword pools from the Semrush bank (transactional or commercial intent, KD 29 or lower, highest volume first).
 * A product's tags and FAQ keywords come from its type pool first, then its category keywords, so different kinds of
 * products carry different, relevant keywords. Types the bank has no keywords for (gloves, locks, pumps, nutrition,
 * trainers, headphones, phone mounts) are listed in seo-strategy/product-keyword-gaps.md as a Semrush request.
 * Entry comments: monthly volume / KD.
 */
import type { Product } from '@/lib/types';
import { isKidsPush, isScooterPart, isStunt } from '@/lib/scooter-kinds';
import { helmetKeywordFits, helmetKind } from '@/lib/helmet-kinds';
import { gloveKeywordFits, gloveKind, isGlove } from '@/lib/glove-kinds';

export const TYPE_KEYWORDS: Record<string, string[]> = {
  'glove': [
    "bike gloves", // 1300 / KD 13
    "best bike gloves", // 90 / KD 10
    "mens bike gloves", // 50 / KD 8
  ],
  'glove-kids': [
    "childs bike gloves", // 480 / KD 10
    "kids mountain bike gloves", // 90 / KD 6
    "bike gloves", // 1300 / KD 13
  ],
  'glove-mtb': [
    "mountain bike gloves", // 480 / KD 9
    "fox mountain bike gloves", // 260 / KD 9
    "bike gloves", // 1300 / KD 13
    "best bike gloves", // 90 / KD 10
  ],
  'glove-road': [
    "road bike gloves", // 140 / KD 10
    "padded bike gloves", // 70 / KD 10
    "bike gloves", // 1300 / KD 13
    "best bike gloves", // 90 / KD 10
  ],
  'glove-winter': [
    "winter biking gloves", // 320 / KD 13
    "bike gloves", // 1300 / KD 13
    "best bike gloves", // 90 / KD 10
  ],
  'helmet': [
    "bike helmets", // 2400 / KD 10
    "helmet bike adults", // 590 / KD 11
    "e bike helmet", // 590 / KD 8
    "helmets bike", // 480 / KD 19
    "adult bike helmet", // 480 / KD 15
    "bike riding helmets", // 170 / KD 14
  ],
  'helmet-kids': [
    "helmet youth bike", // 3600 / KD 9
    "kids bike helmet", // 2400 / KD 14
    "kids bike helmets", // 590 / KD 13
    "childrens mountain bike helmet", // 480 / KD 10
    "bike helmet kids", // 320 / KD 7
    "childrens bike helmets", // 260 / KD 14
    "girls bike helmet", // 260 / KD 9
    "boys bike helmet", // 170 / KD 8
    "youth bike helmets", // 110 / KD 7
  ],
  'helmet-fullface': [
    "full face mountain bike helmet", // 1300 / KD 9
    "fox full face mountain bike helmet", // 210 / KD 9
    "downhill bike helmet", // 170 / KD 17
    "cheap full face mountain bike helmets", // 110 / KD 6
    "best full face mountain bike helmet", // 90 / KD 17
  ],
  'helmet-mtb': [
    "mountain bike helmets", // 480 / KD 20
    "fox mountain bike helmet", // 480 / KD 7
    "fox bike helmet", // 720 / KD 7
    "mips mountain bike helmet", // 140 / KD 7
    "childrens mountain bike helmet", // 480 / KD 10
  ],
  'helmet-road': [
    "road bike helmet", // 1300 / KD 17
    "bike helmets for road bikes", // 390 / KD 22
    "aero bike helmet", // 170 / KD 14
    "best road bike helmet", // 140 / KD 28
    "road bike helmets australia", // 140 / KD 13
  ],
  'light': [
    "ebike lights", // 210 / KD 7
    "electric bike light", // 170 / KD 6
    "light ebike", // 90 / KD 11
    "e-bike front light", // 70 / KD 4
    "electric bike light bar", // 70 / KD 7
    "e bike headlight", // 50 / KD 6
  ],
  'bag-rack': [
    "e bike baskets", // 70 / KD 6
    "ebike basket", // 70 / KD 5
    "electric bicycle basket", // 50 / KD 6
    "cargo bike rack", // 40 / KD 11
  ],
  'saddle': [
    "electric bike seat", // 140 / KD 6
    "e bike seats", // 50 / KD 6
  ],
  'computer': [
    "garmin bike computer", // 1900 / KD 20
    "garmin gps bike computers", // 1900 / KD 29
    "bike computer", // 1300 / KD 28
    "bike cycle computer", // 1300 / KD 12
    "wahoo bike computers", // 320 / KD 19
    "bike gps computer", // 260 / KD 11
  ],
  'scooter-kids': [
    "scooter kids", // 1300 / KD 10
    "scooters for kids", // 720 / KD 9
    "3 wheel scooter for kids", // 390 / KD 6
    "kids 2 wheel scooter", // 260 / KD 8
    "best kids scooter", // 210 / KD 12
    "kids scooter with seat", // 70 / KD 6
  ],
  'scooter-stunt': [
    "stunt trick scooter", // 880 / KD 20
    "stunt scooter", // 720 / KD 18
    "childrens stunt scooters", // 110 / KD 8
    "pro stunt scooters", // 90 / KD 15
    "kids stunt scooter", // 70 / KD 8
    "stunt scooter for beginners", // 70 / KD 9
  ],
  'scooter-adult': [
    "e scooter adults", // 320 / KD 16
    "adults e scooter", // 140 / KD 8
    "adult electric motor scooter", // 110 / KD 16
    "push scooter adults", // 110 / KD 8
    "motorized scooter for adults", // 90 / KD 24
    "adult escooter", // 90 / KD 20
  ],
  'scooter-parts': [
    "scooter parts", // 590 / KD 15
    "scooter parts australia", // 90 / KD 8
    "parts for a scooter", // 70 / KD 16
    "scooter accessories", // 390 / KD 10
  ],
};

const KIDS = /kid|child|youth|junior|toddler|teen/i;

/** Product type used to pick a keyword pool, or null when the bank has none for this kind of product. */
export function productTypeKey(p: Product): string | null {
  const n = `${p.name} ${p.subcategory || ''}`.toLowerCase();
  const sub = (p.subcategoryId || '').toLowerCase();
  if (p.category === 'helmets') {
    const hk = helmetKind(p);
    if (hk.kids) return 'helmet-kids';
    if (hk.fullFace) return 'helmet-fullface';
    if (hk.mtb) return 'helmet-mtb';
    if (hk.road) return 'helmet-road';
    return 'helmet';
  }
  if (p.category === 'scooters') {
    if (isStunt(p)) return 'scooter-stunt';
    if (isKidsPush(p)) return 'scooter-kids';
    if (isScooterPart(p)) return /trike|skates|lock/i.test(n) ? null : 'scooter-parts';
    return 'scooter-adult';
  }
  if (isGlove(p)) {
    const g = gloveKind(p);
    return g.kids ? 'glove-kids' : g.winter ? 'glove-winter' : g.road ? 'glove-road' : g.mtb ? 'glove-mtb' : 'glove';
  }
  if (p.category === 'accessories' || p.category === 'parts') {
    if (/computer|gps|head unit|garmin|wahoo/.test(n)) return 'computer';
    if (/\blights?\b|lumen|headlight/.test(n)) return 'light';
    if (/saddle|seat/.test(n)) return 'saddle';
    if (/pannier|basket|rack|carrier|bag/.test(n)) return 'bag-rack';
    if (/\btyres?\b|\btires?\b|inner tube|\btube\b/.test(n)) return 'tyres-parts';
  }
  return null;
}

/** The keyword pool for a product's type (empty when the bank has none). */
export const typeKeywordsFor = (p: Product): string[] => {
  const k = productTypeKey(p);
  const pool = (k && TYPE_KEYWORDS[k]) || [];
  // a wheel-count or seat keyword only goes on a scooter that has that feature
  const n = p.name.toLowerCase();
  if (p.category === 'helmets') return pool.filter((kw) => helmetKeywordFits(p, kw));
  if (isGlove(p)) return pool.filter((kw) => gloveKeywordFits(p, kw));
  return pool.filter((kw) => (/3 wheel/.test(kw) ? /3[- ]wheel|tyke|primo|go up/.test(n) : /2 wheel/.test(kw) ? /2[- ]wheel|flow|duo/.test(n) : /with seat/.test(kw) ? /seat/.test(n) : true));
};
