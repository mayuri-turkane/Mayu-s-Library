"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import "../auth.css";

export default function SignUpPage() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function signUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase) {
      return setMessage("Connect Supabase in .env.local to enable account creation.");
    }

    const data = new FormData(event.currentTarget);
    const password = String(data.get("password"));

    if (password.length < 8) {
      return setMessage("Use at least 8 characters for your password.");
    }

    const { data: signUpData, error } = await supabase.auth.signUp({
      email: String(data.get("email")),
      password,
      options: { data: { display_name: String(data.get("name")) } },
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    if (!signUpData.session) {
      setMessage("Account created. Please confirm your email, then sign in.");
      return;
    }

    router.replace("/");
  }

  return (
    <main className="auth-page auth-signup-page">
      <div className="auth-orb auth-orb-one" />
      <div className="auth-orb auth-orb-two" />

      <a href="/" className="auth-brand">
        <span>M</span> Mayu&apos;s Library
      </a>

      <section className="auth-book auth-signup-book" aria-label="Create a Mayu's Library account">
        <aside className="auth-book-cover" aria-hidden="true">
          <span className="cover-spark cover-spark-one">✦</span>
          <span className="cover-spark cover-spark-two">✦</span>
          <p>Mayu&apos;s Library</p>
          <div className="cover-illustration">
            <span />
            <span />
            <span />
          </div>
          <strong>A new story<br />begins here.</strong>
          <small>MAKE ROOM FOR MORE WONDER</small>
        </aside>

        <div className="auth-card auth-book-page">
          <span className="page-number">— 01 —</span>
          <p className="eyebrow">JOIN THE LIBRARY</p>
          <h1>Begin your<br /><em>reading journey.</em></h1>
          <p>Free, welcoming, and built for curious readers.</p>

          <form onSubmit={signUp}>
            <label>
              Your name
              <input name="name" type="text" required autoComplete="name" placeholder="Reader name" />
            </label>
            <label>
              Email
              <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
            </label>
            <label>
              Password
              <input name="password" type="password" required minLength={8} autoComplete="new-password" placeholder="At least 8 characters" />
            </label>
            <button>Create free account →</button>
          </form>

          {message && <p className="auth-message" role="status">{message}</p>}
          <p className="auth-switch">Already a member? <a href="/signin">Sign in</a></p>
        </div>
      </section>
    </main>
  );
}
