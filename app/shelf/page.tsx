"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "./shelf.css";

type SavedBook = {
  id?: string | number;
  key?: string;
  title?: string;
  author?: string;
  authors?: string[];
  cover?: string;
  coverUrl?: string;
  cover_i?: number;
  isbn?: string;
  genre?: string;
  first_publish_year?: number;
  year?: number;
  url?: string;
  readUrl?: string;
};

function getCoverUrl(book: SavedBook) {
  if (book.isbn) {
    return `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg?default=false`;
  }

  if (book.coverUrl) return book.coverUrl;
  if (book.cover) return book.cover;

  if (book.cover_i) {
    return `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
  }

  return "";
}

function getAuthor(book: SavedBook) {
  if (book.author) return book.author;

  if (book.authors?.length) {
    return book.authors.join(", ");
  }

  return "Unknown author";
}

export default function ShelfPage() {
  const [books, setBooks] = useState<SavedBook[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    function loadSavedBooks() {
      try {
        const stored = localStorage.getItem("mayu-saved-books");

        if (!stored) {
          setBooks([]);
          setLoaded(true);
          return;
        }

        const parsed = JSON.parse(stored);

        if (Array.isArray(parsed)) {
          setBooks(parsed);
        } else {
          setBooks([]);
        }
      } catch (error) {
        console.error("Unable to load saved books:", error);
        setBooks([]);
      }

      setLoaded(true);
    }

    loadSavedBooks();

    window.addEventListener("storage", loadSavedBooks);

    return () => {
      window.removeEventListener("storage", loadSavedBooks);
    };
  }, []);

  function removeBook(book: SavedBook) {
    const bookId = book.id ?? book.key ?? book.title;

    const updatedBooks = books.filter((savedBook) => {
      const savedId =
        savedBook.id ?? savedBook.key ?? savedBook.title;

      return savedId !== bookId;
    });

    setBooks(updatedBooks);

    localStorage.setItem(
      "mayu-saved-books",
      JSON.stringify(updatedBooks)
    );

    window.dispatchEvent(new Event("storage"));
  }

  return (
    <main className="shelf-page">

      {/* HEADER */}

      <header className="shelf-header">
        <Link href="/" className="shelf-brand">
          <span className="shelf-brand-mark">M</span>

          <span>
            Mayu&apos;s <strong>Library</strong>
          </span>
        </Link>

        <Link href="/" className="shelf-back">
          ← Back to library
        </Link>
      </header>

      {/* HERO */}

      <section className="shelf-hero">
        <span className="shelf-eyebrow">
          YOUR PERSONAL SHELF
        </span>

        <h1>
          Stories you
          <br />
          <em>want to remember.</em>
        </h1>

        <p>
          Keep your favorite discoveries close.
          Your saved books will appear here whenever
          you want to come back to them.
        </p>
      </section>

      {/* SHELF */}

      <section className="saved-shelf-section">

        <div className="shelf-section-header">
          <div>
            <span>YOUR COLLECTION</span>

            <h2>
              {books.length}{" "}
              {books.length === 1 ? "book" : "books"} saved
            </h2>
          </div>

          <Link href="/" className="discover-button">
            Discover books →
          </Link>
        </div>

        {!loaded ? (
          <div className="shelf-loading">
            <div className="loading-book">📚</div>
            <p>Opening your shelf...</p>
          </div>
        ) : books.length === 0 ? (
          <div className="empty-shelf">

            <div className="empty-shelf-icon">
              ♡
            </div>

            <span>YOUR SHELF IS WAITING</span>

            <h2>
              Nothing saved yet.
            </h2>

            <p>
              When you find a story you love,
              save it to your shelf and it will
              appear here.
            </p>

            <Link href="/" className="empty-shelf-button">
              Find a book →
            </Link>

          </div>
        ) : (
          <div className="saved-books-grid">

            {books.map((book, index) => {
              const coverUrl = getCoverUrl(book);

              return (
                <article
                  className="saved-book-card"
                  key={
                    book.id ??
                    book.key ??
                    `${book.title}-${index}`
                  }
                >

                  <div className="saved-book-cover">

                    {coverUrl ? (
                      <img
                        src={coverUrl}
                        alt={`${book.title ?? "Book"} cover`}
                      />
                    ) : (
                      <div className="saved-book-placeholder">
                        <span>📖</span>
                        <strong>
                          {book.title ?? "Book"}
                        </strong>
                      </div>
                    )}

                    {book.genre && (
                      <span className="saved-book-genre">
                        {book.genre}
                      </span>
                    )}

                  </div>

                  <div className="saved-book-info">

                    <h3>
                      {book.title ?? "Untitled book"}
                    </h3>

                    <p>
                      {getAuthor(book)}
                    </p>

                    {book.first_publish_year && (
                      <small>
                        {book.first_publish_year}
                      </small>
                    )}

                    <div className="saved-book-actions">

                      {(book.url || book.readUrl) && (
                        <a
                          href={book.url || book.readUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="read-book-button"
                        >
                          Read book →
                        </a>
                      )}

                      <button
                        type="button"
                        className="remove-book-button"
                        onClick={() => removeBook(book)}
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                </article>
              );
            })}

          </div>
        )}

      </section>

      {/* FOOTER */}

      <footer className="shelf-footer">
        <span>
          Mayu&apos;s Library
        </span>

        <span>
          For readers. By a reader.
        </span>

        <Link href="/">
          Back home →
        </Link>
      </footer>

    </main>
  );
}
