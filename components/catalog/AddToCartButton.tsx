'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Zap } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { Product } from '@/lib/types';

/** "Buy now" adds the product and goes straight to checkout; "Add to cart" only adds it (the header cart shows the count). */
export default function AddToCartButton({ product, buyNow = false }: { product: Product; buyNow?: boolean }) {
  const { addToCart } = useApp();
  const router = useRouter();
  const cls = buyNow
    ? 'bg-[#2E6B4D] text-white hover:bg-[#1E4733] disabled:bg-gray-300'
    : 'border border-[#2E6B4D] bg-white text-[#1E4733] hover:bg-emerald-50 disabled:border-gray-300 disabled:text-gray-500';
  return (
    <button
      type="button"
      onClick={() => {
        addToCart(product, 1);
        if (buyNow) router.push('/checkout');
      }}
      disabled={!product.inStock}
      className={`inline-flex min-h-11 w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-xl px-3 text-sm font-black transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E6B4D] disabled:cursor-not-allowed ${cls}`}
      aria-label={`${buyNow ? 'Buy now' : 'Add to cart'}: ${product.name}`}
    >
      {buyNow ? <Zap className="h-4 w-4" aria-hidden="true" /> : <ShoppingBag className="h-4 w-4" aria-hidden="true" />}
      {!product.inStock ? 'Out of stock' : buyNow ? 'Buy now' : 'Add to cart'}
    </button>
  );
}
