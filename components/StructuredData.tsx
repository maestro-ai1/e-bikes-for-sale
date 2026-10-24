'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { BUSINESS_INFO, PRODUCTS, HOMEPAGE_FAQS } from '@/lib/data';
import { TRUSTPILOT_REVIEWS } from '@/components/ReviewsSection';
import { offerShippingDetails, OFFER_RETURN_POLICY } from '@/lib/offer-policy';

export default function StructuredData() {
  // Organization schema is site-wide. The homepage FAQ and featured-product schemas belong to the homepage only:
  // rendering them on every route produced duplicate FAQPage/Product markup on inner pages.
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === '';

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
    // The Trustpilot figures and the reviews shown in the homepage reviews section (4.9 out of 5, 1,500+ reviews)
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.9,
      bestRating: 5,
      worstRating: 1,
      ratingCount: 1500,
      reviewCount: 1500,
    },
    review: TRUSTPILOT_REVIEWS.map((rev) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: rev.author },
      datePublished: new Date(rev.date + ' UTC').toISOString().slice(0, 10),
      name: rev.title,
      reviewBody: rev.comment,
      reviewRating: { '@type': 'Rating', ratingValue: rev.rating, bestRating: 5, worstRating: 1 },
    })),
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
      shippingDetails: offerShippingDetails(p.price),
      hasMerchantReturnPolicy: OFFER_RETURN_POLICY,
      seller: {
        '@type': 'Organization',
        name: BUSINESS_INFO.name,
      },
    },
    // A rating is only emitted when a product has real reviews (a rating of 0 from 0 reviews is invalid markup)
    ...(p.reviewsCount > 0
      ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: p.rating, reviewCount: p.reviewsCount } }
      : {}),
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {isHome && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchemas) }}
          />
        </>
      )}
    </>
  );
}
