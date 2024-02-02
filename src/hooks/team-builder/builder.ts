import type { PokemonSprites } from "@bgoff1/pokeapi-types";
import { createQuery } from "@tanstack/solid-query";
import { sql } from "kysely";
import type { Accessor } from "solid-js";
import type { Filter } from "../../context/team-builder/team-reducer";
import { query } from "../../database/query";
import { queryBuilder } from "../../database/query-builder";
import type { PokemonType } from "../../types/pokemon-types";

const getBaseQuery = () =>
  queryBuilder
    .selectFrom([
      "pokemon_v2_pokemon",
      "pokemon_v2_pokemonspecies",
      "pokemon_v2_pokemonspeciesname",
      "pokemon_v2_language",
      "pokemon_v2_pokemonsprites",
      "pokemon_v2_pokemontype",
      "pokemon_v2_type",
    ])
    .select([
      "pokemon_v2_pokemon.id",
      "pokemon_v2_pokemonspeciesname.name",
      "pokemon_v2_pokemonsprites.sprites",
    ])
    .select((eb) =>
      eb.fn.agg<string>("group_concat", ["pokemon_v2_type.name"]).as("types"),
    )
    .whereRef(
      "pokemon_v2_pokemonspecies.id",
      "=",
      "pokemon_v2_pokemon.pokemon_species_id",
    )
    .whereRef(
      "pokemon_v2_pokemonspeciesname.pokemon_species_id",
      "=",
      "pokemon_v2_pokemonspecies.id",
    )
    .whereRef(
      "pokemon_v2_language.id",
      "=",
      "pokemon_v2_pokemonspeciesname.language_id",
    )
    .whereRef(
      "pokemon_v2_pokemonsprites.pokemon_id",
      "=",
      "pokemon_v2_pokemon.id",
    )
    .whereRef("pokemon_v2_pokemontype.pokemon_id", "=", "pokemon_v2_pokemon.id")
    .whereRef("pokemon_v2_type.id", "=", "pokemon_v2_pokemontype.type_id")
    .where("pokemon_v2_language.name", "=", "en")
    .where("pokemon_v2_pokemon.is_default", "=", "1")
    .orderBy([
      "pokemon_v2_pokemonspecies.evolution_chain_id",
      "pokemon_v2_pokemon.order",
    ])
    .groupBy("pokemon_v2_pokemon.id");

const getFilteredQuery = (filters: Record<Filter["type"], Filter[]>) => {
  let baseQuery = getBaseQuery();

  if (filters.generation.length) {
    baseQuery = baseQuery
      .where(
        "pokemon_v2_pokemonspecies.generation_id",
        "in",
        filters.generation.map((filter) => filter.value),
      )
      .clearOrderBy()
      .orderBy("pokemon_v2_pokemon.id");
  }

  if (filters.fullyEvolved.length) {
    baseQuery = baseQuery.where(
      (eb) =>
        sql`${eb.ref("pokemon_v2_pokemonspecies.id")} = ${eb.parens(
          sql`select max(ps.id) from pokemon_v2_pokemonspecies ps WHERE ps.${eb.ref(
            "evolution_chain_id",
          )} = ${eb.ref(
            "pokemon_v2_pokemonspecies.evolution_chain_id",
          )} and ${eb.parens(
            sql`ps.${eb.ref(
              "evolves_from_species_id",
            )} is not null or ${eb.parens(
              sql`select count(${eb.ref(
                "evolution_chain_id",
              )}) from pokemon_v2_pokemonspecies where ${eb.ref(
                "evolution_chain_id",
              )} = ps.${eb.ref("evolution_chain_id")}`,
            )} = 1`,
          )}`,
        )}`,
    );
  }

  if (filters.type.length) {
    return baseQuery
      .select((eb) =>
        eb.fn
          .agg<string>("group_concat", ["pokemon_v2_type.id"])
          .as("type_ids"),
      )
      .compile();
  }

  return baseQuery.compile();
};

const getFormattedPokemon = async (filters: Filter[]) => {
  const filterRecord = filters.reduce(
    (previous, current) => {
      const type = current.type;
      return {
        ...previous,
        [type]: [...previous[type], current],
      };
    },
    {
      type: [],
      generation: [],
      fullyEvolved: [],
    } as Record<Filter["type"], Filter[]>,
  );

  const pokemon = await query(getFilteredQuery(filterRecord));

  const formattedPokemon = pokemon
    .map((each) => {
      const sprites = JSON.parse(each.sprites) as PokemonSprites;
      const types: PokemonType[] = each.types.split(",") as PokemonType[];
      const typeIds = (each.type_ids ?? "").split(",").map((id) => +id);

      return {
        id: each.id,
        name: each.name,
        sprite: sprites.front_default!,
        typeIds,
        types,
      };
    })
    .filter((each) => !!each.sprite);

  const removeTypeIds = ({
    typeIds,
    ...onePokemon
  }: (typeof formattedPokemon)[number]) => onePokemon;

  if (filterRecord.type.length) {
    const typeFilterIds = filterRecord.type.map((f) => f.value);
    return formattedPokemon
      .filter((formattedPoke) =>
        formattedPoke.typeIds.some((pokemonType) =>
          typeFilterIds.includes(pokemonType),
        ),
      )
      .map(removeTypeIds);
  }

  return formattedPokemon.map(removeTypeIds);
};

export const useBuilderData = (filters: Accessor<Filter[]>) => {
  return createQuery(() => ({
    queryKey: ["pokemon", ...filters().map((x) => JSON.stringify(x))],
    queryFn: () => getFormattedPokemon(filters()),
  }));
};
