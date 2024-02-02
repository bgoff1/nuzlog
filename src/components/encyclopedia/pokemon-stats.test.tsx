import { render, waitFor } from "@solidjs/testing-library";
import type { CompiledQuery } from "kysely";
import type { Mock } from "vitest";
import { PokemonStats } from "./pokemon-stats";

const query: Mock<[CompiledQuery], unknown> = vi.hoisted(() => vi.fn());

vi.mock("../../database/query", () => ({
  query,
}));

it("should render pokemon abilities", async () => {
  query.mockImplementation((compiledQuery) => {
    if (compiledQuery.sql.includes("pokemon_stat")) {
      return [
        {
          base_stat: 50,
          effort: 1,
          name: "HP",
        },
      ];
    }
    return [
      {
        name: "HP",
      },
    ];
  });

  const { queryByText, getAllByRole } = render(() => <PokemonStats id="1" />);

  expect(queryByText("Statistics")).toBeInTheDocument();

  await waitFor(() => expect(queryByText("Base Stats")).toBeInTheDocument());

  const [base, effort] = getAllByRole("progressbar");

  expect(base).toHaveValue(50);
  expect(effort).toHaveValue(1);

  expect(queryByText("HP - 1")).toBeInTheDocument();
  expect(queryByText("HP - 50")).toBeInTheDocument();
});

it("should handle when there is no pokemon data", async () => {
  query.mockImplementation((compiledQuery) => {
    if (compiledQuery.sql.includes("pokemon_stat")) {
      return null;
    }
    return [
      {
        name: "HP",
      },
    ];
  });

  const { queryByText, getAllByRole } = render(() => <PokemonStats id="1" />);

  expect(queryByText("Statistics")).toBeInTheDocument();

  await waitFor(() => expect(queryByText("Base Stats")).toBeInTheDocument());

  const [base, effort] = getAllByRole("progressbar");

  expect(base).toHaveValue(0);
  expect(effort).toHaveValue(0);
});
