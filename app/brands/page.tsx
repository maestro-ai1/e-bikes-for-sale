import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import BrandPage from '@/components/BrandPage';
import CartDrawer from '@/components/CartDrawer';
import WhatsAppChatWidget from '@/components/WhatsAppChatWidget';
import ProductDetailModal from '@/components/ProductDetailModal';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'E Bike Brands Australia | Electric Bike Brands Compared',
  description: 'Compare e bike brands in Australia: the electric bike brands behind our range, from commuter and cargo to mountain and folding e-bikes, with warranty details.',
  alternates: {
    canonical: 'https://ebikesforsale.com.au/brands',
  },
  openGraph: {
    title: 'Leading E-Bike Brands Australia | e bikes for sale',
    description: 'Explore trusted electric bicycle brands and manufacturer warranties.',
    url: 'https://ebikesforsale.com.au/brands',
    type: 'website',
  },
};

export default function BrandsLandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />

      <main className="flex-1">
        <BrandPage />
      </main>

      <Footer />
      <ProductDetailModal />
      <CartDrawer />
      <WhatsAppChatWidget />
    </div>
  );
}
