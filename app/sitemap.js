import { getAllPosts } from '@/lib/blog';
import { SITE_URL } from '@/lib/site';

export default function sitemap() {
    const posts = getAllPosts();

    return [
        {
            url: SITE_URL,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        ...posts.map((post) => ({
            url: `${SITE_URL}/blog/${post.slug}`,
            lastModified: post.date ? new Date(post.date) : new Date(),
            changeFrequency: 'yearly',
            priority: 0.7,
        })),
    ];
}
