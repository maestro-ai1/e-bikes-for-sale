import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import BlogIndex from '@/components/BlogIndex';
import { BLOG_URL, totalBlogPages } from '@/lib/blog-pagination';

export const dynamicParams = false;

// Pages 2..N only; page 1 is /blog. With 9 posts per page this grows automatically as posts are added.
export function generateStaticParams() {
  return Array.from({ length: Math.max(0, totalBlogPages() - 1) }, (_, i) => ({ n: String(i + 2) }));
}

type Props = { params: Promise<{ n: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { n } = await params;
  const page = Number(n);
  const url = `${BLOG_URL}/page/${page}`;
  return {
    title: `Australian E-Bike Guides, Page ${page} | e bikes for sale`,
    description: `More Australian electric bicycle guides, regulations and buying advice. Page ${page} of ${totalBlogPages()}.`,
    alternates: { canonical: url },
    openGraph: { title: `Australian E-Bike Guides, Page ${page}`, url, type: 'website' },
  };
}

export default async function BlogPageN({ params }: Props) {
  const { n } = await params;
  const page = Number(n);
  if (!Number.isInteger(page) || page < 2 || page > totalBlogPages()) notFound();
  return (
    <PageShell>
      <BlogIndex page={page} />
    </PageShell>
  );
}
