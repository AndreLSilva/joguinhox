import { LocalStorageChangeEvent } from "./local-storage.types";

export const localStorageItemChangeEvent = "localStorageItemChange";

/**
 * Dispatches the custom LocalStorageChangeEvent.
 * @param key Used in the event's details to specify what key has changed.
 */
export function dispatchLocalStorageChangeEvent(key: string) {
  const event: LocalStorageChangeEvent = new CustomEvent(localStorageItemChangeEvent, {
    detail: { key },
  });

  window.dispatchEvent(event);
}
