import type { Accessor } from "solid-js";
import { createEffect, createSignal, type Component } from "solid-js";
import type { WithChildren } from "../types/with-children";
import {
  BODY_THEME_ATTRIBUTE,
  META_THEME_ID,
  STORAGE_THEME,
} from "../util/constants";
import { defaultTheme, isTheme, type Theme } from "../util/themes";
import { createContext, useContext } from "./context-helpers";

type ThemeContext = {
  theme: Accessor<Theme>;
  update: (newTheme: Theme) => void;
};

const ThemeContext = createContext<ThemeContext>("ThemeContext");

export const ThemeProvider: Component<WithChildren> = (props) => {
  const localState = localStorage.getItem(STORAGE_THEME) as null | string;
  const startingTheme =
    localState && isTheme(localState) ? localState : defaultTheme;

  const [theme, setTheme] = createSignal(startingTheme);

  createEffect(() => localStorage.setItem(STORAGE_THEME, theme()));

  createEffect(() => {
    document.documentElement.setAttribute(BODY_THEME_ATTRIBUTE, theme());

    const style = getComputedStyle(document.documentElement).getPropertyValue(
      "--p",
    );

    document
      .getElementById(META_THEME_ID)
      ?.setAttribute("content", `oklch(${style})`);
  });

  const context: ThemeContext = {
    theme,
    update: setTheme,
  };

  return (
    <ThemeContext.Provider value={context}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
