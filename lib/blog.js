import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

/**
 * Reads every .md file in content/blog and returns their frontmatter,
 * newest first. Body content is not parsed here - only the metadata the
 * listing needs.
 */
export function getAllPosts() {
    if (!fs.existsSync(BLOG_DIR)) return [];

    return fs
        .readdirSync(BLOG_DIR)
        .filter((file) => file.endsWith('.md'))
        .map((file) => {
            const slug = file.replace(/\.md$/, '');
            const { data } = matter(fs.readFileSync(path.join(BLOG_DIR, file), 'utf8'));

            return {
                slug,
                title: data.title ?? slug,
                date: data.date ? String(data.date).slice(0, 10) : '',
                summary: data.summary ?? '',
                tags: data.tags ?? [],
                draft: data.draft === true,
            };
        })
        .filter((post) => !post.draft)
        .sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * Reads a single post and renders its markdown body to HTML.
 * Returns null when the slug does not exist.
 */
export async function getPost(slug) {
    const filePath = path.join(BLOG_DIR, `${slug}.md`);
    if (!fs.existsSync(filePath)) return null;

    const { data, content } = matter(fs.readFileSync(filePath, 'utf8'));
    const processed = await remark().use(html).process(content);

    return {
        slug,
        title: data.title ?? slug,
        date: data.date ? String(data.date).slice(0, 10) : '',
        summary: data.summary ?? '',
        tags: data.tags ?? [],
        contentHtml: processed.toString(),
    };
}
