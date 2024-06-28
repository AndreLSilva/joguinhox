export const localStorageEntryChangeEvent = "localStorageEntryChange";

/**
 * Updates/creates an entry on the Local Storage. Triggers the entry change event.
 * @param key The entry key on the Local Storage.
 * @param value The value to be stored.
 */
export function setLocalStorageEntry(key: string, value: string): void;
export function setLocalStorageEntry<T>(key: string, value: T): void;
export function setLocalStorageEntry<T = string>(key: string, value: T) {
  // If the target value is a string, stores the provided value as it is.
  // If the target value is not a string, stringify it as a json.
  if (typeof value === "string") window.localStorage.setItem(key, value);
  else window.localStorage.setItem(key, JSON.stringify(value));

  // Dispatches the change event.
  dispatchLocalStorageChangeEvent(key);
}

/**
 * Removes an entry from the Local Storage. Triggers the entry change event.
 * @param key The entry key on the Local Storage.
 */
export function removeLocalStorageEntry(key: string) {
  // Removes the entry from the Local Storage
  window.localStorage.removeItem(key);

  // Dispatches the change event
  dispatchLocalStorageChangeEvent(key);
}

function dispatchLocalStorageChangeEvent(key: string) {
  const event = new CustomEvent(localStorageEntryChangeEvent, { detail: key });
  window.dispatchEvent(event);
}
