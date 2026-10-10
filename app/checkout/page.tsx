import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import CheckoutView from '@/components/CheckoutView';

export const metadata: Metadata = {
  title: 'Checkout | e bikes for sale',
  description: 'Secure checkout for your e bikes for sale order: contact, delivery address and payment method on one page.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://ebikesforsale.com.au/checkout' },
};

export default function CheckoutPage() {
  return (
    <PageShell>
      <CheckoutView />
    </PageShell>
  );
}
