import type { CatalogNode } from "@/lib/catalog";
import type { NodeKeywords } from "@/lib/catalog-keywords";

type GearNode = Omit<CatalogNode, "keywords">;

/**
 * Pages from seo-strategy/keyword-map.md that had no catalog page (hybrid bikes, e-bike helmets,
 * accessories, parts) plus the strategy keyword sets for pages whose primary had drifted.
 * Keyword sets and volumes are copied from keyword-map.md (Semrush AU, Oct 2026).
 */
export const GEAR_KEYWORDS: Record<string, NodeKeywords> = {
  "gear-hybrid": {
    primary: "pedal assist bike", primaryVolume: 590, primaryKd: 16,
    secondary: ["electric assist bike", "e bike with motor", "electric bike motor", "electric bike with throttle", "e bike with pedal assist"],
    supporting: ["ebike motor", "hybrid ebike", "250w e bike", "mid drive electric bike", "electric hybrid bikes", "electric pedal assist bike", "e bike with throttle", "pedal assist e-bike"],
  },
  "gear-helmets": {
    primary: "e bike helmet", primaryVolume: 590, primaryKd: 8,
    secondary: ["bike riding helmets", "helmet for a bike", "helmets for cycle", "electric bike helmet", "bike helmet sale"],
    supporting: ["cycle helmet sale", "bicycle helmets for sale", "buy bike helmet", "cheap bike helmets"],
    commerce: ["bike helmet sale", "buy bike helmet", "cycle helmet sale"],
  },
  "gear-accessories": {
    primary: "ebike accessories", primaryVolume: 590, primaryKd: 13,
    secondary: ["electric bicycle accessories", "seat e bike", "electric bicycle seats", "electric bike accessories", "e bike pedals"],
    supporting: ["ebike lights", "e bike accessory", "electric bike light"],
  },
  "gear-parts": {
    primary: "electric bike parts", primaryVolume: 320, primaryKd: 2,
    secondary: ["e bike controller", "ebike parts", "electric bicycle parts", "electric bicycle frame", "e bike tires"],
    supporting: ["electric bicycle tire", "electric bike controller", "e bike parts australia"],
  },
};

/** Strategy keyword sets for existing nodes whose primary had drifted from keyword-map.md. */
export const STRATEGY_OVERRIDES: Record<string, Omit<NodeKeywords, "commerce">> = {
  commuter: {
    primary: "electric bike for commuters", primaryVolume: 480, primaryKd: 11,
    secondary: ["electric commuter bikes", "commuter e-bike", "trekking e bike", "e bike women", "womens electric bike"],
    supporting: ["mens electric bike", "step through electric bikes", "lightweight electric bike", "e bike mens", "ebike for commute", "ebike for commuting", "lightweight electric bike australia"],
  },
  cruiser: {
    primary: "cruiser e bike", primaryVolume: 390, primaryKd: 6,
    secondary: ["cruiser electric bike", "electric cruiser bike australia", "cruiser e bikes australia"],
    supporting: ["electric cruiser bikes"],
  },
  batteries: {
    primary: "e cycle battery", primaryVolume: 1900, primaryKd: 15,
    secondary: ["ebike battery", "battery for electric bicycle", "electric bike battery", "48v ebike battery", "e bike batteries"],
    supporting: ["battery electric bicycle", "electric bike charger", "charger e bike", "electric bicycle charger", "e bike conversion kit with battery", "electric bike batteries", "batteries for electric bicycles", "ebike kit with battery"],
  },
  "sc-electric": {
    primary: "e scooter adults", primaryVolume: 320, primaryKd: 16,
    secondary: ["electric scooters top rated", "recreational e scooters", "push scooter electric", "push scooter adults", "e scooter price in australia"],
    supporting: ["foldable scooters", "electric foot scooter", "motorized scooter for adults", "adult escooter", "collapsible electric scooter for adults"],
  },
  "sc-adults": {
    primary: "foldable electric scooter for adults", primaryVolume: 90, primaryKd: 10,
    secondary: ["electric scooter foldable adults", "escooter for adults", "adult e scooters", "adult electric motor scooter", "e scooter for adults for sale"],
    supporting: [],
  },
};

/** Title / H1 / meta that carry the restored strategy primary. */
export const STRATEGY_TEXT: Record<string, { title: string; h1: string; description: string }> = {
  commuter: {
    title: "Electric Bike for Commuters | Women's & Men's E-Bikes",
    h1: "Electric Bike for Commuters: Step-Through and Hybrid E-Bikes",
    description: "Shop an electric bike for commuters in Australia: electric commuter bikes, commuter e-bikes, trekking and women's e-bikes. 250W EN15194, fast dispatch.",
  },
  cruiser: {
    title: "Cruiser E Bike Australia | Electric Cruiser Bikes",
    h1: "Cruiser E Bike: Electric Cruiser Bikes for Beach and City",
    description: "Shop a cruiser e bike in Australia: cruiser electric bike and electric cruiser bike models with step-through frames. 250W EN15194, fast dispatch.",
  },
  batteries: {
    title: "E Cycle Battery Australia | Ebike Battery & Chargers",
    h1: "E Cycle Battery: Ebike Batteries and Chargers",
    description: "Shop an e cycle battery in Australia: ebike battery, 48V electric bike battery and chargers, with compatibility advice and fast dispatch.",
  },
  "sc-electric": {
    title: "E Scooter Adults Australia | Electric Scooters for Sale",
    h1: "E Scooter Adults: Electric Scooters for Commuters",
    description: "Shop an e scooter adults can commute on: push scooter electric models, foldable adult scooters and accessories. Disc brakes, Australia-wide delivery.",
  },
  "sc-adults": {
    title: "Foldable Electric Scooter for Adults | Adult E-Scooters",
    h1: "Foldable Electric Scooter for Adults: Commuter E-Scooters",
    description: "Shop a foldable electric scooter for adults in Australia: dual brakes, pneumatic tyres and a compact fold for trains and offices. Fast dispatch.",
  },
};

const NOTE_FIT = "Check that any part or accessory fits your model before you order, and ask us if you are unsure.";

export const GEAR_NODES: GearNode[] = [
  {
    id: "gear-hybrid",
    kind: "landing",
    path: "/electric-hybrid-bikes",
    name: "Pedal Assist Bikes",
    navLabel: "Pedal Assist Bikes",
    title: "Pedal Assist Bike Australia | Electric Hybrid Bikes",
    description:
      "Shop a pedal assist bike in Australia: electric hybrid bikes with a motor, throttle or pedal-assist options. 250W EN15194 models with fast dispatch.",
    h1: "Pedal Assist Bike: Electric Hybrid Bikes with Motor Assist",
    intro: [
      "A pedal assist bike adds a motor that helps while you pedal, so hills, headwinds and longer distances get easier without changing how the bike rides. Hybrid e-bikes combine this assistance with an upright, versatile frame suited to roads, paths and light tracks.",
      "Compare the hybrid and commuter models below by motor type, battery size and brakes, then open a model page for full specifications and current pricing.",
    ],
    bridge: {
      heading: "Pedal assist, e bike with motor or electric assist bike?",
      body:
        "These all describe the same type of bike: an electric bicycle where a motor assists your pedalling. In Australia the compliant version assists up to 25 km/h with a 250W motor, which is why it is treated as a bicycle.",
    },
    guides: [
      {
        heading: "Hub motor or mid-drive motor?",
        body:
          "A hub motor sits in the wheel and is simple and affordable, which suits flat commutes. A mid-drive motor sits at the cranks, uses the bike's gears and climbs better, which suits hills and loaded riding. Compare torque (Nm) as well as watts.",
      },
      {
        heading: "Pedal assist or throttle?",
        body:
          "Pedal assist only helps while you pedal and feels like a stronger version of you. A throttle can power the bike without pedalling. In Australia the compliant standard limits what a throttle can do, so check the model's compliance details before you buy.",
      },
    ],
    links: [
      { label: "Electric commuter bikes", href: "/ebikes/electric-commuter-bikes" },
      { label: "Cheap electric bikes", href: "/cheap-electric-bikes" },
      { label: "E-bike batteries", href: "/electric-bike-batteries" },
    ],
    enquiry: "Not sure which motor or battery suits your route? Tell us about your commute and we will recommend a model.",
    faqs: [
      { q: "What is a pedal assist bike?", a: "An electric bicycle whose motor helps while you pedal, up to 25 km/h in Australia, so you still ride the bike but with less effort." },
      { q: "Do I need a licence for a pedal assist bike?", a: "Not for a compliant EN 15194 pedal-assist e-bike. Check your state rules for any modified or higher-powered bike." },
      { q: "What is the difference between a hub and a mid-drive motor?", a: "A hub motor is in the wheel and suits flat riding. A mid-drive is at the cranks and handles hills and loads better." },
      { q: "How far can a pedal assist bike go?", a: "Range depends on battery size, assist level, terrain and rider weight. Compare watt-hours (Wh) between models." },
    ],
    matches: (p) => p.category === "commuter",
  },
  {
    id: "gear-helmets",
    kind: "landing",
    path: "/e-bike-helmets",
    name: "E-Bike Helmets",
    navLabel: "E-Bike Helmets",
    title: "E Bike Helmet Australia | Bike Helmets for Sale",
    description:
      "Shop an e bike helmet in Australia: bike riding helmets for road, MTB and kids, AS/NZS 2063 certified. Compare sizes, MIPS and prices with fast dispatch.",
    h1: "E Bike Helmet: Certified Bike Helmets for Every Rider",
    intro: [
      "A helmet is compulsory for every bicycle and e-bike rider in Australia, and the right e bike helmet is one that is certified, fits properly and is comfortable enough that you wear it every ride.",
      "Browse helmets for road, mountain and kids below. Each has its own page with sizing, price and features such as MIPS rotational protection.",
    ],
    bridge: {
      heading: "Electric bike helmet, bike riding helmet or helmet for a bike?",
      body:
        "For a standard 25 km/h e-bike, a bicycle helmet certified to AS/NZS 2063 is the right choice. Helmets sold for road, MTB, urban or kids riding all carry the same certification, so choose on fit, ventilation and coverage.",
    },
    guides: [
      {
        heading: "How to choose a bike helmet",
        body:
          "Measure your head just above the eyebrows and match it to the size chart. The helmet should sit level and low on the forehead, with straps forming a V under the ears and a snug chin strap. MIPS and extended rear coverage are worthwhile extras.",
      },
      {
        heading: "When to replace a helmet",
        body:
          "Replace a helmet after any significant impact, when the shell or straps are damaged, or when it no longer fits. Do not buy a second-hand helmet when you do not know its history.",
      },
    ],
    links: [
      { label: "Kids bike helmets", href: "/kids-bike-helmets" },
      { label: "Helmet guide for youth riders", href: "/blog/helmet-youth-bike-australian-standards" },
      { label: "E-bike accessories", href: "/e-bike-accessories" },
    ],
    enquiry: "Need help with sizing? Send your head measurement and we will suggest the right helmet.",
    faqs: [
      { q: "Do e-bike riders need a special helmet?", a: "For a standard 25 km/h e-bike, an AS/NZS 2063 certified bicycle helmet is the right choice. Extra coverage and lights are optional." },
      { q: "What does MIPS do?", a: "MIPS is a low-friction layer designed to reduce rotational forces on the head in some impacts. It is an optional safety feature." },
      { q: "Are helmets compulsory in Australia?", a: "Yes, in every state and territory for all bicycle riders, including e-bike riders. Check your state authority for details." },
      { q: "How often should I replace a helmet?", a: "After any significant impact, when damaged, or when it stops fitting. Many makers also recommend replacing it every few years." },
    ],
    matches: (p) => p.category === "helmets",
  },
  {
    id: "gear-accessories",
    kind: "landing",
    path: "/e-bike-accessories",
    name: "E-Bike Accessories",
    navLabel: "E-Bike Accessories",
    title: "Ebike Accessories Australia | Locks, Lights, Gloves",
    description:
      "Shop ebike accessories in Australia: electric bicycle accessories such as locks, lights, gloves, seats and pedals. Compare prices with fast dispatch.",
    h1: "Ebike Accessories: Locks, Lights, Gloves and Gear",
    intro: [
      "The right ebike accessories make riding safer, more comfortable and more secure. A strong lock matters more on an e-bike than on a regular bike, and good lights extend your riding hours.",
      "Browse locks, lights, gloves and other electric bicycle accessories below. Each product page lists price and details.",
    ],
    bridge: {
      heading: "Electric bike accessories, e bike accessory or electric bicycle accessories?",
      body:
        "They all point to the same range: gear that suits an e-bike. Most standard bicycle accessories fit an e-bike, but check carrying limits for racks and the lock rating for the higher value of an electric bike.",
    },
    guides: [
      {
        heading: "The accessories worth buying first",
        body:
          "Start with a certified helmet, a strong lock (a U-lock or folding lock rated for high-value bikes), and front and rear lights. Add gloves, mudguards, a rack or panniers and a comfortable seat as your riding needs grow.",
      },
      {
        heading: "Choosing a lock for an e-bike",
        body:
          "Use a hardened U-lock or folding lock and lock the frame to a fixed object. Take the battery with you if it is removable. A cable lock alone is not enough for an electric bike.",
      },
    ],
    links: [
      { label: "E-bike helmets", href: "/e-bike-helmets" },
      { label: "E-bike batteries", href: "/electric-bike-batteries" },
      { label: "E-bike parts", href: "/e-bike-parts" },
    ],
    enquiry: "Looking for a specific lock, light or accessory? Tell us what you need and we will check availability.",
    faqs: [
      { q: "What accessories do I need for an e-bike?", a: "A certified helmet, a strong lock and lights are the essentials. Mudguards, a rack, gloves and a comfortable seat are common additions." },
      { q: "Do standard bike accessories fit an e-bike?", a: "Most do. Check rack and pannier weight limits, and use a lock rated for a higher-value bike." },
      { q: "Do I need a special lock for an e-bike?", a: "A hardened U-lock or folding lock is recommended. Cable locks alone are easy to cut." },
      { q: "Where should I store an e-bike battery?", a: "Store it indoors at room temperature and take it off the bike when parked in public if it is removable." },
    ],
    matches: (p) => p.category === "accessories",
  },
  {
    id: "gear-parts",
    kind: "landing",
    path: "/e-bike-parts",
    name: "E-Bike Parts",
    navLabel: "E-Bike Parts",
    title: "Electric Bike Parts Australia | Tyres, Brakes, Chains",
    description:
      "Shop electric bike parts in Australia: ebike parts, tyres, brake pads, chains and controllers. Check fit and compare prices with fast dispatch.",
    h1: "Electric Bike Parts: Tyres, Brakes, Chains and Spares",
    intro: [
      "Electric bike parts wear faster than on a regular bike because e-bikes are heavier and faster, so e-bike specific tyres, brake pads and chains last longer and are safer.",
      "Browse ebike parts below, then check fit against your model before ordering.",
    ],
    bridge: {
      heading: "Ebike parts, electric bicycle parts or e bike tires?",
      body:
        "They all describe replacement and upgrade components for an electric bicycle: tyres, brakes, drivetrain parts and electrical items such as controllers and displays. Electrical parts are model-specific, so confirm compatibility first.",
    },
    guides: [
      {
        heading: "Wear parts to check regularly",
        body:
          "Tyres, brake pads and rotors, and the chain and cassette take the most wear on an e-bike. An e-bike rated chain and puncture-resistant tyres are worthwhile upgrades for daily riders.",
      },
      {
        heading: "Electrical parts and compatibility",
        body:
          "Controllers, displays, sensors and motors must match the voltage and the system on your bike. Do not mix components from different systems, and fit them or have them fitted by a qualified mechanic. " + NOTE_FIT,
      },
    ],
    links: [
      { label: "E-bike batteries", href: "/electric-bike-batteries" },
      { label: "Conversion kits", href: "/electric-bike-conversion-kits" },
      { label: "E-bike accessories", href: "/e-bike-accessories" },
    ],
    enquiry: "Need a part for a specific model? Send us the make, model and year and we will check it.",
    faqs: [
      { q: "Are e-bike parts different from regular bike parts?", a: "Wear parts such as chains, tyres and brake pads should be rated for e-bike weight and speed. Electrical parts are system-specific." },
      { q: "How often should I replace e-bike brake pads?", a: "It depends on use, but e-bike pads usually wear faster. Check them regularly and replace them when thin." },
      { q: "Can I replace an e-bike controller myself?", a: "It must match your motor and battery voltage. Have it fitted by a qualified mechanic if you are unsure." },
      { q: "What tyres suit an e-bike?", a: "Puncture-resistant tyres rated for e-bike weight and speed give better life and safety." },
    ],
    matches: (p) => p.category === "parts",
  },
];
