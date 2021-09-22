import { useState, useEffect } from "react";

export const useDebounce = (val: string, delay: number): string => {
  const [debouncedVal, setDebouncedVal] = useState<string>(val);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedVal(val);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [val, delay]);

  return debouncedVal;
};
