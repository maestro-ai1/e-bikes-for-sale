import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import CompareTool from '@/components/CompareTool';
import CartDrawer from '@/components/CartDrawer';
import WhatsAppChatWidget from '@/components/WhatsAppChatWidget';
import ProductDetailModal from '@/components/ProductDetailModal';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Compare Electric Bicycles Side-by-Side | Specs, Motor & Range',
  description: 'Interactive e-bike comparison tool for Australian riders. Compare 250W motors, battery Wh capacity, torque Nm, hydraulic brakes, and payload side-by-side.',
  alternates: {
    canonical: 'https://ebikesforsale.com.au/compare',
  },
  openGraph: {
    images: [{ url: 'https://ebikesforsale.com.au/images/catalog/og-home.jpg', width: 1200, height: 630, alt: 'e bikes for sale Australia' }],
    title: 'Compare E-Bikes Australia | e bikes for sale',
    description: 'Compare motor power, range, battery, and pricing side-by-side.',
    url: 'https://ebikesforsale.com.au/compare',
    type: 'website',
  },
};

export default function CompareLandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />

      <main className="flex-1">
        <h1 className="sr-only">Compare electric bicycles side by side</h1>
        <CompareTool />
      </main>

      <Footer />
      <ProductDetailModal />
      <CartDrawer />
      <WhatsAppChatWidget />
    </div>
  );
}
