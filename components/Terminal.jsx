'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ThemeToggle from './ThemeToggle';

/**
 * Terminal wrapper component - provides the terminal window frame
 * with title bar and buttons.
 *
 * @param {string} closeHref - When set, the red button navigates here (window "close").
 *                             Without it the red button is decorative.
 */
export default function Terminal({ title = 'terminal', path = '~', closeHref, children }) {
    const router = useRouter();
    const terminalRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);

    useEffect(() => {
        const handleChange = () => {
            setIsFullscreen(document.fullscreenElement === terminalRef.current);
        };

        document.addEventListener('fullscreenchange', handleChange);
        return () => document.removeEventListener('fullscreenchange', handleChange);
    }, []);

    // Escape exits the CSS fallback the way it exits real fullscreen
    useEffect(() => {
        if (!isMaximized) return;

        const handleKey = (e) => {
            if (e.key === 'Escape') setIsMaximized(false);
        };

        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [isMaximized]);

    const handleClose = () => {
        if (closeHref) router.push(closeHref);
    };

    const handleFullscreen = async () => {
        if (!terminalRef.current) return;

        if (isMaximized) {
            setIsMaximized(false);
            return;
        }

        try {
            if (document.fullscreenElement) {
                await document.exitFullscreen();
            } else {
                await terminalRef.current.requestFullscreen();
            }
        } catch {
            // Fullscreen API is unavailable in some contexts (iOS Safari, embedded
            // or automation-controlled windows). Expand to fill the viewport instead
            // so the button always does something.
            setIsMaximized(true);
        }
    };

    const expanded = isFullscreen || isMaximized;

    return (
        <div className={`terminal${isMaximized ? ' maximized' : ''}`} ref={terminalRef}>
            {/* Title Bar */}
            <div className="terminalHeader">
                <div className="terminalButtons">
                    {closeHref ? (
                        <button
                            type="button"
                            className="terminalBtn close active"
                            onClick={handleClose}
                            aria-label="Close and return to portfolio"
                            title="Close"
                        />
                    ) : (
                        <span className="terminalBtn close" />
                    )}
                    <button
                        type="button"
                        className="terminalBtn maximize active"
                        onClick={handleFullscreen}
                        aria-label={expanded ? 'Exit fullscreen' : 'Enter fullscreen'}
                        title={expanded ? 'Exit fullscreen' : 'Fullscreen'}
                    />
                </div>
                <div className="terminalTitle">
                    <span>{title}</span>
                    <span className="terminalPath">{path}</span>
                </div>
                <div className="terminalHeaderRight">
                    <ThemeToggle />
                </div>
            </div>

            {/* Terminal Content */}
            <div className="terminalBody">
                {children}
            </div>
        </div>
    );
}
