import type { CompiledQuery } from "kysely";
import { workerObject } from "./worker";

vi.mock("comlink", () => ({
  expose: vi.fn(),
}));

const load = vi.hoisted(() => vi.fn());
const query = vi.hoisted(() => vi.fn());

vi.mock("./load", () => ({
  loadDatabase: load,
}));

vi.mock("./query", () => ({
  databaseQuery: query,
}));

describe("Web worker", () => {
  it("should query", () => {
    workerObject.query({} as CompiledQuery);
    expect(query).toHaveBeenCalledOnce();
    expect(query).toHaveBeenCalledWith({}, undefined);
  });

  it("should load", async () => {
    load.mockResolvedValue(null);

    await workerObject.load();

    workerObject.query({} as CompiledQuery);
    expect(query).toHaveBeenCalledWith({}, null);
  });

  it("should handle failed load", async () => {
    const error = vi.fn();
    vi.stubGlobal("console", {
      error,
    });

    const myError = new Error("Whatever");
    load.mockRejectedValue(myError);

    await workerObject.load();

    expect(error).toHaveBeenCalledWith(myError.name, myError.message);
  });
});
