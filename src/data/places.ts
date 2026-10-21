import { supabase } from '@/lib/supabase';

import type { Building, BuildingLocation, Category, Place, PlaceWithRelations } from './types';

/** Passo 1 della ricerca guidata: cosa ti serve? */
export async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('id, label_en, label_it, emoji, sort_order')
    .order('sort_order');
  if (error) throw error;
  return data as Category[];
}

export async function fetchCategory(categoryId: string): Promise<Category> {
  const { data, error } = await supabase
    .from('categories')
    .select('id, label_en, label_it, emoji, sort_order')
    .eq('id', categoryId)
    .single();
  if (error) throw error;
  return data as Category;
}

/** Passo 2: gli edifici che hanno almeno un luogo di quella categoria. */
export async function fetchBuildingsWithCategory(categoryId: string): Promise<Building[]> {
  const { data, error } = await supabase
    .from('buildings')
    .select('id, name, address, places!inner(category_id)')
    .eq('places.category_id', categoryId)
    .order('name');
  if (error) throw error;
  return (data ?? []).map(({ id, name, address }) => ({ id, name, address }));
}

/** Mappa della home: gli edifici che hanno una posizione. */
export async function fetchBuildingLocations(): Promise<BuildingLocation[]> {
  const { data, error } = await supabase
    .from('building_locations')
    .select('id, name, address, latitude, longitude')
    .order('name');
  if (error) throw error;
  return data as BuildingLocation[];
}

/** Passo 3: i luoghi di quella categoria nell'edificio scelto. */
export async function fetchPlaces(categoryId: string, buildingId: string): Promise<Place[]> {
  const { data, error } = await supabase
    .from('places')
    .select('id, category_id, building_id, name, room_code, floor, description')
    .eq('category_id', categoryId)
    .eq('building_id', buildingId)
    .order('floor')
    .order('name');
  if (error) throw error;
  return data as Place[];
}

/** Scheda di un luogo, con edificio e categoria. */
export async function fetchPlace(placeId: string): Promise<PlaceWithRelations> {
  const { data, error } = await supabase
    .from('places')
    .select(
      'id, category_id, building_id, name, room_code, floor, description, building:buildings(id, name), category:categories(id, label_en, emoji)',
    )
    .eq('id', placeId)
    .single();
  if (error) throw error;
  return data as unknown as PlaceWithRelations;
}
