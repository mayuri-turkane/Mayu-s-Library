import "../info.css";

export default function Contact() {
  return (
    <main className="info-page contact-page">
      <a href="/" className="back">← Back to Mayu&apos;s Library</a>
      <section>
        <p className="eyebrow">GET IN TOUCH</p>
        <h1>Questions, ideas,<br /><em>great books?</em></h1>
        <p>For enquiries, feedback, reading suggestions, or anything else about Mayu&apos;s Library, we&apos;d love to hear from you.</p>
        <h2>How we can help</h2>
        <p>Tell us what you need, whether it is a reading suggestion, help using your account, or feedback that can make the library better.</p>
        <a className="info-button" href="mailto:mayulibrary@gmail.com?subject=Mayu%27s%20Library%20enquiry">mayulibrary@gmail.com →</a>
        <p className="contact-note">We aim to reply to all genuine messages as soon as we can.</p>
      </section>
    </main>
  );
}
