import type { Metadata } from 'next';
import { PRODUCTS } from '@/lib/data';
import { SITE_URL, type CatalogNode } from '@/lib/catalog';

/** Metadata for a catalog node: unique title/description, canonical equal to the served URL, full OG + Twitter. */
export function metadataFor(node: CatalogNode): Metadata {
  const url = `${SITE_URL}${node.path}`;
  const lead = PRODUCTS.find(node.matches) || PRODUCTS.find((p) => p.category === 'emtb');
  const images = lead ? [{ url: lead.image, width: 1200, height: 630, alt: `${lead.brand} ${lead.name}` }] : undefined;
  return {
    title: node.title,
    description: node.description,
    alternates: { canonical: url },
    openGraph: {
      title: node.title,
      description: node.description,
      url,
      siteName: 'e bikes for sale',
      type: 'website',
      locale: 'en_AU',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: node.title,
      description: node.description,
      images: images?.map((i) => i.url),
    },
  };
}
