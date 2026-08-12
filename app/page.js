import Link from 'next/link';
import data from '@/data/data.json';
import { getAllPosts } from '@/lib/blog';
import TechIcon from '@/components/TechIcon';
import Terminal from '@/components/Terminal';
import TerminalBlock from '@/components/TerminalBlock';
import AsciiArt from '@/components/AsciiArt';
import TerminalNavbar from '@/components/TerminalNavbar';
import Typewriter from '@/components/Typewriter';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="terminalPage">
      <Terminal title="ojas@portfolio" path="~/about">
        <TerminalNavbar hasBlogs={posts.length > 0} />
        {/* Welcome / whoami */}
        <TerminalBlock command="whoami">
          <AsciiArt />
          <div className="roleContainer">
            <span className="rolePrefix">Role:</span> <span className="roleText">AI Engineer</span>
          </div>
          <p className="outputText">
            <Typewriter text={data.tagline} speed={40} delay={500} />
          </p>
        </TerminalBlock>

        {/* About */}
        <TerminalBlock command="cat about.txt" id="about">
          <p className="outputText">
             <Typewriter text={data.description} speed={20} delay={2000} />
          </p>
        </TerminalBlock>

        {/* Tech Stack */}
        <TerminalBlock command="ls skills/" id="skills">
          <div className="terminalSkills">
            {data.techStack.map((tech) => (
              <TechIcon key={tech} tech={tech} showLabel={true} variant="compact" />
            ))}
          </div>
        </TerminalBlock>

        {/* Links */}
        <TerminalBlock command="cat links.txt">
          <div className="terminalLinks">
            <a href={data.resumeUrl} className="terminalLink" download>
              <span className="linkIcon">📄</span> resume.pdf
            </a>
            <a href={`mailto:${data.email}`} className="terminalLink">
              <span className="linkIcon">📧</span> {data.email}
            </a>
            {data.socials?.map((social) => (
              <a 
                key={social.platform} 
                href={social.url} 
                className="terminalLink"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="linkIcon">🔗</span> {social.platform}
              </a>
            ))}
          </div>
        </TerminalBlock>

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <TerminalBlock command="cat experience.json | jq" id="experience">
            {data.experience.map((exp, index) => (
              <div key={index} className="expEntry">
                <div className="expHeader">
                  <span className="expCompany">{exp.company}</span>
                  {exp.current && <span className="expCurrent">[ACTIVE]</span>}
                </div>
                <div className="expMeta">
                  <span className="expRole">{exp.role}</span>
                  <span className="expDates">{exp.startDate} → {exp.endDate || 'Present'}</span>
                </div>
                {exp.client && <div className="expLocation">🏢 Client: {exp.client}</div>}
                {exp.location && <div className="expLocation">📍 {exp.location}</div>}
                {exp.tools && (
                  <div className="expTools">
                    {exp.tools.map((tool) => (
                      <TechIcon key={tool} tech={tool} showLabel={true} variant="badge" />
                    ))}
                  </div>
                )}
                {exp.highlights && (
                  <ul className="expHighlights">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>- {h}</li>
                    ))}
                  </ul>
                )}
                {exp.projects?.map((proj, i) => (
                  <div key={i} className="expProject">
                    <div className="expProjectName">
                      <span className="expProjectMarker">▸</span> {proj.name}
                    </div>
                    {proj.tools && (
                      <div className="expTools">
                        {proj.tools.map((tool) => (
                          <TechIcon key={tool} tech={tool} showLabel={true} variant="badge" />
                        ))}
                      </div>
                    )}
                    <ul className="expHighlights">
                      {proj.highlights.map((h, j) => (
                        <li key={j}>- {h}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </TerminalBlock>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <TerminalBlock command="ls -la projects/" id="projects">
            {data.projects.map((project, index) => (
              <div key={index} className="expProject">
                <div className="expProjectName">
                  <span className="expProjectMarker">▸</span> {project.name}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="projectIcon"
                      aria-label={`${project.name} on GitHub`}
                    >
                      ↗
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="projectIcon"
                      aria-label={`${project.name} live site`}
                    >
                      ↗
                    </a>
                  )}
                </div>
                {project.techStack && (
                  <div className="expTools">
                    {project.techStack.map((tech) => (
                      <TechIcon key={tech} tech={tech} showLabel={true} variant="badge" />
                    ))}
                  </div>
                )}
                {project.highlights && (
                  <ul className="expHighlights">
                    {project.highlights.map((h, i) => (
                      <li key={i}>- {h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </TerminalBlock>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <TerminalBlock command="cat education.txt" id="education">
            {data.education.map((edu, index) => (
              <div key={index} className="expEntry">
                <div className="expHeader">
                  <span className="expCompany">{edu.institution}</span>
                </div>
                <div className="expMeta">
                  <span className="expRole">{edu.degree}</span>
                  <span className="expDates">{edu.startDate} → {edu.endDate}</span>
                </div>
                {edu.location && <div className="expLocation">📍 {edu.location}</div>}
                {edu.detail && <div className="expLocation">🎓 {edu.detail}</div>}
              </div>
            ))}
          </TerminalBlock>
        )}

        {/* Blogs */}
        {posts.length > 0 && (
          <TerminalBlock command="ls -la blog/" id="blogs">
            <div className="postList">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="postRow">
                  <div className="postRowHead">
                    <span className="postRowTitle">{post.title}</span>
                    <span className="postRowDate">{post.date}</span>
                  </div>
                  {post.summary && <p className="postRowSummary">{post.summary}</p>}
                  {post.tags?.length > 0 && (
                    <div className="postTags">
                      {post.tags.map((tag) => (
                        <span key={tag} className="postTag">#{tag}</span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </TerminalBlock>
        )}

        {/* Prompt cursor */}
        <TerminalBlock showCursor />
      </Terminal>
    </div>
  );
}
