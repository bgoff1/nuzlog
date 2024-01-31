import { fireEvent, render, waitFor } from "@solidjs/testing-library";
import { Sidebar } from "./Sidebar";
import type { SidebarLink } from "./SidebarLink";

vi.mock("./SidebarLink", () => ({
  SidebarLink: (props: Parameters<typeof SidebarLink>[0]) => () => (
    <a
      role="link"
      onClick={() => props.closeSidebar()}
      style={{ display: props.open ? "block" : "none" }}>
      {props.link.label}
    </a>
  ),
}));

vi.mock("./links.data", () => ({
  links: [
    {
      href: "/",
      label: "Home",
      icon: () => <div />,
    },
  ],
}));

const install = vi.hoisted(() => vi.fn());
vi.mock("../../../context/install", () => ({
  useInstall: install,
}));

describe("Sidebar", () => {
  test("should render links", () => {
    const closeSidebar = vi.fn();
    install.mockReturnValue({ show: () => false, action: null });
    const { getAllByRole } = render(() => (
      <Sidebar closeSidebar={closeSidebar} open={true} />
    ));

    expect(getAllByRole("link")).toHaveLength(2);

    getAllByRole("link").forEach((link) => fireEvent.click(link));

    return waitFor(() => expect(closeSidebar).toHaveBeenCalledTimes(2));
  });

  it("should render install icon", async () => {
    const closeSidebar = vi.fn();
    const installAction = vi.fn();
    install.mockReturnValue({ show: () => true, action: installAction });

    const { getAllByRole } = render(() => (
      <Sidebar closeSidebar={closeSidebar} open={true} />
    ));

    fireEvent.click(getAllByRole("link")[1]);

    await waitFor(() => expect(installAction).toHaveBeenCalledOnce());
    expect(closeSidebar).toHaveBeenCalledOnce();
  });
});
