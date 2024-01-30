import { expose } from "comlink";
import type { CompiledQuery } from "kysely";
import type { Database, SqlValue } from "sql.js";
import initSqlJs from "sql.js";
import sqlJsWasmURL from "sql.js/dist/sql-wasm.wasm?url";

let db: Database;

function query<T>(compiledQuery: CompiledQuery<T>): T[] {
  console.log(compiledQuery.sql, compiledQuery.parameters);

  const [{ columns, values }] = db.exec(
    compiledQuery.sql,
    compiledQuery.parameters as SqlValue[],
  );

  return values.map((row) =>
    columns.reduce(
      (previous, current, index) => ({
        ...previous,
        [current]: row[index],
      }),
      {} as T,
    ),
  );
}

export const workerObject = {
  query,
  load: async () => {
    try {
      const wasmResponse = await fetch(sqlJsWasmURL);

      const sqlPromise = initSqlJs({
        wasmBinary: await wasmResponse.arrayBuffer(),
      });

      const dataPromise = fetch("/pokemon.db").then((res) => res.arrayBuffer());

      const [SQL, buf] = await Promise.all([sqlPromise, dataPromise]);

      db = new SQL.Database(new Uint8Array(buf));
    } catch (err) {
      const error = err as Error;
      console.error(error.name, error.message);
    }
  },
};

expose(workerObject);
