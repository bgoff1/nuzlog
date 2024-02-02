import { createQuery } from "@tanstack/solid-query";
import { query } from "../../database/query";
import { queryBuilder } from "../../database/query-builder";
import type { PokemonType } from "../../types/pokemon-types";

export const useEffectiveness = () => {
  return createQuery(() => ({
    queryKey: ["effectiveness"],
    queryFn: async () => {
      const matchupList = await query(
        queryBuilder
          .selectFrom([
            "pokemon_v2_typeefficacy",
            "pokemon_v2_type as damage_type",
            "pokemon_v2_type as target_type",
          ])
          .select([
            "pokemon_v2_typeefficacy.damage_factor",
            "damage_type.name as damage_type",
            "target_type.name as target_type",
          ])
          .whereRef(
            "pokemon_v2_typeefficacy.damage_type_id",
            "=",
            "damage_type.id",
          )
          .whereRef(
            "pokemon_v2_typeefficacy.target_type_id",
            "=",
            "target_type.id",
          )
          .compile(),
      );

      const map = new Map<`${PokemonType} vs ${PokemonType}`, number>();

      for (const matchup of matchupList) {
        const factor = matchup.damage_factor / 100;
        const attacking = matchup.damage_type as PokemonType;
        const defending = matchup.target_type as PokemonType;

        map.set(`${attacking} vs ${defending}`, factor);
      }

      return map;
    },
  }));
};
