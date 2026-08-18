"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import Logo from "./Logo";
import "../footer.css";

const EMAILJS_SERVICE  = "service_1h9w2rv";
const EMAILJS_TEMPLATE = "template_k7f4e8j";
const EMAILJS_KEY      = "gn91FkpxQoIh3N6Vz";

const faqs = [
  { q: "Is Mayu's Library completely free?", a: "Yes — browsing, searching, and saving books to your shelf is 100% free. We believe every reader deserves access to great stories, no subscription required." },
  { q: "Who is Mayu's Library for?", a: "We built this for curious readers aged 12 and up. Whether you're a student, a casual reader, or a lifelong bookworm, there's a shelf here for you." },
  { q: "How do I save a book to my list?", a: "Click the heart icon or 'Save to list' button on any book card. You'll need a free account to keep your shelf saved across devices." },
  { q: "Are the books safe for young readers?", a: "Yes. We carefully curate our library to ensure all content is appropriate for readers 12 and up. Safety is a core part of how we choose what goes on our shelves." },
  { q: "How do I report something that feels wrong?", a: "Email us at mayulibrary@gmail.com or use the contact form below. We take every report seriously and respond within 48 hours." },
  { q: "Can I suggest a book to add?", a: "Absolutely! Use the feedback form below and select 'Book suggestion' as your query type. We love hearing from readers about what they want to find here." },
];

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function ThreadsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.028-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 1.934-.012 3.604-.464 4.86-1.306 1.486-.978 2.368-2.48 2.618-4.458H12.8v-2.04h9.966v.942c0 2.63-.71 4.855-2.112 6.611-1.67 2.07-4.174 3.173-7.468 3.17z"/>
    </svg>
  );
}

export default function Footer() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", type: "General question", message: "" });
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        {
          from_name:  formData.name,
          from_email: formData.email,
          query_type: formData.type,
          message:    formData.message,
          to_name:    "Mayu's Library",
        },
        EMAILJS_KEY
      );
      setFormState("sent");
      setFormData({ name: "", email: "", type: "General question", message: "" });
    } catch {
      setFormState("error");
    }
  }

  return (
    <footer className="site-footer">

      {/* FAQ */}
      <section className="footer-faq">
        <div className="faq-inner">
          <div className="faq-header">
            <span className="eyebrow faq-eyebrow">QUICK ANSWERS</span>
            <h2 className="faq-title">Got a question? <em>We&apos;ve got you.</em></h2>
            <p className="faq-sub">Everything you need to know about Mayu&apos;s Library — from how it works to how we keep readers safe.</p>
          </div>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className={`faq-item ${openFaq === i ? "faq-open" : ""}`}>
                <button
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{faq.q}</span>
                  <span className="faq-chevron" aria-hidden="true">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="footer-contact">
        <div className="contact-inner">
          <div className="contact-intro">
            <span className="eyebrow contact-eyebrow">GET IN TOUCH</span>
            <h2 className="contact-title">We read <em>every</em> message.</h2>
            <p className="contact-sub">Questions, feedback, book suggestions, or just want to say hello — send it our way. We reply within 48 hours.</p>
            <div className="contact-info-links">
              <a href="mailto:mayulibrary@gmail.com" className="contact-email-link">
                <span>✉</span> mayulibrary@gmail.com
              </a>
              <div className="contact-response-time">
                <span>⏱</span> Average reply: under 24 hrs
              </div>
            </div>
          </div>
          <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="cf-name">Your name</label>
                <input
                  id="cf-name"
                  type="text"
                  required
                  placeholder="Jane Reader"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-field">
                <label htmlFor="cf-email">Email address</label>
                <input
                  id="cf-email"
                  type="email"
                  required
                  placeholder="jane@example.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="cf-type">What&apos;s this about?</label>
              <select
                id="cf-type"
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value })}
              >
                <option>General question</option>
                <option>Book suggestion</option>
                <option>Feedback</option>
                <option>Report an issue</option>
                <option>Partnership enquiry</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="cf-message">Your message</label>
              <textarea
                id="cf-message"
                required
                rows={4}
                placeholder="Tell us what's on your mind..."
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="contact-submit"
              disabled={formState === "sending" || formState === "sent"}
            >
              {formState === "idle"    && "Send message →"}
              {formState === "sending" && "Sending..."}
              {formState === "sent"    && "✓ Message sent!"}
              {formState === "error"   && "Try again →"}
            </button>
            {formState === "error" && (
              <p className="form-error">Something went wrong. Email us directly at mayulibrary@gmail.com</p>
            )}
          </form>
        </div>
      </section>

      {/* MAIN FOOTER */}
      <div className="footer-main">
        <div className="footer-brand">
          <Logo />
          <p className="footer-tagline">
            Where every page turn opens<br />a new world. Free, forever.
          </p>
          <div className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-icon">
              <FacebookIcon />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon">
              <InstagramIcon />
            </a>
            <a href="https://threads.net" target="_blank" rel="noopener noreferrer" aria-label="Threads" className="social-icon">
              <ThreadsIcon />
            </a>
          </div>
        </div>
        <div className="footer-column">
          <h4>Help &amp; Safety</h4>
          <Link href="/safety#privacy">Privacy &amp; safety</Link>
          <Link href="/safety#community">Community rules</Link>
          <Link href="/safety#accessibility">Accessibility</Link>
          <a href="mailto:mayulibrary@gmail.com">Email support</a>
          <Link href="/contact">Contact us</Link>
        </div>
        <div className="footer-column">
          <h4>Mayu&apos;s Library</h4>
          <Link href="/about">Our story</Link>
          <Link href="/how-it-works">How it works</Link>
          <Link href="/signup">Join free</Link>
          <a href="#footer-faq">FAQs</a>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        <span>© 2026 Mayu&apos;s Library · Built for readers, by a reader.</span>
        <span className="footer-bottom-heart">Every book deserves a reader. Every reader deserves a home. 📚</span>
        <div>
          <Link href="/safety#privacy">Privacy</Link>
          <Link href="/safety#terms">Terms</Link>
          <Link href="/safety#accessibility">Accessibility</Link>
        </div>
      </div>

    </footer>
  );
}