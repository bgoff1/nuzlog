import { fireEvent, render } from "@solidjs/testing-library";
import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
  it("should render", () => {
    const onClick = vi.fn();
    const { getByRole } = render(() => (
      <Checkbox label="My Label" checked onChange={onClick} />
    ));

    fireEvent.click(getByRole("checkbox"));

    expect(getByRole("checkbox")).toBeInTheDocument();
    expect(getByRole("checkbox").parentElement).toHaveTextContent("My Label");
    expect(onClick).toHaveBeenCalledOnce();
  });
});
