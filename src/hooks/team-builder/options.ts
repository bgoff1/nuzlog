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
            "pokemon_v2_type as type",
            "pokemon_v2_typename as type_name",
            "pokemon_v2_language as language",
          ])
          .select(["type_name.name", "type.id"])
          .whereRef("type.id", "=", "type_name.type_id")
          .whereRef("language.id", "=", "type_name.language_id")
          .where("language.name", "=", "en")
          .where("type.id", "<", 10000)
          .orderBy("type.id")
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
            "pokemon_v2_generation as generation",
            "pokemon_v2_generationname as generation_name",
            "pokemon_v2_language as language",
          ])
          .select(["generation_name.name", "generation.id"])
          .whereRef("generation.id", "=", "generation_name.generation_id")
          .whereRef("language.id", "=", "generation_name.language_id")
          .where("language.name", "=", "en")
          .orderBy("generation.id")
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
          .where((eb) =>
            eb.exists(
              eb
                .selectFrom([
                  "pokemon_v2_encounter as encounter",
                  "pokemon_v2_version as version",
                  "pokemon_v2_versiongroup as version_group",
                  "pokemon_v2_versiongroupregion as version_group_region",
                ])
                .select("encounter.id")
                .whereRef("encounter.version_id", "=", "version.id")
                .whereRef("version.version_group_id", "=", "version_group.id")
                .whereRef(
                  "version_group.id",
                  "=",
                  "version_group_region.version_group_id",
                )
                .whereRef("version_group_region.region_id", "=", "region.id"),
            ),
          )
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
          .where((eb) =>
            eb.exists(
              eb
                .selectFrom("pokemon_v2_encounter as encounter")
                .select("encounter.id")
                .whereRef("encounter.version_id", "=", "version.id"),
            ),
          )
          .where("language.name", "=", "en")
          .compile(),
      );
    },
  }));
};
