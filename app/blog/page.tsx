import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import BlogSection from '@/components/BlogSection';
import CartDrawer from '@/components/CartDrawer';
import WhatsAppChatWidget from '@/components/WhatsAppChatWidget';
import ProductDetailModal from '@/components/ProductDetailModal';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Australian E-Bike Guides, Regulations & News | e bikes for sale',
  description: 'Expert Australian electric bicycle guides. Explore EN15194 state road rules, battery range tips, e-bike vs car savings, and sizing guides.',
  alternates: {
    canonical: 'https://ebikesforsale.com.au/blog',
  },
  openGraph: {
    title: 'Australian E-Bike Guides & Regulations | e bikes for sale',
    description: 'Expert Australian electric bicycle guides and regulations.',
    url: 'https://ebikesforsale.com.au/blog',
    type: 'website',
  },
};

export default function BlogLandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />

      <main className="flex-1 py-6">
        <BlogSection />
      </main>

      <Footer />
      <ProductDetailModal />
      <CartDrawer />
      <WhatsAppChatWidget />
    </div>
  );
}
