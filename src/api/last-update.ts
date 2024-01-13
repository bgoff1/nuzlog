import type { EndpointKey } from "@bgoff1/pokeapi-types";
import { get, update } from "idb-keyval";
import { LAST_UPDATE_KEY } from "../util/constants";

export const bumpLastUpdate = async (key: EndpointKey) => {
  // if key matches /some-url/1234
  if (key.match(/\/[\w-]+\/\d+/)?.length) {
    return;
  }

  return update(
    LAST_UPDATE_KEY,
    (oldValue: LastUpdateContainer | undefined) => ({
      ...(oldValue ?? {}),
      [key]: new Date(),
    }),
  );
};

export const getLastUpdate = async () => {
  const lastUpdate = await get<LastUpdateContainer>(LAST_UPDATE_KEY);
  return lastUpdate ?? {};
};

export type LastUpdateContainer = Record<string, Date>;
