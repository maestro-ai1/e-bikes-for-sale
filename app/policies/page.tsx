import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import PolicyPages from '@/components/PolicyPages';
import CartDrawer from '@/components/CartDrawer';
import WhatsAppChatWidget from '@/components/WhatsAppChatWidget';
import ProductDetailModal from '@/components/ProductDetailModal';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Shipping, Warranty & Payment Policies | e bikes for sale',
  description: 'Official Australian store policies: 2-5 day insured dispatch, 2-Year warranty, 30-day returns, and 10% discount on Bitcoin & USDT payments.',
  alternates: {
    canonical: 'https://ebikesforsale.com.au/policies',
  },
  openGraph: {
    images: [{ url: 'https://ebikesforsale.com.au/images/catalog/og-home.jpg', width: 1200, height: 630, alt: 'e bikes for sale Australia' }],
    title: 'Customer Policies & Warranty Terms | e bikes for sale',
    description: 'Australian shipping terms, warranty claim procedures, and crypto discounts.',
    url: 'https://ebikesforsale.com.au/policies',
    type: 'website',
  },
};

export default function PoliciesLandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />

      <main className="flex-1">
        <PolicyPages />
      </main>

      <Footer />
      <ProductDetailModal />
      <CartDrawer />
      <WhatsAppChatWidget />
    </div>
  );
}
