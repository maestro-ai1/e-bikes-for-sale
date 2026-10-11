import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '@/lib/data';
import Header from '@/components/Header';
import BlogDetailView from '@/components/BlogDetailView';
import CartDrawer from '@/components/CartDrawer';
import WhatsAppChatWidget from '@/components/WhatsAppChatWidget';
import ProductDetailModal from '@/components/ProductDetailModal';
import Footer from '@/components/Footer';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((b) => ({
    slug: b.slug,
  }));
}

// Title tag <= 60 characters: add the brand suffix only when it fits, otherwise trim at a word boundary
function blogTitle(base: string) {
  const suffix = ' | e bikes for sale';
  if (base.length + suffix.length <= 60) return base + suffix;
  if (base.length <= 60) return base;
  return base.slice(0, 60).replace(/\s+\S*$/, '');
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = BLOG_POSTS.find((b) => b.slug === slug);

  if (!blog) {
    return {
      title: 'Blog Article Not Found | e bikes for sale',
      description: 'The requested Australian electric bike guide could not be found.',
    };
  }

  return {
    title: blogTitle(blog.seoTitle || blog.title),
    description: blog.excerpt,
    alternates: {
      canonical: `https://ebikesforsale.com.au/blog/${blog.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url: `https://ebikesforsale.com.au/blog/${blog.slug}`,
      type: 'article',
      publishedTime: blog.date,
      authors: [blog.author],
      images: [
        {
          url: blog.image,
          width: 1200,
          height: 630,
          alt: blog.altText,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt,
      images: [blog.image],
    },
  };
}

export default async function BlogSlugPage({ params }: Props) {
  const { slug } = await params;
  const blog = BLOG_POSTS.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt,
    image: blog.image,
    author: {
      '@type': 'Person',
      name: blog.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'e bikes for sale',
      url: 'https://ebikesforsale.com.au',
    },
    datePublished: blog.date,
    mainEntityOfPage: `https://ebikesforsale.com.au/blog/${blog.slug}`,
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Structured posts emit their own Article + FAQPage schema in the post body */}
      {!blog.faqs && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <Header />

      <main className="flex-1">
        <BlogDetailView initialBlog={blog} />
      </main>

      <Footer />
      <ProductDetailModal />
      <CartDrawer />
      <WhatsAppChatWidget />
    </div>
  );
}
