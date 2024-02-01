import { fireEvent, render } from "@solidjs/testing-library";
import { EmptyPokemon, Pokemon } from "./pokemon";

it("should render a empty pokemon", () => {
  const { container } = render(() => <EmptyPokemon />);

  expect(container.innerHTML).toEqual(
    `<div class="text-center"><div class="h-24 w-24 rounded-full bg-neutral"></div></div>`,
  );
});

it("should render a clickable pokemon", () => {
  const onClick = vi.fn();
  const { getByRole } = render(() => (
    <Pokemon
      id={1}
      name="name"
      onClick={() => onClick()}
      sprite="some sprite"
      types={["fire"]}
    />
  ));

  fireEvent.click(getByRole("button"));

  expect(onClick).toHaveBeenCalled();
});

it("should render a non-clickable pokemon", () => {
  const { queryByRole } = render(() => (
    <Pokemon
      id={1}
      name="name"
      class="flex"
      sprite="some sprite"
      types={["fire"]}
    />
  ));

  expect(queryByRole("button")).not.toBeInTheDocument();
});
