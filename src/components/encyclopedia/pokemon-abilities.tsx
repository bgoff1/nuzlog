import { createQuery } from "@tanstack/solid-query";
import { For, Show, type Accessor, type Component } from "solid-js";
import { query } from "../../database/query";
import { queryBuilder } from "../../database/query-builder";

const usePokemonAbilities = (id: Accessor<number>) => {
  return createQuery(() => ({
    queryKey: ["pokemon-abilities", id()],
    queryFn: async () => {
      const result = await query(
        queryBuilder
          .selectFrom([
            "pokemon_v2_pokemonability as pokemon_ability",
            "pokemon_v2_ability as ability",
            "pokemon_v2_abilityname as ability_name",
            "pokemon_v2_language as language",
            "pokemon_v2_abilityeffecttext as effect_text",
          ])
          .select([
            "ability_name.name",
            "effect_text.effect",
            "effect_text.short_effect",
            "pokemon_ability.is_hidden",
          ])
          .where("pokemon_ability.pokemon_id", "=", id())
          .whereRef("ability.id", "=", "pokemon_ability.ability_id")
          .whereRef("ability.id", "=", "ability_name.ability_id")
          .whereRef("ability_name.language_id", "=", "language.id")
          .whereRef("effect_text.language_id", "=", "language.id")
          .whereRef("effect_text.ability_id", "=", "ability.id")
          .where("language.name", "=", "en")
          .distinct()
          .compile(),
      );
      return result.map((item) => ({
        name: item.name,
        effect: item.effect || item.short_effect,
        isHidden: +item.is_hidden === 1,
      }));
    },
  }));
};

export const PokemonAbilities: Component<{ id: string }> = (props) => {
  const abilities = usePokemonAbilities(() => +props.id);

  return (
    <div>
      <h2 class="text-xl">Abilities</h2>
      <div class="flex flex-col gap-4 pl-3">
        <For each={abilities.data}>
          {(ability) => (
            <div>
              <div class="text-xl">
                <h3 class="text-lg">
                  <Show when={ability.isHidden} fallback={ability.name}>
                    {ability.name} (Hidden)
                  </Show>
                </h3>
              </div>
              <div class="whitespace-pre-line pl-3">{ability.effect}</div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};
