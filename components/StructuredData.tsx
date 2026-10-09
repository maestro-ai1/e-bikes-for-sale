'use client';

import React from 'react';
import { BUSINESS_INFO, PRODUCTS, HOMEPAGE_FAQS } from '@/lib/data';

export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BUSINESS_INFO.name,
    legalName: BUSINESS_INFO.legalName,
    url: `https://${BUSINESS_INFO.domain}`,
    logo: `https://${BUSINESS_INFO.domain}/logo.png`,
    description: 'Premier online e-bike retailer and wholesale distributor in Australia.',
    telephone: BUSINESS_INFO.phone,
    email: BUSINESS_INFO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '100 Creek Street',
      addressLocality: 'Brisbane',
      addressRegion: 'QLD',
      postalCode: '4000',
      addressCountry: 'AU',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOMEPAGE_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const productSchemas = PRODUCTS.slice(0, 5).map((p) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    image: p.image,
    description: p.shortDescription,
    brand: {
      '@type': 'Brand',
      name: p.brand,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'AUD',
      price: p.price,
      availability: p.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: BUSINESS_INFO.name,
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: p.rating,
      reviewCount: p.reviewsCount,
    },
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchemas) }}
      />
    </>
  );
}
