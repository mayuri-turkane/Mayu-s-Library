"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const supportCards = [
  {
    icon: "📚",
    title: "Grow the collection",
    text: "Help us bring more stories and diverse books to curious readers.",
  },
  {
    icon: "💛",
    title: "Keep reading accessible",
    text: "Your support helps us maintain a welcoming reading experience for everyone.",
  },
  {
    icon: "🌱",
    title: "Give books another life",
    text: "Your new, used, and old books can find a new reader and a new home.",
  },
];

export default function DonatePage() {
  return (
    <main className="donate-page">
      {/* =========================
          HEADER
      ========================== */}
      <header className="donate-header">
        <Link
          href="/"
          className="donate-brand"
          aria-label="Mayu's Library home"
        >
          <span className="donate-brand-icon">📖</span>

          <span>
            Mayu&apos;s <strong>Library</strong>
          </span>
        </Link>

        <Link href="/" className="donate-back">
          ← Back to library
        </Link>
      </header>

      {/* =========================
          HERO
      ========================== */}
      <section className="donate-hero">
        <motion.span
          className="donate-page-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          SUPPORT MAYU&apos;S LIBRARY
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Give a little.
          <br />
          <em>Share a lot.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Every contribution helps Mayu&apos;s Library stay accessible
          to curious readers. You can support the library with money,
          donate new or used books, or help us keep great stories moving.
        </motion.p>

        <motion.a
          href="#donation-options"
          className="donate-main-button"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Support the Library ↓
        </motion.a>

        <span className="donate-note">
          Every contribution helps another reader discover a story.
        </span>
      </section>

      {/* =========================
          WHY YOUR SUPPORT MATTERS
      ========================== */}
      <section className="donate-info">
        <div className="donate-info-heading">
          <span>WHY YOUR SUPPORT MATTERS</span>

          <h2>
            Help us build a library
            <br />
            that belongs to everyone.
          </h2>
        </div>

        <div className="donate-cards">
          {supportCards.map((card, index) => (
            <motion.article
              key={card.title}
              className="donate-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.45,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -7,
              }}
            >
              <div className="donate-card-icon">
                {card.icon}
              </div>

              <h3>{card.title}</h3>

              <p>{card.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* =========================
          DONATION OPTIONS
      ========================== */}
      <section
        className="donation-options"
        id="donation-options"
      >
        <div className="donation-options-header">
          <span>CHOOSE YOUR WAY</span>

          <h2>
            Two ways to support
            <br />
            the library.
          </h2>

          <p>
            Whether you want to contribute financially or give
            physical books, there is a place for your generosity
            at Mayu&apos;s Library.
          </p>
        </div>

        <div className="donation-option-grid">
          {/* MONEY */}
          <motion.article
            className="donation-option featured"
            whileHover={{ y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <span className="option-number">01</span>

            <div className="donate-card-icon">💰</div>

            <h3>Donate Money</h3>

            <p>
              Make a financial contribution of any amount.
              Your payment will be securely processed through
              Razorpay.
            </p>

            <Link
              href="/donate/money"
              className="option-button"
            >
              Donate money →
            </Link>
          </motion.article>

          {/* BOOKS */}
          
          <motion.article
            className="donation-option"
            whileHover={{ y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <span className="option-number">02</span>

            <div className="donate-card-icon">📚</div>

            <h3>Donate Books</h3>

            <p>
              Give your new, used, or old books a new home.
              Any genre is welcome and multiple books can be
              donated.
            </p>

            <Link
              href="/donate/books"
              className="option-button secondary"
            >
              Donate books →
            </Link>
          </motion.article>

          {/* BOTH */}
          <motion.article
  className="donation-option"
  whileHover={{ y: -8 }}
  transition={{ duration: 0.25 }}
>
  <span className="option-number">03</span>

  <div className="donation-card-icon">
    ✨
  </div>

  <h3>Give Both</h3>

  <p>
    Want to support the library in more than one way?
    You can contribute financially and donate books together.
  </p>

  <div className="both-donation-buttons">
    <Link
      href="/donate/money"
      className="option-button"
    >
      Donate money →
    </Link>

    <Link
      href="/donate/books"
      className="option-button secondary"
    >
      Donate books →
    </Link>
  </div>
</motion.article>
        </div>
      </section>

      {/* =========================
          TRANSPARENCY
      ========================== */}
      <section className="donate-transparency">
        <div className="transparency-icon">✦</div>

        <h2>Every contribution counts.</h2>

        <p>
          Mayu&apos;s Library is built around the idea that stories
          should be easy to discover and share. Your support helps
          us continue creating a better reading experience for
          curious readers.
        </p>

        <Link
          href="/about"
          className="transparency-link"
        >
          Learn more about Mayu&apos;s Library →
        </Link>
      </section>

      {/* =========================
          FOOTER
      ========================== */}
      <footer className="donate-footer">
        <span>
          © {new Date().getFullYear()} Mayu&apos;s Library
        </span>

        <span>
          For readers. By a reader.
        </span>

        <Link href="/">
          Back to library →
        </Link>
      </footer>
    </main>
  );
}