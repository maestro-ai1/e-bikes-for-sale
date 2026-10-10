'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { NAV } from '@/lib/site-nav';

/**
 * Crawlable main menu. All dropdown panels are in the HTML (shown with CSS hover/focus), every item is a link.
 * `mobile` renders the same tree as an accordion of <details> for the drawer.
 */
export default function SiteNav({
  mobile = false,
  onNavigate,
  onQuiz,
}: {
  mobile?: boolean;
  onNavigate?: () => void;
  onQuiz?: () => void;
}) {
  const pathname = usePathname() || '/';
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/'));

  if (mobile) {
    return (
      <nav aria-label="Main">
        <ul className="space-y-1 text-sm font-semibold text-gray-800">
          {NAV.map((item) => (
            <li key={item.label}>
              {item.groups ? (
                <details className="group rounded-lg">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-100 marker:hidden">
                    <span>{item.label}</span>
                    <ChevronDown className="h-4 w-4 text-gray-500 transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <div className="pb-2 pl-3">
                    <Link href={item.href} onClick={onNavigate} className="block rounded-lg px-3 py-2 font-bold text-[#2E6B4D] hover:bg-emerald-50">
                      All {item.label.toLowerCase()}
                    </Link>
                    {item.groups.map((g) => (
                      <div key={g.heading} className="mt-1">
                        <p className="px-3 pt-2 text-[11px] font-black uppercase tracking-wider text-gray-500">{g.heading}</p>
                        <ul>
                          {g.links.map((l) => (
                            <li key={l.href}>
                              <Link href={l.href} onClick={onNavigate} className="block rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-100">
                                {l.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </details>
              ) : (
                <Link href={item.href} onClick={onNavigate} className="block min-h-11 rounded-lg px-3 py-2.5 hover:bg-gray-100">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
          {onQuiz && (
            <li>
              <button onClick={onQuiz} className="mt-2 w-full rounded-lg bg-emerald-50 px-3 py-2.5 text-left font-bold text-[#1E4733]">
                ⚡ E-Bike Finder Quiz
              </button>
            </li>
          )}
        </ul>
      </nav>
    );
  }

  return (
    <nav aria-label="Main" className="relative border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
        <ul className="flex flex-wrap items-center gap-1 py-2 text-sm font-semibold text-gray-700 lg:gap-2">
          {NAV.map((item) => {
            const active = isActive(item.href) && item.href !== '/ebikes' ? true : item.href === '/ebikes' && pathname.startsWith('/ebikes');
            const cls = `inline-flex min-h-10 items-center gap-1 whitespace-nowrap rounded-lg px-3 py-1.5 transition-colors ${
              active ? 'bg-[#2E6B4D] text-white' : 'hover:bg-gray-100 hover:text-[#2E6B4D]'
            }`;
            return (
              <li key={item.label} className="group relative">
                <Link href={item.href} className={cls} aria-current={active && item.href === pathname ? 'page' : undefined}>
                  {item.label}
                  {item.groups && <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />}
                </Link>
                {item.groups && (
                  <div className="invisible absolute left-0 top-full z-50 w-max max-w-[min(92vw,820px)] pt-1 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <div className="grid gap-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl" style={{ gridTemplateColumns: `repeat(${item.groups.length}, minmax(180px, 1fr))` }}>
                      {item.groups.map((g) => (
                        <div key={g.heading}>
                          {g.href ? (
                            <Link href={g.href} className="text-xs font-black uppercase tracking-wider text-[#1E4733] hover:underline">{g.heading}</Link>
                          ) : (
                            <p className="text-xs font-black uppercase tracking-wider text-[#1E4733]">{g.heading}</p>
                          )}
                          <ul className="mt-2 space-y-1">
                            {g.links.map((l) => (
                              <li key={l.href}>
                                <Link href={l.href} className="block rounded-md px-2 py-1 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-[#2E6B4D]">
                                  {l.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        {onQuiz && (
          <button
            onClick={onQuiz}
            className="hidden items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-[#2E6B4D] hover:bg-emerald-100 md:flex"
          >
            <span>⚡ E-Bike Finder Quiz</span>
          </button>
        )}
      </div>
    </nav>
  );
}
