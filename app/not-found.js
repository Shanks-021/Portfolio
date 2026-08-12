import Link from 'next/link';
import Terminal from '@/components/Terminal';
import TerminalBlock from '@/components/TerminalBlock';

export const metadata = {
    title: '404 — command not found',
};

export default function NotFound() {
    return (
        <div className="terminalPage">
            <Terminal title="ojas@portfolio" path="~/404" closeHref="/">
                <TerminalBlock command="cd ./that-page">
                    <p className="outputText notFoundError">
                        bash: cd: ./that-page: No such file or directory
                    </p>
                </TerminalBlock>

                <TerminalBlock command="ls ~/">
                    <div className="terminalLinks">
                        <Link href="/#about" className="terminalLink">
                            <span className="linkIcon">📁</span> about
                        </Link>
                        <Link href="/#experience" className="terminalLink">
                            <span className="linkIcon">📁</span> experience
                        </Link>
                        <Link href="/#projects" className="terminalLink">
                            <span className="linkIcon">📁</span> projects
                        </Link>
                        <Link href="/#blogs" className="terminalLink">
                            <span className="linkIcon">📁</span> blog
                        </Link>
                    </div>
                </TerminalBlock>

                <TerminalBlock command="cd ~">
                    <Link href="/" className="terminalLink">
                        <span className="linkIcon">←</span> back to portfolio
                    </Link>
                </TerminalBlock>

                <TerminalBlock showCursor />
            </Terminal>
        </div>
    );
}
