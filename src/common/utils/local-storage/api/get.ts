import { LocalStorageItemValue } from "../local-storage.types";

/**
 * Retrieves a value stored on the Local Storage and attempts to parse it if it is a valid JSON.
 * @param key The item's key on the Local Storage.
 */
export function getLocalStorageItem<T extends LocalStorageItemValue>(key: string): T | undefined;

/**
 * Retrieves a value stored on the Local Storage and attempts to parse it if it is a valid JSON.
 * @param key The item's key on the Local Storage.
 * @param defaultValue A value to be returned in case the item is not found.
 */
export function getLocalStorageItem<T extends LocalStorageItemValue>(
  key: string,
  defaultValue: T,
): T;

export function getLocalStorageItem<T extends LocalStorageItemValue>(
  key: string,
  defaultValue?: T,
): T | undefined {
  if (typeof window === "undefined") return defaultValue;

  const rawValue = window.localStorage.getItem(key);

  if (rawValue) return JSON.parse(rawValue);
  return defaultValue;
}
