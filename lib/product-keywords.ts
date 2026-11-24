/**
 * Product-type keyword pools from the Semrush bank (transactional or commercial intent, KD 29 or lower, highest volume first).
 * A product's tags and FAQ keywords come from its type pool first, then its category keywords, so different kinds of
 * products carry different, relevant keywords. Types the bank has no keywords for (gloves, locks, pumps, nutrition,
 * trainers, headphones, phone mounts) are listed in seo-strategy/product-keyword-gaps.md as a Semrush request.
 * Entry comments: monthly volume / KD.
 */
import type { Product } from '@/lib/types';
import { isKidsPush, isScooterPart, isStunt } from '@/lib/scooter-kinds';
import { helmetKeywordFits } from '@/lib/helmet-kinds';

export const TYPE_KEYWORDS: Record<string, string[]> = {
  'helmet': [
    "e bike helmet", // 590 / KD 8
    "helmets for cycle", // 480 / KD 18
    "bike helmets helmets", // 390 / KD 20
    "electric bike helmet", // 260 / KD 11
    "bike helmet sale", // 170 / KD 9
    "bike riding helmets", // 170 / KD 27
  ],
  'helmet-kids': [
    "helmet youth bike", // 4400 / KD 10
    "childs cycling helmet", // 320 / KD 10
    "kiddies helmets", // 320 / KD 10
    "childrens cycle helmet", // 170 / KD 15
    "childrens cycling helmets", // 170 / KD 13
    "childrens crash helmets", // 140 / KD 8
  ],
  'helmet-mtb': [
    "best e bike helmet full face", // 20 / KD 8
    "e bike full face helmet", // 20 / KD 9
    "e bike helmet full face", // 20 / KD 8
    "e bike helmet full face with visor", // 20 / KD 8
    "ebike full face helmet", // 20 / KD 7
    "full face e bike helmet", // 20 / KD 8
  ],
  'helmet-road': [
    "racing helmet bike", // 50 / KD 8
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
    if (KIDS.test(n)) return 'helmet-kids';
    if (/mtb|mountain|full ?face|fullface|enduro|downhill|trail|speedframe|fixture|radix|mainframe|rampage|proframe/.test(n)) return 'helmet-mtb';
    if (/road|aero|time trial|agilis|isode|velocita/.test(n)) return 'helmet-road';
    return 'helmet';
  }
  if (p.category === 'scooters') {
    if (isStunt(p)) return 'scooter-stunt';
    if (isKidsPush(p)) return 'scooter-kids';
    if (isScooterPart(p)) return /trike|skates|lock/i.test(n) ? null : 'scooter-parts';
    return 'scooter-adult';
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
  return pool.filter((kw) => (/3 wheel/.test(kw) ? /3[- ]wheel|tyke|primo|go up/.test(n) : /2 wheel/.test(kw) ? /2[- ]wheel|flow|duo/.test(n) : /with seat/.test(kw) ? /seat/.test(n) : true));
};
