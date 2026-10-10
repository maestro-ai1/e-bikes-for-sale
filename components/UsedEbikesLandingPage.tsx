'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/data';
import {
  ArrowRight,
  BatteryCharging,
  Check,
  ChevronDown,
  ClipboardCheck,
  ExternalLink,
  HelpCircle,
  MessageCircle,
  ShieldAlert,
  Wallet,
} from 'lucide-react';

const SITE = 'https://ebikesforsale.com.au';

// Price range of the new e-bikes in our own catalogue (keeps the comparison accurate)
const NEW_RANGE = (() => {
  const bikes = PRODUCTS.filter((p) => /bike|bicycle|e-bike|ebike/i.test(p.categoryLabel) && p.price >= 1000);
  if (!bikes.length) return null;
  const prices = bikes.map((p) => p.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
})();

const CHECKLIST: { title: string; text: string }[] = [
  { title: 'Battery age and condition', text: 'Ask how old the battery is and how often it has been charged. Walk away from any pack that is swollen, dented, leaking or runs hot.' },
  { title: 'Original charger', text: 'Use the manufacturer charger only. A missing or mismatched charger is a red flag for the whole battery system.' },
  { title: 'Motor and display', text: 'Ride it through every assist level. Listen for grinding or clicking and check the display for error codes.' },
  { title: 'Brakes and drivetrain', text: 'E-bikes wear pads, chains and cassettes faster. Check pad thickness, rotor wear and chain stretch.' },
  { title: 'Frame, fork and welds', text: 'Look for cracks near the head tube, motor mount and rear dropouts, especially on bikes that have been ridden hard.' },
  { title: 'Compliance label', text: 'Look for the EN 15194 label and make sure the bike has not been modified to exceed the 250W / 25 km/h limits.' },
  { title: 'Proof of ownership', text: 'Ask for the receipt, serial number and any service history so you know the bike is not stolen and has been maintained.' },
];

const FAQS: { question: string; answer: string }[] = [
  {
    question: 'Is it safe to buy second hand electric bikes for sale?',
    answer:
      'It can be, if you inspect the battery, motor, brakes and frame before paying. Pay extra attention to the battery: avoid packs that are swollen, dented, overheating or charged with a non-original charger, and ask for proof of ownership.',
  },
  {
    question: 'How long does a second hand electric cycle battery last?',
    answer:
      'CHOICE says e-bike batteries are generally expected to last around 500 charges, with replacements costing roughly $350 to $1,000 depending on size. Budget for a replacement when you price a used bike.',
  },
  {
    question: 'How much do used electric bikes for sale cost in Australia?',
    answer:
      'Prices vary widely with age, battery health and brand. CHOICE reports new e-bike prices from under $800 to over $12,000, with a typical well-equipped bike around $2,000 to $3,500, so a used bike should sit meaningfully below the new price once battery wear is factored in.',
  },
  {
    question: 'Can I get a warranty on an e bike 2nd hand?',
    answer:
      'Warranty terms depend on the seller. Consumer guarantees under the Australian Consumer Law can apply to second-hand goods bought from a business, but they take age and price into account, so always get any warranty terms in writing before you buy.',
  },
  {
    question: 'Where can I find used e bikes for sale in Australia?',
    answer:
      'Send us your budget, rider height and how you plan to ride, and we will tell you about any pre-owned stock that matches. Whatever you buy, inspect it in person and test ride it first.',
  },
];

export default function UsedEbikesLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE}/used-electric-bikes#page`,
        url: `${SITE}/used-electric-bikes`,
        name: 'Used Electric Bicycles in Australia',
        description:
          'Guide to buying used electric bicycles in Australia: what to inspect, what they cost and how to enquire about pre-owned e-bikes.',
        inLanguage: 'en-AU',
        isPartOf: { '@type': 'WebSite', url: SITE, name: 'e bikes for sale' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Used Electric Bicycles', item: `${SITE}/used-electric-bikes` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      },
    ],
  };

  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 sm:px-6 pt-5 text-xs text-gray-500">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-[#2E6B4D] hover:underline">Home</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-gray-800 font-semibold">Used Electric Bicycles</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1E4733] via-[#2E6B4D] to-[#1E4733] text-white mt-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <span className="inline-block text-xs font-black uppercase tracking-wider text-emerald-200 mb-3">
            Pre-owned e-bikes · Australia
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight max-w-3xl">
            Used Electric Bicycles in Australia
          </h1>
          <p className="mt-5 text-base sm:text-lg text-emerald-50/90 max-w-2xl leading-relaxed">
            Used electric bicycles are a lower-cost way into e-bike riding, as long as you know what to check. This guide
            covers what a pre-owned e-bike should cost, how to inspect the battery and motor, and how to enquire about
            current stock.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#1E4733] font-black text-sm px-5 py-3 rounded-xl hover:bg-emerald-50 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Enquire about used stock
            </Link>
            <Link
              href="/ebikes"
              className="inline-flex items-center gap-2 border border-white/40 text-white font-bold text-sm px-5 py-3 rounded-xl hover:bg-white/10 transition-colors"
            >
              Browse new e-bikes
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How enquiries work */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          Second hand electric bikes for sale: how to enquire
        </h2>
        <p className="mt-3 text-gray-600 max-w-3xl leading-relaxed">
          Pre-owned stock changes as bikes arrive, so there is no fixed list on this page. Tell us what you are after
          and we will come back to you about matching used electric bikes for sale.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { n: '1', t: 'Share your budget', d: 'A realistic price range helps us suggest bikes with enough battery life left.' },
            { n: '2', t: 'Tell us how you ride', d: 'Commuting, trails, cargo or folding for transport: the use decides the right frame and motor.' },
            { n: '3', t: 'Add your height', d: 'Frame size matters more than brand for comfort and control, especially on used e-bikes.' },
          ].map((s) => (
            <div key={s.n} className="rounded-2xl border border-gray-200 p-5 bg-gray-50/60">
              <div className="w-8 h-8 rounded-full bg-[#2E6B4D] text-white font-black text-sm flex items-center justify-center">{s.n}</div>
              <h3 className="mt-3 font-black text-gray-900">{s.t}</h3>
              <p className="mt-1 text-sm text-gray-600 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/contact" className="inline-flex items-center gap-1.5 text-sm font-black text-[#2E6B4D] hover:underline">
            Send your enquiry <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Used vs new */}
      <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <div className="flex items-center gap-2 text-[#2E6B4D]">
            <Wallet className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-wider">Used vs new</span>
          </div>
          <h2 className="mt-1 text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            How much should a used e bike cost?
          </h2>
          <p className="mt-3 text-gray-600 max-w-3xl leading-relaxed">
            CHOICE reports that new electric bikes range from under $800 to more than $12,000, with a typical
            well-equipped model around $2,000 to $3,500
            {NEW_RANGE ? `, and the new e-bikes in our own range run from about $${NEW_RANGE.min.toLocaleString()} to $${NEW_RANGE.max.toLocaleString()}` : ''}.
            A used bike should cost clearly less, because the battery is the most expensive wearing part.{' '}
            <a
              href="https://www.choice.com.au/transport/bikes/electric/buying-guides/electric-bicycles"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#2E6B4D] underline inline-flex items-center gap-0.5"
            >
              CHOICE e-bike buying guide <ExternalLink className="w-3 h-3" />
            </a>
          </p>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-gray-200 bg-white">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-xs uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-4 py-3">Factor</th>
                  <th className="px-4 py-3">Used e-bike</th>
                  <th className="px-4 py-3">New e-bike</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Upfront price', 'Usually lower', 'Higher'],
                  ['Battery health', 'Unknown until inspected; plan for a replacement', 'Full life ahead'],
                  ['Warranty', 'Depends on the seller; get it in writing', 'Manufacturer warranty'],
                  ['Compliance', 'Check the EN 15194 label and for modifications', 'Supplied compliant'],
                  ['Availability', 'Varies; enquire for current stock', 'Ready to order'],
                ].map((row) => (
                  <tr key={row[0]}>
                    <td className="px-4 py-3 font-bold text-gray-900">{row[0]}</td>
                    <td className="px-4 py-3 text-gray-600">{row[1]}</td>
                    <td className="px-4 py-3 text-gray-600">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Inspection checklist */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-center gap-2 text-[#2E6B4D]">
          <ClipboardCheck className="w-5 h-5" />
          <span className="text-xs font-black uppercase tracking-wider">Inspection checklist</span>
        </div>
        <h2 className="mt-1 text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          What to check on a second hand electric cycle
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {CHECKLIST.map((c) => (
            <li key={c.title} className="flex gap-3 rounded-2xl border border-gray-200 p-4">
              <Check className="w-5 h-5 text-[#2E6B4D] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-black text-gray-900 text-sm">{c.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mt-0.5">{c.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Battery safety + rules */}
      <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid gap-8 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-2 text-amber-700">
              <BatteryCharging className="w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-wider">Battery safety</span>
            </div>
            <h2 className="mt-1 text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Used e-bike batteries: safety first
            </h2>
            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
              Low-quality, damaged or unbranded lithium-ion batteries are the main fire risk with e-bikes. Charge on a
              hard, non-flammable surface, use the charger supplied for the bike, and stop using any battery that is
              swollen, leaking or overheating.{' '}
              <a
                href="https://www.productsafety.gov.au/consumers/be-safe-around-the-home/safely-use-batteries-and-technology/lithium-ion-batteries-guide"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#2E6B4D] underline inline-flex items-center gap-0.5"
              >
                Product Safety Australia battery guide <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-amber-700">
              <ShieldAlert className="w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-wider">Riding rules</span>
            </div>
            <h2 className="mt-1 text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              E-bike rules differ by state
            </h2>
            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
              The national baseline for compliant e-bikes is EN 15194: 250W continuous power with assistance cutting
              out at 25 km/h. State rules differ and are changing in 2026, and converted e-bikes can be restricted, for
              example on Victorian trains. Check your state authority before you ride.{' '}
              <a
                href="https://bicyclenetwork.com.au/newsroom/2026/01/29/new-e-bike-rules-falling-into-place/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#2E6B4D] underline inline-flex items-center gap-0.5"
              >
                Bicycle Network: e-bike rules <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 text-[#2E6B4D]">
            <HelpCircle className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-wider">Frequently asked questions</span>
          </div>
          <h2 className="mt-1 text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Used electric bikes: your questions answered
          </h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((f, i) => {
            const open = openFaq === i;
            return (
              <div key={f.question} className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(open ? null : i)}
                  aria-expanded={open}
                  className="w-full flex items-center justify-between gap-3 text-left px-5 py-4 cursor-pointer"
                >
                  <h3 className="font-black text-gray-900 text-sm sm:text-base">{f.question}</h3>
                  <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
                </button>
                {open && <p className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">{f.answer}</p>}
              </div>
            );
          })}
        </div>
      </section>

      {/* Related links */}
      <section className="bg-[#1E4733] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">Prefer a new e-bike with a full warranty?</h2>
            <p className="mt-1 text-sm text-emerald-100/90">Compare new e-bikes, parts and accessories, or ask about used stock.</p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm font-bold">
            <Link href="/ebikes" className="bg-white text-[#1E4733] px-4 py-2.5 rounded-xl hover:bg-emerald-50">New e-bikes</Link>
            <Link href="/e-bike-parts" className="border border-white/40 px-4 py-2.5 rounded-xl hover:bg-white/10">Parts &amp; tyres</Link>
            <Link href="/e-bike-accessories" className="border border-white/40 px-4 py-2.5 rounded-xl hover:bg-white/10">Accessories</Link>
            <Link href="/contact" className="border border-white/40 px-4 py-2.5 rounded-xl hover:bg-white/10">Contact us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
