import { render } from "@solidjs/testing-library";
import { PokeballIcon } from "./icons";

describe("Icons", () => {
  it("should render an icon", () => {
    const { container } = render(() => <PokeballIcon />);
    expect(container.childElementCount).toBe(1);
  });
});
