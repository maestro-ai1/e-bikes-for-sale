import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import CatalogPage from '@/components/catalog/CatalogPage';
import { CATALOG, nodeByPath } from '@/lib/catalog';
import { metadataFor } from '@/lib/catalog-meta';
import { parsePage } from '@/lib/pagination';

export const dynamicParams = false;

export function generateStaticParams() {
  return CATALOG.filter((n) => n.kind === 'sub' && n.path.startsWith('/scooters/')).map((n) => ({ sub: n.path.split('/')[2] }));
}

type Props = { params: Promise<{ sub: string }>; searchParams: Promise<{ page?: string }> };

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { page } = await searchParams;
  const { sub } = await params;
  const node = nodeByPath(`/scooters/${sub}`);
  return node ? metadataFor(node, parsePage(page)) : {};
}

export default async function ScooterSubcategoryPage({ params, searchParams }: Props) {
  const { page } = await searchParams;
  const { sub } = await params;
  const node = nodeByPath(`/scooters/${sub}`);
  if (!node || node.kind !== 'sub') notFound();
  return (
    <PageShell>
      <CatalogPage node={node} page={parsePage(page)} />
    </PageShell>
  );
}
