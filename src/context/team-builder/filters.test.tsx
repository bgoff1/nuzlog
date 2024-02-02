import { fireEvent, render } from "@solidjs/testing-library";
import { FilterProvider, useFilters } from "./filters";

vi.mock("../../hooks/team-builder/builder", () => ({
  useBuilderData: () => () => [],
}));

const reducer = vi.hoisted(() => vi.fn());

vi.mock("./filter-reducer", () => ({
  reducer,
}));

describe("Filter Provider", () => {
  it("should render", () => {
    const MyComponent = () => {
      const { dispatcher, filters } = useFilters();

      return (
        <>
          <div data-test-id="filters">{JSON.stringify(filters())}</div>
          <button
            onClick={() =>
              dispatcher({
                type: "clearFilters",
              })
            }>
            clear
          </button>
        </>
      );
    };

    const { getByRole, getByTestId } = render(() => (
      <FilterProvider>
        <MyComponent />
      </FilterProvider>
    ));

    expect(getByTestId("filters")).toHaveTextContent("[]");

    fireEvent.click(getByRole("button"));

    expect(reducer).toHaveBeenCalledOnce();
    expect(reducer).toHaveBeenCalledWith(
      {
        filters: [],
      },
      {
        type: "clearFilters",
      },
    );
  });
});
