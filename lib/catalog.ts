import type { Product } from '@/lib/types';
import { CATALOG_KEYWORDS, type NodeKeywords } from '@/lib/catalog-keywords';
import { LANDING_NODES } from '@/lib/landing-pages';
import { KIDS_NODES } from '@/lib/kids-pages';
import { BRAND_NODES } from '@/lib/brand-pages';
import { BRAND_NODES_MORE } from '@/lib/brand-pages-more';

/**
 * Category tree for the /ebikes and /scooters hubs.
 * - Every node with its own keyword data gets a real, crawlable URL (hub, 7 categories, 4 eMTB subcategories, 1 scooter subcategory).
 * - Subcategories only get their own URL when the Semrush bank supports them (now: all of them)
 *   are rendered as in-page sections on their parent, not as thin standalone pages.
 * - Keywords come from lib/catalog-keywords.ts (generated). Search terms for BOTH electric and non-electric bikes are used on purpose.
 */

export type NodeKind = 'hub' | 'category' | 'sub' | 'landing';

export interface FaqItem { q: string; a: string }
export interface GuideSection { heading: string; body: string }

export interface CatalogNode {
  id: string;
  kind: NodeKind;
  path: string;
  name: string;
  navLabel: string;
  title: string;
  description: string;
  h1: string;
  intro: string[];
  bridge: GuideSection; // speaks to people searching the non-electric term
  guides: GuideSection[];
  faqs: FaqItem[];
  parent?: string;
  children?: string[];
  /** In-page sections (subcategories that have no keyword data and therefore no standalone URL) */
  sections?: { id: string; heading: string; blurb: string; anchor: string }[];
  matches: (p: Product) => boolean;
  /** Show at most this many products (landing pages) */
  productLimit?: number;
  /** Heading above the product grid (defaults to "Shop <name>") */
  productsHeading?: string;
  /** Availability-enquiry text shown under the products */
  enquiry?: string;
  /** Extra internal links shown under the guides */
  links?: { label: string; href: string }[];
  keywords: NodeKeywords;
}

const kw = (id: string): NodeKeywords => CATALOG_KEYWORDS[id];
const inCat = (cat: string) => (p: Product) => p.category === cat;

export const SITE_URL = 'https://ebikesforsale.com.au';

const NODES: Omit<CatalogNode, 'keywords'>[] = [
  // ───────────────────────────── E-BIKES HUB ─────────────────────────────
  {
    id: 'hub',
    kind: 'hub',
    path: '/ebikes',
    name: 'E-Bikes',
    navLabel: 'All E-Bikes',
    title: 'Best Electric Bike Australia | Shop E-Bikes by Category',
    description:
      'Find the best electric bike in Australia: mountain, folding, cruiser, fat tyre, cargo, road and commuter e-bikes. 250W EN15194 models with fast dispatch.',
    h1: 'Best Electric Bike Australia: Shop E-Bikes by Category',
    intro: [
      'Choosing the best electric bike in Australia starts with how you ride. Every e-bike in this range is a 250W, 25 km/h pedal-assist model built to the EN 15194 standard, so the real decision is the frame and motor that suit your riding: trails, trains, sand, school runs, speed or the daily commute.',
      'Pick a category below. If you are still weighing an ebike against a regular bicycle, the guide further down explains what changes and what stays the same.',
    ],
    bridge: {
      heading: 'Electric bicycle or normal bike: what changes?',
      body:
        'An electric bicycle rides like a regular bike. The motor only helps while you pedal and stops assisting at 25 km/h, so you keep the exercise and the freedom of a bike while hills, headwinds and heavy loads feel lighter. If you have been searching for mountain bikes, folding bikes or cargo bikes, each category here has an electric version of the same frame style.',
    },
    guides: [
      {
        heading: 'Electric bike, ebike or electric bicycle: is there a difference?',
        body:
          'No. "Electric bike", "e-bike", "ebike" and "electric bicycle" all describe a bicycle with a battery-powered motor that assists your pedalling. In Australia a compliant e-bike is limited to 250W continuous motor power with assistance cutting out at 25 km/h. State rules differ and are changing in 2026, so check your state authority before riding.',
      },
      {
        heading: 'How to choose an e bike in Australia',
        body:
          'Start with where you ride: rough trails suit a mountain e-bike, trains and small flats suit a folder, sand and gravel suit a fat tyre, and school runs suit a cargo bike. Then check the battery (Wh), the motor type (mid-drive for steep climbs, hub for flat commuting), the weight, and whether the brakes are hydraulic discs.',
      },
    ],
    faqs: [
      { q: 'What is the best electric bike in Australia?', a: 'It depends on how you ride. Mountain riders want a mid-drive eMTB, commuters a step-through with a rear rack, and apartment dwellers a folder. Every bike in our range is 250W and EN 15194 compliant, so choose by frame style and battery size.' },
      { q: 'What is the difference between an ebike and an electric bicycle?', a: 'Nothing: they are different names for the same thing, a bicycle with a motor that assists your pedalling. The terms electric bike, e-bike, ebike and electric bicycle are used interchangeably.' },
      { q: 'Are e-bikes legal to ride in Australia?', a: 'Compliant pedal-assist e-bikes (EN 15194: 250W, assist cutting out at 25 km/h) can be ridden on roads and paths, but rules differ by state and are changing in 2026. Queensland, for example, now requires a licence or learner permit. Check your state authority first.' },
      { q: 'How far can an electric bike go on one charge?', a: 'Our range lists between 60 km and 120 km per charge depending on the model, battery size, rider weight, terrain and assist level. Larger batteries and mid-drive motors generally go further.' },
      { q: 'How much does an electric bike cost in Australia?', a: 'In our range prices run from $1,499 for a folding e-bike to $4,999 for a carbon enduro eMTB. CHOICE reports a typical well-equipped e-bike at around $2,000 to $3,500.' },
    ],
    children: ['emtb', 'folding', 'cruiser', 'fat-tyre', 'cargo', 'road', 'commuter'],
    matches: () => false,
  },

  // ───────────────────────────── ELECTRIC MOUNTAIN BIKE ─────────────────────────────
  {
    id: 'emtb',
    kind: 'category',
    path: '/ebikes/electric-mountain-bike',
    name: 'Electric Mountain Bikes',
    navLabel: 'Electric Mountain Bike',
    title: 'Electric Mountain Bike Australia | eMTB Hardtail to Enduro',
    description:
      'Shop an electric mountain bike in Australia: hardtail, dual suspension, enduro and trail eMTBs plus a 24-inch youth model. 250W mid-drive power, EN15194.',
    h1: 'Electric Mountain Bike Range: Hardtail, Dual Suspension & Enduro eMTBs',
    intro: [
      'An electric mountain bike (eMTB) adds a 250W motor to a trail-ready frame, so climbs get easier without changing how the bike descends. Our range covers five styles: hardtail, dual suspension, enduro, trial suspension and a 24-inch youth model.',
      'The adult eMTBs use mid-drive motors with 85 Nm to 95 Nm of torque and batteries from 630 Wh to 750 Wh, which is enough for long fire-trail days. Every bike is pedal-assist only and cuts out at 25 km/h.',
    ],
    bridge: {
      heading: 'Mountain bikes, MTB bikes or eMTB: which should you buy?',
      body:
        'If you have been comparing mountain bikes for sale or mtb bikes, an eMTB is the same kind of machine with a motor: it keeps the suspension and geometry and adds pedal assist, so steep climbs and long days are easier. A hardtail suits smoother trails, dual suspension suits rough ground, and the enduro model is for riders chasing gravity-style descents. Some riders search for a mountain e cycle or an ebike mtb: it is the same type of bike.',
    },
    guides: [
      {
        heading: 'Hardtail vs dual suspension e-bike',
        body:
          'A hardtail has front suspension only, which keeps it lighter and simpler: our Summit Hardtail weighs 21.2 kg. Dual suspension adds a rear shock for traction and comfort on rough ground, at a slightly higher weight (the FlowTrail Pro is 23.4 kg) and price.',
      },
      {
        heading: 'Choosing an emtb australia riders can rely on',
        body:
          'Look at motor torque for climbing, battery capacity for range, and suspension travel for the terrain. Mid-drive motors from Brose, Bafang and Shimano put power through the drivetrain for natural-feeling climbs. Always confirm trail access rules with the local land manager before riding.',
      },
    ],
    faqs: [
      { q: 'What is the difference between an electric mountain bike and a normal mountain bike?', a: 'An electric mountain bike has a battery and a 250W motor that assists your pedalling up to 25 km/h. The frame, suspension and brakes work like a regular mountain bike, but the weight is higher and climbs are easier.' },
      { q: 'Are eMTBs allowed on mountain bike trails in Australia?', a: 'Access depends on the land manager and the individual trail. Some trails permit pedal-assist eMTBs, some restrict them. Check local signage and the land manager rules before you ride.' },
      { q: 'How far does an electric mountain bike go on one charge?', a: 'Our adult eMTBs list 95 to 110 km per charge. Real range falls with steep terrain, heavy riders and high assist levels, and rises with a larger battery and lower assist.' },
      { q: 'Should I buy a hardtail or dual suspension eMTB?', a: 'Choose a hardtail for lighter weight, lower cost and smoother trails. Choose dual suspension for rough, technical trails where rear-wheel traction and comfort matter more.' },
      { q: 'Can kids ride an electric mountain bike?', a: 'Our 24-inch youth eMTB has a lower 378 Wh battery and a 16.8 kg frame. Age rules for e-bikes differ by state and are changing, so check your state requirements and always use a certified helmet.' },
    ],
    children: ['emtb-hardtail', 'emtb-dual', 'emtb-enduro', 'emtb-trail', 'emtb-kids'],
    matches: inCat('emtb'),
  },
  {
    id: 'emtb-hardtail',
    kind: 'sub',
    parent: 'emtb',
    path: '/ebikes/electric-mountain-bike/hardtail',
    name: 'Electric Hardtail Mountain Bikes',
    navLabel: 'Electric Hardtail Mountain Bikes',
    title: 'Electric Hardtail Mountain Bike | Hardtail eMTB Australia',
    description:
      'Shop an electric hardtail mountain bike in Australia: lightweight alloy frame, 95 Nm mid-drive motor and 120 mm air fork. 250W, EN15194 compliant.',
    h1: 'Electric Hardtail Mountain Bikes',
    intro: [
      'An electric hardtail mountain bike pairs a front suspension fork with a rigid rear frame and a 250W motor. It is the simplest, lightest way into eMTB riding, with fewer moving parts to service and a lower price than full suspension.',
      'Our Summit Hardtail uses a Bafang M500 mid-drive with 95 Nm of torque, a 720 Wh battery and a 120 mm air fork, in a 21.2 kg aluminium frame.',
    ],
    bridge: {
      heading: 'Hardtail mountain bikes vs an electric hardtail',
      body:
        'If you are comparing hardtail mountain bikes for sale, the electric version keeps the same frame layout and adds pedal assist for the climbs. Hardtail MTB riders often find the motor lets them ride longer and steeper without fatigue.',
    },
    guides: [
      { heading: 'Who is a hardtail eMTB best for?', body: 'Riders on fire trails, rail trails and mixed commutes get the most from a hardtail: it climbs efficiently, is easy to maintain and costs less than dual suspension. Rough, technical descents are where full suspension pulls ahead. Shoppers who search hardtail mtb for sale will find the same frame style here, with a motor added.' },
    ],
    faqs: [
      { q: 'Is an electric hardtail mountain bike good for beginners?', a: 'Yes. It has fewer parts than a full-suspension bike, so it is simpler to maintain, and the motor flattens hills while you build confidence.' },
      { q: 'How heavy is an electric hardtail mountain bike?', a: 'Our Summit Hardtail weighs 21.2 kg including the motor and battery, lighter than the dual suspension models in the range.' },
      { q: 'Are cheap hardtail mountain bikes with a motor worth it?', a: 'Check battery brand, brake quality and warranty before paying less. Very low prices often mean smaller batteries and weaker components.' },
    ],
    matches: (p) => p.category === 'emtb' && /hardtail/.test(p.slug),
  },
  {
    id: 'emtb-dual',
    kind: 'sub',
    parent: 'emtb',
    path: '/ebikes/electric-mountain-bike/dual-suspension',
    name: "Dual Suspension eMTB's",
    navLabel: "Dual Suspension eMTB's",
    title: 'Dual Suspension Electric Mountain Bike | Full Sus eMTB',
    description:
      'Shop a dual suspension electric mountain bike in Australia: 150 mm front and rear travel, 90 Nm Brose mid-drive and a 750 Wh battery. EN15194 compliant.',
    h1: 'Dual Suspension Electric Mountain Bikes',
    intro: [
      'A dual suspension electric mountain bike adds a rear shock to the fork, keeping both wheels planted over roots, rocks and braking bumps. With a 250W motor on top, it is the most capable all-round eMTB for technical trails.',
      'The FlowTrail Pro runs 150 mm of front and rear air suspension with a Brose S Mag mid-drive (90 Nm) and a 750 Wh battery, listed at up to 110 km per charge.',
    ],
    bridge: {
      heading: 'Full suspension and dual suspension e-bikes explained',
      body:
        'Full suspension, full sus and dual suspension all mean the same thing: suspension at both ends. If you are searching dual suspension mtb for sale, the electric version gives you the same grip with motor help on the way back up. An electric full sus mountain bike and a full suspension e mtb are simply other names for the same machine.',
    },
    guides: [
      { heading: 'Dual suspension or hardtail?', body: 'Pick dual suspension for rough descents, long days and rider comfort. Pick a hardtail if you ride smoother trails and prefer lower weight, lower cost and less maintenance.' },
    ],
    faqs: [
      { q: 'What does dual suspension mean on an e-bike?', a: 'It means the bike has a front fork and a rear shock, so both wheels absorb impacts. This improves traction and comfort on rough trails.' },
      { q: 'Is a full suspension electric bicycle harder to maintain?', a: 'It has more pivots, bearings and a shock to service, so budget for periodic maintenance. Regular servicing keeps the rear suspension working well.' },
      { q: 'How far does a dual suspension ebike go?', a: 'The FlowTrail Pro lists up to 110 km per charge on its 750 Wh battery. Steep terrain and high assist levels reduce this.' },
    ],
    matches: (p) => p.category === 'emtb' && /flowtrail|dual-suspension/.test(p.slug),
  },
  {
    id: 'emtb-enduro',
    kind: 'sub',
    parent: 'emtb',
    path: '/ebikes/electric-mountain-bike/enduro',
    name: "Enduro Dual Suspension eMTB's",
    navLabel: "Enduro Dual Suspension eMTB's",
    title: 'Enduro eMTB Australia | Downhill Mountain Bike Alternative',
    description:
      'Looking for a downhill mountain bike? Shop an enduro eMTB in Australia: carbon frame, 150 mm Fox suspension and 85 Nm mid-drive. 250W, EN15194 compliant.',
    h1: 'Enduro Dual Suspension eMTBs: The Downhill Mountain Bike Alternative',
    intro: [
      'If you are shopping for a downhill mountain bike, an enduro eMTB is the electric alternative: long-travel suspension for steep, rough descents with a motor to get you back to the top without a shuttle.',
      'The TrailPeak Enduro has a full carbon frame, 150 mm Fox suspension, a Brose / Bafang M510 mid-drive (85 Nm) and a 720 Wh battery in a 22.8 kg package. It is pedal-assist only and cuts out at 25 km/h.',
    ],
    bridge: {
      heading: 'Downhill bike, downhill MTB or enduro eMTB?',
      body:
        'A dedicated downhill bike is built for lift-served runs and is not designed to pedal uphill. An enduro eMTB trades some travel for pedalling efficiency and motor help, so you can ride the climb and the descent on one bike. Riders searching downhill mtb or downhill cycle options, or comparing mtb downhill bikes with an affordable downhill mtb, often find enduro is the more versatile choice.',
    },
    guides: [
      { heading: 'What is enduro riding?', body: 'Enduro combines timed descents with untimed climbs. Bikes need strong suspension, a stable geometry and enough pedalling efficiency to climb, which is exactly where a mid-drive motor helps.' },
    ],
    faqs: [
      { q: 'Is an enduro eMTB the same as a downhill mountain bike?', a: 'No. Downhill bikes have more travel and are designed for descending only. Enduro eMTBs have slightly less travel but can climb with motor assist.' },
      { q: 'Can I use an enduro eMTB at a bike park?', a: 'Park rules vary and some restrict e-bikes on lifts or trails. Check with the venue before you go.' },
      { q: 'Why choose a carbon frame?', a: 'Carbon is lighter and stiffer than aluminium, which helps the bike climb and handle well. It costs more, which is why this model sits at the top of our range.' },
    ],
    matches: (p) => p.category === 'emtb' && /enduro/.test(p.slug),
  },
  {
    id: 'emtb-trail',
    kind: 'sub',
    parent: 'emtb',
    path: '/ebikes/electric-mountain-bike/trial-suspension',
    name: "Trial Suspension eMTB's",
    navLabel: "Trial Suspension eMTB's",
    title: 'Electric Trail Bicycle | Trial Suspension eMTB Australia',
    description:
      'Shop an electric trail bicycle in Australia: trial and trail suspension eMTB with a Shimano EP8 85 Nm mid-drive and 630 Wh battery. 250W, EN15194 compliant.',
    h1: 'Trial Suspension eMTBs (Electric Trail Bicycles)',
    intro: [
      'An electric trail bicycle is built for varied off-road riding: climbs, rolling singletrack and technical sections. Our trial suspension eMTB has precision suspension tuned for control at lower speeds and on tight trails.',
      'The Alpine Trial Suspension Pro uses a Shimano EP8 mid-drive (85 Nm), a 630 Wh battery and 29-inch wheels, listed at up to 100 km per charge in a 22.1 kg frame.',
    ],
    bridge: {
      heading: 'Off-road electric bikes for Australian trails',
      body:
        'If you searched for an off road electric bike australia riders can rely on, or an off roading electric bike for fire trails and gravel, a trail-focused eMTB is the right starting point. It is the electric version of all mountain mtb bikes, with pedal assist to keep climbs manageable. Check local trail access rules before riding.',
    },
    guides: [
      { heading: 'Trail suspension, trial suspension: what is the difference?', body: 'Trail bikes balance climbing and descending for general off-road riding. Trial-style tuning favours control and precision at low speed. Our Alpine model is tuned for both trail and technical riding. An electric trail bike australia riders choose for mixed terrain should balance climbing power with control.' },
    ],
    faqs: [
      { q: 'What is an electric trail bicycle?', a: 'It is an e-bike designed for mixed off-road terrain, with suspension and a mid-drive motor tuned for climbing and technical control.' },
      { q: 'Is a Shimano EP8 motor good?', a: 'The EP8 is a widely used mid-drive with 85 Nm of torque, known for smooth, natural-feeling assistance on climbs.' },
      { q: 'Can I ride an off road electric bike on any trail?', a: 'No. Trail access depends on the land manager and local rules. Always check before you ride.' },
    ],
    matches: (p) => p.category === 'emtb' && /alpine|trial/.test(p.slug),
  },

  // ───────────────────────────── FOLDING E-BIKE ─────────────────────────────
  {
    id: 'folding',
    kind: 'category',
    path: '/ebikes/folding-e-bike',
    name: 'Folding E-Bikes',
    navLabel: 'Folding E-Bike',
    title: 'Folding E Bike Australia | Compact Foldable Electric Bikes',
    description:
      'Shop a folding e bike in Australia: a 17.8 kg compact foldable electric bike that folds in 10 seconds for trains, boots and apartments. 250W, EN15194.',
    h1: 'Folding E Bike: Compact Foldable Electric Bikes',
    intro: [
      'A folding e bike gives you a full-size ride that shrinks for trains, car boots, caravans and small apartments. The MetroFold Ultra Compact has 20-inch wheels, a 250W motor and a 360 Wh battery, and folds in about 10 seconds.',
      'At 17.8 kg it is one of the lightest bikes in our range, with a listed range of up to 60 km, which suits most daily commutes with a mid-day charge.',
    ],
    bridge: {
      heading: 'Looking for the best folding bikes? Why go electric',
      body:
        'Searches for the best folding bikes, a fold bike or a collapsible bicycle usually come down to space and portability. An electric folder adds pedal assist to the same compact frame, so small wheels and longer rides feel easier. A foldable e bicycle is also easier to carry up stairs than a full-size e-bike.',
    },
    guides: [
      { heading: 'What to check on a foldable electric bike', body: 'Look at folded size and weight, battery capacity, and how secure the hinge feels. A 250W motor and hydraulic or good mechanical brakes matter more than extra gears for city use. Lists of collapsible bicycles and the best fold up electric bike usually rank on weight and folded size, so compare those two first.' },
      { heading: 'Folding e-bikes and public transport', body: 'Many operators allow folded bikes, but battery and bike rules differ by state and operator. In Victoria, converted e-bikes are not allowed on trains, so choose a factory-built folder and check your operator first.' },
    ],
    faqs: [
      { q: 'What is the best folding e bike for commuting?', a: 'Choose a light frame (under about 20 kg), a 250W motor, and a battery that matches your daily distance. The MetroFold weighs 17.8 kg and lists up to 60 km per charge.' },
      { q: 'How long does it take to fold a foldable electric bike?', a: 'The MetroFold folds in around 10 seconds once you are familiar with the latches.' },
      { q: 'Can I take a collapsible e-bike on a train?', a: 'Often yes when folded, but rules vary by operator and state. Check with your transport operator before travelling.' },
      { q: 'Are small-wheel e-bikes stable?', a: 'Modern 20-inch folders are stable for city riding, though they feel more responsive than larger wheels. Always wear a certified helmet.' },
      { q: 'How much is a foldable e bicycle?', a: 'The MetroFold in our range is $1,499. Cheaper folders often use smaller batteries and lighter-duty components.' },
    ],
    matches: inCat('folding'),
  },

  // ───────────────────────────── ELECTRIC CRUISER BIKES ─────────────────────────────
  {
    id: 'cruiser',
    kind: 'category',
    path: '/ebikes/electric-cruiser-bikes',
    name: 'Electric Cruiser Bikes',
    navLabel: 'Electric Cruiser Bikes',
    title: 'Electric Cruiser Bikes Australia | Step-Through E-Cruisers',
    description:
      'Shop electric cruiser bikes in Australia: a retro step-through e-cruiser with a sprung saddle and swept bars. 250W silent hub motor, 85 km range, EN15194.',
    h1: 'Electric Cruiser Bikes: Retro Step-Through E-Cruisers',
    intro: [
      'Electric cruiser bikes are built for relaxed riding: a wide sprung saddle, swept-back bars and a low step-through frame that is easy to get on and off. The motor takes the effort out of headwinds and hills without changing the laid-back feel.',
      'The Byron Bay Classic pairs a 250W Bafang silent hub motor with a 540 Wh battery, listed at up to 85 km per charge, in a vintage-style frame with whitewall tyres.',
    ],
    bridge: {
      heading: 'Cruiser bikes and an e cruiser bike: what is the difference?',
      body:
        'If you have been looking at cruiser bikes for the beach or a coastal path, an electric version keeps the comfort-first geometry and adds pedal assist so longer rides and gentle hills are easier. A cruiser e bike is a good fit for riders who value comfort over speed. An electric cruiser bike australia riders choose for the coast, or any set of cruiser e bikes australia wide, shares the same relaxed geometry.',
    },
    guides: [
      { heading: 'Who should buy an electric cruiser?', body: 'Riders who want comfort, easy mounting and a classic look: coastal commuters, weekend cafe riders and anyone returning to cycling. Step-through frames are also easier for riders with limited flexibility.' },
    ],
    faqs: [
      { q: 'What is an electric cruiser bike?', a: 'It is a comfort-focused e-bike with an upright riding position, wide saddle and swept handlebars, powered by a 250W motor that assists your pedalling.' },
      { q: 'Are electric cruiser bikes good for beach paths?', a: 'Yes on sealed and firm paths. For soft sand, a fat tyre electric bicycle is a better choice.' },
      { q: 'How far does an e cruiser bike go?', a: 'The Byron Bay Classic lists up to 85 km per charge. Real range depends on rider weight, wind and assist level.' },
      { q: 'Is a step-through frame easier to ride?', a: 'It is easier to mount and dismount, which many riders prefer for short stops and relaxed riding.' },
      { q: 'Can I add a rack or basket?', a: 'Many cruiser frames accept racks and baskets. Check the mounting points and payload rating for your model.' },
    ],
    matches: inCat('cruiser'),
  },

  // ───────────────────────────── FAT TYRE ELECTRIC BICYCLE ─────────────────────────────
  {
    id: 'fat-tyre',
    kind: 'category',
    path: '/ebikes/fat-tyre-electric-bicycle',
    name: 'Fat Tyre Electric Bicycles',
    navLabel: 'Fat Tyre Electric Bicycle',
    title: 'Fat Tyre Electric Bicycle Australia | Beach & Trail E-Bikes',
    description:
      'Shop a fat tyre electric bicycle in Australia: 4.0-inch tyres, dual suspension, 80 Nm motor and 840 Wh battery for sand, gravel and trails. EN15194 compliant.',
    h1: 'Fat Tyre Electric Bicycle: Beach, Sand & Trail E-Bikes',
    intro: [
      'A fat tyre electric bicycle uses wide, low-pressure tyres that float over sand, gravel and mud where narrow tyres sink. With a 250W motor on top, it is the easiest way to ride beaches, bush tracks and rough ground.',
      'The Outback Beast 4.0 has dual suspension, an 80 Nm geared motor and an 840 Wh battery, listed at up to 110 km per charge, in a 29 kg frame.',
    ],
    bridge: {
      heading: 'Fat bike or electric fat bike?',
      body:
        'If you searched for a fat bike, an electric fat bike keeps the wide-tyre grip and adds pedal assist, which matters because fat bikes are heavy and slow to pedal on soft ground. A fat tyre ebike makes beach and trail riding far more accessible.',
    },
    guides: [
      { heading: 'Where fat tyre e-bikes shine', body: 'Soft sand, loose gravel, wet grass and rough tracks. They are also comfortable on pavement thanks to the cushioning of the large-volume tyres, though they are heavier than a standard e-bike.' },
    ],
    faqs: [
      { q: 'What is a fat tyre electric bicycle?', a: 'It is an e-bike with extra-wide tyres, typically around 4 inches, designed to ride on sand, snow, gravel and rough terrain.' },
      { q: 'Can a fat tyre ebike ride on the beach?', a: 'Yes on firm wet sand, which is where wide tyres work best. Check local rules, as some beaches restrict bikes.' },
      { q: 'Are fat tyre electric bikes heavy?', a: 'Yes. The Outback Beast weighs 29 kg, so consider how you will store and transport it.' },
      { q: 'How far does a fat tyre electric bike go on one charge?', a: 'The Outback Beast lists up to 110 km on its 840 Wh battery. Soft ground and high assist reduce this.' },
      { q: 'Is a fat bike comfortable on roads?', a: 'It is comfortable thanks to the tyre volume, but the weight and tyre drag make it less efficient on pavement than a commuter e-bike.' },
    ],
    matches: inCat('fat-tyre'),
  },

  // ───────────────────────────── ELECTRIC CARGO BIKES ─────────────────────────────
  {
    id: 'cargo',
    kind: 'category',
    path: '/ebikes/electric-cargo-bikes',
    name: 'Electric Cargo Bikes',
    navLabel: 'Electric Cargo Bikes',
    title: 'Electric Cargo Bike Australia | Longtail Family E-Bikes',
    description:
      'Shop an electric cargo bike in Australia: a longtail family e-bike carrying two kids or 190 kg, with a 90 Nm mid-drive and 960 Wh battery. EN15194.',
    h1: 'Electric Cargo Bike: Longtail Family & Delivery E-Bikes',
    intro: [
      'An electric cargo bike carries kids, groceries or work gear that would otherwise need a car. The extended rear deck holds the load low and stable, and the 250W motor does the heavy lifting.',
      'The Hauler Cargo Max is a longtail with a 90 Nm mid-drive, a 960 Wh battery and a listed range of up to 120 km. It carries two kids or up to 190 kg of cargo.',
    ],
    bridge: {
      heading: 'Cargo bike or electric cargo bicycle?',
      body:
        'Searching for a cargo bike usually means a family or delivery use case. A heavy load makes an unassisted cargo bike hard work on hills, which is why an electric cargo bicycle with a mid-drive motor is the practical version for most Australian suburbs.',
    },
    guides: [
      { heading: 'Longtail vs front-loader cargo bikes', body: 'A longtail extends the rear of the frame, keeping the riding position familiar and storage easier. Front-loaders (box bikes) carry heavier or bulkier loads but are longer and need more room.' },
      { heading: 'Carrying children safely', body: 'Use certified child seats and helmets, and check the payload rating. Rules for carrying passengers vary by state, so check yours.' },
    ],
    faqs: [
      { q: 'What is an electric cargo bike?', a: 'It is an e-bike with a reinforced frame and an extended load area designed to carry kids, shopping or tools, powered by a 250W motor.' },
      { q: 'How much can an electric cargo bike carry?', a: 'The Hauler Cargo Max carries two kids or up to 190 kg of cargo. Always follow the manufacturer payload rating.' },
      { q: 'Can an electric cargo bike replace a second car?', a: 'For short local trips such as school runs and shopping, many families find it can. Distance, weather and storage are the main limits.' },
      { q: 'How heavy is a cargo e bike?', a: 'The Hauler weighs 33.5 kg, so you need secure storage and a plan for loading it onto vehicles.' },
      { q: 'How far does a cargo e-bike go on one charge?', a: 'The Hauler lists up to 120 km on its 960 Wh battery. A full load and hills reduce this.' },
    ],
    matches: inCat('cargo'),
  },

  // ───────────────────────────── ELECTRIC ROAD BIKES ─────────────────────────────
  {
    id: 'road',
    kind: 'category',
    path: '/ebikes/electric-road-bikes',
    name: 'Electric Road Bikes',
    navLabel: 'Electric Road Bikes',
    title: 'Electric Road Bike Australia | Carbon E-Road & Gravel Bikes',
    description:
      'Shop an electric road bike in Australia: a 13.5 kg carbon endurance e-road bike with a stealth 250W hub motor and 115 km range. EN15194 compliant.',
    h1: 'Electric Road Bike: Carbon Endurance E-Road Bikes',
    intro: [
      'An electric road bike looks and rides like a performance road bike, with a small, discreet motor to flatten hills and extend your range. It suits riders who want long rides, group rides at different fitness levels, or an easier return to cycling.',
      'The AeroVelocity is a 13.5 kg carbon endurance bike with a Mahle X35+ stealth rear hub motor and a 500 Wh battery, listed at up to 115 km per charge.',
    ],
    bridge: {
      heading: 'Electric road bike or electric gravel bike?',
      body:
        'Road bicycle electric models favour speed on sealed roads. An electric gravel bike or gravel ebike uses wider tyres and a more relaxed geometry for mixed surfaces. Pick road for tarmac and group rides, and gravel if your routes include unsealed roads. An e gravel bike suits mixed surfaces, and any electric road bike australia riders buy should still be EN 15194 compliant.',
    },
    guides: [
      { heading: 'What makes an e-road bike different?', body: 'Lower motor power and a smaller battery keep the weight close to a normal road bike. The assist cuts out at 25 km/h, so the bike behaves like a regular road bike at speed.' },
    ],
    faqs: [
      { q: 'Are e-road bikes heavy?', a: 'The AeroVelocity weighs 13.5 kg, close to many non-electric road bikes, thanks to a carbon frame and compact hub motor.' },
      { q: 'Can I join group rides on an e-road bike?', a: 'Many groups welcome them, but ask the organiser first. The motor assists only up to 25 km/h.' },
      { q: 'What is the difference between a road e-bike and a gravel e-bike?', a: 'Gravel e-bikes use wider tyres and relaxed geometry for unsealed roads. Road e-bikes favour speed and efficiency on tarmac.' },
      { q: 'How far does an e-road bike go?', a: 'The AeroVelocity lists up to 115 km on a 500 Wh battery. Terrain and assist level change this.' },
      { q: 'Is an e-road bike worth it?', a: 'If you want longer rides, easier climbs or to ride with faster friends, yes. The assist makes hilly routes more accessible.' },
    ],
    matches: inCat('road'),
  },

  // ───────────────────────────── ELECTRIC COMMUTER BIKES ─────────────────────────────
  {
    id: 'commuter',
    kind: 'category',
    path: '/ebikes/electric-commuter-bikes',
    name: 'Electric Commuter Bikes',
    navLabel: 'Electric Commuter Bikes',
    title: 'Electric Commuter Bikes Australia | Step-Through E-Bikes',
    description:
      'Shop electric commuter bikes in Australia: a step-through city e-bike with a rack, 85 km range and Shimano 8-speed. 250W, EN15194 compliant, fast dispatch.',
    h1: 'Electric Commuter Bikes: Step-Through City E-Bikes',
    intro: [
      'Electric commuter bikes make the daily ride faster and less sweaty. A step-through frame and a rear rack turn the bike into a practical alternative to the car or the bus for city trips.',
      'The Apex Commuter Urban Pro has a 250W Bafang silent hub motor, a 540 Wh integrated battery, Shimano 8-speed gears and a listed range of up to 85 km, at 21.5 kg.',
    ],
    bridge: {
      heading: 'Commuter bike, hybrid bike or electric commuter?',
      body:
        'A commuter bike or hybrid bike mixes road efficiency with upright comfort. An electric version adds pedal assist, so you arrive less tired and can handle hills, headwinds and heavier bags. If you are comparing a hybrid cycle bike or hybrid cycling bikes, an electric hybrid commuter is the same practical style with a motor.',
    },
    guides: [
      { heading: 'What to look for in an e-bike commuter', body: 'Lights, mudguards and a rack are worth having. Choose hydraulic disc brakes, a battery sized for a round trip, and a frame height that lets you put a foot down comfortably at lights.' },
    ],
    faqs: [
      { q: 'What is the best electric bike for commuting?', a: 'A step-through or crossbar commuter with mudguards, a rack, lights and a battery that covers your round trip. The Apex Commuter lists up to 85 km per charge.' },
      { q: 'Can I take an e-bike commuter on public transport?', a: 'Rules vary by operator and state. Folding e-bikes are easier to take on trains and buses than full-size frames.' },
      { q: 'How long does it take to charge a commuter e-bike?', a: 'Typically several hours for a full charge. Charge on a hard, non-flammable surface and use the supplied charger.' },
      { q: 'Are electric bike women options different?', a: 'Many commuters offer step-through frames and multiple sizes, which suit a wide range of riders. Choose by fit, not gender.' },
      { q: 'Do I need a licence for an electric commuter bike?', a: 'Compliant e-bikes are generally treated like bicycles, but Queensland now requires a licence or learner permit. Check your state authority.' },
    ],
    matches: inCat('commuter'),
  },

  // ───────────────────────────── SCOOTERS HUB (ELECTRIC SCOOTERS) ─────────────────────────────
  {
    id: 'sc-electric',
    kind: 'hub',
    path: '/scooters',
    name: 'Electric Scooters',
    navLabel: 'Electric Scooters',
    title: 'Push Scooter Electric Australia | Kids & Adult E-Scooters',
    description:
      'Shop an electric push scooter in Australia: commuter e-scooters, kids 3-wheel scooters, adult scooters and accessories. Foldable models with disc brakes.',
    h1: 'Electric Scooters: Push Scooter Electric Range for Kids & Adults',
    intro: [
      'An electric scooter is a fast, compact way to cover short trips. Our range includes a foldable commuter e-scooter, an adult dual-brake scooter, a kids 3-wheel scooter with a speed governor, and a lock and bag kit.',
      'The GlideCity Pro commuter has a 350W front hub motor with regenerative braking, a 420 Wh battery and a listed range of up to 45 km, at 14.2 kg.',
    ],
    bridge: {
      heading: 'Push scooter or electric foot scooter?',
      body:
        'A traditional push scooter relies on your foot, while an electric foot scooter adds a motor for hills and longer distances. Foldable scooters are easiest to carry onto transport and store at home or work. Check your state rules for where e-scooters can be ridden before you buy.',
    },
    guides: [
      { heading: 'What to check before buying an e-scooter', body: 'Look at motor power, battery capacity, brake type, tyre style (pneumatic for comfort, honeycomb for puncture resistance), weight and the maximum rider load. State rules for e-scooters differ, and some set speed and power limits. Top-rated electric scooters and folding electric scooters share a few traits: reliable brakes, a sealed battery and a clear payload rating. Compare any e scooter price in australia against battery size and warranty.' },
    ],
    faqs: [
      { q: 'What is the best electric scooter for commuting?', a: 'Choose a foldable model with a motor of around 350W, dual brakes and a battery matching your daily distance. The GlideCity Pro lists up to 45 km per charge.' },
      { q: 'Are electric scooters legal in Australia?', a: 'Rules vary by state and are changing. Many states allow e-scooters on certain paths and roads with speed and power limits and helmet requirements. Check your state authority before riding.' },
      { q: 'Is a push scooter electric model good for kids?', a: 'Kids should use models designed for them. Our kids scooter has a speed governor at 12 km/h and a rear foot brake. Always supervise and use a helmet.' },
      { q: 'How long does a scooter battery last?', a: 'Range per charge depends on rider weight, terrain and speed. Battery lifespan depends on charging habits and storage.' },
      { q: 'What accessories do I need for an e-scooter?', a: 'A certified helmet, a strong lock and a bag are the basics. Our lock and bag kit includes an anti-cut steel lock and a waterproof handlebar bag.' },
    ],
    children: ['sc-adults', 'sc-kids', 'sc-accessories'],
    matches: (p) => p.category === 'scooters' && p.subcategoryId === 'scooters-electric',
  },
  {
    id: 'sc-adults',
    kind: 'sub',
    parent: 'sc-electric',
    path: '/scooters/adults-scooters',
    name: 'Adults Scooters',
    navLabel: 'Adults Scooters',
    title: 'E Scooter Adults Australia | Foldable Electric Scooters',
    description:
      'Shop an e scooter for adults in Australia: a foldable 120 kg-payload commuter scooter with dual brakes, 350W motor and 10-inch pneumatic tyres.',
    h1: 'E Scooter Adults: Foldable Adult Electric Scooters',
    intro: [
      'An adult e scooter needs a stronger frame, bigger tyres and reliable brakes than a kids model. The GlideX Pro is a high-payload urban commuter rated to 120 kg, with a 350W front hub motor, dual brakes and 10-inch pneumatic comfort tyres.',
      'It folds for storage and transport, weighs 14.5 kg and lists up to 45 km per charge on a 468 Wh battery.',
    ],
    bridge: {
      heading: 'Adult escooter, foldable scooters and motorised options',
      body:
        'Searches for an adult escooter, a motorized scooter for adults, a push scooter adults can ride, an escooter for adults or a collapsible electric scooter for adults usually mean the same thing: a rideable commuter, and an electric scooter foldable adults can carry is the easiest to store. Choose by payload, braking and battery rather than by name, and check your state rules for where adults can ride e-scooters.',
    },
    guides: [
      { heading: 'Pneumatic or solid tyres?', body: 'Pneumatic tyres give a smoother ride and better grip but can puncture. Solid or honeycomb tyres avoid punctures but ride harder. The GlideX uses 10-inch pneumatic tyres for comfort.' },
    ],
    faqs: [
      { q: 'What weight can an adult e scooter carry?', a: 'The GlideX Pro is rated to 120 kg. Always check the maximum rider load for any scooter.' },
      { q: 'Can I carry an adult electric scooter on public transport?', a: 'Folding scooters are easier to carry, but operator rules and battery restrictions vary. Check before travelling.' },
      { q: 'Is a foldable electric scooter for adults stable?', a: 'Larger wheels and a wider deck improve stability. Dual brakes and a sturdy folding latch matter for safety.' },
    ],
    matches: (p) => p.category === 'scooters' && p.subcategoryId === 'scooters-adults',
  },
];

// Section products (in-page sections without their own URL)
export const SECTION_MATCH: Record<string, (p: Product) => boolean> = {
  'emtb-kids': (p) => p.category === 'emtb' && /trailyouth|junior/.test(p.slug),
  'sc-kids': (p) => p.category === 'scooters' && p.subcategoryId === 'scooters-kids',
  'sc-accessories': (p) => p.category === 'scooters' && p.subcategoryId === 'scooters-accessories',
};

export const CATALOG: CatalogNode[] = [...NODES, ...KIDS_NODES, ...BRAND_NODES, ...BRAND_NODES_MORE, ...LANDING_NODES].map((n) => ({ ...n, keywords: kw(n.id) }));
export const LANDING_PATHS = LANDING_NODES.map((n) => n.path);
export const nodeById = (id: string) => CATALOG.find((n) => n.id === id);
export const nodeByPath = (path: string) => CATALOG.find((n) => n.path === path);
export const childrenOf = (n: CatalogNode) => (n.children || []).map((id) => nodeById(id)!).filter(Boolean);
export const siblingsOf = (n: CatalogNode) =>
  n.kind === 'category' ? CATALOG.filter((c) => c.kind === 'category' && c.id !== n.id) : [];

export const EBIKE_CATEGORY_IDS = ['emtb', 'folding', 'cruiser', 'fat-tyre', 'cargo', 'road', 'commuter'];
export const EBIKE_CATEGORY_PATHS = EBIKE_CATEGORY_IDS.map((id) => nodeById(id)!.path);
export const ALL_CATALOG_PATHS = CATALOG.map((n) => n.path);
