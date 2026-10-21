/** `[longitudine, latitudine]`, l'ordine di MapLibre. */
export type LngLat = [number, number];

/** `[ovest, sud, est, nord]`. */
export type LngLatBounds = [number, number, number, number];

export type MapCamera = { center: LngLat; zoom: number } | { bounds: LngLatBounds };

type Point = { latitude: number; longitude: number };

/** Margine minimo attorno agli edifici, in gradi (circa 60–90 m a queste latitudini). */
const MIN_PADDING = 0.0008;

/**
 * Dove aprire la mappa: inquadra tutti gli edifici; con un solo edificio ci si centra sopra;
 * senza edifici si usa la posizione predefinita del campus.
 */
export function cameraForPoints(
  points: readonly Point[],
  fallback: { center: LngLat; zoom: number },
): MapCamera {
  if (points.length === 0) return fallback;
  if (points.length === 1) {
    return { center: [points[0].longitude, points[0].latitude], zoom: fallback.zoom };
  }

  const lngs = points.map((p) => p.longitude);
  const lats = points.map((p) => p.latitude);
  const [west, east] = [Math.min(...lngs), Math.max(...lngs)];
  const [south, north] = [Math.min(...lats), Math.max(...lats)];
  const padLng = Math.max((east - west) * 0.25, MIN_PADDING);
  const padLat = Math.max((north - south) * 0.25, MIN_PADDING);

  return { bounds: [west - padLng, south - padLat, east + padLng, north + padLat] };
}
