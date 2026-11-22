import type { Product } from '@/lib/types';

/**
 * Conversion kit, conversion batteries, electric parts and electric trikes (owner order 2026-11-22: "use the product rule, price from Google,
 * set mine a little lower, use the image rule").
 * - price = about 3 to 4 percent below the lowest Australian retail price found on 2026-11-22 (market price noted per product); compareAtPrice = the RRP where the seller shows one.
 * - Specs are only what the Australian retailer listings state. Photos: pure white 800x800 WebP, source log in seo-strategy/sourcing/extra-product-image-sources.csv.
 * - rating / reviewsCount are 0 on purpose (no real reviews yet), so no rating is shown and no AggregateRating is emitted.
 */
interface Spec {
  slug: string;
  name: string;
  brand: string;
  kind: 'kit' | 'battery' | 'display' | 'trike';
  price: number;
  compareAtPrice?: number;
  subtitle: string;
  shortDescription: string;
  description: string;
  features: string[];
  images: number;
  wh?: number;
  motor?: string;
  batterySpec?: string;
  auCompliance: string;
  /** held back until the owner confirms the battery certification (Product Safety Australia warns about unbranded lithium-ion packs) */
  hold?: boolean;
}

const COMPONENT_NOTE = 'Check compatibility with your bike before you order.';
const SPECS: Spec[] = [
  {
    slug: 'bafang-bbs01b-36v-250w-mid-drive-conversion-kit',
    name: 'Bafang BBS01B 36V 250W Mid-Drive Conversion Kit',
    brand: 'Bafang', kind: 'kit', price: 689, images: 2,
    subtitle: 'Mid-drive e-bike conversion kit, 36V 250W, 80 Nm torque',
    shortDescription: 'A Bafang BBS01B 36V 250W mid-drive motor kit that adds pedal assist to a bike with a 68 mm bottom bracket.',
    description: 'The Bafang BBS01B is a 36V 250W mid-drive conversion kit. The motor replaces the bottom bracket and drives the cranks, so it uses the bike\'s own gears for better climbing than a wheel motor. The listing states 80 Nm of maximum torque, a gear-drive motor and an IP65 waterproof rating. The motor fits a 68 mm bottom bracket and suits bikes of about 19 to 26 inches. The kit does not include a battery: choose a 36V battery that suits your bike. A conversion changes how the bike brakes and handles, so check your state rules, fit it carefully or use a workshop, and note that converted e-bikes are not allowed on Victorian trains.',
    features: ['36V 250W Bafang BBS01B mid-drive motor', 'Up to 80 Nm of torque (listing)', 'Gear-drive motor, IP65 waterproof rating', 'Fits a 68 mm bottom bracket, bikes of about 19 to 26 inches', 'Motor only: battery sold separately (36V)'],
    motor: 'Bafang BBS01B mid-drive, 250 W', auCompliance: '250 W rated motor: check your state rules before you convert a bike; converted e-bikes are not allowed on Victorian trains',
  },
  {
    slug: 'conversion-battery-kit-36v-14ah-504wh-with-charger',
    name: 'Conversion Battery Kit 36V 14Ah 504Wh with Charger (BKS13614GB)',
    brand: 'Das-Kit', kind: 'battery', price: 399, images: 1, wh: 504, hold: true,
    subtitle: '36V 14Ah 504 Wh rear-rack battery for e-bike conversion kits',
    shortDescription: 'A 36V 14Ah 504 Wh lithium-ion rear-rack battery kit with charger for e-bike conversion kits.',
    description: 'This 36V 14Ah battery (504 Wh) is a rear-rack battery kit for e-bike conversions, built from NCR18650 cells. The listing gives a theoretical range of 60 to 80 km with usual use. It fits conversion kits on bikes with eyelets or mounts for a rear rack, and suits 36V systems such as the Bafang BBS01B 36V. The package includes the battery, fitting kit, keys and base plate, with a charger. Use only the supplied charger, charge indoors and never leave a battery charging unattended.',
    features: ['36V 14Ah, 504 Wh lithium-ion battery', 'NCR18650 cells, theoretical range 60 to 80 km (listing)', 'Rear-rack mount with base plate, fitting kit and keys', 'Charger included', 'For 36V conversion kits: check compatibility before you order'],
    batterySpec: '36V 14Ah 504 Wh lithium-ion', auCompliance: 'Lithium-ion battery: use the supplied charger, charge indoors and check the battery label for its standard marks',
  },
  {
    slug: 'conversion-battery-kit-36v-18ah-648wh-3a-charger',
    name: 'Conversion Battery Kit 36V 18Ah 648Wh with 3A Charger (R2-3618H)',
    brand: 'Das-Kit', kind: 'battery', price: 469, images: 1, wh: 648, hold: true,
    subtitle: '36V 18Ah 648 Wh battery with case and 3A charger for conversions',
    shortDescription: 'A 36V 18Ah 648 Wh lithium-ion battery with case, keys and 3A charger for e-bike conversion kits.',
    description: 'This 36V 18Ah battery (648 Wh) is built from NCM18650 cells and comes in a battery case for e-bike conversion kits. The listing gives a theoretical range of 60 to 90 km with usual use. The package includes the battery, the case, a charger, keys and a fitting kit. It suits 36V systems such as the Bafang BBS01B 36V. A larger battery adds range and weight, so check the mounting on your bike. Use only the supplied charger, charge indoors and never leave a battery charging unattended.',
    features: ['36V 18Ah, 648 Wh lithium-ion battery', 'NCM18650 cells, theoretical range 60 to 90 km (listing)', 'Battery case, keys and fitting kit included', '3A charger included', 'For 36V conversion kits: check compatibility before you order'],
    batterySpec: '36V 18Ah 648 Wh lithium-ion', auCompliance: 'Lithium-ion battery: use the supplied charger, charge indoors and check the battery label for its standard marks',
  },
  {
    slug: 'bosch-kiox-300-e-bike-display-bhu3600',
    name: 'Bosch Kiox 300 E-Bike Display (BHU3600)',
    brand: 'Bosch', kind: 'display', price: 183, compareAtPrice: 199.99, images: 2,
    subtitle: 'Bosch Smart System colour display with navigation and ride tracking',
    shortDescription: 'The Bosch Kiox 300 (BHU3600) is a colour e-bike display for the Bosch Smart System.',
    description: 'The Bosch Kiox 300 (BHU3600) is a compact colour display for e-bikes with the Bosch Smart System. It shows speed, assist mode and battery level on a high-resolution screen that stays readable in different light, and it supports navigation and performance tracking through the Bosch eBike Connect app. It is a replacement or upgrade part, so check that your bike uses the Bosch Smart System before you order, and ask us to confirm compatibility with your model.',
    features: ['High-resolution colour screen', 'Compatible with the Bosch Smart System', 'Navigation and performance tracking with the Bosch eBike Connect app', 'Compact, rugged design', COMPONENT_NOTE],
    auCompliance: '',
  },
  {
    slug: 'bosch-intuvia-100-e-bike-display-bhu3200',
    name: 'Bosch Intuvia 100 E-Bike Display (BHU3200)',
    brand: 'Bosch', kind: 'display', price: 137, compareAtPrice: 149.99, images: 2,
    subtitle: 'Bosch Intuvia 100 display for speed, assist level and range',
    shortDescription: 'The Bosch Intuvia 100 (BHU3200) is an e-bike display for speed, assist level and range.',
    description: 'The Bosch Intuvia 100 (BHU3200) is an e-bike display with an easy-to-read screen for speed, assist level and trip information. It is a replacement or upgrade part for bikes with a compatible Bosch system, so check your bike\'s system and the display\'s connector before you order, and ask us to confirm compatibility with your model.',
    features: ['Bosch Intuvia 100 e-bike display (BHU3200)', 'Shows speed, assist level and trip information', 'Mounts on the handlebar', COMPONENT_NOTE],
    auCompliance: '',
  },
  {
    slug: 'bosch-kiox-500-e-bike-display-bhu3700',
    name: 'Bosch Kiox 500 E-Bike Display (BHU3700)',
    brand: 'Bosch', kind: 'display', price: 241, compareAtPrice: 259.99, images: 1,
    subtitle: 'Bosch Kiox 500 colour display with GPS tracking and app connection',
    shortDescription: 'The Bosch Kiox 500 (BHU3700) is a colour e-bike display with GPS tracking and Bosch eBike Connect support.',
    description: 'The Bosch Kiox 500 (BHU3700) is a compact colour display that shows speed, power and navigation on a high-visibility screen. It supports smartphone connection and GPS tracking, and it works with the Bosch eBike Connect app for fitness tracking. It is a replacement or upgrade part, so check that your bike uses a compatible Bosch system before you order, and ask us to confirm compatibility with your model.',
    features: ['High-visibility colour screen', 'GPS tracking and smartphone compatibility', 'Works with the Bosch eBike Connect app', COMPONENT_NOTE],
    auCompliance: '',
  },
  {
    slug: 'addmotor-citytri-e-310-foldable-electric-trike',
    name: 'Addmotor Citytri E-310 Foldable Electric Trike',
    brand: 'Addmotor', kind: 'trike', price: 2899, compareAtPrice: 3240, images: 1, wh: 960,
    subtitle: 'Foldable adult electric trike with a 250W rear motor and 48V 20Ah battery',
    shortDescription: 'A foldable adult electric trike with a 250W rear-drive motor and a 48V 20Ah Samsung battery.',
    description: 'The Addmotor Citytri E-310 is a foldable three-wheel electric trike for adults who want stability at low speed and easy mounting without balancing. It has a 250W rear-drive motor and a 48V 20Ah Samsung battery (960 Wh), a rear cargo basket and a backrest seat. A trike is wider and heavier than a bike, so check your storage space, the turning circle and your state\'s rules for trikes before you order.',
    features: ['250W rear-drive motor', '48V 20Ah Samsung battery (960 Wh)', 'Foldable frame', 'Rear cargo basket and backrest seat', 'Three-wheel design for stability at low speed'],
    motor: '250 W rear-drive motor', batterySpec: '48V 20Ah Samsung (960 Wh)', auCompliance: '250 W pedal-assist: check your state rules for e-trikes before you ride',
  },
  {
    slug: 'tdr-electric-tricycle-48v-250w-10ah-white',
    name: 'TDR Electric Tricycle 48V 250W 10Ah with Basket and Rear Rack (White)',
    brand: 'TDR', kind: 'trike', price: 1129, compareAtPrice: 1379.95, images: 1, wh: 480, hold: true,
    subtitle: 'Adult electric trike with a 250W motor, 48V 10Ah battery, basket and rear rack',
    shortDescription: 'An adult electric tricycle with a 250W motor, a 48V 10Ah battery, a basket and a rear rack.',
    description: 'The TDR electric tricycle is a three-wheel adult trike with a 250W motor and a 48V 10Ah battery (480 Wh). It comes with a basket, a rear rack and a trolley for shopping and light loads, and the three-wheel design is stable at low speed and easy to start and stop. A trike is wider and heavier than a bike, so check your storage space, the turning circle and your state\'s rules for trikes before you order.',
    features: ['250W motor', '48V 10Ah battery (480 Wh)', 'Basket, rear rack and trolley', 'Three-wheel design for stability at low speed', 'White frame'],
    motor: '250 W motor', batterySpec: '48V 10Ah (480 Wh)', auCompliance: '250 W pedal-assist: check your state rules for e-trikes before you ride',
  },
];

const build = (s: Spec): Product => {
  const isTrike = s.kind === 'trike';
  const gallery = Array.from({ length: s.images }, (_, i) => `/images/products/${s.slug}${i ? `-${i + 1}` : ''}.webp`);
  return {
    id: `extra-${s.slug}`,
    name: s.name,
    slug: s.slug,
    subtitle: s.subtitle,
    category: isTrike ? 'cargo' : 'parts',
    categoryLabel: isTrike ? 'Electric Cargo Bikes' : 'Parts',
    subcategory: isTrike ? 'Electric trikes' : 'E-bike electrical parts',
    subcategoryId: isTrike ? 'cargo-trikes' : 'parts-electrical',
    brand: s.brand,
    focusKeyword: s.name.toLowerCase().replace(/["']/g, ''),
    price: s.price,
    compareAtPrice: s.compareAtPrice,
    rating: 0,
    reviewsCount: 0,
    image: gallery[0],
    hoverImage: gallery[gallery.length - 1],
    gallery,
    inStock: true,
    stockCount: 0,
    motor: s.motor ?? '',
    motorType: 'Hub',
    torqueNm: 0,
    batteryWh: s.wh ?? 0,
    batterySpec: s.batterySpec ?? '',
    rangeKm: 0,
    topSpeedKmH: isTrike ? 25 : 0,
    frameType: 'Universal',
    weightKg: 0,
    payloadKg: 0,
    brakes: isTrike ? 'See spec sheet' : '',
    gears: isTrike ? 'See spec sheet' : '',
    auCompliance: s.auCompliance,
    description: s.description,
    shortDescription: s.shortDescription,
    features: s.features,
    tags: [],
    sizeVariants: [{ id: 'standard', label: 'Standard (ask us to confirm fit before you order)', priceDelta: 0 }],
    recommendedAddOns: [],
  };
};

export const EXTRA_PRODUCTS: Product[] = SPECS.filter((s) => !s.hold).map(build);
