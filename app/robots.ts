import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin/', '/order/', '/api/', '/thank-you-order', '/thank-you-contact', '/thank-you-wholesale'] },
    sitemap: 'https://ebikesforsale.com.au/sitemap.xml',
  };
}
