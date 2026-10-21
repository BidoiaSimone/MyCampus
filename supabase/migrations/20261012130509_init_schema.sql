-- MyCampus: schema iniziale per la ricerca guidata
-- categoria (cosa ti serve) → edificio → luogo

create extension if not exists postgis with schema extensions;

-- Cosa può cercare uno studente: microonde, distributori, aule studio…
create table public.categories (
  id         text primary key,            -- slug stabile, es. 'microwave'
  label_en   text not null,
  label_it   text not null,
  emoji      text,
  sort_order smallint not null default 0
);

create table public.buildings (
  id       text primary key,              -- slug stabile, es. 'edificio-a'
  name     text not null,
  address  text,
  location extensions.geography(point, 4326)
);

create table public.places (
  id          uuid primary key default gen_random_uuid(),
  category_id text not null references public.categories (id),
  building_id text not null references public.buildings (id),
  name        text not null,
  room_code   text,                       -- es. 'A1.3'
  floor       smallint,                   -- 0 = piano terra, -1 = interrato
  description text,
  location    extensions.geography(point, 4326),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index places_category_building_idx on public.places (category_id, building_id);
create index places_location_idx on public.places using gist (location);

-- Row Level Security: per ora tutti possono solo leggere.
-- Le scritture passano dalla dashboard o da nuove migrazioni.
alter table public.categories enable row level security;
alter table public.buildings  enable row level security;
alter table public.places     enable row level security;

create policy "Lettura pubblica delle categorie" on public.categories
  for select to anon, authenticated using (true);

create policy "Lettura pubblica degli edifici" on public.buildings
  for select to anon, authenticated using (true);

create policy "Lettura pubblica dei luoghi" on public.places
  for select to anon, authenticated using (true);

grant select on public.categories, public.buildings, public.places to anon, authenticated;
