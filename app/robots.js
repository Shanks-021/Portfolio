import { SITE_URL } from '@/lib/site';

/**
 * Crawlers that a portfolio actively wants: search engines, and the AI agents
 * that answer "who is Ojas Soni?" Several of these (Google-Extended,
 * Applebot-Extended, ClaudeBot) are opt-out crawlers, so naming them and
 * allowing them explicitly is what keeps this site in their index if a default
 * ever tightens - a bare `User-agent: *` leaves it ambiguous.
 */
const AI_CRAWLERS = [
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'ClaudeBot',
    'Claude-User',
    'Claude-SearchBot',
    'anthropic-ai',
    'Google-Extended',
    'Applebot-Extended',
    'PerplexityBot',
    'Perplexity-User',
    'CCBot',
    'Amazonbot',
    'Bytespider',
    'meta-externalagent',
    'cohere-ai',
    'Diffbot',
    'YouBot',
];

export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
            },
            {
                userAgent: AI_CRAWLERS,
                allow: '/',
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}
