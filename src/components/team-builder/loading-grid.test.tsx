import { render } from "@solidjs/testing-library";
import { LoadingGrid } from "./loading-grid";

describe("Loading Grid", () => {
  it("should render", () => {
    const { getByRole } = render(() => <LoadingGrid />);

    expect(getByRole("list")).toBeInTheDocument();

    expect(getByRole("list").childElementCount).toEqual(100);
  });
});
