import { useEffect, useState, useRef } from 'react';

function useSubmit() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  async function fetchData(url, method, body) {
    try {
      setLoading(true);
      const req = await fetch(url, {
        method: method,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (req.ok) {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          isMounted.current && setSuccess(false);
        }, 1000);
      } else {
        setLoading(false);
        setError(true);
        setTimeout(() => {
          isMounted.current && setError(false);
        }, 1000);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      setTimeout(() => {
        isMounted.current && setError(false);
      }, 1000);
    }
  }

  return { loading, error, success, fetchData };
}

export default useSubmit;
