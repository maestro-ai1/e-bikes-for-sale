import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import CatalogPage from '@/components/catalog/CatalogPage';
import { CATALOG, LANDING_PATHS, nodeByPath } from '@/lib/catalog';
import { metadataFor } from '@/lib/catalog-meta';
import { parsePage } from '@/lib/pagination';

export const dynamicParams = false;

export function generateStaticParams() {
  return CATALOG.filter((n) => LANDING_PATHS.includes(n.path)).map((n) => ({ landing: n.path.slice(1) }));
}

type Props = { params: Promise<{ landing: string }>; searchParams: Promise<{ page?: string }> };

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { page } = await searchParams;
  const { landing } = await params;
  const node = nodeByPath(`/${landing}`);
  return node && LANDING_PATHS.includes(node.path) ? metadataFor(node, parsePage(page)) : {};
}

export default async function LandingPage({ params, searchParams }: Props) {
  const { page } = await searchParams;
  const { landing } = await params;
  const node = nodeByPath(`/${landing}`);
  if (!node || !LANDING_PATHS.includes(node.path)) notFound();
  return (
    <PageShell>
      <CatalogPage node={node} page={parsePage(page)} />
    </PageShell>
  );
}
