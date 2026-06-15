-- Trovar marketing site: lead capture / waitlist
-- Run in the SAME Supabase project (SQL Editor).

create table if not exists waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text,
  email text not null,
  practice_name text,
  phone text,
  client_band text,          -- e.g. '1-5', '6-20', '21-50', '50+'
  apps text[] default '{}',  -- which integrations they want
  other_apps text,           -- free text for apps not listed
  notes text,
  status text default 'new'  -- new | contacted | onboarded
);

-- Writes happen only via the server API route (service role), so lock down RLS:
alter table waitlist_signups enable row level security;
-- No anon policies = anon cannot read or write directly. Service role bypasses RLS.
