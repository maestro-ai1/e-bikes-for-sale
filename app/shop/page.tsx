import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import ShopCatalog from '@/components/ShopCatalog';
import CartDrawer from '@/components/CartDrawer';
import WhatsAppChatWidget from '@/components/WhatsAppChatWidget';
import ProductDetailModal from '@/components/ProductDetailModal';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/lib/data';
import { parsePage, SHOP_PAGE_SIZE } from '@/lib/pagination';

type Props = { searchParams: Promise<{ page?: string }> };

// Page 1 is the clean URL; deeper pages are self-canonical (?page=N) with a unique title and description.
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const page = parsePage((await searchParams).page);
  const url = `https://ebikesforsale.com.au/shop${page > 1 ? `?page=${page}` : ''}`;
  const description = 'Browse premier Australian street-legal 250W e-bikes, commuter bikes, fat tyre cruisers, folding e-bikes, certified helmets and accessories with 10% Crypto discount.';
  return {
    title: page > 1 ? `Shop E-Bikes, Scooters & Gear Online | Page ${page}` : 'Shop E-Bikes, Scooters & Gear Online | e bikes for sale',
    description: page > 1 ? `Page ${page}: ${description}`.slice(0, 160) : description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      images: [{ url: 'https://ebikesforsale.com.au/images/catalog/og-home.jpg', width: 1200, height: 630, alt: 'e bikes for sale Australia' }],
      title: 'Shop Electric Bicycles Australia | e bikes for sale',
      description: 'Premier online e-bike store in Australia. EN15194 compliant 250W pedelecs with fast nationwide dispatch.',
      url,
      type: 'website',
    },
  };
}

export default async function ShopLandingPage({ searchParams }: Props) {
  const page = parsePage((await searchParams).page);
  if (page > Math.max(1, Math.ceil(PRODUCTS.length / SHOP_PAGE_SIZE))) notFound();
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />

      <main className="flex-1">
        <ShopCatalog page={page} />
      </main>

      <Footer />
      <ProductDetailModal />
      <CartDrawer />
      <WhatsAppChatWidget />
    </div>
  );
}
