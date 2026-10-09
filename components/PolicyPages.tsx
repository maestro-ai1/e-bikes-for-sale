'use client';

import React, { useState } from 'react';
import { BUSINESS_INFO } from '@/lib/data';
import { ShieldCheck, Truck, RotateCcw, Coins, FileText, Lock, Cookie, Scale } from 'lucide-react';

export default function PolicyPages() {
  const [activeTab, setActiveTab] = useState<'delivery' | 'minimum' | 'packaging' | 'returns' | 'crypto' | 'terms' | 'privacy'>('delivery');

  return (
    <div className="bg-white min-h-screen py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2E6B4D]">
            Customer Care & Australian Compliance
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-1">
            Delivery, Returns & Store Policies
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Transparent consumer terms compliant with Australian Consumer Law (ACL) and road safety standards.
          </p>
        </div>

        {/* POLICY TABS NAVIGATION */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-gray-200 no-scrollbar">
          {[
            { id: 'delivery', label: '1. Delivery Information & Areas' },
            { id: 'minimum', label: '2. Minimum Order & Fees' },
            { id: 'packaging', label: '3. Packaging Information' },
            { id: 'returns', label: '4. Returns & Refunds' },
            { id: 'crypto', label: '5. Crypto 10% Discount Terms' },
            { id: 'terms', label: '6. Terms & Conditions' },
            { id: 'privacy', label: '7. Privacy Policy' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`cursor-pointer py-2 px-4 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#2E6B4D] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB CONTENTS */}
        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 sm:p-10 text-gray-700 space-y-6 leading-relaxed text-sm">
          
          {/* 1. DELIVERY INFORMATION */}
          {activeTab === 'delivery' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                <Truck className="w-6 h-6 text-[#2E6B4D]" />
                1. Delivery Information & Australian Freight Coverage
              </h2>
              <p>
                We dispatch e-bikes Australia-wide from strategically located distribution centers in Brisbane, Sydney, and Melbourne. 
              </p>
              <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-2 text-xs">
                <p><strong>Standard Metropolitan Transit:</strong> 2–4 Business Days</p>
                <p><strong>Regional & Remote Transit:</strong> 4–7 Business Days</p>
                <p><strong>Delivery Dispatch Timeframe:</strong> 2–5 Business Days Metro (Australia-Wide Fast Courier Dispatch)</p>
                <p><strong>Delivery Carrier Partners:</strong> Direct freight specialist couriers equipped with tail-lift trucks for heavy e-bike cartons.</p>
              </div>
              <p className="text-xs text-gray-500">
                Tracking numbers with real-time status updates are issued automatically once the consignment is scanned into the courier depot.
              </p>
            </div>
          )}

          {/* 2. MINIMUM ORDER & DELIVERY FEES */}
          {activeTab === 'minimum' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                <Coins className="w-6 h-6 text-[#2E6B4D]" />
                2. Minimum Order & Free-Delivery Threshold
              </h2>
              <p>
                To maintain comprehensive freight insurance, technician pre-dispatch quality audits, and protective double-box packaging, our store enforces the following policy:
              </p>
              <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-2 text-xs">
                <p><strong>Minimum Order Amount:</strong> ${BUSINESS_INFO.minOrder} AUD <span className="font-mono text-gray-400">[MINIMUM ORDER: $350]</span></p>
                <p><strong>Free Delivery Threshold:</strong> Orders of ${BUSINESS_INFO.freeDeliveryThreshold} AUD or more receive 100% Free Standard Metropolitan Delivery across Australian capital cities.</p>
                <p><strong>Orders Under Threshold:</strong> Flat-rate heavy-freight fee of $75 AUD for regional or sub-threshold orders.</p>
              </div>
            </div>
          )}

          {/* 3. PACKAGING INFORMATION */}
          {activeTab === 'packaging' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-[#2E6B4D]" />
                3. Heavy-Duty Packaging & Assembly Manual Included
              </h2>
              <p>
                Electric bicycles carry sensitive lithium-ion battery cells and delicate derailleurs that demand superior packaging:
              </p>
              <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-2 text-xs">
                <p>• <strong>Double-Corrugated Carton:</strong> Engineered to withstand up to 150kg of external compressive force.</p>
                <p>• <strong>Custom Foam Moulding:</strong> Wheels, handlebars, and suspension forks are seated in high-density EVA foam cushions.</p>
                <p>• <strong>Safe Delivery with Assembly Toolkit:</strong> The bicycle arrives 85%-90% assembled. You simply fit the front wheel, tighten the stem bolts with the supplied allen keys, and thread the pedals (Left and Right specific). An illustrated Australian setup handbook is included in every box.</p>
              </div>
            </div>
          )}

          {/* 4. RETURNS & REFUNDS */}
          {activeTab === 'returns' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                <RotateCcw className="w-6 h-6 text-[#2E6B4D]" />
                4. Returns, Refunds & Australian Consumer Law (ACL)
              </h2>
              <p>
                Our goods come with guarantees that cannot be excluded under the Australian Consumer Law. You are entitled to a replacement or refund for a major failure and compensation for any other reasonably foreseeable loss or damage.
              </p>
              <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-2 text-xs">
                <p>• <strong>Change of Mind:</strong> 14-day return period provided the bicycle has zero odometer mileage, is in original unblemished packaging, and freight is arranged by the customer.</p>
                <p>• <strong>Warranty Claim:</strong> 2-Year Australian frame warranty and 1-Year battery cell replacement warranty.</p>
                <p>• <strong>Returns Policy Placeholder:</strong> <span className="font-mono text-emerald-800">[INSERT VERIFIED RETURNS & REFUND POLICY DETAILS]</span></p>
              </div>
            </div>
          )}

          {/* 5. CRYPTO 10% DISCOUNT TERMS */}
          {activeTab === 'crypto' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                <Coins className="w-6 h-6 text-amber-500" />
                5. Cryptocurrency Payment Terms (10% Discount)
              </h2>
              <p>
                Customers choosing to complete settlement using supported cryptocurrencies (Bitcoin and USDT) are granted an automatic 10% discount on product retail prices.
              </p>
              <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-2 text-xs">
                <p>• The 10% discount is applied automatically during checkout before generating the payment address.</p>
                <p>• Blockchain confirmation must occur within the 30-minute locked-exchange rate window.</p>
                <p>• Discount applies exclusively to Bitcoin and USDT cryptocurrency settlements across all Australian metro and regional orders.</p>
              </div>
            </div>
          )}

          {/* 6. TERMS & CONDITIONS */}
          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                <Scale className="w-6 h-6 text-[#2E6B4D]" />
                6. Terms and Conditions
              </h2>
              <p>
                By accessing or placing an order through <strong>ebikesforsale.com.au</strong>, you agree to comply with our Terms of Service.
              </p>
              <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-2 text-xs">
                <p>• <strong>Rider Responsibility:</strong> Riders are legally bound to follow road transport rules, state helmet mandates (AS/NZS 2063), and age guidelines in their respective Australian jurisdiction.</p>
                <p>• <strong>Speed Modification:</strong> Any aftermarket unlocking or tampering with the 25 km/h motor cutoff voids Australian street-legal pedelec status and may void product warranty.</p>
                <p>• <strong>Terms Placeholder:</strong> <span className="font-mono text-emerald-800">[INSERT LEGAL REVIEWED TERMS & CONDITIONS BEFORE PUBLISHING]</span></p>
              </div>
            </div>
          )}

          {/* 7. PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                <Lock className="w-6 h-6 text-[#2E6B4D]" />
                7. Privacy & Data Protection Policy
              </h2>
              <p>
                We respect your personal privacy in accordance with the Australian Privacy Principles (APPs) set out in the Privacy Act 1988 (Cth).
              </p>
              <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-2 text-xs">
                <p>• We collect name, phone, shipping address, and email solely for order fulfilment, courier consignment generation, and warranty registration.</p>
                <p>• We never sell, rent, or distribute customer details to third-party marketing entities.</p>
                <p>• Privacy Policy Placeholder: <span className="font-mono text-emerald-800">[INSERT FINAL AUSTRALIAN LEGAL PRIVACY POLICY]</span></p>
              </div>
            </div>
          )}

        </div>

        {/* Legal Advisory Notice */}
        <div className="mt-8 p-4 bg-gray-100 rounded-2xl text-[11px] text-gray-500 text-center">
          Notice: Policy placeholders should be formally reviewed by an Australian legal practitioner before commercial publishing.
        </div>

      </div>
    </div>
  );
}
