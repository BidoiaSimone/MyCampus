import type { Category } from '@/data/types';

/** Quante scorciatoie mostra la home. */
export const MAX_SHORTCUTS = 4;

/**
 * Le scorciatoie di chi non ha ancora scelto: le domande più frequenti di chi arriva
 * (dov'è l'aula, dove studio, dove scaldo il pranzo, dov'è il bar). Sono id di `categories`.
 */
export const DEFAULT_SHORTCUTS: readonly string[] = ['room', 'study-room', 'microwave', 'bar'];

/**
 * Aggiunge o toglie una categoria dalle scorciatoie.
 * Una nuova scelta va in fondo; oltre il massimo non si aggiunge nulla
 * e l'ultima rimasta non si può togliere, così la home non resta mai vuota.
 */
export function toggleShortcut(
  current: readonly string[],
  id: string,
  max: number = MAX_SHORTCUTS,
): string[] {
  if (current.includes(id)) {
    return current.length > 1 ? current.filter((item) => item !== id) : [...current];
  }
  return current.length < max ? [...current, id] : [...current];
}

/** Legge le scorciatoie salvate; se mancano o non sono valide, torna a quelle predefinite. */
export function parseShortcuts(raw: string | null | undefined): string[] {
  if (raw) {
    try {
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const ids = [...new Set(parsed.filter((item) => typeof item === 'string'))];
        if (ids.length > 0) return ids.slice(0, MAX_SHORTCUTS);
      }
    } catch {
      // Valore rovinato: si riparte dai predefiniti.
    }
  }
  return [...DEFAULT_SHORTCUTS];
}

/**
 * Trasforma gli id scelti nelle categorie da mostrare, nell'ordine scelto.
 * Gli id di categorie che non esistono più vengono ignorati.
 */
export function pickShortcutCategories(
  ids: readonly string[],
  categories: readonly Category[],
): Category[] {
  const byId = new Map(categories.map((category) => [category.id, category]));
  return ids.flatMap((id) => {
    const category = byId.get(id);
    return category ? [category] : [];
  });
}
