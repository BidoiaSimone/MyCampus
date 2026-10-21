import { router, useLocalSearchParams } from 'expo-router';
import { Stack } from 'expo-router/stack';

import { AsyncView } from '@/components/async-view';
import { OptionCard } from '@/components/option-card';
import { OptionList } from '@/components/option-list';
import { fetchBuildingsWithCategory, fetchCategory } from '@/data/places';
import { useAsync } from '@/hooks/use-async';

/** Ricerca guidata, passo 2: in quale edificio? */
export default function BuildingsScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();

  const result = useAsync(
    async () => {
      const [info, buildings] = await Promise.all([
        fetchCategory(category),
        fetchBuildingsWithCategory(category),
      ]);
      return { info, buildings };
    },
    [category],
  );

  return (
    <>
      <Stack.Screen options={{ title: result.data?.info.label_en ?? '' }} />
      <AsyncView
        {...result}
        isEmpty={({ buildings }) => buildings.length === 0}
        emptyMessage="We haven't mapped this service in any building yet.">
        {({ info, buildings }) => (
          <OptionList
            heading="Which building?"
            hint={`Buildings with a ${info.label_en.toLowerCase()}.`}
            items={buildings}
            keyOf={(building) => building.id}
            renderItem={(building) => (
              <OptionCard
                title={building.name}
                subtitle={building.address}
                onPress={() =>
                  router.push({
                    pathname: '/search/[category]/[building]',
                    params: { category, building: building.id },
                  })
                }
              />
            )}
          />
        )}
      </AsyncView>
    </>
  );
}
