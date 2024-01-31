import { query } from "./query";
import { queryBuilder } from "./query-builder";

const mockQuery = vi.hoisted(() => vi.fn());
vi.mock("../worker/instances/web-worker", () => ({
  db: {
    query: mockQuery,
    load: mockQuery,
  },
}));

describe("Database", () => {
  beforeEach(() => {
    mockQuery.mockClear();
  });

  it("should query", () => {
    query(
      queryBuilder
        .selectFrom("pokemon_v2_pokemon")
        .selectAll()
        .limit(10)
        .compile(),
    );

    expect(mockQuery).toHaveBeenCalledWith(
      queryBuilder
        .selectFrom("pokemon_v2_pokemon")
        .selectAll()
        .limit(10)
        .compile(),
    );
  });
});
