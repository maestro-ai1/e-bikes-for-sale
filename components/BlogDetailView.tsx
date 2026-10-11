'use client';

import React from 'react';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import { useApp } from '@/context/AppContext';
import { BLOG_POSTS, PRODUCTS } from '@/lib/data';
import { BlogPost } from '@/lib/types';
import { ChevronRight, Calendar, Clock, User, ArrowLeft, Tag, ShoppingBag } from 'lucide-react';
import BlogRichBody from '@/components/BlogRichBody';

interface BlogDetailViewProps {
  initialBlog?: BlogPost;
}

export default function BlogDetailView({ initialBlog }: BlogDetailViewProps = {}) {
  const { activeBlog, addToCart, setQuickViewProduct } = useApp();

  const blog = initialBlog || activeBlog || BLOG_POSTS[0];
  // Structured posts (FAQs / sources / related) use the rich layout and the featured product they name
  const isRich = !!blog.faqs;
  const featured = (isRich && blog.productSlug ? PRODUCTS.find((p) => p.slug === blog.productSlug) : null) || PRODUCTS[0];

  return (
    <article className="bg-white min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumbs & Back */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/blog"
            className="inline-flex min-h-11 items-center gap-1.5 text-xs font-bold text-[#2E6B4D] hover:text-[#1E4733] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to Knowledge Hub</span>
          </Link>

          <span className="text-xs font-semibold uppercase text-gray-600">
            /{blog.slug}
          </span>
        </div>

        {/* Header */}
        <div className="space-y-3 mb-8">
          <span className="inline-block bg-emerald-100 text-[#1E4733] font-extrabold text-xs uppercase px-3 py-1 rounded-full">
            {blog.category}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            {blog.title}
          </h1>

          <div className="flex items-center gap-4 text-xs text-gray-500 pt-2 border-b border-gray-100 pb-4">
            <span className="flex items-center gap-1 font-semibold text-gray-700">
              <User className="w-3.5 h-3.5" />
              {blog.author}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {blog.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {blog.readTime}
            </span>
          </div>
        </div>

        {/* Feature Image */}
        <div className="relative aspect-16/9 w-full rounded-3xl overflow-hidden bg-gray-100 mb-8 border border-gray-200">
          <SafeImage
            src={blog.image}
            alt={blog.altText}
            width={1200}
            height={675}
            priority
            sizes="(max-width: 1024px) 100vw, 800px"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Content Body */}
        {isRich ? (
          <BlogRichBody blog={blog} />
        ) : (
        <div className="prose prose-emerald max-w-none text-gray-800 text-sm sm:text-base leading-relaxed space-y-5">
          {blog.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="whitespace-pre-line">
              {paragraph}
            </p>
          ))}
        </div>
        )}

        {/* RELATED TOPICS: capped at 5 so the page keeps one clear primary keyword (legacy posts only) */}
        {!isRich && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4 text-[#2E6B4D]" />
            <span className="font-extrabold text-xs uppercase text-gray-900 tracking-wider">
              Related topics:
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {blog.tags.slice(0, 5).map((tag, i) => (
              <Link
                key={i}
                href="/shop"
                className="inline-flex min-h-11 items-center text-xs bg-gray-100 hover:bg-emerald-50 text-gray-700 hover:text-[#2E6B4D] px-2.5 py-1 rounded-lg border border-gray-200 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
        )}

        {/* RELATED FEATURED E-BIKE CTA */}
        <div className="mt-12 bg-gray-50 border border-gray-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl relative overflow-hidden bg-white shrink-0 border border-gray-200">
              <SafeImage
                src={featured.image}
                alt={featured.name}
                width={600}
                height={600}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#2E6B4D] uppercase">Ready to ride?</span>
              <h3 className="font-black text-gray-900 text-base">{featured.name}</h3>
              <p className="text-xs text-gray-500">${featured.price} AUD • 250W EN15194 Street Legal</p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setQuickViewProduct(featured)}
              className="cursor-pointer bg-white border border-gray-300 text-gray-700 px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-gray-100 transition-colors"
            >
              View Specs
            </button>
            <button
              onClick={() => addToCart(featured, 1)}
              className="cursor-pointer bg-[#2E6B4D] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#1E4733] shadow-xs transition-colors active:scale-95"
            >
              Add to Cart
            </button>
          </div>
        </div>

      </div>
    </article>
  );
}
