import type { useEffectiveness } from "../../hooks/team-builder/coverage";
import type { HookType } from "../../types/hook-type";
import type { PokemonType } from "../../types/pokemon-types";

export const getMatchup = (
  map: HookType<typeof useEffectiveness>,
  types: PokemonType[],
  attack: PokemonType,
) => {
  if (types.length === 1) {
    return map.get(`${attack} vs ${types[0]}`) ?? 1;
  }

  const typeOne = map.get(`${attack} vs ${types[0]}`) ?? 1;
  const typeTwo = map.get(`${attack} vs ${types[1]}`) ?? 1;

  return typeOne * typeTwo;
};
