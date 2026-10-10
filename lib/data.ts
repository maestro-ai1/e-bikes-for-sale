import { Product, BlogPost, FAQItem, AustralianStateRule, BrandInfo, RevolutionarySlide } from './types';
import { SEGWAY_POSTS } from '@/lib/segway-content';
import { GUIDE_POSTS } from '@/lib/blog-guides';
import { PARTNER_PRODUCTS } from '@/lib/partner-products';
import { FEED_PRODUCTS } from '@/lib/feed-products';
import { PRODUCT_IMAGES } from '@/lib/product-images';
import { ensureFaqs, tagsForProduct } from '@/lib/product-seo';

export const BUSINESS_INFO = {
  name: 'e bikes for sale',
  legalName: 'e bikes for sale Australia Pty Ltd',
  domain: 'ebikesforsale.com.au',
  abn: '85 145 434 286', // Strictly placed at the footer
  phone: '+61420128746',
  whatsapp: '+61420128746',
  email: 'sales@ebikesforsale.com.au',
  displayEmail: '[EMAIL ADDRESS]',
  address: 'Level 4, 100 Creek Street, Brisbane QLD 4000 (Dispatch Hubs: Sydney NSW, Melbourne VIC, Perth WA)',
  displayAddress: '[BUSINESS ADDRESS]',
  minOrder: 350,
  freeDeliveryThreshold: 1500,
  cryptoDiscountPercentage: 10,
  operatingHours: 'Mon - Fri: 8:00am - 6:00pm AEST | Sat: 9:00am - 4:00pm AEST',
  deliveryTimeframe: '2-5 Business Days Metro (Australia-Wide Fast Dispatch)',
  verifiedTimeframePlaceholder: '[INSERT VERIFIED DELIVERY TIMEFRAME]',
  warranty: '2-Year Comprehensive Australian Warranty & 1-Year Battery Guarantee',
};


export const PRODUCTS: Product[] = [];

export const CATEGORIES_CONFIG = [
  {
    id: 'emtb',
    title: 'Electric Mountain Bike',
    slug: 'electric-mountain-bike',
    h1: 'Electric Mountain Bikes for Sale Australia (eMTB)',
    seoTitle: 'Electric Mountain Bikes (eMTB) Australia | Hardtail & Dual Suspension',
    metaDescription: 'Shop top electric mountain bikes for sale in Australia. Browse hardtail, dual suspension, enduro, and kids 24-inch eMTBs with high torque mid-drive motors.',
    shortDesc: 'Enduro, dual suspension, hardtail & youth 24" mountain e-bikes for rugged trails.',
    subcategories: [
      'Electric Hardtail Mountain Bikes',
      'Dual Suspension eMTB\'s',
      'Kids and Youths 24\' eMTB\'s',
      'Enduro Dual Suspension eMTB\'s',
      'Trial Suspension eMTB\'s'
    ],
    image: '/images/catalog/electric-mountain-bike.webp',
    itemCount: 18,
    tags: ['electric mountain bike', 'emtb australia', 'hardtail emtb', 'dual suspension emtb', 'kids emtb']
  },
  {
    id: 'folding',
    title: 'Folding E-Bike',
    slug: 'folding-e-bike',
    h1: 'Folding E-Bikes for Sale Australia',
    seoTitle: 'Folding E Bikes for Sale | Compact & Portable Electric Bicycles Australia',
    metaDescription: 'Buy folding e bikes for sale in Australia. Ultra-light, space-saving designs for train commuting, caravans, motorhomes & apartment storage.',
    shortDesc: 'Compact 10-second folding electric bikes for train commutes, caravans & apartments.',
    subcategories: ['Compact 20" Folders', 'Caravan & Grey Nomad Edition', 'Lightweight Alloy Folders'],
    image: '/images/catalog/folding-e-bike.webp',
    itemCount: 8,
    tags: ['folding e bike', 'portable ebike', 'fold away bicycle', 'caravan ebike']
  },
  {
    id: 'cruiser',
    title: 'Electric Cruiser Bikes',
    slug: 'electric-cruiser-bikes',
    h1: 'Electric Cruiser Bikes for Sale Australia',
    seoTitle: 'Electric Cruiser Bikes Australia | Vintage & Step-Through Beach Cruisers',
    metaDescription: 'Explore electric cruiser bikes for sale in Australia. Wide sprung saddles, relaxed upright handlebars, and smooth pedal assist for beachside cruising.',
    shortDesc: 'Relaxed upright geometry, plush comfort saddles, and beachside cruising style.',
    subcategories: ['Vintage Step-Through Cruisers', 'Beach Cruiser Electric', 'Comfort City Cruisers'],
    image: '/images/catalog/electric-cruiser-bikes.webp',
    itemCount: 10,
    tags: ['electric cruiser bikes', 'vintage ebike', 'beach cruiser electric', 'step through cruiser']
  },
  {
    id: 'fat-tyre',
    title: 'Fat Tyre Electric Bicycle',
    slug: 'fat-tyre-electric-bicycle',
    h1: 'Fat Tyre Electric Bicycles for Sale Australia',
    seoTitle: 'Fat Tyre Electric Bicycle Australia | All-Terrain Beach & Bush Cruisers',
    metaDescription: 'Explore 4.0-inch fat tyre electric bicycles for sale in Australia. Float effortlessly across beach sand, gravel paths, mud, and rugged bush tracks.',
    shortDesc: 'Conquer sand dunes, bush tracks, and rough gravel with 4.0" puncture-resistant tyres.',
    subcategories: ['All-Terrain 4.0 Fat Cruisers', 'Dual Suspension Fat Bikes', 'Beach & Bush Explorers'],
    image: '/images/catalog/fat-tyre-electric-bicycle.webp',
    itemCount: 9,
    tags: ['fat tyre electric bicycle', 'all terrain ebike', 'beach ebike', 'sand ebike']
  },
  {
    id: 'cargo',
    title: 'Electric Cargo Bikes',
    slug: 'electric-cargo-bikes',
    h1: 'Electric Cargo Bikes for Sale Australia',
    seoTitle: 'Electric Cargo Bikes Australia | Family Longtail & Commercial Fleets',
    metaDescription: 'Replace the car with heavy-duty electric cargo bikes for sale in Australia. Carry up to 210kg with dual child seats, groceries, and commercial payloads.',
    shortDesc: 'Heavy-payload longtail family carriers for school runs, groceries, and fleet delivery.',
    subcategories: ['Longtail Family Carriers', 'Front Loader Box Bikes', 'Commercial Delivery Fleets'],
    image: '/images/catalog/electric-cargo-bikes.webp',
    itemCount: 7,
    tags: ['electric cargo bikes', 'family ebike', 'longtail cargo ebike', 'delivery ebike']
  },
  {
    id: 'road',
    title: 'Electric Road Bikes',
    slug: 'electric-road-bikes',
    h1: 'Electric Road Bikes for Sale Australia',
    seoTitle: 'Electric Road Bikes Australia | Lightweight Carbon & Endurance E-Road',
    metaDescription: 'Shop performance electric road bikes for sale in Australia. Lightweight drop-bar frames with natural feeling pedal assist for fast endurance road riding.',
    shortDesc: 'Aerodynamic, lightweight drop-bar electric road bicycles for fast endurance riding.',
    subcategories: ['Endurance Electric Road', 'Aero Carbon E-Road', 'Gravel & All-Road eBikes'],
    image: '/images/catalog/electric-road-bikes.jpg',
    itemCount: 6,
    tags: ['electric road bikes', 'e road bike', 'carbon road ebike', 'drop bar electric bike']
  },
  {
    id: 'commuter',
    title: 'Electric Commuter Bikes',
    slug: 'electric-commuter-bikes',
    h1: 'Electric Commuter Bikes for Sale Australia',
    seoTitle: 'Electric Commuter Bikes Australia | City Transit & Step-Through E-Bikes',
    metaDescription: 'Browse street-legal 250W electric commuter bikes for sale in Australia. Integrated lights, mudguards, rear pannier racks, and puncture-resistant tyres.',
    shortDesc: 'Effortless city transit, step-through frames, mudguards & integrated safety lights.',
    subcategories: ['Step-Through Urban Commuter', 'Crossbar Sport Commuter', 'Belt-Drive Low-Maintenance'],
    image: '/images/catalog/electric-commuter-bikes.webp',
    itemCount: 14,
    tags: ['electric commuter bikes', 'city electric bike', 'commuter ebike', 'step through ebike']
  },
  {
    id: 'accessories',
    title: 'Accessories',
    slug: 'accessories',
    h1: 'Bicycle & E-Bike Accessories for Sale Australia',
    seoTitle: 'Bike Accessories Australia | Helmets, Locks, Lights, Bags & Tools',
    metaDescription: 'Equip your ride with certified helmets, high-security diamond U-locks, rechargeable lights, pannier bags, and workshop tools. Fast Australian dispatch.',
    shortDesc: 'Diamond-rated security locks, waterproof luggage, smart lights, and cycling tools.',
    subcategories: [
      'Helmets & Protection',
      'Bike Locks & Security',
      'Bicycle Lights & Visibility',
      'Bags, Baskets & Panniers',
      'Phone Mounts & Tech',
      'Pumps & Workshop Tools'
    ],
    image: '/images/catalog/e-bike-accessories.webp',
    itemCount: 28,
    tags: ['bike accessories', 'kryptonite lock', 'pannier bags', 'cycling gear', 'helmets']
  },
  {
    id: 'helmets',
    title: 'Helmets & Safety',
    slug: 'helmets',
    h1: 'Certified Bicycle Helmets AS/NZS 2063',
    seoTitle: 'Bike Helmets for Sale Australia | AS/NZS 2063 Safety Certified',
    metaDescription: 'Shop AS/NZS 2063:2008 certified bike helmets for adults, youth, and children. Mandatory legal compliance with smart LED turn signal options.',
    shortDesc: 'Legally certified AS/NZS 2063 helmets for adults, youth, and children.',
    subcategories: ['Kids & Youth Certified Helmets', 'Adult Commuter Smart LED', 'Full Face Downhill MTB'],
    image: '/images/catalog/e-bike-helmets.webp',
    itemCount: 16,
    tags: ['helmets', 'as nzs 2063', 'safe cycling gear', 'youth helmet']
  },
  {
    id: 'scooters',
    title: 'Scooters',
    slug: 'scooters',
    h1: 'Electric Scooters & Scooters for Sale Australia',
    seoTitle: 'Electric Scooters & Scooters Australia | Kids, Adults & Accessories',
    metaDescription: 'Shop electric scooters, kids scooters, adult commuter scooters, and certified scooter accessories in Australia. Compliant with state micro-mobility road rules.',
    shortDesc: 'Electric scooters, kids lean-to-steer scooters, adult commuter rides & scooter locks.',
    subcategories: [
      'Electric Scooters',
      'Kids Scooters',
      'Adults Scooters',
      'Scooter Accessories'
    ],
    image: '/images/catalog/electric-scooters.webp',
    itemCount: 12,
    tags: ['electric scooters', 'kids scooters', 'adults scooters', 'scooter accessories']
  },
  {
    id: 'parts',
    title: 'Parts & Tyres',
    slug: 'parts',
    h1: 'E-Bike Spare Parts, Tyres & Components',
    seoTitle: 'E-Bike Parts & Cycle Tyres Australia | Schwalbe Tyres & Brake Pads',
    metaDescription: 'Genuine replacement tyres for cycles, disc brakes, chains, and components for electric bicycles. Fast Australian dispatch.',
    shortDesc: 'Puncture-resistant Schwalbe tyres, hydraulic brake pads, chains & accessories.',
    subcategories: ['Tyres & Tubes', 'Brakes & Rotors', 'Chains & E-Bike Drivetrains', 'Pedals, Grips & Saddles', 'Workshop & Tools'],
    image: '/images/catalog/e-bike-parts.webp',
    itemCount: 22,
    tags: ['tyres for cycles', 'parts', 'schwalbe tyres', 'e bike parts']
  }
];

export const EBIKES_PAGE_CATEGORIES = [
  {
    id: 'emtb',
    name: 'Electric Mountain Bike',
    slug: 'electric-mountain-bike',
    h1: 'Electric Mountain Bikes for Sale Australia (eMTB)',
    shortDesc: 'High-torque mid-drive eMTBs engineered for demanding Australian singletracks.',
    subcategories: [
      'Electric Hardtail Mountain Bikes',
      'Dual Suspension eMTB\'s',
      'Kids and Youths 24\' eMTB\'s',
      'Enduro Dual Suspension eMTB\'s',
      'Trial Suspension eMTB\'s'
    ],
    image: '/images/catalog/electric-mountain-bike.webp'
  },
  {
    id: 'folding',
    name: 'Folding E-Bike',
    slug: 'folding-e-bike',
    h1: 'Folding E-Bikes for Sale Australia',
    shortDesc: 'Ultra-compact folding designs for train commuting, caravans & apartments.',
    subcategories: ['Compact 20" Folders', 'Caravan & Grey Nomad Edition', 'Lightweight Alloy Folders'],
    image: '/images/catalog/folding-e-bike.webp'
  },
  {
    id: 'cruiser',
    name: 'Electric Cruiser Bikes',
    slug: 'electric-cruiser-bikes',
    h1: 'Electric Cruiser Bikes for Sale Australia',
    shortDesc: 'Relaxed upright geometry, plush comfort saddles, and beachside cruising.',
    subcategories: ['Vintage Step-Through Cruisers', 'Beach Cruiser Electric', 'Comfort City Cruisers'],
    image: '/images/catalog/electric-cruiser-bikes.webp'
  },
  {
    id: 'fat-tyre',
    name: 'Fat Tyre Electric Bicycle',
    slug: 'fat-tyre-electric-bicycle',
    h1: 'Fat Tyre Electric Bicycles for Sale Australia',
    shortDesc: 'Float over soft Australian beach sand, mud, snow, and rugged gravel.',
    subcategories: ['All-Terrain 4.0 Fat Cruisers', 'Dual Suspension Fat Bikes', 'Beach & Bush Explorers'],
    image: '/images/catalog/fat-tyre-electric-bicycle.webp'
  },
  {
    id: 'cargo',
    name: 'Electric Cargo Bikes',
    slug: 'electric-cargo-bikes',
    h1: 'Electric Cargo Bikes for Sale Australia',
    shortDesc: 'Heavy-payload carriers built to carry two children or heavy deliveries.',
    subcategories: ['Longtail Family Carriers', 'Front Loader Box Bikes', 'Commercial Delivery Fleets'],
    image: '/images/catalog/electric-cargo-bikes.webp'
  },
  {
    id: 'road',
    name: 'Electric Road Bikes',
    slug: 'electric-road-bikes',
    h1: 'Electric Road Bikes for Sale Australia',
    shortDesc: 'Lightweight drop-bar frames with natural feeling pedal assist for endurance road riding.',
    subcategories: ['Endurance Electric Road', 'Aero Carbon E-Road', 'Gravel & All-Road eBikes'],
    image: '/images/catalog/electric-road-bikes.jpg'
  },
  {
    id: 'commuter',
    name: 'Electric Commuter Bikes',
    slug: 'electric-commuter-bikes',
    h1: 'Electric Commuter Bikes for Sale Australia',
    shortDesc: 'Reliable, efficient daily transportation with mudguards, racks & integrated lights.',
    subcategories: ['Step-Through Urban Commuter', 'Crossbar Sport Commuter', 'Belt-Drive Low-Maintenance'],
    image: '/images/catalog/electric-commuter-bikes.webp'
  }
];

export const SCOOTER_PAGE_CONFIG = {
  id: 'scooters',
  title: 'Scooters',
  h1: 'Electric Scooters & Scooters for Sale Australia',
  seoTitle: 'Electric Scooters & Scooters Australia | Kids, Adults & Accessories',
  metaDescription: 'Shop electric scooters, kids scooters, adult commuter scooters, and certified scooter accessories in Australia. Compliant with state micro-mobility road rules.',
  subcategories: [
    'Electric Scooters',
    'Kids Scooters',
    'Adults Scooters',
    'Scooter Accessories'
  ]
};

export const ACCESSORIES_PAGE_CONFIG = {
  id: 'accessories',
  title: 'Accessories',
  h1: 'Bicycle & E-Bike Accessories for Sale Australia',
  seoTitle: 'Bike Accessories Australia | Helmets, Locks, Lights, Bags & Tools',
  metaDescription: 'Equip your ride with certified helmets, high-security diamond U-locks, rechargeable lights, pannier bags, and workshop tools. Fast Australian dispatch.',
  subcategories: [
    'Helmets & Protection',
    'Bike Locks & Security',
    'Bicycle Lights & Visibility',
    'Bags, Baskets & Panniers',
    'Phone Mounts & Tech',
    'Pumps & Workshop Tools'
  ]
};

export const PARTS_PAGE_CONFIG = {
  id: 'parts',
  title: 'Parts & Tyres',
  h1: 'Bike Parts & E-Bike Components Australia | e bikes for sale',
  seoTitle: 'Bike Parts & E-Bike Components Australia | Tyres, Brakes, Chains | 99 Bikes Style',
  metaDescription: 'Shop certified puncture-resistant e-bike tyres, hydraulic disc pads, rotors, reinforced chains, pedals, grips, and workshop tools with 10% Crypto discount.',
  subcategories: [
    'Tyres & Tubes',
    'Brakes & Rotors',
    'Chains & E-Bike Drivetrains',
    'Pedals, Grips & Saddles',
    'Workshop & Tools'
  ],
  categoryCards: [
    {
      id: 'parts-tyres',
      title: 'Tyres & Tubes',
      subtitle: 'Puncture-Resistant & ECE-R75 E-Bike Rated',
      desc: 'Schwalbe Marathon Plus, anti-flat liners & thorn-resistant Presta/Schrader tubes.',
      image: '/images/catalog/e-bike-parts.webp',
      itemCount: 14
    },
    {
      id: 'parts-brakes',
      title: 'Brakes & Rotors',
      subtitle: 'Hydraulic Disc Pads & Heat Dissipating Discs',
      desc: 'Shimano, Tektro, and Zoom resin/metallic pads, 180mm & 203mm rotors & mineral bleed kits.',
      image: '/images/catalog/e-bike-parts.webp',
      itemCount: 12
    },
    {
      id: 'parts-chains',
      title: 'Chains & Drivetrains',
      subtitle: 'High Torque Reinforced E-Bike Chains',
      desc: 'KMC e-Series 9/10/11-speed reinforced chains, MissingLink connectors & wide-range cassettes.',
      image: '/images/catalog/e-bike-parts.webp',
      itemCount: 10
    },
    {
      id: 'parts-pedals-grips',
      title: 'Pedals, Grips & Saddles',
      subtitle: 'Ergonomic Cockpit & Pedalling Efficiency',
      desc: 'Ergon GP1 winged grips, high-grip flat alloy pedals & anatomical relief gel saddles.',
      image: '/images/catalog/e-bike-parts.webp',
      itemCount: 16
    },
    {
      id: 'parts-workshop',
      title: 'Workshop & Maintenance',
      subtitle: 'Chain Wear Gauges, Multi-Tools & Lubes',
      desc: 'Park Tool torque gauges, hydraulic pad spreaders, e-bike synthetic lube & cleaners.',
      image: '/images/catalog/e-bike-parts.webp',
      itemCount: 18
    }
  ]
};

// Cube, Merida, Pedal and Dirodi models (own file)
PRODUCTS.push(...PARTNER_PRODUCTS, ...FEED_PRODUCTS);

// Pedal Breeze "Electric Cruiser Bike" listings are cruisers by name and by the keyword map (cruiser e bike),
// although the supplier files them under hybrid comfort: list them with the cruiser category.
PRODUCTS.forEach((p) => {
  if (p.brand === 'Pedal' && /breeze.*electric cruiser/i.test(p.name)) {
    p.category = 'cruiser';
    p.categoryLabel = 'Electric Cruiser Bikes';
  }
});

// Keyword-map rules: new products take their 10 tags from the mapped category keywords, and every
// product page carries exactly 5 FAQs that each include one mapped keyword.
[...PARTNER_PRODUCTS, ...FEED_PRODUCTS].forEach((p) => { p.tags = tagsForProduct(p); });

// Photos matched from the supplier folder (see seo-strategy/preview-site/apply-pics.js)
PRODUCTS.forEach((p) => {
  const imgs = PRODUCT_IMAGES[p.slug];
  if (imgs && imgs.length) {
    p.image = imgs[0];
    p.hoverImage = imgs[1] || imgs[0];
    p.gallery = imgs;
  }
});
PRODUCTS.forEach((p) => {
  p.faqs = ensureFaqs(p);
});

/** One-click cart add-ons: real catalog products (price, photo and name come from the product itself). */
const ADDON_SLUGS = [
  'magnum-x2p-u-lock-cable',
  'cinettica-velocita-road-helmet-silver',
  'azur-leo-50-lumen-rear-light',
  'topeak-basket-front-with-fixer-3e-black',
];
export const COMMON_ADDONS = ADDON_SLUGS.map((slug) => PRODUCTS.find((p) => p.slug === slug))
  .filter((p): p is Product => !!p)
  .map((p) => ({ id: p.id, slug: p.slug, name: p.name, price: p.price, description: p.shortDescription || p.subtitle || '', image: p.image }));

export const BLOG_POSTS: BlogPost[] = [...GUIDE_POSTS];

// Structured posts (rich layout) are kept in their own file
BLOG_POSTS.push(...SEGWAY_POSTS);

export const AUSTRALIAN_STATE_RULES: AustralianStateRule[] = [
  {
    state: 'NSW',
    name: 'New South Wales (Transport for NSW)',
    maxContinuousPower: '250W (Pedelec EN15194) or 200W (Throttle without pedals)',
    maxAssistedSpeed: '25 km/h motor cutoff',
    throttleRules: 'Throttle allowed up to 6 km/h for walk-assist; above that pedals must turn.',
    helmetRequired: 'Mandatory AS/NZS 2063:2008 certified helmet at all times',
    minAge: 'No state minimum age for standard pedal-assist; 16+ recommended for heavy e-bikes',
    standardsCompliance: 'EN15194 European/Australian Harmonised Pedelec Standard',
    sourceAuthority: 'Transport for NSW Road Rules 2014, Rule 244-1',
  },
  {
    state: 'VIC',
    name: 'Victoria (VicRoads)',
    maxContinuousPower: '250W continuous rated power',
    maxAssistedSpeed: '25 km/h motor assistance cutoff',
    throttleRules: 'Pedelec mode requires pedalling; motor assists only when rider pedals.',
    helmetRequired: 'Compulsory Australian standard compliant helmet',
    minAge: 'None specified for pedelecs; supervision recommended under 12',
    standardsCompliance: 'EN15194 compliant with manufacturer certification plate',
    sourceAuthority: 'VicRoads Electric Bicycles Guidelines & Road Safety Road Rules 2017',
  },
  {
    state: 'QLD',
    name: 'Queensland (Department of Transport and Main Roads)',
    maxContinuousPower: '250W maximum continuous rated power (EPAC)',
    maxAssistedSpeed: '25 km/h maximum assisted speed',
    throttleRules: 'Walk-assist throttle permissible up to 6 km/h only',
    helmetRequired: 'Mandatory approved bicycle helmet fastened securely',
    minAge: 'Allowed on road and shared paths for riders of all ages',
    standardsCompliance: 'Compliant with AS/NZS 1927 and European Standard EN 15194',
    sourceAuthority: 'Queensland Government Road Transport Act (Bicycle Rules)',
  },
  {
    state: 'WA',
    name: 'Western Australia (Department of Transport WA)',
    maxContinuousPower: '250W (Power-Assisted Pedal Cycle / PAPC)',
    maxAssistedSpeed: '25 km/h assist limit',
    throttleRules: 'Pedal assistance required; motor power must cut off when braking or stopping pedalling',
    helmetRequired: 'Mandatory AS/NZS 2063 compliant bicycle helmet',
    minAge: 'None for pedelecs',
    standardsCompliance: 'EN 15194 certification',
    sourceAuthority: 'Road Traffic Code 2000 (WA)',
  },
  {
    state: 'SA',
    name: 'South Australia (My Licence / DPTI SA)',
    maxContinuousPower: '250W (Pedelec) or 200W (Motor-assisted bicycle)',
    maxAssistedSpeed: '25 km/h cut-off speed',
    throttleRules: 'Motor must not propel bike unless rider is actively pedalling (except walk-assist)',
    helmetRequired: 'Mandatory certified safety helmet',
    minAge: 'No license or registration required for EN15194 bikes',
    standardsCompliance: 'EN15194 Pedelec standard',
    sourceAuthority: 'South Australian Road Traffic Regulations',
  },
  {
    state: 'TAS',
    name: 'Tasmania (Transport Tasmania)',
    maxContinuousPower: '250W continuous power',
    maxAssistedSpeed: '25 km/h motor cutoff',
    throttleRules: 'Pedelec requirements apply',
    helmetRequired: 'Mandatory approved helmet',
    minAge: 'Standard cycling rules apply',
    standardsCompliance: 'EN15194 certified',
    sourceAuthority: 'Traffic (Road Rules) Regulations 2019 (TAS)',
  },
  {
    state: 'ACT',
    name: 'Australian Capital Territory (Access Canberra)',
    maxContinuousPower: '250W power-assisted bicycle',
    maxAssistedSpeed: '25 km/h assisted speed',
    throttleRules: 'Compliant with national Australian Road Rules',
    helmetRequired: 'Mandatory approved helmet',
    minAge: 'Standard cycling rules',
    standardsCompliance: 'EN 15194 certified',
    sourceAuthority: 'Road Transport (Road Rules) Regulation 2017 (ACT)',
  },
  {
    state: 'NT',
    name: 'Northern Territory (NT Government Transport)',
    maxContinuousPower: '250W continuous rated power',
    maxAssistedSpeed: '25 km/h motor cutoff',
    throttleRules: 'Pedal assist activated',
    helmetRequired: 'Mandatory on roads and public places (exemptions apply on designated off-road paths for adults only)',
    minAge: 'Standard cycling rules apply',
    standardsCompliance: 'EN 15194 compliant',
    sourceAuthority: 'Northern Territory Traffic Regulations',
  }
];

export const HOMEPAGE_FAQS: FAQItem[] = [
  {
    question: 'How do I buy electric bicycles online from e bikes for sale?',
    answer: 'Buying online is simple and fast. Browse our curated selection of EN15194 street-legal e-bikes, select your preferred frame size and optional accessories bundle (such as Kryptonite locks or cargo baskets), and proceed through our secure Australian checkout. We accept PayID, Bank Transfer (Osko/EFT), and direct Crypto payments with an automatic 10% discount on Bitcoin & USDT. Your order will be safely dispatched with tracking in 2-5 business days.'
  },
  {
    question: 'What e bike brand can I order online?',
    answer: 'We stock premium Australian and international electric bicycle brands including Cube, Merida, Pedal, DiroDi and Segway-Ninebot. Every e-bike is a pedal-assist model that follows the Australian EN 15194 rules, and each product page lists its specifications.'
  },
  {
    question: 'Is there a minimum order amount?',
    answer: 'Yes, our online order minimum is $350 (AUD). This ensures every shipment meets our professional packaging, freight insurance, and courier safety handling standards.'
  },
  {
    question: 'Which areas do you deliver to?',
    answer: 'We deliver Australia-wide across New South Wales, Victoria, Queensland, Western Australia, South Australia, Tasmania, ACT, and the Northern Territory. Orders over $1,500 receive Free Standard Delivery to all Australian metropolitan zones.'
  },
  {
    question: 'How is the e bike packaged for delivery?',
    answer: 'Every electric bicycle undergoes a pre-dispatch technician inspection and is boxed securely in a heavy-duty, double-walled reinforced carton with custom moulded high-density foam. Bikes arrive 85% to 90% pre-assembled with a comprehensive Australian assembly manual and toolkit. You simply attach the front wheel, handlebars, pedals, and saddle, which takes about 15-20 minutes.'
  },
  {
    question: 'Can I order e bikes online and pay with Crypto for a discount?',
    answer: 'Yes! We proudly offer a 10% discount on all orders paid via supported cryptocurrency checkout (Bitcoin and USDT). The discount is calculated automatically at checkout. Terms and conditions apply.'
  },
  {
    question: 'How should I store and maintain my e-bike battery?',
    answer: 'For optimal battery longevity, store your lithium-ion battery in a dry, cool indoor location between 10°C and 25°C away from direct Australian summer sun. If not riding for several weeks, maintain the charge level between 50% and 70%. Never leave batteries charging unattended overnight or on flammable surfaces.'
  },
  {
    question: 'How can I contact customer support?',
    answer: 'Our Australian-based customer support team is available Monday to Friday from 8:00am to 6:00pm AEST. You can direct call our team at +61420128746, message our dedicated WhatsApp line at +61420128746, or email us at sales@ebikesforsale.com.au. We are always ready to assist with sizing, technical specifications, and shipping tracking.'
  }
];

export const WHOLESALE_BENEFITS = [
  {
    title: 'Tiered Bulk Volume Pricing',
    description: 'Generous wholesale margin discounts for fleets of 3 to 100+ units, ideal for commercial couriers, hotel rentals, and corporate campus fleets.',
    icon: 'Percent'
  },
  {
    title: 'Direct Australian Parts Inventory',
    description: 'Guaranteed local stock of replacement batteries, motors, controllers, brake pads, and tyres with expedited 24-48hr courier dispatch.',
    icon: 'PackageCheck'
  },
  {
    title: 'Custom Branding & Fleet Fleet Config',
    description: 'Commercial customisation options including GPS fleet telematics, tamper-resistant speed governors, heavy duty rear cargo racks, and logo decaling.',
    icon: 'Wrench'
  },
  {
    title: 'Tax Invoices with ABN & Finance Support',
    description: 'Fully compliant Australian GST tax invoicing. Instant asset write-off documentation and B2B commercial lease financing assistance.',
    icon: 'FileText'
  }
];


