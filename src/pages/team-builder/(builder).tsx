import type { PokemonSprites } from "@bgoff1/pokeapi-types";
import clsx from "clsx";
import { For, Show, createMemo } from "solid-js";
import { useBuilderData } from "../../hooks/team-builder/builder";
import {
  bgMapping,
  getBorderColor,
  type PokemonType,
} from "../../types/pokemon-types";

const BuilderPage = () => {
  const data = useBuilderData();

  const pokemon = createMemo(() =>
    data()!
      .map((each) => {
        const sprites = JSON.parse(each.sprites) as PokemonSprites;
        const types: PokemonType[] = each.types.split(",") as PokemonType[];

        return {
          name: each.name,
          sprite: sprites.front_default as string,
          types,
        };
      })
      .filter((each) => !!each.sprite),
  );

  return (
    <>
      <h1>This is the Builder Page</h1>
      <Show when={!data.loading} fallback="loading...">
        <ul class="flex flex-wrap justify-center gap-4">
          <For each={pokemon()}>
            {({ types, name, sprite }) => {
              const background = bgMapping[types[0]];
              const borderColor = getBorderColor(types);
              return (
                <div class="text-center">
                  <img
                    src={sprite}
                    alt={name}
                    class={clsx(
                      background,
                      borderColor,
                      "rounded-full border-4",
                    )}
                  />
                  <div>{name}</div>
                </div>
              );
            }}
          </For>
        </ul>
      </Show>
    </>
  );
};

export default BuilderPage;
