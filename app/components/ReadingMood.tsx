"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSanityBlogs } from "../../lib/useSanityBlogs";
import { urlForImage } from "../../lib/sanityImage";

function formatDate(dateString?: string) {
  if (!dateString) return "";

  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ReadingMood() {
  const { blogs, loading, error } = useSanityBlogs();

  if (loading || error || blogs.length === 0) {
    return null;
  }

  const featured = blogs[0];
  const remaining = blogs.slice(1, 5);

  const featuredImage = urlForImage(featured.featured, 1000);

  return (
    <section className="modern-blog-section" id="mood">
      <div className="modern-blog-container">

        {/* Section heading */}
        <motion.div
          className="modern-blog-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="modern-blog-eyebrow">
              FROM THE LIBRARY DESK
            </span>

            <h2>
              Stories worth
              <br />
              <em>reading.</em>
            </h2>

            <p>
              Ideas, recommendations, and reading inspiration
              from Mayu&apos;s Library.
            </p>
          </div>

          <Link
            href="/blogs"
            className="modern-blog-view-all"
          >
            <span>View all articles</span>
            <span className="modern-blog-arrow">↗</span>
          </Link>
        </motion.div>

        {/* Featured article */}
        <motion.div
          className="modern-blog-featured"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Link
            href={`/blogs/${featured.slug.current}`}
            className="modern-featured-card"
          >
            <div className="modern-featured-image">
              {featuredImage ? (
                <Image
                  src={featuredImage}
                  alt={featured.title || "Featured blog"}
                  fill
                  sizes="(max-width: 900px) 100vw, 60vw"
                />
              ) : (
                <div className="modern-blog-placeholder">
                  <span>✦</span>
                </div>
              )}

              <div className="modern-featured-overlay" />

              <span className="modern-featured-label">
                Featured story
              </span>

              <span className="modern-featured-open">
                ↗
              </span>
            </div>

            <div className="modern-featured-content">
              {featured.publishedAt && (
                <span className="modern-blog-date">
                  {formatDate(featured.publishedAt)}
                </span>
              )}

              <h3>{featured.title}</h3>

              {featured.excerpt && (
                <p>{featured.excerpt}</p>
              )}

              <span className="modern-read-link">
                Read story
                <span>→</span>
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Other articles */}
        <div className="modern-blog-grid">
          {remaining.map((blog: any, index: number) => {
            const image = urlForImage(blog.featured, 600);

            return (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
              >
                <Link
                  href={`/blogs/${blog.slug.current}`}
                  className="modern-blog-card"
                >
                  <div className="modern-blog-card-image">
                    {image ? (
                      <Image
                        src={image}
                        alt={blog.title || "Blog cover"}
                        fill
                        sizes="(max-width: 700px) 100vw, 25vw"
                      />
                    ) : (
                      <div className="modern-blog-placeholder">
                        <span>✦</span>
                      </div>
                    )}

                    <div className="modern-card-number">
                      0{index + 2}
                    </div>
                  </div>

                  <div className="modern-blog-card-content">
                    {blog.publishedAt && (
                      <span className="modern-blog-date">
                        {formatDate(blog.publishedAt)}
                      </span>
                    )}

                    <h3>{blog.title}</h3>

                    {blog.excerpt && (
                      <p>{blog.excerpt}</p>
                    )}

                    <span className="modern-card-read">
                      Read article
                      <span>↗</span>
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}