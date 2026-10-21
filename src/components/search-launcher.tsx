import { SearchBar } from 'panelui-native/components/search-bar';
import { AnimatedPressable } from 'panelui-native/primitives/animated-pressable';
import { View } from 'react-native';

type SearchLauncherProps = {
  placeholder?: string;
  onPress: () => void;
};

/**
 * Sembra una barra di ricerca, ma è un bottone: apre la ricerca guidata.
 * Il campo di PanelUI è solo disegnato (non riceve tocchi né focus), così la tastiera non si apre;
 * per gli screen reader esiste solo il bottone.
 */
export function SearchLauncher({
  placeholder = 'What are you looking for?',
  onPress,
}: SearchLauncherProps) {
  return (
    <AnimatedPressable
      accessibilityRole="button"
      accessibilityLabel={placeholder}
      accessibilityHint="Opens the guided search"
      pressScale={0.98}
      onPress={onPress}>
      <View
        pointerEvents="none"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants">
        <SearchBar
          editable={false}
          placeholder={placeholder}
          shape="pill"
          size="lg"
          panel="never"
          isClearable={false}
        />
      </View>
    </AnimatedPressable>
  );
}
