import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import CatalogPage from '@/components/catalog/CatalogPage';
import { nodeById } from '@/lib/catalog';
import { metadataFor } from '@/lib/catalog-meta';

const node = nodeById('brand-trek')!;

export const metadata: Metadata = metadataFor(node);

export default function TrekBrandPage() {
  return (
    <PageShell>
      <CatalogPage node={node} />
    </PageShell>
  );
}
