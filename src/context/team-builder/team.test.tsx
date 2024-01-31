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
          <div data-test-id="filters">{JSON.stringify(context.filters())}</div>
          <div data-test-id="data">{JSON.stringify(context.data())}</div>
          <button onClick={() => context.dispatcher({ type: "clearFilters" })}>
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
    expect(getByTestId("filters")).toHaveTextContent("[]");
    expect(getByTestId("data")).toHaveTextContent("[]");

    fireEvent.click(getByRole("button"));

    expect(reducer).toHaveBeenCalledOnce();
    expect(reducer).toHaveBeenCalledWith(
      {
        filters: [],
        members: [],
      },
      { type: "clearFilters" },
    );
  });
});
