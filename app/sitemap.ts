import type { MetadataRoute } from 'next';
import { BLOG_POSTS, PRODUCTS } from '@/lib/data';
import { ALL_CATALOG_PATHS } from '@/lib/catalog';

const BASE_URL = 'https://ebikesforsale.com.au';

const STATIC_ROUTES = [
  '',
  '/shop',
  '/ebikes',
  '/scooters',
  '/used-electric-bikes',
  '/brands',
  '/wholesale',
  '/blog',
  '/compare',
  '/about',
  '/contact',
  '/faq',
  '/legal',
  '/policies',
];

// Fixed content date, not the build time, so lastmod only moves when the catalogue or pages really change.
const CONTENT_UPDATED = new Date('2026-10-11T00:00:00+10:00');

export default function sitemap(): MetadataRoute.Sitemap {
  const now = CONTENT_UPDATED;

  return [
    ...STATIC_ROUTES.map((route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    })),
    ...ALL_CATALOG_PATHS.filter((p) => !STATIC_ROUTES.includes(p)).map((p) => ({
      url: `${BASE_URL}${p}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    ...PRODUCTS.map((p) => ({
      url: `${BASE_URL}/product/${p.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...BLOG_POSTS.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.isoDate ? new Date(post.isoDate) : now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
