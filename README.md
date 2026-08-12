# PagePort

A modern, youth-friendly digital library built with Next.js. The design uses the Open Library Covers API for public book artwork and is ready to connect to Supabase for accounts, saved books, and private storage.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Connect Supabase

1. Create a Supabase project and run [`supabase/schema.sql`](./supabase/schema.sql) in its SQL Editor.
2. Copy `.env.example` to `.env.local` and add your project's URL and **anon** key.
3. Enable your preferred Auth providers in Supabase. Keep the service-role key secret: it must never be exposed in a `NEXT_PUBLIC_` variable.

The included SQL enables Row Level Security so users can only access their own reading lists, saved books, and avatar folder.

## Deploy to Vercel

1. Push this folder to GitHub.
2. Import the repository at [vercel.com/new](https://vercel.com/new).
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel Project Settings → Environment Variables.
4. Deploy. Vercel detects Next.js automatically.

## Safety notes

- Do not collect birth dates or unnecessary personal data from young readers.
- Set up parent/guardian consent and moderation procedures before enabling public profiles, comments, or messaging.
- Keep Supabase RLS enabled in production and use server-side routes for any privileged action.
