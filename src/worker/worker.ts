import type { OpfsDatabase, SqlValue } from "@sqlite.org/sqlite-wasm";
import sqlite3InitModule from "@sqlite.org/sqlite-wasm";
import { expose } from "comlink";
import type { CompiledQuery } from "kysely";

const DATABASE_NAME = "/pokemon.db";
const READ = "r";

let db: OpfsDatabase;

let Database: typeof OpfsDatabase;

const openDatabase = () => {
  db = new Database(DATABASE_NAME, READ);
};

function query<T>(compiledQuery: CompiledQuery<T>): T[] {
  openDatabase();
  console.log(compiledQuery.sql, compiledQuery.parameters);
  const result: T[] = db.exec({
    sql: compiledQuery.sql,
    bind: compiledQuery.parameters as SqlValue[],
    returnValue: "resultRows",
    rowMode: "object",
  }) as T[];
  db.close();
  return result;
}

export const workerObject = {
  query,
  load: async () => {
    try {
      const sqlite3 = await sqlite3InitModule({
        print: console.log,
        printErr: console.error,
      });
      const response = await fetch("/pokemon.db");
      const buffer = await response.arrayBuffer();
      await sqlite3.oo1.OpfsDb.importDb(DATABASE_NAME, buffer);

      Database = sqlite3.oo1.OpfsDb;
    } catch (err) {
      const error = err as Error;
      console.error(error.name, error.message);
    }
  },
};

expose(workerObject);
