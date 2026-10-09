import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import AboutPage from '@/components/AboutPage';
import CartDrawer from '@/components/CartDrawer';
import WhatsAppChatWidget from '@/components/WhatsAppChatWidget';
import ProductDetailModal from '@/components/ProductDetailModal';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About Us | Australian Electric Bicycle Pioneers | e bikes for sale',
  description: 'Learn about e bikes for sale Australia. Founded in 2024 to supply certified EN15194 250W e-bikes, lithium battery engineering, and commercial fleets nationwide.',
  alternates: {
    canonical: 'https://ebikesforsale.com.au/about/',
  },
  openGraph: {
    title: 'About e bikes for sale Australia',
    description: 'Australian electric bicycle specialists and wholesale fleet providers.',
    url: 'https://ebikesforsale.com.au/about/',
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
