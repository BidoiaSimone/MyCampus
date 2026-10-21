# MyCampus

La guida del campus pensata per chi arriva per la prima volta: dove si trova un'aula, dove scaldare il pranzo, dove sono i distributori, il bar, l'area fumatori.

Il primo comportamento è una **ricerca guidata**: scegli cosa ti serve → scegli l'edificio → trovi il luogo.

La **home** mostra, dall'alto: la barra di ricerca (che apre la ricerca guidata), le 4 scorciatoie scelte dal profilo e la mappa del campus.

## Stack

| Livello | Tecnologia |
|---|---|
| App | Expo SDK 57 (React Native) + TypeScript + Expo Router |
| Interfaccia | [PanelUI](https://panelui.dev/docs/components) (Uniwind / Tailwind 4) + mappa MapLibre |
| Backend | Supabase (API automatiche, Auth, Storage) |
| Database | PostgreSQL + PostGIS |
| Package manager | Bun |
| Test | Jest (`jest-expo`) + React Native Testing Library |
| CI | GitHub Actions |
| Build e rilascio | EAS Build + EAS Update |

Le motivazioni sono in [`docs/adr/`](docs/adr/).

## Prerequisiti

- [Bun](https://bun.sh) (la versione è fissata in `package.json` → `packageManager`)
- Node.js LTS (la versione è in `.nvmrc`): Expo lo richiede per alcuni comandi
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) avviato: serve per Supabase in locale
- Sul telefono: una **development build** di MyCampus, perché la mappa usa codice nativo (MapLibre). In Expo Go l'app funziona, ma al posto della mappa compare un avviso. Vedi [Development build](#development-build).

## Primo avvio

```bash
bun install            # dipendenze (non usare npm: il lockfile è bun.lock)
bun run db:start       # avvia Supabase in Docker, applica migrazioni e dati di esempio
cp .env.example .env.local
```

`bun run db:start` stampa l'**API URL** e la chiave **Publishable** (nelle versioni meno recenti della CLI si chiama *anon key*): copiale in `.env.local`.

> **Telefono fisico:** `127.0.0.1` per il telefono è il telefono stesso. In `.env.local` usa l'IP del tuo computer nella rete Wi-Fi (es. `http://192.168.1.20:54321`), con telefono e computer sulla stessa rete.

```bash
bun run start          # avvia Metro: scansiona il QR code con la development build (o con Expo Go)
```

Dopo modifiche a `metro.config.js` o `src/global.css` riavviate Metro pulendo la cache: `bun run start --clear`.

### Development build

Serve una volta sola (e di nuovo quando si aggiunge una libreria con codice nativo):

```bash
bun expo run:android   # serve Android Studio; oppure
bun expo run:ios       # serve un Mac con Xcode
```

In alternativa la build si fa in cloud con EAS: `bunx eas-cli build --profile development` (al primo uso `bunx eas-cli build:configure`).

La dashboard locale di Supabase (Studio) è su http://127.0.0.1:54323.

## Comandi

| Comando | Cosa fa |
|---|---|
| `bun run start` | Avvia l'app in sviluppo |
| `bun run check` | Lint + controllo dei tipi + test (lo stesso controllo della CI) |
| `bun run lint` | ESLint |
| `bun run typecheck` | `tsc --noEmit` |
| `bun run test` | Jest |
| `bun run db:start` / `db:stop` | Avvia / ferma Supabase in locale |
| `bun run db:reset` | Ricrea il database da zero: migrazioni + `supabase/seed.sql` |
| `bun run db:types` | Genera i tipi TypeScript dallo schema in `src/data/database.types.ts` |
| `bun expo install <pacchetto>` | Installa una libreria nella versione compatibile con l'SDK |

## Struttura

```
src/
  app/                      solo route (ogni file è una schermata)
    index.tsx               home: ricerca, scorciatoie, mappa
    profile.tsx             profilo: scelta delle scorciatoie
    search/index.tsx        ricerca guidata, passo 1: cosa ti serve?
    search/[category]/index.tsx      passo 2: quale edificio? (le scorciatoie partono da qui)
    search/[category]/[building].tsx passo 3: quale luogo?
    place/[id].tsx          scheda del luogo
  components/               UI riutilizzabile (con i test accanto)
  data/                     query a Supabase e tipi
  hooks/                    hook riutilizzabili
  lib/supabase.ts           client Supabase
  utils/                    funzioni pure (con i test accanto)
  theme.ts                  colori, spaziature, font
  global.css                gli stessi colori per i componenti PanelUI (tenerli allineati)
supabase/
  migrations/               schema del database, versionato
  seed.sql                  dati di esempio per lo sviluppo
docs/adr/                   decisioni architetturali
```

## Modificare il database

Lo schema cambia **solo** tramite migrazioni, mai a mano sul database condiviso.

```bash
bunx supabase migration new nome_modifica   # crea supabase/migrations/<timestamp>_nome_modifica.sql
# scrivi l'SQL nel file, poi:
bun run db:reset                            # verifica che tutto si applichi da zero
```

Ogni tabella nuova ha bisogno di Row Level Security e di policy esplicite: guarda la prima migrazione come esempio.

## Come lavoriamo

1. Ogni lavoro parte da una issue su GitHub.
2. Si lavora su un branch (`feat/ricerca-guidata`, `fix/scheda-luogo`…), mai su `main`.
3. Si apre una pull request: la CI esegue lint, tipi e test.
4. Serve almeno una review approvata e la CI verde per fare merge.

## Supabase in cloud (quando serve)

Create il progetto su supabase.com scegliendo una **regione UE**, poi:

```bash
bunx supabase login
bunx supabase link --project-ref <id-progetto>
bunx supabase db push          # applica le migrazioni al database in cloud
```
