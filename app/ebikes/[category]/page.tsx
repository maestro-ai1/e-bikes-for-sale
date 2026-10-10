import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import CatalogPage from '@/components/catalog/CatalogPage';
import { CATALOG, nodeByPath } from '@/lib/catalog';
import { metadataFor } from '@/lib/catalog-meta';
import { parsePage } from '@/lib/pagination';

export const dynamicParams = false;

export function generateStaticParams() {
  return CATALOG.filter((n) => n.kind === 'category').map((n) => ({ category: n.path.split('/')[2] }));
}

type Props = { params: Promise<{ category: string }>; searchParams: Promise<{ page?: string }> };

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { page } = await searchParams;
  const { category } = await params;
  const node = nodeByPath(`/ebikes/${category}`);
  return node ? metadataFor(node, parsePage(page)) : {};
}

export default async function EbikeCategoryPage({ params, searchParams }: Props) {
  const { page } = await searchParams;
  const { category } = await params;
  const node = nodeByPath(`/ebikes/${category}`);
  if (!node || node.kind !== 'category') notFound();
  return (
    <PageShell>
      <CatalogPage node={node} page={parsePage(page)} />
    </PageShell>
  );
}
