import { createResource } from "solid-js";
import { query } from "../../database/query";
import { queryBuilder } from "../../database/query-builder";

export const useTypes = () => {
  const [types] = createResource(
    () =>
      query(
        queryBuilder
          .selectFrom([
            "pokemon_v2_type",
            "pokemon_v2_typename",
            "pokemon_v2_language",
          ])
          .select(["pokemon_v2_typename.name", "pokemon_v2_type.id"])
          .whereRef("pokemon_v2_type.id", "=", "pokemon_v2_typename.type_id")
          .whereRef(
            "pokemon_v2_language.id",
            "=",
            "pokemon_v2_typename.language_id",
          )
          .where("pokemon_v2_language.name", "=", "en")
          .where("pokemon_v2_type.id", "<", 10000)
          .orderBy("pokemon_v2_type.id")
          .compile(),
      ),
    { initialValue: [] },
  );

  return types;
};

export const useGenerations = () => {
  const [generation] = createResource(
    () =>
      query(
        queryBuilder
          .selectFrom([
            "pokemon_v2_generation",
            "pokemon_v2_generationname",
            "pokemon_v2_language",
          ])
          .select([
            "pokemon_v2_generationname.name",
            "pokemon_v2_generation.id",
          ])
          .whereRef(
            "pokemon_v2_generation.id",
            "=",
            "pokemon_v2_generationname.generation_id",
          )
          .whereRef(
            "pokemon_v2_language.id",
            "=",
            "pokemon_v2_generationname.language_id",
          )
          .where("pokemon_v2_language.name", "=", "en")
          .orderBy("pokemon_v2_generation.id")
          .compile(),
      ),
    { initialValue: [] },
  );

  return generation;
};
