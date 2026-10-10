import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import UsedEbikesLandingPage from '@/components/UsedEbikesLandingPage';
import CartDrawer from '@/components/CartDrawer';
import WhatsAppChatWidget from '@/components/WhatsAppChatWidget';
import ProductDetailModal from '@/components/ProductDetailModal';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Used Electric Bicycles | Second Hand E-Bikes Australia',
  description:
    'Looking for used electric bicycles in Australia? Compare second hand e-bikes, learn what to inspect and enquire about used electric bikes for sale.',
  alternates: {
    canonical: 'https://ebikesforsale.com.au/used-electric-bikes',
  },
  openGraph: {
    images: [{ url: 'https://ebikesforsale.com.au/images/catalog/og-home.jpg', width: 1200, height: 630, alt: 'e bikes for sale Australia' }],
    title: 'Used Electric Bicycles | Second Hand E-Bikes Australia',
    description:
      'What to check, what to pay and how to enquire about used electric bicycles in Australia.',
    url: 'https://ebikesforsale.com.au/used-electric-bikes',
    type: 'website',
    locale: 'en_AU',
  },
};

export default function UsedElectricBikesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />
      <main className="flex-1">
        <UsedEbikesLandingPage />
      </main>
      <Footer />
      <ProductDetailModal />
      <CartDrawer />
      <WhatsAppChatWidget />
    </div>
  );
}
