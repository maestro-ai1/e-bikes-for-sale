'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { BUSINESS_INFO } from '@/lib/data';
import { NAV, FOOTER_LINKS } from '@/lib/site-nav';
import type { NavLeaf } from '@/lib/site-nav';
import Logo from '@/components/Logo';
import Link from 'next/link';
import { ShieldCheck, Coins } from 'lucide-react';

/** Every footer link comes from the same menu data as the header, so each one is a real, crawlable landing page. */
const groupLinks = (item: string, ...headings: string[]): NavLeaf[] => {
  const top = NAV.find((n) => n.label === item);
  const groups = (top?.groups || []).filter((g) => !headings.length || headings.includes(g.heading));
  return groups.flatMap((g) => g.links);
};
const dedupe = (links: NavLeaf[]) => links.filter((l, i, a) => a.findIndex((x) => x.href === l.href) === i);

const EBIKE_LINKS: NavLeaf[] = dedupe([
  { label: 'All electric bikes', href: '/ebikes' },
  { label: 'Electric mountain bikes', href: '/ebikes/electric-mountain-bike' },
  ...groupLinks('E-Bikes').filter((l) => !l.href.includes('/electric-mountain-bike/')),
]);
const GEAR_LINKS: NavLeaf[] = dedupe([...groupLinks('Scooters'), ...groupLinks('Gear and parts')]);
const BRAND_LINKS: NavLeaf[] = groupLinks('Brands');
const CITY_LINKS: NavLeaf[] = groupLinks('Locations');
const CARE_LINKS: NavLeaf[] = [
  { label: 'Contact us', href: '/contact' },
  { label: 'About us', href: '/about' },
  { label: 'Buying guides & blog', href: '/blog' },
  ...FOOTER_LINKS,
];

function FooterColumn({ heading, headingHref, links, className = '' }: { heading: string; headingHref?: string; links: NavLeaf[]; className?: string }) {
  return (
    <div className={`space-y-2.5 ${className}`}>
      <h2 className="text-xs font-black uppercase tracking-wider text-emerald-400">
        {headingHref ? <Link href={headingHref} className="hover:text-emerald-300">{heading}</Link> : heading}
      </h2>
      <ul className="space-y-1 text-xs text-gray-400">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="inline-block py-1 transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const { setIsCartOpen } = useApp();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0c121e] text-white border-t border-gray-800">
      
      {/* REVOLUTIONARY COMPACT FOOTER GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-x-6 gap-y-8 items-start">
          
          {/* COLUMN 1: BRAND & MISSION (5 COLS) */}
          <div className="col-span-2 md:col-span-3 lg:col-span-4 space-y-3.5">
            <Link href="/" aria-label="e bikes for sale - home page" className="group inline-block">
              <Logo variant="dark" />
            </Link>

            {/* 40–60 word business description */}
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Australia’s premier destination for high-performance, street-legal electric bicycles, folding pedelecs, and heavy-duty cargo haulers. Built to EN15194 standards with fast metro dispatch and verified local customer support.
            </p>

          </div>

          {/* COLUMN 2: E-BIKES */}
          <FooterColumn className="col-span-1 lg:col-span-2" heading="E-Bikes" headingHref="/ebikes" links={EBIKE_LINKS} />

          {/* COLUMN 3: SCOOTERS, GEAR AND PARTS */}
          <FooterColumn className="col-span-1 lg:col-span-2" heading="Scooters, Gear & Parts" headingHref="/scooters" links={GEAR_LINKS} />

          {/* COLUMN 4: BRANDS AND LOCATIONS */}
          <div className="col-span-1 lg:col-span-2 space-y-6">
            <FooterColumn heading="Brands" headingHref="/brands" links={BRAND_LINKS} />
            <FooterColumn heading="Electric Bikes By City" links={CITY_LINKS} />
          </div>

          {/* COLUMN 5: CUSTOMER CARE */}
          <FooterColumn className="col-span-1 lg:col-span-2" heading="Customer Care" links={CARE_LINKS} />

        </div>
      </div>

      {/* COMPACT BOTTOM BAR WITH PAYMENT MODES & MANDATORY ABN */}
      <div className="border-t border-gray-800 bg-[#070b13] py-6 text-xs text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* COPYRIGHT & ABN EXCLUSIVELY AT FOOTER */}
            <div className="space-y-0.5 text-center md:text-left">
              <div>
                © {currentYear} <strong className="text-white font-bold">{BUSINESS_INFO.name}</strong>. All rights reserved.
              </div>
              <div className="font-mono text-xs text-emerald-400 font-bold">
                ABN: {BUSINESS_INFO.abn}
              </div>
            </div>

            {/* ONLY MODE OF PAYMENTS: PAY ID , BANK TRANSFER (OSKO/EFT) . CRYPTO */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                Payment Methods:
              </span>
              
              {/* PayID */}
              <div 
                onClick={() => setIsCartOpen(true)}
                className="cursor-pointer bg-[#1a2333] hover:bg-[#223048] border border-cyan-500/40 text-cyan-300 px-3 py-1 rounded-md text-[11px] font-black tracking-wide flex items-center gap-1.5 shadow-xs transition-colors"
                title="Click to view PayID checkout options in cart"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>PayID</span>
              </div>

              {/* Bank Transfer (Osko / EFT) */}
              <div 
                onClick={() => setIsCartOpen(true)}
                className="cursor-pointer bg-[#1a2333] hover:bg-[#223048] border border-blue-500/40 text-blue-300 px-3 py-1 rounded-md text-[11px] font-black tracking-wide flex items-center gap-1.5 shadow-xs transition-colors"
                title="Click to view Bank Transfer checkout options in cart"
              >
                <span>Bank Transfer (Osko/EFT)</span>
              </div>

              {/* Crypto (10% Discount) */}
              <div 
                onClick={() => setIsCartOpen(true)}
                className="cursor-pointer bg-[#1e2a22] hover:bg-[#293d30] border border-amber-500/50 text-amber-300 px-3 py-1 rounded-md text-[11px] font-black tracking-wide flex items-center gap-1.5 shadow-xs transition-colors"
                title="Click to view Crypto 10% discount checkout in cart"
              >
                <Coins className="w-3.5 h-3.5 text-amber-400" />
                <span>Crypto (Save 10%)</span>
              </div>
            </div>

          </div>

          {/* SECURITY & LEGAL POLICIES */}
          <div className="pt-3 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] text-gray-400">
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>256-Bit SSL Encrypted Australian Checkout • 2-Year Local Warranty</span>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/policies" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
              <Link href="/policies" className="hover:text-gray-300 transition-colors">Terms and Conditions</Link>
              <Link href="/policies" className="hover:text-gray-300 transition-colors">Cookie Policy</Link>
            </div>
          </div>

        </div>
      </div>

    </footer>
  );
}
