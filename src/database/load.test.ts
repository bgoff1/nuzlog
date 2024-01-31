import { loadDB } from "./load";

const mockLoad = vi.hoisted(() => vi.fn());
vi.mock("../worker/instances/web-worker", () => ({
  db: {
    load: mockLoad,
  },
}));

describe("Database", () => {
  it("should load", async () => {
    await loadDB();
    expect(mockLoad).toHaveBeenCalledOnce();
  });
});
