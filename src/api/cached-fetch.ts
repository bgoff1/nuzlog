import type {
  EndpointKey,
  Endpoints,
  NamedAPIResourceList,
} from "@bgoff1/pokeapi-types";
import { buildURL, getEndpointFromURL } from "./build-url";
import { db } from "./db";
import { bumpLastUpdate } from "./last-update";

const cachedFetch = async <T>(key: EndpointKey): Promise<T> => {
  const value = await db.get<T>(key);

  if (value) {
    return value;
  }

  console.debug("Fetching", key);

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

  await db.set(key, data);

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

export const getCacheKeys = (): Promise<string[]> => db.getAllKeys();

export const updateKey = async (key: EndpointKey, keysToDelete: string[]) => {
  if (keysToDelete.length) {
    await db.delete(keysToDelete);
  }

  const resource = (await fetchFunction(key, {})) as NamedAPIResourceList;

  for (const each of resource.results) {
    const newURL = each.url;
    await fetchFunction(newURL as EndpointKey, {});
  }
};

export const getKeysMatching = (
  keysToMatch: string[],
  matcher: string,
): string[] => keysToMatch.filter((key) => key.includes(`${matcher}/`));
