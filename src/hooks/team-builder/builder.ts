import type { PokemonSprites } from "@bgoff1/pokeapi-types";
import { createQuery } from "@tanstack/solid-query";
import { sql } from "kysely";
import type { Accessor } from "solid-js";
import type { Filter } from "../../context/team-builder/filter-reducer";
import { query } from "../../database/query";
import { queryBuilder } from "../../database/query-builder";
import type { PokemonType } from "../../types/pokemon-types";

export const getBasePokemonQuery = () =>
  queryBuilder
    .selectFrom([
      "pokemon_v2_pokemon as pokemon",
      "pokemon_v2_pokemonspecies as pokemon_species",
      "pokemon_v2_pokemonspeciesname as species_name",
      "pokemon_v2_language as language",
      "pokemon_v2_pokemonsprites as sprites",
      "pokemon_v2_pokemontype as pokemon_type",
      "pokemon_v2_type as type",
    ])
    .select(["pokemon.id", "species_name.name", "sprites.sprites"])
    .select((eb) =>
      eb.fn.agg<string>("group_concat", ["type.name"]).as("types"),
    )
    .whereRef("pokemon_species.id", "=", "pokemon.pokemon_species_id")
    .whereRef("species_name.pokemon_species_id", "=", "pokemon_species.id")
    .whereRef("language.id", "=", "species_name.language_id")
    .whereRef("sprites.pokemon_id", "=", "pokemon.id")
    .whereRef("pokemon_type.pokemon_id", "=", "pokemon.id")
    .whereRef("type.id", "=", "pokemon_type.type_id")
    .where("language.name", "=", "en")
    .where("pokemon.is_default", "=", "1")
    .orderBy(["pokemon_species.evolution_chain_id", "pokemon.order"])
    .groupBy("pokemon.id");

const getFilteredQuery = (filters: Record<Filter["type"], Filter[]>) => {
  let baseQuery = getBasePokemonQuery();

  if (filters.generation.length) {
    baseQuery = baseQuery
      .where(
        "pokemon_species.generation_id",
        "in",
        filters.generation.map((filter) => filter.value),
      )
      .clearOrderBy()
      .orderBy("pokemon.id");
  }

  if (filters.fullyEvolved.length) {
    baseQuery = baseQuery.where(
      (eb) =>
        sql`${eb.ref("pokemon_species.id")} = ${eb.parens(
          sql`select max(ps.id) from pokemon_v2_pokemonspecies ps WHERE ps.${eb.ref(
            "evolution_chain_id",
          )} = ${eb.ref("pokemon_species.evolution_chain_id")} and ${eb.parens(
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

  if (filters.version.length) {
    baseQuery = baseQuery.where((eb) =>
      eb(
        "pokemon.id",
        "in",
        eb
          .selectFrom([
            "pokemon_v2_encounter as encounter",
            "pokemon_v2_version as version",
          ])
          .select("encounter.pokemon_id")
          .whereRef("encounter.version_id", "=", "version.id")
          .where(
            "version.id",
            "in",
            filters.version.map((version) => version.value),
          ),
      ),
    );
  }

  if (filters.region.length) {
    baseQuery = baseQuery.where((eb) =>
      eb(
        "pokemon.id",
        "in",
        eb
          .selectFrom([
            "pokemon_v2_encounter as encounter",
            "pokemon_v2_version as version",
            "pokemon_v2_versiongroup as version_group",
            "pokemon_v2_versiongroupregion as version_group_region",
            "pokemon_v2_region as region",
          ])
          .select("encounter.pokemon_id")
          .whereRef("version.id", "=", "encounter.version_id")
          .whereRef("version_group.id", "=", "version.version_group_id")
          .whereRef(
            "version_group_region.version_group_id",
            "=",
            "version_group.id",
          )
          .whereRef("version_group_region.region_id", "=", "region.id")
          .where(
            "region.id",
            "in",
            filters.region.map((region) => region.value),
          ),
      ),
    );
  }

  if (filters.type.length) {
    return baseQuery
      .select((eb) =>
        eb.fn.agg<string>("group_concat", ["type.id"]).as("type_ids"),
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
      region: [],
      version: [],
      fullyEvolved: [],
    } as Record<Filter["type"], Filter[]>,
  );

  const pokemon = await query(getFilteredQuery(filterRecord));

  const formattedPokemon = pokemon
    .map((each) => {
      const sprite = getSpriteFromDBSprite(each.sprites);
      const types = getTypesFromDBTypes(each.types);
      const typeIds = (each.type_ids ?? "").split(",").map((id) => +id);

      return {
        id: each.id,
        name: each.name,
        sprite,
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

export const getSpriteFromDBSprite = (sprites: string) => {
  const pokemonSprites = JSON.parse(sprites) as PokemonSprites;

  return pokemonSprites.front_default!;
};

export const getTypesFromDBTypes = (types: string) => {
  return types.split(",") as PokemonType[];
};
