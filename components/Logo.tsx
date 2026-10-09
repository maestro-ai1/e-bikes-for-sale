'use client';

import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  iconOnly?: boolean;
  className?: string;
}

export default function Logo({ variant = 'light', iconOnly = false, className = '' }: LogoProps) {
  const isDark = variant === 'dark';

  return (
    <div className={`flex items-center gap-2.5 shrink-0 ${className}`}>
      {/* Exact 40x40 (w-10 h-10) vector logo badge */}
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E4733] via-[#2E6B4D] to-[#166534] flex items-center justify-center shadow-sm relative overflow-hidden group-hover:shadow-md transition-all">
        {/* Subtle electric circuit glow effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(52,211,153,0.35),transparent_70%)] pointer-events-none" />
        
        {/* Custom E-Bike Vector Logo in clean white & bright electric emerald */}
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 relative z-10"
          aria-hidden="true"
        >
          {/* Rear Wheel */}
          <circle cx="11" cy="27" r="6" stroke="white" strokeWidth="2" strokeDasharray="1 1" />
          <circle cx="11" cy="27" r="2.5" fill="#34D399" />
          
          {/* Front Wheel */}
          <circle cx="29" cy="27" r="6" stroke="white" strokeWidth="2" strokeDasharray="1 1" />
          <circle cx="29" cy="27" r="2.5" fill="#34D399" />

          {/* Bike Frame & Geometry */}
          <path
            d="M11 27L18 20L15 14H18"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M29 27L24 14L21 14"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18 20L27 20"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M18 20L14 27"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Electric Lightning Bolt inside frame (E-Bike power symbol) */}
          <path
            d="M21 16L18.5 21H22.5L20 26"
            stroke="#FDE047"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#FACC15"
          />

          {/* Handlebar & Saddle */}
          <circle cx="15" cy="13.5" r="1.5" fill="white" />
          <path d="M23 13.5H26.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {!iconOnly && (
        <div className="flex flex-col">
          <div
            className={`text-xl sm:text-2xl font-black tracking-tight leading-none transition-colors ${
              isDark
                ? 'text-white group-hover:text-emerald-400'
                : 'text-gray-900 group-hover:text-[#2E6B4D]'
            }`}
          >
            e bikes{' '}
            <span className={isDark ? 'text-emerald-400' : 'text-[#2E6B4D]'}>
              for sale
            </span>
          </div>
          <span
            className={`text-[10px] font-bold tracking-wider uppercase mt-0.5 flex items-center gap-1.5 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            <span>Australia</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
          </span>
        </div>
      )}
    </div>
  );
}
