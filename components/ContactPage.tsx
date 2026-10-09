'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { BUSINESS_INFO } from '@/lib/data';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight,
  Truck 
} from 'lucide-react';

export default function ContactPage() {
  const { setCurrentView } = useApp();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    orderNumber: '',
    topic: 'General Inquiry',
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
        body: JSON.stringify({ website: honeypot, formName: 'contact', name: formData.name, email: formData.email, phone: formData.phone, message: formData.message, meta: { Topic: formData.topic, 'Order number': formData.orderNumber } }),
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
        
        {/* HERO TITLE */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2E6B4D]">
            Australian Customer Support
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight mt-1">
            Contact {BUSINESS_INFO.name}
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Have questions regarding frame sizing, battery technology, road legality, or order dispatch? Our Brisbane and Sydney support teams are ready to help.
          </p>
        </div>

        {/* CONTACT CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          
          {/* Direct Call */}
          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className="cursor-pointer p-6 bg-gray-50 border border-gray-200 rounded-2xl hover:border-[#2E6B4D] hover:shadow-md transition-all block group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#2E6B4D] flex items-center justify-center mb-3">
              <Phone className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold uppercase text-gray-400 block">Direct Phone</span>
            <span className="font-extrabold text-gray-900 text-sm group-hover:text-[#2E6B4D] block mt-1">
              {BUSINESS_INFO.phone}
            </span>
            <span className="text-[11px] text-gray-500 mt-1 block">Mon–Fri 8am–6pm AEST</span>
          </a>

          {/* WhatsApp Support */}
          <a
            href={`https://wa.me/${BUSINESS_INFO.whatsapp.replace('+', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer p-6 bg-gray-50 border border-gray-200 rounded-2xl hover:border-emerald-500 hover:shadow-md transition-all block group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold uppercase text-gray-400 block">WhatsApp Chat</span>
            <span className="font-extrabold text-emerald-800 text-sm block mt-1">
              {BUSINESS_INFO.whatsapp}
            </span>
            <span className="text-[11px] text-gray-500 mt-1 block">Rapid mobile messaging</span>
          </a>

          {/* Email */}
          <a
            href={`mailto:${BUSINESS_INFO.email}`}
            className="cursor-pointer p-6 bg-gray-50 border border-gray-200 rounded-2xl hover:border-[#2E6B4D] hover:shadow-md transition-all block group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#2E6B4D] flex items-center justify-center mb-3">
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold uppercase text-gray-400 block">Email Sales & Support</span>
            <span className="font-extrabold text-gray-900 text-sm truncate block mt-1">
              {BUSINESS_INFO.email}
            </span>
            <span className="text-[11px] text-gray-500 mt-1 block">Responses within 4 hours</span>
          </a>

          {/* Operating Hours & Address */}
          <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl block">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#2E6B4D] flex items-center justify-center mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold uppercase text-gray-400 block">Operating Hours</span>
            <span className="font-extrabold text-gray-900 text-xs block mt-1">
              {BUSINESS_INFO.operatingHours}
            </span>
            <span className="text-[10px] text-gray-500 mt-1 block">{BUSINESS_INFO.address}</span>
          </div>

        </div>

        {/* CONTACT FORM & ORDER SUPPORT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <div className="lg:col-span-7 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xs">
            <h3 className="text-xl font-black text-gray-900 mb-1">Send Us a Message</h3>
            <p className="text-xs text-gray-500 mb-6">
              Our technical advisors will review your query and provide detailed guidance.
            </p>

            {formSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#2E6B4D] mx-auto" />
                <h4 className="font-bold text-gray-900 text-base">Message Sent!</h4>
                <p className="text-xs text-gray-600">
                  Thank you, <strong>{formData.name}</strong>. A support ticket has been created and our team will get back to you shortly.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs font-bold text-[#2E6B4D] underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mitchell Brown"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-xs border border-gray-300 rounded-lg p-2.5 focus:ring-1 focus:ring-[#2E6B4D]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="mitchell@example.com.au"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs border border-gray-300 rounded-lg p-2.5 focus:ring-1 focus:ring-[#2E6B4D]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+61 400 000 000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-xs border border-gray-300 rounded-lg p-2.5"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Order # (If applicable)</label>
                    <input
                      type="text"
                      placeholder="e.g. EBS-8492"
                      value={formData.orderNumber}
                      onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                      className="w-full text-xs border border-gray-300 rounded-lg p-2.5"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Inquiry Topic</label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full text-xs border border-gray-300 rounded-lg p-2.5 bg-white"
                  >
                    <option value="General Inquiry">General Product Inquiry</option>
                    <option value="Sizing Help">Frame Sizing & Fit Recommendation</option>
                    <option value="Order Tracking">Delivery Tracking & Dispatch Status</option>
                    <option value="Wholesale Inquiry">Commercial Fleet / Wholesale</option>
                    <option value="Warranty">Warranty & Technical Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can our Australian e-bike specialists help you today?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full text-xs border border-gray-300 rounded-lg p-2.5"
                  />
                </div>

                <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
                  <label>Website<input type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} /></label>
                </div>
                {sendError && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">{sendError}</p>}
                <button
                  type="submit"
                  disabled={sending}
                  className="cursor-pointer w-full bg-[#2E6B4D] hover:bg-[#1E4733] text-white py-3.5 rounded-xl font-black text-sm uppercase tracking-wider transition-colors shadow-md active:scale-95 disabled:opacity-60"
                >
                  {sending ? 'Sending…' : 'Send Inquiry'}
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: ORDER SUPPORT & FAQ SHORTCUT */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 space-y-3">
              <h4 className="font-extrabold text-base text-emerald-950 flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#2E6B4D]" />
                Dispatch & Delivery Inquiries
              </h4>
              <p className="text-xs text-emerald-900 leading-relaxed">
                Need real-time tracking on your e-bike delivery? Once dispatched from our Brisbane or Sydney warehouse, you will receive an SMS and email tracking link with live tracking.
              </p>
              <div className="pt-2">
                <span className="text-[11px] font-bold text-emerald-800 block">
                  Delivery Timeframe: {BUSINESS_INFO.deliveryTimeframe}
                </span>
                <span className="text-[10px] text-emerald-700 block">
                  Australia-wide insured courier delivery with online tracking
                </span>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 space-y-3 text-center sm:text-left">
              <h4 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#2E6B4D]" />
                Have Quick Questions?
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Check our Frequently Asked Questions section covering Australian legal power limits, battery maintenance, and returns.
              </p>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    setCurrentView('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="cursor-pointer bg-[#2E6B4D] hover:bg-[#1E4733] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors active:scale-95"
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
