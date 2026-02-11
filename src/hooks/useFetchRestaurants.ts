import { useEffect, useState } from 'react';

const FETCH_TIMEOUT_MS = 30000;

export const useFetchRestaurants = <T,>(url: string) => {
  const [restaurants, setRestaurants] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    setLoading(true);
    setError('');

    fetch(url, { signal: controller.signal })
      .then(res => res.ok ? res.json() : Promise.reject(`HTTP error: ${res.status}`))
      .then(setRestaurants)
      .catch(err => {
        if (err.name === 'AbortError') {
          setError('Request timed out. Please check your connection.');
        } else {
          setError(err.message || String(err));
        }
      })
      .finally(() => setLoading(false));

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [url]);

  return { restaurants, loading, error };
};