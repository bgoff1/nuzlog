import { fireEvent, render, waitFor } from "@solidjs/testing-library";
import type { JSX } from "solid-js";
import { SidebarLink } from "./SidebarLink";

vi.mock("../../common/icons", async (importOriginal) => ({
  ...((await importOriginal()) ?? {}),
  ConstructionIcon: () => <div data-test-id="construction" />,
  PokeballIcon: () => <div data-test-id="pokeball" />,
}));

vi.mock("../../common/link", () => ({
  Link: (props: JSX.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props} />
  ),
}));

describe("Sidebar Link", () => {
  it("should render a disabled link", () => {
    const { getByTestId, getByText } = render(() => (
      <SidebarLink
        closeSidebar={() => {}}
        link={{
          disabled: true,
          href: "/",
          label: "label",
        }}
        open={true}
      />
    ));

    expect(getByTestId("construction")).toBeInTheDocument();
    expect(getByText("Under Construction")).toBeInTheDocument();
  });

  it("should render a button", () => {
    const onClick = vi.fn();
    const { getByText } = render(() => (
      <SidebarLink
        closeSidebar={onClick}
        link={{
          noLink: true,
          icon: () => <div />,
          label: "label",
        }}
        open={true}
      />
    ));

    fireEvent.click(getByText("label"));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("should render a normal link", () => {
    const onClick = vi.fn();
    const { getByRole } = render(() => (
      <SidebarLink
        closeSidebar={onClick}
        link={{
          href: "/",
          icon: () => <div />,
          label: "label",
        }}
        open={true}
      />
    ));

    fireEvent.click(getByRole("link"));

    return waitFor(() => expect(onClick).toHaveBeenCalledOnce());
  });
});
