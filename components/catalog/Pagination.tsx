import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { pageHref, pageWindow } from '@/lib/pagination';

/**
 * Crawlable pagination: every control is a plain link (next/link renders <a href>), so search engines can walk
 * from page 1 to the last page without JavaScript. The current page is not a link and has aria-current.
 */
export default function Pagination({ path, page, totalPages }: { path: string; page: number; totalPages: number }) {
  if (totalPages <= 1) return null;
  const base = 'inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border px-3 text-sm font-bold';
  const idle = `${base} border-gray-300 text-gray-800 hover:border-[#2E6B4D] hover:text-[#2E6B4D]`;
  return (
    <nav aria-label="Pagination" className="mt-8">
      <ul className="flex flex-wrap items-center justify-center gap-2">
        <li>
          {page > 1 ? (
            <Link href={pageHref(path, page - 1)} rel="prev" className={idle}>
              <ChevronLeft className="mr-1 h-4 w-4" aria-hidden="true" /> Previous
            </Link>
          ) : (
            <span className={`${base} border-gray-200 text-gray-400`} aria-disabled="true">
              <ChevronLeft className="mr-1 h-4 w-4" aria-hidden="true" /> Previous
            </span>
          )}
        </li>
        {pageWindow(page, totalPages).map((n, i) =>
          n === null ? (
            <li key={`gap-${i}`} aria-hidden="true" className="px-1 text-gray-400">…</li>
          ) : n === page ? (
            <li key={n}>
              <span aria-current="page" className={`${base} border-[#2E6B4D] bg-[#2E6B4D] text-white`}>{n}</span>
            </li>
          ) : (
            <li key={n}>
              <Link href={pageHref(path, n)} aria-label={`Page ${n}`} className={idle}>{n}</Link>
            </li>
          ),
        )}
        <li>
          {page < totalPages ? (
            <Link href={pageHref(path, page + 1)} rel="next" className={idle}>
              Next <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
            </Link>
          ) : (
            <span className={`${base} border-gray-200 text-gray-400`} aria-disabled="true">
              Next <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
