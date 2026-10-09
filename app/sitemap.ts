import type { MetadataRoute } from 'next';
import { BLOG_POSTS, PRODUCTS } from '@/lib/data';

const BASE_URL = 'https://ebikesforsale.com.au';

const STATIC_ROUTES = [
  '',
  '/shop',
  '/ebikes',
  '/scooters',
  '/accessories',
  '/parts',
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

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...STATIC_ROUTES.map((route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    })),
    ...PRODUCTS.map((p) => ({
      url: `${BASE_URL}/product/${p.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...BLOG_POSTS.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
