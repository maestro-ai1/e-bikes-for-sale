import type { CatalogNode } from "@/lib/catalog";

type BrandNode = Omit<CatalogNode, "keywords">;

export const BRAND_NODES: BrandNode[] = [
  {
    id: "brand-segway",
    kind: "landing",
    path: "/brands/segway-ninebot",
    name: "Segway-Ninebot Scooters",
    navLabel: "Segway-Ninebot Scooters",
    title: "Segway Scooter Australia | Segway-Ninebot Buyer's Guide",
    description:
      "Looking for a Segway scooter in Australia? Compare Segway-Ninebot electric scooters, E2 and E3 models, rules and prices, and ask about availability.",
    h1: "Segway Scooter: Segway-Ninebot Electric Scooters in Australia",
    intro: [
      "A Segway scooter is one of the most searched-for electric scooters in Australia. Segway-Ninebot's E-series KickScooters, including the E2 Pro, E2 Plus II and E3 Pro, are popular foldable commuter scooters, and shoppers want to know which model fits, what it costs and where they can ride it.",
      "This page is an independent buyer's guide with links to our model comparisons. Tell us which Segway-Ninebot model you want and we will confirm availability, and below you can compare the scooters we stock now.",
    ],
    bridge: {
      heading: "Scooter by Segway, Ninebot electric scooter or Segway electric scooter?",
      body:
        "They all point to the same thing: an electric scooter made by Segway-Ninebot. Whether you search for a scooter by Segway, a Ninebot electric scooter, a Segway electric scooter, an e scooter Ninebot model or a Segway Ninebot scooter, the buying questions are the same: how far will it go, how much can it carry, how good are the brakes, and what warranty applies in Australia.",
    },
    guides: [
      {
        heading: "Which Segway-Ninebot model is right for you?",
        body:
          "The E2 and E3 families share a foldable commuter design, so the choice comes down to motor output, battery size, comfort and features. Read our Ninebot E3 Pro vs E2 Pro comparison for the checklist, and our Ninebot E2 Pro price guide to see what drives the cost and what else to budget for. Always confirm current specifications on the manufacturer's Australian page.",
      },
      {
        heading: "Independent guide and trademarks",
        body:
          "Segway and Ninebot are trademarks of their respective owner. This page is independent and is not affiliated with or endorsed by Segway-Ninebot. Information about specific models is general and should be checked with the manufacturer.",
      },
    ],
    links: [
      { label: "Ninebot E3 Pro vs E2 Pro guide", href: "/blog/ninebot-e3-pro-vs-e2-pro-segway-ninebot-scooters" },
      { label: "Ninebot E2 Pro price guide", href: "/blog/ninebot-e2-pro-price-australia-segway-scooter-cost" },
      { label: "Adult e-scooters", href: "/scooters/adults-scooters" },
      { label: "Scooter accessories", href: "/scooters/scooter-accessories" },
    ],
    productsHeading: "Foldable commuter scooters in stock now",
    enquiry:
      "Looking for a specific Segway-Ninebot model such as the E2 Pro, E2 Plus II or E3 Pro? Tell us which one and we will come back to you about availability.",
    faqs: [
      { q: "Do you sell Segway scooters?", a: "Contact us for current availability of Segway-Ninebot models. If you want a stock option today, compare the foldable commuter scooters shown on this page." },
      { q: "What is the difference between a Segway scooter and a Ninebot scooter?", a: "Segway-Ninebot is one company, and its E-series KickScooters are sold under both names. The models differ in motor, battery and features." },
      { q: "Which is better, the Ninebot E2 Pro or the E3 Pro?", a: "It depends on your commute. Compare battery size, payload and brakes using the manufacturer's figures. Our comparison guide lists what to check." },
      { q: "Are Segway scooters legal in Australia?", a: "E-scooter rules vary by state and are changing in 2026, including licence requirements in Queensland. Check your state authority before you ride." },
      { q: "How much does a Segway scooter cost?", a: "Prices vary by model, retailer and promotion. See our price guide for what drives the cost and what extras to budget for." },
    ],
    productLimit: 2,
    matches: (p) => p.category === "scooters" && (p.subcategoryId === "scooters-electric" || p.subcategoryId === "scooters-adults"),
  },
];
