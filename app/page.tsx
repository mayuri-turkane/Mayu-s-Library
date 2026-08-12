"use client";

import { FormEvent, useMemo, useState } from "react";
import "./hero.css";
import "./book-covers.css";
import "./navigation.css";
import "./readability.css";
import "./category-cards.css";

type Book = { title: string; author: string; subject: string; cover: string; color: string; language: string; country: string; type: string; pages: number; recent: boolean };

const books: Book[] = [
  { title: "The Hobbit", author: "J.R.R. Tolkien", subject: "Adventure", cover: "OL27448W", color: "#f4be59", language: "English", country: "United Kingdom", type: "Novel", pages: 310, recent: true },
  { title: "A Wrinkle in Time", author: "Madeleine L'Engle", subject: "Fantasy", cover: "OL256077W", color: "#bfc8f6", language: "English", country: "United States", type: "Novel", pages: 256, recent: true },
  { title: "The Secret Garden", author: "Frances Hodgson Burnett", subject: "Classics", cover: "OL468431W", color: "#9acaa7", language: "English", country: "United Kingdom", type: "Classic", pages: 331, recent: false },
  { title: "Anne of Green Gables", author: "L.M. Montgomery", subject: "Classics", cover: "OL953666W", color: "#ee9c9d", language: "English", country: "Canada", type: "Classic", pages: 320, recent: true },
  { title: "The Mysterious Island", author: "Jules Verne", subject: "Mystery", cover: "OL151121W", color: "#98c7dd", language: "French", country: "France", type: "Adventure", pages: 448, recent: false },
  { title: "Little Women", author: "Louisa May Alcott", subject: "Classics", cover: "OL151987W", color: "#d8b8f0", language: "English", country: "United States", type: "Classic", pages: 449, recent: true },
];

const genres = ["Adventure", "Fantasy", "Mystery", "Classics", "Science", "History"];
const genreIcons = ["▲", "✦", "◈", "♛", "⚗", "⌛"];

function Logo() { return <a className="logo" href="/" aria-label="Mayu's Library home"><span className="logo-mark">M</span><span>Mayu&apos;s <span>Library</span></span></a>; }

export default function Home() {
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [subjectStart, setSubjectStart] = useState(0);
  const [activeGenre, setActiveGenre] = useState("");
  const [language, setLanguage] = useState("All languages");
  const [country, setCountry] = useState("All countries");
  const [bookType, setBookType] = useState("All types");
  const [pageSize, setPageSize] = useState("Any length");
  const [recentOnly, setRecentOnly] = useState(false);
  const results = useMemo(() => books.filter((book) => `${book.title} ${book.author} ${book.subject}`.toLowerCase().includes(query.toLowerCase()) && (language === "All languages" || book.language === language) && (country === "All countries" || book.country === country) && (bookType === "All types" || book.type === bookType) && (pageSize === "Any length" || (pageSize === "Under 300 pages" ? book.pages < 300 : book.pages >= 300)) && (!recentOnly || book.recent)), [query, language, country, bookType, pageSize, recentOnly]);
  function search(event: FormEvent) { event.preventDefault(); document.getElementById("discover")?.scrollIntoView({ behavior: "smooth" }); }
  const say = (message: string) => { setNotice(message); setTimeout(() => setNotice(""), 3500); };

  return <main id="top" className={largeText ? "large-text" : ""}>
    <header className="site-header">
      <div className="nav wrap">
        <Logo />
        <nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Main navigation"><a onClick={() => setMenuOpen(false)} href="/">Home</a><a onClick={() => setMenuOpen(false)} href="#discover">Discover</a><a onClick={() => setMenuOpen(false)} href="/how-it-works">How it works</a><a onClick={() => setMenuOpen(false)} href="/about">About us</a><a className="mobile-safety" onClick={() => setMenuOpen(false)} href="/safety">Safety &amp; privacy</a></nav>
        <div className="nav-actions"><button className={largeText ? "reader-size active" : "reader-size"} onClick={() => setLargeText(!largeText)} aria-pressed={largeText} aria-label="Toggle larger reading text">A+</button><a className="login" href="/signin">Sign in</a><a className="join" href="/signup">Join free <span>→</span></a><button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><i/><i/><i/></button></div>
      </div>
    </header>

    <section className="hero wrap">
      <div className="hero-copy">
        <p className="eyebrow">THE LIBRARY IS OPEN</p>
        <h1>A thousand worlds,<br /><em>one</em> library card.</h1>
        <p className="intro"><b>For Readers, By a Reader.</b> Find a story that feels made for you in a bright, safe place to explore and grow your imagination.</p>
        <form className="search" onSubmit={search} role="search"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by title, author or topic" aria-label="Search library"/><button type="submit">Search</button></form>
        <div className="filters" aria-label="Book filters"><select value={language} onChange={(e) => setLanguage(e.target.value)} aria-label="Language filter"><option>All languages</option><option>English</option><option>French</option></select><select value={country} onChange={(e) => setCountry(e.target.value)} aria-label="Country filter"><option>All countries</option><option>United Kingdom</option><option>United States</option><option>Canada</option><option>France</option></select><select value={bookType} onChange={(e) => setBookType(e.target.value)} aria-label="Book type filter"><option>All types</option><option>Novel</option><option>Classic</option><option>Adventure</option></select><select value={pageSize} onChange={(e) => setPageSize(e.target.value)} aria-label="Page length filter"><option>Any length</option><option>Under 300 pages</option><option>300+ pages</option></select><button className={recentOnly ? "recent active" : "recent"} type="button" onClick={() => setRecentOnly(!recentOnly)}>◷ Recently added</button></div>
        <div className="trust"><span className="shield">✓</span><span><b>A safe space to explore.</b><br />Made for curious readers, 12 and up.</span></div>
      </div>
      <div className="hero-art library-scene" aria-hidden="true">
        <div className="window"><i className="moon"/><i className="window-star star-a">✦</i><i className="window-star star-b">·</i></div>
        <div className="lamp"><i className="shade"/><i className="stem"/><i className="lamp-base"/></div>
        <div className="shelf">
          <div className="shelf-row shelf-top"><i className="book b1"/><i className="book b2"/><i className="book b3"/><i className="book b4"/><i className="book b5"/><i className="book b6"/><i className="book b7"/><i className="book b8"/><i className="vase">✦</i></div>
          <div className="shelf-row shelf-bottom"><i className="book b9"/><i className="book b10"/><i className="book b11"/><i className="book b12"/><i className="book b13"/><i className="book b14"/><i className="book b15"/><i className="book b16"/><i className="globe">◒</i></div>
        </div>
        <div className="reading-chair"><i className="cushion"/><i className="leg leg-one"/><i className="leg leg-two"/></div>
        <div className="floor-plant"><i/><i/><i/><b/></div>
        <span className="scene-spark">✦</span>
      </div>
    </section>

    <section className="genres"><div className="wrap"><div className="genre-heading"><p className="eyebrow">START EXPLORING</p><span>Choose a shelf to begin</span></div><div className="genre-row">{genres.map((genre, index) => <button onClick={() => { setQuery(genre); setActiveGenre(genre); document.getElementById("discover")?.scrollIntoView({ behavior: "smooth" }); }} className={`genre g${index} ${activeGenre === genre ? "selected" : ""}`} key={genre}><span className="category-icon">{genreIcons[index]}</span><b>{genre}</b><small>Explore stories →</small></button>)}</div></div></section>
    <section className="subject-browser"><div className="wrap"><div className="subject-heading"><div><p className="eyebrow">BROWSE THE SHELVES</p><h2>Find your kind of story.</h2></div><a href="#discover">Browse all subjects →</a></div><div className="subject-carousel"><button className="subject-arrow" aria-label="Previous subjects" onClick={() => setSubjectStart((subjectStart + genres.length - 1) % genres.length)}>←</button><div className="subject-list">{[0, 1, 2, 3].map((offset) => { const index = (subjectStart + offset) % genres.length; const genre = genres[index]; return <button className={`subject-card subject-${index} ${activeGenre === genre ? "selected" : ""}`} key={genre} onClick={() => { setQuery(genre); setActiveGenre(genre); document.getElementById("discover")?.scrollIntoView({ behavior: "smooth" }); }}><span className="category-icon">{genreIcons[index]}</span><b>{genre}</b><small>{["1,240", "860", "970", "1,430", "715", "680"][index]} books</small><em>View shelf →</em></button>; })}</div><button className="subject-arrow" aria-label="Next subjects" onClick={() => setSubjectStart((subjectStart + 1) % genres.length)}>→</button></div></div></section>

    <section className="discover wrap" id="discover">
      <div className="section-title"><div><p className="eyebrow">CURATED FOR YOU</p><h2>Stories worth getting lost in.</h2></div><button className="text-link" onClick={() => setQuery("")}>See all books →</button></div>
      <div className="book-grid">{results.map((book, index) => <article className="book" key={book.title}><div className={`cover cover-${index + 1}`} style={{ background: book.color }}><div className="cover-design"><span className="cover-kicker">{book.subject}</span><span className="cover-ornament" aria-hidden="true">{["⌂", "✦", "❀", "⌁", "◒", "✺"][index]}</span><strong>{book.title}</strong><small>{book.author}</small></div><span className="tag">{book.subject}</span></div><h3>{book.title}</h3><p>{book.author}</p><button onClick={() => say(`“${book.title}” has been saved to your reading list.`)}>+ Save to list</button></article>)}</div>
      {results.length === 0 && <p className="empty">No matching titles yet. Try another word or browse a genre above.</p>}
    </section>

    <section className="steps" id="how-it-works"><div className="wrap steps-inner"><div><p className="eyebrow">SIMPLE BY DESIGN</p><h2>Your next chapter is<br />three steps away.</h2><a href="#discover">Find your book →</a></div><ol><li><span>01</span><div><b>Choose your world</b><p>Browse hand-picked stories by mood, genre, or a favorite author.</p></div></li><li><span>02</span><div><b>Borrow with a click</b><p>Create a free account and add books to your personal shelf.</p></div></li><li><span>03</span><div><b>Read at your pace</b><p>Pick up where you left off, anytime and on any device.</p></div></li></ol></div></section>

    <section className="newsletter wrap" id="about"><div><p className="eyebrow">A NOTE FROM THE SHELVES</p><h2>Good stories are<br />better <em>shared.</em></h2></div><form onSubmit={(e) => { e.preventDefault(); say("You’re on the list — welcome to PagePort!"); }}><label htmlFor="email">Monthly reads, zero clutter.</label><div><input id="email" type="email" required placeholder="Your email address"/><button>Sign me up →</button></div><small>By subscribing, you agree to our friendly privacy policy.</small></form></section>

    <footer><div className="wrap footer-top"><div className="footer-intro"><Logo /><p>For Readers, By a Reader.<br />A safe digital library for curious minds.</p><div className="socials" aria-label="Social media"><a href="#top" aria-label="Instagram">◎</a><a href="#top" aria-label="TikTok">♪</a><a href="#top" aria-label="YouTube">▶</a></div></div><div className="footer-links"><div><b>Explore</b><a href="#discover">Discover books</a><a href="/how-it-works">How it works</a><a href="#discover">Popular genres</a><a href="#discover">Advanced search</a></div><div><b>Mayu&apos;s Library</b><a href="/about">Our story</a><a href="/about">For families</a><a href="/contact">Contact us</a><a href="/signup">Join free</a></div><div><b>Help &amp; safety</b><a href="/safety">Privacy &amp; safety</a><a href="/safety">Community rules</a><a href="/safety">Accessibility</a><a href="mailto:mayulibrary@gmail.com">Email support</a></div></div></div><div className="wrap contact-bar"><span>Have an enquiry, feedback, or a book suggestion?</span><a href="mailto:mayulibrary@gmail.com">mayulibrary@gmail.com →</a></div><div className="wrap footer-bottom"><span>© 2026 Mayu&apos;s Library. Made for curious minds.</span><span>Privacy &amp; Safety &nbsp;&nbsp; Terms of use</span></div></footer>
    {notice && <div className="toast" role="status">{notice}</div>}
  </main>;
}
