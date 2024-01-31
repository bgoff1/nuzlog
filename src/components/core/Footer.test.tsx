import { render } from "@solidjs/testing-library";
import type { JSX } from "solid-js";
import { Footer } from "./Footer";
import type { LinkItem } from "./sidebar/links.data";

vi.mock("../common/link", () => ({
  Link: (props: JSX.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props} />
  ),
}));

vi.mock("@solidjs/router", () => ({
  useMatch: () => () => true,
}));

it("should render elements for link buttons", () => {
  const items: LinkItem[] = [
    {
      href: "/",
      label: "My Link",
      icon: () => <></>,
    },
  ];
  const { getByRole } = render(() => <Footer items={items} />);

  expect(getByRole("link")).toBeInTheDocument();
  expect(getByRole("link")).toHaveTextContent("My Link");
});

it("should render elements for disabled buttons", () => {
  const items: LinkItem[] = [
    {
      href: "/",
      label: "My Disabled Link",
      icon: () => <></>,
      disabled: true,
    },
  ];
  const { getByRole, queryByRole } = render(() => <Footer items={items} />);

  expect(getByRole("button")).toBeInTheDocument();
  expect(getByRole("button")).toHaveTextContent("My Disabled Link");

  expect(queryByRole("link")).toBeNull();
});
