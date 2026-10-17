import type { Metadata } from 'next';
import HomeView from '@/components/HomeView';
import { BLOG_POSTS } from '@/lib/blog-data';

export const metadata: Metadata = {
  alternates: { canonical: 'https://ebikesforsale.com.au/' },
};

export default function HomePage() {
  // Only the four home cards, without article text, go to the client
  const blogCards = BLOG_POSTS.slice(0, 4).map(({ content: _content, ...card }) => card);
  return <HomeView blogCards={blogCards} />;
}
