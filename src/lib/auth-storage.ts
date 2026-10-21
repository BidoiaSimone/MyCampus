import 'expo-sqlite/localStorage/install';

/** Android e iOS: la sessione di login viene salvata con il localStorage di expo-sqlite. */
export const authStorage: Storage | undefined = localStorage;
