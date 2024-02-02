import clsx from "clsx";
import type { Component } from "solid-js";
import { Match, Switch } from "solid-js";
import type { useBuilderData } from "../../hooks/team-builder/builder";
import type { Defined, QueryHookType } from "../../types/hook-type";
import { getBackgroundColor, getBorderColor } from "../../util/colors";

type PokemonProp = Defined<QueryHookType<typeof useBuilderData>>[number];

const PokemonImage: Component<
  Omit<PokemonProp, "id"> & { responsive?: true } & Partial<WithSize>
> = (props) => {
  const background = () => getBackgroundColor(props.types);
  const borderColor = () => getBorderColor(props.types);

  const size = () => (props.size === "medium" ? 64 : 96);

  return (
    <>
      <img
        loading="lazy"
        width={size()}
        height={size()}
        src={props.sprite}
        alt={props.name}
        class={clsx(
          background(),
          borderColor(),
          "rounded-full",
          props.responsive
            ? "h-8 w-8 border-2 md:h-16 md:w-16 lg:h-24 lg:w-24 lg:border-4"
            : props.size === "medium"
              ? "h-16 w-16 border-2"
              : "h-24 w-24 border-4",
        )}
      />
      <div class="w-full text-center">{props.name}</div>
    </>
  );
};

type WithOnClick = {
  onClick: () => void;
};

type WithClass = {
  class: string;
};

type WithSize = {
  size: "large" | "medium";
};

export const Pokemon = (
  props: PokemonProp & (WithOnClick | WithClass | WithSize),
) => {
  return (
    <>
      <Switch>
        <Match when={"onClick" in props && props}>
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
        </Match>
        <Match when={"class" in props && props}>
          {(withClassProps) => (
            <div class={clsx((withClassProps().class, "flex flex-col"))}>
              <PokemonImage
                name={props.name}
                sprite={props.sprite}
                types={props.types}
                responsive
              />
            </div>
          )}
        </Match>

        <Match when={"size" in props && props}>
          {(withSizeProps) => (
            <PokemonImage
              name={props.name}
              sprite={props.sprite}
              types={props.types}
              size={withSizeProps().size}
            />
          )}
        </Match>
      </Switch>
    </>
  );
};

export const EmptyPokemon = () => (
  <div class="text-center">
    <div class="h-24 w-24 rounded-full bg-neutral" />
  </div>
);
