import { useMatch } from "@solidjs/router";
import clsx from "clsx";
import { Show, type Component } from "solid-js";
import { useInstall } from "../../context/install";
import { useTheme } from "../../context/theme";
import type { NonParameterizedRoutes } from "../../route-tree.gen";
import type { Theme } from "../../util/themes";
import { HamburgerIcon, MoonIcon, RefreshIcon, SunIcon } from "../common/icons";
import { Link } from "../common/link";

export const Header: Component<{
  toggle: () => void;
}> = (props) => {
  const { needRefresh, refresh } = useInstall();
  const { theme, update } = useTheme();
  const setThemeTo = (newTheme: Theme) => update(newTheme);
  const match = useMatch((): NonParameterizedRoutes => "/theme");

  return (
    <header class="flex items-center gap-x-2 border-b border-neutral bg-base-300 p-2 header-area">
      <div class="flex flex-1 gap-x-2">
        <button class="btn btn-ghost" onClick={() => props.toggle()}>
          <HamburgerIcon />
        </button>
        <Link href="/" class="btn btn-ghost text-xl">
          Nuzlog
        </Link>
      </div>
      <Show when={!match()}>
        <button
          class={clsx(
            "btn btn-ghost swap motion-safe:swap-rotate",
            theme() === "latte" && "swap-active",
          )}
          onClick={() => setThemeTo(theme() === "latte" ? "mocha" : "latte")}>
          <MoonIcon class="swap-on" />
          <SunIcon class="swap-off" />
        </button>
      </Show>

      <Show when={needRefresh()}>
        <button class="btn btn-ghost" onClick={() => refresh()}>
          <span>A new version is available!</span>
          <RefreshIcon />
        </button>
      </Show>
    </header>
  );
};
