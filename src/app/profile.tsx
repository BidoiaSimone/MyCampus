import { Stack } from 'expo-router/stack';
import { Button } from 'panelui-native/components/button';
import { Checkbox } from 'panelui-native/components/checkbox';
import { Typography } from 'panelui-native/components/typography';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AsyncView } from '@/components/async-view';
import { fetchCategories } from '@/data/places';
import type { Category } from '@/data/types';
import { useAsync } from '@/hooks/use-async';
import { useHomeShortcuts } from '@/hooks/use-home-shortcuts';
import { Spacing } from '@/theme';
import { MAX_SHORTCUTS } from '@/utils/shortcuts';

/** Profilo. Per ora contiene la scelta delle scorciatoie della home. */
export default function ProfileScreen() {
  const categories = useAsync(fetchCategories, []);
  const { ids, toggle, reset } = useHomeShortcuts();

  return (
    <>
      <Stack.Screen options={{ title: 'Profile' }} />
      <AsyncView {...categories} isEmpty={(items) => items.length === 0}>
        {(items) => (
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={styles.content}>
            <View className="gap-1">
              <View className="flex-row items-baseline justify-between gap-3">
                <Typography type="h4">Home shortcuts</Typography>
                <Typography type="small" className="text-muted-foreground">
                  {ids.length} of {MAX_SHORTCUTS}
                </Typography>
              </View>
              <Typography type="body-sm" className="text-muted-foreground">
                Pick the {MAX_SHORTCUTS} things you look for most. They show up on the home in the
                order you pick them.
              </Typography>
            </View>

            <View className="gap-2">
              {items.map((category) => (
                <ShortcutOption
                  key={category.id}
                  category={category}
                  position={ids.indexOf(category.id)}
                  selectedCount={ids.length}
                  onToggle={() => toggle(category.id)}
                />
              ))}
            </View>

            <Button variant="ghost" onPress={reset}>
              Restore defaults
            </Button>
          </ScrollView>
        )}
      </AsyncView>
    </>
  );
}

type ShortcutOptionProps = {
  category: Category;
  /** Posizione nella home, -1 se non è una scorciatoia. */
  position: number;
  selectedCount: number;
  onToggle: () => void;
};

function ShortcutOption({ category, position, selectedCount, onToggle }: ShortcutOptionProps) {
  const selected = position >= 0;
  const full = selectedCount >= MAX_SHORTCUTS;
  const lastOne = selected && selectedCount === 1;

  let description: string | undefined;
  if (selected) description = `Shortcut ${position + 1}`;
  else if (full) description = 'Remove one to add this';

  return (
    <Checkbox
      variant="card"
      checked={selected}
      disabled={(!selected && full) || lastOne}
      label={[category.emoji, category.label_en].filter(Boolean).join('  ')}
      description={description}
      onCheckedChange={onToggle}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing.md,
    gap: Spacing.lg,
  },
});
