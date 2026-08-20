"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useSanityPost } from "../../../lib/useSanityPost";
import { urlForImage } from "../../../lib/sanityImage";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ArticleBody from "./ArticleBody";
import "../blogs.css";

function formatDate(dateString?: string) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug ?? "";

  const { post, loading, error } = useSanityPost(slug);
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [largeText, setLargeText] = useState(false);

  const handleSearch = () => {
    router.push(`/?search=${encodeURIComponent(query)}`);
  };

  const image = post ? urlForImage(post.featured, 1200) : null;

  return (
    <main className={`blog-post-page ${largeText ? "large-text" : ""}`}>
      <Navbar
        searchValue={query}
        onSearchChange={setQuery}
        onSearch={handleSearch}
        largeText={largeText}
        onToggleLargeText={() => setLargeText((v) => !v)}
      />

      <article className="blog-post">
        <div className="blogs-container blog-post-container">
          <Link href="/blogs" className="blog-back-link">
            ← Back to all stories
          </Link>

          {loading && <p className="blog-post-status">Loading article...</p>}

          {!loading && (error || !post) && (
            <div className="blogs-empty">
              <span>📚</span>
              <h2>We couldn&apos;t find that article</h2>
              <p>It may have been moved or unpublished.</p>
              <Link href="/blogs" className="blog-back-button">
                Browse all articles
              </Link>
            </div>
          )}

          {!loading && post && (
            <>
              <header className="blog-post-header">
                {post.publishedAt && (
                  <span className="blog-card-date">
                    {formatDate(post.publishedAt)}
                  </span>
                )}

                <h1>{post.title}</h1>

                {post.excerpt && (
                  <p className="blog-post-excerpt">{post.excerpt}</p>
                )}

                {post.author && (
                  <div className="blog-post-author">
                    <span>{post.author.charAt(0)}</span>
                    <strong>{post.author}</strong>
                  </div>
                )}
              </header>

              {image && (
                <div className="blog-post-image">
                  <Image
                    src={image}
                    alt={post.title || "Blog cover"}
                    fill
                    sizes="(max-width: 900px) 100vw, 900px"
                    priority
                  />
                </div>
              )}

              {post.answer && (
                <div className="blog-quick-answer">
                  <span className="eyebrow">QUICK ANSWER</span>
                  <p>{post.answer}</p>
                </div>
              )}

              <div className="blog-post-body">
                <ArticleBody blocks={post.body} />
              </div>

              {post.faqs && post.faqs.length > 0 && (
                <div className="blog-post-faqs">
                  <h2>Frequently Asked Questions</h2>

                  {post.faqs.map((faq: any, index: number) => (
                    <details className="blog-faq-item" key={index}>
                      <summary>{faq.question}</summary>
                      <p>{faq.answer}</p>
                    </details>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </article>

      <Footer />
    </main>
  );
}