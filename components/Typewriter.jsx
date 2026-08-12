'use client';

import { useState, useEffect } from 'react';

export default function Typewriter({ text, speed = 30, delay = 0, onComplete }) {
    const [displayedText, setDisplayedText] = useState('');
    const [started, setStarted] = useState(false);

    // Handle Delay Start
    useEffect(() => {
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
