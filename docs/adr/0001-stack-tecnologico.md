# ADR 0001 — Stack tecnologico

- **Stato:** accettato
- **Data:** 2026-10-12

## Contesto

MyCampus è una guida del campus per studenti internazionali appena arrivati. Il primo comportamento è una ricerca guidata (cosa ti serve → edificio → luogo); più avanti arriveranno una mappa degli interni e, forse, segnalazioni degli studenti.

Vincoli e obiettivi:

- vogliamo un'**app installabile** su Android e iOS, per continuare a sviluppare il progetto dopo il corso;
- il team è piccolo e non ha esperienza di sviluppo nativo;
- l'ambiente di sviluppo deve essere riproducibile e il processo verificabile (PR, review, CI);
- i dati sono relazionali (edificio → piano → luogo) e geografici (posizioni, "il più vicino").

## Decisione

- **App:** React Native con **Expo** (SDK 57), **TypeScript** in modalità strict ed **Expo Router** per la navigazione.
- **Backend e database:** **Supabase**, cioè PostgreSQL con **PostGIS**, API generate automaticamente e Row Level Security.
- **Package manager:** **Bun**, con versione fissata in `package.json`.
- **Qualità:** ESLint, `tsc --noEmit`, Jest + React Native Testing Library, eseguiti in **GitHub Actions** a ogni pull request.
- **Build e rilascio:** **EAS Build** per le build e **EAS Update** per gli aggiornamenti over-the-air.

## Alternative considerate

- **PWA (sito web installabile):** la più semplice, ma non è un'app installabile dagli store e limita l'accesso a funzioni native in futuro.
- **Flutter:** ottimo, ma richiede di imparare Dart; con React Native riusiamo TypeScript ovunque.
- **React Native senza framework:** dovremmo mantenere a mano le cartelle native (Gradle, CocoaPods) e gli aggiornamenti. È complessità accidentale che non aiuta l'utente. Con Expo l'uscita resta possibile tramite `expo prebuild`.
- **Backend scritto da noi (Node/Fastify o FastAPI):** più controllo e più materiale da mostrare, ma molto più codice da scrivere e mantenere prima di avere valore per l'utente.
- **npm al posto di Bun:** più diffuso e senza sorprese; Bun è più veloce nelle installazioni, ma è uno strumento in più da installare.

## Conseguenze

**Positive**

- Un solo linguaggio (TypeScript) e un solo codice per Android e iOS.
- Build iOS anche senza Mac, tramite EAS.
- Lo schema del database è versionato in `supabase/migrations/` e passa dalla review come il resto del codice.
- L'ambiente locale (Supabase in Docker) è uguale per tutti.

**Negative e rischi**

- La sicurezza dei dati dipende dalle policy RLS: una tabella senza policy è un rischio. Ogni nuova tabella deve averle.
- Il piano gratuito di Supabase mette in pausa il progetto dopo una settimana di inattività e non fa backup: migrazioni e `seed.sql` nel repository devono bastare a ricreare tutto.
- Le librerie con codice nativo (es. MapLibre per la mappa) non funzionano in Expo Go: servirà una development build.
- Bun non esegue gli script `postinstall` dei pacchetti non dichiarati in `trustedDependencies`: va aggiornato quando si aggiungono pacchetti che ne hanno bisogno.
