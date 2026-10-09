'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { PRODUCTS } from '@/lib/data';
import { Product } from '@/lib/types';
import { X, Sparkles, Check, ArrowRight, RotateCcw, ShoppingBag, Eye } from 'lucide-react';

interface QuizAnswers {
  terrain: string;
  posture: string;
  distance: string;
  budget: string;
}

export default function EbikeFinderQuiz() {
  const { isFinderOpen, setIsFinderOpen, addToCart, setQuickViewProduct } = useApp();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>({
    terrain: '',
    posture: '',
    distance: '',
    budget: '',
  });

  if (!isFinderOpen) return null;

  const handleSelectOption = (field: keyof QuizAnswers, value: string) => {
    const updated = { ...answers, [field]: value };
    setAnswers(updated);
    if (step < 4) {
      setStep(step + 1);
    } else {
      setStep(5); // Show results
    }
  };

  const resetQuiz = () => {
    setStep(1);
    setAnswers({ terrain: '', posture: '', distance: '', budget: '' });
  };

  // Matching algorithm
  const getMatches = (): Product[] => {
    return PRODUCTS.filter((p) => {
      // If user selected folding
      if (answers.terrain === 'folding' && p.category === 'folding') return true;
      // If user selected cargo
      if (answers.terrain === 'cargo' && p.category === 'cargo') return true;
      // If user selected mountain
      if (answers.terrain === 'mountain' && p.category === 'emtb') return true;
      // If user selected sand/beach
      if (answers.terrain === 'beach' && p.category === 'fat-tyre') return true;
      // Default to commuter or fat tyre
      if (answers.terrain === 'city') return p.category === 'commuter' || p.category === 'folding';
      return true;
    }).slice(0, 3);
  };

  const matches = getMatches().length > 0 ? getMatches() : PRODUCTS.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100 my-8">
        
        {/* Close Button */}
        <button
          onClick={() => setIsFinderOpen(false)}
          className="absolute right-5 top-5 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
          aria-label="Close quiz"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress indicator */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#2E6B4D] flex items-center justify-center font-black text-xs">
            {step < 5 ? `0${step}` : 'DONE'}
          </div>
          <div className="flex-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              Interactive E-Bike Matchmaker
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mt-1">
              <div 
                className="h-full bg-[#2E6B4D] transition-all duration-300"
                style={{ width: `${(Math.min(step, 4) / 4) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* STEP 1: TERRAIN / PURPOSE */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-gray-900">
              Where will you be riding most often?
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              Select your primary purpose so we can match motor torque, tyre widths, and frame geometry.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { id: 'city', title: 'City Streets & Bike Paths', desc: 'Paved roads, smooth commuting, light curb hops' },
                { id: 'beach', title: 'Sand, Bush Tracks & Gravel', desc: 'Fat 4" tyres for rugged Australian off-road' },
                { id: 'folding', title: 'Caravan, Trains & Apartments', desc: 'Ultra-compact folding design for tight spaces' },
                { id: 'cargo', title: 'Kids School Run & Groceries', desc: 'Longtail payload rating up to 210kg with child seats' },
                { id: 'mountain', title: 'Mountain Trails & Steep Hills', desc: 'High torque mid-drive with dual air suspension' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption('terrain', opt.id)}
                  className="p-4 rounded-2xl border border-gray-200 hover:border-[#2E6B4D] hover:bg-emerald-50/50 text-left transition-all group flex flex-col justify-between"
                >
                  <span className="font-bold text-gray-900 text-sm group-hover:text-[#2E6B4D]">{opt.title}</span>
                  <span className="text-xs text-gray-500 mt-1">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: RIDING POSTURE */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-gray-900">
              What riding posture do you prefer?
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              Frame ergonomics dictate how relaxed or sporty your daily ride will feel.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { id: 'step-through', title: 'Upright Step-Through (Easy On/Off)', desc: 'Low clearance top tube, upright Dutch-style posture' },
                { id: 'sporty', title: 'Sporty Crossbar / Forward Lean', desc: 'Traditional diamond frame for speed & efficiency' },
                { id: 'cushion', title: 'Full Dual-Suspension Comfort', desc: 'Front fork and rear shock to cushion back and hips' },
                { id: 'adjustable', title: 'Adjustable Stem & One-Size', desc: 'Easily shared between multiple family riders' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption('posture', opt.id)}
                  className="p-4 rounded-2xl border border-gray-200 hover:border-[#2E6B4D] hover:bg-emerald-50/50 text-left transition-all group flex flex-col justify-between"
                >
                  <span className="font-bold text-gray-900 text-sm group-hover:text-[#2E6B4D]">{opt.title}</span>
                  <span className="text-xs text-gray-500 mt-1">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: DISTANCE / BATTERY RANGE */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-gray-900">
              What is your typical round-trip distance?
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              This calculates the optimum battery capacity (Wh) so you never run out of assist.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { id: 'short', title: 'Under 20 km Round Trip', desc: 'Compact 360Wh battery, lighter overall bike weight' },
                { id: 'medium', title: '20 km to 50 km Commute', desc: 'Standard 540Wh Samsung pack with weekly top-up' },
                { id: 'long', title: '50 km to 90 km+ Touring', desc: 'Heavy-duty 720Wh-960Wh long range dual battery' },
                { id: 'unlimited', title: 'Maximum Range Possible', desc: 'Dual battery setup for delivery couriers or touring' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption('distance', opt.id)}
                  className="p-4 rounded-2xl border border-gray-200 hover:border-[#2E6B4D] hover:bg-emerald-50/50 text-left transition-all group flex flex-col justify-between"
                >
                  <span className="font-bold text-gray-900 text-sm group-hover:text-[#2E6B4D]">{opt.title}</span>
                  <span className="text-xs text-gray-500 mt-1">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: BUDGET */}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-gray-900">
              What is your approximate budget?
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              All bikes include a 2-Year Australian Warranty & 10% Crypto discount options.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { id: 'budget', title: 'Under $1,800 AUD', desc: 'Great value commuter & folding models' },
                { id: 'mid', title: '$1,800 – $3,000 AUD', desc: 'Best-selling hydraulic disc brakes & high range' },
                { id: 'premium', title: '$3,000 – $5,000+ AUD', desc: 'Mid-drive cargo, carbon eMTB & heavy-duty haulers' },
                { id: 'flexible', title: 'Flexible Budget (Save 10% on Bitcoin / USDT)', desc: 'Show top value recommendations across all tiers' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption('budget', opt.id)}
                  className="p-4 rounded-2xl border border-gray-200 hover:border-[#2E6B4D] hover:bg-emerald-50/50 text-left transition-all group flex flex-col justify-between"
                >
                  <span className="font-bold text-gray-900 text-sm group-hover:text-[#2E6B4D]">{opt.title}</span>
                  <span className="text-xs text-gray-500 mt-1">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5: RESULTS */}
        {step === 5 && (
          <div className="space-y-5 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                  <Sparkles className="w-3.5 h-3.5" />
                  Your Top E-Bike Matches
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 mt-1">
                  Tailored For Your Riding Profile
                </h3>
              </div>
              <button
                onClick={resetQuiz}
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Retake
              </button>
            </div>

            <div className="space-y-3">
              {matches.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setQuickViewProduct(p);
                    setIsFinderOpen(false);
                  }}
                  className="cursor-pointer p-4 rounded-2xl border border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50 hover:border-emerald-400 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-20 h-20 rounded-xl relative overflow-hidden bg-white shrink-0 border border-gray-200">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        referrerPolicy="no-referrer"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#2E6B4D]">{p.badge}</span>
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base leading-tight">{p.name}</h4>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{p.subtitle}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs">
                        <span className="font-extrabold text-gray-900">${p.price.toLocaleString()} AUD</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-emerald-700 font-medium">{p.rangeKm}km Range</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(p);
                        setIsFinderOpen(false);
                      }}
                      className="cursor-pointer p-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-white text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Details</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(p, 1);
                        setIsFinderOpen(false);
                      }}
                      className="cursor-pointer bg-[#2E6B4D] hover:bg-[#1E4733] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors active:scale-95"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setIsFinderOpen(false)}
                className="text-xs font-bold text-gray-500 hover:text-gray-800"
              >
                Close and explore all categories
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
