import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import CatalogPage from '@/components/catalog/CatalogPage';
import { CATALOG, nodeByPath } from '@/lib/catalog';
import { metadataFor } from '@/lib/catalog-meta';
import { parsePage } from '@/lib/pagination';

export const dynamicParams = false;

export function generateStaticParams() {
  return CATALOG.filter((n) => n.kind === 'sub' && n.path.startsWith('/ebikes/')).map((n) => {
    const [, , category, sub] = n.path.split('/');
    return { category, sub };
  });
}

type Props = { params: Promise<{ category: string; sub: string }>; searchParams: Promise<{ page?: string }> };

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { page } = await searchParams;
  const { category, sub } = await params;
  const node = nodeByPath(`/ebikes/${category}/${sub}`);
  return node ? metadataFor(node, parsePage(page)) : {};
}

export default async function EbikeSubcategoryPage({ params, searchParams }: Props) {
  const { page } = await searchParams;
  const { category, sub } = await params;
  const node = nodeByPath(`/ebikes/${category}/${sub}`);
  if (!node || node.kind !== 'sub') notFound();
  return (
    <PageShell>
      <CatalogPage node={node} page={parsePage(page)} />
    </PageShell>
  );
}
