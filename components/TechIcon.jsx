import Image from 'next/image';

// Tech stack icon mappings using devicons CDN
const techIcons = {
    react: { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    nextjs: { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
    javascript: { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    typescript: { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    nodejs: { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    python: { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    php: { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
    html5: { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    css3: { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    tailwindcss: { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    mongodb: { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    postgresql: { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    git: { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    docker: { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    figma: { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
    go: { name: 'Go', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg' },
    rust: { name: 'Rust', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg' },
    java: { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    swift: { name: 'Swift', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg' },
    kotlin: { name: 'Kotlin', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg' },
    flutter: { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
    firebase: { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
    aws: { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
    graphql: { name: 'GraphQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' },
    mysql: { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    redis: { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
    vue: { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
    angular: { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
    svelte: { name: 'Svelte', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg' },
    c: { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
    cpp: { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
    fastapi: { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
    pytorch: { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
    tensorflow: { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
    linux: { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
    kubernetes: { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-original.svg' },
    duckdb: { name: 'DuckDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/duckdb/duckdb-original.svg' },
    githubactions: { name: 'GitHub Actions', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg' },
    numpy: { name: 'NumPy', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
    pandas: { name: 'Pandas', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },

    // No devicon glyph exists for these (or the only one is solid black and
    // disappears against the dark theme) - rendered as text-only badges
    sql: { name: 'SQL', icon: null },
    kafka: { name: 'Kafka', icon: null },
    langchain: { name: 'LangChain', icon: null },
    langgraph: { name: 'LangGraph', icon: null },
    crewai: { name: 'CrewAI', icon: null },
    huggingface: { name: 'Hugging Face', icon: null },
    faiss: { name: 'FAISS', icon: null },
    vllm: { name: 'vLLM', icon: null },
    gemini: { name: 'Gemini', icon: null },
    rag: { name: 'RAG', icon: null },
    mcp: { name: 'MCP', icon: null },
    splunk: { name: 'Splunk', icon: null },
};

/**
 * TechIcon component - displays a tech stack icon with optional label
 * @param {string} tech - The key for the tech (e.g., "react", "nodejs")
 * @param {boolean} showLabel - Whether to show the text label (default: false)
 * @param {string} variant - "default" | "badge" | "compact" (default: "default")
 * @param {string} className - Additional CSS classes
 */
export default function TechIcon({ tech, showLabel = false, variant = 'default', className = '' }) {
    if (!tech) return null;

    // Unknown tech still renders as a text badge rather than vanishing silently
    const techData = techIcons[tech.toLowerCase()] ?? { name: tech, icon: null };

    const baseClass = variant === 'badge'
        ? 'techBadge'
        : variant === 'compact'
            ? 'techIconCompact'
            : 'techIcon';

    return (
        <div className={`${baseClass} ${techData.icon ? '' : 'techTextOnly'} ${className}`}>
            {techData.icon && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={techData.icon} alt={techData.name} />
            )}
            {(showLabel || !techData.icon) && <span className="techLabel">{techData.name}</span>}
        </div>
    );
}

// Export the tech icons map for direct access if needed
export { techIcons };
