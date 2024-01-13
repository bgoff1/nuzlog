import type { EndpointKey, Endpoints } from "@bgoff1/pokeapi-types";
import { get, keys, set } from "idb-keyval";
import { buildURL } from "./build-url";
import { bumpLastUpdate } from "./last-update";

const cachedFetch = async <T>(key: EndpointKey): Promise<T> => {
  const value = await get<T>(key);

  if (value) {
    return value;
  }

  const response = await fetch(key, {
    headers: {},
    method: "GET",
  });

  if (!response.ok) {
    return undefined as T;
  }

  const data = await response.json();

  await bumpLastUpdate(key);

  await set(key, data);

  return data;
};

export const fetchFunction = async <T extends EndpointKey>(
  key: T,
  parameters: Endpoints[T]["parameters"],
): Promise<Endpoints[T]["data"]> => {
  const url = buildURL(key, parameters);

  const fetchResult = await cachedFetch<Endpoints[T]["data"]>(
    url as EndpointKey,
  );

  return fetchResult;
};

export const getCacheKeys = (): Promise<string[]> => keys();
