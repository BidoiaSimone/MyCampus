// Tipi globali di Expo, tra cui gli import di file .css (src/global.css).
// Expo li include anche in expo-env.d.ts, ma quel file viene generato da `expo start`
// ed è in .gitignore: senza questo, il typecheck fallisce in CI e su una copia pulita del progetto.
/// <reference types="expo/types" />
