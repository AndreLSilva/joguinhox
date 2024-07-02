import { LocalStorageItemValue, LocalStorageSetItemCallback } from "../local-storage.types";
import { dispatchLocalStorageChangeEvent } from "../local-storage.utils";
import { getLocalStorageItem } from "./get";

/**
 * Updates/creates an entry item on the Local Storage. Triggers the entry change event.
 * @param key The item's key on the Local Storage.
 * @param value The value that will be stored.
 */
export function setLocalStorageItem<T extends LocalStorageItemValue>(key: string, value: T): void;

/**
 * Updates/creates an entry item on the Local Storage. Triggers the entry change event.
 * @param key The item's key on the Local Storage.
 * @param callback A callback providing the previous value of the entry, the returned value will the stored as the new value of the storage item.
 */
export function setLocalStorageItem<T extends LocalStorageItemValue>(
  key: string,
  callback: LocalStorageSetItemCallback<T | undefined>,
): void;

/**
 * Updates/creates an entry item on the Local Storage. Triggers the entry change event.
 * @param key The item's key on the Local Storage.
 * @param callback A callback providing the previous value of the entry, the returned value will the stored as the new value of the storage item.
 * @param defaultValue
 */
export function setLocalStorageItem<T extends LocalStorageItemValue>(
  key: string,
  callback: LocalStorageSetItemCallback<T>,
  defaultValue: T,
): void;

/**
 * Updates/creates an entry item on the Local Storage. Triggers the entry change event.
 * @param key The item's key on the Local Storage.
 * @param callback A callback providing the previous value of the entry, the returned value will the stored as the new value of the storage item.
 * @param defaultValue A value to provide to the callback if the entry doesn't exists on the storage.
 */
export function setLocalStorageItem<T extends LocalStorageItemValue>(
  key: string,
  callback: LocalStorageSetItemCallback<T>,
  defaultValue?: T,
): void;

export function setLocalStorageItem<T extends LocalStorageItemValue>(
  key: string,
  value: T | LocalStorageSetItemCallback<T | undefined>,
  defaultValue?: T,
) {
  // Fails if function get's called on the server.
  if (typeof window === "undefined") {
    throw new Error("Cannot call `setLocalStorage` with window not defined.");
  }

  let currentValue: LocalStorageItemValue;

  // Gets the current value to be saved.
  if (typeof value === "function") {
    // If value is a callback function, gets the previous value and calls the callback with it.
    const previousValue = getLocalStorageItem<T>(key) ?? defaultValue;
    currentValue = value(previousValue);
  } else {
    // If the value is not a function, it's the value that will be saved.
    currentValue = value;
  }

  // If the value to be saved is a string, just saves it; otherwise, stringifies it and saves on the local storage.
  window.localStorage.setItem(
    key,
    typeof currentValue === "string" ? currentValue : JSON.stringify(currentValue),
  );

  // Dispatches the change event.
  dispatchLocalStorageChangeEvent(key);
}
