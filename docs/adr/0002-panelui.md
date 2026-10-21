# ADR 0002 — Componenti di interfaccia: PanelUI

- **Stato:** accettato
- **Data:** 2026-10-13

## Contesto

La nuova home (ricerca, scorciatoie, mappa) e il profilo richiedono componenti che finora scrivevamo a mano con `StyleSheet`: campo di ricerca, griglia di riquadri, caselle di selezione e soprattutto una mappa. Riscriverli per ogni schermata costa tempo e produce stili leggermente diversi ovunque.

## Decisione

- Usiamo **[PanelUI](https://panelui.dev/docs/components)** (`panelui-native`) per i componenti: per ora `SearchBar`, `GridItem`, `Checkbox`, `Button`, `Typography`, `Skeleton` e `Map`.
- PanelUI si stila con **Uniwind** (Tailwind 4 compilato da Metro, vedi `metro.config.js`): nei componenti nuovi usiamo `className` con i token del tema (`bg-primary`, `text-muted-foreground`, `bg-sunflower`), mai colori scritti a mano.
- La palette "Welcome" è definita in `src/theme.ts` e ripetuta come token PanelUI in `src/global.css`.
- La mappa usa **MapLibre** (`@maplibre/maplibre-react-native`), già previsto nell'ADR 0001.
- Importiamo i componenti per percorso (`panelui-native/components/map`), non dalla radice del pacchetto, per caricare solo quello che serve.

## Alternative considerate

- **Continuare con componenti scritti a mano:** nessuna dipendenza, ma la mappa da sola è un lavoro grande e il resto si ripete in ogni schermata.
- **`@expo/ui`** (già installato): componenti nativi veri, ma niente mappa né griglia a riquadri.
- **react-native-maps:** mappa matura, ma con Google/Apple Maps e chiavi API; MapLibre con PanelUI prende i colori dal nostro tema.

## Conseguenze

**Positive**

- Schermate coerenti tra loro e in tema chiaro/scuro senza codice in più.
- La mappa è pronta con segnaposti, etichette, popup e controlli.

**Negative e rischi**

- I colori stanno in due posti (`theme.ts` e `global.css`): vanno cambiati insieme.
- La mappa non funziona in Expo Go: serve una development build (vedi README). Senza, PanelUI mostra un avviso al suo posto.
- Metro risolve tutti gli import della libreria, anche quelli opzionali: per questo sono installati `react-native-keyboard-controller`, `expo-blur`, `expo-haptics` ed `expo-location` anche se non li usiamo ancora direttamente.
- `Map` di PanelUI è in versione alpha: l'API può cambiare in un aggiornamento minore. Aggiornare `panelui-native` con attenzione.
- Sul web il pre-rendering statico ricade sul rendering lato client (il provider di PanelUI non lo supporta); l'app web funziona comunque. Il web non è un obiettivo del progetto.
