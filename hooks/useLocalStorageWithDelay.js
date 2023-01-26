//use local storage to store data in the browser
import { useEffect, useState } from "react";

// Hook
export function useLocalStorageWithDelay(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once

  const [value, setValue] = useState(() => {
    // Get from local storage by key
    const item = window.localStorage.getItem(key);
    // Parse stored json or if none return initialValue
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    const myInterval = setInterval(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, 10000);
    return () => {
      clearInterval(myInterval);
    };
  }, []);

  return [value, setValue];
}
