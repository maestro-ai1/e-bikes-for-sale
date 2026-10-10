'use client';

import React, { useState } from 'react';
import { BUSINESS_INFO, WHOLESALE_BENEFITS } from '@/lib/data';
import { 
  Building2, 
  Percent, 
  PackageCheck, 
  Wrench, 
  FileText, 
  CheckCircle2, 
  Truck, 
  HelpCircle, 
  ChevronDown 
} from 'lucide-react';

export default function WholesalePage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [formData, setFormData] = useState({
    businessName: '',
    abn: '',
    contactName: '',
    email: '',
    phone: '',
    suburbPostcode: '',
    weeklyVolume: '3-10 units',
    productsRequired: 'Commuter & Cargo Fleets',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSendError('');
    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ website: honeypot, formName: 'wholesale', contactName: formData.contactName, email: formData.email, phone: formData.phone, message: formData.message, meta: { Business: formData.businessName, ABN: formData.abn, 'Suburb / postcode': formData.suburbPostcode, 'Weekly volume': formData.weeklyVolume, 'Products required': formData.productsRequired } }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) setFormSubmitted(true);
      else setSendError(data.error === 'invalid-email' ? 'Please check your email address.' : 'We could not send your message just now. Please try again, or call or WhatsApp us on ' + BUSINESS_INFO.phone + '.');
    } catch {
      setSendError('Network error. Please try again, or call or WhatsApp us on ' + BUSINESS_INFO.phone + '.');
    }
    setSending(false);
  };

  return (
    <div className="bg-white min-h-screen py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* HERO HEADER */}
        <div className="bg-gradient-to-r from-gray-900 via-[#1E4733] to-[#2E6B4D] text-white rounded-3xl p-8 sm:p-14 shadow-2xl mb-12">
          <div className="max-w-3xl space-y-4">
            <span className="inline-block bg-amber-400 text-black font-black text-xs uppercase px-3 py-1 rounded-full tracking-wider">
              B2B Commercial Solutions Australia
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Wholesale e bikes Supply for Australian Businesses
            </h1>
            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
              Empower your delivery couriers, hotel guest rentals, corporate green fleet, and retail bike shops. Direct factory tiered pricing, rapid spare parts backup, and full Australian compliance documentation.
            </p>
          </div>
        </div>

        {/* WHO WE SUPPLY PILLARS */}
        <div className="mb-14">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">Who We Supply</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Customised e-mobility fleets for logistics, hospitality, government and private sectors.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
            {[
              'Gig Economy Delivery Riders',
              'Logistics & Courier Fleets',
              'Hotels & Holiday Resorts',
              'Corporate Commuter Fleets',
              'Grey Nomad Caravan Parks',
              'Suburban Family Hire Shops'
            ].map((sector, i) => (
              <div key={i} className="p-4 bg-gray-50 border border-gray-200 rounded-2xl flex flex-col items-center justify-center">
                <Building2 className="w-6 h-6 text-[#2E6B4D] mb-2" />
                <span className="text-xs font-bold text-gray-800 leading-tight">{sector}</span>
              </div>
            ))}
          </div>
        </div>

        {/* WHOLESALE BENEFITS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {WHOLESALE_BENEFITS.map((b, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs hover:border-[#2E6B4D] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2E6B4D] flex items-center justify-center mb-3">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1">{b.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>

        {/* APPLICATION FORM & POLICY CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: WHOLESALE APPLICATION FORM */}
          <div className="lg:col-span-7 bg-gray-50 border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xs">
            <h3 className="text-xl font-black text-gray-900 mb-2">
              Commercial Account Application Form
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Complete the form below to receive our confidential wholesale tier sheet and fleet price schedule.
            </p>

            {formSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#2E6B4D] mx-auto" />
                <h4 className="text-lg font-black text-emerald-900">Enquiry Received!</h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Thank you, <strong>{formData.contactName}</strong> from <strong>{formData.businessName}</strong>. Our commercial B2B team will review your ABN and reach out within 1 business day.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs font-bold text-[#2E6B4D] underline mt-2"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Business / Company Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Metro Delivery Logistics Pty Ltd"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full text-xs border border-gray-300 rounded-lg p-2.5 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Australian Business Number (ABN) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 85 145 434 286"
                      value={formData.abn}
                      onChange={(e) => setFormData({ ...formData, abn: e.target.value })}
                      className="w-full text-xs border border-gray-300 rounded-lg p-2.5 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Contact Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. James Wilson"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full text-xs border border-gray-300 rounded-lg p-2.5 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="fleet@company.com.au"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs border border-gray-300 rounded-lg p-2.5 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+61 400 000 000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-xs border border-gray-300 rounded-lg p-2.5 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Delivery Suburb / Postcode</label>
                    <input
                      type="text"
                      placeholder="e.g. Southbank VIC 3006"
                      value={formData.suburbPostcode}
                      onChange={(e) => setFormData({ ...formData, suburbPostcode: e.target.value })}
                      className="w-full text-xs border border-gray-300 rounded-lg p-2.5 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Estimated Order Volume</label>
                    <select
                      value={formData.weeklyVolume}
                      onChange={(e) => setFormData({ ...formData, weeklyVolume: e.target.value })}
                      className="w-full text-xs border border-gray-300 rounded-lg p-2.5 bg-white"
                    >
                      <option value="3-5 units">Pilot Fleet (3–5 units)</option>
                      <option value="6-15 units">Medium Commercial (6–15 units)</option>
                      <option value="16-50 units">Large Logistics Fleet (16–50 units)</option>
                      <option value="50+ units">Enterprise Ongoing Supply (50+ units)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Products Required</label>
                  <select
                    value={formData.productsRequired}
                    onChange={(e) => setFormData({ ...formData, productsRequired: e.target.value })}
                    className="w-full text-xs border border-gray-300 rounded-lg p-2.5 bg-white"
                  >
                    <option value="Commuter & Cargo Fleets">Cargo and commuter fleets</option>
                    <option value="Fat Tyre & All Terrain">Fat tyre e-bikes</option>
                    <option value="Folding E-Bikes">Folding e-bikes</option>
                    <option value="Scooters & Micro-Mobility">Electric scooters and youth models</option>
                    <option value="Helmets & Spare Batteries">Helmets (AS/NZS 2063) and spare batteries</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Additional Requirements / Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Specify custom rack requirements, delivery timetables, or financing inquiries..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full text-xs border border-gray-300 rounded-lg p-2.5 bg-white"
                  />
                </div>

                <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
                  <label>Website<input type="text" name="website" aria-label="Leave this field empty" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} /></label>
                </div>
                {sendError && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">{sendError}</p>}
                <button
                  type="submit"
                  disabled={sending}
                  className="cursor-pointer w-full bg-[#2E6B4D] hover:bg-[#1E4733] text-white py-3.5 rounded-xl font-black text-sm uppercase tracking-wider shadow-md transition-colors active:scale-95 disabled:opacity-60"
                >
                  {sending ? 'Sending…' : 'Request Wholesale Pricing'}
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: WHOLESALE POLICIES & PLACEHOLDERS */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white border border-gray-200 rounded-3xl p-6 space-y-4">
              <h4 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#2E6B4D]" />
                Commercial Delivery & Minimums
              </h4>
              <div className="text-xs text-gray-600 space-y-2">
                <p>
                  <strong>Minimum Wholesale Order:</strong> $350 AUD or bulk tier 3+ units with volume discounts.
                </p>
                <p>
                  <strong>Delivery Zones:</strong> Australia-wide metropolitan and regional dispatch with insured freight.
                </p>
                <p>
                  <strong>Tax Invoicing:</strong> Official GST tax invoices issued with our registered Australian business credentials.
                </p>
              </div>
            </div>

            {/* Wholesale FAQs */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 space-y-3">
              <h4 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#2E6B4D]" />
                Wholesale FAQ
              </h4>
              
              <div className="text-xs space-y-3 text-gray-600">
                <div>
                  <span className="font-bold text-gray-900 block">Do you offer consignment or credit terms?</span>
                  <p>30-day commercial credit accounts are available to verified Australian businesses subject to trade credit checks.</p>
                </div>
                <div>
                  <span className="font-bold text-gray-900 block">Can e-bikes be governed or speed restricted for hotel rentals?</span>
                  <p>Yes, our technicians can configure digital speed governors and GPS trackers prior to fleet dispatch.</p>
                </div>
                <div>
                  <span className="font-bold text-gray-900 block">Are spare battery packs readily available?</span>
                  <p>We stock over 500 Samsung and LG cell replacement packs in Sydney and Brisbane warehouses for immediate dispatch.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
