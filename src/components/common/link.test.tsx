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

  it("should render a link with parameters", () => {
    const { getByRole } = render(() => (
      <Link href="/encyclopedia/:id" params={{ id: "123" }}>
        some link
      </Link>
    ));

    expect(getByRole("link")).toHaveAttribute("href", "/encyclopedia/123");
  });

  it("should handle unnecessary casting for some reason", () => {
    const { getByRole } = render(() => (
      <Link href="/encyclopedia/:id" params={null as never}>
        some link
      </Link>
    ));

    expect(getByRole("link")).toHaveAttribute("href", "/encyclopedia/:id");
  });
});
