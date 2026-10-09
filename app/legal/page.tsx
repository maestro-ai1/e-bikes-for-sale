import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import LegalComplianceGuide from '@/components/LegalComplianceGuide';
import PolicyPages from '@/components/PolicyPages';
import CartDrawer from '@/components/CartDrawer';
import WhatsAppChatWidget from '@/components/WhatsAppChatWidget';
import ProductDetailModal from '@/components/ProductDetailModal';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Australian E-Bike Road Legality & EN15194 Laws by State | e bikes for sale',
  description: 'Complete state-by-state guide to electric bicycle laws in NSW, VIC, QLD, WA, SA, TAS, NT and ACT. 250W limits, 25 km/h cutoffs, throttle rules and helmet laws.',
  alternates: {
    canonical: 'https://ebikesforsale.com.au/legal',
  },
  openGraph: {
    title: 'Australian E-Bike Road Legality & State Laws | EN15194 Guide',
    description: 'State-by-state electric bicycle regulations, power limits, and helmet compliance.',
    url: 'https://ebikesforsale.com.au/legal',
    type: 'website',
  },
};

export default function LegalLandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />

      <main className="flex-1">
        <LegalComplianceGuide />
        <PolicyPages />
      </main>

      <Footer />
      <ProductDetailModal />
      <CartDrawer />
      <WhatsAppChatWidget />
    </div>
  );
}
