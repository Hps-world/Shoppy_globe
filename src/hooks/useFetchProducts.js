import { useEffect, useState, useRef } from "react";

/**
 * useFetchProducts
 * Fetches product list from dummyjson and returns {data, loading, error}
 * The hook is cancel-safe using an "isMounted" ref.
 */
export default function useFetchProducts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    setLoading(true);
    setError(null);

    fetch("https://dummyjson.com/products")
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (isMounted.current) {
          setData(json.products || []);
        }
      })
      .catch((err) => {
        if (isMounted.current) setError(err.message || "Unknown error");
      })
      .finally(() => {
        if (isMounted.current) setLoading(false);
      });

    return () => {
      isMounted.current = false;
    };
  }, []);

  return { data, loading, error };
}
