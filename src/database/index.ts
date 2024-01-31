import {
  DummyDriver,
  Kysely,
  SqliteAdapter,
  SqliteIntrospector,
  SqliteQueryCompiler,
} from "kysely";
import type { DB } from "./types.gen";

export const queryBuilder = new Kysely<DB>({
  dialect: {
    createAdapter: () => new SqliteAdapter(),
    createDriver: () => new DummyDriver(),
    createIntrospector: (database: Kysely<DB>) =>
      new SqliteIntrospector(database),
    createQueryCompiler: () => new SqliteQueryCompiler(),
  },
});

import { wrap } from "comlink";
import type { CompiledQuery } from "kysely";

// worker instance
const db = wrap<(typeof import("../worker/worker"))["workerObject"]>(
  new Worker(new URL("../worker/worker", import.meta.url), { type: "module" }),
);

export const query = <T>(compiledQuery: CompiledQuery<T>): Promise<T[]> =>
  db.query(compiledQuery) as Promise<T[]>;

export const loadDB = () => db.load();
