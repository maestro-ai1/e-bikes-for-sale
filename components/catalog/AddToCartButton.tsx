'use client';

import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { Product } from '@/lib/types';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart, setIsCartOpen } = useApp();

  return (
    <button
      type="button"
      onClick={() => {
        addToCart(product, 1);
        setIsCartOpen(true);
      }}
      disabled={!product.inStock}
      className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-[#2E6B4D] px-4 text-sm font-black text-white transition-colors hover:bg-[#1E4733] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E6B4D] disabled:cursor-not-allowed disabled:bg-gray-300"
      aria-label={`Add to cart: ${product.name}`}
    >
      <ShoppingBag className="h-4 w-4" aria-hidden="true" />
      {product.inStock ? 'Add to cart' : 'Out of stock'}
    </button>
  );
}
