import type { Product, ProductCategory } from '@/lib/types';

/**
 * Helmets, gloves, locks, lights and Segway-Ninebot scooters, so the accessory, helmet and scooter
 * categories have products to sell. Names, sale prices and RRP are from 99 Bikes Australia (Oct 2026).
 * Retailer prices move, so re-check before launch. There are no photos yet, so image is '' and the
 * pages show the inline "IMAGE COMING SOON" placeholder until you supply one.
 * rating and reviewsCount are 0 on purpose (no reviews yet, so nothing is displayed or emitted).
 */

interface GearSpec {
  slug: string;
  name: string;
  brand: string;
  focusKeyword: string;
  category: ProductCategory;
  categoryLabel: string;
  subcategory?: string;
  subcategoryId?: string;
  price: number;
  rrp?: number;
  subtitle: string;
  description: string;
  features: string[];
  tags: string[];
  image?: string;
  motor?: string;
  batteryWh?: number;
  rangeKm?: number;
}

const build = (s: GearSpec): Product => ({
  id: `gear-${s.slug}`,
  name: s.name,
  slug: s.slug,
  subtitle: s.subtitle,
  category: s.category,
  categoryLabel: s.categoryLabel,
  subcategory: s.subcategory,
  subcategoryId: s.subcategoryId,
  brand: s.brand,
  focusKeyword: s.focusKeyword,
  price: s.price,
  compareAtPrice: s.rrp,
  rating: 0,
  reviewsCount: 0,
  image: s.image ?? '',
  hoverImage: s.image ?? '',
  gallery: s.image ? [s.image] : [],
  inStock: true,
  stockCount: 0,
  motor: s.motor ?? '',
  motorType: 'Hub',
  torqueNm: 0,
  batteryWh: s.batteryWh ?? 0,
  batterySpec: '',
  rangeKm: s.rangeKm ?? 0,
  topSpeedKmH: 0,
  frameType: 'Universal',
  weightKg: 0,
  payloadKg: 0,
  brakes: '',
  gears: '',
  auCompliance: '',
  description: s.description,
  shortDescription: s.subtitle,
  features: s.features,
  tags: s.tags,
  sizeVariants: [{ id: 'standard', label: 'Standard', priceDelta: 0 }],
  recommendedAddOns: [],
});

const helmet = (slug: string, name: string, brand: string, price: number, rrp: number, kind: string, extra: string[], tags: string[]): GearSpec => ({
  slug, name, brand, focusKeyword: name.toLowerCase(), category: 'helmets', categoryLabel: 'Helmets',
  price, rrp, subtitle: `${brand} ${kind} bike helmet`,
  description: `The ${name} is a ${kind.toLowerCase()} bicycle helmet from ${brand}. Wear a certified helmet on every ride, including on an e-bike.`,
  features: [`Brand: ${brand}`, `Type: ${kind}`, ...extra], tags: ['e bike helmet', 'bike riding helmets', ...tags],
});

const accessory = (slug: string, name: string, brand: string, price: number, rrp: number, kind: string, sub: string, extra: string[], tags: string[]): GearSpec => ({
  slug, name, brand, focusKeyword: name.toLowerCase(), category: 'accessories', categoryLabel: 'Accessories',
  subcategory: sub, subcategoryId: `accessories-${sub.toLowerCase().replace(/\s+/g, '-')}`,
  price, rrp, subtitle: `${brand} ${kind}`,
  description: `The ${name} is a ${kind.toLowerCase()} from ${brand}, suited to e-bike and bicycle riders.`,
  features: [`Brand: ${brand}`, `Type: ${kind}`, ...extra], tags: ['ebike accessories', ...tags],
});

const scooter = (slug: string, name: string, price: number, rrp: number, sub: string, extra: string[], opts: Partial<GearSpec> = {}): GearSpec => ({
  slug, name, brand: 'Segway-Ninebot', focusKeyword: name.toLowerCase(), category: 'scooters', categoryLabel: 'Electric Scooters',
  subcategory: sub, subcategoryId: 'scooters-adults', price, rrp,
  subtitle: `Segway-Ninebot electric scooter`,
  description: `The ${name} is an electric kick scooter from Segway-Ninebot. Check the manufacturer's current specifications and your state rules for where e-scooters can be ridden.`,
  features: ['Brand: Segway-Ninebot', ...extra],
  tags: ['segway scooter', 'ninebot electric scooter', 'e scooter adults', 'segway ninebot'], ...opts,
});

const SPECS: GearSpec[] = [
  // ---- helmets
  helmet('met-crackerjack-kids-helmet-pink', 'Met Crackerjack Kids Helmet Pink', 'Met', 85, 99.95, 'Kids', ['Universal kids size 52 to 57 cm'], ['helmet youth bike', 'childrens cycle helmet']),
  helmet('met-hooray-kids-helmet-pink-hearts', 'Met Hooray Kids Helmet Pink Hearts', 'Met', 75, 84.95, 'Kids', [], ['helmet youth bike', 'childs cycling helmet']),
  helmet('met-echo-helmet-black-matte', 'Met Echo Helmet Black Matte', 'Met', 89, 99.95, 'Urban', [], ['bike helmet sale']),
  helmet('giro-agilis-mips-road-helmet-matt-white', 'Giro Agilis MIPS Road Helmet Matt White', 'Giro', 169, 179.99, 'Road', ['MIPS rotational protection'], ['bike helmet sale', 'helmets for cycle']),
  helmet('cinettica-velocita-road-helmet-black', 'Cinettica Velocita Road Helmet Black', 'Cinettica', 48, 54.99, 'Road', [], ['cheap bike helmets', 'bike helmet sale']),
  helmet('fox-speedframe-solid-mips-mtb-helmet-matte-black', 'Fox Speedframe Solid MIPS MTB Helmet Matte Black', 'Fox', 179, 199.99, 'MTB', ['MIPS rotational protection'], ['helmets for cycle', 'electric bike helmet']),

  // ---- gloves
  accessory('fox-dirtpaw-full-finger-trail-gloves-black', 'Fox Dirtpaw Full Finger Trail Gloves Black', 'Fox', 44, 49.99, 'Full finger trail gloves', 'Gloves', [], ['cycling gloves', 'mtb gloves']),
  accessory('giro-jag-non-gel-road-gloves-black', 'Giro Jag Non Gel Road Gloves Black', 'Giro', 36, 39.99, 'Road gloves', 'Gloves', [], ['cycling gloves', 'road gloves']),
  accessory('giro-bravo-ii-gel-road-gloves-black', 'Giro Bravo II Gel Road Gloves Black', 'Giro', 46, 49.99, 'Gel road gloves', 'Gloves', ['Gel palm padding'], ['cycling gloves', 'road gloves']),
  accessory('black-mountain-shadow-trail-mtb-gloves-black', 'Black Mountain Shadow Trail MTB Gloves Black', 'Black Mountain', 29, 39.99, 'MTB gloves', 'Gloves', [], ['cycling gloves', 'mtb gloves']),
  accessory('black-mountain-shadow-trail-youth-mtb-gloves-black', 'Black Mountain Shadow Trail Youth MTB Gloves Black', 'Black Mountain', 24, 29.99, 'Youth MTB gloves', 'Gloves', [], ['kids cycling gloves', 'youth mtb gloves']),
  accessory('cinettica-thermal-gloves-black', 'Cinettica Thermal Gloves Black', 'Cinettica', 19, 39.95, 'Thermal gloves', 'Gloves', [], ['winter cycling gloves', 'thermal gloves']),

  // ---- locks
  accessory('magnum-x2p-u-lock-cable', 'Magnum X2P U-Lock + Cable', 'Magnum', 39, 59.95, 'U-lock with cable', 'Locks', [], ['bike lock', 'u lock']),
  accessory('abus-bordo-5700-ugrip-combination-lock-80cm', 'ABUS BORDO 5700 uGrip Combination Lock 80cm', 'ABUS', 139, 164.99, 'Folding combination lock', 'Locks', ['Length: 80 cm'], ['bike lock', 'folding lock']),
  accessory('hiplok-switch-folding-lock-black', 'Hiplok Switch Folding Lock Black', 'Hiplok', 125, 129.95, 'Folding lock', 'Locks', [], ['bike lock', 'folding lock']),
  accessory('hiplok-spin-lock-75cm', 'Hiplok SPIN Lock 75cm', 'Hiplok', 75, 79.95, 'Wearable chain lock', 'Locks', ['Length: 75 cm'], ['bike lock', 'chain lock']),
  accessory('hiplok-dx1000-key-u-lock-black', 'Hiplok DX1000 Key U-Lock Black', 'Hiplok', 449, 584.95, 'High-security U-lock', 'Locks', [], ['bike lock', 'u lock']),

  // ---- lights
  accessory('ravemen-fr-300-lumens-front-light', 'Ravemen FR 300 Lumens Front Light', 'Ravemen', 70, 94.95, 'Front light', 'Lights', ['300 lumens'], ['ebike lights', 'electric bike light']),
  accessory('ravemen-fr500-500-lumens-front-light', 'Ravemen FR500 500 Lumens Front Light', 'Ravemen', 125, 129.95, 'Front light', 'Lights', ['500 lumens'], ['ebike lights', 'electric bike light']),
  accessory('ravemen-tr-150-lumens-rear-light', 'Ravemen TR 150 Lumens Rear Light', 'Ravemen', 39, 59.95, 'Rear light', 'Lights', ['150 lumens'], ['ebike lights', 'rear bike light']),
  accessory('moon-lepus-lite-orion-light-set', 'Moon Lepus Lite and Orion 400/50 Lumens Light Set', 'Moon', 62, 99.99, 'Front and rear light set', 'Lights', ['400 lumens front, 50 lumens rear'], ['ebike lights', 'bike light set']),
  accessory('azur-nano-60-30-usb-lightset', 'Azur Nano 60/30 Lumens USB Lightset', 'Azur', 26, 27.99, 'USB front and rear light set', 'Lights', ['60 lumens front, 30 lumens rear'], ['ebike lights', 'usb bike lights']),
  accessory('garmin-varia-rtl515-radar-tail-light', 'Garmin Varia RTL515 Radar with Tail-light', 'Garmin', 289, 369, 'Rear radar and tail light', 'Lights', [], ['electric bike light', 'bike radar']),

  // ---- Segway-Ninebot scooters
  scooter('segway-ninebot-kickscooter-e2-plus-ii', 'Segway Ninebot KickScooter E2 Plus II Electric Scooter', 594, 899, 'Adults scooters', [], { image: '/images/products/segway-ninebot-kickscooter-e2-plus-ii.jpg' }),
  scooter('segway-ninebot-kickscooter-e2-pro', 'Segway Ninebot KickScooter E2 Pro Electric Scooter', 692, 899, 'Adults scooters', []),
  scooter('segway-ninebot-e3-pro', 'Segway Ninebot E3 Pro Electric Scooter', 979, 1199, 'Adults scooters', ['800 W motor', 'Up to 55 km claimed range'], { motor: '800 W motor', rangeKm: 55 }),
  scooter('segway-ninebot-c2-pro', 'Segway Ninebot C2 Pro Electric Scooter', 484, 599, 'Adults scooters', []),
  scooter('segway-ninebot-c2-lite-ekickscooter', 'Segway Ninebot C2 Lite eKickScooter', 279, 399, 'Adults scooters', []),
  scooter('segway-ninebot-kickscooter-f3', 'Segway Ninebot KickScooter F3 Electric Scooter', 1129, 1299, 'Adults scooters', []),
  scooter('segway-ninebot-kickscooter-f3-pro', 'Segway Ninebot KickScooter F3 Pro Electric Scooter', 1394, 1599, 'Adults scooters', []),
  scooter('segway-ninebot-zt3-pro', 'Segway Ninebot ZT3 Pro Electric Scooter', 1694, 1799, 'Adults scooters', ['1600 W brushless motor', 'Up to 70 km claimed range'], { motor: '1600 W brushless motor', rangeKm: 70 }),
  scooter('segway-ninebot-kickscooter-max-g3', 'Segway Ninebot KickScooter MAX G3 Electric Scooter', 1694, 1899, 'Adults scooters', ['2000 W peak motor'], { motor: '2000 W peak motor' }),
];

export const RETAIL_GEAR: Product[] = SPECS.map(build);
