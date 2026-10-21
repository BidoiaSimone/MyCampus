# MyCampus

MyCampus collects the student-oriented points of interest of our campus into a single app, so that new and international students can quickly find what they need when they arrive.

## Tech stack

| Layer | Technology | Role in the project |
|---|---|---|
| Frontend | [Expo](https://expo.dev) | React Native framework used to build the mobile app (iOS and Android) from a single TypeScript/JavaScript codebase. |
| Backend | [Supabase](https://supabase.com) | Backend-as-a-service: authentication, auto-generated REST/realtime APIs, storage and access rules, so we don't have to write and host our own server. |
| Database | [PostgreSQL](https://www.postgresql.org) | Relational database holding the app's data (points of interest, categories, users). It is the database managed by Supabase. |

### How the pieces fit together

```
Expo app (phone)  ──>  Supabase (auth + API + storage)  ──>  PostgreSQL
```

The app talks to Supabase through the `supabase-js` client library; Supabase reads and writes the Postgres database and enforces who can access what.

## Getting started

_Setup instructions will be added once the project is scaffolded._
