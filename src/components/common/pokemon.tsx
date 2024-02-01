import clsx from "clsx";
import type { Component } from "solid-js";
import { Show } from "solid-js";
import type { useBuilderData } from "../../hooks/team-builder/builder";
import type { HookType } from "../../types/hook-type";
import { getBackgroundColor, getBorderColor } from "../../util/colors";

type PokemonProp = HookType<typeof useBuilderData>[number];

const PokemonImage: Component<
  Omit<PokemonProp, "id"> & { responsive?: true }
> = (props) => {
  const background = () => getBackgroundColor(props.types);
  const borderColor = () => getBorderColor(props.types);

  return (
    <>
      <img
        loading="lazy"
        width={96}
        height={96}
        src={props.sprite}
        alt={props.name}
        class={clsx(
          background(),
          borderColor(),
          "rounded-full",
          props.responsive &&
            "h-8 w-8 border-2 md:h-16 md:w-16 lg:h-24 lg:w-24 lg:border-4",
          !props.responsive && "h-24 w-24 border-4",
        )}
      />
      <div class="w-full text-center">{props.name}</div>
    </>
  );
};

type WithOnClick = {
  onClick: () => void;
};

export const Pokemon = (
  props: ReturnType<ReturnType<typeof useBuilderData>>[number] &
    (WithOnClick | { class: string }),
) => {
  return (
    <>
      <Show
        when={"onClick" in props && props}
        fallback={
          <div
            class={clsx((props as { class: string }).class, "flex flex-col")}>
            <PokemonImage
              name={props.name}
              sprite={props.sprite}
              types={props.types}
              responsive
            />
          </div>
        }>
        {(clickableProps) => (
          <button
            class={clsx("flex flex-col")}
            onClick={() => clickableProps().onClick()}>
            <PokemonImage
              name={props.name}
              sprite={props.sprite}
              types={props.types}
            />
          </button>
        )}
      </Show>
    </>
  );
};

export const EmptyPokemon = () => (
  <div class="text-center">
    <div class="h-24 w-24 rounded-full bg-neutral" />
  </div>
);
