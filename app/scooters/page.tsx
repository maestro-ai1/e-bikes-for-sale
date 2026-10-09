import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import ScootersLandingPage from '@/components/ScootersLandingPage';
import CartDrawer from '@/components/CartDrawer';
import WhatsAppChatWidget from '@/components/WhatsAppChatWidget';
import ProductDetailModal from '@/components/ProductDetailModal';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Electric Scooters & Scooters for Sale Australia | e bikes for sale',
  description: 'Shop electric scooters, kids scooters, adult commuter scooters, and certified scooter accessories in Australia. Compliant with state micro-mobility rules with 10% Crypto discount.',
  alternates: {
    canonical: 'https://ebikesforsale.com.au/scooters/',
  },
  openGraph: {
    title: 'Electric Scooters & Scooters Australia | Kids, Adults & Accessories',
    description: 'Electric scooters and accessories in Australia. Fast nationwide shipping with 10% Crypto payment discount.',
    url: 'https://ebikesforsale.com.au/scooters/',
    type: 'website',
  },
};

export default function ScootersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />
      <main className="flex-1">
        <ScootersLandingPage />
      </main>
      <Footer />
      <ProductDetailModal />
      <CartDrawer />
      <WhatsAppChatWidget />
    </div>
  );
}
