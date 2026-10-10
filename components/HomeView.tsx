'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CategoryGrid from '@/components/CategoryGrid';
import BestSellers from '@/components/BestSellers';
import ValueProposition from '@/components/ValueProposition';
import BrandsSection from '@/components/BrandsSection';
import BrandPage from '@/components/BrandPage';
import CompareTool from '@/components/CompareTool';
import ReviewsSection from '@/components/ReviewsSection';
import BlogSection from '@/components/BlogSection';
import HomepageSeoContent from '@/components/HomepageSeoContent';
import HomepageFaq from '@/components/HomepageFaq';
import ShopCatalog from '@/components/ShopCatalog';
import WholesalePage from '@/components/WholesalePage';
import LegalComplianceGuide from '@/components/LegalComplianceGuide';
import AboutPage from '@/components/AboutPage';
import ContactPage from '@/components/ContactPage';
import BlogDetailView from '@/components/BlogDetailView';
import ProductLandingPage from '@/components/ProductLandingPage';
import EbikesLandingPage from '@/components/EbikesLandingPage';
import ScootersLandingPage from '@/components/ScootersLandingPage';
import AccessoriesLandingPage from '@/components/AccessoriesLandingPage';
import PartsLandingPage from '@/components/PartsLandingPage';
import PolicyPages from '@/components/PolicyPages';
import ProductDetailModal from '@/components/ProductDetailModal';
import EbikeFinderQuiz from '@/components/EbikeFinderQuiz';
import CartDrawer from '@/components/CartDrawer';
import WhatsAppChatWidget from '@/components/WhatsAppChatWidget';
import Footer from '@/components/Footer';
import { CheckCircle2 } from 'lucide-react';

export default function HomeView() {
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
            <BlogSection />
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
        {currentView === 'blog' && <BlogSection />}
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
