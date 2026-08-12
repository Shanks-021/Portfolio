import Link from 'next/link';
import { notFound } from 'next/navigation';
import Terminal from '@/components/Terminal';
import TerminalBlock from '@/components/TerminalBlock';
import { getAllPosts, getPost } from '@/lib/blog';

export function generateStaticParams() {
    return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) return { title: 'Post not found' };

    return {
        title: `${post.title} | Ojas Soni`,
        description: post.summary,
    };
}

export default async function BlogPost({ params }) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) notFound();

    return (
        <div className="terminalPage">
            <Terminal title="ojas@portfolio" path={`~/blog/${post.slug}`} closeHref="/#blogs">
                <TerminalBlock command={`cat blog/${post.slug}.md`}>
                    <article className="postArticle">
                        <h1 className="postTitle">{post.title}</h1>
                        <div className="postMeta">
                            {post.date && <span className="postDate">{post.date}</span>}
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

                <TerminalBlock command="cd ..">
                    <Link href="/#blogs" className="terminalLink">
                        <span className="linkIcon">←</span> back to portfolio
                    </Link>
                </TerminalBlock>
            </Terminal>
        </div>
    );
}
