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
