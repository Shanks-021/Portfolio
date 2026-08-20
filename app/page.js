import Link from 'next/link';
import data from '@/data/data.json';
import { getAllPosts } from '@/lib/blog';
import { homePageSchema, jsonLd } from '@/lib/schema';
import TechIcon from '@/components/TechIcon';
import Terminal from '@/components/Terminal';
import TerminalBlock from '@/components/TerminalBlock';
import AsciiArt from '@/components/AsciiArt';
import TerminalNavbar from '@/components/TerminalNavbar';
import Typewriter from '@/components/Typewriter';

export default function Home() {
  const posts = getAllPosts();
  const role = data.experience?.find((exp) => exp.current)?.role ?? 'AI Engineer';

  return (
    <div className="terminalPage">
      {/* Machine-readable copy of everything below, for search and LLM crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(homePageSchema(posts)) }}
      />

      <Terminal title="ojas@portfolio" path="~/about">
        <TerminalNavbar hasBlogs={posts.length > 0} />
        <main>
          {/* Welcome / whoami */}
          <TerminalBlock command="whoami">
            {/* The visible name is ASCII art, so the real one is spelled out here */}
            <h1 className="srOnly">{data.name} — {role}</h1>
            <AsciiArt />
            <div className="roleContainer">
              <span className="rolePrefix">Role:</span> <span className="roleText">{role}</span>
            </div>
            <p className="outputText">
              <Typewriter text={data.tagline} speed={40} delay={500} />
            </p>
          </TerminalBlock>

          {/* About */}
          <TerminalBlock command="cat about.txt" id="about" heading="About">
            <p className="outputText">
              <Typewriter text={data.description} speed={20} delay={2000} />
            </p>
          </TerminalBlock>

          {/* Tech Stack */}
          <TerminalBlock command="ls skills/" id="skills" heading="Skills and tech stack">
            <ul className="terminalSkills">
              {data.techStack.map((tech) => (
                <li key={tech}>
                  <TechIcon tech={tech} showLabel={true} variant="compact" />
                </li>
              ))}
            </ul>
          </TerminalBlock>

          {/* Links */}
          <TerminalBlock command="cat links.txt" heading="Links and contact">
            <div className="terminalLinks">
              <a href={data.resumeUrl} className="terminalLink" download>
                <span className="linkIcon" aria-hidden="true">📄</span> resume.pdf
              </a>
              <a href={`mailto:${data.email}`} className="terminalLink" rel="me">
                <span className="linkIcon" aria-hidden="true">📧</span> {data.email}
              </a>
              {data.socials?.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  className="terminalLink"
                  target="_blank"
                  rel="me noopener noreferrer"
                >
                  <span className="linkIcon" aria-hidden="true">🔗</span> {social.platform}
                </a>
              ))}
            </div>
          </TerminalBlock>

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <TerminalBlock command="cat experience.json | jq" id="experience" heading="Experience">
              {data.experience.map((exp, index) => (
                <article key={index} className="expEntry">
                  <div className="expHeader">
                    <h3 className="expCompany">{exp.company}</h3>
                    {exp.current && <span className="expCurrent">[ACTIVE]</span>}
                  </div>
                  <div className="expMeta">
                    <span className="expRole">{exp.role}</span>
                    <span className="expDates">{exp.startDate} → {exp.endDate || 'Present'}</span>
                  </div>
                  {exp.client && (
                    <div className="expLocation">
                      <span aria-hidden="true">🏢</span> Client: {exp.client}
                    </div>
                  )}
                  {exp.location && (
                    <div className="expLocation">
                      <span aria-hidden="true">📍</span> {exp.location}
                    </div>
                  )}
                  {exp.tools && (
                    <ul className="expTools">
                      {exp.tools.map((tool) => (
                        <li key={tool}>
                          <TechIcon tech={tool} showLabel={true} variant="badge" />
                        </li>
                      ))}
                    </ul>
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
                      <h4 className="expProjectName">
                        <span className="expProjectMarker" aria-hidden="true">▸</span> {proj.name}
                      </h4>
                      {proj.tools && (
                        <ul className="expTools">
                          {proj.tools.map((tool) => (
                            <li key={tool}>
                              <TechIcon tech={tool} showLabel={true} variant="badge" />
                            </li>
                          ))}
                        </ul>
                      )}
                      <ul className="expHighlights">
                        {proj.highlights.map((h, j) => (
                          <li key={j}>- {h}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </article>
              ))}
            </TerminalBlock>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <TerminalBlock command="ls -la projects/" id="projects" heading="Projects">
              {data.projects.map((project, index) => (
                <article key={index} className="expProject">
                  <h3 className="expProjectName">
                    <span className="expProjectMarker" aria-hidden="true">▸</span> {project.name}
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
                  </h3>
                  {project.techStack && (
                    <ul className="expTools">
                      {project.techStack.map((tech) => (
                        <li key={tech}>
                          <TechIcon tech={tech} showLabel={true} variant="badge" />
                        </li>
                      ))}
                    </ul>
                  )}
                  {project.highlights && (
                    <ul className="expHighlights">
                      {project.highlights.map((h, i) => (
                        <li key={i}>- {h}</li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </TerminalBlock>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <TerminalBlock command="cat education.txt" id="education" heading="Education">
              {data.education.map((edu, index) => (
                <article key={index} className="expEntry">
                  <div className="expHeader">
                    <h3 className="expCompany">{edu.institution}</h3>
                  </div>
                  <div className="expMeta">
                    <span className="expRole">{edu.degree}</span>
                    <span className="expDates">{edu.startDate} → {edu.endDate}</span>
                  </div>
                  {edu.location && (
                    <div className="expLocation">
                      <span aria-hidden="true">📍</span> {edu.location}
                    </div>
                  )}
                  {edu.detail && (
                    <div className="expLocation">
                      <span aria-hidden="true">🎓</span> {edu.detail}
                    </div>
                  )}
                </article>
              ))}
            </TerminalBlock>
          )}

          {/* Blogs */}
          {posts.length > 0 && (
            <TerminalBlock command="ls -la blog/" id="blogs" heading="Blog posts">
              <div className="postList">
                {posts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="postRow">
                    <div className="postRowHead">
                      <h3 className="postRowTitle">{post.title}</h3>
                      {post.date && (
                        <time className="postRowDate" dateTime={post.date}>
                          {post.date}
                        </time>
                      )}
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
        </main>

        {/* Prompt cursor */}
        <TerminalBlock showCursor />
      </Terminal>
    </div>
  );
}
