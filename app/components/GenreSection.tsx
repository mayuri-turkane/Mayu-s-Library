"use client";

import { motion } from "framer-motion";

const genres = [
  {
    name: "Adventure",
    icon: "▲",
    description: "Journeys & quests",
    color: "peach",
  },
  {
    name: "Fantasy",
    icon: "✦",
    description: "Magic & wonder",
    color: "lavender",
  },
  {
    name: "Mystery",
    icon: "◈",
    description: "Secrets & clues",
    color: "mint",
  },
  {
    name: "Classics",
    icon: "♛",
    description: "Stories that last",
    color: "rose",
  },
  {
    name: "Science",
    icon: "⚗",
    description: "Ideas & discovery",
    color: "green",
  },
  {
    name: "History",
    icon: "⌛",
    description: "Past & people",
    color: "gold",
  },
];

type GenreSectionProps = {
  onSelect: (genre: string) => void;
};

export default function GenreSection({
  onSelect,
}: GenreSectionProps) {
  return (
    <section className="genre-section" id="genres">
      <div className="section-container">
        <div className="section-heading compact-heading">
          <div>
            <span className="eyebrow">EXPLORE BY GENRE</span>
            <h2>Choose your next world.</h2>
          </div>

          <span className="section-note">
            Tap a shelf to start exploring →
          </span>
        </div>

        <div className="genre-grid">
          {genres.map((genre, index) => (
            <motion.button
              key={genre.name}
              className={`genre-card ${genre.color}`}
              onClick={() => onSelect(genre.name)}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.06,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="genre-icon">
                {genre.icon}
              </span>

              <strong>{genre.name}</strong>

              <small>{genre.description}</small>

              <span className="genre-arrow">↗</span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}