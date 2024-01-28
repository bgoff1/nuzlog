import type { Component } from "solid-js";
import { createThemeStore } from "../hooks/create-theme-store";
import type { WithChildren } from "../types/with-children";
import type { Theme } from "../util/themes";
import { createContext, useContext } from "./context-helpers";

type ThemeContextValue = { theme: Theme };
type ThemeContextUpdater = { update: (newTheme: Theme) => void };

const ThemeContext =
  createContext<[ThemeContextValue, ThemeContextUpdater]>("ThemeContext");

export const ThemeProvider: Component<WithChildren> = (props) => {
  const [state, setState] = createThemeStore();

  const counter: [ThemeContextValue, ThemeContextUpdater] = [
    state,
    {
      update(newTheme: Theme) {
        setState("theme", newTheme);
      },
    },
  ];

  return (
    <ThemeContext.Provider value={counter}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
