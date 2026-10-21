import { router } from 'expo-router';
import { Stack } from 'expo-router/stack';

import { AsyncView } from '@/components/async-view';
import { OptionCard } from '@/components/option-card';
import { OptionList } from '@/components/option-list';
import { fetchCategories } from '@/data/places';
import { useAsync } from '@/hooks/use-async';

/** Ricerca guidata, passo 1: cosa ti serve? */
export default function CategoriesScreen() {
  const categories = useAsync(fetchCategories, []);

  return (
    <>
      <Stack.Screen options={{ title: 'Search' }} />
      <AsyncView {...categories} isEmpty={(items) => items.length === 0}>
        {(items) => (
          <OptionList
            heading="What do you need?"
            hint="Pick a service and we'll show you where to find it."
            items={items}
            keyOf={(category) => category.id}
            renderItem={(category) => (
              <OptionCard
                title={category.label_en}
                emoji={category.emoji}
                onPress={() =>
                  router.push({ pathname: '/search/[category]', params: { category: category.id } })
                }
              />
            )}
          />
        )}
      </AsyncView>
    </>
  );
}
