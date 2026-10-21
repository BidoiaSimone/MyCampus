import type { Category } from '@/data/types';

import {
  DEFAULT_SHORTCUTS,
  MAX_SHORTCUTS,
  parseShortcuts,
  pickShortcutCategories,
  toggleShortcut,
} from './shortcuts';

const category = (id: string, sort_order = 0): Category => ({
  id,
  label_en: id,
  label_it: id,
  emoji: null,
  sort_order,
});

describe('toggleShortcut', () => {
  it('adds a new shortcut at the end', () => {
    expect(toggleShortcut(['room', 'bar'], 'smoking')).toEqual(['room', 'bar', 'smoking']);
  });

  it('removes a shortcut that is already chosen', () => {
    expect(toggleShortcut(['room', 'bar', 'smoking'], 'bar')).toEqual(['room', 'smoking']);
  });

  it(`never goes past ${MAX_SHORTCUTS}`, () => {
    const full = ['room', 'study-room', 'microwave', 'bar'];
    expect(toggleShortcut(full, 'smoking')).toEqual(full);
  });

  it('keeps the last shortcut, so the home is never empty', () => {
    expect(toggleShortcut(['bar'], 'bar')).toEqual(['bar']);
  });
});

describe('parseShortcuts', () => {
  it('falls back to the defaults when nothing is saved', () => {
    expect(parseShortcuts(null)).toEqual(DEFAULT_SHORTCUTS);
  });

  it('falls back to the defaults when the saved value is broken', () => {
    expect(parseShortcuts('not json')).toEqual(DEFAULT_SHORTCUTS);
    expect(parseShortcuts('{"a":1}')).toEqual(DEFAULT_SHORTCUTS);
    expect(parseShortcuts('[]')).toEqual(DEFAULT_SHORTCUTS);
  });

  it('drops duplicates and anything that is not an id, and caps the list', () => {
    expect(parseShortcuts('["bar", "bar", 3, "room", "smoking", "library", "office"]')).toEqual([
      'bar',
      'room',
      'smoking',
      'library',
    ]);
  });
});

describe('pickShortcutCategories', () => {
  it('keeps the chosen order and skips categories that no longer exist', () => {
    const categories = [category('room', 1), category('bar', 7), category('smoking', 8)];
    const picked = pickShortcutCategories(['smoking', 'gone', 'room'], categories);
    expect(picked.map((c) => c.id)).toEqual(['smoking', 'room']);
  });
});
