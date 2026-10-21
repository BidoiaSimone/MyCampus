import { GridItem } from 'panelui-native/components/grid-item';
import { Skeleton } from 'panelui-native/components/skeleton';
import { Text } from 'panelui-native/primitives/text';

import type { Category } from '@/data/types';
import { MAX_SHORTCUTS } from '@/utils/shortcuts';

type ShortcutGridProps = {
  /** `undefined` mentre le categorie si caricano. */
  categories: Category[] | undefined;
  onPress: (category: Category) => void;
};

const COLUMNS = MAX_SHORTCUTS;

/** Le scorciatoie della home: una riga di riquadri, ognuno apre la ricerca guidata già sulla sua categoria. */
export function ShortcutGrid({ categories, onPress }: ShortcutGridProps) {
  if (!categories) {
    return (
      <GridItem.Group columns={COLUMNS} gap={8} aspect={0.85} size="sm">
        {Array.from({ length: COLUMNS }, (_, index) => (
          <GridItem key={index} variant="plain">
            <Skeleton className="h-full w-full rounded-2xl" />
          </GridItem>
        ))}
      </GridItem.Group>
    );
  }

  return (
    <GridItem.Group columns={COLUMNS} gap={8} aspect={0.85} size="sm">
      {categories.map((category) => (
        <GridItem
          key={category.id}
          accessibilityLabel={category.label_en}
          className="items-center px-1 pt-3"
          onPress={() => onPress(category)}>
          <GridItem.Media className="h-10 w-10 rounded-xl bg-sunflower">
            <Text className="text-xl">{category.emoji ?? '📍'}</Text>
          </GridItem.Media>
          <GridItem.Title numberOfLines={2} className="text-center leading-tight">
            {category.label_en}
          </GridItem.Title>
        </GridItem>
      ))}
    </GridItem.Group>
  );
}
