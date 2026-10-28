import type { BlogPost } from './types';
import { SEGWAY_POSTS } from '@/lib/segway-content';
import { GUIDE_POSTS } from '@/lib/blog-guides';
import { EBIKE_GUIDE_POSTS } from '@/lib/blog-ebike-guides';
import { EBIKE_GUIDE_POSTS_2 } from '@/lib/blog-ebike-guides-2';

// Kept out of lib/data.ts so the article text never ships in the client JavaScript bundle (server components only).

// The keyword-mapped guides replace an older post with the same slug, so its URL is unchanged
const ALL_GUIDES = [...EBIKE_GUIDE_POSTS, ...EBIKE_GUIDE_POSTS_2];
const MAPPED_SLUGS = new Set(ALL_GUIDES.map((p) => p.slug));
export const BLOG_POSTS: BlogPost[] = [...ALL_GUIDES, ...GUIDE_POSTS.filter((p) => !MAPPED_SLUGS.has(p.slug))];

// Structured posts (rich layout) are kept in their own file
BLOG_POSTS.push(...SEGWAY_POSTS);
