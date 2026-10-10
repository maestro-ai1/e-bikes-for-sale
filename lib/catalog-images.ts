/** Banner photo for a catalog page, keyed by node id. Files live in /public/images/catalog (900x900). */
export interface CatalogImage {
  src: string;
  alt: string;
}

const img = (file: string, alt: string): CatalogImage => ({ src: file.startsWith('../') ? `/images/${file.slice(3)}` : `/images/catalog/${file}`, alt });

export const CATALOG_IMAGES: Record<string, CatalogImage> = {
  hub: img('ebikes-hub.jpg', 'Electric bike range for Australian riders: commuter, hybrid and trail e-bikes'),
  emtb: img('electric-mountain-bike.webp', 'Rider on an electric mountain bike on an Australian bush trail'),
  'emtb-hardtail': img('emtb-hardtail.jpg', 'Electric hardtail mountain bike with front suspension'),
  'emtb-dual': img('emtb-dual-suspension.jpg', 'Dual suspension electric mountain bike for rough trails'),
  'emtb-enduro': img('emtb-enduro.jpg', 'Enduro electric mountain bike built for steep descents'),
  folding: img('folding-e-bike.webp', 'Folding e bike for city commuting and small spaces'),
  cruiser: img('electric-cruiser-bikes.webp', 'Relaxed step-through electric cruiser bike'),
  'fat-tyre': img('fat-tyre-electric-bicycle.webp', 'Rider on a fat tyre electric bicycle by the harbour'),
  cargo: img('electric-cargo-bikes.webp', 'Electric cargo bike for family and shopping trips'),
  road: img('electric-road-bikes.webp', 'Electric road bike for long rides and fast commutes'),
  commuter: img('electric-commuter-bikes.webp', 'Electric commuter bike for daily city riding'),
  trikes: img('electric-trikes.jpg', 'Three wheel electric bike for stable, easy riding'),
  'brand-cube': img('../brands/cube-electric-mountain-bike.webp', 'Cube electric mountain bike for youth riders with Shimano mid-drive and 24 inch wheels'),
  'brand-merida': img('../brands/merida-electric-trekking-bike.webp', 'Merida electric trekking bike with rear rack and mid-drive motor'),
  'brand-pedal': img('../brands/pedal-electric-kids-bike.webp', 'Pedal electric kids mountain bike in red with fat tyres'),
  'brand-dirodi': img('../brands/dirodi-electric-fat-tyre-bike.webp', 'DiroDi electric fat tyre bike with long rear seat and rear rack'),
  'brand-segway': img('../brands/segway-electric-bike.webp', 'Segway electric bike with step-through frame and rear carrier'),
  'emtb-trail': img('trail-suspension-emtb.webp', 'Trail suspension electric mountain bike with front suspension fork'),
  'emtb-kids': img('kids-electric-bikes.webp', 'Kids electric balance bike for young riders'),
  'kids-ebikes': img('kids-electric-bikes.webp', 'Kids electric balance bike for young riders'),
  'sc-electric': img('electric-scooters.webp', 'Adult electric scooter with dual brakes and pneumatic tyres'),
  'sc-adults': img('adults-scooters.webp', 'Adults electric scooter for daily commuting'),
  'sc-kids': img('kids-scooters.webp', 'Kids electric scooter with three wheels and a speed-limited motor'),
  'sc-accessories': img('scooter-accessories.webp', 'Electric scooter lock and accessories'),
  'gear-helmets': img('e-bike-helmets.webp', 'E-bike helmet with urban styling'),
  'kids-helmets': img('kids-bike-helmets.webp', 'Kids bike helmet in blue'),
  'gear-accessories': img('e-bike-accessories.webp', 'E-bike accessories: handlebar phone holder'),
  'gear-parts': img('e-bike-parts.webp', 'E-bike parts: replacement mudguard'),
  'batteries': img('e-bike-batteries.webp', 'E-bike and e-scooter battery charger'),
  'gear-hybrid': img('pedal-assist-bikes.webp', 'Pedal assist electric hybrid bike with step-through frame'),
  'cheap': img('low-cost-e-bikes.webp', 'Low cost electric bike for budget commuters'),
};
