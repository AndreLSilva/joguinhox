import { useCallback, useEffect, useMemo, useState } from "react";
import {
  localStorageEntryChangeEvent,
  removeLocalStorageEntry,
  setLocalStorageEntry,
} from "./local-storage.utils";

type Return<T> = [T, (value: T) => void, () => void];

export function useLocalStorageEntry<T = string>(entry: string): Return<T | undefined>;
export function useLocalStorageEntry<T = string>(entry: string, defaultValue: T): Return<T>;
export function useLocalStorageEntry<T = string>(entry: string, defaultValue?: T): Return<T> {
  const [rawValue, setRawValue] = useState<string | null>(() => {
    // Gets the initial value from Local Storage.
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(entry);
  });

  const parsedValue = useMemo<T>(() => {
    if (!rawValue) return defaultValue;
    return JSON.parse(rawValue);
  }, [defaultValue, rawValue]);

  /** Entry change event handler */
  const handleChange = useCallback(
    (event: Event) => {
      const eventDetail = (event as CustomEvent<string>).detail;
      if (eventDetail !== entry) return; // Don't update if the entry didn't change.

      setRawValue(window.localStorage.getItem(entry) ?? ""); // Updates the raw value.
    },
    [entry]
  );

  const set = useCallback((value: T) => setLocalStorageEntry(entry, value), [entry]);
  const remove = useCallback(() => removeLocalStorageEntry(entry), [entry]);

  // Adds the entry change event listener. This will keep the value updated.
  useEffect(() => {
    window.addEventListener(localStorageEntryChangeEvent, handleChange);
    return () => window.removeEventListener(localStorageEntryChangeEvent, handleChange);
  }, [handleChange]);

  return [parsedValue, set, remove];
}
