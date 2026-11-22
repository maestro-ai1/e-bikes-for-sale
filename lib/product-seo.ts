import type { Product } from '@/lib/types';
import { CATALOG_KEYWORDS, type NodeKeywords } from '@/lib/catalog-keywords';
import { GEAR_KEYWORDS, STRATEGY_OVERRIDES } from '@/lib/gear-pages';
import { STRATEGY_KEYWORDS } from '@/lib/strategy-map';
import { withTransactional, withSupporting } from '@/lib/transactional-keywords';
import { typeKeywordsFor } from '@/lib/product-keywords';
import { RETAIL_BRAND_KEYWORDS } from '@/lib/brand-pages-retail';

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
  if (p.category === 'cargo' && /\b(trike|tricycle)\b/i.test(p.name)) return 'trikes';
  if (p.category === 'parts' && /conversion kit|motor kit/i.test(p.name)) return 'conversion';
  if (p.category === 'parts' && /battery/i.test(p.name)) return 'batteries';
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
  return base || over ? ({ ...(base as NodeKeywords), ...(over ?? {}), commerce: withTransactional(id, base?.commerce), supporting: withSupporting(id, ({ ...(base as NodeKeywords), ...(over ?? {}) } as NodeKeywords).supporting) } as NodeKeywords) : undefined;
}

/** Mapped keywords that make sense for this specific product (accessory sub-types get their own subset). */
function fitsProduct(p: Product, kw: string): boolean {
  if (p.category !== 'accessories' && p.category !== 'parts') return true;
  const name = `${p.name} ${p.subcategory || ''}`.toLowerCase();
  const k = kw.toLowerCase();
  // a keyword about a specific kind of product only goes on a product of that kind
  const KINDS: [RegExp, RegExp][] = [
    [/\b(seats?|saddles?)\b/, /\b(seats?|saddles?)\b/],
    [/\bpedals?\b/, /\bpedals?\b/],
    [/\blights?\b|lighting|headlight|lamp/, /\blights?\b(?!\s+(black|blue|grey|gray|green|red|pink|silver|white|brown|navy|yellow|orange|purple|tan|camo))|lumen|lamp/],
    [/\bbaskets?\b/, /\bbaskets?\b/],
    [/\bpannier|\bracks?\b|\bcarrier/, /\bpannier|\bracks?\b|\bcarrier|\bbag/],
    [/\bhelmets?\b/, /\bhelmets?\b/],
    [/\bscooters?\b|\bescooter/, /\bscooters?\b|kickscooter/],
    [/\bbatter(y|ies)\b|\bcharger/, /\bbatter(y|ies)\b|\bcharger/],
    [/\blocks?\b/, /\blocks?\b/],
    [/\btyres?\b|\btires?\b|\btubes?\b/, /\btyres?\b|\btires?\b|\btubes?\b/],
    [/\bgloves?\b/, /\bgloves?\b/],
    [/\bcomputers?\b|\bgps\b/, /\bcomputers?\b|\bgps\b|garmin|wahoo/],
    [/\bdisplay\b/, /\bdisplay\b|kiox|intuvia|nyon/],
    [/\bthrottle\b/, /\bthrottle\b/],
    [/\bcontroller\b/, /\bcontroller\b/],
  ];
  for (const [kwRe, nameRe] of KINDS) if (kwRe.test(k) && !nameRe.test(name)) return false;
  // electronics (displays) never carry mechanical-part keywords, and brand-name look-alikes from the bank are dropped
  if (/display|kiox|intuvia/.test(name) && /frame|chain|tyre|tire|wheel|pedal|brake|saddle|seat|easy motion|a2b/.test(k)) return false;
  // a kit or battery keyword must match the product's voltage, and a 250 W kit does not carry high-power keywords
  if (/kit|battery/.test(name)) {
    const kv = k.match(/(\d{2})\s?v\b/); const nv = name.match(/(\d{2})\s?v\b/);
    if (kv && nv && kv[1] !== nv[1]) return false;
    const kw = k.match(/(\d{3,4})\s?w\b/);
    if (kw && +kw[1] > 250) return false;
  }
  // keywords describing a whole bike ("bikes with basket") do not belong on a component
  if (/\b(bikes?|bicycles?) (with|for)\b|\bwomens\b/.test(k) && /\bwith\b/.test(k)) return false;
  return true;
}

// ---------- bike tags that fit the individual bike (owner-approved product mapping fix, 2026-11-22) ----------
// A bike's tags used to be the category list in fixed order, so 63 commuter bikes carried the identical set. Now the same mapped keywords
// (category page plus the bike's brand page) are ranked by how well they fit THIS bike: frame shape, price, battery size, suspension and brand.
const BIKE_CATS = ['emtb', 'folding', 'cruiser', 'fat-tyre', 'cargo', 'road', 'commuter'];
const BRAND_NODE: Record<string, string> = { Cube: 'brand-cube', Merida: 'brand-merida', Pedal: 'brand-pedal', Dirodi: 'brand-dirodi' };
function brandKeywordsFor(p: Product): string[] {
  const id = BRAND_NODE[p.brand];
  if (!id) return [];
  const b = { ...(RETAIL_BRAND_KEYWORDS[id] ?? {}), ...(STRATEGY_KEYWORDS[id] ?? {}) } as Partial<NodeKeywords>;
  const commerce = withTransactional(id, b.commerce) || [];
  const supporting = withSupporting(id, b.supporting) || [];
  return [b.primary, ...commerce, ...supporting, ...(b.secondary || [])].filter((x): x is string => !!x);
}
function bikeFitScore(p: Product, kw: string, isBrand: boolean, isPrimary: boolean): number {
  const k = kw.toLowerCase();
  const sub = p.subcategoryId || '';
  const step = p.frameType === 'Step-Through' || /easy entry|\bst\b|\bee\b|step/i.test(p.name);
  let s = isBrand ? 5 : 0;
  if (isBrand) {
    // a brand keyword only fits a bike of the kind it names
    if (/accessor/.test(k)) s -= 20;
    if (/cargo/.test(k) && p.category !== 'cargo') s -= 20;
    if (/mountain|mtb/.test(k) && p.category !== 'emtb') s -= 20;
  }
  if (isPrimary) s += 2;
  if (/step.?through|\bwomen|\bladies|\blady/.test(k)) s += step ? 4 : -6;
  if (/\bmens?\b/.test(k)) s += !step && p.frameType === 'Crossbar' ? 3 : -6;
  if (/cheap|afford|budget|inexpensive|under \$|low cost|discount|bargain/.test(k)) s += p.price < 1500 ? 3 : p.price < 2000 ? 0 : -6;
  if (/long range|battery|watt/.test(k)) s += (p.batteryWh || 0) >= 600 ? 2 : 0;
  if (/hardtail/.test(k)) s += /hardtail/.test(sub) ? 4 : -6;
  if (/dual|full sus|full suspension|enduro|downhill/.test(k)) s += /dual|enduro|trial|trail/.test(sub) ? 3 : -6;
  if (/kids|youth|junior|child/.test(k)) s += /kid|youth|junior/i.test(`${sub} ${p.name}`) ? 3 : -6;
  if (/commut|trekking|hybrid/.test(k)) s += p.category === 'commuter' ? 1 : 0;
  if (/for sale|price|cost|buy/.test(k)) s += 1;
  return s;
}

/** Up to 10 tags from the mapped keywords of this product's category that fit the product. */
export function tagsForProduct(p: Product): string[] {
  const k = keywordsForProduct(p);
  if (!k) return p.tags || [];
  // product-type keywords first (a helmet, a light and a scooter carry different terms), then the category keywords
  const typed = typeKeywordsFor(p).slice(0, 4);
  let all = [...typed, k.primary, ...(k.commerce || []).slice(0, 3), ...k.secondary, ...(k.supporting || [])];
  if (BIKE_CATS.includes(p.category)) {
    const brandKws = brandKeywordsFor(p);
    const pool = [...new Set([...brandKws.slice(0, 6), ...all])];
    all = pool
      .map((t, i) => ({ t, i, s: bikeFitScore(p, t, brandKws.includes(t), t === k.primary) }))
      .filter((x) => x.s > -2)
      .sort((a, b) => b.s - a.s || a.i - b.i)
      .map((x) => x.t);
  }
  // one tag per concept: "ebike accessories", "e bike accessories" and "e-bike accessory" count as the same tag
  const concept = (t: string) => t.toLowerCase().replace(/e[- ]?bikes?/g, 'ebike').replace(/electric (bikes?|bicycles?)/g, 'ebike').replace(/[^a-z0-9 ]+/g, ' ').replace(/\b(\w+?)(ies|es|s|y)\b/g, '$1').split(/\s+/).filter((w) => w && !['and', 'for', 'an', 'a', 'the', 'with', 'of', 'in'].includes(w)).sort().join(' ');
  // brand-name and off-topic variants from the bank never make a good product tag
  const BLOCK = /\b(eco|echo|electra|dirt|motorbike|moto|moped|a2b|bagus|2025|2026)\b/i;
  const seen = new Set<string>();
  const out: string[] = [];
  for (const t of all.map((x) => x.trim()).filter(Boolean)) {
    if (BLOCK.test(t) || !(typed.includes(t) || fitsProduct(p, t))) continue;
    const c = concept(t);
    if (seen.has(c)) continue;
    seen.add(c);
    out.push(t);
    if (out.length === 10) break;
  }
  return out;
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

  // conversion kits, conversion batteries and e-bike displays: fit and legality matter more than the generic accessory answers
  if (p.category === 'parts' && /conversion kit|motor kit/i.test(p.name)) {
    const motorOnly = p.features.some((f) => /battery sold separately/i.test(f));
    return [
      { question: q1, answer: `${desc} A conversion changes how a bike brakes and handles, so check that your frame, bottom bracket and brakes suit the kit before you order.` },
      { question: `Is the ${p.name} legal to use in Australia?`, answer: `A conversion must still meet the rules for the bike you ride: a motor rated at 250 W with assistance that stops at 25 km/h. Kits above that power are generally not legal on public roads as a bicycle, rules differ by state and converted e-bikes are not allowed on Victorian trains. Check your road authority before you ride.${clause(0, (k) => `This applies to any "${k}".`)}` },
      { question: `How much is the ${p.name} and can I buy it online?`, answer: `The ${p.name} is ${price}. ${delivery}${clause(1, (k) => `Searching for "${k}"? Send an enquiry and we will confirm fit and stock.`)}` },
      { question: `Does the ${p.name} include a battery?`, answer: `${motorOnly ? 'No. The kit is the motor and its parts only, so you need a battery that suits the system, such as a 36V battery from our conversion batteries.' : 'Check the package contents on the product page, and ask us if you are unsure what is included.'}${clause(2, (k) => `Compare options for "${k}" before you buy.`)}` },
      { question: `Can you confirm fit before I pay?`, answer: `Yes. Send us your bike's make, model and bottom bracket width through the enquiry button and we will check the kit suits it.${clause(3, (k) => `Mention "${k}" if you want us to suggest alternatives.`)}` },
    ];
  }
  if (p.category === 'parts' && /battery/i.test(p.name)) {
    return [
      { question: q1, answer: `${desc} Check that the voltage matches your motor and controller, and that the battery mounts on your bike.` },
      { question: `Which systems does the ${p.name} suit?`, answer: `It is built for conversion kits of the same voltage, for example 36V systems such as the Bafang BBS01B 36V. Never swap in a different voltage, and send us your kit's model if you are not sure.${clause(0, (k) => `This matters when you shop for "${k}".`)}` },
      { question: `How much is the ${p.name} and can I buy it online?`, answer: `The ${p.name} is ${price}. ${delivery}${clause(1, (k) => `Searching for "${k}"? Send an enquiry and we will confirm fit and stock.`)}` },
      { question: `How should I charge and store the battery?`, answer: `Use only the supplied charger, charge indoors on a hard surface away from flammable items, do not leave it charging unattended and store it at room temperature. Never use a damaged battery or charger.${clause(2, (k) => `Follow the same rules with any "${k}".`)}` },
      { question: `Can you confirm stock and fit before I pay?`, answer: `Yes. Use the enquiry button and we will confirm stock and check the battery against your kit.${clause(3, (k) => `Mention "${k}" if you want us to suggest alternatives.`)}` },
    ];
  }
  if (p.category === 'parts' && /display/i.test(p.name)) {
    return [
      { question: q1, answer: `${desc} It is a replacement or upgrade part, so check your bike's system before you order.` },
      { question: `Will the ${p.name} fit my bike?`, answer: `Only if your bike uses a compatible system and connector. Send us your bike's make, model and year and we will check before you pay.${clause(0, (k) => `This matters when you shop for "${k}".`)}` },
      { question: `How much is the ${p.name} and can I buy it online?`, answer: `The ${p.name} is ${price}. ${delivery}${clause(1, (k) => `Searching for "${k}"? Send an enquiry and we will confirm fit and stock.`)}` },
      { question: `What does the ${p.name} show?`, answer: `${desc} Check the product page for the full feature list.${clause(2, (k) => `It sits in our "${k}" range.`)}` },
      { question: `Can you confirm stock and fit before I pay?`, answer: `Yes. Use the enquiry button and we will confirm stock and compatibility with your bike.${clause(3, (k) => `Mention "${k}" if you want us to suggest alternatives.`)}` },
    ];
  }

  // chargers: voltage and connector must match the battery, so the generic accessory answers must not say "suits most e-bikes"
  if (/\bcharger\b/i.test(p.name)) {
    return [
      { question: q1, answer: `${desc} A charger must match your battery's voltage and connector, so check both on your current charger or battery label before you order.` },
      { question: `Will the ${p.name} charge any e-bike battery?`, answer: `No. Use only a charger made for your battery's voltage, amperage and connector. The wrong charger can damage the battery or create a fire risk. Send us your bike make and model and we will confirm fit before you pay.${clause(0, (k) => `This matters when you shop for "${k}".`)}` },
      { question: `How much is the ${p.name} and can I buy it online?`, answer: `The ${p.name} is ${price}. ${delivery}${clause(1, (k) => `Searching for "${k}"? Send an enquiry and we will confirm compatibility and stock.`)}` },
      { question: `How should I charge and store my e-bike battery?`, answer: `Charge indoors on a hard surface away from flammable items, do not leave a battery charging unattended, unplug it once it is full and store it at room temperature. Never use a damaged charger or cable.${clause(2, (k) => `Follow the same rules with any "${k}".`)}` },
      { question: `Can you confirm stock and fit before I pay?`, answer: `Yes. Use the enquiry button and we will confirm stock and check the charger against your bike's battery.${clause(3, (k) => `Mention "${k}" if you want us to suggest alternatives.`)}` },
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
