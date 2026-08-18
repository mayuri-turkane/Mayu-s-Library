"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "./history.css";

type HistoryBook = {
  id?: string | number;
  key?: string;
  title?: string;
  author?: string;
  authors?: string[];
  cover?: string;
  coverUrl?: string;
  cover_i?: number;
  genre?: string;
  first_publish_year?: number;
  year?: number;
  url?: string;
  readUrl?: string;
  openedAt?: string;
};

function getCoverUrl(book: HistoryBook) {
  if (book.coverUrl) return book.coverUrl;
  if (book.cover) return book.cover;

  if (book.cover_i) {
    return `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
  }

  return "";
}

function getAuthor(book: HistoryBook) {
  if (book.author) return book.author;

  if (book.authors?.length) {
    return book.authors.join(", ");
  }

  return "Unknown author";
}

export default function HistoryPage() {
  const [books, setBooks] = useState<HistoryBook[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    function loadHistory() {
      try {
        const stored = localStorage.getItem(
          "mayu-reading-history"
        );

        if (!stored) {
          setBooks([]);
          setLoaded(true);
          return;
        }

        const parsed = JSON.parse(stored);

        setBooks(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        console.error(
          "Unable to load reading history:",
          error
        );

        setBooks([]);
      }

      setLoaded(true);
    }

    loadHistory();

    window.addEventListener(
      "storage",
      loadHistory
    );

    return () => {
      window.removeEventListener(
        "storage",
        loadHistory
      );
    };
  }, []);

  function clearHistory() {
    setBooks([]);

    localStorage.removeItem(
      "mayu-reading-history"
    );

    window.dispatchEvent(
      new Event("storage")
    );
  }

  function removeHistoryBook(
    book: HistoryBook
  ) {
    const bookId =
      book.id ??
      book.key ??
      book.title;

    const updated = books.filter(
      (item) => {
        const itemId =
          item.id ??
          item.key ??
          item.title;

        return itemId !== bookId;
      }
    );

    setBooks(updated);

    localStorage.setItem(
      "mayu-reading-history",
      JSON.stringify(updated)
    );

    window.dispatchEvent(
      new Event("storage")
    );
  }

  return (
    <main className="history-page">

      {/* HEADER */}

      <header className="history-header">
        <Link
          href="/"
          className="history-brand"
        >
          <span className="history-brand-mark">
            M
          </span>

          <span>
            Mayu&apos;s{" "}
            <strong>Library</strong>
          </span>
        </Link>

        <Link
          href="/"
          className="history-back"
        >
          ← Back to library
        </Link>
      </header>

      {/* HERO */}

      <section className="history-hero">
        <span className="history-eyebrow">
          YOUR READING JOURNEY
        </span>

        <h1>
          Stories you&apos;ve
          <br />
          <em>visited.</em>
        </h1>

        <p>
          Keep track of the books you&apos;ve
          explored. Your recent discoveries
          stay here so you can easily return
          to them.
        </p>
      </section>

      {/* HISTORY */}

      <section className="history-section">

        <div className="history-section-header">

          <div>
            <span>
              RECENTLY OPENED
            </span>

            <h2>
              {books.length}{" "}
              {books.length === 1
                ? "book"
                : "books"}{" "}
              explored
            </h2>
          </div>

          <div className="history-header-actions">

            <Link
              href="/"
              className="history-discover"
            >
              Discover books →
            </Link>

            {books.length > 0 && (
              <button
                type="button"
                className="clear-history"
                onClick={clearHistory}
              >
                Clear history
              </button>
            )}

          </div>

        </div>

        {!loaded ? (

          <div className="history-loading">
            <div>📖</div>
            <p>
              Opening your reading history...
            </p>
          </div>

        ) : books.length === 0 ? (

          <div className="empty-history">

            <div className="empty-history-icon">
              ◷
            </div>

            <span>
              YOUR JOURNEY STARTS HERE
            </span>

            <h2>
              No reading history yet.
            </h2>

            <p>
              Open a book from the library
              and it will appear here.
            </p>

            <Link
              href="/"
              className="empty-history-button"
            >
              Find a story →
            </Link>

          </div>

        ) : (

          <div className="history-list">

            {books.map(
              (book, index) => {

                const coverUrl =
                  getCoverUrl(book);

                return (
                  <article
                    className="history-book"
                    key={
                      book.id ??
                      book.key ??
                      `${book.title}-${index}`
                    }
                  >

                    <div className="history-book-cover">

                      {coverUrl ? (
                        <img
                          src={coverUrl}
                          alt={`${book.title ?? "Book"} cover`}
                        />
                      ) : (
                        <div className="history-placeholder">
                          📖
                        </div>
                      )}

                    </div>

                    <div className="history-book-info">

                      <span className="history-number">
                        {String(
                          index + 1
                        ).padStart(2, "0")}
                      </span>

                      <h3>
                        {book.title ??
                          "Untitled book"}
                      </h3>

                      <p>
                        {getAuthor(book)}
                      </p>

                      {book.genre && (
                        <span className="history-genre">
                          {book.genre}
                        </span>
                      )}

                      {book.openedAt && (
                        <small>
                          Last opened{" "}
                          {new Date(
                            book.openedAt
                          ).toLocaleDateString()}
                        </small>
                      )}

                      <div className="history-actions">

                        {(book.url ||
                          book.readUrl) && (
                          <a
                            href={
                              book.url ||
                              book.readUrl
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="continue-reading"
                          >
                            Continue reading →
                          </a>
                        )}

                        <button
                          type="button"
                          className="remove-history"
                          onClick={() =>
                            removeHistoryBook(
                              book
                            )
                          }
                        >
                          Remove
                        </button>

                      </div>

                    </div>

                  </article>
                );
              }
            )}

          </div>
        )}

      </section>

      <footer className="history-footer">
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