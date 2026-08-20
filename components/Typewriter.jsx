'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// useLayoutEffect warns during SSR; on the server there is no layout pass to run.
const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Types `text` out one character at a time.
 *
 * The full string is what renders on the server, so the text is present in the
 * HTML for crawlers, feed readers and no-JS visitors instead of appearing only
 * after hydration. The animation clears it in a layout effect - before the
 * browser paints - so the reveal still starts from empty with no flash.
 */
export default function Typewriter({ text, speed = 30, delay = 0, onComplete }) {
    const [displayedText, setDisplayedText] = useState(text);
    const [started, setStarted] = useState(false);
    const animate = useRef(false);

    useIsomorphicLayoutEffect(() => {
        // Visitors who ask for less motion keep the fully rendered text.
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        animate.current = true;
        setDisplayedText('');
    }, [text]);

    // Handle Delay Start
    useEffect(() => {
        if (!animate.current) return;

        const timeout = setTimeout(() => {
            setStarted(true);
        }, delay);
        return () => clearTimeout(timeout);
    }, [delay]);

    // Handle Typing Logic
    useEffect(() => {
        if (!started) return;

        // Reset text when starting to ensure clean slate
        setDisplayedText('');

        let i = 0;
        const timer = setInterval(() => {
            // Check if we've reached the end
            if (i >= text.length) {
                clearInterval(timer);
                if (onComplete) onComplete();
                return;
            }

            // Increment first, then slice? No. 
            // We want slice(0, 1) for first char.
            i++;
            setDisplayedText(text.slice(0, i));

        }, speed);

        return () => clearInterval(timer);
    }, [started, text, speed, onComplete]);

    return <span>{displayedText}</span>;
}
