"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Eye, Clock, CalendarBlank } from "@phosphor-icons/react";
import type { BlogPost } from "@/lib/blog-types";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function parseMarkdown(content: string): string {
  let html = content;

  // Code blocks (``` ... ```)
  html = html.replace(
    /```(\w+)?\n([\s\S]*?)```/g,
    (_match, _lang, code) =>
      `<pre><code>${code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .trim()}</code></pre>`
  );

  // Inline code
  html = html.replace(
    /`([^`]+)`/g,
    "<code>$1</code>"
  );

  // Tables
  html = html.replace(
    /(?:^|\n)((?:\|[^\n]+\|\n)+)/g,
    (_match, tableBlock: string) => {
      const rows = tableBlock.trim().split("\n");
      if (rows.length < 2) return tableBlock;

      const headerCells = rows[0]
        .split("|")
        .filter((c: string) => c.trim())
        .map((c: string) => `<th>${c.trim()}</th>`)
        .join("");

      const bodyRows = rows
        .slice(2)
        .map((row: string) => {
          const cells = row
            .split("|")
            .filter((c: string) => c.trim())
            .map((c: string) => `<td>${c.trim()}</td>`)
            .join("");
          return `<tr>${cells}</tr>`;
        })
        .join("");

      return `<table><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table>`;
    }
  );

  // Headings - add IDs for TOC linking
  html = html.replace(/^### (.+)$/gm, (_match, text) => {
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    return `<h3 id="${id}">${text}</h3>`;
  });

  html = html.replace(/^## (.+)$/gm, (_match, text) => {
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    return `<h2 id="${id}">${text}</h2>`;
  });

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // Italic
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Blockquotes
  html = html.replace(
    /^> (.+)$/gm,
    "<blockquote>$1</blockquote>"
  );

  // Unordered lists
  html = html.replace(
    /(?:^|\n)((?:- .+\n?)+)/g,
    (_match, listBlock: string) => {
      const items = listBlock
        .trim()
        .split("\n")
        .map((line: string) => `<li>${line.replace(/^- /, "")}</li>`)
        .join("");
      return `<ul>${items}</ul>`;
    }
  );

  // Ordered lists
  html = html.replace(
    /(?:^|\n)((?:\d+\. .+\n?)+)/g,
    (_match, listBlock: string) => {
      const items = listBlock
        .trim()
        .split("\n")
        .map((line: string) => `<li>${line.replace(/^\d+\. /, "")}</li>`)
        .join("");
      return `<ol>${items}</ol>`;
    }
  );

  // Paragraphs - wrap remaining standalone lines
  html = html
    .split("\n\n")
    .map((block: string) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (
        trimmed.startsWith("<h") ||
        trimmed.startsWith("<pre") ||
        trimmed.startsWith("<ul") ||
        trimmed.startsWith("<ol") ||
        trimmed.startsWith("<table") ||
        trimmed.startsWith("<blockquote")
      ) {
        return trimmed;
      }
      return `<p>${trimmed}</p>`;
    })
    .join("\n");

  return html;
}

function extractTocItems(content: string): TocItem[] {
  const items: TocItem[] = [];
  const regex = /^(#{2,3}) (.+)$/gm;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2];
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    items.push({ id, text, level });
  }

  return items;
}

function formatViews(views: number): string {
  if (views >= 1000) return `${(views / 1000).toFixed(1)}k`;
  return views.toString();
}

export default function BlogPostClient({ post }: { post: BlogPost }) {
  const tocItems = useMemo(() => extractTocItems(post.content), [post.content]);
  const htmlContent = useMemo(() => parseMarkdown(post.content), [post.content]);

  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = tocItems
        .map((item) => document.getElementById(item.id))
        .filter(Boolean) as HTMLElement[];

      if (headingElements.length === 0) return;

      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 60;

      if (atBottom) {
        setActiveId(headingElements[headingElements.length - 1].id);
        return;
      }

      let found = headingElements[0].id;
      for (const el of headingElements) {
        if (el.getBoundingClientRect().top <= 140) {
          found = el.id;
        }
      }

      setActiveId((prev) => (prev !== found ? found : prev));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [tocItems]);

  return (
    <div className="post-page">
      <article className="post-content">
        <Link href="/" className="post-back">
          <ArrowLeft size={16} weight="bold" /> Back to Blog
        </Link>

        <h1 className="post-title">{post.title}</h1>

        <div className="post-meta-bar">
          <div className="post-author">
            Written by <strong>Akhil Thirunalveli</strong>
          </div>
          <div className="post-stats">
            <span><Eye size={16} weight="bold" /> {formatViews(post.views)} views</span>
            <span><Clock size={16} weight="bold" /> {post.readTime}</span>
            <span><CalendarBlank size={16} weight="bold" /> {post.date}</span>
          </div>
        </div>

        <div
          className="post-body"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>

      {tocItems.length > 0 && (
        <aside className="toc-sidebar">
          <div className="toc-card">
            <p className="toc-sidebar__label">On this page</p>
            <nav className="toc-list" aria-label="Table of contents">
              {tocItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`toc-link ${
                    item.level === 3 ? "toc-link--h3" : ""
                  } ${activeId === item.id ? "toc-link--active" : ""}`.trim()}
                >
                  <span className="toc-link__indicator" aria-hidden="true" />
                  <span>{item.text}</span>
                </a>
              ))}
            </nav>
          </div>
        </aside>
      )}
    </div>
  );
}
