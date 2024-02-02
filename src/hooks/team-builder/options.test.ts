import { renderHook, waitFor } from "@solidjs/testing-library";
import { useGenerations, useRegions, useTypes, useVersions } from "./options";

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
      expect(result.data).toEqual([
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
      expect(result.data).toEqual([
        {
          name: "gen 1",
          id: 1,
        },
      ]),
    );
  });

  it("should get regions", () => {
    query.mockResolvedValue([
      {
        name: "kanto",
        id: 1,
      },
    ]);

    const { result } = renderHook(() => useRegions());

    return waitFor(() =>
      expect(result.data).toEqual([
        {
          name: "kanto",
          id: 1,
        },
      ]),
    );
  });

  it("should get versions", () => {
    query.mockResolvedValue([
      {
        name: "red",
        id: 1,
      },
    ]);

    const { result } = renderHook(() => useVersions());

    return waitFor(() =>
      expect(result.data).toEqual([
        {
          name: "red",
          id: 1,
        },
      ]),
    );
  });
});
