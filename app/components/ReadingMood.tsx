"use client";

import { motion } from "framer-motion";

const moods = [
  {
    title: "Curious",
    description: "Teach me something new",
    icon: "✦",
    search: "science",
    color: "curious",
  },
  {
    title: "Escaping",
    description: "Take me somewhere else",
    icon: "◌",
    search: "fantasy",
    color: "escaping",
  },
  {
    title: "Cozy",
    description: "Give me a warm story",
    icon: "♡",
    search: "romance",
    color: "cozy",
  },
  {
    title: "Adventurous",
    description: "I need a journey",
    icon: "↗",
    search: "adventure",
    color: "adventurous",
  },
  {
    title: "Reflective",
    description: "Something meaningful",
    icon: "☾",
    search: "philosophy",
    color: "reflective",
  },
  {
    title: "Learning",
    description: "Help me grow",
    icon: "◎",
    search: "history",
    color: "learning",
  },
];

type ReadingMoodProps = {
  onSelect: (search: string) => void;
};

export default function ReadingMood({
  onSelect,
}: ReadingMoodProps) {
  return (
    <section className="mood-section" id="mood">
      <div className="mood-background-shape" />

      <div className="section-container mood-container">
        <div className="mood-intro">
          <span className="eyebrow">
            YOUR READING MOMENT
          </span>

          <h2>
            What kind of
            <br />
            <em>world</em> do you need?
          </h2>

          <p>
            Tell us your mood. We&apos;ll help you
            find somewhere to go.
          </p>
        </div>

        <div className="mood-grid">
          {moods.map((mood, index) => (
            <motion.button
              key={mood.title}
              className={`mood-card mood-${mood.color}`}
              onClick={() => onSelect(mood.search)}
              whileHover={{
                y: -6,
                rotate: index % 2 ? 1 : -1,
              }}
              whileTap={{ scale: 0.96 }}
            >
              <span>{mood.icon}</span>

              <strong>{mood.title}</strong>

              <small>{mood.description}</small>

              <i>Explore →</i>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
