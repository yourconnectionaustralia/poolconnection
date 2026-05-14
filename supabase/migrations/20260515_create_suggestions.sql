-- ─────────────────────────────────────────────────────────────────
-- Migration: create suggestions table + RLS
-- Date: 2026-05-15
-- Purpose: persists in-app feedback pins submitted via SuggestionBox
-- ─────────────────────────────────────────────────────────────────

create extension if not exists "pgcrypto";

create table if not exists public.suggestions (
  id           uuid primary key default gen_random_uuid(),
  batch_id    text not null,
  user_id     uuid references auth.users(id) on delete set null,
  user_email  text,                          -- captured at submit time; useful when user_id is null
  view_name   text,                          -- e.g. "health", "tests", "history"
  path        text,                          -- window.location.pathname
  x           integer,                       -- viewport x at time of pin drop
  y           integer,                       -- viewport y at time of pin drop
  viewport_w  integer,
  viewport_h  integer,
  comment     text not null check (char_length(comment) between 1 and 4000),
  user_agent  text,
  created_at  timestamptz not null default now(),
  status      text not null default 'new'    -- new | triaged | shipped | wontfix
);

create index if not exists suggestions_batch_idx     on public.suggestions (batch_id);
create index if not exists suggestions_user_idx      on public.suggestions (user_id);
create index if not exists suggestions_created_idx   on public.suggestions (created_at desc);
create index if not exists suggestions_view_idx      on public.suggestions (view_name);

-- ─── RLS ───────────────────────────────────────────────────────
alter table public.suggestions enable row level security;

-- Anyone authenticated may insert their own row (the Edge Function uses the
-- service-role key to bypass these, so this only protects direct PostgREST
-- access if it's ever exposed).
drop policy if exists "suggestions: insert by anyone" on public.suggestions;
create policy "suggestions: insert by anyone"
  on public.suggestions
  for insert
  to authenticated, anon
  with check (true);

-- A user can read their own submissions.
drop policy if exists "suggestions: read own" on public.suggestions;
create policy "suggestions: read own"
  on public.suggestions
  for select
  to authenticated
  using (user_id = auth.uid());

-- Admins (members of the `admin` role in auth.users.app_metadata) can read all.
-- Adjust the admin list as needed. Setup pattern: in Supabase dashboard
-- run `update auth.users set raw_app_meta_data = raw_app_meta_data || '{"role":"admin"}' where email = 'yourconnectionaustralia@gmail.com';`
drop policy if exists "suggestions: admin read all" on public.suggestions;
create policy "suggestions: admin read all"
  on public.suggestions
  for select
  to authenticated
  using (
    coalesce(
      (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin',
      false
    )
  );

drop policy if exists "suggestions: admin update" on public.suggestions;
create policy "suggestions: admin update"
  on public.suggestions
  for update
  to authenticated
  using (
    coalesce(
      (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin',
      false
    )
  )
  with check (true);

-- Sanity check
-- select * from public.suggestions limit 1;
