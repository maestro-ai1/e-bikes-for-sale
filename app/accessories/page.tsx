import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import AccessoriesLandingPage from '@/components/AccessoriesLandingPage';
import CartDrawer from '@/components/CartDrawer';
import WhatsAppChatWidget from '@/components/WhatsAppChatWidget';
import ProductDetailModal from '@/components/ProductDetailModal';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Ebike Accessories Australia | Locks, Lights, Seats & Bags',
  description: 'Shop ebike accessories in Australia: electric bike accessories, U-locks, lights, seats, pedals and pannier bags for every e-bike. Fast dispatch Australia-wide.',
  alternates: {
    canonical: 'https://ebikesforsale.com.au/accessories',
  },
  openGraph: {
    title: 'Bicycle & E-Bike Accessories Australia | Helmets, Locks, Lights & Bags',
    description: 'Equip your ride with certified helmets, high-security locks, smart lights, and cycling gear. Fast Australian dispatch.',
    url: 'https://ebikesforsale.com.au/accessories',
    type: 'website',
  },
};

export default function AccessoriesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />
      <main className="flex-1">
        <AccessoriesLandingPage />
      </main>
      <Footer />
      <ProductDetailModal />
      <CartDrawer />
      <WhatsAppChatWidget />
    </div>
  );
}
