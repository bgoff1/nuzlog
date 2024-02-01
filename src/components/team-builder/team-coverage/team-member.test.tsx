import { render } from "@solidjs/testing-library";
import type { PokemonType } from "../../../types/pokemon-types";
import { TeamMember } from "./team-member";

describe("Team Builder", () => {
  const effectivenessMap = new Map<`${PokemonType} vs ${PokemonType}`, number>([
    ["normal vs normal", 1],
    ["normal vs ghost", 0],
    ["normal vs rock", 0.5],
    ["normal vs steel", 0.5],
    ["water vs fire", 2],
    ["water vs ground", 2],
  ]);

  it("should get a normal matchup", () => {
    const { getByTestId } = render(() => (
      <TeamMember
        attacker="normal"
        types={["normal"]}
        effectivenessMap={effectivenessMap}
      />
    ));

    expect(getByTestId("matchup-text")).toBeEmptyDOMElement();
  });

  it("should get a 2x matchup", () => {
    const { getByTestId } = render(() => (
      <TeamMember
        attacker="water"
        types={["fire"]}
        effectivenessMap={effectivenessMap}
      />
    ));

    expect(getByTestId("matchup-text")).toHaveTextContent("2x");
  });

  it("should get a 4x matchup", () => {
    const { getByTestId } = render(() => (
      <TeamMember
        attacker="water"
        types={["fire", "ground"]}
        effectivenessMap={effectivenessMap}
      />
    ));

    expect(getByTestId("matchup-text")).toHaveTextContent("4x");
  });

  it("should get a 1/2x matchup", () => {
    const { getByTestId } = render(() => (
      <TeamMember
        attacker="normal"
        types={["rock"]}
        effectivenessMap={effectivenessMap}
      />
    ));

    expect(getByTestId("matchup-text")).toHaveTextContent("½");
  });

  it("should get a 1/4x matchup", () => {
    const { getByTestId } = render(() => (
      <TeamMember
        attacker="normal"
        types={["rock", "steel"]}
        effectivenessMap={effectivenessMap}
      />
    ));

    expect(getByTestId("matchup-text")).toHaveTextContent("¼");
  });

  it("should get a 0x matchup", () => {
    const { getByTestId } = render(() => (
      <TeamMember
        attacker="normal"
        types={["ghost"]}
        effectivenessMap={effectivenessMap}
      />
    ));

    expect(getByTestId("matchup-text")).toHaveTextContent("0x");
  });
});
