-- RegretWall Database Schema
-- Run this in your Supabase SQL editor to set up the database

-- Create the regrets table
create table if not exists regrets (
  id uuid primary key default gen_random_uuid(),
  text text not null check (char_length(text) >= 5 and char_length(text) <= 500),
  topic text check (topic in ('love', 'career', 'money', 'family', 'health', 'fear')),
  age_range text check (age_range in ('<18', '18-25', '26-35', '36-50', '50+')),
  created_at timestamptz not null default now(),
  is_hidden boolean not null default false,
  flag_count integer not null default 0
);

-- Index for efficient cursor-based pagination (newest first)
create index if not exists idx_regrets_created_at on regrets (created_at desc);

-- Index for filtering visible regrets
create index if not exists idx_regrets_visible on regrets (is_hidden, created_at desc);

-- Enable Row Level Security
alter table regrets enable row level security;

-- Policy: Anyone can read non-hidden regrets
create policy "Public can read visible regrets"
  on regrets for select
  using (is_hidden = false);

-- Policy: Anyone can insert regrets
create policy "Public can insert regrets"
  on regrets for insert
  with check (true);

-- Policy: Anyone can increment flag_count (via RPC)
-- We use an RPC function instead of direct update for safety

-- Function to flag a regret
create or replace function flag_regret(regret_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  update regrets
  set flag_count = flag_count + 1,
      is_hidden = case when flag_count + 1 >= 5 then true else is_hidden end
  where id = regret_id;
end;
$$;
