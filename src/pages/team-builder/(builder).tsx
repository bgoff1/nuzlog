import clsx from "clsx";
import { For, Show, createMemo } from "solid-js";
import { LoadingGrid } from "../../components/team-builder/loading-grid";
import { useTeam } from "../../context/team-builder/team";
import type { useBuilderData } from "../../hooks/team-builder/builder";
import { bgMapping, getBorderColor } from "../../types/pokemon-types";
import { MAX_TEAM_SIZE } from "../../util/constants";

const Pokemon = (
  props: ReturnType<ReturnType<typeof useBuilderData>>[number] & {
    onClick: () => void;
  },
) => {
  const background = () => bgMapping[props.types[0]];
  const borderColor = () => getBorderColor(props.types);

  return (
    <button class="text-center" onClick={() => props.onClick()}>
      <img
        loading="lazy"
        width={96}
        height={96}
        src={props.sprite}
        alt={props.name}
        class={clsx(
          background(),
          borderColor(),
          "h-24 w-24 rounded-full border-4",
        )}
      />
      <div>{props.name}</div>
    </button>
  );
};

const EmptyPokemon = () => (
  <div class="text-center">
    <div class="h-24 w-24 rounded-full bg-neutral" />
    <div class="invisible">loading...</div>
  </div>
);

const BuilderPage = () => {
  const { dispatcher, members, data } = useTeam();

  const membersWithEmpties = createMemo(() => {
    const team = members().map((member) => ({
      ...member,
      empty: false,
    }));
    while (team.length !== MAX_TEAM_SIZE) {
      team.push({
        id: -1,
        name: "",
        sprite: "",
        types: [],
        empty: true,
      });
    }

    return team;
  });

  const gridMembers = createMemo(() => {
    return data().filter(
      (pokemon) =>
        !members()
          .map((member) => member.id)
          .includes(pokemon.id),
    );
  });

  return (
    <>
      <h1 class="sr-only">Team Builder</h1>
      <ul class="flex flex-wrap justify-center gap-2 py-2">
        <For each={membersWithEmpties()}>
          {(member) => (
            <Show when={!member.empty} fallback={<EmptyPokemon />}>
              <Pokemon
                id={member.id}
                name={member.name}
                sprite={member.sprite}
                types={member.types}
                onClick={() => {
                  dispatcher({ type: "removeMember", payload: member });
                }}
              />
            </Show>
          )}
        </For>
      </ul>
      <Show when={!data.loading} fallback={<LoadingGrid />}>
        <ul class="flex flex-wrap justify-center gap-4">
          <For each={gridMembers()}>
            {(pokemon) => (
              <Pokemon
                {...pokemon}
                onClick={() => {
                  dispatcher({
                    type: "addMember",
                    payload: pokemon,
                  });
                }}
              />
            )}
          </For>
        </ul>
      </Show>
    </>
  );
};

export default BuilderPage;
