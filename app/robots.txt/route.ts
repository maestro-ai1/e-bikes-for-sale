import { SITE } from '@/lib/agent-ready';

export const dynamic = 'force-static';

const AI_CRAWLERS = [
  'GPTBot', 'ChatGPT-User', 'OAI-SearchBot', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'anthropic-ai',
  'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'Bingbot', 'DuckAssistBot', 'MistralAI-User', 'CCBot',
  'cohere-ai', 'Bytespider', 'Amazonbot', 'Meta-ExternalAgent',
];

const BLOCKED = ['/admin/', '/order/', '/checkout', '/api/admin/', '/api/order/', '/api/contact', '/thank-you-order', '/thank-you-contact', '/thank-you-wholesale'];

export function GET() {
  const disallow = BLOCKED.map((p) => `Disallow: ${p}`).join('\n');
  const body = [
    '# Public product, category and guide pages are open to search engines and AI assistants.',
    'User-agent: *',
    'Allow: /',
    'Allow: /api/products',
    disallow,
    '',
    'Content-Signal: search=yes, ai-input=yes, ai-train=no',
    '',
    ...AI_CRAWLERS.flatMap((a) => [`User-agent: ${a}`, 'Allow: /', 'Allow: /api/products', disallow, '']),
    `Sitemap: ${SITE}/sitemap.xml`,
    '',
    '# Machine-readable resources',
    `# llms.txt: ${SITE}/llms.txt`,
    `# API catalog: ${SITE}/.well-known/api-catalog`,
    `# Agent skills: ${SITE}/.well-known/agent-skills/index.json`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}
