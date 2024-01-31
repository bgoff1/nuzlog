import { render } from "@solidjs/testing-library";
import type { JSX } from "solid-js";
import HomePage from "./(home)";

vi.mock("../components/common/link", () => ({
  Link: (props: JSX.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props} />
  ),
}));

describe("Home page", () => {
  it("should render", () => {
    render(() => <HomePage />);
  });
});
