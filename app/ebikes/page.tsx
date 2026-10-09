import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import EbikesLandingPage from '@/components/EbikesLandingPage';
import CartDrawer from '@/components/CartDrawer';
import WhatsAppChatWidget from '@/components/WhatsAppChatWidget';
import ProductDetailModal from '@/components/ProductDetailModal';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Electric Bikes for Sale Australia | Buy e-Bikes Online | e bikes for sale',
  description: 'Browse premier Australian street-legal 250W electric bikes for sale. Electric mountain bikes (eMTB), folding e-bikes, cruisers, cargo, fat tyre & commuter bikes with 10% Crypto discount.',
  alternates: {
    canonical: 'https://ebikesforsale.com.au/ebikes/',
  },
  openGraph: {
    title: 'Electric Bikes for Sale Australia — e-Bikes Online',
    description: 'Premier e-bike store in Australia. EN15194 compliant 250W pedelecs with fast nationwide dispatch and 10% Crypto discount.',
    url: 'https://ebikesforsale.com.au/ebikes/',
    type: 'website',
  },
};

export default function EbikesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />
      <main className="flex-1">
        <EbikesLandingPage />
      </main>
      <Footer />
      <ProductDetailModal />
      <CartDrawer />
      <WhatsAppChatWidget />
    </div>
  );
}
