'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { BUSINESS_INFO, HOMEPAGE_FAQS } from '@/lib/data';

export default function StructuredData() {
  // Organization schema is site-wide. The homepage FAQ schema belongs to the homepage only. Product markup lives on product pages only:
  // featured-product markup on the homepage carried a rating of 0 from 0 reviews, which Search Console flags as invalid review snippets.
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
        </>
      )}
    </>
  );
}
