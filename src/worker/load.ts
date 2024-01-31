import initSqlJs from "sql.js";
import sqlJsWasmURL from "sql.js/dist/sql-wasm.wasm?url";

export const loadDatabase = async () => {
  const wasmResponse = await fetch(sqlJsWasmURL);

  const sqlPromise = initSqlJs({
    wasmBinary: await wasmResponse.arrayBuffer(),
  });

  const dataPromise = fetch("/pokemon.db").then((res) => res.arrayBuffer());

  const [SQL, buf] = await Promise.all([sqlPromise, dataPromise]);

  return new SQL.Database(new Uint8Array(buf));
};
