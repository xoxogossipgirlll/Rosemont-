create extension if not exists pgcrypto;

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nickname text,
  message text not null,
  status text not null default 'pending'
    check (status in ('pending', 'published', 'rejected'))
);

alter table public.submissions enable row level security;

create policy "Anyone can submit gossip"
on public.submissions
for insert
to anon, authenticated
with check (status = 'pending');

create policy "Admins can view submissions"
on public.submissions
for select
to authenticated
using (true);

create policy "Admins can update submissions"
on public.submissions
for update
to authenticated
using (true)
with check (true);

create policy "Admins can delete submissions"
on public.submissions
for delete
to authenticated
using (true);
