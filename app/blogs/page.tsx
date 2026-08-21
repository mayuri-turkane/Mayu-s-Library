"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSanityBlogs } from "../../lib/useSanityBlogs";
import { urlForImage } from "../../lib/sanityImage";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./blogs.css";

function formatDate(dateString?: string) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogsPage() {
  const { blogs, loading, error } = useSanityBlogs();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [largeText, setLargeText] = useState(false);

  const handleSearch = () => {
    router.push(`/?search=${encodeURIComponent(query)}`);
  };

  return (
    <main className={`blogs-page ${largeText ? "large-text" : ""}`}>
      <Navbar
        searchValue={query}
        onSearchChange={setQuery}
        onSearch={handleSearch}
        largeText={largeText}
        onToggleLargeText={() => setLargeText((v) => !v)}
      />

      <section className="blogs-hero">
        <div className="blogs-hero-glow" />
        <div className="blogs-container">
          <span className="eyebrow">MAYU&apos;S LIBRARY</span>
          <h1>
            Stories, Ideas <em>&amp; Reading</em>
          </h1>
          <p>
            Articles, book recommendations, reading tips, and stories from
            the Mayu&apos;s Library team.
          </p>
        </div>
      </section>

      <section className="blogs-body">
        <div className="blogs-container">
          {loading && (
            <div className="blogs-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <div className="blog-card blog-card-skeleton" key={i}>
                  <div className="blog-card-image-skeleton" />
                  <div className="blog-skeleton-line long" />
                  <div className="blog-skeleton-line short" />
                </div>
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="blogs-empty">
              <span>📚</span>
              <h2>Unable to load blogs right now</h2>
              <p>Please refresh the page or check back shortly.</p>
            </div>
          )}

          {!loading && !error && blogs.length === 0 && (
            <div className="blogs-empty">
              <span>✦</span>
              <h2>No stories published yet</h2>
              <p>New articles are on the way — check back soon.</p>
            </div>
          )}

          {!loading && !error && blogs.length > 0 && (
            <div className="blogs-grid">
              {blogs.map((blog: any) => {
                const image = urlForImage(blog.featured, 600);

                return (
                  <Link
                    href={`/blogs/${blog.slug.current}`}
                    className="blog-card"
                    key={blog._id}
                  >
                    <div className="blog-card-image">
                      {image ? (
                        <Image
                          src={image}
                          alt={blog.title || "Blog cover"}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="blog-card-no-image">
                          <span>✦</span>
                        </div>
                      )}
                    </div>

                    <div className="blog-card-content">
                      {blog.publishedAt && (
                        <span className="blog-card-date">
                          {formatDate(blog.publishedAt)}
                        </span>
                      )}

                      <h3>{blog.title}</h3>

                      {blog.excerpt && <p>{blog.excerpt}</p>}

                      <span className="blog-card-link">
                        Read article <i>→</i>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}