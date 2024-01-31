import type { CompiledQuery, RootOperationNode } from "kysely";
import type { Database } from "sql.js";
import { databaseQuery } from "./query";

type MockedDB = ReturnType<typeof vi.mocked<Database>>;

describe("Query Database", () => {
  const mockQuery = {
    sql: "SELECT * FROM table WHERE column = ?",
    parameters: [1],
    query: null as unknown as RootOperationNode,
  };
  const mockDB = {
    exec: vi.fn().mockReturnValue([
      {
        columns: ["id", "name"],
        values: [
          [1, "bob"],
          [2, "steve"],
          [3, "jane"],
        ],
      },
    ]),
  } as MockedDB;

  const log = vi.fn();

  beforeEach(() => {
    log.mockClear();
    vi.stubGlobal("console", {
      log,
    });
  });

  it("should query db", () => {
    import.meta.env.VITE_DEBUG_QUERY = false;
    expect(databaseQuery(mockQuery, mockDB)).toEqual([
      {
        id: 1,
        name: "bob",
      },
      {
        id: 2,
        name: "steve",
      },
      {
        id: 3,
        name: "jane",
      },
    ]);

    expect(log).not.toHaveBeenCalled();
  });

  it("should debug query if wanted", () => {
    import.meta.env.VITE_DEBUG_QUERY = "true";

    databaseQuery(mockQuery, mockDB);

    expect(log).toHaveBeenCalledTimes(2);
    expect(log).toHaveBeenCalledWith("SELECT * FROM table WHERE column = 1;");
    expect(log).toHaveBeenCalledWith([
      {
        id: 1,
        name: "bob",
      },
      {
        id: 2,
        name: "steve",
      },
      {
        id: 3,
        name: "jane",
      },
    ]);
  });

  it("should debug with strings", () => {
    import.meta.env.VITE_DEBUG_QUERY = "true";

    databaseQuery(
      {
        parameters: ["bob"],
        sql: "SELECT * FROM table WHERE name = ?",
      } as Partial<CompiledQuery<unknown>> as CompiledQuery<unknown>,
      {
        exec: vi
          .fn()
          .mockReturnValue([{ columns: ["id", "name"], values: [[1, "bob"]] }]),
      } as MockedDB,
    );

    expect(log).toHaveBeenCalledTimes(2);
    expect(log).toHaveBeenCalledWith("SELECT * FROM table WHERE name = 'bob';");
    expect(log).toHaveBeenCalledWith([
      {
        id: 1,
        name: "bob",
      },
    ]);
  });
});
