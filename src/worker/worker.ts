import { expose } from "comlink";
import type { CompiledQuery } from "kysely";
import type { Database } from "sql.js";
import { loadDatabase } from "./load";
import { databaseQuery } from "./query";

let db: Database;

const query = <T>(compiledQuery: CompiledQuery<T>) =>
  databaseQuery(compiledQuery, db);

export const workerObject = {
  query,
  load: async () => {
    try {
      db = await loadDatabase();
    } catch (err) {
      const error = err as Error;
      console.error(error.name, error.message);
    }
  },
};

expose(workerObject);
