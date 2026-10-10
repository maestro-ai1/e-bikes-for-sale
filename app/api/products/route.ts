import { NextRequest } from 'next/server';
import { PRODUCTS } from '@/lib/data';
import { productRecord } from '@/lib/agent-ready';

/** Read-only product catalog for shoppers, search engines and AI assistants. No personal data, no writes. */
export function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams;
  const category = (q.get('category') || '').toLowerCase();
  const brand = (q.get('brand') || '').toLowerCase();
  const text = (q.get('q') || '').toLowerCase().trim();
  const maxPrice = Number(q.get('maxPrice')) || 0;
  const limit = Math.min(100, Math.max(1, Number(q.get('limit')) || 24));
  const page = Math.max(1, Number(q.get('page')) || 1);

  const list = PRODUCTS.filter((p) => {
    if (category && p.category.toLowerCase() !== category) return false;
    if (brand && p.brand.toLowerCase() !== brand) return false;
    if (maxPrice && p.price > maxPrice) return false;
    if (text && !(p.name.toLowerCase().includes(text) || p.brand.toLowerCase().includes(text) || (p.tags || []).some((t) => t.toLowerCase().includes(text)))) return false;
    return true;
  });
  const items = list.slice((page - 1) * limit, page * limit).map(productRecord);
  return Response.json(
    { total: list.length, page, limit, currency: 'AUD', items },
    { headers: { 'Cache-Control': 'public, max-age=300', 'Access-Control-Allow-Origin': '*' } },
  );
}
