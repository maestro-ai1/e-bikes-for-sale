import type { Product } from '@/lib/types';

/**
 * High-authority outbound links for product pages (owner rule 2026-11-22: strict).
 * Only official, standards or encyclopedia sources, every URL checked to load; two links per product, chosen by product type.
 * Product Safety Australia (gov.au) covers e-bikes and e-scooters; helmets use the Standards Australia AS/NZS 2063 page.
 */
export interface SourceLink { label: string; href: string; note: string }

const GOV: SourceLink = { label: 'Product Safety Australia: e-bikes and e-scooters', href: 'https://www.productsafety.gov.au/business/e-bikes-e-scooters-and-other-e-micromobility-devices', note: 'Australian Government safety guidance' };
const WIKI = (title: string, page: string): SourceLink => ({ label: `${title} (Wikipedia)`, href: `https://en.wikipedia.org/wiki/${page}`, note: 'Background reading' });

export function sourcesFor(p: Product): SourceLink[] {
  switch (p.category) {
    case 'emtb': return [GOV, WIKI('Bicycle suspension', 'Bicycle_suspension')];
    case 'folding': return [GOV, WIKI('Folding bicycle', 'Folding_bicycle')];
    case 'fat-tyre': return [GOV, WIKI('Fatbike', 'Fatbike')];
    case 'cargo': return [GOV, WIKI('Cargo bike', 'Cargo_bike')];
    case 'commuter': return [GOV, WIKI('Hybrid bicycle', 'Hybrid_bicycle')];
    case 'scooters': return [GOV, WIKI('Lithium-ion battery', 'Lithium-ion_battery')];
    case 'helmets': return [{ label: 'Standards Australia: AS/NZS 2063 bicycle helmets', href: 'https://www.standards.org.au/blog/spotlight-on-as-2063-2020', note: 'The Australian helmet standard' }, WIKI('Bicycle helmet', 'Bicycle_helmet')];
    default: return [GOV, WIKI('Electric bicycle', 'Electric_bicycle')]; // cruiser, road, accessories, parts
  }
}
