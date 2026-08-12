/**
 * Absolute site URL, needed for OG tags, RSS, and the sitemap.
 *
 * Set NEXT_PUBLIC_SITE_URL to your real domain when you deploy. On Vercel the
 * production URL is picked up automatically if you don't.
 */
const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : null) ||
    'http://localhost:3000';

export const SITE_URL = fromEnv.replace(/\/$/, '');

export const SITE_NAME = 'Ojas Soni';
export const SITE_TITLE = 'Ojas Soni | AI Engineer';
export const SITE_DESCRIPTION =
    'AI Engineer building agentic AI, RAG, and multi-agent systems in production.';
