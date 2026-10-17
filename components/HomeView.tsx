'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useApp } from '@/context/AppContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CategoryGrid from '@/components/CategoryGrid';
import BestSellers from '@/components/BestSellers';
import ValueProposition from '@/components/ValueProposition';
import BrandsSection from '@/components/BrandsSection';
import ReviewsSection from '@/components/ReviewsSection';
import BlogSection, { type BlogCard } from '@/components/BlogSection';
import HomepageSeoContent from '@/components/HomepageSeoContent';
import HomepageFaq from '@/components/HomepageFaq';
import WhatsAppChatWidget from '@/components/WhatsAppChatWidget';
import Footer from '@/components/Footer';
import { CheckCircle2 } from 'lucide-react';

// Views other than the home page and the closed overlays render nothing on first load, so their code loads on demand.
// This keeps the first script small and the hydration work short; the home page HTML is unchanged.
const BrandPage = dynamic(() => import('@/components/BrandPage'));
const CompareTool = dynamic(() => import('@/components/CompareTool'));
const ShopCatalog = dynamic(() => import('@/components/ShopCatalog'));
const WholesalePage = dynamic(() => import('@/components/WholesalePage'));
const LegalComplianceGuide = dynamic(() => import('@/components/LegalComplianceGuide'));
const AboutPage = dynamic(() => import('@/components/AboutPage'));
const ContactPage = dynamic(() => import('@/components/ContactPage'));
const BlogDetailView = dynamic(() => import('@/components/BlogDetailView'));
const ProductLandingPage = dynamic(() => import('@/components/ProductLandingPage'));
const EbikesLandingPage = dynamic(() => import('@/components/EbikesLandingPage'));
const ScootersLandingPage = dynamic(() => import('@/components/ScootersLandingPage'));
const AccessoriesLandingPage = dynamic(() => import('@/components/AccessoriesLandingPage'));
const PartsLandingPage = dynamic(() => import('@/components/PartsLandingPage'));
const PolicyPages = dynamic(() => import('@/components/PolicyPages'));
const ProductDetailModal = dynamic(() => import('@/components/ProductDetailModal'), { ssr: false });
const EbikeFinderQuiz = dynamic(() => import('@/components/EbikeFinderQuiz'), { ssr: false });
const CartDrawer = dynamic(() => import('@/components/CartDrawer'), { ssr: false });

export default function HomeView({ blogCards }: { blogCards: BlogCard[] }) {
  const { currentView, notification } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 selection:bg-[#2E6B4D] selection:text-white">
      
      {/* GLOBAL TOAST NOTIFICATION */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#1E4733] text-white px-4 py-3 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 text-xs font-bold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* HEADER WITH ANNOUNCEMENT SLIDER & NAVIGATION */}
      <Header />

      {/* MAIN VIEW CONTENT ROUTER */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <Hero />
            <CategoryGrid />
            <BestSellers />
            <ValueProposition />
            <BrandsSection />
            <ReviewsSection />
            <BlogSection posts={blogCards} />
            <HomepageSeoContent />
            <HomepageFaq />
          </>
        )}

        {currentView === 'shop' && <ShopCatalog />}
        {currentView === 'ebikes' && <EbikesLandingPage />}
        {currentView === 'scooters' && <ScootersLandingPage />}
        {currentView === 'accessories' && <AccessoriesLandingPage />}
        {currentView === 'parts' && <PartsLandingPage />}
        {currentView === 'brands' && <BrandPage />}
        {currentView === 'wholesale' && <WholesalePage />}
        {currentView === 'compare' && <CompareTool />}
        {currentView === 'legal' && (
          <>
            <LegalComplianceGuide />
            <PolicyPages />
          </>
        )}
        {currentView === 'about' && <AboutPage />}
        {currentView === 'contact' && <ContactPage />}
        {currentView === 'blog' && <BlogSection posts={blogCards} />}
        {currentView === 'blog-detail' && <BlogDetailView />}
        {currentView === 'product' && <ProductLandingPage />}
        {currentView === 'faq' && (
          <div className="py-8 bg-white">
            <HomepageFaq />
          </div>
        )}
      </main>

      {/* FOOTER */}
      <Footer />

      {/* HIGH TURNOVER PDP DETAIL MODAL */}
      <ProductDetailModal />

      {/* INTERACTIVE E-BIKE FINDER QUIZ */}
      <EbikeFinderQuiz />

      {/* MOBILE-FIRST CART DRAWER & CHECKOUT */}
      <CartDrawer />

      {/* WHATSAPP LIVE CHAT WIDGET (BOTTOM RIGHT) */}
      <WhatsAppChatWidget />

    </div>
  );
}
