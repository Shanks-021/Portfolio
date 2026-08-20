'use client';

/**
 * AsciiArt - Colorful filled ASCII art component
 * Uses block characters (█) for filled look like Gemini CLI
 */

// Block-style ASCII art for "OJAS SONI"
const NAME_ART = [
    ' ██████╗      ██╗ █████╗ ███████╗    ███████╗ ██████╗ ███╗   ██╗██╗',
    '██╔═══██╗     ██║██╔══██╗██╔════╝    ██╔════╝██╔═══██╗████╗  ██║██║',
    '██║   ██║     ██║███████║███████╗    ███████╗██║   ██║██╔██╗ ██║██║',
    '██║   ██║██   ██║██╔══██║╚════██║    ╚════██║██║   ██║██║╚██╗██║██║',
    '╚██████╔╝╚█████╔╝██║  ██║███████║    ███████║╚██████╔╝██║ ╚████║██║',
    ' ╚═════╝  ╚════╝ ╚═╝  ╚═╝╚══════╝    ╚══════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝',
];

// Cyan/Teal gradient - cleaner, more professional
const COLORS = [
    '#22d3ee', // Bright Cyan
    '#06b6d4', // Cyan
    '#14b8a6', // Teal
    '#10b981', // Emerald
    '#34d399', // Light Emerald
    '#6ee7b7', // Mint
];

export default function AsciiArt() {
    return (
        // Decorative: the readable name is the <h1> next to it, so extraction
        // tools and screen readers skip the block characters entirely.
        <pre className="asciiArt" aria-hidden="true">
            {NAME_ART.map((line, i) => (
                <span key={`n-${i}`} style={{ color: COLORS[i % COLORS.length] }}>
                    {line}
                </span>
            ))}
        </pre>
    );
}
