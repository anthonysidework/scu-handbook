-- SCU Handbook — Supabase Schema
-- Run this in the Supabase SQL editor after creating your project.
-- Dashboard → SQL Editor → New query → paste & run.

-- ─── Profiles ────────────────────────────────────────────────────────────────
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  display_name text,
  created_at timestamptz default now() not null
);

alter table profiles enable row level security;

create policy "Profiles viewable by everyone"
  on profiles for select using (true);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- Auto-create profile on sign-up
create or replace function handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ─── Ratings ─────────────────────────────────────────────────────────────────
create table if not exists ratings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  item_id text not null,
  hall_id text not null,
  score smallint not null check (score between 1 and 5),
  created_at timestamptz default now() not null,
  unique(user_id, item_id)
);

alter table ratings enable row level security;

create policy "Ratings viewable by everyone"
  on ratings for select using (true);

create policy "Authenticated users can insert ratings"
  on ratings for insert with check (auth.uid() = user_id);

create policy "Users can update own ratings"
  on ratings for update using (auth.uid() = user_id);

create policy "Users can delete own ratings"
  on ratings for delete using (auth.uid() = user_id);

-- ─── Supabase Auth Config ─────────────────────────────────────────────────────
-- In Supabase Dashboard → Authentication → Providers → Google:
--   1. Enable Google provider
--   2. Add Google Client ID and Secret from Google Cloud Console
--   3. Set redirect URL to: https://<your-domain>/auth/callback
--
-- In Google Cloud Console → APIs & Services → Credentials:
--   1. Create OAuth 2.0 Client ID (Web application)
--   2. Add authorized redirect URI: https://<your-supabase-project>.supabase.co/auth/v1/callback
--
-- In Supabase Dashboard → Authentication → URL Configuration:
--   Set Site URL to your production domain (or http://localhost:3000 for dev)
--   Add http://localhost:3000/auth/callback to Redirect URLs
