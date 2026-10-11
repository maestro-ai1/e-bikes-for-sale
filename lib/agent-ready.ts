import { createHash } from 'node:crypto';
import { BUSINESS_INFO, PRODUCTS, BLOG_POSTS } from '@/lib/data';
import type { Product } from '@/lib/types';

/** Every URL here points at something the site really serves. Nothing is advertised that does not resolve. */
export const SITE = 'https://ebikesforsale.com.au';
export const SITE_NAME = BUSINESS_INFO.name;
export const TAGLINE = 'Electric bikes, scooters, helmets and parts for Australian riders';

const money = (n: number) => `$${n.toLocaleString('en-AU')}`;

export const CATEGORY_LINKS: { label: string; path: string; blurb: string }[] = [
  { label: 'Electric bikes', path: '/ebikes', blurb: 'commuter, mountain, folding, cruiser, fat tyre, cargo and road e-bikes' },
  { label: 'Electric mountain bikes', path: '/ebikes/electric-mountain-bike', blurb: 'hardtail, dual suspension and enduro eMTBs' },
  { label: 'Electric commuter bikes', path: '/ebikes/electric-commuter-bikes', blurb: 'step-through and hybrid city e-bikes' },
  { label: 'Folding e-bikes', path: '/ebikes/folding-e-bike', blurb: 'compact folding electric bikes' },
  { label: 'Fat tyre e-bikes', path: '/ebikes/fat-tyre-electric-bicycle', blurb: 'all-terrain fat tyre electric bicycles' },
  { label: 'Electric cargo bikes', path: '/ebikes/electric-cargo-bikes', blurb: 'family and cargo e-bikes' },
  { label: 'Electric scooters', path: '/scooters', blurb: 'adult and kids electric scooters, Segway-Ninebot' },
  { label: 'E-bike helmets', path: '/e-bike-helmets', blurb: 'AS/NZS 2063 helmets' },
  { label: 'E-bike accessories', path: '/e-bike-accessories', blurb: 'lights, locks, baskets, bags' },
  { label: 'E-bike parts', path: '/e-bike-parts', blurb: 'tyres, brakes, chains and components' },
  { label: 'Brands', path: '/brands', blurb: 'Cube, Merida, Pedal, DiroDi, Segway-Ninebot and buyer guides' },
];

export const productUrl = (p: Product) => `${SITE}/product/${p.slug}`;
const absImage = (src?: string) => (src ? (src.startsWith('http') ? src : `${SITE}${src}`) : '');

export function productRecord(p: Product) {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    category: p.category,
    categoryLabel: p.categoryLabel,
    price: p.price,
    compareAtPrice: p.compareAtPrice && p.compareAtPrice > p.price ? p.compareAtPrice : null,
    currency: 'AUD',
    inStock: p.inStock,
    url: productUrl(p),
    image: absImage(p.image),
    batteryWh: p.batteryWh > 0 ? p.batteryWh : null,
    torqueNm: p.torqueNm > 0 ? p.torqueNm : null,
    rangeKm: p.rangeKm > 0 ? p.rangeKm : null,
    summary: p.shortDescription || p.subtitle || '',
  };
}

/** llms.txt (llmstxt.org): H1, blockquote summary, then H2 sections of markdown links. */
export function llmsTxt(): string {
  const byCat = new Map<string, Product[]>();
  PRODUCTS.forEach((p) => byCat.set(p.categoryLabel, [...(byCat.get(p.categoryLabel) || []), p]));
  const prices = PRODUCTS.map((p) => p.price).filter((n) => n > 0);
  const lines = [
    `# ${SITE_NAME}`,
    '',
    `> ${TAGLINE}. Australian online store with ${PRODUCTS.length} products, prices in AUD, delivery Australia-wide. Pedal-assist e-bikes follow the Australian EN 15194 rules (250 W, assistance cuts out at 25 km/h).`,
    '',
    `Operated by ${BUSINESS_INFO.legalName} (ABN ${BUSINESS_INFO.abn}). Contact: ${BUSINESS_INFO.email}, ${BUSINESS_INFO.phone}. Minimum order ${money(BUSINESS_INFO.minOrder)}; free delivery over ${money(BUSINESS_INFO.freeDeliveryThreshold)}. Payment by PayID, bank transfer (Osko/EFT) or crypto (10% discount).`,
    '',
    '## Shop',
    ...CATEGORY_LINKS.map((c) => `- [${c.label}](${SITE}${c.path}): ${c.blurb}`),
    `- [All products](${SITE}/shop): filter by category, brand and price (${money(Math.min(...prices))} to ${money(Math.max(...prices))})`,
    '',
    '## Guides and help',
    `- [Buying guides and blog](${SITE}/blog): e-bike laws, range, battery, size and price guides`,
    `- [Legal and road rules](${SITE}/legal): Australian e-bike and e-scooter rules by state`,
    `- [FAQ](${SITE}/faq): delivery, payment, returns and support`,
    `- [Compare e-bikes](${SITE}/compare): side-by-side specifications`,
    `- [Wholesale](${SITE}/wholesale): fleet and bulk supply`,
    `- [Contact](${SITE}/contact): questions and order support`,
    '',
    '## Buying guides',
    ...BLOG_POSTS.map((b) => `- [${b.title}](${SITE}/blog/${b.slug}): ${b.excerpt}`),
    '',
    '## Machine-readable',
    `- [Product catalog API](${SITE}/api/products): JSON, filter with category, brand, q, maxPrice, page, limit`,
    `- [Full product list](${SITE}/llms-full.txt): every product with price and link`,
    `- [Sitemap](${SITE}/sitemap.xml)`,
    '',
    '## Optional',
    `- [API catalog](${SITE}/.well-known/api-catalog)`,
    `- [Agent skills index](${SITE}/.well-known/agent-skills/index.json)`,
    `- [OpenAPI description](${SITE}/api/openapi.json)`,
    `- [Policies](${SITE}/policies)`,
    '',
  ];
  return lines.join('\n');
}

export function llmsFullTxt(): string {
  const groups = new Map<string, Product[]>();
  PRODUCTS.forEach((p) => groups.set(p.categoryLabel, [...(groups.get(p.categoryLabel) || []), p]));
  const out = [`# ${SITE_NAME}: full product list`, '', `> ${PRODUCTS.length} products, prices in AUD, updated at build time. Details and checkout on each product page.`, ''];
  for (const [label, list] of [...groups.entries()].sort((a, b) => b[1].length - a[1].length)) {
    out.push(`## ${label}`, '');
    list.forEach((p) => out.push(`- [${p.name}](${productUrl(p)}): ${p.brand}, ${money(p.price)}${p.inStock ? '' : ', out of stock'}`));
    out.push('');
  }
  out.push('## Buying guides', '');
  BLOG_POSTS.forEach((b) => out.push(`- [${b.title}](${SITE}/blog/${b.slug}): ${b.excerpt}`));
  out.push('');
  return out.join('\n');
}

/** ARD manifest (/.well-known/ai-catalog.json): only resources the site really serves. */
export function aiCatalog() {
  return {
    specVersion: '1.0',
    host: { displayName: SITE_NAME, url: SITE, description: `${TAGLINE}. Prices in AUD, delivery Australia-wide.` },
    entries: [
      {
        id: 'urn:air:ebikesforsale.com.au:api:products',
        displayName: 'Product catalog API',
        type: 'application/json',
        url: `${SITE}/api/products`,
        representativeQueries: ['electric commuter bikes under $2000 in Australia', 'folding e-bikes for sale', 'AS/NZS 2063 e-bike helmets', 'electric mountain bikes hardtail'],
      },
      {
        id: 'urn:air:ebikesforsale.com.au:api:openapi',
        displayName: 'Product catalog OpenAPI description',
        type: 'application/json',
        url: `${SITE}/api/openapi.json`,
        representativeQueries: ['how do I filter e-bikes by price and category', 'e-bike store product API schema'],
      },
      {
        id: 'urn:air:ebikesforsale.com.au:docs:llms',
        displayName: 'Site guide for language models (llms.txt)',
        type: 'text/plain',
        url: `${SITE}/llms.txt`,
        representativeQueries: ['e-bike buying guides Australia', 'e-bike laws 250W 25 km/h Australia', 'how far does an electric bike go'],
      },
    ],
  };
}

export interface AgentSkill { name: string; type: string; description: string; body: string }

export const AGENT_SKILLS: AgentSkill[] = [
  {
    name: 'browse-catalog',
    type: 'navigation',
    description: 'List and filter the product catalog as JSON (category, brand, search text, maximum price).',
    body: `---\nname: browse-catalog\ndescription: Find e-bikes, scooters, helmets and parts on ${SITE_NAME}\n---\n\n# Browse the catalog\n\nGET ${SITE}/api/products\n\nQuery parameters: \`category\` (emtb, commuter, folding, fat-tyre, cargo, cruiser, road, scooters, helmets, accessories, parts), \`brand\`, \`q\` (text search), \`maxPrice\` (AUD), \`page\`, \`limit\` (max 100).\n\nEach item has name, brand, price (AUD), compareAtPrice, inStock, url and image. Open \`url\` for full specifications, FAQs and the add-to-cart button.\n\nSpecs are shown only when known; missing values are null, never guessed.\n`,
  },
  {
    name: 'check-rules',
    type: 'content',
    description: 'Australian e-bike and e-scooter rules and buying guides written for riders.',
    body: `---\nname: check-rules\ndescription: Look up Australian e-bike and e-scooter rules and buying guides\n---\n\n# Rules and guides\n\n- Rules by state: ${SITE}/legal\n- Buying guides and laws: ${SITE}/blog\n- A compliant pedal-assist e-bike has a 250 W motor and assistance that cuts out at 25 km/h (EN 15194). Check the state authority for the final word.\n`,
  },
  {
    name: 'enquire-or-order',
    type: 'support',
    description: 'Contact the store or start an order. A person completes the purchase and payment.',
    body: `---\nname: enquire-or-order\ndescription: Ask the store a question or start an order\n---\n\n# Enquire or order\n\n- Contact form: ${SITE}/contact\n- Email: ${BUSINESS_INFO.email}\n- Orders are completed by the customer in the cart; agents can prepare a cart link but must not submit payment details.\n- Minimum order ${money(BUSINESS_INFO.minOrder)}; free delivery over ${money(BUSINESS_INFO.freeDeliveryThreshold)}.\n`,
  },
];

export const sha256 = (s: string) => createHash('sha256').update(s, 'utf8').digest('hex');

export function agentSkillsIndex() {
  return {
    $schema: 'https://agentskills.io/schema/v0.2.0/index.json',
    name: SITE_NAME,
    url: SITE,
    description: TAGLINE,
    skills: AGENT_SKILLS.map((s) => ({
      name: s.name,
      type: s.type,
      description: s.description,
      url: `${SITE}/.well-known/agent-skills/${s.name}/SKILL.md`,
      sha256: sha256(s.body),
    })),
  };
}

export function apiCatalog() {
  return {
    linkset: [
      {
        anchor: `${SITE}/api/products`,
        'service-desc': [{ href: `${SITE}/api/openapi.json`, type: 'application/openapi+json' }],
        'service-doc': [{ href: `${SITE}/llms.txt`, type: 'text/plain' }],
        title: `${SITE_NAME} product catalog (read-only)`,
      },
      { anchor: `${SITE}/shop`, type: 'text/html', title: `${SITE_NAME} product catalog` },
      { anchor: `${SITE}/contact`, type: 'text/html', title: `${SITE_NAME} contact` },
    ],
  };
}

export function openApi() {
  return {
    openapi: '3.1.0',
    info: { title: `${SITE_NAME} catalog`, version: '1.0.0', description: 'Read-only product catalog. Prices are in AUD.' },
    servers: [{ url: SITE }],
    paths: {
      '/api/products': {
        get: {
          operationId: 'listProducts',
          summary: 'List products',
          parameters: [
            { name: 'category', in: 'query', schema: { type: 'string' } },
            { name: 'brand', in: 'query', schema: { type: 'string' } },
            { name: 'q', in: 'query', schema: { type: 'string' } },
            { name: 'maxPrice', in: 'query', schema: { type: 'number' } },
            { name: 'page', in: 'query', schema: { type: 'integer', minimum: 1 } },
            { name: 'limit', in: 'query', schema: { type: 'integer', minimum: 1, maximum: 100 } },
          ],
          responses: { '200': { description: 'A page of products', content: { 'application/json': { schema: { type: 'object' } } } } },
        },
      },
    },
  };
}
