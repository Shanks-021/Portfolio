import { ImageResponse } from 'next/og';
import { SITE_DESCRIPTION } from '@/lib/site';

export const alt = 'Ojas Soni — AI Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Social card, rendered as a terminal window to match the site.
 * Uses the default font rather than fetching JetBrains Mono so the build
 * never depends on a network call.
 */
export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#010409',
                    padding: 48,
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        height: '100%',
                        background: '#0d1117',
                        border: '1px solid #30363d',
                        borderRadius: 16,
                        overflow: 'hidden',
                    }}
                >
                    {/* Title bar */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            padding: '20px 28px',
                            background: '#161b22',
                            borderBottom: '1px solid #30363d',
                        }}
                    >
                        <div style={{ width: 16, height: 16, borderRadius: 8, background: '#ff5f57' }} />
                        <div style={{ width: 16, height: 16, borderRadius: 8, background: '#28c840' }} />
                        <div style={{ marginLeft: 24, color: '#8b949e', fontSize: 24 }}>
                            ojas@portfolio ~/about
                        </div>
                    </div>

                    {/* Body */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            flex: 1,
                            padding: '0 56px',
                        }}
                    >
                        <div style={{ display: 'flex', color: '#7ee787', fontSize: 28, marginBottom: 20 }}>
                            $ whoami
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                color: '#c9d1d9',
                                fontSize: 88,
                                fontWeight: 700,
                                letterSpacing: -2,
                            }}
                        >
                            Ojas Soni
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                color: '#58a6ff',
                                fontSize: 40,
                                fontWeight: 600,
                                marginTop: 8,
                                letterSpacing: 2,
                            }}
                        >
                            AI ENGINEER
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                color: '#8b949e',
                                fontSize: 26,
                                marginTop: 28,
                                lineHeight: 1.5,
                                maxWidth: 900,
                            }}
                        >
                            {SITE_DESCRIPTION}
                        </div>
                    </div>
                </div>
            </div>
        ),
        size
    );
}
