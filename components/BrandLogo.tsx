import React from 'react';
import SafeImage from '@/components/SafeImage';
import { brandLogoFor } from '@/lib/brand-logos';

/** Brand logo at a fixed height; picks the artwork that has contrast on the given background. */
export default function BrandLogo({
  brand,
  height = 32,
  onDark = false,
  className = '',
  priority = false,
}: {
  brand: string;
  height?: number;
  onDark?: boolean;
  className?: string;
  priority?: boolean;
}) {
  const logo = brandLogoFor(brand);
  if (!logo) return null;
  const src = onDark && logo.srcWhite ? logo.srcWhite : logo.src;
  return (
    <SafeImage
      src={src}
      alt={logo.alt}
      width={Math.round((logo.width / logo.height) * height)}
      height={height}
      priority={priority}
      className={`w-auto object-contain ${className}`}
      style={{ height }}
    />
  );
}
