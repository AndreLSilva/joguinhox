import { useCallback, useEffect, useState } from "react";
import { getLocalStorageItem } from "./api/get";
import { removeLocalStorageItem } from "./api/remove";
import { setLocalStorageItem } from "./api/set";
import {
  LocalStorageChangeEventHandler,
  LocalStorageItemValue,
  LocalStorageSetItemCallback,
} from "./local-storage.types";
import { localStorageItemChangeEvent } from "./local-storage.utils";

type UseLocalStorageItemReturn<
  TValue extends LocalStorageItemValue | undefined,
  TDefaultValue extends TValue | undefined,
> = [
  TValue,
  (value: NonNullable<TValue> | LocalStorageSetItemCallback<TDefaultValue>) => void,
  () => void,
];

/**
 * Treats a Local Storage item as a state with reactivity. The value of the item will be parsed if
 * it is not a string. Any changes to the key will update the state of the returned value.
 * @param key The key of the Local Storage item.
 */
export function useLocalStorageItem<T extends LocalStorageItemValue>(
  key: string,
): UseLocalStorageItemReturn<T | undefined, T | undefined>;

/**
 * Treats a Local Storage item as a state with reactivity. The value of the item will be parsed if
 * it is not a string. Any changes to the key will update the state of the returned value.
 * @param key The key of the Local Storage item.
 * @param defaultValue A value to be used as a fallback if the item doesn't exist.
 */
export function useLocalStorageItem<T extends LocalStorageItemValue>(
  key: string,
  defaultValue: T,
): UseLocalStorageItemReturn<T, T>;

export function useLocalStorageItem<T extends LocalStorageItemValue>(
  key: string,
  defaultValue?: T,
): UseLocalStorageItemReturn<T | undefined, T | undefined> {
  const [value, setValue] = useState<T | undefined>(getLocalStorageItem<T>(key) ?? defaultValue);

  const handleChange = useCallback<LocalStorageChangeEventHandler>(
    (event) => {
      // Don't update if the changed item is a different one.
      if (event.detail.key !== key) return;

      // Updates the value.
      setValue(getLocalStorageItem<T>(key) ?? defaultValue);
    },
    [defaultValue, key],
  );

  const set = useCallback(
    (value: T | LocalStorageSetItemCallback<typeof defaultValue>) => {
      setLocalStorageItem(key, value as LocalStorageSetItemCallback<T>, defaultValue);
    },
    [defaultValue, key],
  );

  const remove = useCallback(() => removeLocalStorageItem(key), [key]);

  // Adds the entry change event listener. This will keep the value updated.
  useEffect(() => {
    window.addEventListener(localStorageItemChangeEvent, handleChange as EventListener);
    return () =>
      window.removeEventListener(localStorageItemChangeEvent, handleChange as EventListener);
  }, [handleChange]);

  return [value, set, remove];
}
