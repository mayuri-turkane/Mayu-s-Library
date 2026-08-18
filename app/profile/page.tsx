"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";
import "./profile.css";

type UserProfile = {
  name: string;
  email: string;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        const displayName = data.user.user_metadata?.display_name;

        setProfile({
          name:
            typeof displayName === "string" && displayName.trim()
              ? displayName.trim()
              : data.user.email?.split("@")[0] ?? "Reader",
          email: data.user.email ?? "",
        });
      }

      setLoading(false);
    }

    loadProfile();
  }, []);

  if (loading) {
    return (
      <main className="profile-page">
        <div className="profile-loading">Loading your profile...</div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="profile-page">
        <div className="profile-card">
          <h1>Please sign in</h1>
          <p>You need to sign in to view your profile.</p>

          <Link href="/signin" className="profile-button">
            Sign in →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="profile-page">
      <header className="profile-header">
        <Link href="/" className="profile-brand">
          <span className="profile-brand-mark">M</span>
          <span>
            Mayu&apos;s <strong>Library</strong>
          </span>
        </Link>

        <Link href="/" className="profile-back">
          ← Back to library
        </Link>
      </header>

      <section className="profile-container">
        <div className="profile-heading">
          <span>YOUR READER PROFILE</span>

          <h1>
            Welcome,
            <br />
            <em>{profile.name}.</em>
          </h1>

          <p>
            Your little corner of Mayu&apos;s Library.
            Keep track of your books, shelves and reading journey.
          </p>
        </div>

        <div className="profile-card">
          <div className="profile-avatar">
            {profile.name.charAt(0).toUpperCase()}
          </div>

          <div className="profile-details">
            <span className="profile-label">YOUR NAME</span>
            <h2>{profile.name}</h2>

            <span className="profile-label">EMAIL ADDRESS</span>
            <p>{profile.email}</p>
          </div>

          <div className="profile-actions">
            <Link href="/shelf" className="profile-action">
              <span>♥</span>
              <div>
                <strong>Saved shelf</strong>
                <small>Your saved books</small>
              </div>
              <b>→</b>
            </Link>

            <Link href="/history" className="profile-action">
              <span>◷</span>
              <div>
                <strong>Reading history</strong>
                <small>Your recently opened books</small>
              </div>
              <b>→</b>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}