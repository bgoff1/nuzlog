import { createEffect } from "solid-js";
import type { SetStoreFunction } from "solid-js/store";
import { BODY_THEME_ATTRIBUTE, META_THEME_ID } from "../util/constants";
import type { Theme } from "../util/themes";
import { defaultTheme } from "../util/themes";
import { createLocalStore } from "./util/create-local-store";

export function createThemeStore(): [
  { theme: Theme },
  SetStoreFunction<{ theme: Theme }>,
] {
  const [state, setState] = createLocalStore<{ theme: Theme }>("theme", {
    theme: defaultTheme,
  });

  createEffect(() => {
    document.documentElement.setAttribute(BODY_THEME_ATTRIBUTE, state.theme);

    const style = getComputedStyle(document.documentElement).getPropertyValue(
      "--p",
    );

    document
      .getElementById(META_THEME_ID)
      ?.setAttribute("content", `oklch(${style})`);
  });

  return [state, setState];
}
