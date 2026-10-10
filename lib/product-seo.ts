import type { Product } from '@/lib/types';
import { CATALOG_KEYWORDS, type NodeKeywords } from '@/lib/catalog-keywords';
import { GEAR_KEYWORDS, STRATEGY_OVERRIDES } from '@/lib/gear-pages';
import { STRATEGY_KEYWORDS } from '@/lib/strategy-map';
import { withTransactional } from '@/lib/transactional-keywords';

/**
 * Product SEO rules (seo-strategy/keyword-map.md is the source of truth, never invent keywords):
 *  - up to 10 tags per product, taken from the mapped keywords of the product's category page
 *    (primary, then buy-intent terms, then secondary, then supporting) and only the ones that fit the product.
 *  - exactly 5 FAQs per product page. Each answer uses at most ONE mapped keyword, once, in a natural clause.
 *    No keyword is repeated across a product's FAQs unless the product has fewer than 5 mapped tags,
 *    in which case the remaining FAQs carry no keyword (no stuffing).
 */

type FaqItem = { question: string; answer: string };

/** Category page (keyword-map.md node) a product belongs to. */
export function nodeIdForProduct(p: Product): string {
  if (p.brand === 'Segway-Ninebot') return 'brand-segway';
  const sub = p.subcategoryId || '';
  switch (p.category) {
    case 'emtb':
      if (/hardtail/.test(sub)) return 'emtb-hardtail';
      if (/dual/.test(sub)) return 'emtb-dual';
      if (/enduro/.test(sub)) return 'emtb-enduro';
      if (/trial|trail/.test(sub)) return 'emtb-trail';
      if (/kid|youth|junior/.test(sub) || /junior|youth/i.test(p.name)) return 'emtb-kids';
      return 'emtb';
    case 'scooters':
      if (/kids/.test(sub)) return 'sc-kids';
      if (/accessor/.test(sub)) return 'sc-accessories';
      return 'sc-electric';
    case 'helmets':
      return /kid|youth|junior/i.test(p.name) ? 'kids-helmets' : 'gear-helmets';
    case 'accessories':
      return 'gear-accessories';
    case 'parts':
      return 'gear-parts';
    case 'cruiser': return 'cruiser';
    case 'fat-tyre': return 'fat-tyre';
    case 'folding': return 'folding';
    case 'cargo': return 'cargo';
    case 'road': return 'road';
    case 'commuter': return 'commuter';
    default: return 'hub';
  }
}


export function keywordsForProduct(p: Product): NodeKeywords | undefined {
  const id = nodeIdForProduct(p);
  const base = CATALOG_KEYWORDS[id] ?? GEAR_KEYWORDS[id];
  const over = STRATEGY_KEYWORDS[id] ?? STRATEGY_OVERRIDES[id];
  return base || over ? ({ ...(base as NodeKeywords), ...(over ?? {}), commerce: withTransactional(id, base?.commerce) } as NodeKeywords) : undefined;
}

/** Mapped keywords that make sense for this specific product (accessory sub-types get their own subset). */
function fitsProduct(p: Product, kw: string): boolean {
  if (p.category !== 'accessories') return true;
  const name = `${p.name} ${p.subcategory || ''}`.toLowerCase();
  const k = kw.toLowerCase();
  if (/\b(seat|saddle)\b/.test(k)) return /\b(seat|saddle)\b/.test(name);
  if (/\bpedal/.test(k)) return /\bpedal/.test(name);
  if (/\blight|lighting|headlight/.test(k)) return /\blight|lumen/.test(name);
  return true;
}

/** Up to 10 tags from the mapped keywords of this product's category that fit the product. */
export function tagsForProduct(p: Product): string[] {
  const k = keywordsForProduct(p);
  if (!k) return p.tags || [];
  const all = [k.primary, ...(k.commerce || []).slice(0, 4), ...k.secondary, ...(k.supporting || [])];
  return [...new Set(all.map((t) => t.trim()).filter(Boolean))].filter((t) => fitsProduct(p, t)).slice(0, 10);
}

const money = (n: number) => `$${n.toLocaleString('en-AU')}`;
const isBike = (p: Product) => ['emtb', 'folding', 'cruiser', 'fat-tyre', 'cargo', 'road', 'commuter'].includes(p.category);
const sentence = (s: string) => {
  const t = (s || '').trim();
  return t ? (/[.!?]$/.test(t) ? t : `${t}.`) : '';
};

/** Exactly 5 FAQs, one mapped keyword per answer at most, none repeated. */
export function buildFaqs(p: Product): FaqItem[] {
  const tags = [...new Set((p.tags && p.tags.length ? p.tags : tagsForProduct(p)).filter(Boolean))];
  // keyword clause: a short sentence that mentions the keyword once, or nothing when there is no unused tag
  const clause = (i: number, tpl: (kw: string) => string) => (i < tags.length ? ` ${tpl(tags[i])}` : '');
  const desc = sentence(p.shortDescription || p.subtitle);
  const price = p.compareAtPrice && p.compareAtPrice > p.price ? `${money(p.price)} (full price ${money(p.compareAtPrice)})` : money(p.price);
  const delivery = `You can order the ${p.name} online with delivery across Australia, usually in 2-5 business days to metro and regional postcodes. Paying with Bitcoin or USDT takes 10% off at checkout.`;
  const q1 = tags.length ? `Is the ${p.name} a good match for "${tags[0]}"?` : `Who is the ${p.name} best suited to?`;

  if (isBike(p)) {
    const battery = p.batteryWh > 0
      ? `The ${p.name} has a ${p.batteryWh} Wh battery${p.rangeKm > 0 ? `, with a claimed range of up to ${p.rangeKm} km` : ''}. Real range depends on assist level, terrain and rider weight, so compare watt-hours rather than claimed range.`
      : `Check the battery watt-hours (Wh) on the spec sheet rather than the claimed range. Real range depends on assist level, terrain and rider weight.`;
    return [
      { question: q1, answer: `${desc} It suits riders who want to buy online and ride straight away. Ask us if you want help matching it to your route.` },
      { question: `How far does the ${p.name} go on one charge?`, answer: battery + clause(1, (k) => `This is the figure to compare if you are researching "${k}".`) },
      { question: `Do I need a licence or registration for the ${p.name}?`, answer: `A compliant pedal-assist e-bike with a 250 W motor and assist that cuts out at 25 km/h is treated as a bicycle in Australia, so no registration or licence is needed.${clause(2, (k) => `That rule applies to a typical "${k}" too.`)} Wear a certified helmet and check your state rules.` },
      { question: `How much is the ${p.name} and can I buy it online?`, answer: `The ${p.name} is ${price}. ${delivery}${clause(3, (k) => `Searching for "${k}"? Send an enquiry and we will confirm availability and frame size.`)}` },
      { question: `What warranty and support come with the ${p.name}?`, answer: `The ${p.name} carries the manufacturer's Australian warranty, and we can help with servicing questions and spare parts.${clause(4, (k) => `If you are comparing options for "${k}", ask us for the warranty terms before you order.`)}` },
    ];
  }

  if (p.category === 'scooters') {
    return [
      { question: q1, answer: `${desc} It suits commuters and everyday riders. Check the manufacturer's current specifications before you order.` },
      { question: `Where can I ride the ${p.name} in Australia?`, answer: `E-scooter rules differ by state and are changing, including where they can be ridden, speed limits and age rules. Check your state road authority before riding on public paths or roads.${clause(1, (k) => `This applies to anyone searching for "${k}".`)}` },
      { question: `What range can I expect from the ${p.name}?`, answer: `${p.rangeKm > 0 ? `The ${p.name} has a claimed range of up to ${p.rangeKm} km. ` : ''}Real range depends on rider weight, speed, terrain and temperature, so look at battery watt-hours and motor power, not just the headline range.${clause(2, (k) => `Use the same checks when comparing "${k}".`)}` },
      { question: `How much is the ${p.name} and can I buy it online?`, answer: `The ${p.name} is ${price}. ${delivery}${clause(3, (k) => `Searching for "${k}"? Use the enquiry button and we will confirm stock and delivery time.`)}` },
      { question: `What should I buy with the ${p.name}?`, answer: `A certified helmet, a strong lock and lights are the essentials.${clause(4, (k) => `Browse our scooter accessories and helmets if you are building a setup around "${k}".`)}` },
    ];
  }

  if (p.category === 'helmets') {
    return [
      { question: q1, answer: `${desc} It is a bicycle helmet suited to e-bike and bike riders. Choose one that fits snugly, sits level on the forehead and is certified to AS/NZS 2063.` },
      { question: `How should the ${p.name} fit?`, answer: `Measure your head just above the eyebrows and match the size chart. The helmet should sit two fingers above the eyebrows, with straps forming a V below the ears, and it should not rock when you shake your head.${clause(1, (k) => `The same fit check applies when you shop for "${k}".`)}` },
      { question: `Are helmets compulsory in Australia?`, answer: `Yes. An approved bicycle helmet is required for all bicycle and e-bike riders in every state and territory. A helmet certified to AS/NZS 2063 meets the standard.${clause(2, (k) => `That covers a "${k}" purchase too.`)} Check your state authority for the details.` },
      { question: `How much is the ${p.name} and can I buy it online?`, answer: `The ${p.name} is ${price}. ${delivery}${clause(3, (k) => `Searching for "${k}"? Add it to cart or ask us about sizing.`)}` },
      { question: `When should I replace a bike helmet?`, answer: `Replace a helmet after a significant impact, when the shell or straps are damaged, or when it no longer fits. Many makers also recommend replacing a helmet every few years.${clause(4, (k) => `This is worth checking before you buy for "${k}".`)}` },
    ];
  }

  // accessories, parts and everything else
  const kind = (p.subtitle || p.categoryLabel).replace(/\.$/, '');
  return [
    { question: `Is the ${p.name} suitable for an e-bike?`, answer: `${desc} Standard bicycle accessories and parts suit most e-bikes. Check size, fit and any weight rating before you order.${clause(0, (k) => `This is the right product to look at if you searched for "${k}".`)}` },
    { question: `How do I choose between similar products?`, answer: `Match the product to your bike and riding: check size or fit, rating and the type of use. Our team can confirm that the ${p.name} suits your model if you send us the make and model.${clause(1, (k) => `We see this most with "${k}".`)}` },
    { question: `How much is the ${p.name} and can I buy it online?`, answer: `The ${p.name} is ${price}. ${delivery}${clause(2, (k) => `Searching for "${k}"? Add it to cart or send an enquiry.`)}` },
    { question: `What type of product is the ${p.name}?`, answer: `${kind}, from ${p.brand}, suited to e-bike and bicycle riders. Compare price, rating and warranty before you buy.${clause(3, (k) => `It sits in our "${k}" range.`)}` },
    { question: `Can you confirm stock and fit before I pay?`, answer: `Yes. Use the enquiry button and we will confirm stock, sizes and colours, and check compatibility with your bike.${clause(4, (k) => `Mention "${k}" if you want us to suggest alternatives.`)}` },
  ];
}

/**
 * Exactly 5 FAQs per product, each carrying one mapped keyword.
 * Products that already have hand-written FAQs keep them; a keyword clause is added to any answer that has none.
 */
export function ensureFaqs(p: Product): FaqItem[] {
  if (!p.faqs || p.faqs.length < 5) return buildFaqs(p);
  const tags = [...new Set((p.tags || []).filter(Boolean))];
  const templates: ((k: string) => string)[] = [
    (k) => `This is a popular choice if you searched for "${k}".`,
    (k) => `The same applies when you compare options for "${k}".`,
    (k) => `Useful to know if you are researching "${k}".`,
    (k) => `Searching for "${k}"? Send an enquiry and we will confirm details.`,
    (k) => `Ask us if you want more options for "${k}".`,
  ];
  const lowerTags = tags.map((t) => t.toLowerCase());
  return p.faqs.slice(0, 5).map((f, i) => {
    const text = `${f.question} ${f.answer}`.toLowerCase();
    if (lowerTags.some((t) => text.includes(t))) return f;
    const k = tags[i];
    return k ? { ...f, answer: `${f.answer.replace(/\s+$/, '')} ${templates[i % templates.length](k)}` } : f;
  });
}
