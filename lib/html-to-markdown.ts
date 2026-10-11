/** Small HTML to Markdown converter for "Markdown for Agents". Keeps headings, paragraphs, lists, links and tables of the main content. */

const decode = (s: string) =>
  s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));

const strip = (s: string) => decode(s.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();

export function htmlToMarkdown(html: string, siteUrl: string): { title: string; markdown: string } {
  const title = strip((/<title[^>]*>([\s\S]*?)<\/title>/i.exec(html) || [])[1] || '');
  let body = (/<main[\s\S]*?<\/main>/i.exec(html) || [html])[0];

  body = body
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(/<(nav|button|form|select|iframe|template)[\s\S]*?<\/\1>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');

  // tables
  body = body.replace(/<table[\s\S]*?<\/table>/gi, (t) => {
    const rows = [...t.matchAll(/<tr[\s\S]*?<\/tr>/gi)].map((r) =>
      [...r[0].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi)].map((c) => strip(c[1]).replace(/\|/g, '/')),
    );
    if (!rows.length) return '';
    const out = ['| ' + rows[0].join(' | ') + ' |', '| ' + rows[0].map(() => '---').join(' | ') + ' |'];
    rows.slice(1).forEach((r) => out.push('| ' + r.join(' | ') + ' |'));
    return '\n\n' + out.join('\n') + '\n\n';
  });

  // links and images
  body = body.replace(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href: string, text: string) => {
    const label = strip(text);
    if (!label) return '';
    if (/^(#|javascript:|mailto:|tel:)/i.test(href)) return label;
    const abs = href.startsWith('/') ? siteUrl + href : href;
    return `[${label}](${abs})`;
  });
  body = body.replace(/<img\b[^>]*alt="([^"]*)"[^>]*>/gi, (_, alt: string) => (alt ? `(${decode(alt)})` : ''));

  // headings, lists, paragraphs
  body = body
    .replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (_, n: string, t: string) => `\n\n${'#'.repeat(Number(n))} ${strip(t)}\n\n`)
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, t: string) => `\n- ${strip(t.replace(/\[[^\]]*\]\([^)]*\)/g, (m) => m))}`)
    .replace(/<\/(p|div|section|article|ul|ol|details|summary|header|footer|figure)>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?(strong|b)[^>]*>/gi, '**')
    .replace(/<\/?(em|i)[^>]*>/gi, '*')
    .replace(/<[^>]+>/g, '');

  const markdown = decode(body)
    .split('\n')
    .map((l) => l.replace(/[ \t]+/g, ' ').trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return { title, markdown };
}
