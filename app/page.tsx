"use client";

import { useState } from "react";
import "./home.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import GenreSection from "./components/GenreSection";
import TrendingBooks from "./components/TrendingBooks";
import ReadingMood from "./components/ReadingMood";
import Footer from "./components/Footer";

export default function Home() {
 const [query, setQuery] = useState("");
const [searchQuery, setSearchQuery] = useState("");
const [largeText, setLargeText] = useState(false);

  const performSearch = () => {
    setSearchQuery(query.trim());

    setTimeout(() => {
      document
        .getElementById("discover")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 50);
  };

  const selectCategory = (value: string) => {
    setQuery(value);
    setSearchQuery(value);

    setTimeout(() => {
      document
        .getElementById("discover")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 50);
  };

 return (
  <main className={`page ${largeText ? "large-text" : ""}`}>
     <Navbar
  searchValue={query}
  onSearchChange={setQuery}
  onSearch={performSearch}
  largeText={largeText}
  onToggleLargeText={() => setLargeText((value) => !value)}
/>
      <Hero
        query={query}
        onQueryChange={setQuery}
        onSearch={performSearch}
      />

      <GenreSection
        onSelect={selectCategory}
      />

      <TrendingBooks query={searchQuery} />

      <ReadingMood
        onSelect={selectCategory}
      />

      <Footer />
    </main>
  );
}
