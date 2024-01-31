import { renderHook, waitFor } from "@solidjs/testing-library";
import { useGenerations, useTypes } from "./options";

const query = vi.hoisted(() => vi.fn());

vi.mock("../../database/query", () => ({
  query,
}));

describe("Builder Options", () => {
  beforeEach(() => query.mockClear());

  it("should get types", () => {
    query.mockResolvedValue([
      {
        name: "fire",
        id: 1,
      },
    ]);

    const { result } = renderHook(() => useTypes());

    return waitFor(() =>
      expect(result()).toEqual([
        {
          name: "fire",
          id: 1,
        },
      ]),
    );
  });

  it("should get generations", () => {
    query.mockResolvedValue([
      {
        name: "gen 1",
        id: 1,
      },
    ]);

    const { result } = renderHook(() => useGenerations());

    return waitFor(() =>
      expect(result()).toEqual([
        {
          name: "gen 1",
          id: 1,
        },
      ]),
    );
  });
});
