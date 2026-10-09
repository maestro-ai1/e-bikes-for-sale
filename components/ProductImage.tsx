'use client';

import React, { useState } from 'react';
import Image from 'next/image';

/** Inline SVG placeholder (no network request, never a broken image). */
const COMING_SOON_SVG =
  `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">` +
  `<rect width="600" height="600" fill="#f8fafc"/>` +
  `<rect x="40" y="40" width="520" height="520" rx="24" fill="none" stroke="#cbd5e1" stroke-width="3" stroke-dasharray="14 10"/>` +
  `<g fill="none" stroke="#94a3b8" stroke-width="10" stroke-linecap="round" stroke-linejoin="round">` +
  `<circle cx="205" cy="330" r="62"/><circle cx="395" cy="330" r="62"/>` +
  `<path d="M205 330 L265 230 H345 L395 330 M265 230 L300 330 H205 M345 230 L330 200 H370"/></g>` +
  `<text x="300" y="470" font-family="Arial,Helvetica,sans-serif" font-size="34" font-weight="700" fill="#64748b" text-anchor="middle">IMAGE COMING SOON</text>` +
  `</svg>`;

export const COMING_SOON_DATA_URI = `data:image/svg+xml;utf8,${encodeURIComponent(COMING_SOON_SVG)}`;

export interface ProductImageProps {
  /** Image URL or /public path. Empty or missing renders the "IMAGE COMING SOON" placeholder. */
  src?: string | null;
  /** Exact primary focus keyword (used for alt). */
  focusKeyword: string;
  /** Product or brand name (used with the focus keyword for title). */
  name: string;
  /** "eager" for primary hero images, "lazy" for catalog grids. */
  loading?: 'eager' | 'lazy';
  className?: string;
  /** Pass false when the parent already provides the square container. */
  withContainer?: boolean;
}

/**
 * Uniform 600x600 square product/brand image on a #f8fafc background with object-fit: contain.
 * Always renders alt = focus keyword, title = "name + focus keyword", width/height 600 (no CLS),
 * and falls back to an inline SVG if the file is missing or fails to load.
 */
export default function ProductImage({
  src,
  focusKeyword,
  name,
  loading = 'lazy',
  className = '',
  withContainer = true,
}: ProductImageProps) {
  const [failed, setFailed] = useState(false);
  const missing = !src || failed;
  const title = `${name} - ${focusKeyword}`;

  const img = missing ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={COMING_SOON_DATA_URI}
      alt={focusKeyword}
      title={title}
      width={600}
      height={600}
      loading={loading}
      className="h-full w-full object-contain"
    />
  ) : (
    <Image
      src={src as string}
      alt={focusKeyword}
      title={title}
      width={600}
      height={600}
      loading={loading}
      sizes="(max-width: 640px) 100vw, 600px"
      onError={() => setFailed(true)}
      className="h-full w-full object-contain"
    />
  );

  if (!withContainer) return img;
  return (
    <div className={`aspect-square w-full overflow-hidden bg-[#f8fafc] ${className}`}>{img}</div>
  );
}
