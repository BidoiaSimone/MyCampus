import { router } from 'expo-router';
import { Stack } from 'expo-router/stack';
import { Button } from 'panelui-native/components/button';
import { Typography } from 'panelui-native/components/typography';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CampusMap } from '@/components/campus-map';
import { ProfileButton } from '@/components/profile-button';
import { SearchLauncher } from '@/components/search-launcher';
import { ShortcutGrid } from '@/components/shortcut-grid';
import { fetchCategories } from '@/data/places';
import { useAsync } from '@/hooks/use-async';
import { useHomeShortcuts } from '@/hooks/use-home-shortcuts';
import { pickShortcutCategories } from '@/utils/shortcuts';

/** Home: ricerca guidata, le scorciatoie scelte dal profilo, la mappa del campus. */
export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const categories = useAsync(fetchCategories, []);
  const { ids } = useHomeShortcuts();

  const shortcuts = categories.data ? pickShortcutCategories(ids, categories.data) : undefined;

  return (
    <>
      <Stack.Screen
        options={{
          title: 'MyCampus',
          headerRight: () => <ProfileButton onPress={() => router.push('/profile')} />,
        }}
      />

      <View className="flex-1 gap-5 px-4 pt-4" style={{ paddingBottom: insets.bottom + 16 }}>
        <SearchLauncher onPress={() => router.push('/search')} />

        <View className="gap-2">
          <View className="flex-row items-center justify-between">
            <Typography type="h6">Quick access</Typography>
            <Button variant="ghost" size="xs" onPress={() => router.push('/profile')}>
              Edit
            </Button>
          </View>
          {categories.status === 'error' ? (
            <View className="flex-row items-center justify-between gap-3 rounded-2xl bg-muted p-3">
              <Typography type="body-sm" className="flex-1 text-muted-foreground">
                Couldn&apos;t load your shortcuts.
              </Typography>
              <Button variant="outline" size="xs" onPress={categories.retry}>
                Try again
              </Button>
            </View>
          ) : (
            <ShortcutGrid
              categories={shortcuts}
              onPress={(category) =>
                router.push({ pathname: '/search/[category]', params: { category: category.id } })
              }
            />
          )}
        </View>

        <View className="flex-1 gap-2">
          <Typography type="h6">Campus map</Typography>
          <CampusMap className="flex-1 rounded-2xl border border-border" />
        </View>
      </View>
    </>
  );
}
