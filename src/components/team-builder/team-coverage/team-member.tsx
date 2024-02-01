import clsx from "clsx";
import type { Component } from "solid-js";
import { Show } from "solid-js";
import type { useEffectiveness } from "../../../hooks/team-builder/coverage";
import type { HookType } from "../../../types/hook-type";
import type { PokemonType } from "../../../types/pokemon-types";
import { getBackgroundColor } from "../../../util/colors";
import { getMatchup } from "../../../util/team-coverage/get-matchup";

const matchupRecord: Record<number, string> = {
  0: "0x",
  0.25: "¼",
  0.5: "½",
  1: "",
  2: "2x",
  4: "4x",
};

export const TeamMember: Component<{
  effectivenessMap: HookType<typeof useEffectiveness>;
  types: PokemonType[];
  attacker: PokemonType;
}> = (props) => {
  const matchup = () => {
    const matchupValue = getMatchup(
      props.effectivenessMap,
      props.types,
      props.attacker,
    );

    return {
      label: matchupRecord[matchupValue],
      value: matchupValue,
    };
  };

  return (
    <>
      <Show when={!matchup().label}>
        <td
          class={getBackgroundColor(props.attacker)}
          data-test-id="matchup-text"
        />
      </Show>
      <Show when={matchup().label}>
        <td
          class={clsx(getBackgroundColor(props.attacker), "text-center", {
            "text-error": matchup().value === 4,
            "text-warn": matchup().value === 2,
            "text-success": matchup().value === 0.5,
            "text-primary": matchup().value === 0.25,
            "text-secondary": matchup().value === 0,
          })}>
          <span
            class="inline-block w-8 rounded bg-base-300"
            data-test-id="matchup-text">
            {matchup().label}
          </span>
        </td>
      </Show>
    </>
  );
};
