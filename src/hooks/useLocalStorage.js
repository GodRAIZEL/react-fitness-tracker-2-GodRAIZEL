import { useState, useEffect } from 'react';

/**
 * useLocalStorage
 * A custom hook that behaves like useState but persists its value to
 * localStorage, and rehydrates from localStorage on mount.
 *
 * @param {string} key - the localStorage key to read/write
 * @param {*} initialValue - the default value if nothing is stored yet
 */
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch (error) {
      // If parsing fails (corrupt data), fall back to the initial value.
      return initialValue;
    }
  });

  // Whenever the value changes, persist it back to localStorage.
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Storage may be unavailable (e.g. private browsing) - fail silently.
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
