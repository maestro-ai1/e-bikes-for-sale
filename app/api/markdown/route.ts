import { htmlToMarkdown } from '@/lib/html-to-markdown';

export const dynamic = 'force-dynamic';

/**
 * Markdown for Agents. The middleware rewrites a public page request here only when the client sent
 * "Accept: text/markdown". The page itself is fetched as HTML and converted, so HTML stays the default
 * for browsers and crawlers and nothing about the page or its links changes.
 */
const BLOCKED = /^\/(api|admin|order|checkout|_next|thank-you|\.well-known)(\/|$)/;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const target = req.headers.get('x-markdown-path') || url.searchParams.get('path') || '/';
  if (!target.startsWith('/') || target.startsWith('//') || BLOCKED.test(target)) {
    return new Response('Not available as markdown', { status: 404, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
  const origin = url.origin;
  const res = await fetch(origin + target, { headers: { Accept: 'text/html', 'User-Agent': 'markdown-for-agents' }, redirect: 'follow' });
  if (!res.ok || !(res.headers.get('content-type') || '').includes('text/html')) {
    return new Response('Not available as markdown', { status: res.status === 404 ? 404 : 502, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
  const { title, markdown } = htmlToMarkdown(await res.text(), origin);
  const body = `# ${title}\n\nSource: ${origin}${target}\n\n${markdown}\n`;
  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'x-markdown-tokens': String(Math.ceil(body.length / 4)),
      Vary: 'Accept',
      'Cache-Control': 'public, max-age=300',
    },
  });
}
