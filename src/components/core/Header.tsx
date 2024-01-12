import type { Component } from "solid-js";
import { Link } from "../common/Link";
import { HamburgerIcon } from "../common/icons";

export const Header: Component<{
  toggle: () => void;
}> = (props) => {
  return (
    <header class="flex items-center gap-x-2 border-b border-neutral bg-base-300 p-2 header-area">
      <button class="btn btn-circle btn-ghost" onClick={() => props.toggle()}>
        <HamburgerIcon />
      </button>
      <Link href="/" class="btn btn-ghost text-xl">
        Nuzlog
      </Link>
    </header>
  );
};
