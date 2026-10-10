'use client';

import React from 'react';
import SafeImage from '@/components/SafeImage';
import { useApp } from '@/context/AppContext';
import { BLOG_POSTS } from '@/lib/data';
import { BlogPost } from '@/lib/types';
import { BookOpen, Calendar, Clock, ArrowRight, Tag } from 'lucide-react';

export default function BlogSection() {
  const { setActiveBlog, setCurrentView, viewBlog } = useApp();

  const handleReadBlog = (post: BlogPost) => {
    if (viewBlog) {
      viewBlog(post);
    } else {
      setActiveBlog(post);
      setCurrentView('blog-detail');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2E6B4D] mb-1">
              <BookOpen className="w-4 h-4" />
              <span>Australian E-Bike Knowledge Hub</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              E-Bike Buying Guides & Australian Regulations
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-xl">
              Honest consumer buying guides, EN15194 legal speed explanations, sizing calculators, and youth helmet safety advice.
            </p>
          </div>

          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#2E6B4D] hover:text-[#1E4733] shrink-0"
          >
            <span>View All Guides</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* 4 Informational Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BLOG_POSTS.slice(0, 4).map((post) => (
            <article
              key={post.id}
              onClick={() => handleReadBlog(post)}
              className="cursor-pointer bg-white rounded-2xl border border-gray-200/90 hover:border-[#2E6B4D] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* IMAGE WRAPPER (Strict identical aspect ratio & alt text) */}
              <div 
                onClick={() => handleReadBlog(post)}
                className="relative aspect-4/3 w-full bg-gray-100 overflow-hidden cursor-pointer"
              >
                <SafeImage
                  src={post.image}
                  alt={post.altText}
                width={600}
                height={600}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-emerald-900 font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
                  {post.category}
                </div>
              </div>

              {/* CARD CONTENT */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 
                    onClick={() => handleReadBlog(post)}
                    className="font-bold text-gray-900 text-base leading-snug group-hover:text-[#2E6B4D] transition-colors cursor-pointer"
                  >
                    {post.title}
                  </h3>

                  <p className="text-xs text-gray-500 mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Slug & Tags indicator */}
                <div className="pt-3 border-t border-gray-100 space-y-2">
                  <div className="text-[10px] text-gray-400 font-mono truncate">
                    /{post.slug}
                  </div>

                  {/* Sample of the 20 commercial tags */}
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="text-[9px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                        #{tag}
                      </span>
                    ))}
                    <span className="text-[9px] text-[#2E6B4D] font-bold">
                      +{post.tags.length - 3} tags
                    </span>
                  </div>

                  {/* Read More Button */}
                  <button
                    onClick={() => handleReadBlog(post)}
                    className="w-full mt-2 bg-emerald-50 hover:bg-[#2E6B4D] text-[#2E6B4D] hover:text-white font-bold text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
