/**
 * The site menu as data. Every entry is a real URL, so the header, the mobile drawer and the footer directory
 * render crawlable <a href> links and no page is reachable only through JavaScript.
 * Paths mirror the mapped category, brand and gear pages (seo-strategy/keyword-map.LOCKED.json).
 */
export interface NavLeaf { label: string; href: string }
export interface NavGroup { heading: string; href?: string; links: NavLeaf[] }
export interface NavItem { label: string; href: string; groups?: NavGroup[] }

export const NAV: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'E-Bikes', href: '/ebikes',
    groups: [
      {
        heading: 'Electric mountain bikes', href: '/ebikes/electric-mountain-bike',
        links: [
          { label: 'Hardtail', href: '/ebikes/electric-mountain-bike/hardtail' },
          { label: 'Dual suspension', href: '/ebikes/electric-mountain-bike/dual-suspension' },
          { label: 'Enduro', href: '/ebikes/electric-mountain-bike/enduro' },
          { label: 'Trail', href: '/ebikes/electric-mountain-bike/trial-suspension' },
          { label: 'Kids mountain bikes', href: '/ebikes/electric-mountain-bike/kids-mountain-bikes' },
        ],
      },
      {
        heading: 'City and everyday', href: '/ebikes/electric-commuter-bikes',
        links: [
          { label: 'Commuter bikes', href: '/ebikes/electric-commuter-bikes' },
          { label: 'Pedal assist bikes', href: '/electric-hybrid-bikes' },
          { label: 'Folding e-bikes', href: '/ebikes/folding-e-bike' },
          { label: 'Cruiser e-bikes', href: '/ebikes/electric-cruiser-bikes' },
          { label: 'Road and gravel', href: '/ebikes/electric-road-bikes' },
        ],
      },
      {
        heading: 'Utility and fun', href: '/ebikes',
        links: [
          { label: 'Fat tyre e-bikes', href: '/ebikes/fat-tyre-electric-bicycle' },
          { label: 'Cargo e-bikes', href: '/ebikes/electric-cargo-bikes' },
          { label: 'Electric trikes', href: '/electric-trikes' },
          { label: 'Kids electric bikes', href: '/ebikes/kids-electric-bikes' },
          { label: 'Cheap electric bikes', href: '/cheap-electric-bikes' },
          { label: 'Used electric bikes', href: '/used-electric-bikes' },
        ],
      },
    ],
  },
  {
    label: 'Scooters', href: '/scooters',
    groups: [{
      heading: 'Electric scooters', href: '/scooters',
      links: [
        { label: 'Adult scooters', href: '/scooters/adults-scooters' },
        { label: 'Kids scooters', href: '/scooters/kids-scooters' },
        { label: 'Scooter accessories', href: '/scooters/scooter-accessories' },
        { label: 'Segway-Ninebot', href: '/brands/segway-ninebot' },
      ],
    }],
  },
  {
    label: 'Gear and parts', href: '/e-bike-accessories',
    groups: [
      {
        heading: 'Rider gear', href: '/e-bike-helmets',
        links: [
          { label: 'E-bike helmets', href: '/e-bike-helmets' },
          { label: 'Kids bike helmets', href: '/kids-bike-helmets' },
          { label: 'E-bike accessories', href: '/e-bike-accessories' },
        ],
      },
      {
        heading: 'Parts and power', href: '/e-bike-parts',
        links: [
          { label: 'E-bike parts', href: '/e-bike-parts' },
          { label: 'E-bike batteries', href: '/electric-bike-batteries' },
          { label: 'Conversion kits', href: '/electric-bike-conversion-kits' },
        ],
      },
    ],
  },
  {
    label: 'Brands', href: '/brands',
    groups: [{
      heading: 'Brand guides', href: '/brands',
      links: [
        { label: 'Cube', href: '/brands/cube' },
        { label: 'Merida', href: '/brands/merida' },
        { label: 'Pedal', href: '/brands/pedal' },
        { label: 'DiroDi', href: '/brands/dirodi' },
        { label: 'Specialized', href: '/brands/specialized' },
        { label: 'Trek', href: '/brands/trek' },
        { label: 'Canyon', href: '/brands/canyon' },
        { label: 'Pulse', href: '/brands/pulse' },
        { label: 'Reid', href: '/brands/reid' },
        { label: 'Aldi', href: '/brands/aldi' },
        { label: 'Segway-Ninebot', href: '/brands/segway-ninebot' },
      ],
    }],
  },
  {
    label: 'Locations', href: '/ebikes',
    groups: [{
      heading: 'Electric bikes by city', href: '/ebikes',
      links: [
        { label: 'Melbourne', href: '/electric-bikes-melbourne' },
        { label: 'Sydney', href: '/electric-bikes-sydney' },
        { label: 'Brisbane', href: '/electric-bikes-brisbane' },
        { label: 'Perth', href: '/electric-bikes-perth' },
        { label: 'Adelaide', href: '/electric-bikes-adelaide' },
      ],
    }],
  },
  { label: 'Blog', href: '/blog' },
  {
    label: 'About', href: '/about',
    groups: [{
      heading: 'About us', href: '/about',
      links: [
        { label: 'Shop all products', href: '/shop' },
        { label: 'Compare e-bikes', href: '/compare' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Wholesale', href: '/wholesale' },
        { label: 'Contact', href: '/contact' },
        { label: 'Policies', href: '/policies' },
        { label: 'Legal and road rules', href: '/legal' },
      ],
    }],
  },
];

/** Flat list of every URL in the menu (used by the footer directory and the crawl check). */
export const NAV_URLS: string[] = [...new Set(NAV.flatMap((i) => [i.href, ...(i.groups || []).flatMap((g) => [g.href || '', ...g.links.map((l) => l.href)])]).filter(Boolean))];
