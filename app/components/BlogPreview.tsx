"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSanityBlogs } from "../../lib/useSanityBlogs";
import { urlForImage } from "../../lib/sanityImage";
import "./BlogPreview.css";

function formatDate(dateString?: string) {
  if (!dateString) return "";

  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogPreview() {
  const { blogs, loading, error } = useSanityBlogs();

  if (loading || error || blogs.length === 0) return null;

  const featured = blogs[0];
  const cards = blogs.slice(1, 4);

  return (
    <section className="blog-home" id="blog-preview">
      <div className="blog-home-container">

        <motion.div
          className="blog-home-heading"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <span className="blog-home-eyebrow">
              FROM THE LIBRARY DESK
            </span>

            <h2>
              Latest from the <em>blog</em>
            </h2>

            <p>
              Stories, ideas and reading inspiration from Mayu&apos;s Library.
            </p>
          </div>

          <Link href="/blogs" className="blog-home-view">
            View all articles →
          </Link>
        </motion.div>

        {/* FEATURED ARTICLE */}

        <motion.div
          className="blog-home-featured"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href={`/blogs/${featured.slug?.current || ""}`}
            className="blog-home-featured-link"
          >
            <div className="blog-home-featured-image">
              {urlForImage(featured.featured, 1200) ? (
                <Image
                  src={urlForImage(featured.featured, 1200)!}
                  alt={featured.title || "Featured blog"}
                  fill
                  sizes="60vw"
                />
              ) : (
                <div className="blog-home-placeholder">✦</div>
              )}
            </div>

            <div className="blog-home-featured-content">
              <span className="blog-home-label">
                Featured story · {formatDate(featured.publishedAt)}
              </span>

              <h3>{featured.title}</h3>

              <p>{featured.excerpt}</p>

              <span className="blog-home-read">
                Read story →
              </span>
            </div>
          </Link>
        </motion.div>

        {/* BLOG CARDS */}

        <div className="blog-home-grid">
          {cards.map((blog: any, index: number) => {
            const image = urlForImage(blog.featured, 700);

            return (
              <motion.article
                key={blog._id}
                className="blog-home-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12,
                }}
                whileHover={{ y: -8 }}
              >
                <Link
                  href={`/blogs/${blog.slug?.current || ""}`}
                  className="blog-home-card-link"
                >
                  <div className="blog-home-card-image">
                    {image ? (
                      <Image
                        src={image}
                        alt={blog.title || "Blog cover"}
                        fill
                        sizes="33vw"
                      />
                    ) : (
                      <div className="blog-home-placeholder">
                        ✦
                      </div>
                    )}
                  </div>

                  <div className="blog-home-card-content">
                    <span className="blog-home-date">
                      {formatDate(blog.publishedAt)}
                    </span>

                    <h3>{blog.title}</h3>

                    <p>{blog.excerpt}</p>

                    <div className="blog-home-card-read">
                      <span>Read article</span>
                      <span>→</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
}