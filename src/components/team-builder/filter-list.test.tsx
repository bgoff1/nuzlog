import { fireEvent, render } from "@solidjs/testing-library";
import { createSignal } from "solid-js";
import type { ListItem } from "../../types/list-item";
import { FilterList } from "./filter-list";

describe("Filter List", () => {
  it("should render", () => {
    const { getByRole, queryByText } = render(() => (
      <FilterList
        title="title"
        subtitle="subtitle"
        filterState={[]}
        list={[
          {
            label: "label",
            value: 1,
          },
        ]}
        onClick={() => {}}
      />
    ));

    expect(getByRole("checkbox")).not.toBeChecked();
    expect(queryByText("title")).toBeInTheDocument();
    expect(queryByText("subtitle")).toBeInTheDocument();
  });

  it("should start with the state", () => {
    const { getByRole } = render(() => (
      <FilterList
        title="title"
        subtitle="subtitle"
        filterState={[
          {
            label: "label",
            value: 1,
          },
        ]}
        list={[
          {
            label: "label",
            value: 1,
          },
        ]}
        onClick={() => {}}
      />
    ));

    expect(getByRole("checkbox")).toBeChecked();
  });

  it("should update collapse title on click of a checkbox", () => {
    const { getByRole, queryByText } = render(() => {
      const [state, setState] = createSignal<ListItem<number>[]>([]);
      return (
        <FilterList
          title="title"
          subtitle="subtitle"
          filterState={state()}
          list={[
            {
              label: "label",
              value: 1,
            },
          ]}
          onClick={(newItem) => setState((prev) => [...prev, newItem])}
        />
      );
    });

    fireEvent.click(getByRole("checkbox"));

    expect(getByRole("checkbox")).toBeChecked();

    expect(queryByText("title (1)")).toBeInTheDocument();
  });
});
