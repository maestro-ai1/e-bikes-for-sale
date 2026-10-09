import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import CatalogPage from '@/components/catalog/CatalogPage';
import { CATALOG, nodeByPath } from '@/lib/catalog';
import { metadataFor } from '@/lib/catalog-meta';

export const dynamicParams = false;

export function generateStaticParams() {
  return CATALOG.filter((n) => n.kind === 'sub' && n.path.startsWith('/ebikes/')).map((n) => {
    const [, , category, sub] = n.path.split('/');
    return { category, sub };
  });
}

type Props = { params: Promise<{ category: string; sub: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, sub } = await params;
  const node = nodeByPath(`/ebikes/${category}/${sub}`);
  return node ? metadataFor(node) : {};
}

export default async function EbikeSubcategoryPage({ params }: Props) {
  const { category, sub } = await params;
  const node = nodeByPath(`/ebikes/${category}/${sub}`);
  if (!node || node.kind !== 'sub') notFound();
  return (
    <PageShell>
      <CatalogPage node={node} />
    </PageShell>
  );
}
