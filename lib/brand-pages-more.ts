import type { CatalogNode } from "@/lib/catalog";

type BrandNode = Omit<CatalogNode, "keywords">;

const NOTE =
  "Brand names are trademarks of their respective owners. This page is an independent buyer's guide and is not affiliated with or endorsed by the brand. Check specifications, warranty and pricing with the manufacturer or an authorised dealer before you buy.";

const common = {
  kind: "landing" as const,
  productsHeading: "E-bikes we stock now",
  productLimit: 3,
};

export const BRAND_NODES_MORE: BrandNode[] = [
  {
    ...common,
    id: "brand-specialized",
    path: "/brands/specialized",
    name: "Specialized E-Bikes",
    navLabel: "Specialized E-Bikes",
    title: "Specialized Australia | E-Bike Buyer's Guide",
    description:
      "Looking for Specialized in Australia? Compare Turbo Vado, Turbo Levo and Turbo Creo e-bikes, what to check before buying, and ask us about availability.",
    h1: "Specialized Australia: Turbo Vado, Levo & Creo E-Bikes",
    intro: [
      "Specialized is one of the most searched bike brands in Australia, and its Turbo range covers commuting (Turbo Vado), mountain biking (Turbo Levo) and road and gravel riding (Turbo Creo). If you searched for Specialized Australia, a Specialized ebike or a Specialised e bike, you are comparing a premium-priced range, so it pays to know what you are paying for.",
      "This page is an independent guide. Tell us the model you want and we will confirm whether we can help, and below you can compare the e-bikes we stock now at different price points.",
    ],
    bridge: {
      heading: "Specialized, Specialised or Specialized bikes: is it the same brand?",
      body:
        "Yes. Specialized is the brand name, and Specialised is the common local spelling people type into search. Specialized road bikes and Specialized bikes also include non-electric models. The Turbo models are the electric ones, so look for Turbo in the model name if you want a motor.",
    },
    guides: [
      {
        heading: "Which Specialized e-bike type suits you?",
        body:
          "Turbo Vado is the commuter and city line, Turbo Levo is the electric mountain bike line, and Turbo Creo is the lightweight road and gravel line. Match the type to where you ride most, then compare battery capacity, motor torque and frame sizes using the manufacturer's figures.",
      },
      {
        heading: "What to compare if the price is more than you planned",
        body:
          "Premium brands cost more for frame quality, motor integration, app features and dealer support. If you mainly want reliable pedal assist for commuting or trails, compare similar-spec alternatives on motor power, battery size, brakes and warranty before you decide.",
      },
      { heading: "Independent guide and trademarks", body: NOTE },
    ],
    links: [
      { label: "Electric mountain bikes", href: "/ebikes/electric-mountain-bike" },
      { label: "Electric commuter bikes", href: "/ebikes/electric-commuter-bikes" },
      { label: "Electric road bikes", href: "/ebikes/electric-road-bikes" },
      { label: "Used electric bikes", href: "/used-electric-bikes" },
    ],
    enquiry:
      "Looking for a specific Specialized model such as a Turbo Vado, Turbo Levo or Turbo Creo? Tell us which one and we will come back to you about availability.",
    faqs: [
      { q: "Do you sell Specialized e-bikes?", a: "Contact us for current availability of a specific Specialized model. If you want something in stock today, compare the e-bikes shown on this page." },
      { q: "What is the difference between a Turbo Vado and a Turbo Levo?", a: "The Turbo Vado is built for commuting and city riding. The Turbo Levo is an electric mountain bike with suspension for trails." },
      { q: "Is Specialized or Specialised the right spelling?", a: "Specialized is the brand spelling. Specialised is the common Australian spelling people use when searching, and results cover the same brand." },
      { q: "Are there cheaper alternatives to a Specialized e-bike?", a: "Yes. Compare motor power, battery capacity, brakes and warranty on similar e-bikes at lower prices, such as the commuter and mountain models listed on this page." },
    ],
    matches: (p) => p.category === "commuter" || p.category === "emtb" || p.category === "road",
  },
  {
    ...common,
    id: "brand-pulse",
    path: "/brands/pulse",
    name: "Pulse E-Bikes",
    navLabel: "Pulse E-Bikes",
    title: "Pulse E Bikes Australia | Buyer's Guide & Alternatives",
    description:
      "Searching for Pulse e bikes in Australia? See how Pulse, Velectrix and Voltaris searches relate, what to compare, and shop e-bikes available now.",
    h1: "Pulse E Bikes: Velectrix & Voltaris Pulse Buyer's Guide",
    intro: [
      "People searching for Pulse e bikes often type related names too, such as Velectrix electric bike or Voltaris Pulse. If you are comparing a Pulse e-bike, this guide covers what to check and how to find an equivalent in stock.",
      "This page is independent. Ask us about a specific model, or compare the commuter and city e-bikes we stock now.",
    ],
    bridge: {
      heading: "Pulse ebike conversion kit or a complete Pulse e-bike?",
      body:
        "Some searchers want a complete e-bike and others want a conversion kit for a bike they already own. A complete e-bike is ready to ride with warranty on the whole bike. A conversion kit adds a motor and battery to your existing frame and suits confident DIY riders. If you are weighing the two, our conversion kit guide explains the trade-offs.",
    },
    guides: [
      {
        heading: "What to check on any city e-bike",
        body:
          "Compare motor wattage and torque, battery size in watt-hours, brake type, range figures from the manufacturer, and what the warranty covers. Check it meets the Australian 250W pedal-assist rules if you plan to ride on paths and roads.",
      },
      { heading: "Independent guide and trademarks", body: NOTE },
    ],
    links: [
      { label: "Electric commuter bikes", href: "/ebikes/electric-commuter-bikes" },
      { label: "E-bike conversion kits", href: "/electric-bike-conversion-kits" },
      { label: "E-bike batteries", href: "/electric-bike-batteries" },
    ],
    enquiry:
      "Looking for a specific Pulse, Velectrix or Voltaris model? Tell us which one and we will come back to you about availability.",
    faqs: [
      { q: "Do you sell Pulse e bikes?", a: "Contact us for availability of a specific Pulse model. For a bike in stock today, compare the city e-bikes shown on this page." },
      { q: "Are Velectrix and Voltaris related to Pulse?", a: "Searchers often use the names together. Check the manufacturer or retailer for exactly which model and brand you are looking at." },
      { q: "Should I buy a complete e-bike or a conversion kit?", a: "A complete e-bike is simpler and covered by a single warranty. A conversion kit suits riders who want to keep their current bike and can fit it themselves." },
      { q: "What should I compare between Pulse and other e-bikes?", a: "Compare motor power, battery capacity, brakes, weight, range and warranty terms." },
    ],
    matches: (p) => p.category === "commuter" || p.category === "folding",
  },
  {
    ...common,
    id: "brand-reid",
    path: "/brands/reid",
    name: "Reid Electric Bikes",
    navLabel: "Reid Electric Bikes",
    title: "Reid Electric Bike Australia | Buyer's Guide & Alternatives",
    description:
      "Comparing a Reid electric bike in Australia? See what to check on budget e-bikes, how Reid compares with alternatives, and shop e-bikes we have now.",
    h1: "Reid Electric Bike: Buyer's Guide & Alternatives",
    intro: [
      "Reid is a well-known Australian bike brand, and many buyers search for a Reid electric bicycle or Reid ebike when they want an affordable first e-bike. This guide covers what to compare so you choose the right bike, whichever brand you end up with.",
      "This page is independent and we do not claim to sell Reid products. Below you can compare e-bikes we stock at similar budgets, or ask us about a specific need.",
    ],
    bridge: {
      heading: "Reid electric bicycle, Reid electric bike or Reid ebike?",
      body:
        "They are the same search. The practical question is what you need the bike for: commuting, casual weekend rides or carrying loads. Match that need to motor power, battery capacity and frame type before you compare prices.",
    },
    guides: [
      {
        heading: "How to compare budget e-bikes fairly",
        body:
          "At lower prices the details matter more: check the battery brand and watt-hours, brake type, motor wattage, weight, frame sizes and warranty length. A slightly higher price often buys a noticeably better battery and brakes.",
      },
      { heading: "Independent guide and trademarks", body: NOTE },
    ],
    links: [
      { label: "Cheap electric bikes", href: "/cheap-electric-bikes" },
      { label: "Electric commuter bikes", href: "/ebikes/electric-commuter-bikes" },
      { label: "Folding e-bikes", href: "/ebikes/folding-e-bike" },
    ],
    enquiry: "Looking for a bike similar to a Reid model? Tell us your budget and use, and we will suggest options.",
    faqs: [
      { q: "Do you sell Reid electric bikes?", a: "We do not list Reid bikes on this site. Compare the e-bikes shown on this page, or contact us with your budget and we will suggest options." },
      { q: "What should I check on a budget e-bike?", a: "Battery capacity and brand, brake type, motor power, weight and the warranty length." },
      { q: "Is a cheaper e-bike worth it?", a: "It can be, if the battery, brakes and warranty are solid. Very low prices often mean a smaller battery and weaker components." },
    ],
    matches: (p) => p.category === "commuter" || p.category === "folding" || p.category === "cruiser",
  },
  {
    ...common,
    id: "brand-trek",
    path: "/brands/trek",
    name: "Trek E-Bikes",
    navLabel: "Trek E-Bikes",
    title: "Trek E Bikes Australia | Buyer's Guide & Alternatives",
    description:
      "Looking at Trek e bikes in Australia? Compare what to check on premium electric bikes, and shop alternatives for commuting, trails and touring.",
    h1: "Trek E Bikes Australia: Buyer's Guide & Alternatives",
    intro: [
      "Trek is a major international bike brand, and its electric range covers commuting, mountain biking and touring. If you searched for Trek e bikes in Australia or Trek electric bikes, you are probably comparing premium models, so check what you actually need first.",
      "This page is independent and we do not claim to sell Trek products. Compare the e-bikes we stock below, or ask us for a recommendation.",
    ],
    bridge: {
      heading: "Trek ebike Australia, Trek electric bikes or Trek e bikes?",
      body:
        "All three searches point to the same electric range. Pick the type that matches your riding (city, trail or distance), then compare motor, battery and warranty with other brands before paying a premium.",
    },
    guides: [
      {
        heading: "Choosing between a premium brand and an alternative",
        body:
          "Premium brands add frame quality, integrated batteries and a dealer network. If you ride mainly for commuting or weekend trails, a well-specified alternative can give similar pedal assist at a lower price. Compare motor torque, battery capacity, brakes and warranty line by line.",
      },
      { heading: "Independent guide and trademarks", body: NOTE },
    ],
    links: [
      { label: "Electric mountain bikes", href: "/ebikes/electric-mountain-bike" },
      { label: "Electric commuter bikes", href: "/ebikes/electric-commuter-bikes" },
      { label: "Electric cargo bikes", href: "/ebikes/electric-cargo-bikes" },
    ],
    enquiry: "Looking for something similar to a Trek model? Tell us what you ride and your budget, and we will suggest options.",
    faqs: [
      { q: "Do you sell Trek e bikes?", a: "We do not list Trek bikes on this site. Compare the e-bikes shown on this page, or contact us with your needs." },
      { q: "What should I compare between e-bike brands?", a: "Motor power and torque, battery capacity, brakes, weight, frame sizes and warranty." },
      { q: "Do I need a premium e-bike for commuting?", a: "Not necessarily. A reliable motor, a good battery and decent brakes matter more than the badge." },
    ],
    matches: (p) => p.category === "commuter" || p.category === "emtb" || p.category === "cargo",
  },
  {
    ...common,
    id: "brand-canyon",
    path: "/brands/canyon",
    name: "Canyon E-Bikes",
    navLabel: "Canyon E-Bikes",
    title: "Canyon E Bikes Australia | Buyer's Guide & Alternatives",
    description:
      "Searching for Canyon e bikes in Australia? See what to check before buying direct-to-consumer e-bikes, and compare alternatives we stock for trails and roads.",
    h1: "Canyon E Bikes Australia: Buyer's Guide & Alternatives",
    intro: [
      "Canyon is a German direct-to-consumer bike brand known for performance mountain and road bikes. Buyers searching for Canyon e bikes in Australia often want a high-spec electric mountain or road bike without a dealer mark-up.",
      "This page is an independent guide, and we do not claim to sell Canyon products. Compare the trail and road e-bikes we stock, or ask us about your budget.",
    ],
    bridge: {
      heading: "Buying direct online: what to check",
      body:
        "With any online-first brand, check delivery time, assembly requirements, who handles warranty and servicing in Australia, and whether parts are available locally. These practical points matter as much as the spec sheet.",
    },
    guides: [
      {
        heading: "Compare trail and road e-bikes on the same checklist",
        body:
          "For electric mountain bikes compare suspension travel, motor torque, battery capacity and brakes. For road and gravel e-bikes compare weight, gearing, battery integration and tyre clearance.",
      },
      { heading: "Independent guide and trademarks", body: NOTE },
    ],
    links: [
      { label: "Electric mountain bikes", href: "/ebikes/electric-mountain-bike" },
      { label: "Electric road bikes", href: "/ebikes/electric-road-bikes" },
    ],
    enquiry: "Looking for something similar to a Canyon model? Tell us your riding and budget, and we will suggest options.",
    faqs: [
      { q: "Do you sell Canyon e bikes?", a: "We do not list Canyon bikes on this site. Compare the e-bikes shown on this page, or contact us with your needs." },
      { q: "What should I check when buying an e-bike online?", a: "Delivery time, assembly, warranty handling in Australia and local access to parts and servicing." },
    ],
    matches: (p) => p.category === "emtb" || p.category === "road",
  },
  {
    ...common,
    id: "brand-aldi",
    path: "/brands/aldi",
    name: "Aldi E-Bike Alternatives",
    navLabel: "Aldi E-Bike Alternatives",
    title: "Aldi E Bike Australia | Special Buy Guide & Alternatives",
    description:
      "Thinking about the Aldi e bike or Aldi folding electric bike? See what to check on special-buy e-bikes and compare e-bikes available any day of the year.",
    h1: "Aldi E Bike Australia: Special Buy Guide & Alternatives",
    intro: [
      "Aldi's special-buy e-bikes, including its folding electric bike, sell out quickly and are only available for a short time. If you searched for an Aldi e bike, an Aldi folding ebike or an Aldi electric bicycle review, this guide covers what to check, and what to buy when the stock has gone.",
      "This page is independent and is not affiliated with Aldi. Compare the folding and commuter e-bikes we stock, which are available whenever you are ready.",
    ],
    bridge: {
      heading: "Aldi foldable electric bike, Aldi ebike or Aldi e bike 2025?",
      body:
        "These all refer to Aldi's seasonal special-buy e-bikes. Stock, models and prices change by promotion, so check the current Aldi catalogue for exactly what is on offer. Meanwhile, if you want a folding e-bike you can order today, compare the options below.",
    },
    guides: [
      {
        heading: "What to check on a special-buy e-bike",
        body:
          "Look at battery capacity, motor power, brake type, folded size and weight, the warranty period, and how servicing and spare parts are handled after the promotion ends.",
      },
      { heading: "Independent guide and trademarks", body: NOTE },
    ],
    links: [
      { label: "Folding e-bikes", href: "/ebikes/folding-e-bike" },
      { label: "Cheap electric bikes", href: "/cheap-electric-bikes" },
      { label: "Electric commuter bikes", href: "/ebikes/electric-commuter-bikes" },
    ],
    enquiry: "Missed the Aldi special? Tell us your budget and we will suggest a folding or commuter e-bike you can order now.",
    faqs: [
      { q: "Do you sell the Aldi e bike?", a: "No. Aldi's e-bikes are special buys sold only by Aldi. Compare the folding and commuter e-bikes on this page, which you can order any time." },
      { q: "What should I check on a folding e-bike?", a: "Folded size, weight, battery capacity, motor power, brake type and warranty." },
      { q: "Is a special-buy e-bike a good idea?", a: "It can be good value, but stock is limited and after-sales support varies. Check the warranty and how parts are supplied." },
    ],
    matches: (p) => p.category === "folding" || p.category === "commuter",
  },
];
