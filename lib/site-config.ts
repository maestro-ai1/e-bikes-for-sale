// Lightweight site constants. Safe to import from client components: it must never import the product or blog data.

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
