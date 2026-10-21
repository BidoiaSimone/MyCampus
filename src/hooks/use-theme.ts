import { useColorScheme } from 'react-native';

import { Colors, type ThemeColors } from '@/theme';

/** Restituisce i colori del tema chiaro o scuro, secondo le impostazioni del telefono. */
export function useTheme(): ThemeColors {
  const scheme = useColorScheme();
  return scheme === 'dark' ? Colors.dark : Colors.light;
}
