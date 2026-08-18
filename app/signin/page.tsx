"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import "../auth.css";

export default function SignInPage() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase) {
      return setMessage("Connect Supabase in .env.local to enable sign in.");
    }

    const data = new FormData(event.currentTarget);
    const { error } = await supabase.auth.signInWithPassword({
      email: String(data.get("email")),
      password: String(data.get("password")),
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    router.replace("/");
  }

  return (
    <main className="auth-page auth-signin-page">
      <div className="auth-orb auth-orb-one" />
      <div className="auth-orb auth-orb-two" />

      <a href="/" className="auth-brand">
        <span>M</span> Mayu&apos;s Library
      </a>

      <section className="auth-book" aria-label="Sign in to Mayu's Library">
        <aside className="auth-book-cover" aria-hidden="true">
          <span className="cover-spark cover-spark-one">✦</span>
          <span className="cover-spark cover-spark-two">✦</span>
          <p>Mayu&apos;s Library</p>
          <div className="cover-illustration">
            <span />
            <span />
            <span />
          </div>
          <strong>Welcome<br />back, reader.</strong>
          <small>YOUR STORY CONTINUES HERE</small>
        </aside>

        <div className="auth-card auth-book-page">
          <span className="page-number">— 01 —</span>
          <p className="eyebrow">WELCOME BACK</p>
          <h1>Pick up your<br /><em>next chapter.</em></h1>
          <p>Sign in to return to your saved shelf.</p>

          <form onSubmit={signIn}>
            <label>
              Email
              <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
            </label>
            <label>
              Password
              <input name="password" type="password" required autoComplete="current-password" placeholder="Your password" />
            </label>
            <button>Sign in →</button>
          </form>

          {message && <p className="auth-message" role="status">{message}</p>}
          <p className="auth-switch">New here? <a href="/signup">Create a free account</a></p>
        </div>
      </section>
    </main>
  );
}
