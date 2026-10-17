import type { BlogPost } from './types';
import { SEGWAY_POSTS } from '@/lib/segway-content';
import { GUIDE_POSTS } from '@/lib/blog-guides';
import { EBIKE_GUIDE_POSTS } from '@/lib/blog-ebike-guides';

// Kept out of lib/data.ts so the article text never ships in the client JavaScript bundle (server components only).

// The keyword-mapped guides replace an older post with the same slug, so its URL is unchanged
const MAPPED_SLUGS = new Set(EBIKE_GUIDE_POSTS.map((p) => p.slug));
export const BLOG_POSTS: BlogPost[] = [...EBIKE_GUIDE_POSTS, ...GUIDE_POSTS.filter((p) => !MAPPED_SLUGS.has(p.slug))];

// Structured posts (rich layout) are kept in their own file
BLOG_POSTS.push(...SEGWAY_POSTS);
