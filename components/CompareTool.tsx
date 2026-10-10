'use client';

import React from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { PRODUCTS } from '@/lib/data';
import { Product } from '@/lib/types';
import { 
  SlidersHorizontal, 
  X, 
  Plus, 
  ShoppingBag, 
  Check, 
  Battery, 
  Gauge, 
  Weight, 
  ShieldCheck, 
  Coins 
} from 'lucide-react';

export default function CompareTool() {
  const { 
    compareList, 
    removeFromCompare, 
    toggleCompare, 
    clearCompare, 
    addToCart, 
    setCurrentView,
    setQuickViewProduct
  } = useApp();

  // If user hasn't selected items, pre-populate with 3 popular models
  const displayItems = compareList.length > 0 ? compareList : PRODUCTS.slice(0, 3);

  return (
    <section className="py-14 sm:py-20 bg-gray-50 border-b border-gray-200" id="compare-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2E6B4D] mb-1">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Interactive Model Comparator</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Compare E-Bike Specifications
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-xl">
              Inspect motor torque, battery capacity (Wh), riding range, and frame weights side by side to make the best purchase decision.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {compareList.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs font-bold text-gray-500 hover:text-red-600 border border-gray-300 px-3 py-2 rounded-xl transition-colors"
              >
                Clear Selected ({compareList.length})
              </button>
            )}
            <button
              onClick={() => {
                setCurrentView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="cursor-pointer bg-[#2E6B4D] hover:bg-[#1E4733] text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors active:scale-95 shadow-xs"
            >
              Add More From Shop
            </button>
          </div>
        </div>

        {/* COMPARISON TABLE */}
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            
            {/* PRODUCT HEADER ROW */}
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="p-4 sm:p-6 w-1/4 text-xs font-bold uppercase tracking-wider text-gray-400">
                  Specification
                </th>
                {displayItems.map((item) => (
                  <th key={item.id} className="p-4 sm:p-6 w-1/4 align-top">
                    <div className="relative group">
                      {compareList.some(p => p.id === item.id) && (
                        <button
                          onClick={() => removeFromCompare(item.id)}
                          className="cursor-pointer absolute -top-2 -right-2 bg-red-100 hover:bg-red-200 text-red-700 p-1 rounded-full z-10 transition-colors"
                          title="Remove from comparison"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <div 
                        onClick={() => setQuickViewProduct(item)}
                        className="cursor-pointer relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-gray-100 mb-3 border border-gray-200"
                        title="Click to view details"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                width={600}
                height={600}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>

                      <span className="text-[10px] font-bold uppercase text-[#2E6B4D] block">{item.categoryLabel}</span>
                      <h4 
                        onClick={() => setQuickViewProduct(item)}
                        className="cursor-pointer font-extrabold text-gray-900 text-base leading-tight mt-0.5 hover:text-[#2E6B4D] transition-colors"
                      >
                        {item.name}
                      </h4>
                      <div className="text-lg font-black text-gray-900 mt-2">
                        ${item.price.toLocaleString()} AUD
                      </div>

                      <button
                        onClick={() => addToCart(item, 1)}
                        className="cursor-pointer mt-3 w-full bg-[#2E6B4D] hover:bg-[#1E4733] text-white py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs active:scale-95"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* SPECS ROWS */}
            <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
              
              {/* Motor & Type */}
              <tr className="hover:bg-gray-50/60">
                <td className="p-4 sm:p-5 font-bold text-gray-900 bg-gray-50/30">
                  Motor & Placement
                </td>
                {displayItems.map((item) => (
                  <td key={item.id} className="p-4 sm:p-5 text-gray-700">
                    <span className="font-bold text-gray-900 block">{item.motorType} Drive</span>
                    <span className="text-xs text-gray-500">{item.motor}</span>
                  </td>
                ))}
              </tr>

              {/* Torque */}
              <tr className="hover:bg-gray-50/60">
                <td className="p-4 sm:p-5 font-bold text-gray-900 bg-gray-50/30">
                  Peak Torque
                </td>
                {displayItems.map((item) => (
                  <td key={item.id} className="p-4 sm:p-5">
                    <span className="font-extrabold text-emerald-800 text-base">{item.torqueNm} Nm</span>
                    <span className="text-xs text-gray-500 block">Hill climbing response</span>
                  </td>
                ))}
              </tr>

              {/* Battery Spec */}
              <tr className="hover:bg-gray-50/60">
                <td className="p-4 sm:p-5 font-bold text-gray-900 bg-gray-50/30">
                  Battery Capacity
                </td>
                {displayItems.map((item) => (
                  <td key={item.id} className="p-4 sm:p-5 text-gray-700">
                    <span className="font-extrabold text-gray-900 block">{item.batteryWh} Wh</span>
                    <span className="text-xs text-gray-500">{item.batterySpec}</span>
                  </td>
                ))}
              </tr>

              {/* Range */}
              <tr className="hover:bg-gray-50/60">
                <td className="p-4 sm:p-5 font-bold text-gray-900 bg-gray-50/30">
                  Max Riding Range
                </td>
                {displayItems.map((item) => (
                  <td key={item.id} className="p-4 sm:p-5">
                    <span className="font-extrabold text-[#2E6B4D] text-base">{item.rangeKm} km</span>
                    <span className="text-xs text-gray-500 block">Tested under pedal assist</span>
                  </td>
                ))}
              </tr>

              {/* Speed & Compliance */}
              <tr className="hover:bg-gray-50/60">
                <td className="p-4 sm:p-5 font-bold text-gray-900 bg-gray-50/30">
                  Australian Road Legality
                </td>
                {displayItems.map((item) => (
                  <td key={item.id} className="p-4 sm:p-5">
                    <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs">
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      <span>{item.topSpeedKmH} km/h Cutoff</span>
                    </div>
                    <span className="text-[11px] text-gray-500 block mt-0.5">{item.auCompliance}</span>
                  </td>
                ))}
              </tr>

              {/* Frame & Weight */}
              <tr className="hover:bg-gray-50/60">
                <td className="p-4 sm:p-5 font-bold text-gray-900 bg-gray-50/30">
                  Frame Style & Weight
                </td>
                {displayItems.map((item) => (
                  <td key={item.id} className="p-4 sm:p-5 text-gray-700">
                    <span className="font-semibold block">{item.frameType}</span>
                    <span className="text-xs text-gray-500">{item.weightKg} kg (Payload: {item.payloadKg}kg)</span>
                  </td>
                ))}
              </tr>

              {/* Brakes */}
              <tr className="hover:bg-gray-50/60">
                <td className="p-4 sm:p-5 font-bold text-gray-900 bg-gray-50/30">
                  Braking System
                </td>
                {displayItems.map((item) => (
                  <td key={item.id} className="p-4 sm:p-5 text-gray-700 text-xs">
                    {item.brakes}
                  </td>
                ))}
              </tr>

              {/* Crypto 10% Discount */}
              <tr className="hover:bg-gray-50/60 bg-emerald-50/20">
                <td className="p-4 sm:p-5 font-bold text-emerald-900 bg-emerald-100/40">
                  10% Crypto Price
                </td>
                {displayItems.map((item) => {
                  const cryptoPrice = Math.round(item.price * 0.9);
                  return (
                    <td key={item.id} className="p-4 sm:p-5">
                      <span className="font-black text-emerald-800 text-base">${cryptoPrice.toLocaleString()} AUD</span>
                      <span className="text-[11px] text-emerald-600 block">Save ${Math.round(item.price * 0.1)} on BTC/USDT</span>
                    </td>
                  );
                })}
              </tr>

            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
