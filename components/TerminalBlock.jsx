'use client';

/**
 * TerminalBlock - A single command + output block
 * @param {string} command - The command to display (e.g., "cat about.txt")
 * @param {React.ReactNode} children - The output content
 * @param {boolean} showCursor - Whether to show blinking cursor instead of output
 */
export default function TerminalBlock({ command, children, showCursor = false, id }) {
    return (
        <div className="terminalBlock" id={id}>
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
        </div>
    );
}
