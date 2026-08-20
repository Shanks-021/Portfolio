'use client';

/**
 * TerminalBlock - A single command + output block
 * @param {string} command - The command to display (e.g., "cat about.txt")
 * @param {React.ReactNode} children - The output content
 * @param {boolean} showCursor - Whether to show blinking cursor instead of output
 * @param {string} heading - Plain-language section title. `cat about.txt` reads as
 *                           a heading to a human, but not to a crawler or a screen
 *                           reader, so a block with one becomes a titled <section>.
 */
export default function TerminalBlock({ command, children, showCursor = false, id, heading }) {
    const Wrapper = heading ? 'section' : 'div';
    const headingId = heading ? `${id ?? heading.toLowerCase()}-heading` : undefined;

    return (
        <Wrapper className="terminalBlock" id={id} aria-labelledby={headingId}>
            {heading && (
                <h2 className="srOnly" id={headingId}>
                    {heading}
                </h2>
            )}
            <div className="cmdLine">
                <span className="prompt">$</span>
                {command && <span className="cmd">{command}</span>}
                {showCursor && <span className="cursor"></span>}
            </div>
            {children && (
                <div className="output">
                    {children}
                </div>
            )}
        </Wrapper>
    );
}
