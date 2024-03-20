import { useState, useEffect } from 'react';

function useFetch<Data>(url: string) {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const abortController = new AbortController();

    fetch(url, { signal: abortController.signal })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setError('');
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));

    // Cancela a requisição caso uma próxima seja feita para prevenir race condition
    return () => abortController.abort();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
