import type { CompiledQuery } from "kysely";
import { db } from "../worker/instances/web-worker";

export const query = <T>(compiledQuery: CompiledQuery<T>): Promise<T[]> =>
  db.query(compiledQuery) as Promise<T[]>;
