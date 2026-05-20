"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, ArrowRight } from "@phosphor-icons/react";
import { categories, type Category, type BlogPost } from "@/lib/blog-types";
import SubscribeModal from "./components/SubscribeModal";

function formatViews(views: number): string {
  if (views >= 1000) return `${(views / 1000).toFixed(1)}k`;
  return views.toString();
}

export default function BlogListClient({ allPosts }: { allPosts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState<Category>("Recent");
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [siteViews, setSiteViews] = useState<number>(0);

  useEffect(() => {
    const baseViews = allPosts.reduce((sum, post) => sum + (post.views || 0), 0);
    const storedViews = localStorage.getItem("site_views");
    let currentViews = storedViews ? parseInt(storedViews, 10) : baseViews;
    
    currentViews += 1;
    localStorage.setItem("site_views", currentViews.toString());
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSiteViews(currentViews);
  }, [allPosts]);

  const filteredPosts = activeCategory === "Recent"
    ? [...allPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    : allPosts.filter((post) => post.category === activeCategory);

  const interviewPosts = allPosts.filter(
    (post) => post.category === "Interviews" || post.category === "Experience"
  );
  const hasInterviews = interviewPosts.length > 0;

  return (
    <main>
      {/* Header */}
      <header className="blog-header">
        <div className="blog-header__left">
          <h1>Blog</h1>
          <p>&nbsp;<em>Written by Akhil Thirunalveli</em></p>
        </div>
        <div className="blog-header__right">
          {siteViews > 0 && (
            <div className="blog-header__views-counter">
              <Eye size={16} />
              <span>{siteViews.toLocaleString()} views</span>
            </div>
          )}
          <Link
            href="https://akhil.world/"
            className="blog-header__btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            About
          </Link>
          <button
            className="blog-header__btn blog-header__btn--subscribe"
            onClick={() => setShowSubscribe(true)}
          >
            Subscribe
          </button>
        </div>
      </header>

      {/* Category Bar */}
      <nav className="category-bar" aria-label="Blog categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-pill ${activeCategory === cat ? "category-pill--active" : ""
              }`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      <div className={`main-layout ${!hasInterviews ? "main-layout--full" : ""}`}>
        {/* Blog Cards */}
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
                  <span className="blog-card__date">{post.date}</span>
                </div>
                <h2 className="blog-card__title">{post.title}</h2>
                <p className="blog-card__tagline">{post.tagline}</p>
                <div className="blog-card__footer">
                  <span className="blog-card__read-time">{post.readTime}</span>
                  <span className="blog-card__divider" aria-hidden="true" />
                  <span className="blog-card__views">
                    <Eye size={16} weight="bold" /> {formatViews(post.views)} views
                  </span>
                  <span className="blog-card__read-more">
                    Read article <ArrowRight size={16} weight="bold" />
                  </span>
                </div>
              </div>
            </Link>
          ))}

          {filteredPosts.length === 0 && (
            <div className="blog-empty-state">
              <div className="blog-empty-state__icon">
                <svg width="140" height="110" viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="0" y1="20" x2="180" y2="20" stroke="var(--blueprint)" strokeWidth="0.5" opacity="0.1" />
                  <line x1="0" y1="50" x2="180" y2="50" stroke="var(--blueprint)" strokeWidth="0.5" opacity="0.1" />
                  <line x1="0" y1="80" x2="180" y2="80" stroke="var(--blueprint)" strokeWidth="0.5" opacity="0.1" />
                  <line x1="0" y1="110" x2="180" y2="110" stroke="var(--blueprint)" strokeWidth="0.5" opacity="0.1" />
                  <line x1="30" y1="0" x2="30" y2="140" stroke="var(--blueprint)" strokeWidth="0.5" opacity="0.1" />
                  <line x1="60" y1="0" x2="60" y2="140" stroke="var(--blueprint)" strokeWidth="0.5" opacity="0.1" />
                  <line x1="90" y1="0" x2="90" y2="140" stroke="var(--blueprint)" strokeWidth="0.5" opacity="0.1" />
                  <line x1="120" y1="0" x2="120" y2="140" stroke="var(--blueprint)" strokeWidth="0.5" opacity="0.1" />
                  <line x1="150" y1="0" x2="150" y2="140" stroke="var(--blueprint)" strokeWidth="0.5" opacity="0.1" />

                  <path d="M 40,75 A 35,35 0 0,1 110,75" stroke="var(--blueprint)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />

                  <polygon points="50,20 50,110 140,110" stroke="var(--blueprint)" strokeWidth="1.5" strokeLinejoin="round" />
                  <polygon points="65,50 65,95 110,95" stroke="var(--blueprint)" strokeWidth="1" strokeDasharray="3 2" opacity="0.4" />

                  <rect x="20" y="115" width="140" height="10" stroke="var(--blueprint)" strokeWidth="1.2" strokeLinejoin="round" fill="var(--bg-surface)" />
                  <line x1="30" y1="115" x2="30" y2="120" stroke="var(--blueprint)" strokeWidth="1" opacity="0.8" />
                  <line x1="40" y1="115" x2="40" y2="118" stroke="var(--blueprint)" strokeWidth="1" opacity="0.5" />
                  <line x1="50" y1="115" x2="50" y2="120" stroke="var(--blueprint)" strokeWidth="1" opacity="0.8" />
                  <line x1="60" y1="115" x2="60" y2="118" stroke="var(--blueprint)" strokeWidth="1" opacity="0.5" />
                  <line x1="70" y1="115" x2="70" y2="120" stroke="var(--blueprint)" strokeWidth="1" opacity="0.8" />
                  <line x1="80" y1="115" x2="80" y2="118" stroke="var(--blueprint)" strokeWidth="1" opacity="0.5" />
                  <line x1="90" y1="115" x2="90" y2="120" stroke="var(--blueprint)" strokeWidth="1" opacity="0.8" />
                  <line x1="100" y1="115" x2="100" y2="118" stroke="var(--blueprint)" strokeWidth="1" opacity="0.5" />
                  <line x1="110" y1="115" x2="110" y2="120" stroke="var(--blueprint)" strokeWidth="1" opacity="0.8" />
                  <line x1="120" y1="115" x2="120" y2="118" stroke="var(--blueprint)" strokeWidth="1" opacity="0.5" />
                  <line x1="130" y1="115" x2="130" y2="120" stroke="var(--blueprint)" strokeWidth="1" opacity="0.8" />
                  <line x1="140" y1="115" x2="140" y2="118" stroke="var(--blueprint)" strokeWidth="1" opacity="0.5" />
                  <line x1="150" y1="115" x2="150" y2="120" stroke="var(--blueprint)" strokeWidth="1" opacity="0.8" />

                  <g transform="translate(130, 95) rotate(-35)">
                    <path d="M 0,0 L 5,-15 L 20,-15 L 20,5 L 5,5 Z" fill="var(--bg-surface)" stroke="var(--blueprint)" strokeWidth="1" />
                    <path d="M 0,0 L 5,-5 L 5,5 Z" fill="var(--ink-soft)" />
                    <polygon points="0,0 -5,-2 -5,2" fill="var(--blueprint)" />
                  </g>
                  
                  <circle cx="50" cy="20" r="3" stroke="var(--blueprint)" strokeWidth="0.8" fill="var(--bg)" />
                  <line x1="44" y1="20" x2="56" y2="20" stroke="var(--blueprint)" strokeWidth="0.8" />
                  <line x1="50" y1="14" x2="50" y2="26" stroke="var(--blueprint)" strokeWidth="0.8" />
                  
                  <circle cx="140" cy="110" r="3" stroke="var(--blueprint)" strokeWidth="0.8" fill="var(--bg)" />
                  <line x1="134" y1="110" x2="146" y2="110" stroke="var(--blueprint)" strokeWidth="0.8" />
                  <line x1="140" y1="104" x2="140" y2="116" stroke="var(--blueprint)" strokeWidth="0.8" />
                </svg>
              </div>
              <h3 className="blog-empty-state__title">Drafting in Progress</h3>
              <p className="blog-empty-state__description">
                {activeCategory === "Recent"
                  ? "No posts have been published on this blog yet. I'm currently drafting a few ideas—check back soon!"
                  : `No posts found in the "${activeCategory}" category yet. Feel free to explore other topics or check back later.`}
              </p>
              <div className="blog-empty-state__actions">
                {activeCategory !== "Recent" && (
                  <button
                    onClick={() => setActiveCategory("Recent")}
                    className="blog-empty-state__btn blog-empty-state__btn--primary"
                  >
                    View Recent
                  </button>
                )}
                <button
                  onClick={() => setShowSubscribe(true)}
                  className="blog-empty-state__btn"
                >
                  Subscribe
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Interview Experiences Sidebar */}
        {hasInterviews && (
          <aside className="interview-sidebar">
            <div className="interview-sidebar__header">
              <h3>Interview Experiences</h3>
              <p>Notes and learnings from my technical interviews.</p>
            </div>

            <div className="interview-list">
              {interviewPosts.map((post) => (
                <Link href={`/blog/${post.slug}`} key={post.slug} className="interview-card">
                  <div className="interview-card__company">{post.title}</div>
                  <div className="interview-card__role">{post.tagline}</div>
                </Link>
              ))}
            </div>
          </aside>
        )}
      </div>

      {/* Subscribe Modal */}
      <SubscribeModal
        isOpen={showSubscribe}
        onClose={() => setShowSubscribe(false)}
      />
    </main>
  );
}
