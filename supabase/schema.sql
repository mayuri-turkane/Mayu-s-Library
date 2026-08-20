-- Run this in Supabase SQL Editor. Row Level Security keeps every reader's data private.
create table if not exists public.reading_lists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 120),
  created_at timestamptz not null default now()
);

create table if not exists public.saved_books (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  open_library_id text not null check (open_library_id ~ '^[A-Za-z0-9-]{1,64}$'),
  title text not null check (char_length(title) between 1 and 300),
  author text check (char_length(author) <= 300),
  created_at timestamptz not null default now(),
  unique (user_id, open_library_id)
);

alter table public.reading_lists enable row level security;
alter table public.saved_books enable row level security;

create policy "Readers manage only their lists" on public.reading_lists
  for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Readers manage only their saved books" on public.saved_books
  for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

-- Storage bucket for future user-uploaded avatars; keep it private by default.
insert into storage.buckets (id, name, public) values ('avatars', 'avatars', false)
on conflict (id) do nothing;

create policy "Users upload only into their own folder" on storage.objects for insert
  with check (bucket_id = 'avatars' and (select auth.uid())::text = (storage.foldername(name))[1]);
create policy "Users read only their own avatar" on storage.objects for select
  using (bucket_id = 'avatars' and (select auth.uid())::text = (storage.foldername(name))[1]);

-- Book ratings and reviews
create table if not exists public.book_reviews (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references auth.users(id)
    on delete cascade,

  open_library_id text not null
    check (char_length(open_library_id) between 1 and 100),

  rating integer not null
    check (rating between 1 and 5),

  review text
    check (char_length(review) <= 1000),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique (user_id, open_library_id)
);

-- Enable Row Level Security
alter table public.book_reviews enable row level security;

-- Anyone can read reviews
create policy "Anyone can read book reviews"
on public.book_reviews
for select
using (true);

-- Logged-in users can create their own review
create policy "Users can create their own reviews"
on public.book_reviews
for insert
with check ((select auth.uid()) = user_id);

-- Users can update only their own review
create policy "Users can update their own reviews"
on public.book_reviews
for update
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

-- Users can delete only their own review
create policy "Users can delete their own reviews"
on public.book_reviews
for delete
using ((select auth.uid()) = user_id);