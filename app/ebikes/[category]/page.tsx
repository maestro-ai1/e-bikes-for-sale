import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import CatalogPage from '@/components/catalog/CatalogPage';
import { CATALOG, nodeByPath } from '@/lib/catalog';
import { metadataFor } from '@/lib/catalog-meta';

export const dynamicParams = false;

export function generateStaticParams() {
  return CATALOG.filter((n) => n.kind === 'category').map((n) => ({ category: n.path.split('/')[2] }));
}

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const node = nodeByPath(`/ebikes/${category}`);
  return node ? metadataFor(node) : {};
}

export default async function EbikeCategoryPage({ params }: Props) {
  const { category } = await params;
  const node = nodeByPath(`/ebikes/${category}`);
  if (!node || node.kind !== 'category') notFound();
  return (
    <PageShell>
      <CatalogPage node={node} />
    </PageShell>
  );
}
