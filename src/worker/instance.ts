import { wrap } from "comlink";
import type { CompiledQuery } from "kysely";

// worker instance
export const db = wrap<(typeof import("./worker"))["workerObject"]>(
  new Worker(new URL("./worker", import.meta.url), { type: "module" }),
);

export const query = <T>(compiledQuery: CompiledQuery<T>): Promise<T[]> =>
  db.query(compiledQuery) as Promise<T[]>;
