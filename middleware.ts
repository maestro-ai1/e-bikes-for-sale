import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Markdown for Agents: a public GET page is answered as markdown only when the client asks for
 * "text/markdown". Every other request (browsers, Googlebot, API clients) is untouched; HTML stays the default.
 * Excluded: API routes, admin, order, checkout, thank-you pages, Next internals, files with an extension.
 */
export function middleware(req: NextRequest) {
  const accept = req.headers.get('accept') || '';
  // Browsers and search crawlers never send text/markdown, so this only matches clients that ask for it.
  const wantsMarkdown = /text\/markdown/i.test(accept);
  if (req.method === 'GET' && wantsMarkdown) {
    const url = req.nextUrl.clone();
    url.pathname = '/api/markdown';
    url.search = '';
    url.searchParams.set('path', req.nextUrl.pathname + req.nextUrl.search);
    const headers = new Headers(req.headers);
    headers.set('x-markdown-path', req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.rewrite(url, { request: { headers } });
  }
  const res = NextResponse.next();
  res.headers.append('Vary', 'Accept');
  return res;
}

export const config = {
  // pages only: skip api, admin, order, checkout, thank-you, _next, .well-known and anything with a file extension
  matcher: ['/((?!api|admin|order|checkout|thank-you|_next|\\.well-known|.*\\..*).*)'],
};
