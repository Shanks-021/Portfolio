---
title: "Why RAG Pipelines Fail in Production"
date: "2026-08-12"
summary: "Retrieval quality, not model quality, is what breaks most RAG systems once real users show up."
tags: ["rag", "llm", "retrieval"]
---

This is an example post so the blog section has something to render. Delete this
file and write your own — every `.md` file in `content/blog/` becomes a post
automatically.

## Writing a post

Create a file like `content/blog/my-post.md`. The frontmatter block at the top
controls how it appears in the listing:

- `title` — shown as the post heading and in the listing
- `date` — `YYYY-MM-DD`, used to sort posts newest-first
- `summary` — the one-line description in the listing
- `tags` — optional list, rendered as badges
- `draft: true` — optional, hides the post from the listing and the site

The filename becomes the URL, so this post lives at `/blog/hello-world`.

## Markdown works as expected

You get headings, **bold**, _italics_, [links](https://www.google.com), lists,
blockquotes, and code:

```python
def retrieve(query: str, k: int = 5):
    embedding = embed(query)
    return vector_store.search(embedding, top_k=k)
```

> Chunking strategy matters more than which embedding model you pick.

That's the whole workflow — write the file, save, and it shows up.
