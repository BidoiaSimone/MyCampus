import { useSyncExternalStore } from 'react';

import { deviceStorage } from '@/lib/device-storage';
import { DEFAULT_SHORTCUTS, parseShortcuts, toggleShortcut } from '@/utils/shortcuts';

/**
 * Le scorciatoie della home, scelte dal profilo.
 * Per ora vivono solo sul telefono; quando ci sarà il login potranno passare a Supabase
 * cambiando solo questo file.
 */
const STORAGE_KEY = 'mycampus.home-shortcuts';

const listeners = new Set<() => void>();
let current: string[] | null = null;

function read(): string[] {
  if (current === null) {
    let raw: string | null = null;
    try {
      raw = deviceStorage?.getItem(STORAGE_KEY) ?? null;
    } catch {
      // Storage non disponibile: si usano i predefiniti.
    }
    current = parseShortcuts(raw);
  }
  return current;
}

function write(next: string[]) {
  current = next;
  try {
    deviceStorage?.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Se non si riesce a salvare, la scelta resta valida finché l'app è aperta.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

const serverSnapshot = [...DEFAULT_SHORTCUTS];

/** Id delle categorie scelte come scorciatoie, e le azioni per cambiarle. Condiviso tra le schermate. */
export function useHomeShortcuts() {
  const ids = useSyncExternalStore(subscribe, read, () => serverSnapshot);
  return {
    ids,
    toggle: (id: string) => write(toggleShortcut(read(), id)),
    reset: () => write([...DEFAULT_SHORTCUTS]),
  };
}
