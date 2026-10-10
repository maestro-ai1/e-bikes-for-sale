import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import AboutPage from '@/components/AboutPage';
import CartDrawer from '@/components/CartDrawer';
import WhatsAppChatWidget from '@/components/WhatsAppChatWidget';
import ProductDetailModal from '@/components/ProductDetailModal';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About Us | e bikes for sale Australia',
  description: 'About e bikes for sale: an Australian online store for electric bikes, scooters, helmets, accessories and parts, with business details and what we sell.',
  alternates: {
    canonical: 'https://ebikesforsale.com.au/about',
  },
  openGraph: {
    images: [{ url: 'https://ebikesforsale.com.au/images/catalog/og-home.jpg', width: 1200, height: 630, alt: 'e bikes for sale Australia' }],
    title: 'About e bikes for sale Australia',
    description: 'Australian online store for electric bikes, scooters, helmets and parts.',
    url: 'https://ebikesforsale.com.au/about',
    type: 'website',
  },
};

export default function AboutLandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />

      <main className="flex-1">
        <AboutPage />
      </main>

      <Footer />
      <ProductDetailModal />
      <CartDrawer />
      <WhatsAppChatWidget />
    </div>
  );
}
