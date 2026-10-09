import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import PartsLandingPage from '@/components/PartsLandingPage';
import CartDrawer from '@/components/CartDrawer';
import WhatsAppChatWidget from '@/components/WhatsAppChatWidget';
import ProductDetailModal from '@/components/ProductDetailModal';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'E-Bike Spare Parts, Tyres & Components Australia | e bikes for sale',
  description: 'Shop genuine replacement tyres for cycles, Schwalbe e-bike tyres, disc brake pads, rotors, chains, and drivetrains with 10% Crypto discount.',
  alternates: {
    canonical: 'https://ebikesforsale.com.au/parts/',
  },
  openGraph: {
    title: 'E-Bike Spare Parts & Cycle Tyres Australia | Schwalbe Tyres & Brake Pads',
    description: 'Genuine replacement parts for cycles and electric bicycles. Fast Australian dispatch with 10% Bitcoin and USDT discount.',
    url: 'https://ebikesforsale.com.au/parts/',
    type: 'website',
  },
};

export default function PartsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />
      <main className="flex-1">
        <PartsLandingPage />
      </main>
      <Footer />
      <ProductDetailModal />
      <CartDrawer />
      <WhatsAppChatWidget />
    </div>
  );
}
