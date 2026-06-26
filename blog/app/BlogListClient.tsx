"use client";

import { useState } from "react";
import Link from "next/link";
import { categories, type Category, type BlogPost } from "@/lib/blog-types";
import { useScrollAnimation } from "@/app/hooks/useIntersectionObserver";
import { MagnifyingGlass } from "@phosphor-icons/react";

function formatViews(views: number): string {
  if (views >= 1000) return `${(views / 1000).toFixed(1)}k`;
  return views.toString();
}

export default function BlogListClient({ allPosts }: { allPosts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState<Category>("Recent");

  useScrollAnimation();

  const filteredPosts = activeCategory === "Recent"
    ? [...allPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    : allPosts.filter(p => p.category === activeCategory);

  return (
    <>
      {/* ─── Header ─── */}
      <header className="blog-header">
        <div className="blog-header__left">
          <h1>Blog</h1>
          <p>Written by Akhil Thirunalveli</p>
        </div>
      </header>

      {/* ─── Category Bar ─── */}
      <nav className="category-bar" aria-label="Blog categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-pill ${activeCategory === cat ? "category-pill--active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      <div className="main-layout">
        {/* ─── Blog Cards ─── */}
        <section className="blog-grid" aria-label="Blog posts">
          {filteredPosts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`blog-card ${index === 0 && filteredPosts.length > 1 ? 'blog-card--featured' : ''}`}
              style={{ animationDelay: `${index * 80}ms` }}
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
                  ◉ {formatViews(post.views)} views
                </span>
                <span className="blog-card__read-more">Read →</span>
              </div>
            </Link>
          ))}

          {filteredPosts.length === 0 && (
            <div className="blog-empty-state">
              <div className="blog-empty-state__icon">
                <MagnifyingGlass size={32} weight="bold" color="var(--blueprint)" />
              </div>
              <h3 className="blog-empty-state__title">No Posts Yet</h3>
              <p className="blog-empty-state__description">
                No posts in this category yet. Check back soon or explore other categories.
              </p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
