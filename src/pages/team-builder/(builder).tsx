import { For, Show } from "solid-js";
import { EmptyPokemon, Pokemon } from "../../components/common/pokemon";
import { LoadingGrid } from "../../components/team-builder/loading-grid";
import { useFilters } from "../../context/team-builder/filters";
import { useTeam } from "../../context/team-builder/team";
import { useBuilderData } from "../../hooks/team-builder/builder";
import { MAX_TEAM_SIZE } from "../../util/constants";

const BuilderPage = () => {
  const { members, dispatcher } = useTeam();
  const { filters } = useFilters();

  const state = useBuilderData(filters);

  const membersWithEmpties = () => {
    const team = members().map((member) => ({
      ...member,
      empty: false,
    }));
    while (team.length < MAX_TEAM_SIZE) {
      team.push({
        id: -1,
        name: "",
        sprite: "",
        types: [],
        empty: true,
      });
    }

    return team;
  };

  const gridMembers = () => {
    return (state.data ?? []).filter(
      (pokemon) =>
        !members()
          .map((member) => member.id)
          .includes(pokemon.id),
    );
  };

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
      <Show when={!state.isLoading} fallback={<LoadingGrid />}>
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
