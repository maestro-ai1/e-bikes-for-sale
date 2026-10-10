import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import CatalogPage from '@/components/catalog/CatalogPage';
import { nodeById } from '@/lib/catalog';
import { metadataFor } from '@/lib/catalog-meta';
import { parsePage } from '@/lib/pagination';

const node = nodeById('brand-merida')!;

type Props = { searchParams: Promise<{ page?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { page } = await searchParams;
  return metadataFor(node, parsePage(page));
}

export default async function MeridaBrandPage({ searchParams }: Props) {
  const { page } = await searchParams;
  return (
    <PageShell>
      <CatalogPage node={node} page={parsePage(page)} />
    </PageShell>
  );
}
