import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'expo-router/stack';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { AsyncView } from '@/components/async-view';
import { fetchPlace } from '@/data/places';
import { useAsync } from '@/hooks/use-async';
import { useTheme } from '@/hooks/use-theme';
import { FontSize, Radius, Spacing } from '@/theme';
import { formatFloor } from '@/utils/format-floor';

/** Scheda di un luogo. Qui arriverà la mappa (MapLibre). */
export default function PlaceScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const place = useAsync(() => fetchPlace(id), [id]);
  const theme = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: place.data?.name ?? '' }} />
      <AsyncView {...place}>
        {(p) => (
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={[styles.badge, { backgroundColor: theme.accent, color: theme.onAccent }]}>
              {[p.category.emoji, p.category.label_en].filter(Boolean).join(' ')}
            </Text>
            <Text style={[styles.title, { color: theme.text }]}>{p.name}</Text>

            <View style={[styles.box, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              <Row label="Building" value={p.building.name} />
              <Row label="Floor" value={formatFloor(p.floor)} />
              <Row label="Room" value={p.room_code} />
            </View>

            {p.description ? (
              <Text style={[styles.description, { color: theme.text }]}>{p.description}</Text>
            ) : null}
          </ScrollView>
        )}
      </AsyncView>
    </>
  );
}

function Row({ label, value }: { label: string; value: string | null }) {
  const theme = useTheme();
  if (!value) return null;
  return (
    <View style={styles.row}>
      <Text style={[styles.label, { color: theme.textSecondary }]}>{label}</Text>
      <Text style={[styles.value, { color: theme.text }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing.md,
    gap: Spacing.md,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.md,
    overflow: 'hidden',
    fontSize: FontSize.small,
    fontWeight: '600',
  },
  title: {
    fontSize: FontSize.hero,
    fontWeight: '700',
  },
  box: {
    borderWidth: 1,
    borderRadius: Radius.md,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  label: {
    fontSize: FontSize.body,
  },
  value: {
    fontSize: FontSize.body,
    fontWeight: '600',
    flexShrink: 1,
    textAlign: 'right',
  },
  description: {
    fontSize: FontSize.body,
    lineHeight: 24,
  },
});
