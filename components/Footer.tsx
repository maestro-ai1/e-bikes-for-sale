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
      <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400">
        {headingHref ? <Link href={headingHref} className="hover:text-emerald-300">{heading}</Link> : heading}
      </h4>
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

            {/* Social media links: STRICTLY ONLY Facebook, Pinterest, and Instagram icons */}
            <div className="pt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                Follow Us
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-gray-800/90 hover:bg-[#1877F2] text-gray-300 hover:text-white flex items-center justify-center transition-colors shadow-xs"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-gray-800/90 hover:bg-[#E60023] text-gray-300 hover:text-white flex items-center justify-center transition-colors shadow-xs"
                  aria-label="Pinterest"
                  title="Pinterest"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.33 1.365-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-gray-800/90 hover:bg-[#E4405F] text-gray-300 hover:text-white flex items-center justify-center transition-colors shadow-xs"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
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
