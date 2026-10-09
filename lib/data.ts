import { Product, BlogPost, FAQItem, AustralianStateRule, BrandInfo, RevolutionarySlide } from './types';
import { SEGWAY_POSTS } from '@/lib/segway-content';
import { GUIDE_POSTS } from '@/lib/blog-guides';

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

export const COMMON_ADDONS = [
  {
    id: 'kryptonite-lock',
    name: 'Kryptonite New York Diamond Standard U-Lock',
    price: 89,
    description: '16mm hardened steel shackle with anti-theft key registration',
    image: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'heavy-cargo-basket',
    name: 'Heavy Duty Front Alloy Basket & Quick-Mount',
    price: 75,
    description: 'Aircraft aluminium rack rated to 25kg payload with weather seal',
    image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'smart-led-helmet',
    name: 'Aero Commuter Smart Helmet with Rear Turn Signal',
    price: 65,
    description: 'AS/NZS 2063:2008 certified with integrated rechargeable LED blinkers',
    image: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'dual-battery-extender',
    name: 'Samsung 48V 14Ah Range Extender Battery Pack',
    price: 499,
    description: 'Increases riding range by up to +70km. Dual connection splitter harness included.',
    image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=600&q=80',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'eb-apex-commuter',
    name: 'Apex Commuter Urban Pro 250W',
    slug: 'apex-commuter-urban-pro-250w',
    badge: 'Best Seller 2026',
    subtitle: 'Daily city commuter with internal battery & Shimano 8-speed',
    category: 'commuter',
    categoryLabel: 'Electric Commuter Bikes',
    subcategory: 'Electric Commuter Bikes',
    subcategoryId: 'commuter',
    brand: 'Apex Mobility',
    price: 1899,
    compareAtPrice: 2299,
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=800&q=80',
    ],
    inStock: true,
    stockCount: 18,
    motor: '250W Bafang Silent Hub Motor (25 km/h Cutoff)',
    motorType: 'Hub',
    torqueNm: 45,
    batteryWh: 540,
    batterySpec: '36V 15Ah Samsung 21700 Grade A Li-ion (Integrated)',
    rangeKm: 85,
    topSpeedKmH: 25,
    frameType: 'Step-Through',
    weightKg: 21.5,
    payloadKg: 130,
    brakes: 'Tektro Hydraulic Disc Brakes (180mm Rotors)',
    gears: 'Shimano Altus 8-Speed RapidFire',
    auCompliance: 'EN15194 Australian Standard Certified (Road Legal All States)',
    shortDescription: 'The gold standard for Australian city commuters. Ultra-smooth torque sensing, integrated lights, and puncture-resistant tyres.',
    description: 'Designed specifically for Australian commuting conditions, the Apex Urban Pro pairs a 250W silent hub motor with a sleek hidden Samsung 540Wh battery. Fully road legal across all Australian states and territories without registration or driver licence required.',
    features: [
      'EN15194 Compliant 250W pedal-assist (legal in NSW, VIC, QLD, WA, SA, TAS)',
      'Integrated front and rear StVZO safety lights wired to main battery',
      'Hydroformed 6061 aluminium lightweight frame with low step-through',
      'Schwalbe Big Ben puncture-resistant puncture-proof tyres',
      'Rear luggage rack rated to 25kg capacity for panniers and child seats'
    ],
    tags: [
      'pedal assist bike', 'e bike with pedal assist', 'electric bike for commuters', 'electric commuter bikes', 'commuter e-bike',
      'e bike women', '250w e bike', 'womens electric bike', 'electric pedal assist bike', 'pedal assist e-bike'
    ],
    sizeVariants: [
      { id: 's-m', label: 'Medium (Rider 155cm - 175cm)', priceDelta: 0 },
      { id: 'l-xl', label: 'Large (Rider 175cm - 195cm)', priceDelta: 0 },
      { id: 'ext-battery', label: 'Medium + High Capacity 720Wh Pack', priceDelta: 249 }
    ],
    recommendedAddOns: COMMON_ADDONS,
    faqs: [
      {
        question: 'Is the Apex Commuter Urban Pro 250W street legal across all Australian states?',
        answer: 'Yes. The Apex Urban Pro is fully certified under the EN15194 European and Australian Standard for 250W pedal-assist electric bicycles. It requires no vehicle registration, road tax, or driver licence to ride on public roads and paths in NSW, VIC, QLD, WA, SA, TAS, NT, and ACT.'
      },
      {
        question: 'What real-world range can I expect on Australian suburban and city commutes?',
        answer: 'Riders between 70kg and 85kg typically achieve 70 to 85 kilometres per charge on assistance levels 1–2 on flat to rolling terrain. On maximum power mode (level 5) climbing steep suburban hills, real-world range is approximately 55–65 km.'
      },
      {
        question: 'Can I mount a child seat or heavy commuter panniers to the rear rack?',
        answer: 'Yes. The hydroformed alloy rear luggage rack is ISO-certified for up to 25kg payload, fully compatible with MIK luggage accessories, standard pannier bags, and bolt-on child safety seats.'
      },
      {
        question: 'How do I recharge the Samsung 540Wh battery and can it be removed?',
        answer: 'The Samsung 21700 cell pack locks securely into the downtube and can be removed in seconds using the included security keys. You can charge it on or off the bicycle in 4 to 5 hours with the included Australian 240V smart charger.'
      },
      {
        question: 'What local Australian warranty and replacement parts support is included?',
        answer: 'Every Apex Urban Pro comes with a comprehensive 2-Year Australian manufacturer warranty covering the frame, Bafang 250W motor, electronic display, and battery cells. Replacement tyres, brake pads, and batteries are dispatched locally from Australian warehouses.'
      }
    ]
  },
  {
    id: 'eb-outback-fat-tyre',
    name: 'Outback Beast 4.0 Fat Tyre Cruiser',
    slug: 'outback-beast-fat-tyre-cruiser',
    badge: 'All-Terrain King',
    subtitle: 'Sand, beach, gravel & trail e-bike with dual suspension',
    category: 'fat-tyre',
    categoryLabel: 'Fat Tyre Electric Bicycle',
    subcategory: 'Fat Tyre Electric Bicycle',
    subcategoryId: 'fat-tyre',
    brand: 'Outback Electric',
    price: 2499,
    compareAtPrice: 2899,
    rating: 4.95,
    reviewsCount: 98,
    image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 12,
    motor: '250W High-Torque Geared Motor (80Nm peak hill climbing)',
    motorType: 'Hub',
    torqueNm: 80,
    batteryWh: 840,
    batterySpec: '48V 17.5Ah Samsung Long-Range Pack (Removable with Key Lock)',
    rangeKm: 110,
    topSpeedKmH: 25,
    frameType: 'Dual Suspension',
    weightKg: 29.0,
    payloadKg: 160,
    brakes: 'Zoom 4-Piston Hydraulic Disc Brakes',
    gears: 'Shimano Acera 8-Speed Heavy Duty',
    auCompliance: 'EN15194 Certified Pedelec Mode (Switchable Off-Road Profile Available)',
    shortDescription: 'Conquer Australian beaches, bush tracks, and corrugated rural paths with 26x4.0 puncture-resistant Kenda tyres.',
    description: 'Engineered for rugged Australian terrain, the Outback Beast handles beach sand, red dirt, and steep mountain fire trails with poise. Features dual hydraulic shocks, high-density foam cruiser seat, and a massive 840Wh battery.',
    features: [
      'Wide 26 x 4.0 inch all-terrain Kenda Krusader tyres',
      'Dual hydraulic lock-out front suspension + rear air-coil damper',
      'High capacity 840Wh Samsung cells for up to 110km on eco mode',
      'IP67 waterproof wiring and backlit colour LCD cockpit display',
      'Payload rating of 160kg - ideal for surf racks and camping gear'
    ],
    tags: [
      'fat tyre electric bicycle', 'electric fat tire bicycles', 'fat tyre ebike', 'fat tyre electric bike', 'electric fat bike',
      'electric bicycle fat bike', 'fat electric bicycle', 'fat e bike', 'fat wheel electric bike', 'cruiser e bike'
    ],
    sizeVariants: [
      { id: 'standard', label: 'Universal Fit (Rider 165cm - 195cm)', priceDelta: 0 },
      { id: 'dual-battery', label: 'Long Range Dual Battery Kit (1680Wh)', priceDelta: 549 }
    ],
    recommendedAddOns: COMMON_ADDONS,
    faqs: [
      {
        question: 'Can the Outback Beast Fat Tyre Cruiser ride on soft beach sand and off-road dunes?',
        answer: 'Yes. The ultra-wide 4-inch puncture-resistant all-terrain tyres spread rider weight over an enlarged contact patch. When tyre pressure is dropped to 12-15 PSI, the bike floats effortlessly over soft coastal sand, mud, and loose gravel without bogging down.'
      },
      {
        question: 'Is the Outback Beast 4.0 legal to ride on Australian roads and council bike paths?',
        answer: 'Absolutely. The 250W continuous rated motor adheres strictly to EN15194 Australian standards with intelligent speed cut-off at 25 km/h, making it 100% legal on all public roads, shared paths, and national parks across Australia.'
      },
      {
        question: 'How much hill-climbing power does the 80Nm high-torque motor deliver?',
        answer: 'The 80Nm geared hub motor delivers outstanding torque multiplication, allowing riders up to 160kg to conquer steep 25-degree coastal headland inclines and rough fire trails with relaxed pedalling effort.'
      },
      {
        question: 'How do I maintain and protect the cruiser when riding near salt water and coastal spray?',
        answer: 'We recommend rinsing the frame and drivetrain with gentle fresh water (never high-pressure jet washers) after beach excursions. The hydroformed 6061 aluminium frame and sealed bearings are rust-resistant, and periodic chain lubrication keeps it performing smoothly.'
      },
      {
        question: 'Can I install a dual battery system for long-distance Outback touring?',
        answer: 'Yes! The Outback Beast frame features pre-wired mounting ports that accept our plug-and-play secondary 840Wh battery kit, expanding total onboard capacity to 1680Wh for over 200 km of off-grid touring.'
      }
    ]
  },
  {
    id: 'eb-metro-fold-pro',
    name: 'MetroFold Ultra Compact 20" Folding E-Bike',
    slug: 'metrofold-ultra-compact-folding-ebike',
    badge: 'Space Saver',
    subtitle: 'Folds in 10 seconds for trains, car boots, caravans & apartments',
    category: 'folding',
    categoryLabel: 'Folding E-Bike',
    subcategory: 'Folding E-Bike',
    subcategoryId: 'folding',
    brand: 'MetroFold',
    price: 1499,
    compareAtPrice: 1799,
    rating: 4.88,
    reviewsCount: 76,
    image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 22,
    motor: '250W Brushless Geared Front/Rear Hub',
    motorType: 'Hub',
    torqueNm: 40,
    batteryWh: 360,
    batterySpec: '36V 10Ah Panasonic Seatpost Hidden Battery',
    rangeKm: 60,
    topSpeedKmH: 25,
    frameType: 'Folding',
    weightKg: 17.8,
    payloadKg: 115,
    brakes: 'Mechanical Disc Brakes with Motor Cut-off',
    gears: 'Shimano 7-Speed Tourney',
    auCompliance: 'EN15194 Compliant - Allowed on Australian Public Transport',
    shortDescription: 'Weighs only 17.8kg with smart fold mechanism. Fits in a Mazda 3 boot or under an office desk.',
    description: 'Perfect for multi-modal Australian commuters catching the train or grey nomads traveling in caravans. Folds in three quick steps without tools. The battery is invisibly housed inside the seatpost.',
    features: [
      'Folds in 10 seconds to a compact 85cm x 65cm footprint',
      'Lightweight magnesium-alloy frame: only 17.8kg total weight',
      'Approved for carriage on Sydney Trains, Melbourne Metro, and Queensland Rail',
      'Seatpost-integrated lockable battery with USB charging port',
      'Telescopic handlebar stem accommodating riders 140cm to 190cm'
    ],
    tags: [
      'fold up electric bicycle', 'folding e bike', 'foldable electric bike', 'foldable electric bicycle', 'folding electric bike',
      'e bike that folds', 'foldable ebike', 'electric foldable cycle', 'electric folding cycle', 'fold up electric bike'
    ],
    sizeVariants: [
      { id: 'standard', label: 'One Size Fits All (Adjustable)', priceDelta: 0 },
      { id: 'travel-bag', label: 'Includes Heavy Duty Wheeled Travel Bag', priceDelta: 99 }
    ],
    recommendedAddOns: COMMON_ADDONS,
    faqs: [
      {
        question: 'How fast does the MetroFold fold, and is it accepted on Australian trains and buses?',
        answer: 'The MetroFold collapses in under 10 seconds via magnetic latches into a compact 85cm x 65cm footprint. It complies with peak-hour carry-on luggage rules across Sydney Trains, Melbourne Metro, Brisbane Translink, and airline travel luggage allowances.'
      },
      {
        question: 'Is the folding hinge durable and safe for daily suburban commuting?',
        answer: 'Yes. The aircraft-grade 6061 magnesium-aluminium alloy folding joint features a dual-action safety latch tested to 100,000 cycles, fully rated for riders up to 115kg.'
      },
      {
        question: 'How much does the bike weigh and how easy is it to lift into a car boot?',
        answer: 'At just 17.8kg with the battery installed (and only 15.5kg with the quick-release seatpost battery removed), it is effortlessly lifted into sedan car boots, campervans, or carried up apartment staircases.'
      },
      {
        question: 'What range can I expect from the integrated Panasonic seatpost battery?',
        answer: 'The 36V 10Ah (360Wh) Panasonic battery provides 50 to 60 kilometres of real-world urban commuting range on eco assistance, comfortably covering a full week of short metro train-station hops.'
      },
      {
        question: 'Are replacement 20-inch tyres, tubes, and chargers easy to source in Australia?',
        answer: 'Yes. Standard 20" x 1.95" tubes and tyres are stocked at virtually every local Australian bike store, and replacement chargers, displays, and seatpost packs ship rapidly from our Australian distribution warehouse.'
      }
    ]
  },
  {
    id: 'eb-trailpeak-carbon-emtb',
    name: 'TrailPeak Enduro Carbon Mid-Drive eMTB',
    slug: 'trailpeak-enduro-carbon-mid-drive-emtb',
    badge: 'Pro Mountain',
    subtitle: 'Full carbon frame, 85Nm mid-drive motor, 150mm Fox suspension',
    category: 'emtb',
    categoryLabel: 'Electric Mountain Bike',
    subcategory: "Enduro Dual Suspension eMTB's",
    subcategoryId: 'emtb-enduro',
    brand: 'TrailPeak Australia',
    price: 4999,
    compareAtPrice: 5799,
    rating: 4.98,
    reviewsCount: 64,
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 7,
    motor: 'Brose / Bafang M510 Mid-Drive 250W (85Nm Torque)',
    motorType: 'Mid-Drive',
    torqueNm: 85,
    batteryWh: 720,
    batterySpec: '36V 20Ah LG Chem Ultra-Dense Down-Tube Pack',
    rangeKm: 95,
    topSpeedKmH: 25,
    frameType: 'Dual Suspension',
    weightKg: 22.8,
    payloadKg: 135,
    brakes: 'Shimano Deore XT 4-Piston 203mm Hydraulic',
    gears: 'SRAM NX Eagle 12-Speed Wide Range (11-50T)',
    auCompliance: 'EN15194 Certified Pedelec (Competition & Mountain Trail Ready)',
    shortDescription: 'Elite downhill and cross-country eMTB crafted for Maydena, Blue Derby, and Mt Stromlo trails.',
    description: 'The pinnacle of mountain bike engineering. Toray T700 carbon fibre monocoque frame, mid-drive centre of gravity, and 85Nm of responsive hill-climbing torque make climbing fire roads as thrilling as carving singletracks.',
    features: [
      'Toray T700 high-modulus lightweight carbon fibre frame',
      '150mm plush air suspension fork with 3-position damper lockout',
      'SRAM 12-speed drivetrain with clutch derailleur for chain retention',
      'Down-tube integrated 720Wh LG battery with waterproof rock guard',
      'Dropper seatpost with internal handlebar cable routing'
    ],
    tags: [
      'dual suspension ebike', 'mid drive electric bike', 'electric trail bicycle', 'dual suspension electric mountain bike', 'full suspension electric bicycle',
      'dual suspension electric bike', 'electric full sus mountain bike', 'full sus emtb', 'electric bicycle mid drive motor', 'mid drive ebike motor'
    ],
    sizeVariants: [
      { id: 'm', label: 'Medium (168cm - 178cm)', priceDelta: 0 },
      { id: 'l', label: 'Large (178cm - 188cm)', priceDelta: 0 },
      { id: 'xl', label: 'XL (188cm - 200cm)', priceDelta: 0 }
    ],
    recommendedAddOns: COMMON_ADDONS,
    faqs: [
      {
        question: 'What are the key benefits of the Brose/Bafang M510 85Nm mid-drive motor on trails?',
        answer: 'Mid-drive motors power the drivetrain directly through the gears, keeping weight low and centred between the wheels for natural cornering balance and responsive 85Nm climbing torque on steep technical singletracks.'
      },
      {
        question: 'How durable is the Toray T700 carbon fiber dual suspension frame on rock strikes?',
        answer: 'The monocoque carbon frame is engineered with high-impact epoxy resin and features an integrated downtube rock shield. It undergoes rigorous ISO mountain bike downhill fatigue testing and is backed by a 5-year frame warranty.'
      },
      {
        question: 'What suspension components and travel are fitted?',
        answer: 'The TrailPeak Enduro features 150mm of front air travel with 3-position damper lockout and a matching rear air shock with rebound adjustment, allowing riders to tune firmness for climbing fire roads or soaking up rocky drops.'
      },
      {
        question: 'How do the Shimano Deore XT 4-piston 203mm hydraulic brakes perform on alpine descents?',
        answer: 'Four-piston hydraulic callipers clamping oversized 203mm rotors provide immediate, fade-free stopping power with minimal finger effort, even during long, sustained alpine mountain bike descents.'
      },
      {
        question: 'Is the TrailPeak Enduro road legal for riding from home to the trailhead?',
        answer: 'Yes. It complies with EN15194 regulations with 250W continuous output and 25 km/h motor assist cut-off, allowing legal transit on suburban streets, cycle paths, and national park fire trails without permits.'
      }
    ]
  },
  {
    id: 'eb-hauler-cargo-max',
    name: 'Hauler Cargo Max Longtail Family Carrier',
    slug: 'hauler-cargo-max-longtail-family-carrier',
    badge: 'Family & Fleet',
    subtitle: 'Replaces the second family car. Carries 2 kids or 190kg cargo',
    category: 'cargo',
    categoryLabel: 'Electric Cargo Bikes',
    subcategory: 'Electric Cargo Bikes',
    subcategoryId: 'cargo',
    brand: 'Hauler Logistics',
    price: 3299,
    compareAtPrice: 3899,
    rating: 4.96,
    reviewsCount: 89,
    image: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 14,
    motor: '250W High-Torque Mid-Drive (90Nm Cargo Tuned)',
    motorType: 'Mid-Drive',
    torqueNm: 90,
    batteryWh: 960,
    batterySpec: 'Dual Battery Setup: 2x 480Wh Samsung Packs with Auto-Switch',
    rangeKm: 120,
    topSpeedKmH: 25,
    frameType: 'Step-Through',
    weightKg: 33.5,
    payloadKg: 210,
    brakes: 'Magura MT5 4-Piston Cargo-Specific Hydraulic Discs',
    gears: 'Enviolo Stepless Cargo Internal Hub',
    auCompliance: 'EN15194 Certified Pedelec - Approved for Family Transport',
    shortDescription: 'School runs, grocery hauls, and food delivery. Fitted with dual monkey bars and footboards.',
    description: 'Transform daily errands and commercial courier routes. The Hauler Cargo Max accommodates two Thule Yepp child seats or massive delivery panniers, backed by a dual battery system providing 120km of range.',
    features: [
      'Enormous 210kg total payload capacity with low centre of gravity',
      'Dual battery 960Wh setup eliminates range anxiety on hilly school runs',
      'Heavy duty centre dual-leg kickstand with auto-stabiliser locking',
      'Includes safety running boards, wheel skirts, and passenger grab bars',
      'Commercial wholesale grade for UberEats, DoorDash, and parcel delivery'
    ],
    tags: [
      'cargo bike', 'electric cargo bike', 'electric cargo bicycle', 'cargo e bike', 'cargo bike australia',
      'electric cargo bike australia', 'cargo ebike australia', 'electric bike with child seat australia', 'electric delivery bicycle', 'longtail cargo bike'
    ],
    sizeVariants: [
      { id: 'family-pack', label: 'Standard Family (Includes Passenger Rails & Pads)', priceDelta: 0 },
      { id: 'commercial-box', label: 'Commercial Delivery (Heavy Insulated 120L Box)', priceDelta: 220 }
    ],
    recommendedAddOns: COMMON_ADDONS,
    faqs: [
      {
        question: 'Can the Hauler Cargo Max safely carry two children and grocery loads simultaneously?',
        answer: 'Yes. The elongated 80cm rear deck is designed to mount two Thule Yepp Maxi child seats, or passenger handrails with padded footboards for older kids, plus front cargo baskets for groceries.'
      },
      {
        question: 'What is the total payload capacity and how stable is it when loaded?',
        answer: 'The reinforced low-centre-of-gravity frame supports a massive 210kg total payload (rider + cargo). Smaller 20-inch rear wheels lower the cargo height, providing exceptional balance when stopping at traffic lights.'
      },
      {
        question: 'Do the Magura MT5 4-piston hydraulic brakes provide enough stopping power?',
        answer: 'Yes. The bike is equipped with premium Magura MT5 4-piston hydraulic disc callipers and oversized 203mm heat-dissipation rotors designed specifically for heavy cargo deceleration on steep suburban descents.'
      },
      {
        question: 'How does the dual-leg kickstand work when loading children?',
        answer: 'The heavy-duty centre dual-leg kickstand locks wide and level, preventing the bike from tipping while you buckle children in or load heavy delivery boxes.'
      },
      {
        question: 'Does it qualify for commercial tax deductions or delivery fleet usage?',
        answer: 'Yes. Australian couriers, food delivery businesses, and corporate fleets can claim the Hauler Cargo Max under instant asset write-off schemes. Fleet discounts are also available through our Wholesale portal.'
      }
    ]
  },
  {
    id: 'sc-glidecity-pro',
    name: 'GlideCity Pro Australian Commuter E-Scooter',
    slug: 'glidecity-pro-australian-commuter-scooter',
    badge: 'Portable Commute',
    subtitle: 'Street-legal e-scooter with puncture-proof honeycomb tyres',
    category: 'scooters',
    categoryLabel: 'Scooters',
    subcategory: 'Electric Scooters',
    subcategoryId: 'scooters-electric',
    brand: 'GlideCity',
    price: 899,
    compareAtPrice: 1099,
    rating: 4.84,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 30,
    motor: '350W Front Hub Motor with regenerative brake',
    motorType: 'Hub',
    torqueNm: 32,
    batteryWh: 420,
    batterySpec: '36V 11.6Ah LG Lithium Smart BMS Pack',
    rangeKm: 45,
    topSpeedKmH: 25,
    frameType: 'Folding',
    weightKg: 14.2,
    payloadKg: 120,
    brakes: 'Dual Disc + Electronic ABS Regen Brake',
    gears: '3 Electronic Speed Modes (Eco, Standard, Sport)',
    auCompliance: 'Complies with QLD, ACT, WA, TAS, VIC Personal Mobility Device regulations',
    shortDescription: 'Weighs only 14.2kg. Rapid 3-second folding mechanism with front suspension and bright LED deck.',
    description: 'Designed for Australian urban streets and last-mile travel. Equipped with maintenance-free honeycomb tyres that never go flat and dual shock absorbers to smooth out pavement cracks.',
    features: [
      'Compliant 25 km/h top speed adhering to Australian state regulations',
      'Maintenance-free solid honeycomb rubber tyres with zero puncture risk',
      'Dual front suspension coils for smooth footpath navigation',
      'Companion smartphone Bluetooth app with electronic motor immobiliser lock',
      'Bright 3W headlight and braking reactive taillight'
    ],
    tags: [
      'e scooter adults', 'push scooter adults', 'foldable scooters', 'motorized scooter for adults', 'adult escooter',
      'collapsible electric scooter for adults', 'electric scooter foldable adults', 'escooter for adults', 'foldable electric scooter for adults', 'folding electric scooters'
    ],
    sizeVariants: [
      { id: 'adult-pro', label: 'Standard Adult Edition (14.2kg)', priceDelta: 0 },
      { id: 'junior-spark', label: 'Junior / Youth Speed-Limited Edition (10.5kg)', priceDelta: -250 }
    ],
    recommendedAddOns: COMMON_ADDONS,
    faqs: [
      {
        question: 'What are the legal speed limits and rules for e-scooters across Australian states?',
        answer: 'In Queensland, ACT, WA, and Victoria, personal mobility devices are limited to 25 km/h on shared paths and road shoulders (and 12 km/h on footpaths in QLD). The GlideCity Pro includes switchable speed modes to keep you compliant with local bylaws.'
      },
      {
        question: 'Are the honeycomb tyres truly puncture-proof and maintenance-free?',
        answer: 'Yes. The tyres are made from solid high-elasticity rubber with interior honeycomb air pockets. They never require air pumping, cannot be punctured by glass or nails, and still cushion road vibrations effectively.'
      },
      {
        question: 'What is the real-world range on Australian suburban footpaths and bike lanes?',
        answer: 'On standard cruising mode (15-20 km/h), riders under 85kg achieve 35 to 45 kilometres on a single charge. Sport mode (25 km/h) delivers approximately 28 to 32 km depending on terrain and headwinds.'
      },
      {
        question: 'Is the GlideCity Pro waterproof for riding in Australian rain?',
        answer: 'The scooter is IP54 water-resistant, protecting sensitive electronics and the motor from road spray, puddles, and light rain. (As with all electric mobility devices, submersion in standing puddles should be avoided).'
      },
      {
        question: 'Does it have an anti-theft app lock?',
        answer: 'Yes. The companion Bluetooth mobile app allows you to lock the electronic motor brake, track battery health metrics, toggle speed limiters, and customise deck LED lighting directly from your smartphone.'
      }
    ]
  },
  {
    id: 'hl-youth-safety-certified',
    name: 'AussieGuard Youth & Junior Bike Helmet AS/NZS 2063',
    slug: 'aussieguard-youth-junior-bike-helmet',
    badge: 'AU Safety Certified',
    subtitle: 'Mandatory compliant helmet for kids, teens & youth bikes',
    category: 'helmets',
    categoryLabel: 'Helmets & Safety',
    subcategory: 'Kids & Youth Certified Helmets',
    subcategoryId: 'helmets-youth',
    brand: 'AussieGuard Safety',
    price: 65,
    compareAtPrice: 85,
    rating: 4.97,
    reviewsCount: 230,
    image: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 85,
    motor: 'N/A (Safety Gear)',
    motorType: 'Hub',
    torqueNm: 0,
    batteryWh: 0,
    batterySpec: 'N/A',
    rangeKm: 0,
    topSpeedKmH: 0,
    frameType: 'Universal',
    weightKg: 0.32,
    payloadKg: 0,
    brakes: 'N/A',
    gears: 'Dial-Fit Retention System',
    auCompliance: 'Strictly certified to Australian Standard AS/NZS 2063:2008',
    shortDescription: 'Official AS/NZS 2063 certified youth helmet with dial adjustment, insect netting, and magnetic buckle.',
    description: 'Riding without an approved helmet is illegal across every Australian state. The AussieGuard Youth helmet exceeds AS/NZS 2063 impact requirements while remaining ultra-light and cool with 16 airflow vents.',
    features: [
      'Australian Certified AS/NZS 2063:2008 with certified five-tick badge',
      'One-hand dial-fit adjustment ring for growing kids (48cm - 56cm)',
      'Pinch-proof magnetic Fidlock chin buckle prevents skin pinches',
      'Integrated rear LED flashing beacon for low-light school rides',
      'Removable, washable antibacterial sweat pads'
    ],
    tags: [
      'helmet youth bike', 'e bike helmet', 'helmets for cycle', 'childs cycling helmet', 'electric bike helmet',
      'childrens cycle helmet', 'childrens cycling helmets', 'full face childrens helmet', 'full face childs helmet', 'cheap bike helmets'
    ],
    sizeVariants: [
      { id: 'youth-s', label: 'Small / Youth (48cm - 52cm)', priceDelta: 0 },
      { id: 'youth-m', label: 'Medium / Teen (52cm - 56cm)', priceDelta: 0 },
      { id: 'adult-l', label: 'Adult / Youth L (56cm - 60cm)', priceDelta: 10 }
    ],
    recommendedAddOns: COMMON_ADDONS,
    faqs: [
      {
        question: 'Does this helmet have official Australian Standard AS/NZS 2063:2008 certification?',
        answer: 'Yes. The AussieGuard Youth Helmet carries the official AS/NZS 2063:2008 five-tick certification label, which is legally required to ride bikes, scooters, and e-bikes in Australia.'
      },
      {
        question: 'How do I measure my child\'s head to select the correct size?',
        answer: 'Wrap a flexible measuring tape around your child\'s head, approximately 2cm above the eyebrows and ears. Small fits 48-52cm, Medium fits 52-56cm, and Large fits 56-60cm.'
      },
      {
        question: 'How does the Dial-Fit retention system ensure a secure fit as children grow?',
        answer: 'The micro-adjusting rear dial tightens or loosens a 360-degree internal cradle evenly with one hand, ensuring the helmet stays snug and does not slide forward or backward on the forehead.'
      },
      {
        question: 'Is the magnetic chin buckle safe and easy for young riders to use?',
        answer: 'Yes. The German-engineered Fidlock magnetic buckle snaps together automatically and prevents painful skin pinches. Children can buckle and unbuckle it even while wearing cycling gloves.'
      },
      {
        question: 'When should an Australian bicycle helmet be replaced?',
        answer: 'Australian safety authorities recommend replacing any helmet after a direct impact crash, or after 3 to 5 years of regular use due to UV exposure and foam degradation.'
      }
    ]
  },
  {
    id: 'pt-schwalbe-cycle-tyres',
    name: 'Schwalbe Marathon Plus E-Bike Puncture Tyres (Pair)',
    slug: 'schwalbe-marathon-plus-ebike-tyres',
    badge: 'Flat-Less Tyre',
    subtitle: 'ECE-R75 certified for fast e-bikes with SmartGuard 5mm protection',
    category: 'parts',
    categoryLabel: 'Parts & Tyres',
    subcategory: 'Tyres & Tubes',
    subcategoryId: 'parts-tyres',
    brand: 'Schwalbe',
    price: 139,
    compareAtPrice: 170,
    rating: 4.93,
    reviewsCount: 165,
    image: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 40,
    motor: 'N/A (Replacement Tyre Pair)',
    motorType: 'Hub',
    torqueNm: 0,
    batteryWh: 0,
    batterySpec: 'N/A',
    rangeKm: 0,
    topSpeedKmH: 50,
    frameType: 'Universal',
    weightKg: 1.8,
    payloadKg: 140,
    brakes: 'N/A',
    gears: 'N/A',
    auCompliance: 'ECE-R75 E-Bike 50km/h Certified Compound',
    shortDescription: 'The undisputed king of puncture resistance. 5mm patented SmartGuard rubber layer stops glass and thorns.',
    description: 'Australian roads and bike paths can be littered with glass, bindies, and metal shards. Schwalbe Marathon Plus tyres are engineered specifically for high-torque electric bikes to eliminate flats.',
    features: [
      'ECE-R75 rating certified for electric bikes up to 50 km/h',
      '5mm thick patented SmartGuard flexible rubber under-tread',
      'High-contrast 3M reflective sidewall strip for nocturnal road visibility',
      'Anti-aging sidewalls resist cracking even under high-torque electric acceleration',
      'Supplied as a matched pair (Front & Rear)'
    ],
    tags: [
      'electric bike parts', 'ebike parts', 'electric bicycle parts', 'e bike tires', 'electric bicycle tire',
      'electric bike parts australia', 'e bike parts australia', 'e bicycle parts', 'electric bike spare parts', 'electric cycle parts'
    ],
    sizeVariants: [
      { id: '27-5-x-2', label: '27.5" x 2.00" Commuter Size (Pair)', priceDelta: 0 },
      { id: '29-x-2-1', label: '29" x 2.15" Cross/MTB Size (Pair)', priceDelta: 15 },
      { id: '20-x-2-15', label: '20" x 2.15" Compact / Folding Size (Pair)', priceDelta: -10 }
    ],
    recommendedAddOns: COMMON_ADDONS,
    faqs: [
      {
        question: 'Are Schwalbe Marathon Plus tyres certified for high-speed electric bicycles?',
        answer: 'Yes. They carry official ECE-R75 approval, certifying them for use on both standard 250W pedelecs (25 km/h) and high-speed S-Pedelecs up to 50 km/h.'
      },
      {
        question: 'How does the 5mm SmartGuard puncture protection layer work against thorns and glass?',
        answer: 'Beneath the tread is a 5mm thick layer of highly elastic special rubber. Debris like glass shards, sharp flints, and Australian three-corner jacks (bindies) cannot pierce through to the inner tube.'
      },
      {
        question: 'What mileage can I expect before needing to replace these tyres?',
        answer: 'Thanks to the anti-aging Endurance compound, daily commuters commonly report between 8,000 and 12,000 kilometres before reaching the wear indicators, outlasting generic tyres up to four times over.'
      },
      {
        question: 'How does the reflective sidewall enhance cyclist safety at night?',
        answer: 'Each tyre features a continuous 3M Scotchlite reflective strip around the entire circumference. When car headlights hit your wheels from side intersections, the tyres glow brilliantly white.'
      },
      {
        question: 'Are these tyres compatible with my electric bike\'s rims?',
        answer: 'Yes. They are supplied in standard wire bead sizing compatible with all standard clincher rims. Available in 27.5", 29", and 20" sizes to fit commuters, mountain e-bikes, and folding bikes.'
      }
    ]
  },
  {
    id: 'pt-shimano-deore-brake-kit',
    name: 'Shimano Deore Hydraulic Disc Brake Pads & 180mm Rotor Kit',
    slug: 'shimano-deore-hydraulic-disc-brake-pads-180mm-rotor-kit',
    badge: 'Braking Upgrade',
    subtitle: 'Resin/Metallic compound with Ice-Tech 180mm rotor for e-bike thermal control',
    category: 'parts',
    categoryLabel: 'Parts & Tyres',
    subcategory: 'Brakes & Rotors',
    subcategoryId: 'parts-brakes',
    brand: 'Shimano',
    price: 89,
    compareAtPrice: 115,
    rating: 4.95,
    reviewsCount: 92,
    image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 35,
    motor: 'N/A (Braking System)',
    motorType: 'Hub',
    torqueNm: 0,
    batteryWh: 0,
    batterySpec: 'N/A',
    rangeKm: 0,
    topSpeedKmH: 50,
    frameType: 'Universal',
    weightKg: 0.38,
    payloadKg: 150,
    brakes: 'Shimano B05S Resin / D02S Metallic Pads + 180mm Steel Rotor',
    gears: 'N/A',
    auCompliance: 'EN15194 & ISO 4210 Braking Performance Compliant',
    shortDescription: 'High-thermal dissipation brake upgrade kit engineered for heavy commuter & mountain e-bikes.',
    description: 'Electric bicycles carry more momentum and require greater stopping power than analog bikes. This Shimano kit includes fade-resistant pads and a precision ground 180mm rotor for silent, consistent deceleration in wet or dry Australian conditions.',
    features: [
      'Fade-resistant compound formulated specifically for electric bicycle weights',
      'Precision ground 180mm stainless steel rotor with thermal cooling cutouts',
      'Includes stainless return springs and split pins for instant installation',
      'Compatible with Shimano, Tektro, and Zoom hydraulic e-bike calipers',
      'Significant reduction in brake squeal during steep descents'
    ],
    tags: [
      'parts for e bikes', 'e bike brakes', 'electric bike parts', 'ebike parts', 'electric bicycle parts',
      'electric bike parts australia', 'e bike parts australia', 'e bicycle parts', 'electric bike spare parts', 'electric cycle parts'
    ],
    sizeVariants: [
      { id: '180mm-6bolt', label: '180mm Rotor (6-Bolt Standard) + Resin Pads', priceDelta: 0 },
      { id: '203mm-6bolt', label: '203mm Heavy Duty Downhill Rotor + Metallic Pads', priceDelta: 20 },
      { id: 'pads-only', label: 'Twin Pair Brake Pads Only (Front & Rear)', priceDelta: -30 }
    ],
    recommendedAddOns: COMMON_ADDONS,
    faqs: [
      {
        question: 'Will this Shimano brake kit fit my electric bike?',
        answer: 'Yes. The B05S / B01S pad shape is the most widely adopted standard across Shimano, Tektro, and Clarks hydraulic e-bike systems. The rotor is supplied in standard 6-bolt ISO mounting.'
      },
      {
        question: 'Should I choose resin or metallic brake pads for e-bikes?',
        answer: 'Resin pads offer quieter operation and immediate bite in cold city riding. Metallic sintered pads last longer under steep mountain descents and heavy cargo hauling.'
      },
      {
        question: 'How do I know when my e-bike brake pads need replacing?',
        answer: 'Check pad friction thickness regularly. When the lining wears below 0.8mm (approx. the thickness of an Australian 5c coin), replace them immediately to protect the rotor.'
      },
      {
        question: 'Does this kit include both front and rear brake pads?',
        answer: 'Yes, the complete bundle includes a matched front and rear pad set, new anti-rattle spring clips, and a 180mm rotor.'
      },
      {
        question: 'Can I pay with Bitcoin or USDT for spare parts?',
        answer: 'Yes! Select Crypto at checkout for an instant 10% discount off all replacement components.'
      }
    ]
  },
  {
    id: 'pt-kmc-e11-reinforced-chain',
    name: 'KMC e11 Turbo E-Bike Reinforced 11-Speed Chain',
    slug: 'kmc-e11-turbo-ebike-reinforced-11-speed-chain',
    badge: 'High Torque Rated',
    subtitle: 'Reinforced rivet pins with EcoProQ rust resistance for mid-drive e-bikes',
    category: 'parts',
    categoryLabel: 'Parts & Tyres',
    subcategory: 'Chains & E-Bike Drivetrains',
    subcategoryId: 'parts-chains',
    brand: 'KMC',
    price: 79,
    compareAtPrice: 99,
    rating: 4.91,
    reviewsCount: 74,
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 50,
    motor: 'N/A (Drivetrain)',
    motorType: 'Mid-Drive',
    torqueNm: 120,
    batteryWh: 0,
    batterySpec: 'N/A',
    rangeKm: 0,
    topSpeedKmH: 45,
    frameType: 'Universal',
    weightKg: 0.28,
    payloadKg: 180,
    brakes: 'N/A',
    gears: '11-Speed (136 Links with MissingLink)',
    auCompliance: 'E-Bike Tested (Brose / Bosch CX / Bafang 120Nm)',
    shortDescription: 'Unmatched tensile strength for high-torque mid-drive motors. Prevents snapped links under pedal assist.',
    description: 'Mid-drive electric bicycles deliver rapid bursts of torque that easily snap conventional bicycle chains. The KMC e-Series utilizes reinforced mushroom-riveted pins and hardened chromium carbide plates to ensure reliable shifting and maximum service life.',
    features: [
      'Specifically engineered for high-torque mid-drive e-bikes up to 120Nm',
      'Reinforced pin power with highest tensile strength in its class',
      'EcoProQ anti-rust coating protects against coastal salt air and rain',
      'Chamfered inner plates for ultra-smooth shifting under motor load',
      'Includes reusable KMC MissingLink master connector'
    ],
    tags: [
      'mid motor ebike', 'mid drive e bike', 'mid drive electric bike australia', 'mid drive electric bike', 'electric bicycle mid drive motor',
      'mid drive ebike motor', 'parts for e bikes', 'electric bike parts', 'ebike parts', 'electric bicycle parts'
    ],
    sizeVariants: [
      { id: '11-speed-136l', label: '11-Speed Extra Long (136 Links for E-Bikes)', priceDelta: 0 },
      { id: '10-speed-136l', label: '10-Speed E-Bike Chain (136 Links)', priceDelta: -5 },
      { id: '9-speed-136l', label: '9-Speed E-Bike Chain (136 Links)', priceDelta: -10 }
    ],
    recommendedAddOns: COMMON_ADDONS,
    faqs: [
      {
        question: 'Why do mid-drive e-bikes need a special reinforced chain?',
        answer: 'Mid-drive motors multiply human leg power directly through the chain. Standard chains stretch prematurely and snap under high-assist hill climbs. KMC e-chains feature beefed-up pins rated for over 450kgf of tensile pull.'
      },
      {
        question: 'How many links does this chain have for longtail or commuter e-bikes?',
        answer: 'It comes with 136 links — significantly longer than standard 114-link chains — making it suitable for extended rear chainstays on cargo and commuter e-bikes. Easily shortened with a standard chain tool.'
      },
      {
        question: 'Is this chain compatible with Shimano and SRAM drivetrains?',
        answer: 'Yes. KMC e-Series chains are non-directional and 100% compatible with Shimano Deore/XT, SRAM NX/GX, and Microshift 11-speed derailleurs.'
      },
      {
        question: 'Does the package include a quick-connect link?',
        answer: 'Yes, a tool-free KMC MissingLink is included in every box for quick installation and trailside maintenance.'
      },
      {
        question: 'How do I maintain my e-bike chain in Australian conditions?',
        answer: 'Wipe down and apply a quality synthetic dry or wet lube every 200km. Check chain stretch with a chain wear gauge every 1,000km.'
      }
    ]
  },
  {
    id: 'pt-ergon-gp1-comfort-set',
    name: 'Ergon GP1 Biokork Ergonomic Grips & Gel Saddle Set',
    slug: 'ergon-gp1-biokork-ergonomic-grips-gel-saddle-set',
    badge: 'Ergonomic Relief',
    subtitle: 'Relieves wrist numbness and sit-bone pressure on long daily e-bike commutes',
    category: 'parts',
    categoryLabel: 'Parts & Tyres',
    subcategory: 'Pedals, Grips & Saddles',
    subcategoryId: 'parts-pedals-grips',
    brand: 'Ergon',
    price: 119,
    compareAtPrice: 149,
    rating: 4.88,
    reviewsCount: 86,
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 22,
    motor: 'N/A (Ergonomics)',
    motorType: 'Hub',
    torqueNm: 0,
    batteryWh: 0,
    batterySpec: 'N/A',
    rangeKm: 0,
    topSpeedKmH: 25,
    frameType: 'Universal',
    weightKg: 0.65,
    payloadKg: 135,
    brakes: 'N/A',
    gears: 'N/A',
    auCompliance: 'Ergonomic Certification & Non-Toxic Rubber',
    shortDescription: 'The gold standard for cockpit comfort. Wide winged grips and memory gel saddle eliminate hand fatigue and saddle soreness.',
    description: 'Upright and commuter e-bike riding places unique pressure on your palms and sit bones. This bundle pairs genuine German-engineered Ergon GP1 winged grips with a plush anatomic gel saddle for all-day comfort.',
    features: [
      'Winged ergonomic palm platform stops carpal tunnel compression',
      'Sustainable organic cork and hypoallergenic German rubber compounds',
      'Anatomic central relief channel on gel saddle prevents soft tissue numbness',
      'Single-bolt cold-forged aluminium clamp prevents grip rotation on handlebars',
      'Fits all standard 22.2mm electric bike handlebars and standard seat posts'
    ],
    tags: [
      'ebike accessories', 'electric bicycle accessories', 'seat e bike', 'electric bicycle seats', 'electric bike accessories',
      'e bike pedals', 'ebike lights', 'e bike accessory', 'electric bike light', 'electric bike seat'
    ],
    sizeVariants: [
      { id: 'grips-saddle-combo', label: 'Complete Grips + Comfort Saddle Combo', priceDelta: 0 },
      { id: 'grips-only-large', label: 'Ergon GP1 Grips Only (Large Size)', priceDelta: -55 },
      { id: 'saddle-only', label: 'Memory Gel Relief Saddle Only', priceDelta: -45 }
    ],
    recommendedAddOns: COMMON_ADDONS,
    faqs: [
      {
        question: 'Will these grips fit twist-throttle or trigger shifter e-bikes?',
        answer: 'Yes. The grips feature standard 22.2mm inner diameter. If your e-bike has a right-hand twist throttle, the shortened right grip option is available in the box.'
      },
      {
        question: 'How do winged grips relieve wrist pain and numbness?',
        answer: 'They support the heel of your hand, keeping your wrist in a neutral, relaxed position and distributing pressure away from the sensitive ulnar nerve.'
      },
      {
        question: 'Is the saddle waterproof for outdoor all-weather commuting?',
        answer: 'Yes, the saddle features a vacuum-sealed waterproof synthetic cover that resists rain, UV degradation, and wear.'
      },
      {
        question: 'What is the clamp mechanism on the grips?',
        answer: 'An aircraft-grade aluminium lock-on collar clamps tightly with a 4mm hex bolt, ensuring zero slippage even in rain or aggressive cornering.'
      },
      {
        question: 'Can I get advice on saddle fit before purchasing?',
        answer: 'Message our Australian team on WhatsApp and we will gladly guide you based on your riding style and frame geometry.'
      }
    ]
  },
  {
    id: 'pt-parktool-ebike-maintenance-kit',
    name: 'Park Tool E-Bike Precision Multi-Tool & Chain Wear Kit',
    slug: 'park-tool-ebike-precision-multi-tool-chain-wear-kit',
    badge: 'Workshop Pro',
    subtitle: 'Hex, Torx, chain-breaker and digital gauge for mid-drive torque inspection',
    category: 'parts',
    categoryLabel: 'Parts & Tyres',
    subcategory: 'Workshop & Tools',
    subcategoryId: 'parts-workshop',
    brand: 'Park Tool',
    price: 95,
    compareAtPrice: 120,
    rating: 4.96,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 45,
    motor: 'N/A (Tooling)',
    motorType: 'Hub',
    torqueNm: 0,
    batteryWh: 0,
    batterySpec: 'N/A',
    rangeKm: 0,
    topSpeedKmH: 25,
    frameType: 'Universal',
    weightKg: 0.32,
    payloadKg: 100,
    brakes: 'Disc Pad Spreader Tool Included',
    gears: 'Integrated Chain Breaker Tool',
    auCompliance: 'Professional Workshop Grade Metric Standard',
    shortDescription: 'The ultimate roadside rescue and garage maintenance kit. Precision Torx, Hex keys, and chain wear checker.',
    description: 'Electric bikes require regular fastener torque checks and chain wear monitoring. This Park Tool workshop set provides all necessary metric hex and Torx keys (including T25 disc rotor bits), a heavy-duty chain breaker, and a calibrated chain stretch gauge.',
    features: [
      'Hardened vanadium steel 2, 2.5, 3, 4, 5, 6, 8mm Hex keys',
      'T10, T25, T30 Torx bits for disc brake rotors and motor cover bolts',
      'Integrated cast steel chain tool compatible with 8 to 12-speed e-bike chains',
      'Laser-cut chain wear indicator measures 0.5% and 0.75% wear thresholds',
      'Built-in hydraulic brake pad spreader and Presta core valve tool'
    ],
    tags: [
      'e bike controller', 'electric bike controller', 'e bicycle accessories', 'controller for e-bike', 'electric bicycle controllers',
      'ebike accessories', 'electric bicycle accessories', 'electric bike accessories', 'e bike accessory', 'electric bike parts australia'
    ],
    sizeVariants: [
      { id: 'multitool-chain-checker', label: 'Multi-Tool + Chain Wear Checker Bundle', priceDelta: 0 },
      { id: 'multitool-only', label: 'Park Tool IB-3 Multi-Tool Only', priceDelta: -25 },
      { id: 'checker-only', label: 'Park Tool CC-3.2 Chain Checker Only', priceDelta: -45 }
    ],
    recommendedAddOns: COMMON_ADDONS,
    faqs: [
      {
        question: 'Why is a chain wear checker vital for electric bike owners?',
        answer: 'Replacing a worn chain at 0.5% stretch ($45) prevents expensive wear on your rear cassette and motor chainring ($200+). The checker tells you in 5 seconds whether your chain is stretched.'
      },
      {
        question: 'Does this tool include the T25 Torx required for disc brake bolts?',
        answer: 'Yes, it features a hardened T25 bit specifically sized for disc brake rotor screws, as well as T10 and T30 bits.'
      },
      {
        question: 'Can the chain tool handle thick e-bike chains?',
        answer: 'Yes, the cast-steel chain body is designed for reinforced e-bike chains from 8 to 12-speed.'
      },
      {
        question: 'Is this kit portable enough to carry in a saddle bag?',
        answer: 'Yes, the multi-tool folds down to just 9cm x 4cm and weighs only 170g, fitting neatly into your pocket or saddle bag.'
      },
      {
        question: 'Are Park Tool products covered by warranty?',
        answer: 'Yes, all Park Tool products carry a limited lifetime manufacturer warranty against workmanship defects.'
      }
    ]
  },
  {
    id: 'eb-summit-hardtail-emtb',
    name: 'SummitHardtail Apex 29" Electric Mountain Bike',
    slug: 'summithardtail-apex-29-electric-mountain-bike',
    badge: 'Hardtail Pro',
    subtitle: 'Lightweight aluminium hardtail with 95Nm mid-drive motor & 120mm air fork',
    category: 'emtb',
    categoryLabel: 'Electric Mountain Bike',
    subcategory: 'Electric Hardtail Mountain Bikes',
    subcategoryId: 'emtb-hardtail',
    brand: 'Apex Mobility',
    price: 2699,
    compareAtPrice: 3199,
    rating: 4.92,
    reviewsCount: 58,
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 14,
    motor: '250W Bafang M500 Mid-Drive (95Nm Hill-Climb Torque)',
    motorType: 'Mid-Drive',
    torqueNm: 95,
    batteryWh: 720,
    batterySpec: '48V 15Ah Samsung 21700 Integrated Down-Tube Battery',
    rangeKm: 105,
    topSpeedKmH: 25,
    frameType: 'Hardtail',
    weightKg: 21.2,
    payloadKg: 135,
    brakes: 'Shimano MT200 Hydraulic Disc Brakes (180mm Rotors)',
    gears: 'Shimano Deore 10-Speed Shadow Plus',
    auCompliance: 'EN15194 Street Legal Across All Australian States',
    shortDescription: 'The ultimate Australian electric hardtail mountain bike. Efficient power transfer, agile geometry, and 95Nm mid-drive hill-climbing grunt.',
    description: 'Built for riders who love the raw efficiency and responsive trail feedback of a hardtail frame, the SummitHardtail pairs a rugged 6061 hydroformed alloy chassis with an integrated 720Wh Samsung battery. Ideal for Australian fire trails, cross-country singletracks, and rugged rail trails.',
    features: [
      'Bafang M500 95Nm mid-drive motor with ultra-responsive dual torque sensors',
      'Suntour XCR34 Air 120mm travel fork with remote hydraulic lockout',
      'Integrated downtube Samsung 720Wh battery for up to 105km on trail mode',
      'Maxxis Rekon 29 x 2.40" tubeless-ready puncture-resistant trail tyres',
      'Internal cable routing with stealth dropper post routing ready'
    ],
    tags: [
      'electric mountain bike', 'electric mtb', 'electric mountain bikes australia', 'emtb australia', 'electric bicycle mtb',
      'electric mountain bike sales', 'electric mtb australia', 'best electric mountain bike australia', 'electric mountain bike with throttle', 'best electric mtb'
    ],
    sizeVariants: [
      { id: 'm', label: 'Medium 17" (Rider 165cm - 178cm)', priceDelta: 0 },
      { id: 'l', label: 'Large 19" (Rider 178cm - 192cm)', priceDelta: 0 }
    ],
    recommendedAddOns: COMMON_ADDONS,
    faqs: [
      {
        question: 'Why choose an Electric Hardtail Mountain Bike over full suspension?',
        answer: 'Hardtail eMTBs are lighter (typically 2-3kg less than dual suspension bikes), deliver direct pedal efficiency with zero shock bob on climbs, require significantly less suspension maintenance, and offer exceptional value for cross-country trails, fire roads, and rail trails.'
      },
      {
        question: 'Is the SummitHardtail legal on Australian public roads and singletrack trails?',
        answer: 'Yes. It is fully certified under the EN15194 Australian standard with a 250W continuous rated motor and 25 km/h assist limit. You can ride legally on roads, bike paths, and mountain bike parks throughout all Australian states.'
      },
      {
        question: 'What is the real-world battery range on hilly cross-country trails?',
        answer: 'On rolling Australian bush trails with frequent climbs, riders between 70kg and 85kg achieve between 75km and 105km per charge using Eco and Trail assist modes. On pure Turbo climbing mode, range averages 60km.'
      },
      {
        question: 'Can I install a dropper seatpost on this frame?',
        answer: 'Yes. The frame includes dedicated internal routing ports for a 30.9mm stealth dropper post, allowing easy upgrades for aggressive downhill singletrack descending.'
      },
      {
        question: 'What warranty covers the frame and Bafang mid-drive motor in Australia?',
        answer: 'Apex Mobility provides a 2-Year comprehensive Australian warranty on the frame, Bafang M500 motor, and Samsung battery. Genuine replacement parts and authorized technician support are based locally in Brisbane, Sydney, and Melbourne.'
      }
    ]
  },
  {
    id: 'eb-flowtrail-dual-suspension',
    name: 'Apex FlowTrail Pro Dual Suspension eMTB',
    slug: 'apex-flowtrail-pro-dual-suspension-emtb',
    badge: 'Dual Air Pro',
    subtitle: '150mm front & rear air suspension with Brose 90Nm mid-drive power',
    category: 'emtb',
    categoryLabel: 'Electric Mountain Bike',
    subcategory: "Dual suspension eMTB's",
    subcategoryId: 'emtb-dual-suspension',
    brand: 'Apex Mobility',
    price: 4299,
    compareAtPrice: 4899,
    rating: 4.96,
    reviewsCount: 42,
    image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 9,
    motor: '250W Brose S Mag Mid-Drive Motor (90Nm Torque)',
    motorType: 'Mid-Drive',
    torqueNm: 90,
    batteryWh: 750,
    batterySpec: '36V 20.8Ah High-Density Integrated Lithium Pack',
    rangeKm: 110,
    topSpeedKmH: 25,
    frameType: 'Dual Suspension',
    weightKg: 23.4,
    payloadKg: 140,
    brakes: 'Magura MT5 4-Piston Hydraulic Disc Brakes (203mm Front/Rear)',
    gears: 'Shimano SLX 12-Speed Hyperglide+',
    auCompliance: 'EN15194 Australian Certified Pedelec',
    shortDescription: 'Conquer rock gardens, technical root sections, and flow trails with 150mm dual air suspension and ultra-quiet Brose 90Nm torque.',
    description: 'Engineered for Australian bike parks and backcountry trail systems, the FlowTrail Pro pairs a 4-bar linkage suspension frame with a magnesium-cased Brose 90Nm motor. Butter-smooth natural pedalling feel, active climbing traction, and confidence-inspiring descending geometry.',
    features: [
      'RockShox 35 Gold RL 150mm air fork + RockShox Deluxe Select+ RT rear shock',
      'Ultra-silent Brose S Mag 90Nm motor with carbon internal drive belt',
      '750Wh down-tube battery delivering over 110km on mixed singletrack tours',
      'Tubeless-ready 29" WTB ST i30 rims with Maxxis Minion DHF/DHR tyres',
      'Factory installed 150mm internal dropper seatpost'
    ],
    tags: [
      'electric trail bike australia', 'best emtb 2026', 'dual suspension emtb', 'emtb bike', 'fastest emtb',
      'dual suspension ebike', 'electric trail bicycle', 'emtb australia', 'dual suspension electric mountain bike', 'full suspension electric bicycle'
    ],
    sizeVariants: [
      { id: 'm', label: 'Medium (Rider 168cm - 180cm)', priceDelta: 0 },
      { id: 'l', label: 'Large (Rider 180cm - 194cm)', priceDelta: 0 }
    ],
    recommendedAddOns: COMMON_ADDONS,
    faqs: [
      {
        question: 'What type of riding is the Dual Suspension FlowTrail Pro best suited for?',
        answer: 'The FlowTrail Pro is designed for all-mountain and trail riding across rocky, root-strewn Australian singletracks like Stromlo Forest Park, Blue Derby, and Brisbane Koala Sanctuary. The 150mm dual air suspension absorbs heavy trail hits and keeps tyres glued to the ground.'
      },
      {
        question: 'How quiet is the Brose S Mag mid-drive motor compared to other e-bikes?',
        answer: 'The Brose S Mag is widely recognised as the quietest mid-drive motor on the global market due to its internal carbon drive belt. It delivers 90Nm of natural torque with virtually zero audible whine.'
      },
      {
        question: 'Is the rear air shock adjustable for different rider weights and trail types?',
        answer: 'Yes. The RockShox Deluxe Select+ RT shock features an external rebound adjustment dial, 2-position climb lock lever, and standard Schrader air valve so you can set precise 25-30% suspension sag for your exact weight.'
      },
      {
        question: 'Can the 750Wh battery be charged off the bike in an apartment?',
        answer: 'Yes. The down-tube battery unlatches cleanly with the included security keys and features an integrated carry handle, allowing safe indoor charging with the Australian 4A fast charger.'
      },
      {
        question: 'What warranty is provided on the frame pivots and motor?',
        answer: 'Apex Mobility provides a 5-Year warranty on the main alloy frame, 2-Year warranty on frame pivot bearings and the Brose motor, and 2-Year warranty on the battery cells with Australian service centres.'
      }
    ]
  },
  {
    id: 'eb-youth-24-emtb',
    name: 'TrailYouth 24" Junior Mountain e-Bike',
    slug: 'trailyouth-24-junior-mountain-ebike',
    badge: 'Youth & Junior',
    subtitle: 'Ergonomic 24-inch junior eMTB with progressive torque & youth safety geometry',
    category: 'emtb',
    categoryLabel: 'Electric Mountain Bike',
    subcategory: "Kids and Youths 24' eMTB's",
    subcategoryId: 'emtb-youth-24',
    brand: 'Outback Electric',
    price: 1699,
    compareAtPrice: 1999,
    rating: 4.95,
    reviewsCount: 37,
    image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 11,
    motor: '250W Progressive Torque Rear Hub Motor (Smooth Junior Acceleration)',
    motorType: 'Hub',
    torqueNm: 42,
    batteryWh: 378,
    batterySpec: '36V 10.5Ah Samsung Integrated Slim Pack',
    rangeKm: 65,
    topSpeedKmH: 25,
    frameType: 'Hardtail',
    weightKg: 16.8,
    payloadKg: 85,
    brakes: 'Shimano Hydraulic Disc Brakes (Short-Reach Junior Levers)',
    gears: 'Shimano Altus 7-Speed RapidFire',
    auCompliance: 'EN15194 & AS/NZS Safety Certified (Kids & Youths 24" Geometry)',
    shortDescription: 'Empower younger riders on family trail rides. Scaled 24-inch geometry, short-reach safety levers, and lightweight 16.8kg chassis.',
    description: 'Designed specifically so kids and teenagers can comfortably keep up with parents on scenic Australian rail trails and mountain trails. Features short-reach brake levers for smaller hands, low standover height, progressive torque ramping, and a lockable parent speed governor.',
    features: [
      '24" scaled aluminium frame with ultra-low standover clearance for confidence',
      'Hydraulic disc brakes with reach-adjustable brake levers for smaller hands',
      'Lightweight 16.8kg total weight - easy for junior riders to control and manoeuvre',
      'Parental control app lock with customizable speed limits (15 / 20 / 25 km/h)',
      'Suntour XCT-JR 80mm tuned coil-spring suspension fork for lighter rider weights'
    ],
    tags: [
      'mountain electric cycle', 'mountain e cycle', 'electric bicycle mountain bike', 'mountain electric bicycle', 'ebikes mountain',
      'lightweight electric bike', 'lightweight electric bike australia', 'lightweight ebike australia', 'lightweight electric bicycle', 'electric assist mountain bike'
    ],
    sizeVariants: [
      { id: '24-inch', label: '24" Wheel Size (Riders 125cm - 155cm / Ages 8-14)', priceDelta: 0 }
    ],
    recommendedAddOns: COMMON_ADDONS,
    faqs: [
      {
        question: 'What age and height range is the TrailYouth 24" eMTB designed for?',
        answer: 'The 24-inch wheel sizing and low standover frame are engineered for youth riders between 125cm and 155cm in height (typically ages 8 to 14 years), bridging the gap between children bikes and adult frames.'
      },
      {
        question: 'Can parents restrict or limit the top motor assist speed for safety?',
        answer: 'Yes! The cockpit display includes a passcode-protected settings menu and Bluetooth parent app where maximum assist speed can be capped at 15 km/h, 20 km/h, or standard 25 km/h as the young rider gains trail experience.'
      },
      {
        question: 'Are the brake levers easy for smaller hands to reach and pull?',
        answer: 'Yes. It features Shimano hydraulic disc brakes equipped with reach-adjust screws. The levers sit closer to the handlebars so young riders can easily brake with full two-finger control without straining.'
      },
      {
        question: 'How heavy is the bike and can a child manage it independently?',
        answer: 'At just 16.8kg including the battery, the TrailYouth is one of the lightest youth e-bikes in Australia. The balanced weight distribution allows kids to pedal naturally even when motor assistance is turned off.'
      },
      {
        question: 'Is this youth e-bike legal to ride in public parks and recreation trails?',
        answer: 'Yes. It complies with EN15194 and Australian road standards as a 250W pedal-assist bicycle, legal on all public cycleways, shared paths, and recreational mountain bike parks across Australia.'
      }
    ]
  },
  {
    id: 'eb-alpine-trial-suspension',
    name: 'Alpine Trial Suspension Pro 29" eMTB',
    slug: 'alpine-trial-suspension-pro-29-emtb',
    badge: 'Trail Master',
    subtitle: 'Precision trial & trail suspension with Shimano EP8 85Nm mid-drive system',
    category: 'emtb',
    categoryLabel: 'Electric Mountain Bike',
    subcategory: "Trial Suspension eMTB's",
    subcategoryId: 'emtb-trial-suspension',
    brand: 'TrailPeak Australia',
    price: 3899,
    compareAtPrice: 4499,
    rating: 4.94,
    reviewsCount: 51,
    image: 'https://images.unsplash.com/photo-1502744688674-c619d3f86c9e?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1502744688674-c619d3f86c9e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 8,
    motor: '250W Shimano EP8 Mid-Drive Motor (85Nm Torque)',
    motorType: 'Mid-Drive',
    torqueNm: 85,
    batteryWh: 630,
    batterySpec: '36V 17.5Ah Shimano STEPS BT-E8036 Internal Battery',
    rangeKm: 100,
    topSpeedKmH: 25,
    frameType: 'Dual Suspension',
    weightKg: 22.1,
    payloadKg: 135,
    brakes: 'Shimano SLX 4-Piston Hydraulic Disc Brakes',
    gears: 'Shimano XT 11-Speed Linkglide (High-Durability E-MTB Drivetrain)',
    auCompliance: 'EN15194 Australian Certified Pedelec',
    shortDescription: 'Engineered for technical trial agility, tight switchbacks, and aggressive backcountry trail riding with lightweight Shimano EP8 mid-drive integration.',
    description: 'The Alpine Trial Suspension eMTB combines short 440mm chainstays for nimble handling with a 140mm Horst-link active suspension layout. Whether navigating steep alpine rock steps in the Snowy Mountains or shredding technical switchbacks in Victoria, this eMTB delivers pinpoint trial balance.',
    features: [
      'Shimano EP8 85Nm mid-drive motor weighing only 2.6kg with customisable E-Tube tuning',
      'Fox Float 34 Performance 140mm fork paired with Fox Float DPS rear shock',
      'Shimano Linkglide 11-speed drivetrain engineered specifically for 3x e-bike chain longevity',
      '29" Tubeless-ready Maxxis Dissector 2.40" 3C MaxxTerra tyres',
      'Integrated cockpit routing with compact Shimano colour display'
    ],
    tags: [
      'electric mountain bik', 'electric hardtail mountain bike', 'best electric mountain bikes 2026', 'mens electric mountain bike', 'fastest electric mountain bike',
      'high performance electric mountain bike', 'lightweight electric mountain bike', 'e bike mountain bike', 'electric assist bike', 'electric bikes mountain bike'
    ],
    sizeVariants: [
      { id: 'm', label: 'Medium (Rider 168cm - 180cm)', priceDelta: 0 },
      { id: 'l', label: 'Large (Rider 180cm - 192cm)', priceDelta: 0 }
    ],
    recommendedAddOns: COMMON_ADDONS,
    faqs: [
      {
        question: 'What makes a Trial Suspension eMTB unique for technical mountain biking?',
        answer: 'Trial Suspension geometry prioritises nimble trial manoeuvres, sharp cornering agility, and immediate ground clearance over excessive bulk. The 140mm Horst-link design prevents suspension stiffening under heavy braking, giving riders master control on technical rock steps and steep drop-ins.'
      },
      {
        question: 'How customizable is the Shimano EP8 motor power delivery?',
        answer: 'Using the free Shimano E-Tube Project smartphone app, you can fine-tune torque output, assist start sensitivity, and maximum power across Eco, Trail, and Boost modes to match your exact trail style.'
      },
      {
        question: 'How durable is the Shimano Linkglide drivetrain under e-bike torque?',
        answer: 'Shimano Linkglide features thicker, specially profiled cassette teeth engineered specifically to withstand heavy mid-drive electric motor torque, offering up to 300% longer drivetrain life than standard road/XC cassettes.'
      },
      {
        question: 'What is the full charge time for the 630Wh Shimano internal battery?',
        answer: 'Using the supplied Shimano 4A fast charger, the 630Wh battery reaches 80% charge in approximately 2.5 hours and 100% full charge in 5 hours.'
      },
      {
        question: 'What warranty is backed on this Shimano-equipped eMTB in Australia?',
        answer: 'TrailPeak Australia provides a 5-Year frame warranty and full 2-Year Australian Shimano STEPS warranty on the EP8 motor, battery, and display, supported by authorised Shimano Service Centres Australia-wide.'
      }
    ]
  },
  {
    id: 'eb-byron-cruiser',
    name: 'Byron Bay Classic Electric Cruiser 250W',
    slug: 'byron-bay-classic-electric-cruiser-250w',
    badge: 'Coastal Classic',
    subtitle: 'Vintage retro step-through with plush sprung saddle, whitewall tyres & swept bars',
    category: 'cruiser',
    categoryLabel: 'Electric Cruiser Bikes',
    subcategory: 'Electric Cruiser Bikes',
    subcategoryId: 'cruiser',
    brand: 'Outback Electric',
    price: 1999,
    compareAtPrice: 2399,
    rating: 4.97,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 15,
    motor: '250W Bafang Ultra-Smooth Silent Hub Motor (45Nm)',
    motorType: 'Hub',
    torqueNm: 45,
    batteryWh: 540,
    batterySpec: '36V 15Ah Samsung Integrated Down-Tube Removable Pack',
    rangeKm: 85,
    topSpeedKmH: 25,
    frameType: 'Step-Through',
    weightKg: 22.4,
    payloadKg: 130,
    brakes: 'Tektro Hydraulic Disc Brakes (Dual Safety Sensor Cutoff)',
    gears: 'Shimano 7-Speed Megarange Cruiser Gearing',
    auCompliance: 'EN15194 Street Legal Across Australia',
    shortDescription: 'The quintessential Australian beachside cruiser. Deep step-through aluminium frame, swept-back cruiser bars, and ultra-comfortable gel suspension seat.',
    description: 'Cruise coastal paths in effortless luxury. The Byron Bay Classic pairs timeless vintage beach cruiser aesthetics with modern 250W electric pedal assist. Swept-back handlebars provide an upright, neck-friendly riding posture, while wide balloon tyres iron out boardwalks and coastal roads.',
    features: [
      'Ergonomic upright posture with swept-back polished alloy cruiser handlebars',
      'Plush double-sprung wide leatherette cruiser saddle with matching comfort grips',
      'Integrated Samsung 540Wh battery delivering up to 85km of leisurely beach cruising',
      'Full-coverage alloy colour-matched mudguards and heavy-duty rear luggage rack',
      'Front retro bullet LED headlight and rear safety light wired to central battery'
    ],
    tags: [
      'cruiser electric bike', 'electric beach bike', 'electric beach cruisers', 'electric cruiser bike australia', 'cruiser e bikes australia',
      'cruiser e bike', 'fat wheel electric bicycle', 'electric fat tyre bike', 'electric bicycles with fat tires', 'fat wheel e bike'
    ],
    sizeVariants: [
      { id: 'standard', label: 'One Size Fits Most (Rider 155cm - 188cm)', priceDelta: 0 },
      { id: 'front-basket', label: 'Includes Front Wicker Beach Basket', priceDelta: 69 }
    ],
    recommendedAddOns: COMMON_ADDONS,
    faqs: [
      {
        question: 'Why choose an Electric Cruiser Bike over a conventional city commuter?',
        answer: 'Cruiser e-bikes offer an upright, relaxed sitting position that takes all pressure off wrists, shoulders, and lower back. The wide sprung saddle and swept-back handlebars allow you to soak in the scenery without leaning forward aggressively.'
      },
      {
        question: 'Is the Byron Bay Cruiser easy to mount and dismount for seniors or riders with reduced mobility?',
        answer: 'Yes! The deep step-through frame features an ultra-low clearance height of just 39cm from the ground, allowing riders to step through comfortably without having to swing their leg over a high top tube.'
      },
      {
        question: 'Can this cruiser handle coastal hills and beachside headlands?',
        answer: 'Yes. The 250W Bafang motor paired with Shimano 7-speed Megarange gearing provides ample torque to cruise up scenic headlands and coastal gradients with light pedalling cadence.'
      },
      {
        question: 'Are the electrical components protected against coastal salt air?',
        answer: 'All electronic connectors are IP65 water-sealed, the frame is crafted from rust-resistant 6061 aluminium alloy, and stainless steel fasteners are used throughout to resist coastal sea air exposure.'
      },
      {
        question: 'What warranty is included with the Byron Bay Classic Cruiser?',
        answer: 'Every cruiser comes with a 2-Year comprehensive Australian warranty covering the motor, Samsung battery, electronic display, and aluminium frame, supported by our nationwide customer care team.'
      }
    ]
  },
  {
    id: 'eb-aerovelocity-road',
    name: 'AeroVelocity Carbon Electric Road Bike 250W',
    slug: 'aerovelocity-carbon-endurance-e-road-bike-250w',
    badge: 'Lightweight Aero',
    subtitle: '13.5kg ultralight carbon endurance road bike with stealth Mahle 250W hub system',
    category: 'road',
    categoryLabel: 'Electric Road Bikes',
    subcategory: 'Electric Road Bikes',
    subcategoryId: 'road',
    brand: 'Apex Mobility',
    price: 3599,
    compareAtPrice: 4199,
    rating: 4.95,
    reviewsCount: 33,
    image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1502744688674-c619d3f86c9e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502744688674-c619d3f86c9e?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 6,
    motor: '250W Mahle X35+ Stealth Rear Hub Motor (Zero Drag Above 25 km/h)',
    motorType: 'Hub',
    torqueNm: 40,
    batteryWh: 500,
    batterySpec: 'Panasonic 250Wh Internal Downtube + 250Wh Range Extender Bottle Pack',
    rangeKm: 115,
    topSpeedKmH: 25,
    frameType: 'Crossbar',
    weightKg: 13.5,
    payloadKg: 115,
    brakes: 'Shimano 105 Hydraulic Disc Brakes (160mm Flat-Mount)',
    gears: 'Shimano 105 R7000 2x11-Speed Precision Groupset (50-34T Compact)',
    auCompliance: 'EN15194 Australian Certified Pedelec',
    shortDescription: 'Tame alpine climbs and keep pace on fast bunch rides. Weighs just 13.5kg with a silent, drag-free motor and full carbon fibre fork.',
    description: 'The AeroVelocity bridges the gap between traditional lightweight performance road bikes and electric assist. Built with Toray high-modulus carbon forks, aero-profiled hydroformed alloy tubing, and the stealth Mahle X35+ motor that offers zero drag when pedalling above the 25 km/h assist threshold.',
    features: [
      'Total bike weight of just 13.5kg - feels and handles like a genuine race road bike',
      'Zero-drag freewheel clutch - seamless transition above the 25 km/h Australian cutoff',
      'Dual 500Wh total capacity (internal downtube battery + bottle cage range extender)',
      'Shimano 105 2x11-speed hydraulic disc groupset with 50-34T compact crankset',
      'Vittoria Rubino Pro 700x28c tubeless-ready high-speed road tyres'
    ],
    tags: [
      'electric road bike', 'fast e bicycle', 'electric gravel bike', 'road bicycle electric', 'gravel ebike',
      'high performance e bike', 'electric road bike australia', 'e bikes fast', 'faster e bike', 'fastest e cycle'
    ],
    sizeVariants: [
      { id: '52', label: 'Small 52cm (Rider 162cm - 172cm)', priceDelta: 0 },
      { id: '55', label: 'Medium 55cm (Rider 172cm - 182cm)', priceDelta: 0 },
      { id: '58', label: 'Large 58cm (Rider 182cm - 193cm)', priceDelta: 0 }
    ],
    recommendedAddOns: COMMON_ADDONS,
    faqs: [
      {
        question: 'Does the electric road bike create motor drag when riding over 25 km/h?',
        answer: 'No. The Mahle X35+ rear hub motor features a dual-ratchet mechanical freewheel that completely decouples when the motor turns off at 25 km/h. On flat road sprints or descents at 30-45 km/h, there is zero magnetic or mechanical drag.'
      },
      {
        question: 'Can I ride the AeroVelocity in weekend bunch rides without drawing attention?',
        answer: 'Yes! The battery is invisibly integrated into the slim downtube, and the hub motor is hidden behind the rear brake rotor and 11-speed cassette. It looks and handles almost identically to a high-end endurance road bike.'
      },
      {
        question: 'How far can I ride on big alpine climbs with the dual 500Wh battery setup?',
        answer: 'With the included bottle-cage range extender connected (500Wh total capacity), endurance road riders regularly complete 100km to 125km road loops with over 1,500 metres of vertical climbing.'
      },
      {
        question: 'What clearance does the frame have for wider gravel or endurance road tyres?',
        answer: 'The frame and carbon fork accommodate tyres up to 700x35c, allowing riders to easily swap between fast 28mm slick tarmac tyres and 32-35mm gravel tyres for rough rural bitumen.'
      },
      {
        question: 'What warranty is supported in Australia for the AeroVelocity?',
        answer: 'Apex Mobility backs the AeroVelocity with a 3-Year frame warranty and 2-Year warranty on the Shimano 105 groupset and Mahle electronic drive system with national Australian support.'
      }
    ]
  },
  {
    id: 'sc-kids-glidemini',
    name: 'GlideMini Safe-Speed Kids 3-Wheel Scooter',
    slug: 'glidemini-safe-speed-kids-3-wheel-scooter',
    badge: 'Kids Safety',
    subtitle: 'Lean-to-steer 3-wheel design with speed governor, LED wheels & rear foot brake',
    category: 'scooters',
    categoryLabel: 'Scooters',
    subcategory: 'Kids Scooters',
    subcategoryId: 'scooters-kids',
    brand: 'GlideCity',
    price: 299,
    compareAtPrice: 379,
    rating: 4.96,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 22,
    motor: '150W Gentle Acceleration Motor (12 km/h Kid-Safe Speed Cap)',
    motorType: 'Hub',
    torqueNm: 15,
    batteryWh: 180,
    batterySpec: '24V 7.5Ah Fire-Retardant Encased Lithium Battery Pack',
    rangeKm: 20,
    topSpeedKmH: 12,
    frameType: 'Universal',
    weightKg: 6.8,
    payloadKg: 50,
    brakes: 'Dual Electronic Motor Brake + Mechanical Rear Foot Fender Brake',
    gears: 'Single Speed Kid-Safe Drive',
    auCompliance: 'Australian Consumer Safety Standard AS/NZS 8124 Compliant',
    shortDescription: 'The safest introduction to scootering for kids. 3-wheel stability, intuitive lean-to-steer, kinetic LED glowing wheels, and a capped 12 km/h top speed.',
    description: 'Engineered specifically for Australian children aged 4 to 10 years, the GlideMini provides rock-solid 3-wheel balance so kids never wobble or tip over. The motor engages gently only after the child kicks off to 3 km/h, preventing sudden jolts. Includes magnetic LED light-up wheels that glow without batteries.',
    features: [
      'Stable 3-wheel tripod geometry prevents tip-overs and builds young rider confidence',
      'Intuitive lean-to-steer steering mechanism develops motor balance and coordination',
      'Speed-governed 12 km/h safety cap - safe for footpaths, parks, and school runs',
      'Kinetic LED flashing front wheels powered by motion - zero batteries required',
      'Height-adjustable T-bar handlebar with 3 locking positions (grows with your child)'
    ],
    tags: [
      'push scooter electric', 'electric foot scooter', 'cheap good e scooters', 'kick adult scooters', 'e scooter controller',
      'e scooter brand', 'e scooters for adults', 'recreational e scooters', 'e scooter adults', 'push scooter adults'
    ],
    sizeVariants: [
      { id: 'aqua', label: 'Aqua Marine / Lime', priceDelta: 0 },
      { id: 'coral', label: 'Coral Pink / Teal', priceDelta: 0 }
    ],
    recommendedAddOns: COMMON_ADDONS,
    faqs: [
      {
        question: 'What age and weight limit is the GlideMini Kids Scooter suitable for?',
        answer: 'The GlideMini is designed for children aged 4 to 10 years with rider weights up to 50kg. The 3-position adjustable T-bar handlebar accommodates children from 95cm to 135cm in height.'
      },
      {
        question: 'Does the scooter start moving automatically when the child presses the button?',
        answer: 'No. For child safety, the scooter employs a "kick-start safety sensor". The motor will only activate after the child manually kicks off to at least 3 km/h, preventing accidental throttle take-offs from a standstill.'
      },
      {
        question: 'How do the illuminated LED wheels work?',
        answer: 'The front wheels contain kinetic magnetic dynamo hubs. As the wheels spin, bright multi-colour LEDs light up automatically without needing any batteries or recharging.'
      },
      {
        question: 'How do children brake safely on the GlideMini?',
        answer: 'The scooter features dual stopping systems: an ergonomic handlebar thumb brake that eases motor power, plus an intuitive rear foot fender brake that kids naturally step on to stop immediately.'
      },
      {
        question: 'What safety compliance certifications does this kids scooter carry in Australia?',
        answer: 'The GlideMini is certified under AS/NZS 8124 Australian toy and recreational vehicle safety standards, featuring fire-retardant battery encasement and child-safe rounded edge engineering.'
      }
    ]
  },
  {
    id: 'sc-adults-glidex',
    name: 'GlideX Pro Urban Adults Dual-Brake Scooter',
    slug: 'glidex-pro-urban-adults-dual-brake-scooter',
    badge: 'Adult Commute',
    subtitle: 'High-payload 120kg adult commuter scooter with 10" pneumatic comfort tyres',
    category: 'scooters',
    categoryLabel: 'Scooters',
    subcategory: 'Adults Scooters',
    subcategoryId: 'scooters-adults',
    brand: 'GlideCity',
    price: 899,
    compareAtPrice: 1099,
    rating: 4.93,
    reviewsCount: 78,
    image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 16,
    motor: '350W High-Efficiency Front Hub Motor (25 km/h State-Compliant Cap)',
    motorType: 'Hub',
    torqueNm: 28,
    batteryWh: 468,
    batterySpec: '36V 13Ah LG High-Capacity Lithium-Ion Battery Pack',
    rangeKm: 45,
    topSpeedKmH: 25,
    frameType: 'Folding',
    weightKg: 14.5,
    payloadKg: 120,
    brakes: 'Front E-ABS Regenerative Brake + Rear Mechanical Disc Brake',
    gears: '3-Speed Electronic Eco / Standard / Sport Modes',
    auCompliance: 'Complies With Australian State Personal Mobility Device Regulations',
    shortDescription: 'The premier adult commuter scooter for Australian cities. 10-inch air tyres, dual disc braking, 45km range, and rapid 3-second folding.',
    description: 'Designed for adult city commuters seeking a rapid, cost-effective transit solution. The GlideX Pro features large 10-inch pneumatic tyres that glide over suburban tactile pavers and road cracks, a wide anti-slip deck for size 12+ shoes, and full compliance with state 25 km/h limits.',
    features: [
      'Heavy-duty aerospace aluminium frame tested to 120kg adult payload capacity',
      'Large 10-inch pneumatic tubeless tyres for plush ride comfort over bitumen and pavers',
      'Dual braking system: front E-ABS regenerative brake and rear mechanical disc brake',
      'Bright 2.5W high-mounted headlight and blinking rear brake light for night visibility',
      'Ultra-fast 3-second fold mechanism with heavy-duty safety latch for train transport'
    ],
    tags: [
      'folding electric scooter for adults', 'adults electric scooter', 'best e-scooters', 'motorized scooter for adults', 'adult escooter',
      'collapsible electric scooter for adults', 'electric scooter foldable adults', 'escooter for adults', 'foldable electric scooter for adults', 'folding electric scooters'
    ],
    sizeVariants: [
      { id: 'standard', label: 'Adult Standard (Rider up to 120kg)', priceDelta: 0 },
      { id: 'with-helmet', label: 'Includes AS/NZS 2063 Commuter Helmet', priceDelta: 49 }
    ],
    recommendedAddOns: COMMON_ADDONS,
    faqs: [
      {
        question: 'Is the GlideX Pro legal for adults to ride on Australian roads and paths?',
        answer: 'Yes. In Queensland, Western Australia, the ACT, Tasmania, and Victoria, personal mobility devices capped at 25 km/h with lights and bells are permitted on footpaths (up to 12 km/h) and shared paths / local roads (up to 25 km/h) with an approved bicycle helmet.'
      },
      {
        question: 'What is the real-world riding range for an 85kg adult rider?',
        answer: 'An 85kg adult riding on mixed urban terrain in Drive Mode (20 km/h) consistently achieves 38 to 45 kilometres per charge from the high-density 468Wh LG battery.'
      },
      {
        question: 'How easy is it to carry this scooter onto Australian trains and buses?',
        answer: 'The scooter folds in just 3 seconds into a compact 112cm x 43cm package weighing 14.5kg. The stem clips securely into the rear fender to form a sturdy carrying handle for train and bus commuting.'
      },
      {
        question: 'How do the 10-inch pneumatic tyres handle wet Australian asphalt?',
        answer: 'The 10-inch pneumatic tyres feature deep water-dispersal sipes and a wider contact patch than solid 8-inch rubber tyres, providing superior wet-weather grip and absorbing sidewalk cracks effortlessly.'
      },
      {
        question: 'What warranty is included for adult daily commuters?',
        answer: 'The GlideX Pro includes a 1-Year comprehensive Australian warranty on the frame, motor, electronics, and battery, backed by local technicians and Australian replacement parts dispatch.'
      }
    ]
  },
  {
    id: 'sc-accessories-lock',
    name: 'GlideShield Heavy Duty Scooter Lock & Bag Kit',
    slug: 'glideshield-heavy-duty-scooter-lock-bag-kit',
    badge: 'Scooter Gear',
    subtitle: 'Hardened anti-cut steel lock with waterproof EVA hard-shell handlebar storage bag',
    category: 'scooters',
    categoryLabel: 'Scooters',
    subcategory: 'Scooter Accessories',
    subcategoryId: 'scooters-accessories',
    brand: 'GlideCity',
    price: 119,
    compareAtPrice: 149,
    rating: 4.91,
    reviewsCount: 65,
    image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 28,
    motor: 'N/A (Accessory Kit)',
    motorType: 'Hub',
    torqueNm: 0,
    batteryWh: 0,
    batterySpec: 'N/A',
    rangeKm: 0,
    topSpeedKmH: 0,
    frameType: 'Universal',
    weightKg: 1.4,
    payloadKg: 10,
    brakes: 'Hardened Lock Shackle (Anti-Bolt Cutter)',
    gears: 'N/A',
    auCompliance: 'Australian Security Grade Hardened Steel Lock',
    shortDescription: 'The essential protection bundle for e-scooter owners. Heavy-duty anti-theft folding lock plus 3L waterproof EVA hard-shell front handlebar bag.',
    description: 'Designed specifically to fit the steering stems and handlebars of all electric and kick scooters. The kit includes an anti-cut hardened steel folding lock with frame mounting holster, plus an aerodynamic 3-litre waterproof hard-shell bag to hold chargers, phones, keys, and tyre inflators.',
    features: [
      'Hardened heat-treated steel folding lock resists angle grinders, saws, and bolt cutters',
      'Includes scooter stem mounting bracket with rubber dampeners to prevent rattling',
      '3-Litre waterproof EVA hard-shell bag protects phone, wallet, and charger from downpours',
      'Four-point velcro mounting strap system compatible with all round and oval scooter stems',
      'Reflective safety piping on bag exterior increases nighttime rider visibility'
    ],
    tags: [
      'electric scooters top rated', 'foldable scooters', 'e scooter controller', 'best e-scooters', 'e scooter brand',
      'recreational e scooters', 'electric scooter foldable adults', 'foldable electric scooter for adults', 'push scooter electric', 'electric foot scooter'
    ],
    sizeVariants: [
      { id: 'standard', label: 'Lock + 3L Hard Shell Bag Bundle', priceDelta: 0 }
    ],
    recommendedAddOns: COMMON_ADDONS,
    faqs: [
      {
        question: 'Will the GlideShield lock and bag kit fit on any brand of electric scooter?',
        answer: 'Yes. The versatile 4-strap mounting system and rubber-padded lock bracket are universally compatible with all popular e-scooters including Segway-Ninebot, Xiaomi, GlideCity, Kaabo, and Inokim.'
      },
      {
        question: 'How resistant is the folding lock against bolt cutters and theft attempts?',
        answer: 'The lock links are made from 5mm hardened carbon alloy steel with tight-tolerance rivets, engineered specifically to resist 14-tonne hydraulic bolt cutters and manual hacksaws.'
      },
      {
        question: 'Is the 3-litre handlebar bag completely waterproof in heavy rain?',
        answer: 'Yes. The bag is molded from water-repellent PU/EVA composite with a sealed waterproof PU zipper that keeps rain, road spray, and dirt away from your phone and electrical charger.'
      },
      {
        question: 'How many security keys are included with the lock?',
        answer: 'The kit includes three laser-cut high-security keys with a unique registration code that allows easy key duplication if misplaced.'
      },
      {
        question: 'What warranty is provided on this scooter accessory kit?',
        answer: 'The GlideShield lock and bag kit is backed by a 2-Year Australian replacement warranty against any manufacturing defects or mechanism jamming.'
      }
    ]
  },
  {
    id: 'acc-kryptonite-newyork',
    name: 'Kryptonite New York Diamond Standard E-Bike U-Lock',
    slug: 'kryptonite-new-york-diamond-standard-ebike-lock',
    badge: 'Diamond Security',
    subtitle: '16mm hardened MAX-Performance steel shackle for high-value e-bike protection',
    category: 'accessories',
    categoryLabel: 'Accessories',
    subcategory: 'Bike Locks & Security',
    subcategoryId: 'accessories-locks',
    brand: 'Kryptonite',
    price: 149,
    compareAtPrice: 189,
    rating: 4.98,
    reviewsCount: 140,
    image: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 30,
    motor: 'N/A',
    motorType: 'Hub',
    torqueNm: 0,
    batteryWh: 0,
    batterySpec: 'N/A',
    rangeKm: 0,
    topSpeedKmH: 0,
    frameType: 'Universal',
    weightKg: 2.06,
    payloadKg: 0,
    brakes: '16mm Hardened Steel Shackle',
    gears: 'N/A',
    auCompliance: 'Sold Secure Diamond Rated Bicycle Lock',
    shortDescription: 'The gold standard in bicycle security. 16mm hardened MAX-Performance steel shackle resists bolt cutters, leverage attacks, and angle grinders.',
    description: 'Designed to protect premium electric bicycles in high-theft urban hubs. Sold Secure Diamond certified with a double deadbolt design that requires thieves to make two cuts through the 16mm hardened steel shackle before releasing the bicycle.',
    features: [
      '16mm hardened MAX-Performance steel shackle resists cutting and leverage attacks',
      'Patent-pending hardened double deadbolt design gives extensive holding power',
      'Higher security disc-style cylinder is pick and drill resistant with dust cover',
      'Protective vinyl coating prevents scratches on painted bicycle frames',
      'Includes 3 stainless steel keys (one lighted with high intensity LED bulb)'
    ],
    tags: [
      'e bike lighting', 'electric bike with 2 child seats australia', 'e-bike front light', 'electric bike light bar', 'e bike with kids seat',
      'electric bike pedals', 'e bike headlight', 'seat e bike', 'electric bicycle seats', 'e bike pedals'
    ],
    sizeVariants: [
      { id: 'standard', label: 'Standard (10.2cm x 20.3cm)', priceDelta: 0 }
    ],
    recommendedAddOns: [],
    faqs: [
      {
        question: 'Why do Australian insurance companies require Sold Secure Diamond locks for e-bikes?',
        answer: 'Sold Secure Diamond is the highest independent security rating for bicycle locks in the world. Leading Australian bicycle insurers require Diamond-rated locks like the Kryptonite New York for claims coverage on electric bikes valued over $2,000.'
      },
      {
        question: 'Can bolt cutters cut through this 16mm hardened steel shackle?',
        answer: 'No. Manual bolt cutters cannot generate the leverage required to breach the 16mm special heat-treated MAX-Performance steel shackle.'
      },
      {
        question: 'How does the double deadbolt design stop twist attacks?',
        answer: 'The locking mechanism secures both ends of the U-shackle simultaneously. Unlike cheap locks that release when cut on one side, thieves must cut completely through both sides to remove this lock.'
      },
      {
        question: 'What happens if I lose my keys in Australia?',
        answer: 'The lock includes Kryptonite\'s Key Safe Program. When you register your key number online, Kryptonite replaces your first two lost keys free of charge anywhere in Australia.'
      },
      {
        question: 'What warranty is included with this Kryptonite lock?',
        answer: 'Kryptonite provides a lifetime warranty on the mechanical lock cylinder and body against defects in materials and workmanship.'
      }
    ]
  }
];

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
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1502744688674-c619d3f86c9e?auto=format&fit=crop&w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'folding',
    name: 'Folding E-Bike',
    slug: 'folding-e-bike',
    h1: 'Folding E-Bikes for Sale Australia',
    shortDesc: 'Ultra-compact folding designs for train commuting, caravans & apartments.',
    subcategories: ['Compact 20" Folders', 'Caravan & Grey Nomad Edition', 'Lightweight Alloy Folders'],
    image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cruiser',
    name: 'Electric Cruiser Bikes',
    slug: 'electric-cruiser-bikes',
    h1: 'Electric Cruiser Bikes for Sale Australia',
    shortDesc: 'Relaxed upright geometry, plush comfort saddles, and beachside cruising.',
    subcategories: ['Vintage Step-Through Cruisers', 'Beach Cruiser Electric', 'Comfort City Cruisers'],
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'fat-tyre',
    name: 'Fat Tyre Electric Bicycle',
    slug: 'fat-tyre-electric-bicycle',
    h1: 'Fat Tyre Electric Bicycles for Sale Australia',
    shortDesc: 'Float over soft Australian beach sand, mud, snow, and rugged gravel.',
    subcategories: ['All-Terrain 4.0 Fat Cruisers', 'Dual Suspension Fat Bikes', 'Beach & Bush Explorers'],
    image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cargo',
    name: 'Electric Cargo Bikes',
    slug: 'electric-cargo-bikes',
    h1: 'Electric Cargo Bikes for Sale Australia',
    shortDesc: 'Heavy-payload carriers built to carry two children or heavy deliveries.',
    subcategories: ['Longtail Family Carriers', 'Front Loader Box Bikes', 'Commercial Delivery Fleets'],
    image: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'road',
    name: 'Electric Road Bikes',
    slug: 'electric-road-bikes',
    h1: 'Electric Road Bikes for Sale Australia',
    shortDesc: 'Lightweight drop-bar frames with natural feeling pedal assist for endurance road riding.',
    subcategories: ['Endurance Electric Road', 'Aero Carbon E-Road', 'Gravel & All-Road eBikes'],
    image: 'https://images.unsplash.com/photo-1502744688674-c619d3f86c9e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'commuter',
    name: 'Electric Commuter Bikes',
    slug: 'electric-commuter-bikes',
    h1: 'Electric Commuter Bikes for Sale Australia',
    shortDesc: 'Reliable, efficient daily transportation with mudguards, racks & integrated lights.',
    subcategories: ['Step-Through Urban Commuter', 'Crossbar Sport Commuter', 'Belt-Drive Low-Maintenance'],
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=600&q=80'
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
      image: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&w=600&q=80',
      itemCount: 14
    },
    {
      id: 'parts-brakes',
      title: 'Brakes & Rotors',
      subtitle: 'Hydraulic Disc Pads & Heat Dissipating Discs',
      desc: 'Shimano, Tektro, and Zoom resin/metallic pads, 180mm & 203mm rotors & mineral bleed kits.',
      image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=600&q=80',
      itemCount: 12
    },
    {
      id: 'parts-chains',
      title: 'Chains & Drivetrains',
      subtitle: 'High Torque Reinforced E-Bike Chains',
      desc: 'KMC e-Series 9/10/11-speed reinforced chains, MissingLink connectors & wide-range cassettes.',
      image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=600&q=80',
      itemCount: 10
    },
    {
      id: 'parts-pedals-grips',
      title: 'Pedals, Grips & Saddles',
      subtitle: 'Ergonomic Cockpit & Pedalling Efficiency',
      desc: 'Ergon GP1 winged grips, high-grip flat alloy pedals & anatomical relief gel saddles.',
      image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=600&q=80',
      itemCount: 16
    },
    {
      id: 'parts-workshop',
      title: 'Workshop & Maintenance',
      subtitle: 'Chain Wear Gauges, Multi-Tools & Lubes',
      desc: 'Park Tool torque gauges, hydraulic pad spreaders, e-bike synthetic lube & cleaners.',
      image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=600&q=80',
      itemCount: 18
    }
  ]
};

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
    answer: 'We stock premium Australian and international electric bicycle brands including Apex Mobility, Outback Electric, MetroFold, TrailPeak Enduro, Hauler Cargo, GlideCity Scooters, and Schwalbe tyres. All brands are vetted for battery cell safety, high-torque durability, and Australian road compliance.'
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

export const BRANDS_DATA: BrandInfo[] = [
  {
    id: 'apex-mobility',
    name: 'Apex Mobility',
    tagline: 'Australian Urban Pedelec Excellence',
    country: 'Australia / Engineered in Melbourne',
    founded: '2021',
    warranty: '2 Years Comprehensive AU Warranty',
    compliance: 'EN 15194 Australian Standard Certified',
    logo: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=200&q=80',
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800&q=80',
    description: 'Apex Mobility pioneered whisper-silent 250W commuter e-bikes with hidden down-tube Samsung battery packs and torque-sensing bottom brackets designed for Melbourne and Sydney streets.',
    signatureModels: ['Apex Commuter Urban Pro 250W', 'Apex Step-Through Belt City'],
    keyStrengths: [
      'Whisper-silent Bafang & Bosch integrated motor hubs',
      'Grade-A Samsung 21700 lithium cells with Smart BMS protection',
      'Ultra-low step-through ergonomics with hydroformed 6061 alloy'
    ],
    rating: 4.95,
    reviewsCount: 380
  },
  {
    id: 'outback-electric',
    name: 'Outback Electric',
    tagline: 'Rugged All-Terrain & Beach Pioneers',
    country: 'Australia / Designed in Queensland',
    founded: '2019',
    warranty: '2 Years Frame & 1 Year Dual Battery',
    compliance: 'EN 15194 Certified with Off-Road Dual Mode',
    logo: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=200&q=80',
    image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=800&q=80',
    description: 'Born on the Sunshine Coast, Outback Electric engineers heavy-duty fat tyre cruisers capable of navigating sandy shores, red desert tracks, and corrugated rural trails with massive 840Wh battery reserves.',
    signatureModels: ['Outback Beast 4.0 Fat Tyre Cruiser', 'Outback DuneMaster Dual Motor'],
    keyStrengths: [
      '80Nm high-torque climbing power for sand & steep hills',
      'Heavy-duty puncture-shield 26x4.0" Kenda all-terrain tyres',
      'Dual hydraulic lock-out front and rear coil suspension'
    ],
    rating: 4.93,
    reviewsCount: 295
  },
  {
    id: 'hauler-logistics',
    name: 'Hauler Logistics',
    tagline: 'Heavy-Duty Commercial Cargo & Family Transporters',
    country: 'Australia / Engineered in Sydney',
    founded: '2020',
    warranty: '3 Years Frame & 2 Years Electrical',
    compliance: 'EN 15194 Certified Pedelec Standard',
    logo: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=200&q=80',
    image: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=800&q=80',
    description: 'Hauler replaces the family car and delivery vans with longtail e-cargo bikes certified for 210kg payloads, dual child safety seats, and courier logistics insulated box setups.',
    signatureModels: ['Hauler Cargo Max Longtail', 'Hauler FleetPro Courier 120L'],
    keyStrengths: [
      'Industrial 210kg payload capacity with low centre of gravity',
      'Dual auto-switching Samsung batteries providing 120km range',
      'Commercial grade Enviolo stepless transmission & 4-piston disc brakes'
    ],
    rating: 4.97,
    reviewsCount: 210
  }
];

export const REVOLUTIONARY_SLIDES: RevolutionarySlide[] = [
  {
    id: 'rev-bms',
    brand: 'Apex Mobility',
    badge: 'Revolutionary Tech 01',
    headline: 'Next-Generation Smart BMS & 21700 Thermal Shield',
    subheadline: 'Zero degradation architecture tested in 45°C Australian summer heat',
    description: 'Apex’s patented Battery Management System continuously balances cell impedance in real time. Features quadruple safety cut-offs preventing overcharge, short-circuit, and heat buildup for 1,000+ recharge cycles.',
    techHighlight: 'Samsung 21700 Grade-A Cells • IP67 Rain Sealed • 85km Real-World Range',
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=1200&q=80',
    categoryId: 'commuter'
  },
  {
    id: 'rev-torque',
    brand: 'Outback Electric',
    badge: 'Revolutionary Tech 02',
    headline: 'Instant 80Nm Torque Sensor for Deep Beach Sand',
    subheadline: 'Intelligent cadence-torque algorithm detects gradient shifts within 10 milliseconds',
    description: 'Conventional hub motors lag when you hit soft sand or steep inclines. Outback’s dynamic sensor feeds raw instantaneous power proportional to your pedal pressure, eliminating wheel spin on loose Australian gravel.',
    techHighlight: '80Nm Peak Torque • 26x4.0" Puncture Shield • Dual Hydraulic Shocks',
    image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=1200&q=80',
    categoryId: 'fat-tyre'
  },
  {
    id: 'rev-cargo',
    brand: 'Hauler Logistics',
    badge: 'Revolutionary Tech 03',
    headline: 'Dual 960Wh Auto-Switching Battery Architecture',
    subheadline: 'Replaces second family cars and commercial delivery vans nationwide',
    description: 'Engineered for logistics couriers and suburban parents. The intelligent load-balancer drains both batteries evenly to preserve cell lifespan, delivering up to 120km of hill-conquering power even with 210kg payloads.',
    techHighlight: '210kg Payload Capacity • Dual Yepp Child Seats Ready • 4-Piston Hydraulic Discs',
    image: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=1200&q=80',
    categoryId: 'cargo'
  },
  {
    id: 'rev-carbon',
    brand: 'TrailPeak Enduro',
    badge: 'Revolutionary Tech 04',
    headline: 'Toray T700 Monocoque Carbon Gravity Frame',
    subheadline: 'Ultra-light 22.8kg downhill rigidity damping Australian trail vibrations',
    description: 'Manufactured with aerospace-grade Japanese carbon fibre, TrailPeak combines 150mm plush air damping with an integrated mid-drive motor positioned at the lowest centre of gravity for supreme downhill stability.',
    techHighlight: 'Toray T700 Carbon • Brose 85Nm Mid-Drive • SRAM 12-Speed Eagle',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80',
    categoryId: 'emtb'
  }
];

