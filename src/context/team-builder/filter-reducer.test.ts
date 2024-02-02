import type { FilterContextAction } from "./filter-reducer";
import { reducer } from "./filter-reducer";

vi.mock("../../util/constants", () => ({
  MAX_TEAM_SIZE: 3,
}));

describe("Team Reducer", () => {
  it("should do nothing with invalid action type", () => {
    expect(
      reducer(
        {
          filters: [],
        },
        {} as FilterContextAction,
      ),
    ).toEqual({
      filters: [],
    });
  });
  for (const type of ["type", "generation"] as const) {
    it(`should add a ${type} filter`, () => {
      expect(
        reducer(
          { filters: [] },
          {
            type: "toggleFilter",
            payload: {
              label: "fire",
              value: 1,
              type,
            },
          },
        ),
      ).toEqual({
        filters: [
          {
            label: "fire",
            value: 1,
            type,
          },
        ],
      });
    });

    it(`should remove a ${type} filter`, () => {
      expect(
        reducer(
          {
            filters: [
              {
                label: "fire",
                value: 1,
                type,
              },
            ],
          },
          {
            type: "toggleFilter",
            payload: {
              label: "fire",
              value: 1,
              type,
            },
          },
        ),
      ).toEqual({
        filters: [],
      });
    });

    it("should not remove all type filters", () => {
      expect(
        reducer(
          {
            filters: [
              {
                label: "fire",
                value: 1,
                type,
              },
              {
                label: "water",
                value: 2,
                type,
              },
            ],
          },
          {
            type: "toggleFilter",
            payload: {
              label: "fire",
              value: 1,
              type,
            },
          },
        ),
      ).toEqual({
        filters: [
          {
            label: "water",
            value: 2,
            type,
          },
        ],
      });
    });
  }

  it("should add fully evolved filter", () => {
    expect(
      reducer({ filters: [] }, { type: "toggleFullyEvolved" }).filters,
    ).toEqual([expect.objectContaining({ type: "fullyEvolved" })]);
  });

  it("should remove fully evolved filter", () => {
    expect(
      reducer(
        {
          filters: [{ type: "fullyEvolved", label: "", value: -1 }],
        },
        { type: "toggleFullyEvolved" },
      ).filters,
    ).toEqual([]);
  });

  it("should clear filters", () => {
    expect(
      reducer(
        {
          filters: [
            {
              type: "fullyEvolved",
              label: "",
              value: -1,
            },
            {
              type: "type",
              label: "water",
              value: 2,
            },
            {
              type: "type",
              label: "fire",
              value: 1,
            },
            { type: "generation", label: "Generation I", value: 1 },
          ],
        },
        { type: "clearFilters" },
      ),
    ).toEqual({
      filters: [],
    });
  });
});
