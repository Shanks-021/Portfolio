import data from '@/data/data.json';
import { techIcons } from '@/components/TechIcon';
import { getAllPosts } from '@/lib/blog';
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION } from '@/lib/site';

/**
 * /llms.txt - the whole site as plain markdown, in one request.
 *
 * The page itself is terminal-styled and JS-animated; this is the same content
 * with none of that in the way, for LLM crawlers and anyone scraping the
 * profile who would rather not parse HTML.
 */

const techName = (tech) => techIcons[tech.toLowerCase()]?.name ?? tech;

const bullets = (items = []) => items.map((item) => `- ${item}`).join('\n');

function experienceSection() {
    return data.experience
        ?.map((exp) => {
            const dates = `${exp.startDate} - ${exp.endDate || 'Present'}`;
            const meta = [
                `**${exp.role}**, ${exp.company} (${dates})`,
                exp.client ? `Client: ${exp.client}` : null,
                exp.location,
            ].filter(Boolean);

            const projects = exp.projects
                ?.map((proj) =>
                    [
                        `#### ${proj.name}`,
                        proj.tools?.length
                            ? `Tools: ${proj.tools.map(techName).join(', ')}`
                            : null,
                        bullets(proj.highlights),
                    ]
                        .filter(Boolean)
                        .join('\n\n')
                )
                .join('\n\n');

            return [
                `### ${exp.company}`,
                meta.join('  \n'),
                exp.highlights?.length ? bullets(exp.highlights) : null,
                projects || null,
            ]
                .filter(Boolean)
                .join('\n\n');
        })
        .join('\n\n');
}

function projectsSection() {
    return data.projects
        ?.map((project) => {
            const links = [
                project.githubUrl ? `Source: ${project.githubUrl}` : null,
                project.liveUrl ? `Live: ${project.liveUrl}` : null,
            ].filter(Boolean);

            return [
                `### ${project.name}`,
                project.techStack?.length
                    ? `Tech: ${project.techStack.map(techName).join(', ')}`
                    : null,
                links.length ? links.join('  \n') : null,
                bullets(project.highlights),
            ]
                .filter(Boolean)
                .join('\n\n');
        })
        .join('\n\n');
}

function educationSection() {
    return data.education
        ?.map((edu) =>
            [
                `### ${edu.institution}`,
                [
                    `${edu.degree} (${edu.startDate} - ${edu.endDate})`,
                    edu.location,
                    edu.detail,
                ]
                    .filter(Boolean)
                    .join('  \n'),
            ].join('\n\n')
        )
        .join('\n\n');
}

function blogSection(posts) {
    if (posts.length === 0) return null;

    return [
        '## Blog',
        posts
            .map((post) => {
                const parts = [`- [${post.title}](${SITE_URL}/blog/${post.slug})`];
                if (post.date) parts.push(`(${post.date})`);
                if (post.summary) parts.push(`— ${post.summary}`);
                return parts.join(' ');
            })
            .join('\n'),
    ].join('\n\n');
}

export function GET() {
    const posts = getAllPosts();

    const body = [
        `# ${SITE_TITLE}`,
        `> ${SITE_DESCRIPTION}`,
        data.tagline,
        data.description,
        '## Contact',
        [
            `- Email: ${data.email}`,
            `- Website: ${SITE_URL}`,
            `- Resume: ${SITE_URL}${data.resumeUrl}`,
            ...(data.socials?.map(
                (social) => `- ${social.platform}: ${social.url}`
            ) ?? []),
        ].join('\n'),
        '## Skills',
        data.techStack?.map(techName).join(', '),
        '## Experience',
        experienceSection(),
        '## Projects',
        projectsSection(),
        '## Education',
        educationSection(),
        blogSection(posts),
        '---',
        [
            `Full site: ${SITE_URL}`,
            `Sitemap: ${SITE_URL}/sitemap.xml`,
            `RSS: ${SITE_URL}/feed.xml`,
            `Author: ${SITE_NAME}`,
        ].join('  \n'),
    ]
        .filter(Boolean)
        .join('\n\n');

    return new Response(`${body}\n`, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
        },
    });
}
