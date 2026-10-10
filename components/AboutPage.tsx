import React from 'react';
import Link from 'next/link';
import { BUSINESS_INFO } from '@/lib/data';

/** About page: who we are and what we sell. Contact, policies and FAQs have their own pages. */
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <p className="text-xs font-black uppercase tracking-wider text-[#2E6B4D]">About us</p>
        <h1 className="mt-1 text-3xl font-black tracking-tight text-gray-900 sm:text-5xl">About {BUSINESS_INFO.name}</h1>
        <p className="mt-4 text-lg leading-relaxed text-gray-600">
          {BUSINESS_INFO.name} is an Australian online store for electric bikes, electric scooters, helmets, accessories and parts.
          We help riders compare models, understand the road rules and order with clear prices in Australian dollars.
        </p>

        <section className="mt-10" aria-labelledby="what-we-sell">
          <h2 id="what-we-sell" className="text-2xl font-black text-gray-900">What we sell</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-gray-700">
            <li><Link href="/ebikes" className="font-semibold text-[#2E6B4D] hover:underline">Electric bikes</Link>: commuter, mountain, folding, cruiser, fat tyre, cargo and road models.</li>
            <li><Link href="/scooters" className="font-semibold text-[#2E6B4D] hover:underline">Electric scooters</Link> for adults and kids, plus scooter accessories.</li>
            <li><Link href="/e-bike-helmets" className="font-semibold text-[#2E6B4D] hover:underline">Helmets</Link>, <Link href="/e-bike-accessories" className="font-semibold text-[#2E6B4D] hover:underline">accessories</Link> and <Link href="/e-bike-parts" className="font-semibold text-[#2E6B4D] hover:underline">parts</Link>.</li>
            <li>Brands including <Link href="/brands" className="font-semibold text-[#2E6B4D] hover:underline">Cube, Merida, Pedal, DiroDi and Segway-Ninebot</Link>.</li>
          </ul>
        </section>

        <section className="mt-10" aria-labelledby="how-we-work">
          <h2 id="how-we-work" className="text-2xl font-black text-gray-900">How we work</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-gray-700">
            <li>Every pedal-assist e-bike we list follows the Australian EN 15194 rules: 250W motor, assistance cuts out at 25 km/h.</li>
            <li>Each product page lists the specifications, price and photos so you can compare before you buy.</li>
            <li>Orders start from ${BUSINESS_INFO.minOrder}, with free delivery over ${BUSINESS_INFO.freeDeliveryThreshold} to metropolitan Australia.</li>
            <li>You can pay by PayID, bank transfer (Osko/EFT) or crypto.</li>
          </ul>
        </section>

        <section className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-6" aria-labelledby="business-details">
          <h2 id="business-details" className="text-xl font-black text-gray-900">Business details</h2>
          <dl className="mt-3 grid gap-2 text-sm text-gray-700 sm:grid-cols-[10rem_1fr]">
            <dt className="font-bold">Trading name</dt><dd>{BUSINESS_INFO.name}</dd>
            <dt className="font-bold">Legal name</dt><dd>{BUSINESS_INFO.legalName}</dd>
            <dt className="font-bold">ABN</dt><dd>{BUSINESS_INFO.abn}</dd>
            <dt className="font-bold">Address</dt><dd>{BUSINESS_INFO.address}</dd>
            <dt className="font-bold">Website</dt><dd>{BUSINESS_INFO.domain}</dd>
          </dl>
          <p className="mt-4 text-sm text-gray-600">
            Questions? Visit our <Link href="/contact" className="font-bold text-[#2E6B4D] hover:underline">contact page</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
