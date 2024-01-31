import { fireEvent, render, waitFor } from "@solidjs/testing-library";
import { createSignal, type JSX } from "solid-js";
import { Header } from "./Header";

const match = vi.hoisted(() => vi.fn());

vi.mock("@solidjs/router", () => ({
  useMatch: () => match,
}));

vi.mock("../common/link", () => ({
  Link: (props: JSX.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props} />
  ),
}));

const install = vi.hoisted(() => vi.fn());

vi.mock("../../context/install", () => ({
  useInstall: install,
}));

const theme = vi.hoisted(() => vi.fn());

vi.mock("../../context/theme", () => ({
  useTheme: theme,
}));

vi.mock("../common/icons", () => ({
  HamburgerIcon: () => <div />,
  MoonIcon: () => <div />,
  SunIcon: () => <div />,
  RefreshIcon: () => <div />,
}));

describe("Header", () => {
  it("should toggle hamburger menu", () => {
    match.mockReturnValue(true);
    install.mockReturnValue({ needRefresh: () => false, refresh: () => {} });
    const updateTheme = vi.fn();
    theme.mockReturnValue({ theme: () => "mocha", update: updateTheme });

    const toggle = vi.fn();
    const { getByRole } = render(() => <Header toggle={toggle} />);

    fireEvent.click(getByRole("button"));

    expect(toggle).toHaveBeenCalledOnce();
  });

  it("should click the theme switcher", async () => {
    match.mockReturnValue(false);
    install.mockReturnValue({ needRefresh: () => false, refresh: () => {} });

    const [currentTheme, updateTheme] = createSignal("latte");
    theme.mockReturnValue({
      theme: currentTheme,
      update: updateTheme,
    });

    const toggle = vi.fn();
    const { getAllByRole } = render(() => <Header toggle={toggle} />);

    const getSwapButton = () => getAllByRole("button")[1];

    expect(getSwapButton()).toHaveClass("swap-active");

    fireEvent.click(getSwapButton());

    await waitFor(() => expect(getSwapButton()).not.toHaveClass("swap-active"));

    fireEvent.click(getSwapButton());

    return waitFor(() => expect(getSwapButton()).toHaveClass("swap-active"));
  });

  it("should show refresh button", () => {
    match.mockReturnValue(true);
    const refresh = vi.fn();
    install.mockReturnValue({ needRefresh: () => true, refresh });

    const toggle = vi.fn();
    const { getAllByRole } = render(() => <Header toggle={toggle} />);

    const getInstallButton = () => getAllByRole("button")[1];

    fireEvent.click(getInstallButton());

    expect(refresh).toHaveBeenCalledOnce();
  });
});
