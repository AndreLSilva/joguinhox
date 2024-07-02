export type LocalStorageItemValue = object | string;

export type LocalStorageSetItemCallback<T extends LocalStorageItemValue | undefined> = (
  previous: T,
) => LocalStorageItemValue;

export type LocalStorageChangeEvent = CustomEvent<LocalStorageChangeEventDetails>;

export interface LocalStorageChangeEventDetails {
  key: string;
}

export type LocalStorageChangeEventHandler = (event: LocalStorageChangeEvent) => void;
