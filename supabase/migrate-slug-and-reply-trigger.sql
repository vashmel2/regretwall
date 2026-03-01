-- RegretWall: SEO-friendly slugs + reliable reply count trigger
-- Run in Supabase SQL editor

-- 1. Add slug column
alter table regrets add column if not exists slug text unique;

-- Index for fast slug lookups
create index if not exists idx_regrets_slug on regrets(slug) where slug is not null;

-- 2. Generate slugs for all existing regrets
-- Format: slugified-first-55-chars-of-text + first-8-chars-of-uuid
update regrets
set slug = regexp_replace(
    regexp_replace(
      trim('-' from
        regexp_replace(
          lower(left(text, 55)),
          '[^a-z0-9]+', '-', 'g'
        )
      ),
      '-+', '-', 'g'
    ),
    '-$', '', 'g'
  ) || '-' || left(replace(id::text, '-', ''), 8)
where slug is null;

-- 3. Reply count trigger (replaces the manual RPC call in the app)
-- This is atomic and can never fall out of sync
create or replace function sync_reply_count()
returns trigger
language plpgsql
security definer
as $$
begin
  if TG_OP = 'INSERT' then
    update regrets set reply_count = reply_count + 1 where id = NEW.regret_id;
  elsif TG_OP = 'DELETE' then
    update regrets set reply_count = greatest(reply_count - 1, 0) where id = OLD.regret_id;
  end if;
  return null;
end;
$$;

drop trigger if exists trigger_reply_count on regret_replies;
create trigger trigger_reply_count
after insert or delete on regret_replies
for each row execute function sync_reply_count();
