/**
 * Web: niente expo-sqlite. Senza uno storage esplicito Supabase usa il localStorage del browser
 * e, durante il rendering statico in Node (dove localStorage non esiste), la memoria.
 */
export const authStorage: Storage | undefined = undefined;
