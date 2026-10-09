import { BLOG_POSTS } from '@/lib/data';
import type { BlogPost } from '@/lib/types';

export const POSTS_PER_PAGE = 9;
export const BLOG_URL = 'https://ebikesforsale.com.au/blog';

export const totalBlogPages = () => Math.max(1, Math.ceil(BLOG_POSTS.length / POSTS_PER_PAGE));
export const postsForPage = (page: number): BlogPost[] => BLOG_POSTS.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);
export const pagePath = (page: number) => (page <= 1 ? '/blog' : `/blog/page/${page}`);
