import type { Component } from "solid-js";
import type { WithChildren } from "../../types/with-children";

const EncyclopediaLayout: Component<Partial<WithChildren>> = (props) => (
  <main class="flex flex-col gap-4 overflow-y-auto">{props.children}</main>
);

export default EncyclopediaLayout;
