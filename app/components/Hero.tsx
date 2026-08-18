"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type HeroProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
};

export default function Hero({
  query,
  onQueryChange,
  onSearch,
}: HeroProps) {
  return (
    <section className="hero-section">
      {/* Background glow */}
      <div className="hero-glow glow-one" />
      <div className="hero-glow glow-two" />

      <div className="hero-content">

        {/* =========================
            HERO TEXT
        ========================== */}
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="eyebrow">
            ✦ THE LIBRARY IS OPEN
          </span>

          <h1>
            Find a story.
            <br />
            <em>Find yourself.</em>
          </h1>

          <p>
            Discover thousands of stories, authors and worlds.
            Your next favorite book is closer than you think.
          </p>

          {/* =========================
              DONATE BOX
          ========================== */}
          <motion.div
            className="donate-box"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.35,
              duration: 0.5,
            }}
          >
            <div className="donate-box-left">
              <span
                className="donate-box-icon"
                aria-hidden="true"
              >
                ♥
              </span>

              <div className="donate-box-content">
                <strong>
                  Keep stories free
                </strong>

                <small>
                  Help us keep this library open for every reader —
                  forever.
                </small>
              </div>
            </div>

            <Link
              href="/donate"
              className="donate-box-btn"
              aria-label="Support Mayu's Library"
            >
              <span>Donate</span>
              <span
                className="donate-arrow"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </motion.div>

          {/* =========================
              TRUST MESSAGE
          ========================== */}
          <div className="hero-trust">
            <span aria-hidden="true">
              ✓
            </span>

            <div>
              <strong>
                A safe place for curious readers.
              </strong>

              <small>
                Discover freely. Read at your own pace.
              </small>
            </div>
          </div>
        </motion.div>


        {/* =========================
            HERO VISUAL
        ========================== */}
        <motion.div
          className="hero-visual"
          initial={{
            opacity: 0,
            scale: 0.9,
            rotate: 2,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          transition={{
            duration: 0.9,
            delay: 0.15,
          }}
        >
          {/* Adventure book */}
          <motion.div
            className="floating-book book-one"
            animate={{
              y: [0, -10, 0],
              rotate: [-4, -2, -4],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span>
              ADVENTURE
            </span>

            <strong>
              Into
              <br />
              the Wild
            </strong>
          </motion.div>


          {/* Classics book */}
          <motion.div
            className="floating-book book-two"
            animate={{
              y: [-5, 5, -5],
              rotate: [4, 6, 4],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span>
              CLASSICS
            </span>

            <strong>
              Little
              <br />
              Women
            </strong>
          </motion.div>


          {/* Fantasy book */}
          <motion.div
            className="floating-book book-three"
            animate={{
              y: [0, -12, 0],
              rotate: [-2, 1, -2],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span>
              FANTASY
            </span>

            <strong>
              Dream
              <br />
              World
            </strong>
          </motion.div>


          {/* Orbit circles */}
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />


          {/* Center card */}
          <motion.div
            className="hero-center-card"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span aria-hidden="true">
              ✦
            </span>

            <strong>
              Open a book.
            </strong>

            <small>
              Open a world.
            </small>
          </motion.div>
        </motion.div>
      </div>


      {/* =========================
          BOTTOM STATS
      ========================== */}
      <motion.div
        className="hero-bottom-stats"
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.6,
          duration: 0.5,
        }}
      >
        <div>
          <strong>
            10K+
          </strong>

          <span>
            Stories to discover
          </span>
        </div>

        <div>
          <strong>
            1K+
          </strong>

          <span>
            Authors
          </span>
        </div>

        <div>
          <strong>
            100%
          </strong>

          <span>
            Made for readers
          </span>
        </div>
      </motion.div>
    </section>
  );
}