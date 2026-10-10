/**
 * Transactional ("buy / for sale / price") keywords from the Semrush bank, KD 29 or lower, highest volume first,
 * one keyword per URL. They sit in each page's buy-intent slot (`commerce`): they appear in the buyer-intent block,
 * product page tags, FAQs and meta modifiers. Source and audit: seo-strategy/keyword-bank-audit.csv.
 * Each entry: keyword (monthly volume / KD).
 */
export const TRANSACTIONAL_KEYWORDS: Record<string, string[]> = {
  'emtb': [
    "mountain bicycle for sale", // 1600 / KD 22
    "mtb bicycle for sale", // 1600 / KD 22
    "bikes mountain for sale", // 1300 / KD 14
    "mtb mountain bikes for sale", // 1000 / KD 20
    "mtb bikes for sale", // 720 / KD 21
    "mtb for sale", // 590 / KD 17
  ],
  'hub': [
    "electric bike for sale", // 1000 / KD 28
    "e bike sale", // 590 / KD 20
    "e bike price", // 320 / KD 28
    "ebike sales", // 260 / KD 28
    "electric bikes on sale", // 170 / KD 17
  ],
  'brand-specialized': [
    "road specialized bikes", // 720 / KD 22
    "specialized mountain bike", // 590 / KD 28
    "bike mountain specialized", // 320 / KD 19
    "specialized bikes for sale", // 320 / KD 12
    "specialized e bike", // 320 / KD 15
    "specialized mtb bikes", // 320 / KD 14
  ],
  'city-adelaide': [
    "ebike adelaide", // 320 / KD 15
  ],
  'city-brisbane': [
    "e bike brisbane", // 260 / KD 22
    "electric bikes for sale brisbane", // 90 / KD 21
  ],
  'brand-segway': [
    "ninebot scooter segway", // 260 / KD 12
    "segway ninebot e2 e scooter", // 170 / KD 22
    "ninebot segway scooter", // 170 / KD 12
    "ninebot e2 pro price", // 140 / KD 15
    "e scooter segway", // 140 / KD 15
    "segway - ninebot e2 plus", // 90 / KD 14
  ],
  'city-melbourne': [
    "melbourne electric bicycle", // 170 / KD 23
    "e bikes for sale melbourne", // 110 / KD 17
  ],
  'emtb-enduro': [
    "downhill mtb bikes for sale", // 110 / KD 17
    "dh mtb for sale", // 110 / KD 8
    "downhill bicycles for sale", // 110 / KD 15
    "dh bikes for sale", // 110 / KD 14
    "dh mountain bikes for sale", // 90 / KD 14
    "downhill bikes australia", // 30 / KD 5
  ],
  'city-sydney': [
    "e bikes for sale sydney", // 110 / KD 19
  ],
  'gear-helmets': [
    "bike helmet for sale", // 70 / KD 16
    "cheap biker helmets", // 70 / KD 11
    "bike helmets sale", // 50 / KD 14
    "cheap bike helmet", // 40 / KD 10
    "sport bike helmets", // 40 / KD 4
  ],
  'folding': [
    "folding electric bike for sale", // 70 / KD 15
    "fold up bikes for sale", // 70 / KD 17
    "folding bike for sale", // 70 / KD 18
    "fold away bikes for sale", // 70 / KD 14
    "fold up bicycles for sale", // 70 / KD 14
    "foldable bikes for sale", // 50 / KD 14
  ],
  'city-perth': [
    "buy electric bike perth", // 70 / KD 13
    "cargo bikes perth", // 40 / KD 10
  ],
  'batteries': [
    "battery for electric bike", // 50 / KD 12
    "48v e bike battery australia", // 40 / KD 3
    "ebike batteries for sale", // 30 / KD 13
    "ebike battery for sale", // 30 / KD 8
  ],
  'brand-aldi': [
    "aldi e bike price australia", // 50 / KD 17
  ],
  'gear-parts': [
    "electric cycle parts", // 50 / KD 7
    "bosch ebike parts", // 30 / KD 6
  ],
  'kids-helmets': [
    "bike helmet for teenager", // 40 / KD 8
    "full face kids bike helmet", // 40 / KD 6
    "full face mountain bike helmet kids", // 40 / KD 5
    "kids riding helmet", // 40 / KD 7
    "bike helmets kids helmet", // 30 / KD 11
    "childrens bike helmet full face", // 30 / KD 6
  ],
  'gear-accessories': [
    "e bike accessories australia", // 40 / KD 8
  ],
  'sc-kids': [
    "electric scooter teens", // 40 / KD 9
    "electric scooter teenagers", // 30 / KD 15
    "electric scooters for 11 year olds", // 30 / KD 7
    "scooter teens", // 30 / KD 7
    "ninebot kids e scooter", // 30 / KD 15
  ],
  'kids-ebikes': [
    "mini ebike for kids", // 30 / KD 15
  ],
  'emtb-kids': [
    "youth dual suspension mountain bike", // 40 / KD 10
    "kids mountain bikes for sale", // 30 / KD 13
    "dual suspension mountain bike kids", // 30 / KD 5
  ],
  'sc-accessories': [
    "segway ninebot scooter accessories", // 40 / KD 16
    "segway scooter accessories", // 30 / KD 16
  ],
  'sc-electric': [
    "electric scooter for beginners", // 40 / KD 6
    "electric scooter battery 48v", // 30 / KD 3
    "e2 plus electric scooter", // 30 / KD 9
  ],
  'cargo': [
    "cargo e bikes for sale", // 30 / KD 7
    "ebike cargo bike", // 30 / KD 15
  ],
  'sc-adults': [
    "adult kick scooter electric", // 30 / KD 6
    "cheap e scooters for adults", // 30 / KD 17
    "electric motor scooters for adults", // 30 / KD 9
    "electric scooter for adults cheap", // 30 / KD 18
    "scooter adult electric", // 30 / KD 13
  ],
};

/** Existing buy-intent terms first, then the mapped transactional keywords (no duplicates). */
export const withTransactional = (id: string, commerce?: string[]): string[] | undefined => {
  const extra = TRANSACTIONAL_KEYWORDS[id] || [];
  if (!commerce && !extra.length) return undefined;
  return [...new Set([...(commerce || []), ...extra])];
};
