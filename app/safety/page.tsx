import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy, Safety & Community Rules | Mayu's Library",
  description: "How we keep Mayu's Library safe, private, and welcoming for every reader.",
};

export default function SafetyPage() {
  return (
    <main style={{ maxWidth: "860px", margin: "auto", padding: "100px 24px 80px", fontFamily: "DM Sans, sans-serif" }}>
      <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#396747", fontSize: "13px", fontWeight: 600, textDecoration: "none", marginBottom: "48px", display: "block" }}>← Back to Mayu&apos;s Library</Link>

      <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", color: "#456841" }}>YOUR SAFETY MATTERS</span>
      <h1 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1.0, letterSpacing: "-0.05em", margin: "14px 0 18px" }}>A safe space<br /><em style={{ color: "#ec664b" }}>for every reader.</em></h1>
      <p style={{ fontSize: "17px", lineHeight: 1.7, color: "#4f5c54", maxWidth: "600px", marginBottom: "48px" }}>We built Mayu&apos;s Library to be welcoming, honest, and safe — especially for younger readers. Here&apos;s exactly how we do that.</p>

      {/* PRIVACY */}
      <section id="privacy" style={{ marginBottom: "52px", paddingBottom: "52px", borderBottom: "1px solid rgba(23,35,30,0.08)" }}>
        <h2 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "30px", letterSpacing: "-0.03em", margin: "0 0 18px" }}>🔒 Privacy &amp; Data</h2>
        <p>Your privacy is not a feature — it&apos;s a foundation. We collect only what we need:</p>
        <ul style={{ lineHeight: 1.9, color: "#4f5c54", fontSize: "14px" }}>
          <li><strong>Account info:</strong> Name and email address when you sign up. Used only to identify your account.</li>
          <li><strong>Reading activity:</strong> Books you save or mark as read. Never sold or shared with advertisers.</li>
          <li><strong>Usage data:</strong> Anonymous analytics only. No personal data included.</li>
        </ul>
        <h3>What we never do</h3>
        <ul style={{ lineHeight: 1.9, color: "#4f5c54", fontSize: "14px" }}>
          <li>We never sell your data to third parties.</li>
          <li>We never show targeted ads based on your reading habits.</li>
          <li>We never share your email with marketing partners.</li>
          <li>We never collect data from readers under 12.</li>
        </ul>
        <p style={{ fontSize: "14px", lineHeight: 1.8, color: "#4f5c54" }}>To request, correct or delete your data, email <a href="mailto:mayulibrary@gmail.com" style={{ color: "#ec664b", fontWeight: 600 }}>mayulibrary@gmail.com</a>. We respond within 72 hours.</p>
      </section>

      {/* COMMUNITY RULES */}
      <section id="community" style={{ marginBottom: "52px", paddingBottom: "52px", borderBottom: "1px solid rgba(23,35,30,0.08)" }}>
        <h2 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "30px", letterSpacing: "-0.03em", margin: "0 0 18px" }}>📖 Community Rules</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.8, color: "#4f5c54" }}>Mayu&apos;s Library is a kind and curious place. These rules help us keep it that way.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px", margin: "22px 0" }}>
          {[
            { ok: true, title: "Be kind and respectful", body: "Treat other readers the way you'd want to be treated." },
            { ok: true, title: "Share honest opinions", body: "Book recommendations should be genuine, not spam." },
            { ok: true, title: "Protect young readers", body: "Never share content inappropriate for readers aged 12+." },
            { ok: false, title: "No harassment", body: "Bullying, threats, or hate speech results in an immediate ban." },
            { ok: false, title: "No spam or self-promotion", body: "Don't use Mayu's Library to promote unrelated products." },
            { ok: false, title: "No impersonation", body: "Don't pretend to be another reader or team member." },
          ].map((rule, i) => (
            <div key={i} style={{ padding: "18px", borderRadius: "10px", border: `1px solid ${rule.ok ? "#c5ddb8" : "#f5c4bc"}`, background: rule.ok ? "#f0f7ec" : "#fdf0ee" }}>
              <span style={{ fontSize: "20px", display: "block", marginBottom: "8px", color: rule.ok ? "#396747" : "#c0392b" }}>{rule.ok ? "✓" : "✗"}</span>
              <strong style={{ fontSize: "13px", display: "block", marginBottom: "6px" }}>{rule.title}</strong>
              <p style={{ fontSize: "12px", margin: 0, lineHeight: 1.6, color: "#5a6459" }}>{rule.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ACCESSIBILITY */}
      <section id="accessibility" style={{ marginBottom: "52px", paddingBottom: "52px", borderBottom: "1px solid rgba(23,35,30,0.08)" }}>
        <h2 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "30px", letterSpacing: "-0.03em", margin: "0 0 18px" }}>♿ Accessibility</h2>
        <ul style={{ lineHeight: 1.9, color: "#4f5c54", fontSize: "14px" }}>
          <li><strong>Large text mode:</strong> Tap A+ in the navbar to increase text size site-wide.</li>
          <li><strong>Keyboard navigation:</strong> The full site is navigable by keyboard only.</li>
          <li><strong>Screen reader support:</strong> Semantic HTML and ARIA labels throughout.</li>
          <li><strong>Colour contrast:</strong> All text meets WCAG 2.1 AA requirements.</li>
          <li><strong>Reduced motion:</strong> Animations disabled automatically for users who prefer it.</li>
        </ul>
        <p style={{ fontSize: "14px", lineHeight: 1.8, color: "#4f5c54" }}>Found an accessibility issue? Email <a href="mailto:mayulibrary@gmail.com" style={{ color: "#ec664b", fontWeight: 600 }}>mayulibrary@gmail.com</a> with &quot;Accessibility&quot; in the subject line.</p>
      </section>

      {/* TERMS */}
      <section id="terms" style={{ marginBottom: "52px", paddingBottom: "52px", borderBottom: "1px solid rgba(23,35,30,0.08)" }}>
        <h2 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "30px", letterSpacing: "-0.03em", margin: "0 0 18px" }}>📋 Terms of Use</h2>
        <ul style={{ lineHeight: 1.9, color: "#4f5c54", fontSize: "14px" }}>
          <li>You are at least 12 years old, or using this site with a parent or guardian&apos;s knowledge.</li>
          <li>You will not hack, scrape, or disrupt the site or its services.</li>
          <li>You will not use the site for any unlawful purpose.</li>
          <li>Content on this site belongs to Mayu&apos;s Library and may not be reproduced without permission.</li>
          <li>Book cover images are sourced from Open Library under their respective licences.</li>
        </ul>
        <p style={{ fontSize: "13px", color: "#8a9489", marginTop: "16px" }}>Last updated: January 2026</p>
      </section>

      {/* EMAIL SUPPORT */}
      <section id="email-support" style={{ marginBottom: "52px" }}>
        <h2 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "30px", letterSpacing: "-0.03em", margin: "0 0 18px" }}>✉ Email Support</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.8, color: "#4f5c54" }}>For any issue not covered here, email us directly at <a href="mailto:mayulibrary@gmail.com" style={{ color: "#ec664b", fontWeight: 600 }}>mayulibrary@gmail.com</a>. We reply within 48 hours, usually sooner.</p>
        <p style={{ fontSize: "14px", lineHeight: 1.8, color: "#4f5c54" }}>Or use our <Link href="/contact" style={{ color: "#ec664b", fontWeight: 600 }}>contact form</Link> to send us a message directly from the site.</p>
      </section>

      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <Link href="/" style={{ display: "inline-block", background: "#ec664b", color: "white", padding: "13px 24px", borderRadius: "6px", fontWeight: 700, fontSize: "13px", textDecoration: "none" }}>← Back to Mayu&apos;s Library</Link>
      </div>
    </main>
  );
}