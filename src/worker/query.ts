import type { CompiledQuery } from "kysely";
import type { Database, SqlValue } from "sql.js";
import { env } from "../env";

export const databaseQuery = <T>(
  compiledQuery: CompiledQuery<T>,
  db: Database,
): T[] => {
  const shouldDebugQuery = env().debugQuery;
  if (shouldDebugQuery) {
    const query = compiledQuery.parameters.reduce(
      (previous: string, current: unknown) => {
        return previous.replace(
          "?",
          isNaN(Number(current as string))
            ? `'${current}'`
            : (current as string),
        );
      },
      compiledQuery.sql,
    );

    console.log(`${query};`);
  }

  const [{ columns, values }] = db.exec(
    compiledQuery.sql,
    compiledQuery.parameters as SqlValue[],
  );

  const result = values.map((row) =>
    columns.reduce(
      (previous, current, index) => ({
        ...previous,
        [current]: row[index],
      }),
      {} as T,
    ),
  );

  if (shouldDebugQuery) {
    console.log(result);
  }

  return result;
};
