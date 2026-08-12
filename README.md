# Ojas Soni — Portfolio

Terminal-styled personal portfolio built with Next.js (App Router).

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing content

Nearly everything on the page comes from a single file: **`data/data.json`**.
Name, tagline, about text, skills, links, experience, projects, and education
all live there — edit that file and the page updates. No component changes needed.

A few things live in code:

| What | Where |
| --- | --- |
| ASCII name banner | `components/AsciiArt.jsx` |
| Page title / SEO description | `app/layout.js` |
| Tech icon → logo mapping | `components/TechIcon.jsx` |
| Section order and headings | `app/page.js` |
| Colors, layout, theme | `app/globals.css` |
| Resume PDF | `public/OjasSoni_Resume.pdf` |
| Blog posts | `content/blog/*.md` |

## Writing a blog post

Create a markdown file in `content/blog/`. The filename becomes the URL —
`content/blog/my-post.md` is served at `/blog/my-post` — and the post appears
automatically in the `[6] blogs` section, sorted newest first.

```markdown
---
title: "Your post title"
date: "2026-08-20"
summary: "One line shown in the listing."
tags: ["rag", "llm"]
---

Your post body in **markdown**.
```

Set `draft: true` in the frontmatter to keep a post off the site while you work
on it. No other step is needed — no index to update, no rebuild config.

### Adding a skill

Add the key to `techStack` in `data/data.json`. If `components/TechIcon.jsx` has a
matching entry it renders with a logo; otherwise it falls back to a text-only badge,
which is what the AI/ML tools (LangGraph, CrewAI, FAISS, …) use since devicon has no
glyphs for them.

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com/new). No environment
variables or build configuration required.
