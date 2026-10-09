'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '@/lib/data';

export default function WhatsAppChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const waNumber = '61420128746'; // Australia: +61 420 128 746

  const QUICK_PROMPTS = [
    'Hi! I would like help choosing the right road-legal e-bike for my commute.',
    'Hi! Can you check delivery timeframe and stock availability for my postcode?',
    'Hi! I would like to enquire about wholesale / commercial fleet pricing.',
    'Hi! Can you provide more details about PayID / Crypto payment discounts?',
  ];

  const handleSend = (text: string) => {
    const message = text.trim() || "G'day! Looking for a commuter, cargo, or fat-tyre e-bike recommendation.";
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${waNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
      
      {/* EXPANDABLE CHAT POPUP WINDOW */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-90 bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          
          {/* HEADER MATCHING WEBSITE GREEN & BRAND */}
          <div className="bg-gradient-to-r from-[#1E4733] to-[#2E6B4D] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                {/* Live Online Pulse */}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#1E4733] rounded-full animate-pulse" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm leading-tight flex items-center gap-1.5">
                  <span>{BUSINESS_INFO.name}</span>
                  <span className="bg-emerald-400/20 text-emerald-300 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    Online
                  </span>
                </h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3 h-3 text-[#25D366]" />
                  <span>Australian E-Bike Support</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close chat popup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* CHAT BODY */}
          <div className="p-4 bg-gray-50/70 space-y-3 max-h-80 overflow-y-auto">
            
            {/* Agent Greeting Bubble */}
            <div className="bg-white p-3.5 rounded-2xl rounded-tl-xs shadow-xs border border-gray-200 text-xs text-gray-800 space-y-1.5">
              <p className="font-bold text-gray-900 text-[13px]">
                G&apos;day! 👋
              </p>
              <p className="text-gray-700 leading-relaxed font-medium">
                Looking for a commuter, cargo, or fat-tyre e-bike? Tell us what you&apos;re looking for and we&apos;ll point you in the right direction!
              </p>
              <div className="text-[10px] text-gray-400 pt-1 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Instant response during Australian business hours</span>
              </div>
            </div>

            {/* Quick Question Chips */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                Quick Enquiries:
              </span>
              <div className="space-y-1.5">
                {QUICK_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    className="w-full text-left bg-white hover:bg-emerald-50 text-gray-700 hover:text-[#1E4733] border border-gray-200 hover:border-[#2E6B4D] p-2.5 rounded-xl text-xs font-semibold transition-all shadow-2xs flex items-center justify-between group"
                  >
                    <span className="truncate pr-2">{prompt}</span>
                    <Send className="w-3.5 h-3.5 text-[#25D366] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* FOOTER INPUT */}
          <div className="p-3 bg-white border-t border-gray-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(customMsg);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Type your message..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                className="flex-1 text-xs border border-gray-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#2E6B4D]"
              />
              <button
                type="submit"
                className="bg-[#25D366] hover:bg-[#1fa952] text-white p-2.5 rounded-xl transition-colors shadow-xs active:scale-95 shrink-0"
                aria-label="Send WhatsApp message"
                title="Send message on WhatsApp"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}

      {/* FLOATING TRIGGER BUTTON (GREEN TO MATCH WEBSITE & WHATSAPP) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 sm:px-4 sm:py-3.5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-400/30"
        aria-label="Chat with our Australian team on WhatsApp"
        title="Live WhatsApp Chat"
      >
        <div className="relative flex items-center justify-center">
          <MessageCircle className="w-6 h-6 fill-current text-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-300 rounded-full border-2 border-white animate-pulse" />
        </div>

        <div className="hidden sm:flex flex-col text-left pr-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-950 leading-none">
            Live Chat
          </span>
          <span className="text-xs font-black text-white leading-tight mt-0.5">
            WhatsApp
          </span>
        </div>
      </button>

    </div>
  );
}
