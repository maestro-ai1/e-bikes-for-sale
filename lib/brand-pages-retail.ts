import type { CatalogNode } from "@/lib/catalog";
import type { NodeKeywords } from "@/lib/catalog-keywords";

type BrandNode = Omit<CatalogNode, "keywords">;

/**
 * Brand hubs for the models that have product pages (Cube, Merida, Pedal, Dirodi).
 * The Semrush bank has almost no brand demand for these (Cube 50-70/mo, the others none), so the
 * focus keywords for Merida, Pedal and Dirodi are the natural brand phrase and are listed in the
 * "missing keywords" request. They carry volume 0 until Semrush data is supplied.
 */
export const RETAIL_BRAND_KEYWORDS: Record<string, NodeKeywords> = {
  "brand-cube": { primary: "cube e mountain bikes", primaryVolume: 50, primaryKd: 7, secondary: ["cube cargo bike"], supporting: [] },
  "brand-merida": { primary: "merida electric bike", primaryVolume: 0, primaryKd: 0, secondary: [], supporting: [] },
  "brand-pedal": { primary: "pedal electric bikes", primaryVolume: 0, primaryKd: 0, secondary: [], supporting: [] },
  "brand-dirodi": { primary: "dirodi electric bike", primaryVolume: 0, primaryKd: 0, secondary: [], supporting: [] },
};

export const BRAND_NODES_RETAIL: BrandNode[] = [
  {
    id: "brand-cube",
    kind: "landing",
    path: "/brands/cube",
    name: "Cube E-Bikes",
    navLabel: "Cube E-Bikes",
    title: "Cube E Mountain Bikes Australia | Cube E-Bike Range",
    description:
      "Browse Cube e mountain bikes and electric hybrids: Reaction Hybrid hardtail, Stereo Hybrid enduro, Touring Hybrid and Nuroad gravel. Compare specs and prices.",
    h1: "Cube E Mountain Bikes: Cube E-Bike Range in Australia",
    intro: [
      "Cube e mountain bikes and electric hybrids are known for Bosch-powered drives, integrated batteries and complete, ready-to-ride equipment. This range covers a hardtail and an enduro eMTB, two touring hybrids, a compact sport hybrid and a carbon gravel bike.",
      "Each model below has its own page with motor, battery and brake details, current pricing and photos. Use the comparison notes to narrow down which Cube suits your riding.",
    ],
    bridge: {
      heading: "Cube Reaction, Stereo, Touring or Nuroad?",
      body:
        "The Reaction Hybrid is the hardtail for trails and mixed riding. The Stereo Hybrid is the long-travel carbon enduro. The Touring Hybrid is the commuter and tourer with rack, mudguards and lights, and the Nuroad Hybrid is the lightweight gravel bike.",
    },
    guides: [
      {
        heading: "How to choose between Cube e-bike models",
        body:
          "Start with where you ride. Choose the Reaction for trails and fire roads, the Stereo for steep technical descents, the Touring for daily commuting and loaded touring, and the Nuroad for fast mixed-surface rides. Then compare battery capacity (500 to 800 Wh) against your usual ride length.",
      },
    ],
    links: [
      { label: "Electric mountain bikes", href: "/ebikes/electric-mountain-bike" },
      { label: "Electric commuter bikes", href: "/ebikes/electric-commuter-bikes" },
      { label: "Electric road and gravel bikes", href: "/ebikes/electric-road-bikes" },
    ],
    enquiry: "Need a specific Cube frame size or colour? Send us the model and we will check availability.",
    faqs: [
      { q: "Which Cube e-bike is best for mountain biking?", a: "The Reaction Hybrid suits trails and mixed riding. The Stereo Hybrid is the long-travel enduro for steep, technical terrain." },
      { q: "Do Cube e-bikes use Bosch motors?", a: "The Cube Hybrid models on this page use Bosch Performance Line drives and PowerTube or CompactTube batteries." },
      { q: "Which Cube is best for commuting?", a: "The Touring Hybrid ONE 600, available in a diamond or easy-entry step-through frame, includes a rack, mudguards and lights." },
    ],
    matches: (p) => p.brand === "Cube",
  },
  {
    id: "brand-merida",
    kind: "landing",
    path: "/brands/merida",
    name: "Merida E-Bikes",
    navLabel: "Merida E-Bikes",
    title: "Merida Electric Bike Australia | eOne-Sixty & eSilex",
    description:
      "Shop the Merida electric bike range: eOne-Sixty 400 enduro eMTB and eSilex gravel e-bikes. Compare motors, batteries and prices on each model page.",
    h1: "Merida Electric Bike: eOne-Sixty Enduro and eSilex Gravel E-Bikes",
    intro: [
      "A Merida electric bike gives you two very different options: the eOne-Sixty 400, a long-travel enduro eMTB with a Shimano EP801 mid-drive, and the eSilex gravel bikes, which use a light MAHLE hub drive and ride close to a regular gravel bike.",
      "Open a model page for specs, battery size and current pricing, or use the notes below to pick the right Merida for your riding.",
    ],
    bridge: {
      heading: "eOne-Sixty or eSilex?",
      body:
        "Choose the eOne-Sixty for steep trails and bike parks, where 85 Nm and a 630 Wh battery matter. Choose an eSilex if you want a light, natural-feeling gravel or road bike with assistance on climbs.",
    },
    guides: [
      {
        heading: "Mid-drive versus hub-drive Merida e-bikes",
        body:
          "A mid-drive such as the Shimano EP801 delivers strong torque for climbing and handles technical terrain well. A light hub drive such as MAHLE keeps weight down and feels closer to an unassisted bike, which suits gravel and road riding.",
      },
    ],
    links: [
      { label: "Electric mountain bikes", href: "/ebikes/electric-mountain-bike" },
      { label: "Electric road and gravel bikes", href: "/ebikes/electric-road-bikes" },
    ],
    enquiry: "Looking for a particular Merida size or colour? Tell us the model and we will confirm availability.",
    faqs: [
      { q: "What motor does the Merida eOne-Sixty 400 have?", a: "A Shimano EP801 mid-drive rated at 250 W and 85 Nm, paired with a 630 Wh Shimano battery." },
      { q: "Is the Merida eSilex a heavy e-bike?", a: "No. Its small MAHLE hub drive and battery keep it light compared with mid-drive e-bikes, so it rides close to a conventional gravel bike." },
      { q: "Which Merida is best for gravel riding?", a: "The eSilex 400 and the eSilex+ 600 are built for gravel and mixed surfaces." },
    ],
    matches: (p) => p.brand === "Merida",
  },
  {
    id: "brand-pedal",
    kind: "landing",
    path: "/brands/pedal",
    name: "Pedal Electric Bikes",
    navLabel: "Pedal Electric Bikes",
    title: "Pedal Electric Bikes Australia | Folding, Cruiser, Fat Tyre",
    description:
      "Shop Pedal electric bikes: Derby and Dynamo folding e-bikes, Brewer cruiser, Bandit fat tyre and Lynx hardtail. Compare battery size, range and price.",
    h1: "Pedal Electric Bikes: Folding, Cruiser, Fat Tyre and Hardtail E-Bikes",
    intro: [
      "Pedal electric bikes cover value-focused folding, cruiser, fat tyre and hardtail e-bikes. This range includes the Derby and Dynamo 3 folding bikes, the Brewer cruiser, the Bandit 20 fat tyre bike and the Lynx 3 hardtail.",
      "Each model has its own page with battery size, motor and price details. Use the notes below to match a Pedal e-bike to how you ride.",
    ],
    bridge: {
      heading: "Which Pedal e-bike suits you?",
      body:
        "Pick a Derby or Dynamo 3 if you need to fold the bike for the train, boot or office. Pick the Brewer for relaxed rides on a step-through cruiser, the Bandit for sand and gravel, and the Lynx 3 for trails.",
    },
    guides: [
      {
        heading: "What to compare on a value e-bike",
        body:
          "Compare battery capacity (Wh), the brake type (hydraulic discs stop more consistently than mechanical), whether the battery is removable, and the claimed range against your usual trip length.",
      },
    ],
    links: [
      { label: "Folding e-bikes", href: "/ebikes/folding-e-bike" },
      { label: "Electric cruiser bikes", href: "/ebikes/electric-cruiser-bikes" },
      { label: "Fat tyre electric bicycles", href: "/ebikes/fat-tyre-electric-bicycle" },
      { label: "Cheap electric bikes", href: "/cheap-electric-bikes" },
    ],
    enquiry: "Not sure which Pedal model fits your budget? Tell us how you ride and we will suggest one.",
    faqs: [
      { q: "Which Pedal e-bike folds?", a: "The Pedal Derby and the Pedal Dynamo 3 are folding e-bikes on 20 inch wheels." },
      { q: "Which Pedal is best for sand and gravel?", a: "The Pedal Bandit 20 has 4 inch fat tyres designed for sand, gravel and city riding." },
      { q: "Are Pedal e-bikes road legal in Australia?", a: "They are pedal-assist e-bikes with a 250 W class motor and a 25 km/h assist limit, which follows the EN 15194 pedelec rules." },
    ],
    matches: (p) => p.brand === "Pedal",
  },
  {
    id: "brand-dirodi",
    kind: "landing",
    path: "/brands/dirodi",
    name: "Dirodi Electric Bikes",
    navLabel: "Dirodi Electric Bikes",
    title: "Dirodi Electric Bike Australia | Rover Pro Fat Bike",
    description:
      "Shop the Dirodi electric bike: Rover Pro 250W moto-style fat bike with a 52 V battery and up to 125 km claimed range. See specs, price and photos.",
    h1: "Dirodi Electric Bike: Rover Pro 250W Electric Fat Bike",
    intro: [
      "The Dirodi electric bike range is built around the Rover Pro, a moto-styled fat bike with a 250 W geared hub motor, a large 52 V battery and a two-person saddle.",
      "The Rover Pro page lists the motor, battery, range and price. Read the notes below to see who it suits.",
    ],
    bridge: {
      heading: "Who is the Dirodi Rover Pro for?",
      body:
        "It suits riders who want long range, a comfortable seat and a rack that carries a load. The moto styling, wide tyres and large battery make it a capable all-rounder for city streets, beaches and paths.",
    },
    guides: [
      {
        heading: "What to check on a long-range fat e-bike",
        body:
          "Compare the battery capacity and voltage, the claimed range (real range is lower and depends on rider weight, terrain and assist level), the weight, and how the throttle is limited under Australian rules.",
      },
    ],
    links: [
      { label: "Fat tyre electric bicycles", href: "/ebikes/fat-tyre-electric-bicycle" },
      { label: "Electric cruiser bikes", href: "/ebikes/electric-cruiser-bikes" },
    ],
    enquiry: "Want the step-through or camo version of the Rover Pro? Ask us what is available.",
    faqs: [
      { q: "What is the Dirodi Rover Pro range?", a: "Retailers list up to about 125 km of claimed range. Real range depends on rider weight, terrain and assist level." },
      { q: "Does the Dirodi have a throttle?", a: "The throttle is capped at 6 km/h, and pedal assist works up to 25 km/h." },
      { q: "Can it carry a passenger?", a: "It has a two-person saddle and a rear rack rated for 50 kg. Check the manufacturer's rider and load limits." },
    ],
    matches: (p) => p.brand === "Dirodi",
  },
];
