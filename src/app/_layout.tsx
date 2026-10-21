import '../global.css';

import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { Stack } from 'expo-router/stack';
import { StatusBar } from 'expo-status-bar';
import { PanelUIProvider } from 'panelui-native/provider';
import { useColorScheme } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

export default function RootLayout() {
  const scheme = useColorScheme();
  const theme = useTheme();

  return (
    <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <PanelUIProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: theme.header },
            headerTintColor: theme.onHeader,
            headerBackButtonDisplayMode: 'minimal',
            contentStyle: { backgroundColor: theme.background },
          }}
        />
      </PanelUIProvider>
    </ThemeProvider>
  );
}
