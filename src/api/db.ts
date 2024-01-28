import { delMany, get, keys as getAllKeys, set } from "idb-keyval";

export const db = {
  delete: (keys: string[]) => delMany(keys),
  set: <T>(key: string, value: T) => set(key, value),
  get: <T>(key: string) => get<T>(key),
  getAllKeys: (): Promise<string[]> => getAllKeys(),
} as const;
