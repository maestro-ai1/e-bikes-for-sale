'use client';

import React from 'react';
import { AUSTRALIAN_STATE_RULES } from '@/lib/data';
import { ShieldCheck, AlertTriangle, BookOpen, CheckCircle, Scale } from 'lucide-react';

export default function LegalComplianceGuide() {
  return (
    <div className="bg-white min-h-screen py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* HERO BANNER */}
        <div className="bg-gradient-to-r from-gray-900 via-emerald-950 to-[#1E4733] text-white rounded-3xl p-8 sm:p-12 mb-10 shadow-xl">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold">
              <Scale className="w-3.5 h-3.5" />
              <span>Australian Road Transport Guidelines</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Australian E-Bike Laws & EN 15194 Pedelec Compliance Guide
            </h1>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
              Understand the legal framework for operating power-assisted pedal bicycles on public roads and bicycle paths across every Australian State and Territory.
            </p>
          </div>
        </div>

        {/* CORE NATIONAL PRINCIPLES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#2E6B4D] flex items-center justify-center font-black mb-3">
              250W
            </div>
            <h3 className="font-extrabold text-base text-gray-900 mb-1">Max 250W Continuous Output</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Electric motors must have a maximum continuous rated output of 250 Watts under the European harmonised standard EN 15194 adopted into the Australian Design Rules.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#2E6B4D] flex items-center justify-center font-black mb-3">
              25
            </div>
            <h3 className="font-extrabold text-base text-gray-900 mb-1">25 km/h Motor Cut-Off</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Electric assistance must progressively decrease and cease completely once the bicycle reaches 25 km/h. Riders may pedal faster using pure pedal power.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#2E6B4D] flex items-center justify-center font-black mb-3">
              PAS
            </div>
            <h3 className="font-extrabold text-base text-gray-900 mb-1">Pedal-Assist Required</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              The motor may only provide power while the rider is pedalling. Full-throttle acceleration without pedalling on public roads is illegal above 6 km/h (walk mode).
            </p>
          </div>
        </div>

        {/* STATE-BY-STATE LEGAL BREAKDOWN */}
        <div className="space-y-4 mb-14">
          <h2 className="text-2xl font-black text-gray-900">
            State-by-State Electric Bicycle Regulations (2026)
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Click on or view each state authority’s specific legislation regarding power limits, shared paths, and rider age requirements:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {AUSTRALIAN_STATE_RULES.map((rule) => (
              <div
                key={rule.state}
                className="bg-white border border-gray-200 hover:border-[#2E6B4D] rounded-2xl p-5 shadow-xs transition-colors space-y-2.5"
              >
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <span className="font-black text-gray-900 text-sm">{rule.name}</span>
                  <span className="bg-emerald-100 text-[#1E4733] font-extrabold text-xs px-2 py-0.5 rounded">
                    {rule.state}
                  </span>
                </div>

                <div className="text-xs space-y-1.5 text-gray-600">
                  <p><strong>Power Limit:</strong> {rule.maxContinuousPower}</p>
                  <p><strong>Speed Cutoff:</strong> {rule.maxAssistedSpeed}</p>
                  <p><strong>Throttle Rule:</strong> {rule.throttleRules}</p>
                  <p><strong>Helmet:</strong> {rule.helmetRequired}</p>
                  <p><strong>Statutory Source:</strong> <span className="font-mono text-[11px] text-gray-500">{rule.sourceAuthority}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* IMPORTANT COMPLIANCE NOTICE */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-xs text-amber-900 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-700" />
            <span>Important Legal Disclaimer for Australian Consumers</span>
          </div>
          <p className="leading-relaxed">
            All road-intended electric bicycles sold on <strong>ebikesforsale.com.au</strong> conform to the 250W EN 15194 pedelec standard. Off-road high-power profiles (over 250W or exceeding 25 km/h motor assist) are restricted strictly to private property and competition use with owner consent. Riders are advised to review local transport regulations.
          </p>
        </div>

      </div>
    </div>
  );
}
