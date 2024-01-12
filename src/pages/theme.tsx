import type { Component } from "solid-js";
import { For, createEffect } from "solid-js";
import { META_THEME_ID, STORAGE_THEME } from "../util/constants";
import type { ThemeName } from "../util/themes";
import { themes } from "../util/themes";
import { titleCase } from "../util/titlecase";

const ThemePage: Component = () => {
  const setThemeTo = (theme: ThemeName, setStorage = true) => {
    const root = document.getElementsByTagName("body")[0];
    root.setAttribute("data-theme", theme);

    const style = getComputedStyle(root).getPropertyValue("--p");
    document
      .getElementById(META_THEME_ID)
      ?.setAttribute("content", `oklch(${style})`);

    if (setStorage) {
      localStorage.setItem(STORAGE_THEME, theme);
    }
  };

  createEffect(() => {
    const theme =
      (localStorage.getItem(STORAGE_THEME) as ThemeName) ?? themes[0];
    setThemeTo(theme, false);
  });

  return (
    <div class="flex h-full flex-col items-center justify-center gap-4 text-center">
      <h1 class="text-4xl">Change your Theme</h1>

      <div class="grid grid-rows-2 gap-4 sm:grid-cols-2">
        <For each={themes}>
          {(item) => (
            <button
              class="rounded bg-neutral p-3"
              onClick={() => setThemeTo(item)}>
              {titleCase(item)}
              <img src={`/themes/${item}.svg`} width={300} height={150} />
            </button>
          )}
        </For>
      </div>
    </div>
  );
};

export default ThemePage;
