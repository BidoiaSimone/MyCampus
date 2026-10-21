// Tipi scritti a mano, allineati a supabase/migrations.
// Quando lo schema cresce, generateli con: bun run db:types

export type Category = {
  id: string;
  label_en: string;
  label_it: string;
  emoji: string | null;
  sort_order: number;
};

export type Building = {
  id: string;
  name: string;
  address: string | null;
};

/** Un edificio con la sua posizione, dalla vista `building_locations`. */
export type BuildingLocation = Building & {
  latitude: number;
  longitude: number;
};

export type Place = {
  id: string;
  category_id: string;
  building_id: string;
  name: string;
  room_code: string | null;
  floor: number | null;
  description: string | null;
};

export type PlaceWithRelations = Place & {
  building: Pick<Building, 'id' | 'name'>;
  category: Pick<Category, 'id' | 'label_en' | 'emoji'>;
};
