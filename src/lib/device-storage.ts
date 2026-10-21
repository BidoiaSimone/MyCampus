import 'expo-sqlite/localStorage/install';

/**
 * Android e iOS: preferenze salvate sul telefono con il localStorage di expo-sqlite
 * (sincrono, sopravvive alla chiusura dell'app).
 */
export const deviceStorage: Storage | undefined = localStorage;
