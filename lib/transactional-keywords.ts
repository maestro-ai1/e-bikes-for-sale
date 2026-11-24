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
    "e bike mtb", // 210 / KD 21 (T, refreshed 2026-11-21)
    "mountain e bikes for sale", // 70 / KD 11 (T, refreshed 2026-11-21)
  ],
  'hub': [
    "electric bike for sale", // 1000 / KD 28
    "e bike sale", // 590 / KD 20
    "e bike price", // 320 / KD 28
    "ebike sales", // 260 / KD 28
    "electric bikes on sale", // 170 / KD 17
    "buy e bike", // 590 / KD 6 (T, refreshed 2026-11-21)
    "e bike on sale", // 90 / KD 17 (T, refreshed 2026-11-21)
    "prices for e bikes", // 90 / KD 17 (T, refreshed 2026-11-21)
    "buying e bike", // 110 / KD 23 (T, refreshed 2026-11-22)
    "ebike price in australia", // 70 / KD 27 (T, refreshed 2026-11-22)
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
    "e bikes for sale brisbane", // 70 / KD 9 (T, refreshed 2026-11-21)
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
    "e bike perth", // 390 / KD 18 (T, refreshed 2026-11-21)
    "e bikes for sale perth", // 140 / KD 16 (T, refreshed 2026-11-21)
    "electric bikes perth wa", // 260 / KD 12 (T, refreshed 2026-11-22)
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
    "scooter teens", // 30 / KD 7
    "kids scooters for sale", // 110 / KD 15 (T, refreshed 2026-11-24)
    "buy kids scooter", // 70 / KD 20 (T, refreshed 2026-11-24)
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
    "electric scooters for sale", // 590 / KD 14 (T, refreshed 2026-11-22)
    "cheapest electric scooters", // 390 / KD 19 (T, refreshed 2026-11-22)
    "scooter electric folding", // 70 / KD 6 (TI, refreshed 2026-11-22)
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
  'brand-dirodi': [
  ],
  'conversion': [
    "e bike conversion kit 250w", // 260 / KD 0 (T, refreshed 2026-11-21)
    "electric bike kit 5000w", // 590 / KD 2 (TI, refreshed 2026-11-22)
  ],
  'brand-merida': [
  ],
  'brand-pedal': [
    "pedal e bike price", // 90 / KD 15 (T, refreshed 2026-11-21)
  ],
  'brand-cube': [
    "cube e bikes australia", // 140 / KD 6 (T, refreshed 2026-11-21)
  ],
  'cruiser': [
    "e bike beach cruiser", // 320 / KD 18 (T, refreshed 2026-11-22)
  ],
  'road': [
    "electric road bikes for sale", // 50 / KD 11 (T, refreshed 2026-11-22)
  ],
};

/** Existing buy-intent terms first, then the mapped transactional keywords (no duplicates). */
export const withTransactional = (id: string, commerce?: string[]): string[] | undefined => {
  const extra = TRANSACTIONAL_KEYWORDS[id] || [];
  if (!commerce && !extra.length) return undefined;
  return [...new Set([...(commerce || []), ...extra])];
};

/**
 * Remaining bank keywords related to each page (transactional or commercial, KD 29 or lower, highest volume first,
 * one keyword per page). They extend each page's supporting set: used for product tags and FAQs, never listed in copy.
 * Entry comments: monthly volume / KD.
 */
export const EXTRA_SUPPORTING: Record<string, string[]> = {
  'folding': [
    "folding electric bikes", // 720 / KD 7 (Commercial)
    "folding electric cycles", // 590 / KD 17 (Commercial)
    "ebikes folding", // 480 / KD 8 (Commercial)
    "ebike folding bike", // 480 / KD 17 (Commercial)
    "folding bikes", // 480 / KD 20 (Commercial)
    "foldable e bike", // 390 / KD 11 (Commercial)
    "electric folding bike", // 390 / KD 12 (Commercial)
    "foldable a bike", // 390 / KD 19 (Commercial)
    "fold up e bike", // 320 / KD 8 (Commercial)
    "folding electric bikes australia", // 320 / KD 17 (Commercial)
    "foldable electric bike australia", // 320 / KD 14 (Commercial)
    "fold up bike", // 320 / KD 17 (Commercial)
    "foldable bikes", // 320 / KD 24 (Commercial)
    "electric folding bicycles australia", // 260 / KD 6 (Commercial)
    "e bike fold", // 390 / KD 10 (CI, refreshed 2026-11-21)
    "foldable electric bikes", // 320 / KD 13 (CI, refreshed 2026-11-22)
    "ebike foldable", // 210 / KD 17 (C, refreshed 2026-11-22)
    "foldable electric bikes australia", // 210 / KD 13 (CI, refreshed 2026-11-22)
    "folding ebike australia", // 210 / KD 11 (C, refreshed 2026-11-22)
    "20 inch electric bike", // 210 / KD 18 (C, refreshed 2026-11-22)
  ],
  'hub': [
    "best ebikes", // 590 / KD 28 (Commercial)
    "discount ebike", // 590 / KD 11 (Commercial)
    "best ebikes australia", // 480 / KD 8 (Commercial)
    "e bike cost", // 390 / KD 22 (Commercial)
    "electric bike sale", // 390 / KD 28 (Transactional)
    "e-bikes for sale", // 320 / KD 28 (Transactional)
    "electric bicycle mid drive kit", // 320 / KD 13 (Commercial)
    "batterie ebike", // 260 / KD 2 (Commercial)
    "e bike electric motor", // 260 / KD 19 (Commercial)
    "e bike 250w", // 260 / KD 16 (Commercial)
    "e bike repair", // 260 / KD 9 (Commercial)
    "australian electric bike", // 260 / KD 28 (Commercial)
    "the electric bicycle company", // 260 / KD 14 (Commercial)
    "spezialist ebike", // 260 / KD 24 (Commercial)
    "best ebike", // 880 / KD 24 (C, refreshed 2026-11-22)
    "ebike cost", // 210 / KD 15 (C, refreshed 2026-11-22)
    "electric bike best", // 170 / KD 26 (C, refreshed 2026-11-22)
    "long range electric bike", // 210 / KD 18 (C, refreshed 2026-11-22)
  ],
  'cheap': [
    "cheapest e bike", // 480 / KD 14 (Commercial)
    "e bike cheap", // 390 / KD 15 (Commercial)
    "second hand electric bikes", // 390 / KD 13 (Commercial)
    "used e bikes for sale", // 320 / KD 17 (Transactional)
    "used electric bikes", // 320 / KD 23 (Commercial)
    "e bike second hand", // 210 / KD 9 (Commercial)
    "second hand e bikes for sale", // 210 / KD 11 (Transactional)
    "e bikes used", // 140 / KD 12 (Commercial)
    "best budget electric bike australia", // 110 / KD 13 (Commercial)
    "second hand e cycle", // 90 / KD 18 (Commercial)
    "best cheap ebike australia", // 50 / KD 10 (Commercial)
    "bike electric used", // 50 / KD 12 (Commercial)
    "e bikes for sale second hand", // 50 / KD 13 (Transactional)
    "ebike second hand for sale", // 50 / KD 14 (Transactional)
    "e-bikes under $1000", // 720 / KD 15 (C, refreshed 2026-11-21)
    "cheap e bike", // 480 / KD 23 (C, refreshed 2026-11-21)
    "affordable e-bike australia", // 320 / KD 15 (CI, refreshed 2026-11-21)
    "affordable e-bikes", // 320 / KD 24 (CI, refreshed 2026-11-21)
    "cheap e bikes australia", // 170 / KD 24 (C, refreshed 2026-11-21)
    "cheap ebikes", // 1300 / KD 23 (CI, refreshed 2026-11-22)
    "cheap electric bikes australia under $500", // 720 / KD 18 (CI, refreshed 2026-11-22)
    "e bike under $1000", // 590 / KD 16 (C, refreshed 2026-11-22)
    "ebike cheap", // 390 / KD 18 (CI, refreshed 2026-11-22)
    "ebike under $1000", // 260 / KD 17 (C, refreshed 2026-11-22)
    "cheapest ebike", // 320 / KD 19 (C, refreshed 2026-11-22)
    "bike electric cheap", // 210 / KD 19 (CI, refreshed 2026-11-22)
    "best budget electric bike", // 170 / KD 6 (C, refreshed 2026-11-22)
    "budget electric bike", // 170 / KD 23 (C, refreshed 2026-11-22)
    "e bike affordable", // 170 / KD 26 (C, refreshed 2026-11-22)
    "cheapest best electric bike", // 210 / KD 23 (C, refreshed 2026-11-22)
  ],
  'city-melbourne': [
    "e bike melbourne", // 480 / KD 26 (Commercial)
    "melbourne ebike", // 390 / KD 26 (Commercial)
    "ebike for sale melbourne", // 90 / KD 15 (Transactional)
    "best electric bike melbourne", // 50 / KD 8 (Commercial)
    "folding bike melbourne", // 30 / KD 13 (Commercial)
  ],
  'conversion': [
    "ebike conversion kits", // 390 / KD 27 (Commercial)
    "electric bike conversion", // 390 / KD 22 (Commercial)
    "e bike kits", // 320 / KD 7 (Commercial)
    "conversion kit e bike", // 210 / KD 22 (Commercial)
    "ebike hub motor", // 170 / KD 13 (Commercial)
    "conversion kit for ebike", // 170 / KD 8 (Commercial)
    "ebike conversion kits australia", // 170 / KD 4 (Commercial)
    "electric bike motor kit", // 140 / KD 27 (Commercial)
    "e bike conversion kits with battery", // 140 / KD 6 (Commercial)
    "electric conversion kits for bikes", // 140 / KD 18 (Commercial)
    "bicycle motor kit", // 140 / KD 19 (Commercial)
    "e bike kits australia", // 140 / KD 4 (Commercial)
    "bike electric conversion kit with battery", // 110 / KD 13 (Commercial)
    "e bike conversion kit battery", // 110 / KD 7 (Commercial)
    "electric bicycle e bike conversion kits", // 480 / KD 3 (C, refreshed 2026-11-21)
    "e bike conversion kits australia", // 260 / KD 2 (CI, refreshed 2026-11-21)
    "e bike conversion kit 1500w", // 210 / KD 2 (C, refreshed 2026-11-21)
    "bicycle e bike kit", // 480 / KD 4 (C, refreshed 2026-11-22)
    "ebike kits", // 480 / KD 13 (C, refreshed 2026-11-22)
    "1000w ebike conversion kit", // 140 / KD 2 (CI, refreshed 2026-11-22)
    "electric bike conversion kit with battery", // 390 / KD 6 (CI, refreshed 2026-11-22)
    "mid drive ebike kit", // 390 / KD 19 (CI, refreshed 2026-11-22)
    "250 watt electric bike conversion kit", // 320 / KD 23 (C, refreshed 2026-11-22)
    "2000w ebike conversion kit", // 260 / KD 6 (C, refreshed 2026-11-22)
    "2000w ebike kit", // 260 / KD 8 (CI, refreshed 2026-11-22)
    "electric bike conversion kit with battery australia", // 260 / KD 9 (CI, refreshed 2026-11-22)
    "electric bike conversion kit 1500w", // 260 / KD 2 (C, refreshed 2026-11-22)
    "3000w ebike conversion kit", // 210 / KD 3 (C, refreshed 2026-11-22)
    "3000w ebike kit", // 210 / KD 3 (C, refreshed 2026-11-22)
    "72v 2000w ebike kit with battery", // 210 / KD 6 (C, refreshed 2026-11-22)
    "electric bike kits", // 210 / KD 3 (C, refreshed 2026-11-22)
    "2000w electric bike kit", // 170 / KD 10 (CI, refreshed 2026-11-22)
    "mid drive electric bike kit", // 320 / KD 17 (C, refreshed 2026-11-22)
  ],
  'emtb': [
    "mtb entry level", // 390 / KD 20 (Commercial)
    "cheap mtb bikes", // 320 / KD 22 (Commercial)
    "mtb sale", // 260 / KD 15 (Transactional)
    "e mtb for sale", // 210 / KD 9 (Transactional)
    "e mtb sale", // 210 / KD 10 (Transactional)
    "electric bicycle mtb", // 210 / KD 21 (Commercial)
    "mtb e bike", // 170 / KD 24 (Commercial)
    "e-mtb", // 170 / KD 27 (Commercial)
    "good mtb bike", // 170 / KD 28 (Commercial)
    "e mtb bike", // 140 / KD 21 (Commercial)
    "emtb bike", // 140 / KD 26 (Commercial)
    "e mtb australia", // 140 / KD 16 (Commercial)
    "mens mtb for sale", // 140 / KD 18 (Transactional)
    "buy mtb bike", // 90 / KD 28 (Transactional)
    "e bike off road", // 320 / KD 6 (C, refreshed 2026-11-21)
    "e bike offroad", // 320 / KD 6 (C, refreshed 2026-11-21)
    "electric off road bike", // 590 / KD 6 (C, refreshed 2026-11-22)
    "electric mountain bike australia", // 480 / KD 10 (C, refreshed 2026-11-22)
    "off road ebike", // 480 / KD 6 (C, refreshed 2026-11-22)
    "ebike mountain bike", // 390 / KD 17 (C, refreshed 2026-11-22)
    "best electric mountain bike", // 260 / KD 28 (C, refreshed 2026-11-22)
    "off road ebikes", // 320 / KD 6 (C, refreshed 2026-11-22)
    "ebike mountain bikes", // 260 / KD 7 (C, refreshed 2026-11-22)
    "electric offroad bike", // 210 / KD 6 (C, refreshed 2026-11-22)
    "full suspension electric mountain bike", // 210 / KD 11 (CI, refreshed 2026-11-22)
    "best electric mountain bike under $3000 australia", // 170 / KD 17 (C, refreshed 2026-11-22)
    "mid drive ebikes", // 260 / KD 8 (C, refreshed 2026-11-22)
  ],
  'fat-tyre': [
    "fat tire electric bikes", // 320 / KD 14 (Commercial)
    "electric bike fat tyre", // 210 / KD 17 (Commercial)
    "fat wheel ebike", // 170 / KD 11 (Commercial)
    "fat tyre e bikes", // 170 / KD 10 (Commercial)
    "fat e bikes", // 140 / KD 17 (Commercial)
    "fat tyre ebike australia", // 140 / KD 16 (Commercial)
    "fat tire mtb bikes", // 140 / KD 12 (Commercial)
    "electric fat bikes", // 110 / KD 10 (Commercial)
    "fat wheel bicycle", // 110 / KD 14 (Commercial)
    "fat wheel bike", // 110 / KD 8 (Commercial)
    "fat bikes australia", // 110 / KD 8 (Commercial)
    "electric fat tyre bikes", // 90 / KD 18 (Commercial)
    "e bike fat tire", // 90 / KD 9 (Commercial)
    "fatbike ebike", // 70 / KD 15 (Commercial)
    "fat tyre e bike", // 480 / KD 13 (CI, refreshed 2026-11-21)
    "fat tire e bikes", // 390 / KD 6 (C, refreshed 2026-11-21)
    "fat tire electric bike", // 720 / KD 14 (C, refreshed 2026-11-22)
    "fat tyre electric bikes", // 390 / KD 12 (CI, refreshed 2026-11-22)
    "fat tire e bike", // 320 / KD 11 (C, refreshed 2026-11-22)
    "best fat tyre electric bike australia", // 320 / KD 4 (C, refreshed 2026-11-22)
    "electric mini bike", // 590 / KD 6 (C, refreshed 2026-11-22)
    "ebike fat tire", // 210 / KD 12 (C, refreshed 2026-11-22)
  ],
  'brand-specialized': [
    "specialised ebike", // 320 / KD 24 (Commercial)
    "specialized dual suspension", // 210 / KD 26 (Transactional)
    "specialized gravel bikes", // 210 / KD 10 (Transactional)
    "specialized turbo vado", // 110 / KD 22 (Commercial)
    "specialized vado", // 110 / KD 13 (Commercial)
    "specialized ebike australia", // 90 / KD 24 (Commercial)
    "specialized electric", // 90 / KD 20 (Transactional)
  ],
  'batteries': [
    "ebike battery charger", // 210 / KD 3 (Commercial)
    "48v ebike battery charger", // 110 / KD 3 (Commercial)
    "e bike batteries australia", // 90 / KD 13 (Commercial)
    "e bike chargers", // 90 / KD 6 (Commercial)
    "e bike battery lithium ion", // 90 / KD 1 (Commercial)
    "ebike battery charger 48v", // 90 / KD 3 (Commercial)
    "electric bike battery replacement", // 70 / KD 12 (Commercial)
    "48v e-bike battery australia", // 70 / KD 7 (Commercial)
    "battery for bike", // 70 / KD 8 (Commercial)
    "48 volt battery for ebike", // 70 / KD 4 (Commercial)
    "ebike 48 volt battery", // 70 / KD 2 (Commercial)
    "electric bicycle battery 48v", // 70 / KD 6 (Commercial)
    "charger for ebike", // 70 / KD 4 (Commercial)
    "bike battery lithium", // 70 / KD 11 (Commercial)
    "battery e bike 48v", // 260 / KD 3 (CI, refreshed 2026-11-21)
    "e bike battery charger", // 260 / KD 4 (C, refreshed 2026-11-21)
    "e bike charger", // 260 / KD 6 (C, refreshed 2026-11-21)
    "e bike battery bag", // 210 / KD 6 (C, refreshed 2026-11-21)
    "e bike battery replacement", // 210 / KD 7 (C, refreshed 2026-11-21)
    "72v ebike battery", // 320 / KD 7 (C, refreshed 2026-11-22)
    "52v ebike battery", // 320 / KD 4 (CI, refreshed 2026-11-22)
    "battery ebike 48v", // 320 / KD 3 (CI, refreshed 2026-11-22)
    "electric bike battery chargers", // 260 / KD 4 (C, refreshed 2026-11-22)
    "36v ebike battery", // 260 / KD 21 (C, refreshed 2026-11-22)
    "ebike battery bag", // 260 / KD 8 (C, refreshed 2026-11-22)
    "battery ebike 36v", // 210 / KD 6 (C, refreshed 2026-11-22)
    "ebike battery 52v", // 210 / KD 4 (C, refreshed 2026-11-22)
  ],
  'kids-ebikes': [
    "kids electric bikes", // 170 / KD 15 (Commercial)
    "ebike for kids", // 140 / KD 20 (Commercial)
    "childrens bikes with gears", // 110 / KD 17 (Commercial)
    "kid bikes", // 110 / KD 19 (Commercial)
    "kids 14 inch bike", // 110 / KD 8 (Commercial)
    "childrens folding bike", // 90 / KD 9 (Commercial)
    "childrens electric bike", // 90 / KD 13 (Commercial)
    "childs bike", // 90 / KD 14 (Commercial)
    "ebike kids", // 70 / KD 15 (Commercial)
    "youth electric bike", // 70 / KD 15 (Commercial)
    "e bike for 12 year olds", // 70 / KD 21 (Commercial)
    "teenage electric bikes", // 70 / KD 6 (Commercial)
    "e bike with kids seat", // 70 / KD 5 (Commercial)
    "bike teens", // 70 / KD 18 (Commercial)
  ],
  'commuter': [
    "hybrid e bikes", // 140 / KD 17 (Commercial)
    "electric bike hybrid", // 70 / KD 9 (Commercial)
    "electric city bicycle", // 70 / KD 15 (Commercial)
    "best ebike for commuting australia", // 50 / KD 13 (Commercial)
    "electric commuter bike australia", // 50 / KD 4 (Commercial)
    "best ebike for commuting", // 50 / KD 19 (Commercial)
    "commuter ebikes", // 50 / KD 11 (Commercial)
    "electric bike for commuting", // 50 / KD 12 (Commercial)
    "e-hybrid bike", // 50 / KD 13 (Commercial)
    "light hybrid bicycle", // 50 / KD 26 (Commercial)
    "ebike urban", // 50 / KD 6 (Commercial)
    "ladies e bike", // 260 / KD 10 (CI, refreshed 2026-11-21)
    "step through e bike", // 260 / KD 8 (CI, refreshed 2026-11-21)
    "ebike commute", // 1000 / KD 17 (C, refreshed 2026-11-22)
    "e-bike commuting", // 480 / KD 8 (C, refreshed 2026-11-22)
    "step through ebike", // 390 / KD 8 (CI, refreshed 2026-11-22)
    "ladies ebike", // 320 / KD 11 (C, refreshed 2026-11-22)
    "250w electric bike", // 590 / KD 9 (C, refreshed 2026-11-22)
    "mens e bike", // 170 / KD 24 (C, refreshed 2026-11-22)
  ],
  'gear-accessories': [
    "e-bike accessories", // 140 / KD 12 (Commercial)
    "ebike basket", // 70 / KD 5 (Commercial)
    "bikes with a basket", // 50 / KD 9 (Commercial)
    "headlight for a bike", // 50 / KD 13 (Commercial)
    "ebike accessories australia", // 30 / KD 5 (Commercial)
    "eco bike accessories", // 30 / KD 6 (Commercial)
    "accessories for an electric bike", // 20 / KD 5 (Commercial)
    "accessories for electra bikes", // 20 / KD 17 (Commercial)
    "best ebike accessories 2025", // 20 / KD 4 (Commercial)
    "e bike accessories and parts", // 20 / KD 7 (Transactional)
    "e bike parts and accessories", // 20 / KD 4 (Transactional)
    "e dirt bike accessories", // 20 / KD 15 (Commercial)
    "echo bike accessories", // 20 / KD 26 (Transactional)
    "electra bicycle accessories", // 20 / KD 15 (Transactional)
    "electric bike basket", // 50 / KD 6 (C, refreshed 2026-11-22)
    "ebike rack", // 320 / KD 4 (C, refreshed 2026-11-22)
    "electric bike lock", // 260 / KD 9 (CI, refreshed 2026-11-22)
    "ebike lock", // 210 / KD 9 (CI, refreshed 2026-11-22)
    "electric bike rack", // 210 / KD 7 (T, refreshed 2026-11-22)
    "e bike lights", // 170 / KD 7 (CI, refreshed 2026-11-22)
    "electric bike trailer", // 210 / KD 14 (C, refreshed 2026-11-22)
  ],
  'cargo': [
    "cargo electric bike", // 110 / KD 6 (Commercial)
    "e-bike cargo", // 70 / KD 11 (Commercial)
    "long tail cargo bike", // 50 / KD 10 (Commercial)
    "cargo electric bike australia", // 50 / KD 19 (Commercial)
    "best cargo bikes australia", // 40 / KD 20 (Commercial)
    "cargo bike longtail", // 40 / KD 9 (Commercial)
    "compact electric cargo bike", // 40 / KD 11 (Commercial)
    "e bike with cargo", // 40 / KD 19 (Commercial)
    "ecargo bikes", // 40 / KD 6 (Commercial)
    "front loader cargo bike", // 30 / KD 6 (Commercial)
    "nihola cargo bike", // 30 / KD 12 (Commercial)
    "non electric cargo bike", // 30 / KD 6 (Commercial)
    "pedal cargo bike", // 30 / KD 13 (Commercial)
    "turn cargo bike", // 30 / KD 17 (Commercial)
  ],
  'city-adelaide': [
    "e bike adelaide", // 110 / KD 8 (Commercial)
  ],
  'emtb-dual': [
    "ebike dual suspension", // 90 / KD 7 (Commercial)
  ],
  'city-perth': [
    "perth electric bike", // 90 / KD 19 (Commercial)
    "electric bike perth australia", // 260 / KD 17 (C, refreshed 2026-11-22)
  ],
  'cruiser': [
    "step through electric bike australia", // 70 / KD 4 (Commercial)
    "electric bike step through", // 70 / KD 2 (Commercial)
    "electric bikes cruiser", // 50 / KD 8 (Commercial)
    "beach electric bike", // 210 / KD 14 (CI, refreshed 2026-11-22)
  ],
  'gear-parts': [
    "e-bike parts", // 70 / KD 8 (Commercial)
    "parts for ebike", // 50 / KD 6 (Commercial)
    "electric bike pedals", // 50 / KD 7 (Commercial)
    "ebike chain", // 50 / KD 9 (Commercial)
    "e bike replacement parts", // 20 / KD 0 (Commercial)
    "e bike spare parts", // 20 / KD 4 (Commercial)
    "easy motion electric bike parts", // 20 / KD 7 (Commercial)
    "ebike parts for sale", // 20 / KD 4 (Transactional)
    "ebike parts store", // 20 / KD 10 (Commercial)
    "electric bicycle bike parts", // 20 / KD 0 (Transactional)
    "ebike throttle", // 880 / KD 9 (C, refreshed 2026-11-22)
    "ebike wheels", // 50 / KD 6 (C, refreshed 2026-11-22)
    "ebike with throttle", // 260 / KD 6 (C, refreshed 2026-11-22)
    "ebike controller", // 320 / KD 9 (C, refreshed 2026-11-22)
    "e-bike pedal", // 260 / KD 9 (C, refreshed 2026-11-22)
    "e bike tyres", // 170 / KD 10 (C, refreshed 2026-11-22)
    "ebike display", // 210 / KD 17 (TI, refreshed 2026-11-22)
    "throttle ebike", // 210 / KD 24 (C, refreshed 2026-11-22)
  ],
  'city-brisbane': [
    "electric bike for sale brisbane", // 50 / KD 21 (Transactional)
  ],
  'trikes': [
    "3 wheel e bikes", // 50 / KD 11 (Commercial)
    "three wheel e bikes", // 390 / KD 17 (C, refreshed 2026-11-21)
    "electric trike bike", // 210 / KD 11 (C, refreshed 2026-11-22)
  ],
  'brand-segway': [
    "e2pro segway", // 50 / KD 24 (Transactional)
    "ninebot e bike", // 50 / KD 15 (Transactional)
    "ninebot e2pro charger", // 50 / KD 9 (Commercial)
    "ninebot segway e2 pro", // 50 / KD 16 (Transactional)
    "segway e2 plus 2", // 50 / KD 16 (Commercial)
    "9bot segway", // 50 / KD 17 (Transactional)
    "mini segway", // 50 / KD 17 (Transactional)
    "ninebot e scotter", // 40 / KD 12 (Transactional)
    "ninebot e2 pro display", // 40 / KD 16 (Transactional)
    "ninebot segway e2pro", // 40 / KD 17 (Transactional)
    "scooters ninebot", // 40 / KD 13 (Commercial)
    "ninebot e2 pro km", // 30 / KD 10 (Commercial)
    "ninebot e2 pro motor", // 30 / KD 8 (Transactional)
    "segway e2 plus ii", // 30 / KD 18 (Commercial)
    "electric scooter ninebot", // 480 / KD 11 (C, refreshed 2026-11-22)
  ],
  'brand-pulse': [
    "pulse bicycles", // 50 / KD 8 (Commercial)
  ],
  'kids-helmets': [
    "kids bike helmets australia", // 40 / KD 9 (Commercial)
    "youth cycling helmet", // 40 / KD 17 (Commercial)
    "best helmet for kids", // 30 / KD 9 (Commercial)
    "best kids bike helmet australia", // 30 / KD 11 (Commercial)
    "girls kids bike helmet", // 30 / KD 7 (Transactional)
    "helmet for 3 year old", // 30 / KD 17 (Commercial)
    "helmets 2 year olds", // 30 / KD 8 (Commercial)
    "helmets for 2 year olds", // 30 / KD 16 (Commercial)
    "kids bike.helmet", // 30 / KD 9 (Commercial)
    "kids helmet anaconda", // 30 / KD 8 (Transactional)
    "kids' bike helmet", // 30 / KD 8 (Commercial)
    "kids scooter helmet", // 110 / KD 7 (CI, refreshed 2026-11-24)
  ],
  'gear-helmets': [
    "2yr old helmet", // 30 / KD 14 (Commercial)
    "50 54cm helmet age", // 30 / KD 18 (Commercial)
    "best helmet for toddlers", // 30 / KD 9 (Commercial)
    "helmets for two year olds", // 30 / KD 8 (Commercial)
    "toddler helmet age 1", // 30 / KD 14 (Commercial)
    "toddlers helmet", // 30 / KD 16 (Commercial)
    "bikes and helmets", // 30 / KD 21 (Commercial)
    "black bike helmets", // 30 / KD 17 (Transactional)
    "helmet bikes", // 30 / KD 17 (Commercial)
    "street bike helmets", // 30 / KD 14 (Commercial)
    "bike helmet for e bike", // 30 / KD 4 (Commercial)
    "folding bike helmet", // 30 / KD 17 (Commercial)
    "nta 8776 e bike helmet", // 30 / KD 11 (Commercial)
    "10 month old bike helmet", // 20 / KD 7 (Commercial)
    "electric scooter helmet", // 320 / KD 10 (CI, refreshed 2026-11-22)
  ],
  'city-sydney': [
    "cargo bike sydney", // 30 / KD 21 (Commercial)
  ],
  'sc-kids': [
    "scooters teens", // 30 / KD 7 (Commercial)
    "kids scooter with seat", // 70 / KD 6 (C, refreshed 2026-11-24)
    "globber kids scooter", // 70 / KD 2 (TI, refreshed 2026-11-24)
    "kids scooters australia", // 70 / KD 5 (C, refreshed 2026-11-24)
  ],
  'emtb-enduro': [
    "carbon downhill bike", // 20 / KD 11 (Transactional)
  ],
  'brand-cube': [
    "cube electric bike accessories", // 20 / KD 6 (Transactional)
    "cube e bike", // 390 / KD 10 (C, refreshed 2026-11-21)
    "cube electric bike", // 480 / KD 17 (C, refreshed 2026-11-22)
    "cube e bikes", // 260 / KD 7 (C, refreshed 2026-11-22)
  ],
  'sc-electric': [
    "scooter cushion", // 20 / KD 6 (Transactional)
    "cheap electric scooter", // 880 / KD 8 (C, refreshed 2026-11-22)
    "best electric scooter australia", // 720 / KD 16 (C, refreshed 2026-11-22)
    "electric commuter scooter", // 590 / KD 9 (CI, refreshed 2026-11-22)
    "foldable electric scooter", // 590 / KD 7 (C, refreshed 2026-11-22)
    "electric scooter under $500", // 480 / KD 19 (C, refreshed 2026-11-22)
    "electric scooter commute", // 320 / KD 11 (C, refreshed 2026-11-22)
  ],
  'brand-pedal': [
  ],
  'brand-merida': [
    "merida electric mountain bike", // 210 / KD 14 (C, refreshed 2026-11-22)
  ],
  'city-hobart': [
    "electric bikes tasmania", // 210 / KD 10 (C, refreshed 2026-11-22)
  ],
  'sc-adults': [
    "electric scooter for adults australia cheap", // 320 / KD 8 (C, refreshed 2026-11-22)
  ],
  'sc-stunt': [
    "stunt scooter for beginners", // 70 / KD 9 (C, refreshed 2026-11-24)
    "top rated stunt scooters", // 70 / KD 15 (C, refreshed 2026-11-24)
  ],
};

/** Page supporting keywords plus the remaining mapped bank keywords (no duplicates). */
export const withSupporting = (id: string, supporting?: string[]): string[] => [...new Set([...(supporting || []), ...(EXTRA_SUPPORTING[id] || [])])];
