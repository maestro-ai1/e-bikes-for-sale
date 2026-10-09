import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import ShopCatalog from '@/components/ShopCatalog';
import CartDrawer from '@/components/CartDrawer';
import WhatsAppChatWidget from '@/components/WhatsAppChatWidget';
import ProductDetailModal from '@/components/ProductDetailModal';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Shop Electric Bicycles & Accessories Online | e bikes for sale Australia',
  description: 'Browse premier Australian street-legal 250W e-bikes, commuter bikes, fat tyre cruisers, folding e-bikes, certified helmets and accessories with 10% Crypto discount.',
  alternates: {
    canonical: 'https://ebikesforsale.com.au/shop/',
  },
  openGraph: {
    title: 'Shop Electric Bicycles Australia | e bikes for sale',
    description: 'Premier online e-bike store in Australia. EN15194 compliant 250W pedelecs with fast nationwide dispatch.',
    url: 'https://ebikesforsale.com.au/shop/',
    type: 'website',
  },
};

export default function ShopLandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />

      <main className="flex-1">
        <ShopCatalog />
      </main>

      <Footer />
      <ProductDetailModal />
      <CartDrawer />
      <WhatsAppChatWidget />
    </div>
  );
}
