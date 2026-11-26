import type { CatalogNode } from "@/lib/catalog";
import { helmetKind } from "@/lib/helmet-kinds";
import { isGlove } from "@/lib/glove-kinds";
import type { NodeKeywords } from "@/lib/catalog-keywords";

type GearNode = Omit<CatalogNode, "keywords">;

/**
 * Pages from seo-strategy/keyword-map.md that had no catalog page (hybrid bikes, e-bike helmets,
 * accessories, parts) plus the strategy keyword sets for pages whose primary had drifted.
 * Keyword sets and volumes are copied from keyword-map.md (Semrush AU, Oct 2026).
 */
export const GEAR_KEYWORDS: Record<string, NodeKeywords> = {
  "gear-hybrid": {
    primary: "pedal assist electric bike", primaryVolume: 1000, primaryKd: 13,
    secondary: ["electric assist bike", "e bike with motor", "electric bike motor", "electric bike with throttle", "e bike with pedal assist"],
    supporting: ["pedal assist bike", "ebike motor", "hybrid ebike", "250w e bike", "mid drive electric bike", "electric hybrid bikes", "electric pedal assist bike", "e bike with throttle", "pedal assist e-bike"],
  },
  "helmets-fullface": {
    primary: "full face mountain bike helmet", primaryVolume: 1300, primaryKd: 9,
    secondary: ["fox full face mountain bike helmet", "cheap full face mountain bike helmets", "best full face mountain bike helmet", "downhill bike helmet"],
    supporting: ["fox full face mountain bike helmet", "cheap full face mountain bike helmets", "best full face mountain bike helmet", "downhill bike helmet"],
  },
  "helmets-mtb": {
    primary: "mountain bike helmets", primaryVolume: 480, primaryKd: 20,
    secondary: ["fox mountain bike helmet", "fox bike helmet", "mips mountain bike helmet"],
    supporting: ["fox mountain bike helmet", "fox bike helmet", "mips mountain bike helmet"],
  },
  "helmets-road": {
    primary: "road bike helmet", primaryVolume: 1300, primaryKd: 17,
    secondary: ["bike helmets for road bikes", "aero bike helmet", "best road bike helmet", "road bike helmets australia"],
    supporting: ["bike helmets for road bikes", "aero bike helmet", "best road bike helmet", "road bike helmets australia"],
    commerce: ["road bike helmets australia"],
  },
  "gear-helmets": {
    primary: "bike helmets", primaryVolume: 2400, primaryKd: 10,
    secondary: ["bike riding helmets", "helmet for a bike", "helmets for cycle", "electric bike helmet", "bike helmet sale"],
    supporting: ["cycle helmet sale", "bicycle helmets for sale", "buy bike helmet", "cheap bike helmets"],
    commerce: ["bike helmet sale", "buy bike helmet", "cycle helmet sale"],
  },
  "gear-gloves": {
    primary: "bike gloves", primaryVolume: 1300, primaryKd: 13,
    secondary: ["mountain bike gloves", "childs bike gloves", "winter biking gloves", "road bike gloves", "fox mountain bike gloves"],
    supporting: ["best bike gloves", "padded bike gloves", "kids mountain bike gloves"],
    commerce: ["mens bike gloves"],
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
    primary: "electric commuter bike", primaryVolume: 1900, primaryKd: 17,
    secondary: ["electric commuter bikes", "commuter e-bike", "trekking e bike", "e bike women", "womens electric bike"],
    supporting: ["electric bike for commuters", "mens electric bike", "step through electric bikes", "lightweight electric bike", "e bike mens", "ebike for commute", "ebike for commuting", "lightweight electric bike australia"],
  },
  cruiser: {
    primary: "electric cruiser bike", primaryVolume: 720, primaryKd: 15,
    secondary: ["cruiser electric bike", "electric cruiser bike australia", "cruiser e bikes australia"],
    supporting: ["cruiser e bike", "electric cruiser bikes"],
  },
  batteries: {
    primary: "e cycle battery", primaryVolume: 1900, primaryKd: 15,
    secondary: ["ebike battery", "battery for electric bicycle", "electric bike battery", "48v ebike battery", "e bike batteries"],
    supporting: ["battery electric bicycle", "electric bike charger", "charger e bike", "electric bicycle charger", "e bike conversion kit with battery", "electric bike batteries", "batteries for electric bicycles", "ebike kit with battery"],
  },
  "sc-electric": {
    primary: "e scooter adults", primaryVolume: 320, primaryKd: 16,
    secondary: ["electric scooters top rated", "recreational e scooters", "push scooter electric", "push scooter adults", "e scooter price in australia"],
    supporting: ["foldable scooters", "electric foot scooter"],
  },
  "sc-adults": {
    primary: "collapsible electric scooter for adults", primaryVolume: 90, primaryKd: 6,
    secondary: ["adult escooter", "motorized scooter for adults"],
    supporting: [],
  },
};

/** Title / H1 / meta that carry the restored strategy primary. */
export const STRATEGY_TEXT: Record<string, { title: string; h1: string; description: string }> = {
  commuter: {
    title: "Electric Commuter Bike | Women's and Men's E-Bikes",
    h1: "Electric Commuter Bike: Step-Through and Hybrid E-Bikes",
    description: "Shop an electric commuter bike in Australia: electric bike for commuters, commuter e-bikes, trekking and women's e-bikes. 250W EN15194, fast dispatch.",
  },
  cruiser: {
    title: "Electric Cruiser Bike Australia | Beach and City E-Bikes",
    h1: "Electric Cruiser Bike: Step-Through E-Bikes for Beach and City",
    description: "Shop an electric cruiser bike in Australia: cruiser e bike and cruiser electric bike models with step-through frames. 250W EN15194, fast dispatch.",
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
    title: "Collapsible Electric Scooter for Adults | Adult E-Scooters",
    h1: "Collapsible Electric Scooter for Adults: Commuter E-Scooters",
    description: "Shop a collapsible electric scooter for adults in Australia: adult escooter and motorized scooter models with dual brakes and a compact fold. Fast dispatch.",
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
    title: "Pedal Assist Electric Bike Australia | Hybrid E-Bikes",
    description:
      "Shop a pedal assist electric bike in Australia: electric hybrid bikes with a motor, throttle or pedal-assist options. 250W EN15194 models, fast dispatch.",
    h1: "Pedal Assist Electric Bike: Hybrid E-Bikes with Motor Assist",
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
    title: "Bike Helmets Australia | E Bike Helmets for Sale",
    description:
      "Shop bike helmets in Australia: e bike helmets for road, MTB and kids, AS/NZS 2063 certified. Compare sizes, MIPS and prices with fast dispatch.",
    h1: "Bike Helmets: Certified E Bike Helmets for Every Rider",
    intro: [
      "A helmet is compulsory for every bicycle and e-bike rider in Australia, and the right e bike helmet is one that is certified, fits properly and is comfortable enough that you wear it every ride.",
      "Browse our road, mountain bike, full face and kids helmets below. Each has its own page with sizing, price and features such as MIPS rotational protection.",
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
      { label: "Road bike helmets", href: "/e-bike-helmets/road-bike-helmets" },
      { label: "Mountain bike helmets", href: "/e-bike-helmets/mountain-bike-helmets" },
      { label: "Full face helmets", href: "/e-bike-helmets/full-face-helmets" },
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
    id: "helmets-fullface",
    kind: "landing",
    path: "/e-bike-helmets/full-face-helmets",
    name: "Full Face Helmets",
    navLabel: "Full Face Helmets",
    title: "Full Face Mountain Bike Helmet Australia | Fox & Jetblack",
    description:
      "Shop a full face mountain bike helmet in Australia: Fox Proframe and Rampage and Jetblack Comp full face helmets, from $179 to $469, with MIPS on 3 of 4.",
    h1: "Full Face Mountain Bike Helmet: Downhill and Enduro Protection",
    intro: [
      "A full face mountain bike helmet adds a chin bar to the protection of an open-face helmet, which is why riders choose one for downhill, enduro and bike park riding. It should sit snug, stay stable when you shake your head and carry a certified standard.",
      "Our range has 4 full face helmets: the Fox Proframe, two Fox Rampage models and the Jetblack Comp 2.0, from $179 to $469. 3 of them list MIPS rotational protection.",
    ],
    bridge: {
      heading: "Downhill bike helmet, cheap full face helmets and the best full face helmet",
      body:
        "Searches for a downhill bike helmet, a cheap full face mountain bike helmet or the best full face mountain bike helmet usually come down to coverage, weight and ventilation. Full face helmets are heavier and warmer than open-face helmets, so they suit gravity riding more than everyday commuting. Check the certification and the size chart for each model.",
    },
    guides: [
      {
        heading: "Full face or open face?",
        body:
          "A full face helmet protects the chin and jaw and suits downhill, enduro and bike park riding. An open-face helmet is lighter and cooler for trail riding and commuting. Choose by the riding you do, and check that the helmet is certified and fits snugly.",
      },
    ],
    links: [
      { label: "Mountain bike helmets", href: "/e-bike-helmets/mountain-bike-helmets" },
      { label: "Kids bike helmets", href: "/kids-bike-helmets" },
      { label: "All bike helmets", href: "/e-bike-helmets" },
    ],
    productsHeading: "Full face helmets in stock now",
    enquiry: "Need help with sizing? Send your head measurement and we will suggest the right helmet.",
    faqs: [
      { q: "What is a full face helmet?", a: "A helmet with a chin bar that protects the jaw and face, used for downhill, enduro and bike park riding." },
      { q: "Can I use a full face helmet on an e-bike?", a: "Yes, if it is certified for bicycle use and you are comfortable in it. Full face helmets are heavier and warmer, so many riders keep them for gravity riding and use an open-face helmet for commuting." },
      { q: "Do full face helmets have MIPS?", a: "Some do. 3 of our 4 full face helmets list MIPS. MIPS is a low-friction layer designed to reduce rotational forces on the head in some impacts. It is an optional safety feature." },
      { q: "What size full face helmet do I need?", a: "Measure your head just above the eyebrows and match it to the size chart from the maker. The helmet should sit level and snug without pressure points, and it should not rock when you shake your head." },
      { q: "Do you sell kids full face helmets?", a: "See our kids bike helmets page for children's helmets." },
    ],
    matches: (p) => p.category === "helmets" && helmetKind(p).fullFace && !helmetKind(p).kids,
  },
  {
    id: "helmets-mtb",
    kind: "landing",
    path: "/e-bike-helmets/mountain-bike-helmets",
    name: "Mountain Bike Helmets",
    navLabel: "Mountain Bike Helmets",
    title: "Mountain Bike Helmets Australia | Fox, Giro, Lazer & Raven",
    description:
      "Shop mountain bike helmets in Australia: Fox Speedframe and Mainframe, Giro Fixture and Radix, Lazer Finch and Lupo and Raven Corvus, from $64 to $199.",
    h1: "Mountain Bike Helmets: Open-Face Trail and E-MTB Helmets",
    intro: [
      "A mountain bike helmet usually has a peak, extended rear coverage and generous vents for trail riding. It also suits e-MTB riding, because the coverage and ventilation work at e-bike speeds.",
      "Our range has 20 mountain bike helmets from Fox, Giro, Lazer and Raven, from $64 to $199, and 8 of them list MIPS.",
    ],
    bridge: {
      heading: "Mountain bike helmet, Fox mountain bike helmet and MIPS mountain bike helmet",
      body:
        "Searches for a Fox mountain bike helmet, a MIPS mountain bike helmet or a Fox bike helmet come down to fit, ventilation and coverage. Look for extended rear coverage, a peak you can adjust and a retention dial that holds the helmet steady on rough ground. For downhill and bike park riding, see our full face helmets.",
    },
    guides: [
      {
        heading: "How to choose a mountain bike helmet",
        body:
          "Measure your head just above the eyebrows and match it to the size chart. The helmet should sit level and low on the forehead with the straps forming a V under the ears. Rear coverage, ventilation and MIPS are the main differences between models.",
      },
    ],
    links: [
      { label: "Full face helmets", href: "/e-bike-helmets/full-face-helmets" },
      { label: "Kids bike helmets", href: "/kids-bike-helmets" },
      { label: "All bike helmets", href: "/e-bike-helmets" },
    ],
    productsHeading: "Mountain bike helmets in stock now",
    enquiry: "Need help with sizing? Send your head measurement and we will suggest the right helmet.",
    faqs: [
      { q: "What is the best mountain bike helmet?", a: "The best one is certified, fits you properly and is comfortable enough to wear every ride. Compare coverage, ventilation, weight and MIPS across the Fox, Giro, Lazer and Raven models." },
      { q: "Do I need a mountain bike helmet for an e-bike?", a: "Any certified bicycle helmet works, but a mountain bike helmet gives extra rear coverage and a peak that suits trail and e-MTB riding." },
      { q: "What does MIPS do in a mountain bike helmet?", a: "MIPS is a low-friction layer designed to reduce rotational forces on the head in some impacts. It is an optional safety feature." },
      { q: "Mountain bike helmet or full face helmet?", a: "Open-face mountain bike helmets are lighter and cooler for trail riding. Full face helmets protect the jaw and suit downhill and bike park riding." },
      { q: "How do I size a mountain bike helmet?", a: "Measure your head just above the eyebrows and match it to the size chart from the maker. The helmet should sit level and snug without pressure points, and it should not rock when you shake your head." },
    ],
    matches: (p) => p.category === "helmets" && helmetKind(p).mtb && !helmetKind(p).fullFace && !helmetKind(p).kids,
  },
  {
    id: "helmets-road",
    kind: "landing",
    path: "/e-bike-helmets/road-bike-helmets",
    name: "Road Bike Helmets",
    navLabel: "Road Bike Helmets",
    title: "Road Bike Helmet Australia | Giro, MET & Cinettica Helmets",
    description:
      "Shop a road bike helmet in Australia: Giro Agilis and Isode, MET Trenta, Rivale and Codatronca and Cinettica Velocita, from $48 to $619, 13 with MIPS.",
    h1: "Road Bike Helmet: Lightweight Road and Aero Helmets",
    intro: [
      "A road bike helmet is built to be light and well ventilated, with a low profile and a retention system that holds steady at speed. It suits road cycling, gravel and long rides.",
      "Our range has 16 road helmets from Giro, MET and Cinettica, from $48 to $619, and 13 list MIPS. The MET Codatronca is a triathlon helmet with aero shaping.",
    ],
    bridge: {
      heading: "Road bike helmet, aero bike helmet and best road bike helmet",
      body:
        "Searches for a cycling helmet road bike, an aero bike helmet or the best road bike helmet come down to weight, ventilation and fit. Aero helmets cut drag but run warmer, while vented road helmets suit long climbs and hot days. Check the certification and the size chart for each model.",
    },
    guides: [
      {
        heading: "Aero or vented road helmet?",
        body:
          "An aero helmet has fewer, smaller vents to cut drag and suits racing and time trials. A vented road helmet keeps you cooler on climbs and long rides. Choose by how and where you ride, and check the certification and fit.",
      },
    ],
    links: [
      { label: "Mountain bike helmets", href: "/e-bike-helmets/mountain-bike-helmets" },
      { label: "Kids bike helmets", href: "/kids-bike-helmets" },
      { label: "All bike helmets", href: "/e-bike-helmets" },
    ],
    productsHeading: "Road helmets in stock now",
    enquiry: "Need help with sizing? Send your head measurement and we will suggest the right helmet.",
    faqs: [
      { q: "How do I choose a road helmet?", a: "The best one is certified, fits you properly and is comfortable on long rides. Compare weight, ventilation and MIPS across the Giro, MET and Cinettica models." },
      { q: "Aero helmet or vented road helmet?", a: "Aero helmets cut drag and suit racing, while vented helmets run cooler on climbs and long rides." },
      { q: "Can I wear a road helmet on an e-bike?", a: "Yes. Any certified bicycle helmet suits an e-bike, and a lightweight road helmet is comfortable for long rides." },
      { q: "What does MIPS do on a road helmet?", a: "MIPS is a low-friction layer designed to reduce rotational forces on the head in some impacts. It is an optional safety feature." },
      { q: "What size road helmet do I need?", a: "Measure your head just above the eyebrows and match it to the size chart from the maker. The helmet should sit level and snug without pressure points, and it should not rock when you shake your head." },
    ],
    matches: (p) => p.category === "helmets" && helmetKind(p).road && !helmetKind(p).kids,
  },
  {
    id: "gear-gloves",
    kind: "landing",
    path: "/bike-gloves",
    name: "Bike Gloves",
    navLabel: "Bike Gloves",
    title: "Bike Gloves Australia | Cycling Gloves for Sale",
    description:
      "Shop bike gloves in Australia: mountain bike, road, winter and kids cycling gloves from Fox, Giro, Castelli, Fist and BBB, from $19 to $79. Fast dispatch.",
    h1: "Bike Gloves: MTB, Road, Winter and Kids Cycling Gloves",
    intro: [
      "Bike gloves pad your palms against vibration, protect them in a fall and keep your grip in the wet or cold. On an e-bike, where you ride further and faster, a good pair makes long rides more comfortable.",
      "Our range has 40 pairs of cycling gloves from Fox, Giro, Castelli, Fist, BBB, Cinettica and Black Mountain, from $19 to $79: mountain bike, road, winter and kids gloves.",
    ],
    bridge: {
      heading: "MTB, road, winter and kids gloves",
      body:
        "Searches for mountain bike gloves, road bike gloves, winter biking gloves or childs bike gloves all come down to fit, padding and the weather you ride in. MTB gloves are hard-wearing with grip pads, road gloves are light with gel padding, winter gloves add insulation and kids gloves come in youth sizes. Check the maker's size chart for each pair.",
    },
    guides: [
      {
        heading: "How to choose cycling gloves",
        body:
          "Measure around your palm just below the knuckles and match the maker's size chart. Choose full-finger gloves for cold weather and trail protection, and lighter gloves for summer road riding. Gel padding helps on long rides.",
      },
      {
        heading: "Gloves for winter riding",
        body:
          "Winter gloves add insulation, and some have touch-screen fingertips so you can use your phone or e-bike display. Choose a pair that is warm but still lets you feel the brake levers.",
      },
    ],
    links: [
      { label: "E-bike helmets", href: "/e-bike-helmets" },
      { label: "Kids bike helmets", href: "/kids-bike-helmets" },
      { label: "E-bike accessories", href: "/e-bike-accessories" },
    ],
    productsHeading: "Gloves in stock now",
    enquiry: "Need help with sizing? Tell us your palm measurement and we will suggest the right gloves.",
    faqs: [
      { q: "Which cycling gloves should I buy?", a: "Choose by the riding you do: padded gloves for road riding, hard-wearing full-finger gloves for mountain biking and insulated gloves for winter. Check the size chart for fit." },
      { q: "Do I need gloves on an e-bike?", a: "They are not compulsory, but gloves pad your palms against vibration, protect them in a fall and keep your grip in the wet or cold." },
      { q: "Do you sell kids gloves?", a: "Yes. We stock youth gloves from Fist, Giro and Black Mountain in youth sizes. Check the size chart for the right fit." },
      { q: "How do I find my glove size?", a: "Measure around your palm just below the knuckles and match it to the maker's size chart. Gloves should be snug without bunching, with room to close your fist." },
      { q: "How do I wash cycling gloves?", a: "Follow the care label. Most can be washed on a gentle cycle and air dried away from direct heat." },
    ],
    matches: (p) => isGlove(p),
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
      { label: "Bike gloves", href: "/bike-gloves" },
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
    matches: (p) => p.category === "accessories" && !isGlove(p),
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
