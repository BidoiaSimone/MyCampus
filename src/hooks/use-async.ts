import { useCallback, useEffect, useEffectEvent, useState } from 'react';

type Settled<T> = { status: 'success'; data: T } | { status: 'error'; error: Error };

/**
 * Esegue una funzione asincrona e la ripete quando cambiano `deps` (valori semplici: id, stringhe).
 * Volutamente minimale: quando serviranno cache o funzionamento offline, sostituitelo con TanStack Query.
 */
export function useAsync<T>(fn: () => Promise<T>, deps: readonly (string | number)[]) {
  const [attempt, setAttempt] = useState(0);
  const key = JSON.stringify([...deps, attempt]);
  const [result, setResult] = useState<{ key: string; settled: Settled<T> } | null>(null);

  const load = useEffectEvent(() => fn());

  useEffect(() => {
    let cancelled = false;
    load()
      .then((data) => {
        if (!cancelled) setResult({ key, settled: { status: 'success', data } });
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        const asError = error instanceof Error ? error : new Error(String(error));
        setResult({ key, settled: { status: 'error', error: asError } });
      });
    return () => {
      cancelled = true;
    };
  }, [key]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  // Finché il risultato non corrisponde alle dipendenze attuali, siamo in caricamento.
  if (result?.key !== key) {
    return { status: 'loading' as const, data: undefined, error: undefined, retry };
  }
  if (result.settled.status === 'error') {
    return { status: 'error' as const, data: undefined, error: result.settled.error, retry };
  }
  return { status: 'success' as const, data: result.settled.data, error: undefined, retry };
}
