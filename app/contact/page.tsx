import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import ContactPage from '@/components/ContactPage';
import CartDrawer from '@/components/CartDrawer';
import WhatsAppChatWidget from '@/components/WhatsAppChatWidget';
import ProductDetailModal from '@/components/ProductDetailModal';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Contact Australian E-Bike Support & Showroom | e bikes for sale',
  description: 'Get in touch with our Australian electric bicycle specialists. Direct phone support, WhatsApp live chat, wholesale inquiries, and workshop assistance.',
  alternates: {
    canonical: 'https://ebikesforsale.com.au/contact',
  },
  openGraph: {
    title: 'Contact e bikes for sale Australia',
    description: 'Direct phone, WhatsApp, and email customer service for Australian e-bike riders.',
    url: 'https://ebikesforsale.com.au/contact',
    type: 'website',
  },
};

export default function ContactLandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />

      <main className="flex-1">
        <ContactPage />
      </main>

      <Footer />
      <ProductDetailModal />
      <CartDrawer />
      <WhatsAppChatWidget />
    </div>
  );
}
