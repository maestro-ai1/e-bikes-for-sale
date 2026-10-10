/** Banner photo for a catalog page, keyed by node id. Files live in /public/images/catalog (900x900). */
export interface CatalogImage {
  src: string;
  alt: string;
}

const img = (file: string, alt: string): CatalogImage => ({ src: file.startsWith('../') ? `/images/${file.slice(3)}` : `/images/catalog/${file}`, alt });

export const CATALOG_IMAGES: Record<string, CatalogImage> = {
  hub: img('ebikes-hub.jpg', 'Electric bike range for Australian riders: commuter, hybrid and trail e-bikes'),
  emtb: img('electric-mountain-bike.webp', 'Electric mountain bike for sale in Australia: full suspension carbon eMTB with mid-drive motor and 29 inch wheels'),
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
  'brand-cube': img('../brands/cube-electric-mountain-bike.webp', 'Cube e mountain bikes: youth electric mountain bike with Shimano mid-drive'),
  'brand-merida': img('../brands/merida-electric-trekking-bike.webp', 'Merida electric bike: trekking e-bike with rear rack and mid-drive motor'),
  'brand-pedal': img('../brands/pedal-electric-kids-bike.webp', 'Pedal electric bikes: red kids electric mountain bike with fat tyres'),
  'brand-dirodi': img('../brands/dirodi-electric-fat-tyre-bike.webp', 'DiroDi electric bike: fat tyre e-bike with long rear seat and rack'),
  'brand-segway': img('../brands/segway-electric-scooter.webp', 'Segway scooter: Segway-Ninebot electric kick scooter with blue light strip'),
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
  'city-melbourne': img('electric-bikes-melbourne.webp', 'Electric bikes Melbourne: city skyline and Princes Bridge over the Yarra River'),
  'city-sydney': img('electric-bikes-sydney.webp', 'Electric bike Sydney: Sydney Harbour with the Opera House and city skyline'),
  'city-brisbane': img('electric-bikes-brisbane.webp', 'Ebikes Brisbane: Story Bridge, river and city skyline at sunset'),
  'city-perth': img('electric-bikes-perth.webp', 'Electric bicycle Perth WA: city skyline and Swan River from Kings Park'),
  'city-adelaide': img('electric-bikes-adelaide.webp', 'Ebikes Adelaide: city skyline and suburbs'),
  'conversion': img('electric-bike-conversion-kits.webp', 'Bike mechanic working on a bicycle drivetrain in a workshop'),
  'brand-trek': img('../brands/trek-electric-mountain-bike.webp', 'Trek e bikes Australia: rider on an electric mountain bike on a sunny trail'),
  'brand-specialized': img('../brands/specialized-electric-road-bike.webp', 'Specialized Australia: cyclists riding road bikes along a coastal road'),
  'brand-canyon': img('../brands/canyon-electric-bike.webp', 'Canyon e bikes Australia: electric bike parked on a gravel road in the hills'),
  'brand-aldi': img('../brands/aldi-alternative-electric-commuter-bike.webp', 'Aldi e bike 2025 alternative: commuter riding an electric bike through the city'),
  'brand-reid': img('../brands/reid-electric-bicycle.webp', 'Reid electric bicycle: commuter riding an e-bike along a city park path'),
  'brand-pulse': img('../brands/pulse-electric-hybrid-bike.webp', 'Pulse e bikes: electric hybrid bike with rear rack and mid-drive motor'),
};
