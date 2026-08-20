import "../info.css";

export default function About() {
  return (
    <main className="info-page">
      <a href="/" className="back">← Back to Mayu&apos;s Library</a>
      <section>
        <p className="eyebrow">OUR STORY</p>
        <h1>For Readers,<br /><em>By a Reader.</em></h1>
        <p>Mayu&apos;s Library is a friendly digital home for readers aged 12 and up. We believe every curious mind deserves a safe, simple way to find a story that feels like it was waiting just for them.</p>
        <h2>A library made for discovery</h2>
        <p>Explore classics by genre, discover new authors, keep favourites on your personal shelf, and return to the stories that matter to you.</p>
        <a className="info-button" href="/signup">Join the library →</a>
      </section>
    </main>
  );
}
