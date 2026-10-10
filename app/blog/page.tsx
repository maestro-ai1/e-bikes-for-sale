import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import BlogIndex from '@/components/BlogIndex';

export const metadata: Metadata = {
  title: 'Australian E-Bike Guides, Regulations & News | e bikes for sale',
  description:
    'Expert Australian electric bicycle guides. Explore EN15194 state road rules, battery range tips, e-bike vs car savings, and sizing guides.',
  alternates: { canonical: 'https://ebikesforsale.com.au/blog' },
  openGraph: {
    images: [{ url: 'https://ebikesforsale.com.au/images/catalog/og-home.jpg', width: 1200, height: 630, alt: 'e bikes for sale Australia' }],
    title: 'Australian E-Bike Guides & Regulations | e bikes for sale',
    description: 'Expert Australian electric bicycle guides and regulations.',
    url: 'https://ebikesforsale.com.au/blog',
    type: 'website',
  },
};

export default function BlogLandingPage() {
  return (
    <PageShell>
      <BlogIndex page={1} />
    </PageShell>
  );
}
