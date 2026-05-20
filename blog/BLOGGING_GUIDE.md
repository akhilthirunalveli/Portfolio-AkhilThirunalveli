# Akhil's Portfolio Blog: Content Writing & Formatting Guide

This guide describes how to publish new blog posts to this Next.js repository. It includes the required JSON schema, steps to add posts, and a copy-pasteable AI prompt to convert rough drafts/notes into fully formatted blog posts.

---

## 1. How the Blog Works

Blog posts are stored as static JSON files in:
📁 `content/blogs/`

At build time or in development mode, the Next.js framework parses these JSON files and dynamically registers them as blog routes under `/blog/{slug}`.

---

## 2. Blog JSON Schema

Each blog post file must end with `.json` and follow this structure:

```json
{
  "slug": "unique-url-friendly-slug",
  "title": "Clear, engaging title",
  "tagline": "A one-sentence summary shown on cards and in SEO metadata.",
  "category": "Concept",
  "date": "May 20, 2026",
  "readTime": "6 min read",
  "views": 100,
  "thumbnail": "/thumbnails/default.svg",
  "content": "Markdown string containing the actual post body. Escape line breaks with \\n."
}
```

### Fields Description:
- **`slug`**: String. Lowercase, hyphen-separated url-friendly name (e.g. `react-server-components-guide`).
- **`title`**: String. The headline of the post.
- **`tagline`**: String. Subtext shown in list view and metadata descriptions.
- **`category`**: String. Must be one of: `"Learnings"`, `"Concept"`, `"Interviews"`, `"Experience"`, or `"Life Lessons"`.
- **`date`**: String. Displayed date (format: `MMM DD, YYYY`).
- **`readTime`**: String. Estimated reading speed (e.g. `8 min read`).
- **`views`**: Number. Initial view count placeholder (e.g. `120`).
- **`thumbnail`**: String. Path to the SVG/PNG image under public/thumbnails (or `/thumbnails/default.svg`).
- **`content`**: String (escaped markdown). The body of the blog, supporting headers (`##`), lists, bold text, images, and code blocks (` ```typescript `).

---

## 3. Step-by-Step Writing Workflow

1. **Write Notes**: Write down your rough thoughts or notes in a scratchpad or notes app.
2. **Convert using AI**: Copy your rough notes, open an AI chat session (with Gemini, Claude, or any LLM), paste the prompt template below, and paste your rough notes.
3. **Save the File**: Copy the generated JSON output. Create a new file in `content/blogs/your-post-slug.json`.
4. **Test Locally**: Run `npm run dev` and navigate to `http://localhost:3000/` to preview the post card and verify that the page displays correctly.

---

## 4. The LLM Prompt Template

Copy the entire block below and paste it into any AI interface alongside your rough draft/notes to get a perfectly formatted JSON file ready to save.

```markdown
You are an expert technical editor and content engineer. Your task is to take my rough notes or draft below and transform them into a clean, engaging, and production-ready blog post JSON matching the portfolio website's schema.

### SCHEMA INSTRUCTIONS:
Ensure the output is a single, valid JSON object with the following fields:
1. "slug": a lowercase, hyphen-separated string based on the title.
2. "title": a polished, engaging title.
3. "tagline": a single sentence summarizing the core value or content of the post.
4. "category": must be one of: "Learnings", "Concept", "Interviews", "Experience", "Life Lessons".
5. "date": use the current date in "MMM DD, YYYY" format.
6. "readTime": estimate the read time (e.g. "5 min read").
7. "views": set a random initial value between 50 and 200.
8. "thumbnail": set as "/thumbnails/default.svg" (or a descriptive filename if specific).
9. "content": a markdown string containing the post. Optimize it for readability.
   - Use headings (`##`, `###`) for structure.
   - Use bullet points, bold text for emphasis, and clean code blocks (` ```language `).
   - Ensure the markdown string is properly escaped (use literal `\n` for line breaks, escape double quotes `\"` within content, etc.).

---
### ROUGH NOTES:
[PASTE YOUR NOTES/DRAFT HERE]
```
