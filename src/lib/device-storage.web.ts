/**
 * Web: il localStorage del browser. Durante il rendering statico in Node non esiste,
 * e in quel caso si usano i valori predefiniti.
 */
export const deviceStorage: Storage | undefined =
  typeof localStorage === 'undefined' ? undefined : localStorage;
