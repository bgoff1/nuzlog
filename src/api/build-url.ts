import type { EndpointKey, Endpoints } from "@bgoff1/pokeapi-types";
import { LOCAL_FILE_STORAGE_LOCATION, POKE_API_URL } from "../util/constants";
import { env } from "../util/env";

export function buildURL<T extends keyof Endpoints>(
  key: T,
  parameters: Endpoints[T]["parameters"],
): string {
  if (isKeyValid(key)) {
    return key;
  }

  let url = getBaseURL() + key;

  if ("path" in parameters && parameters.path) {
    url = url.replace(":id", parameters.path.id.toString());
  }

  if (env().USE_LOCAL_FILES) {
    url = `${url}/index.json`;
  }

  if ("query" in parameters && parameters.query) {
    const urlSearchParams = new URLSearchParams(
      parameters.query as Record<string, string>,
    ).toString();

    return `${url}?${urlSearchParams}`;
  }

  return url;
}

const getBaseURL = () =>
  env().USE_LOCAL_FILES ? LOCAL_FILE_STORAGE_LOCATION : POKE_API_URL;

const isKeyValid = (key: string) =>
  key.includes(POKE_API_URL) || key.includes("index.json");

export const getEndpointFromURL = (url: string): EndpointKey => {
  return url
    .replace(POKE_API_URL, "")
    .replace("/index.json", "") as EndpointKey;
};
