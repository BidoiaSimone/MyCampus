/**
 * Design token di MyCampus.
 * Palette "Welcome": indaco + giallo girasole.
 * I valori esadecimali sono provvisori: sostituiteli con quelli definitivi della palette.
 *
 * Regola di contrasto: il giallo è un accento o uno sfondo (con testo scuro sopra),
 * mai il colore di un testo su sfondo chiaro.
 *
 * I componenti PanelUI leggono gli stessi colori da src/global.css (classi come `bg-primary`,
 * `text-muted-foreground`, `bg-sunflower`): se cambiate un colore qui, cambiatelo anche lì.
 */
export const Colors = {
  light: {
    primary: '#3730A3', // indaco: pulsanti, link, intestazioni
    onPrimary: '#FFFFFF',
    accent: '#FFC93C', // giallo girasole
    onAccent: '#1E1B4B',
    background: '#FFFFFF',
    surface: '#F4F4FB',
    border: '#E2E2EF',
    text: '#1E1B4B',
    textSecondary: '#5B5B76',
    danger: '#B42318',
    header: '#3730A3',
    onHeader: '#FFFFFF',
  },
  dark: {
    primary: '#A5B4FC',
    onPrimary: '#1E1B4B',
    accent: '#FFC93C',
    onAccent: '#1E1B4B',
    background: '#0F0E1F',
    surface: '#1C1B33',
    border: '#2E2D4A',
    text: '#FFFFFF',
    textSecondary: '#B4B4CC',
    danger: '#FDA29B',
    header: '#1C1B33',
    onHeader: '#FFFFFF',
  },
} as const;

export type ThemeColors = { [K in keyof typeof Colors.light]: string };

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const Radius = {
  md: 12,
  lg: 16,
} as const;

export const FontSize = {
  small: 14,
  body: 16,
  title: 22,
  hero: 28,
} as const;
