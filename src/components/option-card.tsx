import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { FontSize, Radius, Spacing } from '@/theme';

type OptionCardProps = {
  title: string;
  subtitle?: string | null;
  emoji?: string | null;
  onPress: () => void;
};

/** Una scelta nella ricerca guidata: categoria, edificio o luogo. */
export function OptionCard({ title, subtitle, emoji, onPress }: OptionCardProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={subtitle ? `${title}, ${subtitle}` : title}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.surface, borderColor: pressed ? theme.primary : theme.border },
      ]}>
      {emoji ? <Text style={styles.emoji}>{emoji}</Text> : null}
      <View style={styles.texts}>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        {subtitle ? (
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>{subtitle}</Text>
        ) : null}
      </View>
      <Text style={[styles.chevron, { color: theme.primary }]}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  emoji: {
    fontSize: FontSize.title,
  },
  texts: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: FontSize.body,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: FontSize.small,
  },
  chevron: {
    fontSize: FontSize.title,
    fontWeight: '600',
  },
});
