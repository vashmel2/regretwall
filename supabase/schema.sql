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

-- Track individual flags to prevent duplicates
create table if not exists regret_flags (
  id uuid primary key default gen_random_uuid(),
  regret_id uuid not null references regrets(id) on delete cascade,
  ip_hash text not null,
  created_at timestamptz not null default now(),
  unique (regret_id, ip_hash)
);

-- Enable Row Level Security
alter table regrets enable row level security;
alter table regret_flags enable row level security;

-- Policy: Anyone can read non-hidden regrets
create policy "Public can read visible regrets"
  on regrets for select
  using (is_hidden = false);

-- Policy: Anyone can insert regrets
create policy "Public can insert regrets"
  on regrets for insert
  with check (true);

-- No direct access to regret_flags — only via RPC
create policy "No direct access to flags"
  on regret_flags for select
  using (false);

-- Function to flag a regret (deduplicated by IP hash)
-- Returns true if the flag was new, false if already flagged
create or replace function flag_regret(regret_id uuid, flagger_ip_hash text)
returns boolean
language plpgsql
security definer
as $$
declare
  is_new boolean;
begin
  -- Try to insert the flag; do nothing if this IP already flagged this regret
  insert into regret_flags (regret_id, ip_hash)
  values (regret_id, flagger_ip_hash)
  on conflict (regret_id, ip_hash) do nothing;

  -- Check if the insert actually happened
  get diagnostics is_new = row_count;

  if is_new then
    update regrets r
    set flag_count = r.flag_count + 1,
        is_hidden = case when r.flag_count + 1 >= 5 then true else r.is_hidden end
    where r.id = flag_regret.regret_id;
  end if;

  return is_new;
end;
$$;
