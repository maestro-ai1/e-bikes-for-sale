import React from 'react';
import { BUSINESS_INFO } from '@/lib/site-config';
import { ShieldCheck, Truck, RotateCcw, Coins, Lock, Scale } from 'lucide-react';

// Every policy section is rendered in the page HTML (no hidden tabs) so Google, Merchant Center and customers can all read the delivery,
// returns, packaging and terms text. The menu at the top jumps to each section with plain anchor links.
const SECTIONS = [
  { id: 'delivery', label: '1. Delivery Information & Areas' },
  { id: 'minimum', label: '2. Minimum Order & Fees' },
  { id: 'packaging', label: '3. Packaging Information' },
  { id: 'returns', label: '4. Returns & Refunds' },
  { id: 'crypto', label: '5. Crypto 10% Discount Terms' },
  { id: 'terms', label: '6. Terms & Conditions' },
  { id: 'privacy', label: '7. Privacy Policy' },
];

export default function PolicyPages({ asSection = false }: { asSection?: boolean } = {}) {
  return (
    <div className="bg-white min-h-screen py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2E6B4D]">
            Customer Care & Australian Compliance
          </span>
          {(() => { const H = asSection ? 'h2' : 'h1'; return <H className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-1">
            Delivery, Returns & Store Policies
          </H>; })()}
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Transparent consumer terms compliant with Australian Consumer Law (ACL) and road safety standards.
          </p>
        </div>

        {/* POLICY SECTION MENU (anchor links) */}
        <nav aria-label="Policy sections" className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-gray-200 no-scrollbar">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="py-2 px-4 rounded-xl text-xs font-bold whitespace-nowrap transition-all bg-gray-100 text-gray-700 hover:bg-[#2E6B4D] hover:text-white"
            >
              {s.label}
            </a>
          ))}
        </nav>

        {/* ALL SECTIONS */}
        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 sm:p-10 text-gray-700 space-y-10 leading-relaxed text-sm">

          {/* 1. DELIVERY INFORMATION */}
          <section id="delivery" className="space-y-4 scroll-mt-24">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <Truck className="w-6 h-6 text-[#2E6B4D]" />
              1. Delivery Information & Australian Freight Coverage
            </h2>
            <p>
              We dispatch e-bikes Australia-wide from strategically located distribution centers in Brisbane, Sydney, and Melbourne.
            </p>
            <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-2 text-xs">
              <p><strong>Standard Metropolitan Transit:</strong> 2–5 Business Days</p>
              <p><strong>Regional & Remote Transit:</strong> 2–5 Business Days</p>
              <p><strong>Delivery Dispatch Timeframe:</strong> 2–5 Business Days Metro (Australia-Wide Fast Courier Dispatch)</p>
              <p><strong>Delivery Carrier Partners:</strong> Direct freight specialist couriers equipped with tail-lift trucks for heavy e-bike cartons.</p>
            </div>
            <p className="text-xs text-gray-500">
              Tracking numbers with real-time status updates are issued automatically once the consignment is scanned into the courier depot.
            </p>
          </section>

          {/* 2. MINIMUM ORDER & DELIVERY FEES */}
          <section id="minimum" className="space-y-4 scroll-mt-24">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <Coins className="w-6 h-6 text-[#2E6B4D]" />
              2. Minimum Order & Free-Delivery Threshold
            </h2>
            <p>
              To maintain comprehensive freight insurance, technician pre-dispatch quality audits, and protective double-box packaging, our store enforces the following policy:
            </p>
            <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-2 text-xs">
              <p><strong>Minimum Order Amount:</strong> ${BUSINESS_INFO.minOrder} AUD</p>
              <p><strong>Free Delivery Threshold:</strong> Orders of ${BUSINESS_INFO.freeDeliveryThreshold} AUD or more receive 100% Free Standard Metropolitan Delivery across Australian capital cities.</p>
              <p><strong>Orders Under Threshold:</strong> Flat-rate heavy-freight fee of $75 AUD for regional or sub-threshold orders.</p>
            </div>
          </section>

          {/* 3. PACKAGING INFORMATION */}
          <section id="packaging" className="space-y-4 scroll-mt-24">
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
          </section>

          {/* 4. RETURNS & REFUNDS */}
          <section id="returns" className="space-y-4 scroll-mt-24">
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
            </div>
          </section>

          {/* 5. CRYPTO 10% DISCOUNT TERMS */}
          <section id="crypto" className="space-y-4 scroll-mt-24">
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
          </section>

          {/* 6. TERMS & CONDITIONS */}
          <section id="terms" className="space-y-4 scroll-mt-24">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <Scale className="w-6 h-6 text-[#2E6B4D]" />
              6. Terms and Conditions
            </h2>
            <p>
              These terms apply to every order placed through <strong>{BUSINESS_INFO.domain}</strong>. By placing an order or using the website you agree to them. Nothing in these terms limits your rights under the Australian Consumer Law.
            </p>
            <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-3 text-xs">
              <p><strong>Who we are:</strong> {BUSINESS_INFO.legalName}, trading as {BUSINESS_INFO.name}. Address: {BUSINESS_INFO.address}. Email: {BUSINESS_INFO.email}. Phone: {BUSINESS_INFO.phone}. Hours: {BUSINESS_INFO.operatingHours}.</p>
              <p><strong>Prices and orders:</strong> Prices are in Australian dollars. An order is accepted when we confirm it by email and your payment has been received. If a price, specification or stock level is shown incorrectly we may cancel the order and refund you in full.</p>
              <p><strong>Payment:</strong> We accept PayID, bank transfer (Osko/EFT), Bitcoin and USDT. Orders are dispatched after payment is confirmed. The 10% cryptocurrency discount is described in section 5. We do not take card payments and do not store card details.</p>
              <p><strong>Delivery:</strong> Delivery areas, times, fees and the free-delivery threshold are in sections 1 and 2. Delivery times are estimates and start once payment is confirmed. Risk in the goods passes to you when they are delivered. Please check the carton on arrival and tell us as soon as possible about any visible damage, with photos.</p>
              <p><strong>Returns, refunds and warranty:</strong> Section 4 sets out the 14-day change-of-mind return, the warranty and your Australian Consumer Law rights. Warranty does not cover damage from accidents, misuse, neglect, water ingress, unauthorised repairs or modification.</p>
              <p><strong>Safe and legal use:</strong> Our e-bikes are pedal-assist models built to EN 15194 (250W continuous power, assistance cutting out at 25 km/h). Riders must follow the road rules, helmet laws (AS/NZS 2063) and age rules of their state or territory. Removing or bypassing the speed limiter can make the bike illegal on public roads and may void the warranty. Charge batteries only with the supplied charger, indoors and under supervision.</p>
              <p><strong>Product information:</strong> We take care to keep descriptions, specifications and photos accurate. Colours, accessories and minor specifications can vary between production runs. Images are for illustration.</p>
              <p><strong>Liability:</strong> To the extent the law allows, our liability for a breach that is not a consumer guarantee is limited to replacing the goods, supplying equivalent goods, repairing them or paying the cost of doing so. We are not liable for indirect or consequential loss.</p>
              <p><strong>Website content:</strong> The text, images and design on this website belong to us or our suppliers and may not be copied for commercial use without written permission.</p>
              <p><strong>Governing law:</strong> These terms are governed by the laws of Queensland, Australia, and the courts of Queensland have jurisdiction, without affecting any right you have under the Australian Consumer Law.</p>
              <p><strong>Changes:</strong> We may update these terms. The version published on this page when you place your order applies to that order. Last updated 22 November 2026.</p>
            </div>
          </section>

          {/* 7. PRIVACY POLICY */}
          <section id="privacy" className="space-y-4 scroll-mt-24">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <Lock className="w-6 h-6 text-[#2E6B4D]" />
              7. Privacy & Data Protection Policy
            </h2>
            <p>
              {BUSINESS_INFO.legalName} handles personal information in line with the Australian Privacy Principles in the Privacy Act 1988 (Cth). This policy explains what we collect, why, who sees it and how you can access or correct it.
            </p>
            <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-3 text-xs">
              <p><strong>What we collect:</strong> your name, email address, phone number and delivery address; the products you order; messages you send through our contact, wholesale and WhatsApp channels; and, for bank or cryptocurrency payments, the transaction details or payment screenshot you send us so we can confirm your payment. We do not collect or store card numbers.</p>
              <p><strong>Why we use it:</strong> to process and deliver orders, confirm payments, arrange courier consignments, answer questions, handle returns and warranty claims, meet tax and legal obligations, and keep the website secure and working.</p>
              <p><strong>Who we share it with:</strong> only the people who help us fulfil your order: freight and courier companies (your name, address and phone number), our email and website hosting providers, and our suppliers where a warranty claim needs them. Some providers, including our hosting provider, store data outside Australia. We take reasonable steps to make sure they protect it. We never sell or rent your details.</p>
              {(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_CLARITY_ID) && (
                <p><strong>Analytics and cookies:</strong> to understand how visitors use the website we use{process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ? ' Google Analytics 4' : ''}{process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && process.env.NEXT_PUBLIC_CLARITY_ID ? ' and' : ''}{process.env.NEXT_PUBLIC_CLARITY_ID ? ' Microsoft Clarity' : ''}. These tools set cookies and record pages visited, device type and approximate location, and Clarity records anonymised interaction patterns such as clicks and scrolling. They do not record what you type into forms. You can block cookies in your browser settings or use the opt-out tools from Google and Microsoft.</p>
              )}
              <p><strong>Marketing:</strong> we send marketing emails only if you ask for them, and every message includes a way to unsubscribe.</p>
              <p><strong>Security and retention:</strong> we store information on secured systems with restricted access. We keep order and payment records for at least five years because Australian tax law requires it, and delete other personal information when we no longer need it.</p>
              <p><strong>Your rights:</strong> you can ask to see the personal information we hold about you, or to have it corrected, by emailing {BUSINESS_INFO.email}. We reply within 30 days. If you are unhappy with how we handled your information, contact us first. You can also complain to the <a href="https://www.oaic.gov.au/privacy/privacy-complaints" target="_blank" rel="noopener noreferrer" className="font-bold text-[#2E6B4D] hover:underline">Office of the Australian Information Commissioner</a>.</p>
              <p><strong>Children:</strong> the website is for adults. We do not knowingly collect information from anyone under 18 without a parent or guardian.</p>
              <p><strong>Contact and updates:</strong> {BUSINESS_INFO.legalName}, {BUSINESS_INFO.address}. Email {BUSINESS_INFO.email}. This policy was last updated on 22 November 2026 and any changes are posted on this page.</p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
