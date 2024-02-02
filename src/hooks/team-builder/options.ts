import { createQuery } from "@tanstack/solid-query";
import { query } from "../../database/query";
import { queryBuilder } from "../../database/query-builder";

export const useTypes = () => {
  return createQuery(() => ({
    queryKey: ["types"],
    queryFn: () =>
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
  }));
};

export const useGenerations = () => {
  return createQuery(() => ({
    queryKey: ["generations"],
    queryFn: () =>
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
  }));
};

export const useRegions = () => {
  return createQuery(() => ({
    queryKey: ["regions"],
    queryFn: () =>
      query(
        queryBuilder
          .selectFrom([
            "pokemon_v2_region as region",
            "pokemon_v2_regionname as region_name",
            "pokemon_v2_language as language",
          ])
          .select(["region.id", "region_name.name"])
          .whereRef("region.id", "=", "region_name.region_id")
          .whereRef("region_name.language_id", "=", "language.id")
          .where("language.name", "=", "en")
          .compile(),
      ),
  }));
};

export const useVersions = () => {
  return createQuery(() => ({
    queryKey: ["versions"],
    queryFn: () => {
      return query(
        queryBuilder
          .selectFrom([
            "pokemon_v2_version as version",
            "pokemon_v2_versionname as version_name",
            "pokemon_v2_language as language",
          ])
          .select(["version_name.name", "version.id"])
          .whereRef("version.id", "=", "version_name.version_id")
          .whereRef("version_name.language_id", "=", "language.id")
          .where("language.name", "=", "en")
          .compile(),
      );
    },
  }));
};
