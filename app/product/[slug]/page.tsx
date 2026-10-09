import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/lib/data';
import Header from '@/components/Header';
import ProductLandingPage from '@/components/ProductLandingPage';
import CartDrawer from '@/components/CartDrawer';
import WhatsAppChatWidget from '@/components/WhatsAppChatWidget';
import ProductDetailModal from '@/components/ProductDetailModal';
import Footer from '@/components/Footer';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: 'Product Not Found | e bikes for sale Australia',
      description: 'The requested electric bicycle or accessory could not be found.',
    };
  }

  return {
    title: `${product.name} | Buy ${product.categoryLabel} Australia`,
    description: `${product.name} for sale in Australia. ${product.shortDescription} EN15194 certified 250W street legal with 10% Bitcoin & USDT discount.`,
    alternates: {
      canonical: `https://ebikesforsale.com.au/product/${product.slug}/`,
    },
    openGraph: {
      title: `${product.name} | e bikes for sale Australia`,
      description: product.description,
      url: `https://ebikesforsale.com.au/product/${product.slug}/`,
      type: 'website',
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: `${product.name} - Australian Street Legal Electric Bike`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | e bikes for sale`,
      description: product.shortDescription,
      images: [product.image],
    },
  };
}

export default async function ProductSlugPage({ params }: Props) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'AUD',
      price: product.price,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `https://ebikesforsale.com.au/product/${product.slug}/`,
      seller: {
        '@type': 'Organization',
        name: 'e bikes for sale',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewsCount,
    },
  };

  const faqJsonLd = product.faqs && product.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: product.faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer
      }
    }))
  } : null;

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <Header />

      <main className="flex-1">
        <ProductLandingPage initialProduct={product} />
      </main>

      <Footer />
      <ProductDetailModal />
      <CartDrawer />
      <WhatsAppChatWidget />
    </div>
  );
}
