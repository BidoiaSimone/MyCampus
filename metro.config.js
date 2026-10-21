// https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const { withUniwindConfig } = require('uniwind/metro');

const config = getDefaultConfig(__dirname);

// Uniwind compila le classi Tailwind (usate da PanelUI) durante il bundle.
// Deve restare l'ultimo wrapper. Dopo ogni modifica a questo file o a global.css
// serve riavviare Metro con `bun run start --clear`.
module.exports = withUniwindConfig(config, {
  cssEntryFile: './src/global.css',
  dtsFile: './src/uniwind-types.d.ts',
});
