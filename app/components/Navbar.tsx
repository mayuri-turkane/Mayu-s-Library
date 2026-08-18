"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { supabase } from "../../lib/supabase";

type NavbarProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  largeText: boolean;
  onToggleLargeText: () => void;
};

type Account = { name: string; email: string };

function getUserInfo(
  user: { email?: string; user_metadata?: Record<string, unknown> } | null
): Account | null {
  if (!user) return null;
  const displayName = user.user_metadata?.display_name;

  return {
    name: typeof displayName === "string" && displayName.trim()
      ? displayName.trim()
      : user.email?.split("@")[0] ?? "Reader",
    email: user.email ?? "",
  };
}

function getSavedBookCount() {
  try {
    return JSON.parse(localStorage.getItem("mayu-saved-books") || "[]").length;
  } catch {
    return 0;
  }
}

export default function Navbar({
  searchValue,
  onSearchChange,
  onSearch,
  largeText,
  onToggleLargeText,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [account, setAccount] = useState<Account | null>(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const [savedBookCount, setSavedBookCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let active = true;

    supabase.auth.getUser().then(({ data }) => {
      if (active) setAccount(getUserInfo(data.user));
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setAccount(getUserInfo(session?.user ?? null))
    );

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const updateSavedBookCount = () => setSavedBookCount(getSavedBookCount());

    updateSavedBookCount();
    window.addEventListener("storage", updateSavedBookCount);
    return () => window.removeEventListener("storage", updateSavedBookCount);
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    setAccountOpen(false);
  }

  return (
    <header className={`main-navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-inner">
        <Logo />

        <nav className={`main-nav ${menuOpen ? "mobile-open" : ""}`}>
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <a href="#discover" onClick={() => setMenuOpen(false)}>Discover</a>
          <a href="#genres" onClick={() => setMenuOpen(false)}>Genres</a>
          <a href="#mood" onClick={() => setMenuOpen(false)}>Reading Mood</a>
          <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
        </nav>

        <div className="navbar-search">
          <span aria-hidden="true">⌕</span>
          <input
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && onSearch()}
            placeholder="Search books..."
            aria-label="Search books"
          />
          {searchValue && (
            <button type="button" onClick={() => onSearchChange("")} aria-label="Clear search">
              &times;
            </button>
          )}
        </div>

        <div className="navbar-actions">
          <button
            className={`accessibility-button ${largeText ? "active" : ""}`}
            onClick={onToggleLargeText}
            aria-label="Toggle larger text"
            aria-pressed={largeText}
          >
            A+
          </button>

          {account ? (
            <div className="account-menu-wrap">
              <button
                type="button"
                className="user-greeting"
                onClick={() => {
                  setSavedBookCount(getSavedBookCount());
                  setAccountOpen((isOpen) => !isOpen);
                }}
                aria-expanded={accountOpen}
                aria-haspopup="menu"
              >
                <span aria-hidden="true">✦</span> {account.name}
              </button>

              {accountOpen && (
                <div className="account-menu" role="menu">
                  <div className="account-menu-header">
                    <span className="account-avatar" aria-hidden="true">
                      {account.name.charAt(0).toUpperCase()}
                    </span>
                    <div>
                      <strong>{account.name}</strong>
                      <small>{account.email}</small>
                    </div>
                  </div>
<Link
  href="/profile"
  role="menuitem"
  onClick={() => setAccountOpen(false)}
>
  <span>♙</span>
  <div>
    <strong>Your profile</strong>
    <small>Reader account</small>
  </div>
</Link><Link
  href="/shelf"
  role="menuitem"
  onClick={() => setAccountOpen(false)}
>
  <span>♥</span>

  <div>
    <strong>Saved shelf</strong>

    <small>
      {savedBookCount} saved{" "}
      {savedBookCount === 1 ? "book" : "books"}
    </small>
  </div>
</Link><Link
  href="/history"
  role="menuitem"
  onClick={() => setAccountOpen(false)}
>
  <span>◷</span>

  <div>
    <strong>Reading history</strong>
    <small>No books marked as read yet</small>
  </div>
</Link><Link
  href="/downloads"
  role="menuitem"
  onClick={() => setAccountOpen(false)}
>
  <span>⇩</span>

  <div>
    <strong>Downloads</strong>
    <small>No downloaded books yet</small>
  </div>
</Link>

                  <button type="button" className="account-signout" onClick={handleSignOut}>
                    Sign out <span>&rarr;</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/signin" className="signin-link">Sign in</Link>
              <Link href="/signup" className="join-button">Join free <span>&rarr;</span></Link>
            </>
          )}

          <button
            className="mobile-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            <i />
            <i />
            <i />
          </button>
        </div>
      </div>
    </header>
  );
}
