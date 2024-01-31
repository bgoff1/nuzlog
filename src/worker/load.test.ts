import { loadDatabase } from "./load";

const initSqlJs = vi.hoisted(() => vi.fn());

vi.mock("sql.js", () => ({
  default: initSqlJs,
}));

vi.mock("sql.js/dist/sql-wasm.wasm?url", () => ({
  default: "some url",
}));

describe("Load DB", () => {
  const fetch = vi.fn();
  beforeEach(() => {
    vi.stubGlobal("fetch", fetch);
  });

  it("should load db", async () => {
    fetch.mockResolvedValue({
      arrayBuffer: vi.fn().mockResolvedValue("resolved array buffer"),
    });

    initSqlJs.mockResolvedValue({
      Database: vi.fn(),
    });

    await loadDatabase();

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith("some url");
    expect(fetch).toHaveBeenCalledWith("/pokemon.db");
  });
});
