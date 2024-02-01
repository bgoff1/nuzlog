import type { PokemonType } from "../../types/pokemon-types";
import { getMatchup } from "./get-matchup";

it("should get matchup", () => {
  const map = new Map<`${PokemonType} vs ${PokemonType}`, number>();
  map.set("fire vs normal", 1);
  map.set("water vs normal", 1);
  map.set("water vs fire", 2);
  map.set("water vs rock", 2);
  map.set("water vs water", 0.5);
  map.set("water vs grass", 0.5);

  expect(getMatchup(map, ["normal"], "fire")).toEqual(1);
  expect(getMatchup(map, ["normal"], "normal")).toEqual(1);
  expect(getMatchup(map, ["fire"], "water")).toEqual(2);

  expect(getMatchup(map, ["fire", "rock"], "water")).toEqual(4);
  expect(getMatchup(map, ["water", "grass"], "water")).toEqual(0.25);
  expect(getMatchup(map, ["water", "fire"], "water")).toEqual(1);
  expect(getMatchup(map, ["water", "normal"], "water")).toEqual(0.5);
  expect(getMatchup(map, ["fire", "normal"], "water")).toEqual(2);
  expect(getMatchup(map, ["fire", "normal"], "rock")).toEqual(1);
});
