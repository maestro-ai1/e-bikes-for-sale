/** Collection pagination: 9 products per page, URL state in the query string (?page=2), never in a hash. */
export const PAGE_SIZE = 9;

/** Reads ?page=N. Anything that is not a positive whole number is page 1. */
export function parsePage(v: string | string[] | undefined): number {
  const raw = Array.isArray(v) ? v[0] : v;
  const n = Number.parseInt(raw ?? '1', 10);
  return Number.isFinite(n) && n >= 1 ? n : 1;
}

export interface Paged<T> {
  items: T[];
  page: number;
  totalPages: number;
  total: number;
  from: number;
  to: number;
}

export function paginate<T>(all: T[], page: number, size = PAGE_SIZE): Paged<T> {
  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / size));
  const p = Math.min(Math.max(1, page), totalPages);
  const start = (p - 1) * size;
  return { items: all.slice(start, start + size), page: p, totalPages, total, from: total ? start + 1 : 0, to: Math.min(total, start + size) };
}

/** Page 1 is the clean URL (self-canonical); deeper pages carry ?page=N. */
export const pageHref = (path: string, n: number) => (n <= 1 ? path : `${path}?page=${n}`);

/** Page numbers to show: always first and last, the current page and its neighbours, with gaps as null. */
export function pageWindow(page: number, totalPages: number): (number | null)[] {
  const keep = new Set([1, totalPages, page - 1, page, page + 1]);
  if (page <= 3) { keep.add(2); keep.add(3); }
  if (page >= totalPages - 2) { keep.add(totalPages - 1); keep.add(totalPages - 2); }
  const nums = [...keep].filter((n) => n >= 1 && n <= totalPages).sort((a, b) => a - b);
  const out: (number | null)[] = [];
  nums.forEach((n, i) => {
    if (i > 0 && n - nums[i - 1] > 1) out.push(null);
    out.push(n);
  });
  return out;
}
