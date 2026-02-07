-- Migration: Add flag deduplication
-- Run this in Supabase SQL editor if you already have the base schema

-- Create flags tracking table
create table if not exists regret_flags (
  id uuid primary key default gen_random_uuid(),
  regret_id uuid not null references regrets(id) on delete cascade,
  ip_hash text not null,
  created_at timestamptz not null default now(),
  unique (regret_id, ip_hash)
);

-- Enable RLS
alter table regret_flags enable row level security;

-- No direct access — flags only via RPC
create policy "No direct access to flags"
  on regret_flags for select
  using (false);

-- Replace the flag function with deduplicated version
create or replace function flag_regret(regret_id uuid, flagger_ip_hash text)
returns boolean
language plpgsql
security definer
as $$
declare
  is_new boolean;
begin
  insert into regret_flags (regret_id, ip_hash)
  values (regret_id, flagger_ip_hash)
  on conflict (regret_id, ip_hash) do nothing;

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
