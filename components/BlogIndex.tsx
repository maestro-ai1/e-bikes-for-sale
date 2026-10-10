import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/data';
import { BLOG_URL, POSTS_PER_PAGE, pagePath, postsForPage, totalBlogPages } from '@/lib/blog-pagination';

/** Server-rendered, crawlable blog index: 9 posts per page, real links for every post and page number. */
export default function BlogIndex({ page }: { page: number }) {
  const posts = postsForPage(page);
  const pages = totalBlogPages();
  const url = `${BLOG_URL}${page > 1 ? `/page/${page}` : ''}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}#page`,
        url,
        name: page > 1 ? `E-Bike Buying Guides & Australian Regulations, page ${page}` : 'E-Bike Buying Guides & Australian Regulations',
        inLanguage: 'en-AU',
        isPartOf: { '@type': 'WebSite', name: 'e bikes for sale', url: 'https://ebikesforsale.com.au' },
        mainEntity: { '@id': `${url}#list` },
      },
      {
        '@type': 'ItemList',
        '@id': `${url}#list`,
        numberOfItems: BLOG_POSTS.length,
        itemListElement: posts.map((p, i) => ({ '@type': 'ListItem', position: (page - 1) * POSTS_PER_PAGE + i + 1, url: `${BLOG_URL}/${p.slug}`, name: p.title })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ebikesforsale.com.au/' },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: BLOG_URL },
          ...(page > 1 ? [{ '@type': 'ListItem', position: 3, name: `Page ${page}`, item: url }] : []),
        ],
      },
    ],
  };

  return (
    <section className="bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-gray-500">
          <ol className="flex flex-wrap items-center gap-1">
            <li><Link href="/" className="hover:text-[#2E6B4D] hover:underline">Home</Link></li>
            <li aria-hidden="true">/</li>
            {page > 1 ? (
              <>
                <li><Link href="/blog" className="hover:text-[#2E6B4D] hover:underline">Guides</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-semibold text-gray-800">Page {page}</li>
              </>
            ) : (
              <li aria-current="page" className="font-semibold text-gray-800">Guides</li>
            )}
          </ol>
        </nav>

        <div className="mb-10">
          <div className="mb-1 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2E6B4D]">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            <span>Australian E-Bike Knowledge Hub</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
            E-Bike Buying Guides &amp; Australian Regulations{page > 1 ? `: Page ${page}` : ''}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-600 sm:text-base">
            Honest consumer buying guides, EN15194 legal speed explanations, sizing advice and youth helmet safety.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <li key={post.id} className="flex">
              <article className="group flex w-full flex-col overflow-hidden rounded-2xl border border-gray-200/90 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#2E6B4D] hover:shadow-xl">
                <Link href={`/blog/${post.slug}`} className="relative block aspect-[4/3] w-full overflow-hidden bg-gray-100">
                  <Image
                    src={post.image}
                    alt={post.altText}
                width={600}
                height={600}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={i < 3}
                  />
                  <span className="absolute left-3 top-3 rounded-md bg-white/95 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-900 shadow-xs">{post.category}</span>
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 flex items-center gap-3 text-[11px] text-gray-600">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" aria-hidden="true" />{post.date}</span>
                    <span aria-hidden="true">•</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" aria-hidden="true" />{post.readTime}</span>
                  </div>
                  <h2 className="text-base font-bold leading-snug text-gray-900">
                    <Link href={`/blog/${post.slug}`} className="hover:text-[#2E6B4D]">{post.title}</Link>
                  </h2>
                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-gray-600">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-auto inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-emerald-50 px-3 text-xs font-bold text-[#2E6B4D] transition-colors hover:bg-[#2E6B4D] hover:text-white"
                  >
                    Read full guide <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {pages > 1 && (
          <nav aria-label="Blog pages" className="mt-12 flex flex-wrap items-center justify-center gap-2">
            {page > 1 && (
              <Link href={pagePath(page - 1)} rel="prev" className="inline-flex min-h-11 items-center gap-1 rounded-xl border border-gray-300 bg-white px-4 text-sm font-bold text-gray-800 hover:border-[#2E6B4D] hover:text-[#2E6B4D]">
                <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Previous
              </Link>
            )}
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <Link
                key={n}
                href={pagePath(n)}
                aria-label={`Page ${n}`}
                aria-current={n === page ? 'page' : undefined}
                className={`inline-flex h-11 min-w-11 items-center justify-center rounded-xl border px-3 text-sm font-black ${n === page ? 'border-[#2E6B4D] bg-[#2E6B4D] text-white' : 'border-gray-300 bg-white text-gray-800 hover:border-[#2E6B4D] hover:text-[#2E6B4D]'}`}
              >
                {n}
              </Link>
            ))}
            {page < pages && (
              <Link href={pagePath(page + 1)} rel="next" className="inline-flex min-h-11 items-center gap-1 rounded-xl border border-gray-300 bg-white px-4 text-sm font-bold text-gray-800 hover:border-[#2E6B4D] hover:text-[#2E6B4D]">
                Next <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )}
          </nav>
        )}
      </div>
    </section>
  );
}
