import { dispatchLocalStorageChangeEvent } from "../local-storage.utils";

/**
 * Removes an item from the Local Storage. Triggers the item change event.
 * @param key The item's key on the Local Storage.
 */
export function removeLocalStorageItem(key: string) {
  // Removes the item from the Local Storage.
  window.localStorage.removeItem(key);
  // Dispatches the change event.
  dispatchLocalStorageChangeEvent(key);
}
