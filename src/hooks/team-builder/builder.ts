import { createResource } from "solid-js";
import { queryBuilder } from "../../database";
import { query } from "../../worker/instance";

export const useBuilderData = () => {
  const [data] = createResource(
    () =>
      query(
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
            "pokemon_v2_pokemonspeciesname.name",
            "pokemon_v2_pokemonsprites.sprites",
          ])
          .select((eb) =>
            eb.fn
              .agg<string>("group_concat", ["pokemon_v2_type.name"])
              .as("types"),
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
          .whereRef(
            "pokemon_v2_pokemontype.pokemon_id",
            "=",
            "pokemon_v2_pokemon.id",
          )
          .whereRef("pokemon_v2_type.id", "=", "pokemon_v2_pokemontype.type_id")
          .where("pokemon_v2_language.name", "=", "en")
          .where("pokemon_v2_pokemon.is_default", "=", "1")
          .orderBy([
            "pokemon_v2_pokemonspecies.evolution_chain_id",
            "pokemon_v2_pokemon.order",
          ])
          .groupBy("pokemon_v2_pokemon.id")
          .compile(),
      ),
    { initialValue: [] },
  );

  return data;
};
