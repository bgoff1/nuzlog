import type { TeamContextAction } from "./team-reducer";
import { reducer } from "./team-reducer";

vi.mock("../../util/constants", () => ({
  MAX_TEAM_SIZE: 3,
}));

describe("Team Reducer", () => {
  it("should do nothing with invalid action type", () => {
    expect(
      reducer(
        {
          filters: [],
          members: [],
        },
        {} as TeamContextAction,
      ),
    ).toEqual({
      filters: [],
      members: [],
    });
  });

  it("should add a member", () => {
    expect(
      reducer(
        { filters: [], members: [] },
        {
          type: "addMember",
          payload: {
            id: 1,
            name: "bulbasaur",
            sprite: "",
            types: ["grass", "poison"],
          },
        },
      ),
    ).toEqual({
      filters: [],
      members: [
        {
          id: 1,
          name: "bulbasaur",
          sprite: "",
          types: ["grass", "poison"],
        },
      ],
    });
  });

  it("should not add more than max members", () => {
    const member = {
      id: 1,
      name: "bulbasaur",
      sprite: "",
      types: ["grass", "poison"] as Array<"grass" | "poison">,
    };
    expect(
      reducer(
        { filters: [], members: Array.from(new Array(3)).map(() => member) },
        {
          type: "addMember",
          payload: {
            id: 1,
            name: "bulbasaur",
            sprite: "",
            types: ["grass", "poison"],
          },
        },
      ).members.length,
    ).toEqual(3);
  });

  it("should remove a member", () => {
    expect(
      reducer(
        {
          filters: [],
          members: [
            {
              id: 1,
              name: "bulbasaur",
              sprite: "",
              types: ["grass", "poison"],
            },
          ],
        },
        {
          type: "removeMember",
          payload: {
            id: 1,
            name: "bulbasaur",
            sprite: "",
            types: ["grass", "poison"],
          },
        },
      ),
    ).toEqual({
      filters: [],
      members: [],
    });
  });

  it("should do nothing when removing a member that does not exist", () => {
    expect(
      reducer(
        {
          filters: [],
          members: [
            {
              id: 1,
              name: "bulbasaur",
              sprite: "",
              types: ["grass", "poison"],
            },
          ],
        },
        {
          type: "removeMember",
          payload: {
            id: 2,
            name: "ivysaur",
            sprite: "",
            types: ["grass", "poison"],
          },
        },
      ),
    ).toEqual({
      filters: [],
      members: [
        {
          id: 1,
          name: "bulbasaur",
          sprite: "",
          types: ["grass", "poison"],
        },
      ],
    });
  });

  for (const type of ["type", "generation"] as const) {
    it(`should add a ${type} filter`, () => {
      expect(
        reducer(
          { filters: [], members: [] },
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
        members: [],
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
            members: [],
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
        members: [],
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
            members: [],
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
        members: [],
      });
    });
  }

  it("should add fully evolved filter", () => {
    expect(
      reducer({ filters: [], members: [] }, { type: "toggleFullyEvolved" })
        .filters,
    ).toEqual([expect.objectContaining({ type: "fullyEvolved" })]);
  });

  it("should remove fully evolved filter", () => {
    expect(
      reducer(
        {
          filters: [{ type: "fullyEvolved", label: "", value: -1 }],
          members: [],
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
          members: [],
        },
        { type: "clearFilters" },
      ),
    ).toEqual({
      filters: [],
      members: [],
    });
  });
});
