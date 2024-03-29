import type { PokemonSprites } from "@bgoff1/pokeapi-types";
import { renderHook, waitFor } from "@solidjs/testing-library";
import { useBuilderData } from "./builder";

const query = vi.hoisted(() => vi.fn());

vi.mock("../../database/query", () => ({
  query,
}));

describe("Builder", () => {
  beforeEach(() => query.mockClear());

  it("should do query with no filters", () => {
    query.mockResolvedValue([
      {
        sprites: JSON.stringify({ front_default: "my-url" } as PokemonSprites),
        types: "fire,water",
        id: 1,
        name: "name",
      },
    ]);

    const { result } = renderHook(() => useBuilderData(() => []));

    return waitFor(() =>
      expect(result.data).toEqual([
        {
          sprite: "my-url",
          name: "name",
          id: 1,
          types: ["fire", "water"],
        },
      ]),
    );
  });

  it("should do query with type filters", () => {
    query.mockResolvedValue([
      {
        sprites: JSON.stringify({ front_default: "my-url" } as PokemonSprites),
        types: "fire,water",
        id: 1,
        name: "name",
      },
    ]);

    renderHook(() =>
      useBuilderData(() => [
        {
          type: "type",
          label: "fire",
          value: 1,
        },
      ]),
    );

    return waitFor(() =>
      expect(query).toHaveBeenCalledWith(
        expect.objectContaining({
          sql: expect.stringContaining(
            'group_concat("type"."id") as "type_ids"',
          ),
        }),
      ),
    );
  });

  it("should do query with generation filters", () => {
    query.mockResolvedValue([
      {
        sprites: JSON.stringify({ front_default: "my-url" } as PokemonSprites),
        types: "fire,water",
        id: 1,
        name: "name",
      },
    ]);

    renderHook(() =>
      useBuilderData(() => [
        {
          type: "generation",
          label: "fire",
          value: 1,
        },
      ]),
    );

    return waitFor(() =>
      expect(query).toHaveBeenCalledWith(
        expect.objectContaining({
          sql: expect.stringContaining(
            '"pokemon_species"."generation_id" in (?)',
          ),
          parameters: expect.arrayContaining([1]),
        }),
      ),
    );
  });

  it("should do query with versions filters", () => {
    query.mockResolvedValue([
      {
        sprites: JSON.stringify({ front_default: "my-url" } as PokemonSprites),
        types: "fire,water",
        id: 1,
        name: "name",
      },
    ]);

    renderHook(() =>
      useBuilderData(() => [
        {
          type: "version",
          label: "red",
          value: 1,
        },
      ]),
    );

    return waitFor(() =>
      expect(query).toHaveBeenCalledWith(
        expect.objectContaining({
          sql: expect.stringContaining('"version"."id" in (?)'),
          parameters: expect.arrayContaining([1]),
        }),
      ),
    );
  });

  it("should do query with regions filters", () => {
    query.mockResolvedValue([
      {
        sprites: JSON.stringify({ front_default: "my-url" } as PokemonSprites),
        types: "fire,water",
        id: 1,
        name: "name",
      },
    ]);

    renderHook(() =>
      useBuilderData(() => [
        {
          type: "region",
          label: "kanto",
          value: 1,
        },
      ]),
    );

    return waitFor(() =>
      expect(query).toHaveBeenCalledWith(
        expect.objectContaining({
          sql: expect.stringContaining('"region"."id" in (?)'),
          parameters: expect.arrayContaining([1]),
        }),
      ),
    );
  });

  it("should do query with fully evolved filter", () => {
    query.mockResolvedValue([
      {
        sprites: JSON.stringify({ front_default: "my-url" } as PokemonSprites),
        types: "fire,water",
        id: 1,
        name: "name",
      },
    ]);

    renderHook(() =>
      useBuilderData(() => [
        {
          type: "fullyEvolved",
          label: "fire",
          value: 1,
        },
      ]),
    );

    return waitFor(() =>
      expect(query).toHaveBeenCalledWith(
        expect.objectContaining({
          sql: expect.stringContaining("select max(ps.id)"),
        }),
      ),
    );
  });
});
