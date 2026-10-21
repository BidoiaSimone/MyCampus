import UserCircleIcon from '@hugeicons/core-free-icons/UserCircleIcon';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { AnimatedPressable } from 'panelui-native/primitives/animated-pressable';

import { useTheme } from '@/hooks/use-theme';

/** Icona del profilo nell'intestazione della home. */
export function ProfileButton({ onPress }: { onPress: () => void }) {
  const theme = useTheme();

  return (
    <AnimatedPressable
      accessibilityRole="button"
      accessibilityLabel="Profile"
      hitSlop={8}
      pressScale={0.9}
      onPress={onPress}
      className="h-9 w-9 items-center justify-center">
      <HugeiconsIcon icon={UserCircleIcon} size={28} color={theme.onHeader} strokeWidth={1.75} />
    </AnimatedPressable>
  );
}
