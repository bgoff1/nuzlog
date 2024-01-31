import type { Component, JSX } from "solid-js";
import { createSignal } from "solid-js";

interface CollapseProps {
  title: JSX.Element;
  content: JSX.Element;
}

export const Collapse: Component<CollapseProps> = (props) => {
  const [open, setOpen] = createSignal(false);

  return (
    <details
      class="collapse border border-base-300 bg-base-200 motion-safe:collapse-arrow"
      open={open()}
      onToggle={() => setOpen((wasOpen) => !wasOpen)}>
      <summary class="collapse-title">{props.title}</summary>
      <div class="collapse-content">{props.content}</div>
    </details>
  );
};
