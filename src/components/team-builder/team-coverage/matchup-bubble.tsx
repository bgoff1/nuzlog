import clsx from "clsx";
import type { Component } from "solid-js";
import type { WithChildren } from "../../../types/with-children";

export const MatchupBubble: Component<WithChildren<{ class: string }>> = (
  props,
) => {
  return (
    <span
      class={clsx(
        props.class,
        "flex items-center justify-center rounded bg-base-300",
      )}>
      {props.children}
    </span>
  );
};
