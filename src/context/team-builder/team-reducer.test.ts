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
          members: [],
        },
        {} as TeamContextAction,
      ),
    ).toEqual({
      members: [],
    });
  });

  it("should add a member", () => {
    expect(
      reducer(
        { members: [] },
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
        { members: Array.from(new Array(3)).map(() => member) },
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
      members: [],
    });
  });

  it("should do nothing when removing a member that does not exist", () => {
    expect(
      reducer(
        {
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
});
