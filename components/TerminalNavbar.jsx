'use client';

import { useState, useEffect } from 'react';
import VisitorCounter from './VisitorCounter';

export default function TerminalNavbar() {
    // We'll track the active section based on scroll position
    const [activeSection, setActiveSection] = useState('about');

    const navItems = [
        { id: 'about', label: 'about', shortcut: '1' },
        { id: 'skills', label: 'skills', shortcut: '2' },
        { id: 'experience', label: 'experience', shortcut: '3' },
        { id: 'projects', label: 'projects', shortcut: '4' },
        { id: 'education', label: 'education', shortcut: '5' },
        { id: 'blogs', label: 'blogs', shortcut: '6' },
    ];

    const handleNavClick = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            // Offset for the sticky header
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
            setActiveSection(id);
        }
    };

    return (
        <div className="terminalNavbar">
            <div className="navPrefix">MODE: NORMAL &gt;&gt;</div>
            <div className="navItems">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={(e) => handleNavClick(e, item.id)}
                        className={`navItem ${activeSection === item.id ? 'active' : ''}`}
                    >
                        <span className="navKey">[{item.shortcut}]</span> {item.label}
                    </button>
                ))}
            </div>
            <div style={{ marginLeft: 'auto' }}>
                <VisitorCounter />
            </div>
        </div>
    );
}
