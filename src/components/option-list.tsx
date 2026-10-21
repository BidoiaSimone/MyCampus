import type { ReactNode } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { FontSize, Spacing } from '@/theme';

type OptionListProps<T> = {
  heading: string;
  hint?: string;
  items: T[];
  keyOf: (item: T) => string;
  renderItem: (item: T) => ReactNode;
};

/** Schermata tipo della ricerca guidata: una domanda e una lista di scelte. */
export function OptionList<T>({ heading, hint, items, keyOf, renderItem }: OptionListProps<T>) {
  const theme = useTheme();

  return (
    <FlatList
      data={items}
      keyExtractor={keyOf}
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.content}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={[styles.heading, { color: theme.text }]}>{heading}</Text>
          {hint ? <Text style={[styles.hint, { color: theme.textSecondary }]}>{hint}</Text> : null}
        </View>
      }
      renderItem={({ item }) => <>{renderItem(item)}</>}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing.md,
  },
  header: {
    gap: Spacing.xs,
    marginBottom: Spacing.md,
  },
  heading: {
    fontSize: FontSize.hero,
    fontWeight: '700',
  },
  hint: {
    fontSize: FontSize.body,
  },
  separator: {
    height: Spacing.sm,
  },
});
