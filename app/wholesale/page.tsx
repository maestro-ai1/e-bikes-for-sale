import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import WholesalePage from '@/components/WholesalePage';
import CartDrawer from '@/components/CartDrawer';
import WhatsAppChatWidget from '@/components/WhatsAppChatWidget';
import ProductDetailModal from '@/components/ProductDetailModal';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Wholesale & Commercial Fleet E-Bikes Australia | B2B Portal',
  description: 'B2B commercial electric bicycle supply in Australia. Fleet pricing for food delivery couriers, hotel rentals, corporate campuses, and independent bike shops.',
  alternates: {
    canonical: 'https://ebikesforsale.com.au/wholesale',
  },
  openGraph: {
    images: [{ url: 'https://ebikesforsale.com.au/images/catalog/og-home.jpg', width: 1200, height: 630, alt: 'e bikes for sale Australia' }],
    title: 'Wholesale E-Bikes Australia | B2B Commercial Fleet Supply',
    description: 'Bulk order discounts, tax invoice invoicing, and tier 3+ container dispatch across Australia.',
    url: 'https://ebikesforsale.com.au/wholesale',
    type: 'website',
  },
};

export default function WholesaleLandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />

      <main className="flex-1">
        <WholesalePage />
      </main>

      <Footer />
      <ProductDetailModal />
      <CartDrawer />
      <WhatsAppChatWidget />
    </div>
  );
}
