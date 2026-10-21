/** Trasforma il numero del piano in un'etichetta leggibile. */
export function formatFloor(floor: number | null | undefined): string | null {
  if (floor === null || floor === undefined) return null;
  if (floor === 0) return 'Ground floor';
  if (floor < 0) return `Basement ${Math.abs(floor)}`;
  return `Floor ${floor}`;
}
