import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import HomepageFaq from '@/components/HomepageFaq';
import CartDrawer from '@/components/CartDrawer';
import WhatsAppChatWidget from '@/components/WhatsAppChatWidget';
import ProductDetailModal from '@/components/ProductDetailModal';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQs) | e bikes for sale Australia',
  description: 'Everything you need to know about purchasing e-bikes online in Australia: EN15194 laws, 2-5 day shipping, 2-year warranty, PayID, and 10% Crypto discount.',
  alternates: {
    canonical: 'https://ebikesforsale.com.au/faq',
  },
  openGraph: {
    images: [{ url: 'https://ebikesforsale.com.au/images/catalog/og-home.jpg', width: 1200, height: 630, alt: 'e bikes for sale Australia' }],
    title: 'Australian E-Bike FAQs | e bikes for sale',
    description: 'Frequently asked questions on Australian street legality, battery maintenance, delivery, and payments.',
    url: 'https://ebikesforsale.com.au/faq',
    type: 'website',
  },
};

export default function FaqLandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />

      <main className="flex-1 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-8 text-center">
          <span className="text-xs font-black uppercase tracking-wider text-[#2E6B4D]">
            Help & Knowledge Hub
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-1">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-gray-600 mt-2 max-w-xl mx-auto">
            Everything you need to know about Australian e-bike compliance, nationwide courier delivery, warranty protection, and cryptocurrency payment discounts.
          </p>
        </div>
        <HomepageFaq />
      </main>

      <Footer />
      <ProductDetailModal />
      <CartDrawer />
      <WhatsAppChatWidget />
    </div>
  );
}
