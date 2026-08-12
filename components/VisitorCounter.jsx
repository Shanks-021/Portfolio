'use client';

import { useState, useEffect } from 'react';

export default function VisitorCounter() {
    const [count, setCount] = useState(null);

    useEffect(() => {
        const namespace = 'ojassoni-portfolio-v1';
        const key = 'visits';
        const hasVisited = localStorage.getItem(`visited-${namespace}`);

        if (!hasVisited) {
            fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
                .then(res => res.json())
                .then(data => {
                    setCount(data.value);
                    localStorage.setItem(`visited-${namespace}`, 'true');
                })
                .catch(err => {
                    console.warn('Counter hit failed:', err);
                    setCount(null);
                });
        } else {
            fetch(`https://api.countapi.xyz/get/${namespace}/${key}`)
                .then(res => res.json())
                .then(data => setCount(data.value))
                .catch(err => {
                    console.warn('Counter get failed:', err);
                    setCount(null);
                });
        }
    }, []);

    if (count === null) return null;

    // Pad with zeros to look like a digital counter
    const formattedCount = count.toString().padStart(6, '0');

    return (
        <div className="visitorCounter">
            <span className="label">VISITORS:</span>
            <span className="count">{formattedCount}</span>
        </div>
    );
}
