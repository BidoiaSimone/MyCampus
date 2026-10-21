-- Dati di esempio caricati da `supabase db reset`.
-- Sostituite edifici e luoghi con quelli reali del vostro campus.

insert into public.categories (id, label_en, label_it, emoji, sort_order) values
  ('room',       'Classroom',             'Aula',                    '🏫', 1),
  ('study-room', 'Study room',            'Aula studio',             '📚', 2),
  ('library',    'Library',               'Biblioteca',              '📖', 3),
  ('office',     'Professor''s office',   'Studio di un docente',    '🧑‍🏫', 4),
  ('microwave',  'Microwave',             'Microonde',               '🍲', 5),
  ('vending',    'Vending machine',       'Distributori automatici', '🥤', 6),
  ('bar',        'Café / bar',            'Bar',                     '☕', 7),
  ('smoking',    'Smoking area',          'Area fumatori',           '🚬', 8);

-- location: 'POINT(longitudine latitudine)'. Posizioni di esempio vicino al campus di via Torino.
insert into public.buildings (id, name, address, location) values
  ('edificio-a', 'Edificio A (esempio)', null, 'POINT(12.2546 45.4791)'),
  ('edificio-b', 'Edificio B (esempio)', null, 'POINT(12.2559 45.4783)');

insert into public.places (category_id, building_id, name, room_code, floor, description) values
  ('microwave',  'edificio-a', 'Microonde zona ristoro', null,   0, 'Accanto ai distributori, vicino all''ingresso principale.'),
  ('vending',    'edificio-a', 'Distributori ingresso',  null,   0, 'Snack, bevande calde e fredde.'),
  ('study-room', 'edificio-a', 'Aula studio 1',          'A1.4', 1, 'Prese elettriche a ogni tavolo.'),
  ('room',       'edificio-b', 'Aula 3',                 'B0.3', 0, null),
  ('smoking',    'edificio-b', 'Cortile interno',        null,   0, 'Unica area fumatori dell''edificio.');
