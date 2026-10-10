import type { Product, ProductCategory } from '@/lib/types';

/**
 * More Cube, Merida, Pedal and DiroDi e-bikes so every category has depth.
 * Names, sale price and RRP are from the 99 Bikes Australia electric collections (Oct 2026); prices move.
 * Only facts in the listing or the model name are used: Cube's model number is its battery Wh (Reaction 600 = 600 Wh),
 * 0 means "not confirmed" and renders "See spec sheet". No photos yet, so the placeholder is shown.
 * rating and reviewsCount are 0 on purpose.
 */

type Sub = 'hardtail' | 'dual' | 'enduro' | 'trail' | null;
interface Row {
  slug: string; name: string; brand: 'Cube' | 'Merida' | 'Pedal' | 'Dirodi';
  cat: ProductCategory; label: string; sub: Sub;
  price: number; rrp: number; wh?: number; motor?: string; hub?: boolean;
  frame: Product['frameType']; blurb: string;
}

const SUB_ID: Record<Exclude<Sub, null>, [string, string]> = {
  hardtail: ['emtb-hardtail', "Hardtail eMTB's"],
  dual: ['emtb-dual-suspension', "Dual Suspension eMTB's"],
  enduro: ['emtb-enduro', 'Enduro eMTBs'],
  trail: ['emtb-trial-suspension', "Trial Suspension eMTB's"],
};

const CUBE_MOTOR = 'Bosch mid-drive motor, 250 W';

const ROWS: Row[] = [
  // ---- hardtail eMTB
  { slug: 'pedal-coyote-3-electric-hardtail-mountain-bike', name: 'Pedal Coyote 3 Electric Hardtail Mountain Bike', brand: 'Pedal', cat: 'emtb', label: 'Electric Mountain Bikes', sub: 'hardtail', price: 1599, rrp: 2399, frame: 'Hardtail', blurb: 'An affordable electric hardtail mountain bike for trails and everyday riding.' },
  { slug: 'pedal-coyote-3-st-tour-electric-hardtail-mountain-bike', name: 'Pedal Coyote 3 ST Tour Electric Hardtail Mountain Bike', brand: 'Pedal', cat: 'emtb', label: 'Electric Mountain Bikes', sub: 'hardtail', price: 1697, rrp: 2699, frame: 'Hardtail', blurb: 'A step-through touring version of the Coyote 3 hardtail for mixed-surface riding.' },
  { slug: 'pedal-jaguar-2-29-electric-mountain-bike', name: 'Pedal Jaguar 2 29" Electric Mountain Bike', brand: 'Pedal', cat: 'emtb', label: 'Electric Mountain Bikes', sub: 'hardtail', price: 1299, rrp: 1999, frame: 'Hardtail', blurb: 'An entry-level 29 inch electric mountain bike.' },
  { slug: 'pedal-lynx-3c-st-electric-hardtail-mountain-bike', name: 'Pedal Lynx 3C ST Electric Hardtail Mountain Bike 468Wh', brand: 'Pedal', cat: 'emtb', label: 'Electric Mountain Bikes', sub: 'hardtail', price: 2476, rrp: 3599, wh: 468, frame: 'Hardtail', blurb: 'A step-through mid-drive hardtail with a 468 Wh battery.' },
  { slug: 'cube-reaction-hybrid-performance-600-electric-hardtail', name: 'Cube Reaction Hybrid Performance 600 Electric Hardtail Mountain Bike', brand: 'Cube', cat: 'emtb', label: 'Electric Mountain Bikes', sub: 'hardtail', price: 3987, rrp: 4999, wh: 600, motor: CUBE_MOTOR, frame: 'Hardtail', blurb: 'A Bosch-powered hardtail eMTB with a 600 Wh battery.' },
  { slug: 'cube-reaction-hybrid-pro-800-electric-hardtail', name: 'Cube Reaction Hybrid Pro 800 Electric Hardtail Mountain Bike', brand: 'Cube', cat: 'emtb', label: 'Electric Mountain Bikes', sub: 'hardtail', price: 4999, rrp: 6399, wh: 800, motor: CUBE_MOTOR, frame: 'Hardtail', blurb: 'A high-capacity 800 Wh Bosch hardtail eMTB for long days on the trail.' },
  { slug: 'merida-ebig-nine-400-electric-hardtail-mountain-bike', name: 'Merida eBig.Nine 400 Electric Hardtail Mountain Bike', brand: 'Merida', cat: 'emtb', label: 'Electric Mountain Bikes', sub: 'hardtail', price: 3549, rrp: 5499, frame: 'Hardtail', blurb: 'A 29 inch electric hardtail from Merida for trail and cross-country riding.' },
  { slug: 'merida-ebig-nine-300-se-electric-hardtail-mountain-bike', name: 'Merida eBig.Nine 300 SE Electric Hardtail Mountain Bike 418Wh', brand: 'Merida', cat: 'emtb', label: 'Electric Mountain Bikes', sub: 'hardtail', price: 2455, rrp: 4099, wh: 418, frame: 'Hardtail', blurb: 'A value Merida electric hardtail with a 418 Wh battery.' },
  // ---- trail and enduro eMTB
  { slug: 'cube-stereo-hybrid-one44-pro-800-electric-trail-bike', name: 'Cube Stereo Hybrid ONE44 Pro 800 Electric Trail Bike', brand: 'Cube', cat: 'emtb', label: 'Electric Mountain Bikes', sub: 'trail', price: 4499, rrp: 6999, wh: 800, motor: CUBE_MOTOR, frame: 'Dual Suspension', blurb: 'A full-suspension electric trail bike with an 800 Wh battery.' },
  { slug: 'cube-stereo-hybrid-one22-pro-600-electric-trail-bike', name: 'Cube Stereo Hybrid ONE22 Pro 600 Electric Trail Bike', brand: 'Cube', cat: 'emtb', label: 'Electric Mountain Bikes', sub: 'trail', price: 4399, rrp: 6499, wh: 600, motor: CUBE_MOTOR, frame: 'Dual Suspension', blurb: 'A full-suspension electric trail bike with a 600 Wh battery.' },
  { slug: 'cube-stereo-hybrid-one44-hpc-race-800-electric-trail-bike', name: 'Cube Stereo Hybrid ONE44 HPC Race 800 Electric Trail Bike', brand: 'Cube', cat: 'emtb', label: 'Electric Mountain Bikes', sub: 'trail', price: 6499, rrp: 7999, wh: 800, motor: CUBE_MOTOR, frame: 'Dual Suspension', blurb: 'A carbon full-suspension electric trail bike with an 800 Wh battery.' },
  { slug: 'merida-eone-forty-400-electric-trail-bike', name: 'Merida eOne-Forty 400 Electric Trail Bike', brand: 'Merida', cat: 'emtb', label: 'Electric Mountain Bikes', sub: 'trail', price: 4498, rrp: 6999, frame: 'Dual Suspension', blurb: 'A mid-travel Merida electric trail bike.' },
  { slug: 'cube-stereo-hybrid-one77-hpc-slx-800-electric-enduro-bike', name: 'Cube Stereo Hybrid ONE77 HPC SLX 800 Electric Enduro Bike', brand: 'Cube', cat: 'emtb', label: 'Electric Mountain Bikes', sub: 'enduro', price: 7499, rrp: 9499, wh: 800, motor: CUBE_MOTOR, frame: 'Dual Suspension', blurb: 'A carbon long-travel electric enduro bike with an 800 Wh battery.' },
  { slug: 'cube-stereo-hybrid-one77-hpc-tm-800-electric-enduro-bike', name: 'Cube Stereo Hybrid ONE77 HPC TM 800 Electric Enduro Bike', brand: 'Cube', cat: 'emtb', label: 'Electric Mountain Bikes', sub: 'enduro', price: 7999, rrp: 10999, wh: 800, motor: CUBE_MOTOR, frame: 'Dual Suspension', blurb: 'A top-spec carbon electric enduro bike with an 800 Wh battery.' },
  { slug: 'merida-eone-sixty-675-electric-enduro-bike', name: 'Merida eOne-Sixty 675 Electric Enduro Bike', brand: 'Merida', cat: 'emtb', label: 'Electric Mountain Bikes', sub: 'enduro', price: 5717, rrp: 8799, frame: 'Dual Suspension', blurb: 'A long-travel Merida electric enduro bike.' },
  { slug: 'merida-eone-eighty-500-electric-enduro-bike', name: 'Merida eOne-Eighty 500 Electric Enduro Bike', brand: 'Merida', cat: 'emtb', label: 'Electric Mountain Bikes', sub: 'enduro', price: 6297, rrp: 9399, frame: 'Dual Suspension', blurb: 'A long-travel Merida electric enduro bike for steep, technical terrain.' },
  { slug: 'merida-eone-eighty-700-electric-enduro-bike', name: 'Merida eOne-Eighty 700 Electric Enduro Bike', brand: 'Merida', cat: 'emtb', label: 'Electric Mountain Bikes', sub: 'enduro', price: 6953, rrp: 10199, frame: 'Dual Suspension', blurb: 'A high-spec Merida electric enduro bike.' },
  { slug: 'merida-eone-sixty-sl-10k-electric-enduro-bike', name: 'Merida eOne-Sixty SL 10K Electric Enduro Bike', brand: 'Merida', cat: 'emtb', label: 'Electric Mountain Bikes', sub: 'enduro', price: 9999, rrp: 16999, frame: 'Dual Suspension', blurb: 'A flagship lightweight Merida electric enduro bike.' },
  // ---- hybrid / commuter
  { slug: 'pedal-eagle-st-electric-hybrid-bike', name: 'Pedal Eagle ST Electric Hybrid Bike', brand: 'Pedal', cat: 'commuter', label: 'Electric Commuter Bikes', sub: null, price: 1999, rrp: 3399, frame: 'Step-Through', blurb: 'A step-through electric hybrid bike for commuting and everyday trips.' },
  { slug: 'pedal-clipper-2-electric-hybrid-bike', name: 'Pedal Clipper 2 Electric Hybrid Bike', brand: 'Pedal', cat: 'commuter', label: 'Electric Commuter Bikes', sub: null, price: 899, rrp: 1899, frame: 'Crossbar', blurb: 'An affordable electric hybrid bike for city riding.' },
  { slug: 'pedal-comet-3-disc-electric-hybrid-bike', name: 'Pedal Comet 3 Disc Electric Hybrid Bike', brand: 'Pedal', cat: 'commuter', label: 'Electric Commuter Bikes', sub: null, price: 1399, rrp: 1799, frame: 'Crossbar', blurb: 'An electric hybrid bike with disc brakes for commuting.' },
  { slug: 'cube-nuride-hybrid-performance-easy-entry-600-electric-hybrid-bike', name: 'Cube Nuride Hybrid Performance Easy Entry 600 Electric Hybrid Bike', brand: 'Cube', cat: 'commuter', label: 'Electric Commuter Bikes', sub: null, price: 3299, rrp: 4999, wh: 600, motor: CUBE_MOTOR, frame: 'Step-Through', blurb: 'A sporty easy-entry Bosch hybrid with a 600 Wh battery.' },
  { slug: 'cube-touring-hybrid-pro-800-electric-hybrid-bike', name: 'Cube Touring Hybrid Pro 800 Electric Hybrid Bike', brand: 'Cube', cat: 'commuter', label: 'Electric Commuter Bikes', sub: null, price: 3999, rrp: 5799, wh: 800, motor: CUBE_MOTOR, frame: 'Crossbar', blurb: 'A long-range Bosch touring hybrid with an 800 Wh battery.' },
  { slug: 'cube-editor-hybrid-pro-400x-electric-hybrid-bike', name: 'Cube Editor Hybrid Pro 400X Electric Hybrid Bike', brand: 'Cube', cat: 'commuter', label: 'Electric Commuter Bikes', sub: null, price: 3299, rrp: 4499, wh: 400, motor: CUBE_MOTOR, frame: 'Crossbar', blurb: 'A light, urban Bosch hybrid with a 400 Wh battery.' },
  { slug: 'merida-espresso-cc-400-eq-electric-hybrid-bike', name: 'Merida eSpresso CC 400 EQ Electric Hybrid Bike', brand: 'Merida', cat: 'commuter', label: 'Electric Commuter Bikes', sub: null, price: 3299, rrp: 5399, frame: 'Crossbar', blurb: 'A Merida electric hybrid with full commuter equipment.' },
  // ---- cruiser
  { slug: 'pedal-breeze-e4-electric-cruiser-bike', name: 'Pedal Breeze E4 Electric Cruiser Bike', brand: 'Pedal', cat: 'cruiser', label: 'Electric Cruiser Bikes', sub: null, price: 1499, rrp: 2199, frame: 'Step-Through', blurb: 'A relaxed electric cruiser for beach and city riding.' },
  { slug: 'pedal-uptown-sl-electric-vintage-cruiser-bike', name: 'Pedal Uptown SL Electric Vintage Cruiser Bike', brand: 'Pedal', cat: 'cruiser', label: 'Electric Cruiser Bikes', sub: null, price: 999, rrp: 1599, frame: 'Step-Through', blurb: 'A vintage-style 7-speed electric cruiser.' },
  { slug: 'pedal-seahawk-sl-electric-cruiser-bike', name: 'Pedal Seahawk SL Electric Cruiser Bike', brand: 'Pedal', cat: 'cruiser', label: 'Electric Cruiser Bikes', sub: null, price: 999, rrp: 1599, frame: 'Step-Through', blurb: 'An easy-riding electric cruiser.' },
  // ---- fat tyre
  { slug: 'dirodi-rover-gen-6-250w-electric-fat-bike', name: 'DiroDi Rover Gen 6 250W Electric Fat Bike', brand: 'Dirodi', cat: 'fat-tyre', label: 'Fat Tyre E-Bikes', sub: null, price: 2479, rrp: 3570, motor: '250 W motor', hub: true, frame: 'Crossbar', blurb: 'A moto-styled electric fat bike with a 250 W motor.' },
  { slug: 'dirodi-rover-plus-gen-6-250w-electric-fat-bike', name: 'DiroDi Rover Plus Gen 6 250W Electric Fat Bike', brand: 'Dirodi', cat: 'fat-tyre', label: 'Fat Tyre E-Bikes', sub: null, price: 2749, rrp: 3890, motor: '250 W motor', hub: true, frame: 'Crossbar', blurb: 'The Rover Plus: a step-up moto-styled electric fat bike.' },
  { slug: 'dirodi-rover-pro-st-250w-electric-fat-bike', name: 'DiroDi Rover Pro ST 250W Electric Fat Bike', brand: 'Dirodi', cat: 'fat-tyre', label: 'Fat Tyre E-Bikes', sub: null, price: 3259, rrp: 4490, motor: '250 W motor', hub: true, frame: 'Step-Through', blurb: 'The step-through version of the Rover Pro electric fat bike.' },
  // ---- cargo
  { slug: 'pedal-nomad-cargo-electric-cargo-bike', name: 'Pedal Nomad Cargo Electric Cargo Bike', brand: 'Pedal', cat: 'cargo', label: 'Electric Cargo Bikes', sub: null, price: 3499, rrp: 3999, frame: 'Crossbar', blurb: 'An electric cargo bike for family and shopping loads.' },
  { slug: 'pedal-packer-electric-cargo-bike', name: 'Pedal Packer Electric Cargo Bike', brand: 'Pedal', cat: 'cargo', label: 'Electric Cargo Bikes', sub: null, price: 2999, rrp: 4299.99, frame: 'Crossbar', blurb: 'A compact electric cargo bike for city loads.' },
  { slug: 'cube-cargo-sport-dual-hybrid-1000-electric-cargo-bike', name: 'Cube Cargo Sport Dual Hybrid 1000 Electric Cargo Bike', brand: 'Cube', cat: 'cargo', label: 'Electric Cargo Bikes', sub: null, price: 6999, rrp: 11999, wh: 1000, motor: CUBE_MOTOR, frame: 'Crossbar', blurb: 'A dual-battery Bosch cargo bike with 1000 Wh of capacity.' },
  { slug: 'cube-longtail-sport-hybrid-725-electric-cargo-bike', name: 'Cube Longtail Sport Hybrid 725 Electric Cargo Bike', brand: 'Cube', cat: 'cargo', label: 'Electric Cargo Bikes', sub: null, price: 4999, rrp: 7999, wh: 725, motor: CUBE_MOTOR, frame: 'Crossbar', blurb: 'A longtail Bosch cargo bike with a 725 Wh battery.' },
];

const build = (r: Row): Product => {
  const [subId, subLabel] = r.sub ? SUB_ID[r.sub] : [undefined, undefined];
  const facts = [`Brand: ${r.brand}`, ...(r.wh ? [`${r.wh} Wh battery`] : []), ...(r.motor ? [r.motor] : []), 'Pedal assist to 25 km/h'];
  return {
    id: `bike-${r.slug}`,
    name: r.name,
    slug: r.slug,
    subtitle: r.blurb,
    category: r.cat,
    categoryLabel: r.label,
    subcategory: subLabel,
    subcategoryId: subId,
    brand: r.brand,
    focusKeyword: r.name.toLowerCase().replace(/["']/g, ''),
    price: r.price,
    compareAtPrice: r.rrp,
    rating: 0,
    reviewsCount: 0,
    image: '',
    hoverImage: '',
    gallery: [],
    inStock: true,
    stockCount: 0,
    motor: r.motor ?? '',
    motorType: r.hub ? 'Hub' : 'Mid-Drive',
    torqueNm: 0,
    batteryWh: r.wh ?? 0,
    batterySpec: r.wh ? `${r.wh} Wh battery` : '',
    rangeKm: 0,
    topSpeedKmH: 25,
    frameType: r.frame,
    weightKg: 0,
    payloadKg: 0,
    brakes: 'See spec sheet',
    gears: 'See spec sheet',
    auCompliance: 'EN15194 pedal-assist, 25 km/h assist limit',
    description: `The ${r.name} is an electric bike from ${r.brand}. ${r.blurb} Check the spec sheet for motor, range and weight, and ask us to confirm frame size and availability.`,
    shortDescription: r.blurb,
    features: facts,
    tags: [],
    sizeVariants: [{ id: 'standard', label: 'Standard (confirm frame size when ordering)', priceDelta: 0 }],
    recommendedAddOns: [],
  };
};

export const CATALOG_BIKES: Product[] = ROWS.map(build);
