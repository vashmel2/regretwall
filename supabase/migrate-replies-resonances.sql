-- RegretWall: Add replies and resonances
-- Run in Supabase SQL editor

-- 1. Add counter columns to regrets
alter table regrets add column if not exists resonance_count integer not null default 0;
alter table regrets add column if not exists reply_count integer not null default 0;

-- 2. Resonances table (deduped "felt this" by IP hash)
create table if not exists regret_resonances (
  id uuid primary key default gen_random_uuid(),
  regret_id uuid not null references regrets(id) on delete cascade,
  ip_hash text not null,
  created_at timestamptz not null default now(),
  unique (regret_id, ip_hash)
);

create index if not exists idx_regret_resonances_regret on regret_resonances(regret_id);

-- 3. Replies table
create table if not exists regret_replies (
  id uuid primary key default gen_random_uuid(),
  regret_id uuid not null references regrets(id) on delete cascade,
  text text not null check (char_length(text) >= 2 and char_length(text) <= 300),
  created_at timestamptz not null default now(),
  is_hidden boolean not null default false,
  flag_count integer not null default 0
);

create index if not exists idx_regret_replies_regret on regret_replies(regret_id, created_at asc);

-- 4. RLS
alter table regret_resonances enable row level security;
alter table regret_replies enable row level security;

create policy "No direct access to resonances"
  on regret_resonances for select using (false);

create policy "Public can read visible replies"
  on regret_replies for select using (is_hidden = false);

create policy "Public can insert replies"
  on regret_replies for insert with check (true);

-- 5. RPC: increment reply_count atomically
create or replace function increment_reply_count(p_regret_id uuid)
returns void
language sql
security definer
as $$
  update regrets set reply_count = reply_count + 1 where id = p_regret_id;
$$;

-- 6. RPC: resonate (deduped, returns new count + whether it was new)
create or replace function resonate_regret(p_regret_id uuid, p_ip_hash text)
returns jsonb
language plpgsql
security definer
as $$
declare
  v_is_new boolean;
  v_new_count integer;
begin
  insert into regret_resonances (regret_id, ip_hash)
  values (p_regret_id, p_ip_hash)
  on conflict (regret_id, ip_hash) do nothing;

  get diagnostics v_is_new = row_count;

  if v_is_new then
    update regrets
    set resonance_count = resonance_count + 1
    where id = p_regret_id
    returning resonance_count into v_new_count;
  else
    select resonance_count into v_new_count from regrets where id = p_regret_id;
  end if;

  return jsonb_build_object('is_new', v_is_new, 'count', v_new_count);
end;
$$;
