/** Banner photo for a catalog page, keyed by node id. Files live in /public/images/catalog (900x900). */
export interface CatalogImage {
  src: string;
  alt: string;
}

const img = (file: string, alt: string): CatalogImage => ({ src: `/images/catalog/${file}`, alt });

export const CATALOG_IMAGES: Record<string, CatalogImage> = {
  hub: img('ebikes-hub.jpg', 'Electric bike range for Australian riders: commuter, hybrid and trail e-bikes'),
  emtb: img('electric-mountain-bike.jpg', 'Rider on an electric mountain bike on an Australian bush trail'),
  'emtb-hardtail': img('emtb-hardtail.jpg', 'Electric hardtail mountain bike with front suspension'),
  'emtb-dual': img('emtb-dual-suspension.jpg', 'Dual suspension electric mountain bike for rough trails'),
  'emtb-enduro': img('emtb-enduro.jpg', 'Enduro electric mountain bike built for steep descents'),
  folding: img('folding-e-bike.jpg', 'Folding e bike for city commuting and small spaces'),
  cruiser: img('electric-cruiser-bikes.jpg', 'Relaxed step-through electric cruiser bike'),
  'fat-tyre': img('fat-tyre-electric-bicycle.jpg', 'Rider on a fat tyre electric bicycle by the harbour'),
  cargo: img('electric-cargo-bikes.jpg', 'Electric cargo bike for family and shopping trips'),
  road: img('electric-road-bikes.jpg', 'Electric road bike for long rides and fast commutes'),
  commuter: img('electric-commuter-bikes.jpg', 'Electric commuter bike for daily city riding'),
  trikes: img('electric-trikes.jpg', 'Three wheel electric bike for stable, easy riding'),
};
