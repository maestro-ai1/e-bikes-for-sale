import React from 'react';
import Link from 'next/link';
import { BUSINESS_INFO } from '@/lib/data';
import { FOOTER_LINKS } from '@/lib/site-nav';
import Logo from '@/components/Logo';

/**
 * Compact footer. The categories, brands and city pages live in the main menu, so they are not repeated here:
 * the footer carries the pages the menu does not (shop, compare, FAQ, wholesale, legal, policies), contact details and the ABN.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800 bg-[#0c121e] text-gray-400">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm space-y-3">
          <Link href="/" aria-label="e bikes for sale - home page" className="group inline-block">
            <Logo variant="dark" />
          </Link>
          <p className="text-xs leading-relaxed">
            Electric bikes, scooters, helmets and parts for Australian riders. Pedal-assist e-bikes follow the Australian EN 15194 rules.
          </p>
        </div>

        <nav aria-label="Footer" className="text-xs">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-1 sm:grid-cols-3">
            {FOOTER_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-block py-1.5 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="space-y-1 text-xs not-italic">
          <p>
            <a href={`tel:${BUSINESS_INFO.phone}`} className="hover:text-white">{BUSINESS_INFO.phone}</a>
          </p>
          <p>
            <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-white">{BUSINESS_INFO.email}</a>
          </p>
        </address>
      </div>

      <div className="border-t border-gray-800 bg-[#070b13] py-4 text-xs">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 sm:px-6 md:flex-row">
          <p>
            © {year} <strong className="font-bold text-white">{BUSINESS_INFO.name}</strong>. All rights reserved. ABN {BUSINESS_INFO.abn}
          </p>
          <p>Pay by PayID, bank transfer (Osko/EFT) or crypto.</p>
        </div>
      </div>
    </footer>
  );
}
