import type { ReactNode } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { FontSize, Radius, Spacing } from '@/theme';

type AsyncViewProps<T> = {
  status: 'loading' | 'success' | 'error';
  data?: T;
  error?: Error;
  retry: () => void;
  isEmpty?: (data: T) => boolean;
  emptyMessage?: string;
  children: (data: T) => ReactNode;
};

/** Gestisce in un solo posto caricamento, errore e lista vuota. */
export function AsyncView<T>({
  status,
  data,
  error,
  retry,
  isEmpty,
  emptyMessage = 'Nothing here yet.',
  children,
}: AsyncViewProps<T>) {
  const theme = useTheme();

  if (status === 'loading') {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={theme.primary} />
      </View>
    );
  }

  if (status === 'error' || data === undefined) {
    return (
      <View style={styles.center}>
        <Text style={[styles.message, { color: theme.danger }]}>
          Something went wrong{error ? `: ${error.message}` : ''}
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={retry}
          style={[styles.button, { backgroundColor: theme.primary }]}>
          <Text style={[styles.buttonText, { color: theme.onPrimary }]}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  if (isEmpty?.(data)) {
    return (
      <View style={styles.center}>
        <Text style={[styles.message, { color: theme.textSecondary }]}>{emptyMessage}</Text>
      </View>
    );
  }

  return <>{children(data)}</>;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    padding: Spacing.lg,
  },
  message: {
    fontSize: FontSize.body,
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
  },
  buttonText: {
    fontSize: FontSize.body,
    fontWeight: '600',
  },
});
