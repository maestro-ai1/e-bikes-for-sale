import type { Metadata } from 'next';
import { PRODUCTS } from '@/lib/data';
import { SITE_URL, type CatalogNode } from '@/lib/catalog';
import { CATALOG_IMAGES } from '@/lib/catalog-images';

/** Metadata for a catalog node: unique title/description, canonical equal to the served URL, full OG + Twitter. */
export function metadataFor(node: CatalogNode, page = 1): Metadata {
  // Page 1 is the clean URL; deeper pages are self-canonical (?page=N), unique in title and description.
  const url = `${SITE_URL}${node.path}${page > 1 ? `?page=${page}` : ''}`;
  const suffix = page > 1 ? ` | Page ${page}` : '';
  const title = page > 1 && `${node.title}${suffix}`.length <= 70 ? `${node.title}${suffix}` : node.title;
  const description = page > 1 ? `Page ${page}: ${node.description}`.slice(0, 160) : node.description;
  const lead = PRODUCTS.find(node.matches) || PRODUCTS.find((p) => p.category === 'emtb');
  const banner = CATALOG_IMAGES[node.id];
  const images = banner
    ? [{ url: `${SITE_URL}${banner.src}`, width: 900, height: 900, alt: banner.alt }]
    : lead && lead.image
      ? [{ url: lead.image.startsWith('/') ? `${SITE_URL}${lead.image}` : lead.image, width: 1200, height: 630, alt: `${lead.brand} ${lead.name}` }]
      : undefined;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'e bikes for sale',
      type: 'website',
      locale: 'en_AU',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images?.map((i) => i.url),
    },
  };
}
