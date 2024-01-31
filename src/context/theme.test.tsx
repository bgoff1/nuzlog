import { fireEvent, render, waitFor } from "@solidjs/testing-library";
import { META_THEME_ID, STORAGE_THEME } from "../util/constants";
import { ThemeProvider, useTheme } from "./theme";

const MyComponent = () => {
  const { theme, update } = useTheme();

  return <button onClick={() => update("frappe")}>{theme()}</button>;
};

describe("Theme Provider", () => {
  beforeEach(() => localStorage.clear());

  it("should render", () => {
    const { getByRole } = render(() => (
      <ThemeProvider>
        <MyComponent />
      </ThemeProvider>
    ));

    fireEvent.click(getByRole("button"));

    return waitFor(() =>
      expect(localStorage.getItem(STORAGE_THEME)).toEqual("frappe"),
    );
  });

  it("should reset the theme if it is not a valid one", () => {
    localStorage.setItem(STORAGE_THEME, "latte");

    const { getByRole } = render(
      () => (
        <ThemeProvider>
          <MyComponent />
        </ThemeProvider>
      ),
      { wrapper: (props) => <div id={META_THEME_ID}>{props.children}</div> },
    );

    expect(getByRole("button")).toHaveTextContent("latte");
  });
});
