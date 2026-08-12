'use client';

import { useCallback, useEffect, useState } from 'react';

const NAV_ITEMS = [
    { id: 'about', label: 'about', shortcut: '1' },
    { id: 'skills', label: 'skills', shortcut: '2' },
    { id: 'experience', label: 'experience', shortcut: '3' },
    { id: 'projects', label: 'projects', shortcut: '4' },
    { id: 'education', label: 'education', shortcut: '5' },
    { id: 'blogs', label: 'blogs', shortcut: '6' },
];

const SCROLL_OFFSET = 80;

export default function TerminalNavbar() {
    const [activeSection, setActiveSection] = useState('about');

    const goToSection = useCallback((id) => {
        const element = document.getElementById(id);
        if (!element) return;

        const offsetPosition =
            element.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;

        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        setActiveSection(id);
    }, []);

    const handleNavClick = (e, id) => {
        e.preventDefault();
        goToSection(id);
    };

    // The [1]..[6] labels imply keyboard shortcuts, so make them real
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.metaKey || e.ctrlKey || e.altKey) return;

            // Don't hijack keys while the visitor is typing
            const el = document.activeElement;
            if (el && (el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName))) {
                return;
            }

            const item = NAV_ITEMS.find((i) => i.shortcut === e.key);
            if (!item) return;

            e.preventDefault();
            goToSection(item.id);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [goToSection]);

    // Keep the highlighted item in sync when scrolling, not just on click
    useEffect(() => {
        const sections = NAV_ITEMS
            .map((item) => document.getElementById(item.id))
            .filter(Boolean);

        if (sections.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

                if (visible.length > 0) setActiveSection(visible[0].target.id);
            },
            { rootMargin: '-80px 0px -60% 0px' }
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="terminalNavbar">
            <div className="navPrefix">MODE: NORMAL &gt;&gt;</div>
            <div className="navItems">
                {NAV_ITEMS.map((item) => (
                    <button
                        key={item.id}
                        onClick={(e) => handleNavClick(e, item.id)}
                        className={`navItem ${activeSection === item.id ? 'active' : ''}`}
                        title={`Press ${item.shortcut}`}
                    >
                        <span className="navKey">[{item.shortcut}]</span> {item.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
