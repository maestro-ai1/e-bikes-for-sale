import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/lib/data';
import { CATALOG_KEYWORDS } from '@/lib/catalog-keywords';
import Header from '@/components/Header';
import ProductLandingPage from '@/components/ProductLandingPage';
import CartDrawer from '@/components/CartDrawer';
import WhatsAppChatWidget from '@/components/WhatsAppChatWidget';
import ProductDetailModal from '@/components/ProductDetailModal';
import Footer from '@/components/Footer';

const SITE_ORIGIN = 'https://ebikesforsale.com.au';
const absUrl = (u: string) => (u.startsWith('/') ? `${SITE_ORIGIN}${u}` : u);

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

  // Category keyword from the Semrush bank (one per category) so each product page supports its category page
  const sub = product.subcategoryId;
  const KEY: Record<string, string> = {
    emtb: 'emtb', folding: 'folding', cruiser: 'cruiser', 'fat-tyre': 'fat-tyre', cargo: 'cargo', road: 'road', commuter: 'commuter',
    scooters: sub === 'scooters-kids' ? 'sc-kids' : sub === 'scooters-accessories' ? 'sc-accessories' : sub === 'scooters-adults' ? 'sc-adults' : 'sc-electric',
    helmets: 'kids-helmets',
  };
  const phrase = CATALOG_KEYWORDS[KEY[product.category]]?.primary;
  const titleCase = (s: string) => s.replace(/\b\w/g, (c) => c.toUpperCase());
  const focus = product.focusKeyword;
  let title = focus ? `${titleCase(focus)} | Australia` : phrase ? `${product.name} | ${titleCase(phrase)} Australia` : `${product.name} | Buy ${product.categoryLabel} Australia`;
  if (title.length > 60 && phrase) title = `${product.name} | ${titleCase(phrase)}`;
  if (title.length > 60) title = product.name.length > 60 ? `${product.name.slice(0, 57).trim()}...` : product.name;
  let description = `${phrase ? `Buy a ${phrase} in Australia: ` : ''}${product.name}. ${product.shortDescription} EN15194, 250W, 10% Bitcoin & USDT discount.`;
  if (description.length > 158) description = `${description.slice(0, 155).replace(/[\s,;:.]+\S*$/, '')}...`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://ebikesforsale.com.au/product/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | e bikes for sale Australia`,
      description: product.description,
      url: `https://ebikesforsale.com.au/product/${product.slug}`,
      type: 'website',
      images: [
        {
          url: absUrl(product.image),
          width: 600,
          height: 600,
          alt: product.focusKeyword || `${product.name} - Australian Street Legal Electric Bike`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | e bikes for sale`,
      description: product.shortDescription,
      images: [absUrl(product.image)],
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
    sku: product.id,
    image: (product.gallery && product.gallery.length ? product.gallery : [product.image]).map(absUrl),
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
      url: `https://ebikesforsale.com.au/product/${product.slug}`,
      seller: {
        '@type': 'Organization',
        name: 'e bikes for sale',
      },
    },
    // Only emit a rating when there are real reviews
    ...(product.reviewsCount > 0
      ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: product.rating, reviewCount: product.reviewsCount } }
      : {}),
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
