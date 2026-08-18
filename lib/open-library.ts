export type OpenLibraryBook = {
  key: string;
  title: string;
  authors: string[];
  coverId?: number;
  firstPublishYear?: number;
  subjects?: string[];
  editionCount?: number;
  rating?: number;
};

type SearchDocument = {
  key?: string;
  title?: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  subject?: string[];
  edition_count?: number;
  ratings_average?: number;
};

type SearchResponse = {
  docs?: SearchDocument[];
  numFound?: number;
};

const OPEN_LIBRARY_SEARCH =
  "https://openlibrary.org/search.json";

const USER_AGENT =
  "MayusLibrary/1.0 (contact: mayulibrary@gmail.com)";

/**
 * Convert Open Library documents
 * into our application format.
 */
function normalizeBooks(
  docs: SearchDocument[] = []
): OpenLibraryBook[] {
  return docs
    .filter((book) => book.key && book.title)
    .map((book) => ({
      key: book.key!,
      title: book.title!,
      authors:
        book.author_name?.length
          ? book.author_name
          : ["Unknown author"],
      coverId: book.cover_i,
      firstPublishYear: book.first_publish_year,
      subjects: book.subject?.slice(0, 4) ?? [],
      editionCount: book.edition_count,
      rating: book.ratings_average,
    }));
}

/**
 * Search books by title, author, topic, etc.
 */
export async function searchOpenLibrary(
  query: string,
  limit = 8
): Promise<OpenLibraryBook[]> {
  const params = new URLSearchParams();

  params.set("q", query || "fiction");
  params.set("limit", String(limit));

  params.set(
    "fields",
    [
      "key",
      "title",
      "author_name",
      "cover_i",
      "first_publish_year",
      "subject",
      "edition_count",
      "ratings_average",
    ].join(",")
  );

  const url = `${OPEN_LIBRARY_SEARCH}?${params.toString()}`;

  console.log("Open Library search:", url);

  const response = await fetch(url, {
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "application/json",
    },

    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();

    console.error(
      "Open Library error:",
      response.status,
      errorText
    );

    throw new Error(
      `Open Library returned ${response.status}`
    );
  }

  const data: SearchResponse =
    await response.json();

  return normalizeBooks(data.docs);
}

/**
 * Get books belonging to a specific genre.
 *
 * Uses Open Library's exact subject_key search.
 *
 * Examples:
 * subject_key:fantasy
 * subject_key:mystery
 * subject_key:history
 */
export async function getBooksByGenre(
  genre: string,
  limit = 8
): Promise<OpenLibraryBook[]> {
  const normalizedGenre = genre
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_");

  const query = `subject_key:${normalizedGenre}`;

  console.log(
    `Loading genre "${normalizedGenre}" with query "${query}"`
  );

  return searchOpenLibrary(query, limit);
}