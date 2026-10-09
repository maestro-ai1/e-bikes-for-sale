/**
 * Maps the legacy in-app navigation (view + category id + subcategory label) to the real, crawlable catalog URLs.
 * Returns null when the destination is not a catalog page (the caller keeps its existing behaviour).
 */
const CATEGORY_PATH: Record<string, string> = {
  emtb: '/ebikes/electric-mountain-bike',
  folding: '/ebikes/folding-e-bike',
  cruiser: '/ebikes/electric-cruiser-bikes',
  'fat-tyre': '/ebikes/fat-tyre-electric-bicycle',
  cargo: '/ebikes/electric-cargo-bikes',
  road: '/ebikes/electric-road-bikes',
  commuter: '/ebikes/electric-commuter-bikes',
  'kids-ebikes': '/ebikes/kids-electric-bikes',
};

const EMTB_SUB: Record<string, string> = {
  'electric hardtail mountain bikes': '/ebikes/electric-mountain-bike/hardtail',
  "dual suspension emtb's": '/ebikes/electric-mountain-bike/dual-suspension',
  "enduro dual suspension emtb's": '/ebikes/electric-mountain-bike/enduro',
  "trial suspension emtb's": '/ebikes/electric-mountain-bike/trial-suspension',
  "kids and youths 24' emtb's": '/ebikes/electric-mountain-bike/kids-mountain-bikes',
};

const SCOOTER_SUB: Record<string, string> = {
  'electric scooters': '/scooters',
  'adults scooters': '/scooters/adults-scooters',
  'kids scooters': '/scooters/kids-scooters',
  'scooter accessories': '/scooters/scooter-accessories',
};

export function catalogUrlFor(view: string, category = 'all', subcategory = 'all'): string | null {
  const sub = subcategory.toLowerCase();
  if (view === 'blog') return '/blog';
  if (view === 'ebikes') {
    if (category === 'emtb' && EMTB_SUB[sub]) return EMTB_SUB[sub];
    if (CATEGORY_PATH[category]) return CATEGORY_PATH[category];
    return '/ebikes';
  }
  if (view === 'scooters') {
    if (SCOOTER_SUB[sub]) return SCOOTER_SUB[sub];
    return '/scooters';
  }
  return null;
}
