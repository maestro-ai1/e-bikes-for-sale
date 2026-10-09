import React from 'react';
import Link from 'next/link';
import { ExternalLink, HelpCircle, ListOrdered } from 'lucide-react';
import type { BlogPost } from '@/lib/types';

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const SITE = 'https://ebikesforsale.com.au';

type Block = { type: 'h2' | 'p' | 'ul' | 'ol'; text?: string; items?: string[]; id?: string };

function textBlock(t: string): Block {
  const lines = t.split('\n');
  if (lines.every((l) => l.startsWith('- '))) return { type: 'ul', items: lines.map((l) => l.slice(2)) };
  if (lines.every((l) => /^\d+\.\s/.test(l))) return { type: 'ol', items: lines.map((l) => l.replace(/^\d+\.\s/, '')) };
  return { type: 'p', text: t.replace(/\n/g, ' ') };
}

function parse(content: string): Block[] {
  return content.split('\n\n').flatMap((raw): Block[] => {
    const t = raw.trim();
    if (!t) return [];
    if (t.startsWith('## ')) {
      const [head, ...rest] = t.split('\n');
      const text = head.replace(/^##\s+/, '');
      const h: Block = { type: 'h2', text, id: slugify(text) };
      // a heading may be followed directly (single newline) by its paragraph or list
      return rest.length && rest.join('\n').trim() ? [h, textBlock(rest.join('\n').trim())] : [h];
    }
    return [textBlock(t)];
  });
}

/** Structured article body: H2s, table of contents, FAQ, sources, related links and Article/FAQ/Breadcrumb JSON-LD. */
export default function BlogRichBody({ blog }: { blog: BlogPost }) {
  const blocks = parse(blog.content);
  const headings = blocks.filter((b) => b.type === 'h2');
  const url = `${SITE}/blog/${blog.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: blog.title,
        description: blog.excerpt,
        image: blog.image.startsWith('/') ? `${SITE}${blog.image}` : blog.image,
        inLanguage: 'en-AU',
        mainEntityOfPage: url,
        author: { '@type': 'Organization', name: 'e bikes for sale' },
        publisher: { '@type': 'Organization', name: 'e bikes for sale', url: SITE },
        ...(blog.isoDate ? { datePublished: blog.isoDate, dateModified: blog.isoDate } : {}),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE}/blog` },
          { '@type': 'ListItem', position: 3, name: blog.title, item: url },
        ],
      },
      ...(blog.faqs?.length
        ? [{ '@type': 'FAQPage', mainEntity: blog.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }]
        : []),
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {headings.length >= 3 && (
        <nav aria-label="Table of contents" className="mb-8 rounded-2xl border border-gray-200 bg-gray-50 p-5">
          <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-gray-600">
            <ListOrdered className="h-4 w-4" aria-hidden="true" /> In this guide
          </div>
          <ol className="grid gap-1.5 text-sm sm:grid-cols-2">
            {headings.map((h) => (
              <li key={h.id}><a href={`#${h.id}`} className="inline-block py-1 font-semibold text-[#2E6B4D] hover:underline">{h.text}</a></li>
            ))}
            {blog.faqs?.length ? <li><a href="#faq" className="inline-block py-1 font-semibold text-[#2E6B4D] hover:underline">Frequently asked questions</a></li> : null}
          </ol>
        </nav>
      )}

      <div className="space-y-5 text-sm leading-relaxed text-gray-800 sm:text-base">
        {blocks.map((b, i) => {
          if (b.type === 'h2')
            return <h2 key={i} id={b.id} className="scroll-mt-24 pt-4 text-2xl font-black tracking-tight text-gray-900">{b.text}</h2>;
          if (b.type === 'ul') return <ul key={i} className="list-disc space-y-1.5 pl-5">{b.items!.map((it) => <li key={it}>{it}</li>)}</ul>;
          if (b.type === 'ol') return <ol key={i} className="list-decimal space-y-1.5 pl-5">{b.items!.map((it) => <li key={it}>{it}</li>)}</ol>;
          return <p key={i}>{b.text}</p>;
        })}
      </div>

      {blog.faqs?.length ? (
        <section id="faq" aria-labelledby="faq-h" className="mt-12 scroll-mt-24">
          <div className="flex items-center gap-2 text-[#2E6B4D]"><HelpCircle className="h-4 w-4" aria-hidden="true" /><span className="text-xs font-black uppercase tracking-wider">FAQs</span></div>
          <h2 id="faq-h" className="mt-1 text-2xl font-black tracking-tight text-gray-900">Frequently asked questions</h2>
          <div className="mt-4 divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
            {blog.faqs.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 font-black text-gray-900 marker:hidden">
                  <h3 className="text-base">{f.q}</h3>
                  <span aria-hidden="true" className="text-xl text-gray-400 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-2 text-gray-600">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      {blog.related?.length ? (
        <nav aria-label="Related pages" className="mt-10">
          <h2 className="text-sm font-black uppercase tracking-wider text-gray-600">Related on our site</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {blog.related.map((r) => (
              <li key={r.href}><Link href={r.href} className="inline-flex min-h-11 items-center rounded-full border border-gray-300 px-4 text-sm font-bold text-gray-800 hover:border-[#2E6B4D] hover:text-[#2E6B4D]">{r.label}</Link></li>
            ))}
          </ul>
        </nav>
      ) : null}

      {blog.sources?.length ? (
        <section aria-label="Sources" className="mt-8">
          <h2 className="text-sm font-black uppercase tracking-wider text-gray-600">Sources and further reading</h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            {blog.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 py-1 font-semibold text-[#2E6B4D] underline">
                  {s.label} <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
