import React from 'react';
import type { Product } from '@/lib/types';
import ProductCard from '@/components/ProductCard';

/** Catalog grid: the shared compact product card, two columns on phones. */
export default function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
      {products.map((p) => (
        <li key={p.id}>
          <ProductCard product={p} />
        </li>
      ))}
    </ul>
  );
}
