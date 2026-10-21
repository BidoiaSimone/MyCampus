/**
 * Dove si apre la mappa quando non ci sono ancora edifici con una posizione.
 * Coordinate indicative del Campus scientifico di via Torino (Mestre): verificatele e,
 * se il campus è un altro, cambiatele qui.
 *
 * Attenzione all'ordine: [longitudine, latitudine], come vuole MapLibre.
 */
export const CAMPUS_CENTER: [number, number] = [12.2552, 45.4787];

/** Zoom iniziale: abbastanza vicino da distinguere gli edifici. */
export const CAMPUS_ZOOM = 16;
