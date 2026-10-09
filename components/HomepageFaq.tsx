'use client';

import React, { useState } from 'react';
import { HOMEPAGE_FAQS } from '@/lib/data';
import { HelpCircle, ChevronDown, MessageSquare } from 'lucide-react';

export default function HomepageFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-14 sm:py-20 bg-gray-50 border-b border-gray-200" id="faqs">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2E6B4D] mb-1">
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Clear, transparent answers on online ordering, Australian road rules, minimum orders, and dispatch.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {HOMEPAGE_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-xs transition-colors"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="cursor-pointer w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-extrabold text-gray-900 text-sm sm:text-base hover:text-[#2E6B4D] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0 transition-transform ${
                    isOpen ? 'rotate-180 bg-emerald-100 text-[#2E6B4D]' : 'text-gray-500'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3 animate-in fade-in">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
