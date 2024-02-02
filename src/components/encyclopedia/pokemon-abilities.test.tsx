import { render, waitFor } from "@solidjs/testing-library";
import { PokemonAbilities } from "./pokemon-abilities";

const query = vi.hoisted(() => vi.fn());

vi.mock("../../database/query", () => ({
  query,
}));

it("should render pokemon abilities", async () => {
  query.mockResolvedValue([
    {
      name: "Overgrow",
      effect: "does some stuff",
      is_hidden: "1",
    },
  ]);
  const { queryByText } = render(() => <PokemonAbilities id="1" />);

  expect(queryByText("Abilities")).toBeInTheDocument();
  await waitFor(() =>
    expect(queryByText("Overgrow (Hidden)")).toBeInTheDocument(),
  );
  expect(queryByText("does some stuff")).toBeInTheDocument();
});

it("should use short effect if effect is missing", async () => {
  query.mockResolvedValue([
    {
      name: "Overgrow",
      short_effect: "just stuff",
    },
  ]);
  const { queryByText } = render(() => <PokemonAbilities id="1" />);

  await waitFor(() => expect(queryByText("Overgrow")).toBeInTheDocument());

  expect(queryByText("just stuff")).toBeInTheDocument();
});
