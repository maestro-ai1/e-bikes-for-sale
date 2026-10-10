'use client';

import React, { useState } from 'react';
import Image, { type ImageProps } from 'next/image';
import { COMING_SOON_DATA_URI } from '@/components/ProductImage';

/**
 * Drop-in replacement for next/image: identical props and markup, plus a fallback so a missing or failing file
 * shows the inline "IMAGE COMING SOON" placeholder instead of a broken-image icon.
 */
export default function SafeImage({ onError, src, alt, ...rest }: ImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) {
    const { width, height, className, style, title } = rest;
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={COMING_SOON_DATA_URI}
        alt={alt}
        title={title}
        width={typeof width === 'number' ? width : 600}
        height={typeof height === 'number' ? height : 600}
        className={className}
        style={style}
      />
    );
  }
  return (
    <Image
      {...rest}
      src={src}
      alt={alt}
      onError={(e) => {
        setFailed(true);
        onError?.(e);
      }}
    />
  );
}
