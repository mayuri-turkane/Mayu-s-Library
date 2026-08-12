"use client";

import { FormEvent, useState } from "react";
import { supabase } from "../../lib/supabase";
import "../auth.css";

export default function SignInPage() {
  const [message, setMessage] = useState("");
  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return setMessage("Connect Supabase in .env.local to enable sign in.");
    const data = new FormData(event.currentTarget);
    const { error } = await supabase.auth.signInWithPassword({ email: String(data.get("email")), password: String(data.get("password")) });
    setMessage(error ? error.message : "Welcome back! You are signed in.");
  }
  return <main className="auth-page"><a href="/" className="auth-brand"><span>M</span> Mayu&apos;s Library</a><section className="auth-card"><p className="eyebrow">WELCOME BACK</p><h1>Pick up your<br /><em>next chapter.</em></h1><p>Sign in to return to your saved shelf.</p><form onSubmit={signIn}><label>Email<input name="email" type="email" required autoComplete="email" placeholder="you@example.com" /></label><label>Password<input name="password" type="password" required autoComplete="current-password" placeholder="Your password" /></label><button>Sign in →</button></form>{message && <p className="auth-message" role="status">{message}</p>}<p className="auth-switch">New here? <a href="/signup">Create a free account</a></p></section></main>;
}
