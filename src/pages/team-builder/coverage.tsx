import clsx from "clsx";
import type { Component } from "solid-js";
import { For, Show } from "solid-js";
import { Pokemon } from "../../components/common/pokemon";
import { MatchupBubble } from "../../components/team-builder/team-coverage/matchup-bubble";
import { TeamMember } from "../../components/team-builder/team-coverage/team-member";
import { useTeam } from "../../context/team-builder/team";
import { useEffectiveness } from "../../hooks/team-builder/coverage";
import { useTypes } from "../../hooks/team-builder/options";
import type { Defined, QueryHookType } from "../../types/hook-type";
import type { PokemonType } from "../../types/pokemon-types";
import { getBackgroundColor, getTextColor } from "../../util/colors";
import { getMatchup } from "../../util/team-coverage/get-matchup";
import { titleCase } from "../../util/titlecase";

const getCounts = (
  team: ReturnType<ReturnType<typeof useTeam>["members"]>,
  type: { name: PokemonType; id: number },
  map: Defined<QueryHookType<typeof useEffectiveness>>,
) => {
  const weakCount = team.reduce((previous, current) => {
    const matchup = getMatchup(map, current.types, type.name);
    return previous + (matchup > 1 ? 1 : 0);
  }, 0);
  const strongCount = team.reduce((previous, current) => {
    const matchup = getMatchup(map, current.types, type.name);
    return previous + (matchup < 1 ? 1 : 0);
  }, 0);

  return { weak: weakCount, resist: strongCount };
};

const Coverage: Component = () => {
  const { members } = useTeam();
  const types = useTypes();

  const effectivenessMap = useEffectiveness();

  return (
    <>
      <h1 class="sr-only">Team Builder Coverage</h1>
      <Show when={!effectivenessMap.isLoading} fallback="loading...">
        <table class="h-full w-full border-separate" tabIndex={0}>
          <thead>
            <tr>
              <th class="sticky left-0 z-10 bg-base-300 text-center">Type</th>
              <For each={members()}>
                {(member) => (
                  <th>
                    <Pokemon
                      id={member.id}
                      name={member.name}
                      class="w-full items-center"
                      sprite={member.sprite}
                      types={member.types}
                    />
                  </th>
                )}
              </For>
              <th class="text-center">Weak</th>
              <th class="text-center">Resist</th>
            </tr>
          </thead>
          <tbody>
            <For each={types.data}>
              {(type) => {
                const name = type.name.toLowerCase() as PokemonType;
                const { weak, resist } = getCounts(
                  members(),
                  { id: type.id, name },
                  effectivenessMap.data!,
                );

                return (
                  <tr>
                    <td
                      class={clsx(
                        getBackgroundColor(name),
                        getTextColor(name),
                        "sticky left-0 border-base-300 text-center",
                      )}>
                      {titleCase(type.name)}
                    </td>
                    <For each={members()}>
                      {(member) => (
                        <TeamMember
                          effectivenessMap={effectivenessMap.data!}
                          types={member.types}
                          attacker={name}
                        />
                      )}
                    </For>
                    <td class={clsx(getBackgroundColor(name), "text-center")}>
                      {weak ? (
                        <MatchupBubble
                          class={clsx({
                            "text-error/80": weak === 1,
                            "text-error/90": weak === 2,
                            "text-error": weak > 2,
                          })}>
                          {weak}
                        </MatchupBubble>
                      ) : null}
                    </td>
                    <td class={clsx(getBackgroundColor(name), "text-center")}>
                      {resist ? (
                        <MatchupBubble
                          class={clsx({
                            "text-success/80": resist === 1,
                            "text-success/90": resist === 2,
                            "text-success": resist > 2,
                          })}>
                          {resist}
                        </MatchupBubble>
                      ) : null}
                    </td>
                  </tr>
                );
              }}
            </For>
          </tbody>
        </table>
      </Show>
    </>
  );
};

export default Coverage;
