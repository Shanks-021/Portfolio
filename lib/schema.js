import data from '@/data/data.json';
import { techIcons } from '@/components/TechIcon';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/site';

/**
 * schema.org JSON-LD builders.
 *
 * Everything a scraper needs about this site in one machine-readable block:
 * search engines use it for rich results, and LLM crawlers use it to read the
 * profile without having to infer structure from terminal-styled markup.
 */

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

// "langgraph" is not a thing a machine knows; "LangGraph" is.
const techName = (tech) => techIcons[tech.toLowerCase()]?.name ?? tech;

/** "Nov 2024" -> "2024-11", the ISO 8601 precision schema.org expects. */
const MONTHS = {
    jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
    jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12',
};

function isoMonth(value) {
    if (!value) return undefined;

    const match = String(value).match(/^([A-Za-z]+)\s+(\d{4})$/);
    if (!match) return undefined;

    const month = MONTHS[match[1].slice(0, 3).toLowerCase()];
    return month ? `${match[2]}-${month}` : undefined;
}

const dropEmpty = (obj) =>
    Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));

export function personSchema() {
    const currentRole = data.experience?.find((exp) => exp.current) ?? data.experience?.[0];

    return dropEmpty({
        '@type': 'Person',
        '@id': PERSON_ID,
        name: data.name,
        url: SITE_URL,
        email: `mailto:${data.email}`,
        jobTitle: currentRole?.role,
        description: data.description,
        disambiguatingDescription: data.tagline,
        knowsAbout: data.techStack?.map(techName),
        sameAs: data.socials?.map((social) => social.url),
        worksFor: currentRole
            ? dropEmpty({ '@type': 'Organization', name: currentRole.company })
            : undefined,
        alumniOf: data.education?.map((edu) =>
            dropEmpty({
                '@type': 'EducationalOrganization',
                name: edu.institution,
                address: edu.location,
            })
        ),
        hasOccupation: data.experience?.map((exp) =>
            dropEmpty({
                '@type': 'EmployeeRole',
                roleName: exp.role,
                startDate: isoMonth(exp.startDate),
                endDate: isoMonth(exp.endDate),
                worksFor: dropEmpty({ '@type': 'Organization', name: exp.company }),
            })
        ),
        subjectOf: data.projects?.map((project) =>
            dropEmpty({
                '@type': 'CreativeWork',
                name: project.name,
                url: project.liveUrl ?? project.githubUrl ?? undefined,
                keywords: project.techStack?.map(techName).join(', '),
                abstract: project.highlights?.[0],
            })
        ),
    });
}

export function websiteSchema() {
    return {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: 'en',
        publisher: { '@id': PERSON_ID },
    };
}

/** The home page: a profile of one person, plus the site it belongs to. */
export function homePageSchema(posts = []) {
    return {
        '@context': 'https://schema.org',
        '@graph': [
            websiteSchema(),
            personSchema(),
            {
                '@type': 'ProfilePage',
                '@id': `${SITE_URL}/#profilepage`,
                url: SITE_URL,
                name: SITE_NAME,
                isPartOf: { '@id': WEBSITE_ID },
                about: { '@id': PERSON_ID },
                mainEntity: { '@id': PERSON_ID },
                hasPart: posts.map((post) =>
                    dropEmpty({
                        '@type': 'BlogPosting',
                        headline: post.title,
                        url: `${SITE_URL}/blog/${post.slug}`,
                        datePublished: post.date || undefined,
                    })
                ),
            },
        ],
    };
}

export function blogPostingSchema(post) {
    const url = `${SITE_URL}/blog/${post.slug}`;

    return {
        '@context': 'https://schema.org',
        '@graph': [
            websiteSchema(),
            personSchema(),
            dropEmpty({
                '@type': 'BlogPosting',
                '@id': `${url}#post`,
                url,
                mainEntityOfPage: url,
                headline: post.title,
                description: post.summary || undefined,
                datePublished: post.date || undefined,
                dateModified: post.date || undefined,
                keywords: post.tags?.length ? post.tags.join(', ') : undefined,
                inLanguage: 'en',
                isPartOf: { '@id': WEBSITE_ID },
                author: { '@id': PERSON_ID },
                publisher: { '@id': PERSON_ID },
            }),
        ],
    };
}

/**
 * JSON-LD renders inside a script tag, so a `<` in any string would end the tag
 * early. Escaping it keeps the payload inert.
 */
export function jsonLd(schema) {
    return JSON.stringify(schema).replace(/</g, '\\u003c');
}
