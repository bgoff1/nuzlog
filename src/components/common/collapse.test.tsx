import { fireEvent, render } from "@solidjs/testing-library";
import { Collapse } from "./collapse";

describe("Collapse", () => {
  it("should render", () => {
    const { getByRole, getByText } = render(() => (
      <Collapse content="content" title="title" />
    ));

    fireEvent.click(getByText("title"));

    expect(getByRole("group")).toBeInTheDocument();
    expect(getByRole("group")).toHaveTextContent("content");
    expect(getByRole("group")).toHaveTextContent("title");

    expect(getByText("content")).toBeVisible();

    fireEvent.click(getByText("title"));

    expect(getByText("content")).not.toBeVisible();
  });
});
