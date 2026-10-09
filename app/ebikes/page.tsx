import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import CatalogPage from '@/components/catalog/CatalogPage';
import { nodeById } from '@/lib/catalog';
import { metadataFor } from '@/lib/catalog-meta';

const node = nodeById('hub')!;

export const metadata: Metadata = metadataFor(node);

export default function EbikesHubPage() {
  return (
    <PageShell>
      <CatalogPage node={node} />
    </PageShell>
  );
}
