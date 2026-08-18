"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "./downloads.css";

type DownloadBook = {
  id?: string | number;
  key?: string;
  title?: string;
  author?: string;
  authors?: string[];
  cover?: string;
  coverUrl?: string;
  cover_i?: number;
  downloadUrl?: string;
  url?: string;
};

function getCoverUrl(book: DownloadBook) {
  if (book.coverUrl) return book.coverUrl;
  if (book.cover) return book.cover;

  if (book.cover_i) {
    return `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
  }

  return "";
}

function getAuthor(book: DownloadBook) {
  if (book.author) return book.author;

  if (book.authors?.length) {
    return book.authors.join(", ");
  }

  return "Unknown author";
}

export default function DownloadsPage() {
  const [books, setBooks] = useState<DownloadBook[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    function loadDownloads() {
      try {
        const stored = localStorage.getItem(
          "mayu-downloaded-books"
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
          "Unable to load downloads:",
          error
        );

        setBooks([]);
      }

      setLoaded(true);
    }

    loadDownloads();

    window.addEventListener(
      "storage",
      loadDownloads
    );

    return () => {
      window.removeEventListener(
        "storage",
        loadDownloads
      );
    };
  }, []);

  function removeDownload(book: DownloadBook) {
    const bookId =
      book.id ??
      book.key ??
      book.title;

    const updated = books.filter((item) => {
      const itemId =
        item.id ??
        item.key ??
        item.title;

      return itemId !== bookId;
    });

    setBooks(updated);

    localStorage.setItem(
      "mayu-downloaded-books",
      JSON.stringify(updated)
    );

    window.dispatchEvent(
      new Event("storage")
    );
  }

  function clearDownloads() {
    setBooks([]);

    localStorage.removeItem(
      "mayu-downloaded-books"
    );

    window.dispatchEvent(
      new Event("storage")
    );
  }

  return (
    <main className="downloads-page">

      {/* HEADER */}

      <header className="downloads-header">
        <Link href="/" className="downloads-brand">
          <span className="downloads-brand-mark">
            M
          </span>

          <span>
            Mayu&apos;s <strong>Library</strong>
          </span>
        </Link>

        <Link href="/" className="downloads-back">
          ← Back to library
        </Link>
      </header>

      {/* HERO */}

      <section className="downloads-hero">
        <span className="downloads-eyebrow">
          YOUR OFFLINE LIBRARY
        </span>

        <h1>
          Books you&apos;ve
          <br />
          <em>kept close.</em>
        </h1>

        <p>
          Your downloaded books will appear here,
          ready for you to return to whenever you
          want.
        </p>
      </section>

      {/* DOWNLOADS */}

      <section className="downloads-section">

        <div className="downloads-section-header">

          <div>
            <span>YOUR DOWNLOADS</span>

            <h2>
              {books.length}{" "}
              {books.length === 1
                ? "book"
                : "books"}{" "}
              saved offline
            </h2>
          </div>

          <div className="downloads-actions">

            <Link
              href="/"
              className="downloads-discover"
            >
              Discover books →
            </Link>

            {books.length > 0 && (
              <button
                type="button"
                className="clear-downloads"
                onClick={clearDownloads}
              >
                Clear all
              </button>
            )}

          </div>

        </div>

        {!loaded ? (

          <div className="downloads-loading">
            <div>⇩</div>
            <p>
              Checking your downloads...
            </p>
          </div>

        ) : books.length === 0 ? (

          <div className="empty-downloads">

            <div className="empty-downloads-icon">
              ⇩
            </div>

            <span>
              YOUR DOWNLOADS ARE EMPTY
            </span>

            <h2>
              Nothing downloaded yet.
            </h2>

            <p>
              When downloadable books are available,
              you&apos;ll be able to keep them here for
              easy access.
            </p>

            <Link
              href="/"
              className="empty-downloads-button"
            >
              Explore the library →
            </Link>

          </div>

        ) : (

          <div className="download-list">

            {books.map((book, index) => {

              const coverUrl =
                getCoverUrl(book);

              return (
                <article
                  className="download-card"
                  key={
                    book.id ??
                    book.key ??
                    `${book.title}-${index}`
                  }
                >

                  <div className="download-cover">

                    {coverUrl ? (
                      <img
                        src={coverUrl}
                        alt={`${book.title ?? "Book"} cover`}
                      />
                    ) : (
                      <div className="download-placeholder">
                        📖
                      </div>
                    )}

                  </div>

                  <div className="download-info">

                    <span className="download-number">
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <h3>
                      {book.title ??
                        "Untitled book"}
                    </h3>

                    <p>
                      {getAuthor(book)}
                    </p>

                    <div className="download-status">
                      <span>✓</span>
                      Available offline
                    </div>

                    <div className="download-buttons">

                      {(book.downloadUrl ||
                        book.url) && (
                        <a
                          href={
                            book.downloadUrl ||
                            book.url
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="open-download"
                        >
                          Open book →
                        </a>
                      )}

                      <button
                        type="button"
                        className="remove-download"
                        onClick={() =>
                          removeDownload(book)
                        }
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

      <footer className="downloads-footer">
        <span>Mayu&apos;s Library</span>

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