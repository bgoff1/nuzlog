import type { Component } from "solid-js";
import { For } from "solid-js";
import { useTheme } from "../context/theme";
import type { Theme } from "../util/themes";
import { themes } from "../util/themes";
import { titleCase } from "../util/titlecase";

const ThemePage: Component = () => {
  const [, { update }] = useTheme();
  const setThemeTo = (theme: Theme) => update(theme);

  return (
    <main class="flex h-full flex-col items-center justify-center gap-4 text-center">
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
    </main>
  );
};

export default ThemePage;
