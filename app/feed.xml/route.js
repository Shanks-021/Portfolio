import { getAllPosts } from '@/lib/blog';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/site';

const escapeXml = (unsafe = '') =>
    unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');

export async function GET() {
    const posts = getAllPosts();

    const items = posts
        .map((post) => {
            const url = `${SITE_URL}/blog/${post.slug}`;
            const pubDate = post.date ? new Date(post.date).toUTCString() : '';

            return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      ${pubDate ? `<pubDate>${pubDate}</pubDate>` : ''}
      <description>${escapeXml(post.summary)}</description>
    </item>`;
        })
        .join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
        },
    });
}
