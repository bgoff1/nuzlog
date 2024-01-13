import type {
  EndpointKey,
  Endpoints,
  NamedAPIResourceList,
} from "@bgoff1/pokeapi-types";
import { delMany, get, keys, set } from "idb-keyval";
import { buildURL, getEndpointFromURL } from "./build-url";
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

  const updateKey = getEndpointFromURL(key);

  await bumpLastUpdate(updateKey);

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

export const updateKey = async (key: EndpointKey, keysToDelete: string[]) => {
  if (keys.length) {
    await delMany(keysToDelete);
  }

  const resource = (await fetchFunction(key, {})) as NamedAPIResourceList;

  for (const each of resource.results) {
    const newURL = each.url;
    await fetchFunction(newURL as EndpointKey, {});
  }
};
