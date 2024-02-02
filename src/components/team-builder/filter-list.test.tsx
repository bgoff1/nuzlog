import { fireEvent, render } from "@solidjs/testing-library";
import { createSignal } from "solid-js";
import { FilterList } from "./filter-list";

describe("Filter List", () => {
  it("should render", () => {
    const { getByRole, queryByText } = render(() => (
      <FilterList
        title="title"
        subtitle="subtitle"
        list={[
          {
            label: "label",
            value: 1,
            enabled: false,
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
        list={[
          {
            label: "label",
            value: 1,
            enabled: true,
          },
        ]}
        onClick={() => {}}
      />
    ));

    expect(getByRole("checkbox")).toBeChecked();
  });

  it("should update collapse title on click of a checkbox", () => {
    const { getByRole, queryByText } = render(() => {
      const [enabled, setEnabled] = createSignal<boolean>(false);
      return (
        <FilterList
          title="title"
          subtitle="subtitle"
          list={[
            {
              label: "label",
              value: 1,
              enabled: enabled(),
            },
          ]}
          onClick={() => setEnabled((prev) => !prev)}
        />
      );
    });

    fireEvent.click(getByRole("checkbox"));

    expect(getByRole("checkbox")).toBeChecked();

    expect(queryByText("title (1)")).toBeInTheDocument();
  });
});
