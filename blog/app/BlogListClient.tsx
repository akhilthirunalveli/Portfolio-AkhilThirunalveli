"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, ArrowRight } from "@phosphor-icons/react";
import { categories, type Category, type BlogPost } from "@/lib/blog-types";

function formatViews(views: number): string {
  if (views >= 1000) return `${(views / 1000).toFixed(1)}k`;
  return views.toString();
}

const categoryIcons: Record<Category, string> = {
  Recent: "⟡",
  Learnings: "◈",
  Concept: "△",
  Interviews: "☐",
  Experience: "◎",
  "Life Lessons": "✦",
};



export default function BlogListClient({ allPosts }: { allPosts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState<Category>("Recent");

  const filteredPosts = activeCategory === "Recent"
    ? [...allPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    : allPosts.filter(p => p.category === activeCategory);

  return (
    <main>
      {/* ─── Header ─── */}
      <header className="blog-header">
        <div className="blog-header__left">
          <h1>Blog</h1>
          <p>Written by Akhil Thirunalveli</p>
        </div>
        <div className="blog-header__right">
          <Link href="/about" className="blog-header__btn">
            About
          </Link>
          <button className="blog-header__btn blog-header__btn--subscribe">
            Subscribe
          </button>
        </div>
      </header>

      {/* ─── Category Bar ─── */}
      <nav className="category-bar" aria-label="Blog categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-pill ${
              activeCategory === cat ? "category-pill--active" : ""
            }`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      <div className="main-layout">
        {/* ─── Blog Cards ─── */}
        <section className="blog-grid" aria-label="Blog posts">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-card"
            >


              <div className="blog-card__body">
                <div className="blog-card__meta">
                  <span className="blog-card__category">{post.category}</span>
                  <span className="blog-card__date">
                    {post.date} · {post.readTime}
                  </span>
                </div>
                <h2 className="blog-card__title">{post.title}</h2>
                <p className="blog-card__tagline">{post.tagline}</p>
              </div>

              <div className="blog-card__footer">
                <span className="blog-card__views">
                  <Eye size={16} weight="bold" /> {formatViews(post.views)} views
                </span>
                <span className="blog-card__read-more">Read <ArrowRight size={16} weight="bold" /></span>
              </div>
            </Link>
          ))}

          {filteredPosts.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "60px 0",
                fontFamily: "var(--font-mono)",
                fontSize: "0.85rem",
                color: "var(--ink-faint)",
              }}
            >
              No posts in this category yet. Check back soon.
            </div>
          )}
        </section>

        {/* ─── Interview Experiences Sidebar ─── */}
        <aside className="interview-sidebar">
          <div className="interview-sidebar__header">
            <h3>Interview Experiences</h3>
            <p>Notes and learnings from my technical interviews.</p>
          </div>
          
          <div className="interview-list">
            <Link href="#" className="interview-card">
              <div className="interview-card__company">Google</div>
              <div className="interview-card__role">Software Engineer Intern</div>
              <div className="interview-card__status status--offer">Offer</div>
            </Link>
            <Link href="#" className="interview-card">
              <div className="interview-card__company">Amazon</div>
              <div className="interview-card__role">SDE I</div>
              <div className="interview-card__status status--upcoming">Upcoming</div>
            </Link>
            <Link href="#" className="interview-card">
              <div className="interview-card__company">Meta</div>
              <div className="interview-card__role">Front-End Engineer</div>
              <div className="interview-card__status status--completed">Completed</div>
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
