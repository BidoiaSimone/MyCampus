-- Mappa della home: gli edifici con latitudine e longitudine leggibili dall'app.
-- La colonna `location` è PostGIS (geography): l'API la restituirebbe in formato binario,
-- questa vista la trasforma in due numeri.

create view public.building_locations
with (security_invoker = true) -- valgono le policy RLS di `buildings`
as
select
  b.id,
  b.name,
  b.address,
  extensions.st_y(b.location::extensions.geometry) as latitude,
  extensions.st_x(b.location::extensions.geometry) as longitude
from public.buildings as b
where b.location is not null;

grant select on public.building_locations to anon, authenticated;
