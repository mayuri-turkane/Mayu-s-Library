export type LibraryBook = {
  id: string;
  title: string;
  author: string;
  genre: string;
  year: number;
  isbn: string;
  /** Project Gutenberg eBook number, when the title is available there. */
  gutenbergId?: number;
  description: string;
};

export const libraryBooks: LibraryBook[] = [
  // =========================
  // ADVENTURE
  // =========================

  {
    id: "adventure-1",
    title: "The Swiss Family Robinson",
    author: "Johann David Wyss",
    genre: "adventure",
    year: 1812,
    isbn: "9780140367624",
    gutenbergId: 11703,
    description:
      "A shipwrecked family builds a remarkable new life and explores an island full of surprises.",
  },

  {
    id: "adventure-2",
    title: "Treasure Island",
    author: "Robert Louis Stevenson",
    genre: "adventure",
    year: 1883,
    isbn: "9780141321004",
    gutenbergId: 120,
    description:
      "A young boy becomes caught in a dangerous search for buried pirate treasure.",
  },

  {
    id: "adventure-3",
    title: "Around the World in Eighty Days",
    author: "Jules Verne",
    genre: "adventure",
    year: 1872,
    isbn: "9780140448394",
    gutenbergId: 103,
    description:
      "Phileas Fogg races around the world in an extraordinary journey against the clock.",
  },

  {
    id: "adventure-4",
    title: "The Call of the Wild",
    author: "Jack London",
    genre: "adventure",
    year: 1903,
    isbn: "9780451531513",
    gutenbergId: 215,
    description:
      "A domesticated dog is drawn into the harsh wilderness of the Yukon.",
  },

  {
    id: "adventure-5",
    title: "The Three Musketeers",
    author: "Alexandre Dumas",
    genre: "adventure",
    year: 1844,
    isbn: "9780140440250",
    gutenbergId: 1257,
    description:
      "A young swordsman joins three legendary companions in a world of intrigue and danger.",
  },

  // =========================
  // FANTASY
  // =========================

  {
    id: "fantasy-1",
    title: "Peter Pan",
    author: "J. M. Barrie",
    genre: "fantasy",
    year: 1911,
    isbn: "9780141329819",
    gutenbergId: 16,
    description:
      "Peter Pan takes Wendy and her brothers on a magical adventure to Neverland.",
  },

  {
    id: "fantasy-2",
    title: "The Princess and the Goblin",
    author: "George MacDonald",
    genre: "fantasy",
    year: 1872,
    isbn: "9780140367938",
    gutenbergId: 708,
    description:
      "Princess Irene and her friend Curdie uncover a dangerous goblin plot beneath the mountain.",
  },

  {
    id: "fantasy-3",
    title: "Alice's Adventures in Wonderland",
    author: "Lewis Carroll",
    genre: "fantasy",
    year: 1865,
    isbn: "9780141439761",
    gutenbergId: 11,
    description:
      "Alice falls into a strange world filled with unforgettable characters and impossible adventures.",
  },

  {
    id: "fantasy-4",
    title: "The Wonderful Wizard of Oz",
    author: "L. Frank Baum",
    genre: "fantasy",
    year: 1900,
    isbn: "9780486291162",
    gutenbergId: 55,
    description:
      "Dorothy is swept into the magical land of Oz and searches for a way home.",
  },

  {
    id: "fantasy-5",
    title: "The King of the Golden River",
    author: "John Ruskin",
    genre: "fantasy",
    year: 1851,
    isbn: "9780140367419",
    gutenbergId: 701,
    description:
      "Three brothers encounter an enchanted river and learn that kindness is more valuable than gold.",
  },

  // =========================
  // MYSTERY
  // =========================

  {
    id: "mystery-1",
    title: "The Hound of the Baskervilles",
    author: "Arthur Conan Doyle",
    genre: "mystery",
    year: 1902,
    isbn: "9780140437867",
    gutenbergId: 2852,
    description:
      "Sherlock Holmes investigates a mysterious curse surrounding the Baskerville family.",
  },

  {
    id: "mystery-2",
    title: "The Moonstone",
    author: "Wilkie Collins",
    genre: "mystery",
    year: 1868,
    isbn: "9780140437648",
    gutenbergId: 155,
    description:
      "The disappearance of a priceless diamond draws a household into a tense investigation.",
  },

  {
    id: "mystery-3",
    title: "The Thirty-Nine Steps",
    author: "John Buchan",
    genre: "mystery",
    year: 1915,
    isbn: "9780140011580",
    gutenbergId: 558,
    description:
      "An ordinary man is pulled into a dangerous conspiracy and must outrun enemies across Scotland.",
  },

  {
    id: "mystery-4",
    title: "The Adventures of Sherlock Holmes",
    author: "Arthur Conan Doyle",
    genre: "mystery",
    year: 1892,
    isbn: "9780142437332",
    gutenbergId: 1661,
    description:
      "A collection of classic investigations featuring Sherlock Holmes and Dr. Watson.",
  },

  {
    id: "mystery-5",
    title: "The Woman in White",
    author: "Wilkie Collins",
    genre: "mystery",
    year: 1859,
    isbn: "9780140430656",
    gutenbergId: 583,
    description:
      "A mysterious woman and a dark family secret lead to a gripping Victorian mystery.",
  },

  // =========================
  // CLASSICS
  // =========================

  {
    id: "classic-1",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "classics",
    year: 1813,
    isbn: "9780141439518",
    gutenbergId: 1342,
    description:
      "Elizabeth Bennet navigates love, family expectations and social class in Regency England.",
  },

  {
    id: "classic-2",
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    genre: "classics",
    year: 1847,
    isbn: "9780141441146",
    gutenbergId: 1260,
    description:
      "An independent young woman searches for love, purpose and freedom.",
  },

  {
    id: "classic-3",
    title: "Little Women",
    author: "Louisa May Alcott",
    genre: "classics",
    year: 1868,
    isbn: "9780147514011",
    gutenbergId: 514,
    description:
      "Four sisters grow up together while discovering their own dreams and identities.",
  },

  {
    id: "classic-4",
    title: "The Secret Garden",
    author: "Frances Hodgson Burnett",
    genre: "classics",
    year: 1911,
    isbn: "9780142437059",
    gutenbergId: 17396,
    description:
      "A lonely child discovers a hidden garden and begins to transform her life.",
  },

  {
    id: "classic-5",
    title: "Anne of Green Gables",
    author: "L. M. Montgomery",
    genre: "classics",
    year: 1908,
    isbn: "9780553213133",
    gutenbergId: 45,
    description:
      "An imaginative orphan finds a home and a new family on Prince Edward Island.",
  },

  // =========================
  // SCIENCE
  // =========================

  {
    id: "science-1",
    title: "The Voyage of the Beagle",
    author: "Charles Darwin",
    genre: "science",
    year: 1839,
    isbn: "9780140432684",
    gutenbergId: 944,
    description:
      "Darwin's observations from a voyage around the world helped shape modern natural science.",
  },

  {
    id: "science-2",
    title: "The First Men in the Moon",
    author: "H. G. Wells",
    genre: "science",
    year: 1901,
    isbn: "9780141441023",
    gutenbergId: 1013,
    description:
      "Two explorers use a strange new material to travel to the Moon and meet its inhabitants.",
  },

  {
    id: "science-3",
    title: "The Origin of Species",
    author: "Charles Darwin",
    genre: "science",
    year: 1859,
    isbn: "9780451529060",
    gutenbergId: 1228,
    description:
      "Darwin's landmark work introducing the theory of evolution through natural selection.",
  },

  {
    id: "science-4",
    title: "The Chemical History of a Candle",
    author: "Michael Faraday",
    genre: "science",
    year: 1861,
    isbn: "9780486444884",
    gutenbergId: 14474,
    description:
      "Faraday uses the familiar flame of a candle to explain foundational ideas in chemistry.",
  },

  {
    id: "science-5",
    title: "The Expression of the Emotions in Man and Animals",
    author: "Charles Darwin",
    genre: "science",
    year: 1872,
    isbn: "9780226133732",
    gutenbergId: 1227,
    description:
      "Darwin explores how people and animals communicate emotion through expression and behavior.",
  },

  // =========================
  // HISTORY
  // =========================

  {
    id: "history-1",
    title: "A Short History of the World",
    author: "H. G. Wells",
    genre: "history",
    year: 1922,
    isbn: "9780141440545",
    gutenbergId: 35461,
    description:
      "A clear, wide-ranging account of human civilization from prehistory to the modern age.",
  },

  {
    id: "history-2",
    title: "The Diary of a Young Girl",
    author: "Anne Frank",
    genre: "history",
    year: 1947,
    isbn: "9780553296983",
    gutenbergId: 25905,
    description:
      "Anne Frank's powerful diary documenting her life while hiding during World War II.",
  },

  {
    id: "history-3",
    title: "The Story of Mankind",
    author: "Hendrik Willem van Loon",
    genre: "history",
    year: 1921,
    isbn: "9781631492245",
    gutenbergId: 754,
    description:
      "An illustrated introduction to the events and ideas that shaped human history.",
  },

  {
    id: "history-4",
    title: "The Travels of Marco Polo",
    author: "Marco Polo",
    genre: "history",
    year: 1298,
    isbn: "9780140440571",
    gutenbergId: 10636,
    description:
      "Marco Polo recounts his extraordinary journeys through Asia and the cultures he encountered.",
  },

  {
    id: "history-5",
    title: "Narrative of the Life of Frederick Douglass",
    author: "Frederick Douglass",
    genre: "history",
    year: 1845,
    isbn: "9780142439085",
    gutenbergId: 23,
    description:
      "Frederick Douglass recounts his life, education, and path from enslavement to freedom.",
  },
];
