'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { BUSINESS_INFO, CATEGORIES_CONFIG } from '@/lib/data';
import Logo from '@/components/Logo';
import { 
  Bike, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Coins, 
  ArrowRight
} from 'lucide-react';

export default function Footer() {
  const { setCurrentView, setCategoryFilter, setIsCartOpen } = useApp();

  const handleNav = (view: string, cat = 'all') => {
    setCurrentView(view);
    setCategoryFilter(cat);
    if (typeof window !== 'undefined') {
      const targetUrl = view === 'home' ? '/' : `/${view}`;
      window.history.pushState(null, '', targetUrl);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0c121e] text-white border-t border-gray-800">
      
      {/* REVOLUTIONARY COMPACT FOOTER GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUMN 1: BRAND & MISSION (5 COLS) */}
          <div className="lg:col-span-5 space-y-3.5">
            <div 
              onClick={() => handleNav('home')}
              className="cursor-pointer group w-fit"
            >
              <Logo variant="dark" />
            </div>

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

          {/* COLUMN 2: CATEGORIES (4 COLS) */}
          <div className="lg:col-span-4 space-y-2.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400">
              E-Bikes & Products
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-gray-400">
              {CATEGORIES_CONFIG.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      if (cat.id === 'parts') handleNav('parts');
                      else if (cat.id === 'scooters') handleNav('scooters');
                      else if (cat.id === 'accessories') handleNav('accessories');
                      else handleNav('shop', cat.id);
                    }}
                    className="cursor-pointer hover:text-white transition-colors text-left"
                  >
                    {cat.title}
                  </button>
                </li>
              ))}
              <li className="col-span-2 pt-1">
                <button
                  onClick={() => handleNav('shop', 'all')}
                  className="cursor-pointer text-emerald-400 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Explore Complete Shop</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: CUSTOMER CARE & INFO (3 COLS) */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400">
              Customer Care
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-400">
              <li>
                <button onClick={() => handleNav('contact')} className="cursor-pointer hover:text-white transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('legal')} className="cursor-pointer text-amber-300 hover:text-white transition-colors font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Australian E-Bike Legal Rules & State Guide</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('legal')} className="cursor-pointer hover:text-white transition-colors">
                  Delivery & Logistics Information
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('legal')} className="cursor-pointer hover:text-white transition-colors">
                  Returns & 2-Year Local Warranty
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('home')} className="cursor-pointer hover:text-white transition-colors">
                  Frequently Asked Questions (FAQs)
                </button>
              </li>
              <li>
                <a href="/used-electric-bikes" className="cursor-pointer hover:text-white transition-colors">
                  Used Electric Bikes
                </a>
              </li>
              <li>
                <button onClick={() => handleNav('brands')} className="cursor-pointer hover:text-white transition-colors text-emerald-300 font-semibold">
                  Brands Showcase
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('wholesale')} className="cursor-pointer hover:text-white transition-colors text-amber-300 font-semibold">
                  Wholesale Fleet Supply (B2B)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('legal')} className="cursor-pointer hover:text-white transition-colors">
                  Road Rules (EN15194 Compliance)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('blog')} className="cursor-pointer hover:text-white transition-colors">
                  Buying Guides & Blog
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="cursor-pointer hover:text-white transition-colors">
                  About Us
                </button>
              </li>
            </ul>
          </div>

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
          <div className="pt-3 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] text-gray-500">
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>256-Bit SSL Encrypted Australian Checkout • 2-Year Local Warranty</span>
            </div>

            <div className="flex items-center gap-4">
              <button onClick={() => handleNav('legal')} className="cursor-pointer hover:text-gray-300 transition-colors">
                Privacy Policy
              </button>
              <button onClick={() => handleNav('legal')} className="cursor-pointer hover:text-gray-300 transition-colors">
                Terms and Conditions
              </button>
              <button onClick={() => handleNav('legal')} className="cursor-pointer hover:text-gray-300 transition-colors">
                Cookie Policy
              </button>
            </div>
          </div>

        </div>
      </div>

    </footer>
  );
}
