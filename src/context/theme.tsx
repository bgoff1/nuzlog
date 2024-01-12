import type { Component } from "solid-js";
import { createContext, useContext } from "solid-js";
import { createThemeStore } from "../hooks/create-theme-store";
import type { WithChildren } from "../types/with-children";
import type { Theme } from "../util/themes";

type ThemeContextValue = { theme: Theme };
type ThemeContextUpdater = { update: (newTheme: Theme) => void };

const ThemeContext = createContext<[ThemeContextValue, ThemeContextUpdater]>();

export const ThemeProvider: Component<WithChildren> = (props) => {
  const [state, setState] = createThemeStore();

  const counter: [ThemeContextValue, ThemeContextUpdater] = [
    state,
    {
      update(newTheme: Theme) {
        console.log("newTheme", newTheme);
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

export const useThemeContext = () => {
  const contextValue = useContext(ThemeContext);
  if (!contextValue) {
    throw new Error("ThemeContext not provided");
  }
  return contextValue;
};
