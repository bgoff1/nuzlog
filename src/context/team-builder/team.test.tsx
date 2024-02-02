import { fireEvent, render } from "@solidjs/testing-library";
import { TeamProvider, useTeam } from "./team";

vi.mock("../../hooks/team-builder/builder", () => ({
  useBuilderData: () => () => [],
}));

const reducer = vi.hoisted(() => vi.fn());

vi.mock("./team-reducer", () => ({
  reducer,
}));

describe("Team Provider", () => {
  it("should render", () => {
    const MyComponent = () => {
      const context = useTeam();

      return (
        <>
          <div data-test-id="members">{JSON.stringify(context.members())}</div>
          <button
            onClick={() =>
              context.dispatcher({
                type: "addMember",
                payload: {
                  id: 1,
                  name: "bulbasaur",
                  sprite: "",
                  types: ["grass", "poison"],
                },
              })
            }>
            clear
          </button>
        </>
      );
    };

    const { getByRole, getByTestId } = render(() => (
      <TeamProvider>
        <MyComponent />
      </TeamProvider>
    ));

    expect(getByTestId("members")).toHaveTextContent("[]");

    fireEvent.click(getByRole("button"));

    expect(reducer).toHaveBeenCalledOnce();
    expect(reducer).toHaveBeenCalledWith(
      {
        members: [],
      },
      {
        type: "addMember",
        payload: {
          id: 1,
          name: "bulbasaur",
          sprite: "",
          types: ["grass", "poison"],
        },
      },
    );
  });
});
