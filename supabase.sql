-- Database setup for Key Tags (already applied to the live Supabase project).
create table if not exists items (
  id text primary key,
  kind text not null,
  data jsonb not null,
  created_at timestamptz default now()
);
create index if not exists items_kind on items (kind);

alter table items enable row level security;

-- Only signed-in users (Mark, Chris, Peter) can read and write.
create policy "signed in users" on items
  for all to authenticated using (true) with check (true);
grant select, insert, update, delete on items to authenticated;

-- Live updates between phones.
alter publication supabase_realtime add table items;
