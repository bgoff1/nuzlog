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
