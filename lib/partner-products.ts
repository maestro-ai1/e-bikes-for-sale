import type { Product, ProductCategory } from '@/lib/types';

/**
 * Cube, Merida, Pedal and Dirodi models added from the supplier photo set.
 * - price = current sale price, compareAtPrice = full RRP, both AUD, benchmarked against 99 Bikes Australia (Oct 2026). Retailer prices move, so re-check before launch.
 * - Only specs that the retailer listings agree on are filled in. 0 means "not confirmed": the UI shows "See spec sheet" instead of a number.
 * - rating / reviewsCount are 0 on purpose: there are no real reviews yet, so no rating is shown and no AggregateRating is emitted.
 */

const COMPLIANCE = 'EN15194 pedal-assist, 25 km/h assist limit';
const IMG = (slug: string, n?: number) => `/images/products/${slug}${n ? `-${n}` : ''}.jpg`;

interface Spec {
  slug: string;
  name: string;
  brand: 'Cube' | 'Merida' | 'Pedal' | 'Dirodi';
  focusKeyword: string;
  category: ProductCategory;
  categoryLabel: string;
  subcategory?: string;
  subcategoryId?: string;
  price: number;
  compareAtPrice?: number;
  subtitle: string;
  shortDescription: string;
  description: string;
  features: string[];
  motor: string;
  motorType: 'Hub' | 'Mid-Drive';
  torqueNm?: number;
  batteryWh?: number;
  batterySpec: string;
  rangeKm?: number;
  weightKg?: number;
  frameType: Product['frameType'];
  frameMaterial?: string;
  brakes: string;
  gears: string;
  images: number; // number of photos (slug.jpg, slug-2.jpg, slug-3.jpg ...)
  tags: string[];
}

const build = (s: Spec): Product => {
  const gallery = Array.from({ length: Math.max(1, s.images) }, (_, i) => IMG(s.slug, i === 0 ? undefined : i + 1));
  return {
    id: `ptn-${s.slug}`,
    name: s.name,
    slug: s.slug,
    subtitle: s.subtitle,
    category: s.category,
    categoryLabel: s.categoryLabel,
    subcategory: s.subcategory,
    subcategoryId: s.subcategoryId,
    brand: s.brand,
    focusKeyword: s.focusKeyword,
    frameMaterial: s.frameMaterial,
    price: s.price,
    compareAtPrice: s.compareAtPrice,
    rating: 0,
    reviewsCount: 0,
    image: gallery[0],
    hoverImage: gallery[gallery.length - 1],
    gallery,
    inStock: true,
    stockCount: 0,
    motor: s.motor,
    motorType: s.motorType,
    torqueNm: s.torqueNm ?? 0,
    batteryWh: s.batteryWh ?? 0,
    batterySpec: s.batterySpec,
    rangeKm: s.rangeKm ?? 0,
    topSpeedKmH: 25,
    frameType: s.frameType,
    weightKg: s.weightKg ?? 0,
    payloadKg: 0,
    brakes: s.brakes,
    gears: s.gears,
    auCompliance: COMPLIANCE,
    description: s.description,
    shortDescription: s.shortDescription,
    features: s.features,
    tags: s.tags,
    sizeVariants: [{ id: 'standard', label: 'Standard (confirm frame size when ordering)', priceDelta: 0 }],
    recommendedAddOns: [],
  };
};

const SPECS: Spec[] = [
  {
    slug: 'cube-reaction-hybrid-performance-500',
    name: 'Cube Reaction Hybrid Performance 500 Electric Hardtail Mountain Bike',
    brand: 'Cube', focusKeyword: 'cube reaction hybrid performance 500 electric hardtail mountain bike',
    category: 'emtb', categoryLabel: 'Electric Mountain Bikes', subcategory: "Hardtail eMTB's", subcategoryId: 'emtb-hardtail',
    price: 2999, compareAtPrice: 4299,
    subtitle: 'Bosch mid-drive hardtail with 500 Wh battery for trails and gravel tracks',
    shortDescription: 'A Bosch Performance Line mid-drive hardtail eMTB with a 500 Wh PowerTube battery and 75 Nm of torque.',
    description: 'The Cube Reaction Hybrid Performance 500 is a hardtail electric mountain bike built around a Bosch Performance Line mid-drive and a 500 Wh PowerTube battery. It suits riders who want a simple, low-maintenance eMTB for trails, fire roads and mixed commuting.',
    features: ['Bosch Performance Line mid-drive, 250 W and 75 Nm', 'Bosch PowerTube 500 Wh battery, up to about 63 km claimed range', 'Shimano Cues 1x9 drivetrain with Shimano hydraulic disc brakes (180 mm rotors)', 'Hardtail frame for lower weight and easy upkeep'],
    motor: 'Bosch Performance Line mid-drive, 250 W', motorType: 'Mid-Drive', torqueNm: 75, batteryWh: 500, batterySpec: 'Bosch PowerTube 500 Wh', rangeKm: 63, weightKg: 24.1,
    frameType: 'Hardtail', frameMaterial: 'Alloy', brakes: 'Shimano hydraulic disc brakes, 180 mm rotors', gears: 'Shimano Cues 1x9', images: 2,
    tags: ['cube e mountain bikes', 'electric hardtail mountain bike', 'bosch ebike', 'hardtail emtb', 'cube reaction hybrid'],
  },
  {
    slug: 'cube-stereo-hybrid-one77-hpc-race-800',
    name: 'Cube Stereo Hybrid ONE77 HPC Race 800 Electric Enduro Bike',
    brand: 'Cube', focusKeyword: 'cube stereo hybrid one77 hpc race 800 electric enduro bike',
    category: 'emtb', categoryLabel: 'Electric Mountain Bikes', subcategory: "Dual Suspension eMTB's", subcategoryId: 'emtb-dual-suspension',
    price: 5597, compareAtPrice: 7999,
    subtitle: 'Carbon full-suspension enduro eMTB with an 800 Wh Bosch battery',
    shortDescription: 'A carbon full-suspension enduro eMTB with a Bosch Performance Line CX drive and an 800 Wh PowerTube battery.',
    description: 'The Cube Stereo Hybrid ONE77 HPC Race 800 is a high-end enduro electric mountain bike with a lightweight carbon frame, a Bosch Performance Line CX drive and an 800 Wh PowerTube battery housed in the down tube. It is built for long, steep and technical days on the trail.',
    features: ['Carbon (HPC) frame with long-travel full suspension', 'Bosch Performance Line CX mid-drive', 'Bosch PowerTube 800 Wh integrated battery', 'Shimano XT 12-speed drivetrain and 203 mm hydraulic disc brakes'],
    motor: 'Bosch Performance Line CX mid-drive', motorType: 'Mid-Drive', batteryWh: 800, batterySpec: 'Bosch PowerTube 800 Wh',
    frameType: 'Dual Suspension', frameMaterial: 'High Performance Carbon', brakes: 'Magura hydraulic disc brakes, 203 mm rotors', gears: 'Shimano XT 12-speed', images: 2,
    tags: ['cube electric enduro bike', 'electric enduro mountain bike', 'carbon emtb', 'bosch cx emtb', 'full suspension e mtb'],
  },
  {
    slug: 'merida-eone-sixty-400',
    name: 'Merida eOne-Sixty 400 Electric Enduro Bike',
    brand: 'Merida', focusKeyword: 'merida eone sixty 400 electric enduro bike',
    category: 'emtb', categoryLabel: 'Electric Mountain Bikes', subcategory: 'Enduro eMTBs', subcategoryId: 'emtb-enduro',
    price: 4477, compareAtPrice: 6999,
    subtitle: 'Long-travel enduro eMTB with a Shimano EP801 motor and 630 Wh battery',
    shortDescription: 'A long-travel aluminium enduro eMTB with a Shimano EP801 mid-drive, 85 Nm of torque and a 630 Wh battery.',
    description: 'The Merida eOne-Sixty 400 is an aluminium full-suspension enduro eMTB built around the Shimano EP801 mid-drive and a 630 Wh Shimano battery. It gives confident descending and strong climbing for riders who want enduro capability without a carbon price.',
    features: ['Shimano EP801 mid-drive, 250 W and 85 Nm', 'Shimano EN806 630 Wh battery', 'Shimano Cues 9-speed drivetrain', 'Four-piston hydraulic disc brakes with 203 mm rotors'],
    motor: 'Shimano EP801 mid-drive, 250 W', motorType: 'Mid-Drive', torqueNm: 85, batteryWh: 630, batterySpec: 'Shimano EN806 630 Wh',
    frameType: 'Dual Suspension', frameMaterial: 'Alloy', brakes: '4-piston hydraulic disc brakes, 203 mm rotors', gears: 'Shimano Cues 9-speed', images: 1,
    tags: ['merida electric enduro bike', 'electric enduro mountain bike', 'shimano ep801', 'full suspension e mtb', 'emtb australia'],
  },
  {
    slug: 'pedal-lynx-3-electric-hardtail-mountain-bike',
    name: 'Pedal Lynx 3 Electric Hardtail Mountain Bike',
    brand: 'Pedal', focusKeyword: 'pedal lynx 3 electric hardtail mountain bike',
    category: 'emtb', categoryLabel: 'Electric Mountain Bikes', subcategory: "Hardtail eMTB's", subcategoryId: 'emtb-hardtail',
    price: 2145, compareAtPrice: 3499,
    subtitle: 'Entry-level mid-drive hardtail eMTB with a removable 468 Wh battery',
    shortDescription: 'A value mid-drive hardtail eMTB with 29 inch wheels and a removable 468 Wh battery.',
    description: 'The Pedal Lynx 3 is an affordable mid-drive electric hardtail mountain bike with 29 inch wheels, a front suspension fork and a removable 468 Wh battery. It is a practical first eMTB for tracks, trails and weekend rides.',
    features: ['Ananda M81 mid-drive motor', 'Removable 468 Wh battery for easy charging', '29 inch wheels with front suspension fork', 'Hardtail frame, simple to maintain'],
    motor: 'Ananda M81 mid-drive motor, 250 W', motorType: 'Mid-Drive', batteryWh: 468, batterySpec: 'Removable 468 Wh lithium battery',
    frameType: 'Hardtail', frameMaterial: 'Alloy', brakes: 'Hydraulic disc brakes', gears: 'See spec sheet', images: 1,
    tags: ['electric hardtail mountain bike', 'cheap hardtail mountain bikes', 'mid drive ebike', 'pedal electric mountain bike', 'hardtail mountain bikes'],
  },
  {
    slug: 'cube-touring-hybrid-one-600',
    name: 'Cube Touring Hybrid ONE 600 Electric Hybrid Bike',
    brand: 'Cube', focusKeyword: 'cube touring hybrid one 600 electric hybrid bike',
    category: 'commuter', categoryLabel: 'Electric Commuter Bikes',
    price: 3299, compareAtPrice: 4999,
    subtitle: 'Fully equipped Bosch touring e-bike with rack, mudguards and lights',
    shortDescription: 'A fully equipped touring and commuter e-bike with a Bosch Performance Line drive and a 600 Wh battery.',
    description: 'The Cube Touring Hybrid ONE 600 is a fully equipped electric hybrid for commuting and touring. It pairs a Bosch Performance Line drive with a 600 Wh PowerTube battery and comes ready to ride with a rack, mudguards, lights and a kickstand.',
    features: ['Bosch Performance Line drive, 250 W and 75 Nm', 'Bosch PowerTube 600 Wh battery', 'Rack, mudguards, lights and kickstand included', 'Shimano Cues 9-speed with hydraulic disc brakes'],
    motor: 'Bosch Performance Line mid-drive, 250 W', motorType: 'Mid-Drive', torqueNm: 75, batteryWh: 600, batterySpec: 'Bosch PowerTube 600 Wh',
    frameType: 'Crossbar', frameMaterial: 'Aluminium', brakes: 'Shimano hydraulic disc brakes', gears: 'Shimano Cues 9-speed', images: 2,
    tags: ['electric hybrid bike', 'electric commuter bikes', 'touring ebike', 'bosch ebike', 'cube hybrid bike'],
  },
  {
    slug: 'cube-touring-hybrid-one-easy-entry-600',
    name: 'Cube Touring Hybrid ONE Easy Entry 600 Electric Hybrid Bike',
    brand: 'Cube', focusKeyword: 'cube touring hybrid one easy entry 600 electric hybrid bike',
    category: 'commuter', categoryLabel: 'Electric Commuter Bikes',
    price: 3299, compareAtPrice: 4999,
    subtitle: 'Step-through touring e-bike with Bosch drive and 600 Wh battery',
    shortDescription: 'A step-through touring and commuter e-bike with a Bosch Performance Line drive and a 600 Wh battery.',
    description: 'The Cube Touring Hybrid ONE Easy Entry 600 is the step-through version of Cube\'s touring e-bike. The low entry makes mounting easy, and it carries the same Bosch drive, 600 Wh battery and full touring equipment.',
    features: ['Easy-entry step-through frame', 'Bosch Performance Line drive, 250 W and 75 Nm', 'Bosch PowerTube 600 Wh battery', 'Rack, mudguards, lights and kickstand included'],
    motor: 'Bosch Performance Line mid-drive, 250 W', motorType: 'Mid-Drive', torqueNm: 75, batteryWh: 600, batterySpec: 'Bosch PowerTube 600 Wh',
    frameType: 'Step-Through', frameMaterial: 'Aluminium', brakes: 'Shimano hydraulic disc brakes', gears: 'Shimano Cues 9-speed', images: 4,
    tags: ['step through ebike', 'electric commuter bikes', 'easy entry electric bike', 'touring ebike', 'cube hybrid bike'],
  },
  {
    slug: 'cube-nuroad-hybrid-c62-race-400x',
    name: 'Cube Nuroad Hybrid C:62 Race 400X Electric Gravel Bike',
    brand: 'Cube', focusKeyword: 'cube nuroad hybrid c62 race 400x electric gravel bike',
    category: 'road', categoryLabel: 'Electric Road Bikes',
    price: 6299, compareAtPrice: 6799,
    subtitle: 'Lightweight carbon electric gravel bike with Shimano GRX',
    shortDescription: 'A carbon electric gravel bike with a Bosch Performance Line SX drive, a 400 Wh battery and Shimano GRX.',
    description: 'The Cube Nuroad Hybrid C:62 Race 400X is a lightweight carbon electric gravel bike. A compact Bosch Performance Line SX drive and an integrated 400 Wh battery keep it light, and Shimano GRX gearing and brakes are built for mixed-surface riding.',
    features: ['C:62 carbon frame', 'Bosch Performance Line SX drive', 'Integrated Bosch CompactTube 400 Wh battery', 'Shimano GRX 1x12 drivetrain and hydraulic disc brakes'],
    motor: 'Bosch Performance Line SX mid-drive, 250 W', motorType: 'Mid-Drive', batteryWh: 400, batterySpec: 'Bosch CompactTube 400 Wh',
    frameType: 'Crossbar', frameMaterial: 'Carbon', brakes: 'Shimano GRX hydraulic disc brakes', gears: 'Shimano GRX 1x12', images: 2,
    tags: ['electric gravel bike', 'e gravel bike', 'gravel ebike', 'electric road bike', 'carbon electric bike'],
  },
  {
    slug: 'merida-esilex-400',
    name: 'Merida eSilex 400 Electric Gravel Bike',
    brand: 'Merida', focusKeyword: 'merida esilex 400 electric gravel bike',
    category: 'road', categoryLabel: 'Electric Road Bikes',
    price: 2999, compareAtPrice: 4199,
    subtitle: 'Light, natural-feeling electric gravel bike with a MAHLE hub drive',
    shortDescription: 'A light electric gravel bike with a MAHLE hub drive that rides close to a regular gravel bike.',
    description: 'The Merida eSilex 400 is a lightweight electric gravel bike with a MAHLE rear hub drive. The small motor and battery keep the bike close to a conventional gravel bike in weight and feel, with assistance when you want it.',
    features: ['MAHLE rear hub drive', 'Gravel geometry with wide-tyre clearance', 'Hydraulic disc brakes', 'Light, natural ride feel'],
    motor: 'MAHLE rear hub drive, 250 W', motorType: 'Hub', batterySpec: 'MAHLE integrated battery',
    frameType: 'Crossbar', frameMaterial: 'Alloy', brakes: 'Hydraulic disc brakes', gears: 'See spec sheet', images: 1,
    tags: ['electric gravel bike', 'e gravel bike', 'gravel ebike', 'merida esilex', 'electric road bike'],
  },
  {
    slug: 'merida-esilex-plus-600',
    name: 'Merida eSilex+ 600 Electric Gravel Bike',
    brand: 'Merida', focusKeyword: 'merida esilex plus 600 electric gravel bike',
    category: 'road', categoryLabel: 'Electric Road Bikes',
    price: 3999, compareAtPrice: 4799,
    subtitle: 'SRAM-equipped electric gravel bike with a MAHLE hub drive',
    shortDescription: 'A light electric gravel bike with a MAHLE hub drive, 250 Wh battery and SRAM Apex gearing.',
    description: 'The Merida eSilex+ 600 is a step-up electric gravel bike with a lightweight alloy frame, carbon fork, SRAM Apex 1x12 gearing and a MAHLE hub drive with a 250 Wh battery. It rides close to a regular gravel bike with assistance on climbs and headwinds.',
    features: ['MAHLE rear hub drive with 250 Wh battery', 'Lightweight alloy frame with carbon fork', 'SRAM Apex 1x12 drivetrain', 'Hydraulic disc brakes'],
    motor: 'MAHLE rear hub drive, 250 W', motorType: 'Hub', batteryWh: 250, batterySpec: 'MAHLE 250 Wh battery',
    frameType: 'Crossbar', frameMaterial: 'Alloy with carbon fork', brakes: 'Hydraulic disc brakes', gears: 'SRAM Apex 1x12', images: 1,
    tags: ['electric gravel bike', 'e gravel bike', 'gravel ebike', 'merida esilex plus', 'electric road bike'],
  },
  {
    slug: 'pedal-brewer-electric-cruiser-560wh',
    name: 'Pedal Brewer Electric Cruiser Bike 560Wh',
    brand: 'Pedal', focusKeyword: 'pedal brewer electric cruiser bike 560wh',
    category: 'fat-tyre', categoryLabel: 'Fat Tyre E-Bikes',
    price: 1899, compareAtPrice: 2599,
    subtitle: 'Step-through fat tyre cruiser with a removable 560 Wh battery',
    shortDescription: 'A step-through fat tyre electric cruiser with a removable 560 Wh battery and hydraulic disc brakes.',
    description: 'The Pedal Brewer is a relaxed step-through electric cruiser on 20 inch fat tyres with a removable 560 Wh battery. A rear hub motor, 7-speed Shimano gearing and hydraulic disc brakes make it an easy, comfortable ride for the beach, the bike path or the shops.',
    features: ['Removable 36 V 560 Wh battery', 'Rear hub motor with 40 Nm of torque', 'Shimano 7-speed drivetrain', 'Tektro hydraulic disc brakes with motor cut-off'],
    motor: 'Rear hub motor', motorType: 'Hub', torqueNm: 40, batteryWh: 560, batterySpec: '36 V removable 560 Wh battery', rangeKm: 50, weightKg: 26,
    frameType: 'Step-Through', frameMaterial: 'Alloy', brakes: 'Tektro HD-M275 hydraulic disc brakes', gears: 'Shimano 1x7', images: 2,
    tags: ['cruiser e bike', 'electric cruiser bikes', 'step through ebike', 'fat tyre electric bike', 'pedal electric bikes'],
  },
  {
    slug: 'pedal-derby-electric-folding-bike',
    name: 'Pedal Derby Electric Folding Bike',
    brand: 'Pedal', focusKeyword: 'pedal derby electric folding bike',
    category: 'folding', categoryLabel: 'Folding E-Bikes',
    price: 1899, compareAtPrice: 2299,
    subtitle: 'Step-through folding e-bike with a removable 374 Wh battery',
    shortDescription: 'A step-through folding e-bike with a 250 W hub motor, removable 374 Wh battery and hydraulic disc brakes.',
    description: 'The Pedal Derby is a folding step-through electric bike on 20 inch wheels with a 250 W rear hub motor and a removable 374 Wh battery. It folds down for the boot, the train or the office, and one size fits riders from about 145 to 185 cm.',
    features: ['250 W rear hub motor with 40 Nm of torque', 'Removable 374 Wh battery, up to about 50 km range', 'Shimano Tourney 7-speed and Tektro hydraulic disc brakes', 'Folds to 86 x 46 x 68 cm'],
    motor: '250 W rear hub motor', motorType: 'Hub', torqueNm: 40, batteryWh: 374, batterySpec: 'Removable 374 Wh battery', rangeKm: 50, weightKg: 20.5,
    frameType: 'Folding', frameMaterial: 'Alloy 6061', brakes: 'Tektro HD-M275 hydraulic disc brakes, 160 mm rotors', gears: 'Shimano Tourney 7-speed', images: 4,
    tags: ['folding e bike', 'electric folding bike', 'foldable electric bike', 'step through folding ebike', 'compact ebike'],
  },
  {
    slug: 'pedal-dynamo-3-electric-folding-bike',
    name: 'Pedal Dynamo 3 Electric Folding Bike',
    brand: 'Pedal', focusKeyword: 'pedal dynamo 3 electric folding bike',
    category: 'folding', categoryLabel: 'Folding E-Bikes',
    price: 899, compareAtPrice: 1399,
    subtitle: 'Budget folding e-bike with a rack-mounted removable battery',
    shortDescription: 'An entry-level folding e-bike with a 250 W hub motor and a removable rack-mounted battery.',
    description: 'The Pedal Dynamo 3 is an entry-level electric folding bike on compact 20 inch wheels. It has a 250 W rear hub motor, a removable battery on the rear rack, a 7-speed drivetrain and an adjustable stem and seatpost, so it suits short urban trips and small spaces.',
    features: ['250 W rear hub motor', 'Removable rear-rack battery', '7-speed drivetrain', 'Adjustable stem and seatpost on 20 inch wheels'],
    motor: '250 W rear hub motor', motorType: 'Hub', batteryWh: 280, batterySpec: 'Removable rear-rack battery', rangeKm: 30,
    frameType: 'Folding', frameMaterial: 'Alloy', brakes: 'See spec sheet', gears: '7-speed', images: 2,
    tags: ['folding e bike', 'cheap folding electric bike', 'electric folding bike', 'compact ebike', 'low cost e bikes'],
  },
  {
    slug: 'pedal-bandit-20-electric-fat-tyre-bike',
    name: 'Pedal Bandit 20" Electric Fat Tyre Bike',
    brand: 'Pedal', focusKeyword: 'pedal bandit 20 electric fat tyre bike',
    category: 'fat-tyre', categoryLabel: 'Fat Tyre E-Bikes',
    price: 1299, compareAtPrice: 2699,
    subtitle: 'Compact 20 inch fat tyre e-bike with a removable battery',
    shortDescription: 'A compact fat tyre e-bike with a 250 W hub motor, 4 inch tyres and hydraulic disc brakes.',
    description: 'The Pedal Bandit 20" is a compact electric fat tyre bike with 20 x 4 inch tyres, a 250 W rear hub motor and a removable battery. Hydraulic disc brakes and a sturdy steel frame make it a fun, stable ride over sand, gravel and city streets.',
    features: ['250 W rear hub motor, 45 Nm of torque', '20 x 4 inch fat tyres for sand and gravel', 'Hydraulic disc brakes', 'Removable battery, up to about 50 km range'],
    motor: '250 W rear hub motor', motorType: 'Hub', torqueNm: 45, batteryWh: 624, batterySpec: 'Removable lithium battery', rangeKm: 50,
    frameType: 'Crossbar', frameMaterial: 'Steel', brakes: 'Hydraulic disc brakes', gears: 'See spec sheet', images: 2,
    tags: ['fat tyre electric bicycle', 'electric fat bike', 'fat tyre ebike', 'fat bike for sale', 'compact fat bike'],
  },
  {
    slug: 'dirodi-rover-pro-250w-electric-fat-bike',
    name: 'Dirodi Rover Pro 250W Electric Fat Bike',
    brand: 'Dirodi', focusKeyword: 'dirodi rover pro 250w electric fat bike',
    category: 'fat-tyre', categoryLabel: 'Fat Tyre E-Bikes',
    price: 3259, compareAtPrice: 4490,
    subtitle: 'Moto-styled fat tyre e-bike with a 52 V battery and up to 125 km range',
    shortDescription: 'A moto-styled fat tyre e-bike with a 250 W hub motor, 52 V battery and up to 125 km claimed range.',
    description: 'The Dirodi Rover Pro is a moto-styled electric fat bike with a 250 W Shengyi rear hub motor and a large 52 V battery for up to 125 km of claimed range. A two-person saddle and 50 kg rear rack make it a capable all-rounder for city and beach riding.',
    features: ['250 W geared rear hub motor, up to 60 Nm of torque', '52 V battery, up to 125 km claimed range', 'Two-person saddle and 50 kg rated rear rack', 'Throttle capped at 6 km/h, assist to 25 km/h'],
    motor: '250 W Shengyi geared rear hub motor', motorType: 'Hub', torqueNm: 60, batteryWh: 1040, batterySpec: '52 V lithium battery', rangeKm: 125,
    frameType: 'Crossbar', frameMaterial: 'Alloy', brakes: 'Hydraulic disc brakes', gears: 'See spec sheet', images: 2,
    tags: ['electric fat bike', 'fat tyre electric bicycle', 'dirodi electric bike', 'fat tyre ebike', 'long range ebike'],
  },
  {
    slug: 'cube-compact-sport-hybrid-500',
    name: 'Cube Compact Sport Hybrid 500 Electric Bike',
    brand: 'Cube', focusKeyword: 'cube compact sport hybrid 500 electric bike',
    category: 'commuter', categoryLabel: 'Electric Commuter Bikes',
    price: 2500,
    subtitle: 'Compact Bosch-powered Cube e-bike with a 500 Wh battery for city riding',
    shortDescription: 'A compact Cube electric bike with a Bosch drive and a 500 Wh battery, built for city commuting.',
    description: 'The Cube Compact Sport Hybrid 500 is a compact electric bike for city commuting and everyday errands. It pairs a Bosch drive with a 500 Wh battery in a smaller, easy-to-handle package that is simple to store.',
    features: ['Bosch mid-drive motor', '500 Wh battery', 'Compact frame that is easy to handle and store', 'Pedal assist to 25 km/h'],
    motor: 'Bosch mid-drive motor, 250 W', motorType: 'Mid-Drive', batteryWh: 500, batterySpec: 'Bosch 500 Wh battery',
    frameType: 'Universal', frameMaterial: 'Aluminium', brakes: 'See spec sheet', gears: 'See spec sheet', images: 1,
    tags: ['compact electric bike', 'electric commuter bikes', 'cube hybrid bike', 'city ebike', 'bosch ebike'],
  },
];

export const PARTNER_PRODUCTS: Product[] = SPECS.map(build);
