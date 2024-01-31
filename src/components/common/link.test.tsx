import { render } from "@solidjs/testing-library";
import type { JSX } from "solid-js";
import { Link } from "./link";

vi.mock("@solidjs/router", () => ({
  A: (props: JSX.AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props} />,
}));

describe("Link", () => {
  it("should render a link", () => {
    const { getByRole } = render(() => <Link href="/">some link</Link>);

    expect(getByRole("link")).toHaveTextContent("some link");
  });
});
