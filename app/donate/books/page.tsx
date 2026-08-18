"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import "./books.css";

export default function BookDonationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bookTitle: "",
    author: "",
    genre: "",
    condition: "Good",
    quantity: "1",
    address: "",
    message: "",
  });

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);

    /*
     * For now we are only building the frontend.
     *
     * In the next step this form will be connected
     * to Supabase so every book donation is stored.
     */

    await new Promise((resolve) => setTimeout(resolve, 800));

    setSubmitted(true);
    setIsSubmitting(false);
  }

  return (
    <main className="book-donation-page">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="book-donation-header">
        <Link href="/donate" className="book-back-link">
          ← Back to donations
        </Link>

        <Link href="/" className="book-brand">
          Mayu&apos;s <strong>Library</strong>
        </Link>
      </header>


      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="book-donation-hero">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="book-eyebrow">
            GIVE A BOOK A NEW HOME
          </span>

          <h1>
            Your shelf.
            <br />
            <em>Someone&apos;s next story.</em>
          </h1>

          <p>
            Have books you no longer read?
            Give them another life. Mayu&apos;s Library
            welcomes new, used and old books from every genre.
          </p>
        </motion.div>


        {/* =====================================================
            FORM CARD
        ====================================================== */}

        <motion.div
          className="book-donation-card"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.15,
          }}
        >

          {submitted ? (

            /* =================================================
               SUCCESS MESSAGE
            ================================================== */

            <div style={{ textAlign: "center", padding: "45px 10px" }}>
              <div
                style={{
                  fontSize: "42px",
                  marginBottom: "18px",
                }}
              >
                📚
              </div>

              <h2
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "32px",
                  margin: "0 0 12px",
                }}
              >
                Thank you for sharing a story.
              </h2>

              <p
                style={{
                  color: "#6f776f",
                  lineHeight: 1.7,
                  maxWidth: "500px",
                  margin: "0 auto 25px",
                }}
              >
                We&apos;ve received your book donation
                information. Our team will review the
                details and contact you about the next steps.
              </p>

              <button
                type="button"
                className="book-submit-button"
                onClick={() => setSubmitted(false)}
              >
                Donate another book →
              </button>

              <Link
                href="/donate"
                style={{
                  display: "block",
                  marginTop: "18px",
                  color: "#396747",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: 700,
                }}
              >
                ← Back to donation options
              </Link>
            </div>

          ) : (

            /* =================================================
               DONATION FORM
            ================================================== */

            <>
              <div className="book-form-header">
                <span>BOOK DONATION</span>

                <h2>Tell us about your books.</h2>

                <p>
                  A few details help us understand what
                  you&apos;re donating and how we can receive it.
                </p>
              </div>


              <form
                className="book-donation-form"
                onSubmit={handleSubmit}
              >

                {/* ===============================
                    BOOK INFORMATION
                ================================= */}

                <h3 className="form-section-title">
                  About the book
                </h3>

                <div className="form-grid">

                  <div className="form-group">
                    <label htmlFor="bookTitle">
                      Book title <span>*</span>
                    </label>

                    <input
                      id="bookTitle"
                      name="bookTitle"
                      value={formData.bookTitle}
                      onChange={handleChange}
                      placeholder="e.g. The Alchemist"
                      required
                    />
                  </div>


                  <div className="form-group">
                    <label htmlFor="author">
                      Author
                    </label>

                    <input
                      id="author"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      placeholder="e.g. Paulo Coelho"
                    />
                  </div>


                  <div className="form-group">
                    <label htmlFor="genre">
                      Genre <span>*</span>
                    </label>

                    <select
                      id="genre"
                      name="genre"
                      value={formData.genre}
                      onChange={handleChange}
                      required
                    >
                      <option value="">
                        Select genre
                      </option>

                      <option value="Adventure">
                        Adventure
                      </option>

                      <option value="Fantasy">
                        Fantasy
                      </option>

                      <option value="Mystery">
                        Mystery
                      </option>

                      <option value="Classics">
                        Classics
                      </option>

                      <option value="Science">
                        Science
                      </option>

                      <option value="History">
                        History
                      </option>

                      <option value="Romance">
                        Romance
                      </option>

                      <option value="Biography">
                        Biography
                      </option>

                      <option value="Self Help">
                        Self Help
                      </option>

                      <option value="Other">
                        Other
                      </option>
                    </select>
                  </div>


                  <div className="form-group">
                    <label htmlFor="quantity">
                      Number of books <span>*</span>
                    </label>

                    <input
                      id="quantity"
                      name="quantity"
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={handleChange}
                      required
                    />
                  </div>

                </div>


                {/* ===============================
                    CONDITION
                ================================= */}

                <h3 className="form-section-title">
                  Book condition
                </h3>

                <div className="condition-options">

                  <div className="condition-option">
                    <input
                      id="new"
                      type="radio"
                      name="condition"
                      value="New"
                      checked={formData.condition === "New"}
                      onChange={handleChange}
                    />

                    <label htmlFor="new">
                      ✨ New
                    </label>
                  </div>


                  <div className="condition-option">
                    <input
                      id="good"
                      type="radio"
                      name="condition"
                      value="Good"
                      checked={formData.condition === "Good"}
                      onChange={handleChange}
                    />

                    <label htmlFor="good">
                      📖 Good condition
                    </label>
                  </div>


                  <div className="condition-option">
                    <input
                      id="used"
                      type="radio"
                      name="condition"
                      value="Used"
                      checked={formData.condition === "Used"}
                      onChange={handleChange}
                    />

                    <label htmlFor="used">
                      ♻️ Well loved
                    </label>
                  </div>

                </div>


                <div className="form-divider" />


                {/* ===============================
                    CONTACT INFORMATION
                ================================= */}

                <h3 className="form-section-title">
                  Your details
                </h3>

                <div className="form-grid">

                  <div className="form-group">
                    <label htmlFor="name">
                      Your name <span>*</span>
                    </label>

                    <input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>


                  <div className="form-group">
                    <label htmlFor="email">
                      Email <span>*</span>
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                    />
                  </div>


                  <div className="form-group">
                    <label htmlFor="phone">
                      Phone number <span>*</span>
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      required
                    />
                  </div>


                  <div className="form-group">
                    <label htmlFor="address">
                      City / pickup location <span>*</span>
                    </label>

                    <input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Where should we collect the books?"
                      required
                    />
                  </div>


                  <div className="form-group full">
                    <label htmlFor="message">
                      Anything else?
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us anything useful about your books..."
                    />
                  </div>

                </div>


                {/* ===============================
                    SUBMIT
                ================================= */}

                <button
                  type="submit"
                  className="book-submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Sending donation details..."
                    : "Offer these books →"}
                </button>

                <p className="book-form-note">
                  Your information is only used to coordinate
                  your book donation.
                </p>

              </form>
            </>
          )}

        </motion.div>
      </section>


      {/* =====================================================
          TRUST
      ====================================================== */}

      <section className="book-donation-trust">

        <div className="book-trust-item">
          <span>📚</span>

          <strong>New or pre-loved</strong>

          <small>
            Books of all conditions are welcome.
          </small>
        </div>


        <div className="book-trust-item">
          <span>🌎</span>

          <strong>Every genre</strong>

          <small>
            Fiction, science, history and more.
          </small>
        </div>


        <div className="book-trust-item">
          <span>💛</span>

          <strong>Give with purpose</strong>

          <small>
            Your books can become someone&apos;s next favorite.
          </small>
        </div>

      </section>

    </main>
  );
}