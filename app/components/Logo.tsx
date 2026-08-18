"use client";

import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      aria-label="Mayu's Library home"
      className="mayu-logo-link"
    >
      <img
        src="/mayus-library-logo.svg"
        alt="Mayu's Library"
        className="mayu-logo"
      />
    </Link>
  );
}