import { router, useLocalSearchParams } from 'expo-router';
import { Stack } from 'expo-router/stack';

import { AsyncView } from '@/components/async-view';
import { OptionCard } from '@/components/option-card';
import { OptionList } from '@/components/option-list';
import { fetchPlaces } from '@/data/places';
import { useAsync } from '@/hooks/use-async';
import { formatFloor } from '@/utils/format-floor';

/** Ricerca guidata, passo 3: quale luogo? */
export default function PlacesScreen() {
  const { category, building } = useLocalSearchParams<{ category: string; building: string }>();
  const places = useAsync(() => fetchPlaces(category, building), [category, building]);

  return (
    <>
      <Stack.Screen options={{ title: '' }} />
      <AsyncView
        {...places}
        isEmpty={(items) => items.length === 0}
        emptyMessage="No places found in this building.">
        {(items) => (
          <OptionList
            heading="Here's what we found"
            items={items}
            keyOf={(place) => place.id}
            renderItem={(place) => (
              <OptionCard
                title={place.name}
                subtitle={[place.room_code, formatFloor(place.floor)].filter(Boolean).join(' · ')}
                onPress={() => router.push({ pathname: '/place/[id]', params: { id: place.id } })}
              />
            )}
          />
        )}
      </AsyncView>
    </>
  );
}
