import { useEffect } from 'react';

const useInterval = (ms: number, callback: () => void) => {
  useEffect(() => {
    const interval = setInterval(callback, ms);

    return () => clearInterval(interval)
  }, [ms, callback]);
}

export default useInterval;
