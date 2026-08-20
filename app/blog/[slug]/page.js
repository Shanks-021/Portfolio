import Link from 'next/link';
import { notFound } from 'next/navigation';
import Terminal from '@/components/Terminal';
import TerminalBlock from '@/components/TerminalBlock';
import { getAllPosts, getPost } from '@/lib/blog';
import { blogPostingSchema, jsonLd } from '@/lib/schema';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export function generateStaticParams() {
    return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) return { title: 'Post not found' };

    return {
        title: post.title,
        description: post.summary,
        keywords: post.tags,
        authors: [{ name: SITE_NAME, url: SITE_URL }],
        alternates: {
            canonical: `/blog/${post.slug}`,
            types: { 'application/rss+xml': '/feed.xml' },
        },
        openGraph: {
            type: 'article',
            title: post.title,
            description: post.summary,
            url: `/blog/${post.slug}`,
            publishedTime: post.date || undefined,
            modifiedTime: post.date || undefined,
            authors: [SITE_NAME],
            tags: post.tags,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.summary,
        },
    };
}

export default async function BlogPost({ params }) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) notFound();

    return (
        <div className="terminalPage">
            {/* Machine-readable copy of the post, for search and LLM crawlers */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: jsonLd(blogPostingSchema(post)) }}
            />

            <Terminal title="ojas@portfolio" path={`~/blog/${post.slug}`} closeHref="/#blogs">
                <main>
                    <TerminalBlock command={`cat blog/${post.slug}.md`}>
                        <article className="postArticle">
                            <h1 className="postTitle">{post.title}</h1>
                            <div className="postMeta">
                                {post.date && (
                                    <time className="postDate" dateTime={post.date}>
                                        {post.date}
                                    </time>
                                )}
                                {post.tags?.length > 0 && (
                                    <span className="postTags">
                                        {post.tags.map((tag) => (
                                            <span key={tag} className="postTag">#{tag}</span>
                                        ))}
                                    </span>
                                )}
                            </div>
                            <div
                                className="postBody"
                                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                            />
                        </article>
                    </TerminalBlock>
                </main>

                <TerminalBlock command="cd ..">
                    <Link href="/#blogs" className="terminalLink">
                        <span className="linkIcon">←</span> back to portfolio
                    </Link>
                </TerminalBlock>
            </Terminal>
        </div>
    );
}
