"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  libraryBooks,
  type LibraryBook,
} from "../../lib/books";

type CoverSource = "gutenberg" | "openLibrary";

const getCoverUrl = (book: LibraryBook, source: CoverSource) =>
  source === "gutenberg" && book.gutenbergId
    ? `https://www.gutenberg.org/cache/epub/${book.gutenbergId}/pg${book.gutenbergId}.cover.medium.jpg`
    : `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg?default=false`;

function BookCover({
  book,
  alt,
  className = "book-cover",
}: {
  book: LibraryBook;
  alt: string;
  className?: string;
}) {
  const [source, setSource] = useState<CoverSource>(
    "openLibrary"
  );
  const [hasCover, setHasCover] = useState(true);

  if (!hasCover) {
    return (
      <div className="book-no-cover" role="img" aria-label={alt}>
        <span aria-hidden="true">📚</span>
        <small>{book.title}</small>
      </div>
    );
  }

  return (
    <img
      src={getCoverUrl(book, source)}
      alt={alt}
      className={className}
      width={500}
      height={750}
      onError={() => {
        if (source === "openLibrary" && book.gutenbergId) {
          setSource("gutenberg");
        } else {
          setHasCover(false);
        }
      }}
    />
  );
}

const genres = [
  {
    name: "Adventure",
    query: "adventure",
    icon: "▲",
    color: "peach",
  },
  {
    name: "Fantasy",
    query: "fantasy",
    icon: "✦",
    color: "lavender",
  },
  {
    name: "Mystery",
    query: "mystery",
    icon: "◈",
    color: "mint",
  },
  {
    name: "Classics",
    query: "classics",
    icon: "♛",
    color: "rose",
  },
  {
    name: "Science",
    query: "science",
    icon: "⚗",
    color: "green",
  },
  {
    name: "History",
    query: "history",
    icon: "⌛",
    color: "gold",
  },
];

type TrendingBooksProps = {
  query: string;
};

export default function TrendingBooks({
  query,
}: TrendingBooksProps) {
  const [activeGenre, setActiveGenre] =
    useState("adventure");

  const [activeBook, setActiveBook] =
    useState<LibraryBook | null>(null);
  const [savedBookIds, setSavedBookIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("mayu-saved-books") || "[]");
      setSavedBookIds(
        Array.isArray(saved)
          ? saved
              .map((book: LibraryBook) => book.id)
              .filter((id): id is string => typeof id === "string")
          : []
      );
    } catch {
      setSavedBookIds([]);
    }
  }, []);

  const normalizedQuery =
    query.trim().toLowerCase();

  const matchingGenre = genres.find(
    (genre) =>
      genre.query === normalizedQuery ||
      genre.name.toLowerCase() ===
        normalizedQuery
  );

  const displayedBooks = useMemo(() => {
    /*
     * If the search is exactly a genre,
     * show that genre.
     */
    if (matchingGenre) {
      return libraryBooks.filter(
        (book) =>
          book.genre ===
          matchingGenre.query
      );
    }

    /*
     * Normal search:
     * search title, author and genre.
     */
    if (normalizedQuery) {
      return libraryBooks.filter(
        (book) =>
          book.title
            .toLowerCase()
            .includes(normalizedQuery) ||
          book.author
            .toLowerCase()
            .includes(normalizedQuery) ||
          book.genre
            .toLowerCase()
            .includes(normalizedQuery)
      );
    }

    /*
     * Default homepage shelf.
     */
    return libraryBooks.filter(
      (book) =>
        book.genre === activeGenre
    );
  }, [
    activeGenre,
    matchingGenre,
    normalizedQuery,
  ]);

  const currentGenreName =
    matchingGenre?.name ??
    genres.find(
      (genre) =>
        genre.query === activeGenre
    )?.name ??
    "Adventure";

  const getBookLink = (book: LibraryBook) =>
    book.gutenbergId
      ? `https://www.gutenberg.org/ebooks/${book.gutenbergId}`
      : `https://openlibrary.org/isbn/${book.isbn}`;

  const getDownloadUrl = (book: LibraryBook) =>
    book.gutenbergId
      ? `https://www.gutenberg.org/cache/epub/${book.gutenbergId}/pg${book.gutenbergId}-images.pdf`
      : null;

  const getStoredBook = (book: LibraryBook) => ({
    ...book,
    coverUrl: getCoverUrl(book, "openLibrary"),
    url: getBookLink(book),
    readUrl: getBookLink(book),
    downloadUrl: getDownloadUrl(book),
  });

  const saveBook = (
    book: LibraryBook
  ) => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(
          "mayu-saved-books"
        ) || "[]"
      );

      const exists = saved.some(
        (item: LibraryBook) =>
          item.id === book.id
      );

      if (!exists) {
        localStorage.setItem(
          "mayu-saved-books",
          JSON.stringify([
            ...saved,
            getStoredBook(book),
          ])
        );
        setSavedBookIds((ids) => [...ids, book.id]);
        window.dispatchEvent(new Event("mayu-library-storage"));
      }
    } catch (error) {
      console.error(
        "Unable to save book:",
        error
      );
    }
  };

  const downloadBook = (book: LibraryBook) => {
    const downloadUrl = getDownloadUrl(book);
    if (!downloadUrl) return;

    try {
      const downloaded = JSON.parse(localStorage.getItem("mayu-downloaded-books") || "[]");
      const books = Array.isArray(downloaded) ? downloaded : [];

      if (!books.some((item: LibraryBook) => item.id === book.id)) {
        localStorage.setItem(
          "mayu-downloaded-books",
          JSON.stringify([...books, getStoredBook(book)])
        );
        window.dispatchEvent(new Event("mayu-library-storage"));
      }
    } catch (error) {
      console.error("Unable to add book to downloads:", error);
    }

    window.open(downloadUrl, "_blank", "noopener,noreferrer");
  };

  const handleGenreClick = (
    genre: string
  ) => {
    setActiveGenre(genre);
  };

  return (
    <section
      className="trending-section"
      id="discover"
    >
      <div className="section-container">

        {/* =========================
            SECTION HEADER
        ========================== */}

        <div className="section-heading">
          <div>
            <span className="eyebrow">
              {normalizedQuery &&
              !matchingGenre
                ? "SEARCH RESULTS"
                : "TRENDING NOW"}
            </span>

            <h2>
              {normalizedQuery &&
              !matchingGenre
                ? `Books for "${query}"`
                : "Stories readers are discovering."}
            </h2>
          </div>

          <a
            href="https://www.gutenberg.org/"
            target="_blank"
            rel="noreferrer"
            className="view-all"
          >
            Explore Project Gutenberg ↗
          </a>
        </div>

        {/* =========================
            GENRE BUTTONS
        ========================== */}

        {(!normalizedQuery ||
          matchingGenre) && (
          <div className="trending-genres">
            {genres.map((genre) => {
              const isActive =
                matchingGenre?.query ===
                  genre.query ||
                (!matchingGenre &&
                  activeGenre ===
                    genre.query);

              return (
                <button
                  key={genre.query}
                  type="button"
                  className={`trending-genre ${
                    isActive
                      ? "active"
                      : ""
                  } ${genre.color}`}
                  onClick={() =>
                    handleGenreClick(
                      genre.query
                    )
                  }
                >
                  <span>
                    {genre.icon}
                  </span>

                  <strong>
                    {genre.name}
                  </strong>
                </button>
              );
            })}
          </div>
        )}

        {/* =========================
            BOOK GRID
        ========================== */}

        <AnimatePresence mode="wait">

          {displayedBooks.length > 0 ? (

            <motion.div
              key={`${activeGenre}-${normalizedQuery}`}
              className="book-grid-modern"
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.35,
              }}
            >

              {displayedBooks
                .slice(0, 6)
                .map(
                  (book, index) => (

                    <motion.article
                      className="modern-book-card"
                      key={book.id}
                      initial={{
                        opacity: 0,
                        y: 24,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay:
                          index * 0.06,
                      }}
                      whileHover={{
                        y: -8,
                      }}
                    >

                      {/* COVER */}

                      <div className="book-cover-wrap">

                        <BookCover
                          book={book}
                          alt={`${book.title} cover`}
                          className="book-cover"
                        />

                        <span className="book-ribbon">
                          {index < 2
                            ? "POPULAR"
                            : currentGenreName.toUpperCase()}
                        </span>

                        {book.gutenbergId && (
                          <button
                            type="button"
                            className="book-download-button"
                            onClick={() => downloadBook(book)}
                            aria-label={`Download ${book.title} as a PDF`}
                            title="Download PDF"
                          >
                            ↓
                          </button>
                        )}

                        {/* HOVER ACTIONS */}

                        <div className="book-hover">

                          <button
                            type="button"
                            onClick={() =>
                              setActiveBook(
                                book
                              )
                            }
                          >
                            Quick view
                          </button>

                          <a
                            href={getBookLink(book)}
                            target="_blank"
                            rel="noreferrer"
                          >
                            View book ↗
                          </a>

                        </div>

                      </div>

                      {/* BOOK INFORMATION */}

                      <div className="book-information">

                        <span className="book-category">
                          {book.genre}
                        </span>

                        <h3>
                          {book.title}
                        </h3>

                        <p>
                          {book.author}
                        </p>

                        <div className="book-meta">
                          <span>
                            {book.year}
                          </span>

                          <span>
                            {currentGenreName}
                          </span>
                        </div>

                        <button
                          type="button"
                          className={`save-book ${savedBookIds.includes(book.id) ? "saved" : ""}`}
                          onClick={() =>
                            saveBook(
                              book
                            )
                          }
                        >
                          ♡ Save to shelf
                        </button>

                      </div>

                    </motion.article>

                  )
                )}

            </motion.div>

          ) : (

            /* EMPTY SEARCH */

            <motion.div
              key="empty"
              className="empty-books"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
            >

              <span>
                📚
              </span>

              <h3>
                No books found
              </h3>

              <p>
                Try another title,
                author or genre.
              </p>

              <button
                type="button"
                className="retry-books"
                onClick={() =>
                  setActiveGenre(
                    "adventure"
                  )
                }
              >
                Browse Adventure →
              </button>

            </motion.div>

          )}

        </AnimatePresence>

      </div>

      {/* =========================
          QUICK VIEW MODAL
      ========================== */}

      {activeBook && (

        <div
          className="book-modal-backdrop"
          onClick={() =>
            setActiveBook(null)
          }
        >

          <motion.div
            className="book-modal"
            initial={{
              opacity: 0,
              scale: 0.94,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              type="button"
              className="modal-close"
              onClick={() =>
                setActiveBook(null)
              }
              aria-label="Close book preview"
            >
              ×
            </button>

            <BookCover book={activeBook} alt={activeBook.title} />

            <div>

              <span className="eyebrow">
                {activeBook.genre.toUpperCase()}
              </span>

              <h2>
                {activeBook.title}
              </h2>

              <p>
                By{" "}
                {activeBook.author}
              </p>

              <p>
                First published in{" "}
                {activeBook.year}
              </p>

              <p>
                {activeBook.description}
              </p>

              <a
                className="modal-button"
                href={getBookLink(activeBook)}
                target="_blank"
                rel="noreferrer"
              >
                Explore this book →
              </a>

            </div>

          </motion.div>

        </div>

      )}

    </section>
  );
}
